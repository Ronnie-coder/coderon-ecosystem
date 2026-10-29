import { NextResponse } from 'next/server';
import { supabase, logEvent, type Lead } from '@/lib/outreach/db';
import { notionUpdateStage } from '@/lib/outreach/notion';
import { requireAdmin } from '@/lib/adminAuth';

type Action = 'skip' | 'bad_email' | 'not_fit' | 'replied' | 'call_booked' | 'won' | 'lost' | 'unsubscribed' | 'undo_skip';

export async function POST(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  const { leadId, action, dealValue } = (await req.json()) as { leadId: string; action: Action; dealValue?: number };
  if (!leadId || !action) return NextResponse.json({ error: 'leadId and action required' }, { status: 400 });

  const { data: lead } = await supabase.from('leads').select('*').eq('id', leadId).single<Lead>();
  if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

  const now = new Date().toISOString();
  let update: Record<string, unknown> = {};
  switch (action) {
    case 'skip':
    case 'not_fit':
      update = { skipped_at: now, skip_reason: action };
      break;
    case 'bad_email':
      update = { skipped_at: now, skip_reason: 'bad_email', email_ok: false };
      break;
    case 'undo_skip':
      update = { skipped_at: null, skip_reason: null };
      break;
    case 'replied':
      update = { replied_at: lead.replied_at || now, replied: true };
      await notionUpdateStage(lead.notion_page_id, 'Replied');
      break;
    case 'call_booked':
      update = { call_booked_at: lead.call_booked_at || now, replied_at: lead.replied_at || now, replied: true };
      await notionUpdateStage(lead.notion_page_id, 'Call Booked');
      break;
    case 'won':
      update = { won_at: now, deal_value: dealValue ?? lead.deal_value, replied_at: lead.replied_at || now, replied: true };
      await notionUpdateStage(lead.notion_page_id, 'Won', { dealValue: dealValue ?? null });
      break;
    case 'lost':
      update = { lost_at: now };
      await notionUpdateStage(lead.notion_page_id, 'Lost');
      break;
    case 'unsubscribed':
      update = { unsubscribed: true };
      break;
    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }

  const { error } = await supabase.from('leads').update(update).eq('id', leadId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await logEvent(`action_${action}`, leadId, null, dealValue ? { dealValue } : undefined);
  return NextResponse.json({ ok: true });
}
