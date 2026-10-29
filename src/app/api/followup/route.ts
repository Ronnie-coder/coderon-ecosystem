import { NextResponse } from 'next/server';
import { supabase, logEvent, type Lead } from '@/lib/outreach/db';
import { isCronAuthorized } from '@/lib/adminAuth';
import { getBudget } from '@/lib/outreach/budget';
import { FOLLOW_UP_DAYS } from '@/lib/outreach/config';
import { newMessageId, sendOutreachEmail } from '@/lib/outreach/send';
import { notionUpdateStage } from '@/lib/outreach/notion';
import { sendDailyDigest } from '@/lib/outreach/digest';
import { followUpBody, renderEmail } from '../pitch/pitch-templates';

export const maxDuration = 60;

// Runs daily (cron-job.org). Sends follow-up 1 on day 3 and follow-up 2 on day 7 to every
// pitched lead that hasn't replied, bounced or unsubscribed, opened or not. Then sends
// Ronnie the daily digest.
export async function GET(req: Request) {
  if (!isCronAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const now = Date.now();
    const daysAgo = (d: number) => new Date(now - d * 864e5).toISOString();

    const base = () =>
      supabase
        .from('leads')
        .select('*')
        .not('pitched_at', 'is', null)
        .is('replied_at', null)
        .is('bounced_at', null)
        .not('email', 'is', null)
        .or('unsubscribed.is.null,unsubscribed.eq.false')
        .or('replied.is.null,replied.eq.false');

    const [{ data: stage1 }, { data: stage2 }] = await Promise.all([
      base().or('followup_stage.is.null,followup_stage.eq.0').lte('pitched_at', daysAgo(FOLLOW_UP_DAYS[0])).limit(20),
      base().eq('followup_stage', 1).lte('pitched_at', daysAgo(FOLLOW_UP_DAYS[1])).limit(20),
    ]);

    const budget = await getBudget();
    let left = budget.emailsLeftToday;
    let sentCount = 0;
    const failures: string[] = [];

    const queue: [Lead, 1 | 2][] = [
      ...((stage2 || []) as Lead[]).map((l) => [l, 2] as [Lead, 2]),
      ...((stage1 || []) as Lead[]).map((l) => [l, 1] as [Lead, 1]),
    ];

    for (const [lead, stage] of queue) {
      if (left <= 0) break;
      const subject = lead.initial_subject ? `Re: ${lead.initial_subject}` : 'Re: your website';
      const content = renderEmail(followUpBody(lead.initial_trigger, stage), lead.first_name);
      const sent = await sendOutreachEmail({
        to: lead.email!,
        subject,
        text: content.text,
        html: content.html,
        messageId: newMessageId(),
        inReplyTo: lead.message_id,
      });
      if (sent.error) {
        failures.push(`${lead.company_name}: ${sent.error}`);
        continue;
      }
      left--;
      sentCount++;
      await supabase
        .from('leads')
        .update({
          followup_stage: stage,
          last_followup_at: new Date().toISOString(),
          ...(stage === 2 ? { status: 'completed_no_reply' } : {}),
        })
        .eq('id', lead.id);
      await logEvent('sent_followup', lead.id, sent.id, { stage });
      if (stage === 2 && !lead.opened_at) await notionUpdateStage(lead.notion_page_id, 'No Response');
    }

    await sendDailyDigest().catch((e) => console.error('Digest failed:', e));

    return NextResponse.json({
      message: `Follow-up engine sent ${sentCount} emails.`,
      skippedForBudget: Math.max(0, queue.length - sentCount - failures.length),
      failures,
    });
  } catch (error) {
    console.error('Follow-up Engine Error:', error);
    return NextResponse.json({ error: 'Follow-up engine failed', details: (error as Error).message }, { status: 500 });
  }
}
