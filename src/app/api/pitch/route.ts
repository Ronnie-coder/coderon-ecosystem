import { NextResponse } from 'next/server';
import { supabase, logEvent, type Lead } from '@/lib/outreach/db';
import { getBudget } from '@/lib/outreach/budget';
import { newMessageId, sendOutreachEmail } from '@/lib/outreach/send';
import { notionCreatePitch } from '@/lib/outreach/notion';
import { buildPitch, renderEmail } from './pitch-templates';
import { requireAdmin } from '@/lib/adminAuth';

// Sends the pitch for one lead. Everything is loaded server-side from the lead's verified
// audit; the client only sends the lead id.
export async function POST(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  try {
    const { leadId } = await req.json();
    if (!leadId) return NextResponse.json({ error: 'leadId required' }, { status: 400 });

    const { data: lead, error } = await supabase.from('leads').select('*').eq('id', leadId).single<Lead>();
    if (error || !lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    if (lead.pitched_at) return NextResponse.json({ skipped: true, reason: 'Already pitched' }, { status: 409 });
    if (!lead.email || lead.email_ok === false) return NextResponse.json({ skipped: true, reason: 'No verified email' }, { status: 422 });
    if (lead.unsubscribed || lead.bounced_at) return NextResponse.json({ skipped: true, reason: 'Unsubscribed or bounced' }, { status: 422 });

    // Never email the same address twice from two different lead rows.
    const { count: dupes } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('email', lead.email)
      .not('pitched_at', 'is', null);
    if (dupes) return NextResponse.json({ skipped: true, reason: 'This email was already pitched' }, { status: 409 });

    const pitch = buildPitch(lead);
    if (!pitch) return NextResponse.json({ skipped: true, reason: 'No verified issue to pitch' }, { status: 422 });

    const budget = await getBudget();
    if (budget.emailsLeftToday <= 0) {
      return NextResponse.json({ skipped: true, reason: `Free-tier email budget used up for today (${budget.dailyCap}/day)` }, { status: 429 });
    }

    const content = renderEmail(pitch.body, lead.first_name);
    const messageId = newMessageId();
    const sent = await sendOutreachEmail({ to: lead.email, subject: pitch.subject, text: content.text, html: content.html, messageId });
    if (sent.error) return NextResponse.json({ error: `Resend: ${sent.error}` }, { status: 502 });

    const now = new Date().toISOString();
    const notionPageId = await notionCreatePitch(lead, pitch.subject);

    const { error: dbError } = await supabase
      .from('leads')
      .update({
        status: 'pitched',
        pitched_at: now,
        followup_stage: 0,
        replied: false,
        initial_trigger: pitch.trigger,
        initial_subject: pitch.subject,
        resend_email_id: sent.id,
        message_id: messageId,
        notion_page_id: notionPageId,
      })
      .eq('id', lead.id);
    await logEvent('sent_pitch', lead.id, sent.id, { subject: pitch.subject, trigger: pitch.trigger });

    if (dbError) {
      console.error('Pitch DB update failed:', dbError);
      return NextResponse.json({ error: `Email sent, but saving failed: ${dbError.message}` }, { status: 500 });
    }

    return NextResponse.json({ sent: true, trigger: pitch.trigger, subject: pitch.subject, pitchesToday: budget.pitchesToday + 1 });
  } catch (err) {
    console.error('Pitch Error:', err);
    return NextResponse.json({ error: 'Fatal error during pitching', details: (err as Error).message }, { status: 500 });
  }
}
