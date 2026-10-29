import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { supabase, logEvent, type Lead } from '@/lib/outreach/db';
import { notionUpdateStage } from '@/lib/outreach/notion';

// Resend signs webhooks with Svix: HMAC-SHA256 over "<svix-id>.<svix-timestamp>.<body>"
// using the base64 secret after the "whsec_" prefix.
function verifySvix(req: Request, body: string): boolean {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return true; // not configured: accept (matches previous behaviour)
  const id = req.headers.get('svix-id');
  const timestamp = req.headers.get('svix-timestamp');
  const signatures = req.headers.get('svix-signature');
  if (!id || !timestamp || !signatures) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 5 * 60) return false;
  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${body}`).digest();
  return signatures.split(' ').some((part) => {
    const [, sig] = part.split(',');
    if (!sig) return false;
    const given = Buffer.from(sig, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

// Only timestamps and counters change here. Status and notes are never overwritten,
// so follow-ups and audit evidence survive opens and clicks.
export async function POST(req: Request) {
  const raw = await req.text();
  if (!verifySvix(req, raw)) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });

  try {
    const payload = JSON.parse(raw);
    const type: string = payload.type || '';
    const emailId: string | undefined = payload.data?.email_id;
    const recipient: string | undefined = payload.data?.to?.[0]?.toLowerCase();
    const at: string = payload.created_at || payload.data?.created_at || new Date().toISOString();

    let lead: Lead | null = null;
    if (emailId) {
      const { data } = await supabase.from('leads').select('*').eq('resend_email_id', emailId).limit(1);
      lead = (data?.[0] as Lead) || null;
    }
    if (!lead && recipient) {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('email', recipient)
        .not('pitched_at', 'is', null)
        .order('pitched_at', { ascending: false })
        .limit(1);
      lead = (data?.[0] as Lead) || null;
    }

    const short = type.replace(/^email\./, '');
    await logEvent(short, lead?.id ?? null, emailId, { recipient });
    if (!lead) return NextResponse.json({ message: `No matching lead for ${type}` }, { status: 200 });

    const update: Record<string, unknown> = {};
    if (short === 'delivered') update.delivered_at = lead.delivered_at || at;
    if (short === 'opened') {
      update.opened_at = lead.opened_at || at;
      update.open_count = (lead.open_count || 0) + 1;
    }
    if (short === 'clicked') {
      update.clicked_at = lead.clicked_at || at;
      update.click_count = (lead.click_count || 0) + 1;
      if (!lead.opened_at) update.opened_at = at;
    }
    if (short === 'bounced') {
      update.bounced_at = at;
      update.email_ok = false;
      update.status = 'bounced';
    }
    if (short === 'complained') update.unsubscribed = true;

    if (Object.keys(update).length) await supabase.from('leads').update(update).eq('id', lead.id);
    if (short === 'opened' && !lead.opened_at && !lead.replied_at) {
      await notionUpdateStage(lead.notion_page_id, 'Opened', { openedAt: at });
    }

    return NextResponse.json({ message: `Webhook processed event: ${type}` }, { status: 200 });
  } catch (error) {
    console.error('Resend Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook execution failed', details: (error as Error).message }, { status: 500 });
  }
}
