import { NextResponse } from 'next/server';
import { supabase, logEvent, type Lead } from '@/lib/outreach/db';
import { isCronAuthorized } from '@/lib/adminAuth';
import { getBudget } from '@/lib/outreach/budget';
import { FOLLOW_UP_DAYS } from '@/lib/outreach/config';
import { formatLocal, leadTimeZone, nextMorningSend, zoneLabel } from '@/lib/outreach/sendTime';
import { newMessageId, sendOutreachEmail } from '@/lib/outreach/send';
import { notionUpdateStage } from '@/lib/outreach/notion';
import { sendDailyDigest } from '@/lib/outreach/digest';
import { followUpBody, renderEmail } from '../pitch/pitch-templates';

export const maxDuration = 60;

// Runs daily on GitHub Actions. Sends follow-up 1 on day 3 and follow-up 2 on day 7 (each
// within a 7-day window) to every pitched lead that hasn't replied, bounced or unsubscribed,
// opened or not. Then sends Ronnie the daily digest.
export async function GET(req: Request) {
  if (!isCronAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const now = Date.now();

    // Every pitched lead that can still get a follow-up. The rules are applied in code (not
    // stacked OR filters) and a database error stops the run instead of reading as "0 due".
    const { data: pitched, error: pitchedError } = await supabase
      .from('leads')
      .select('*')
      .not('pitched_at', 'is', null)
      .not('email', 'is', null)
      .is('replied_at', null)
      .is('bounced_at', null)
      .limit(5000);
    if (pitchedError) throw new Error(`Could not load pitched leads: ${pitchedError.message}`);

    const open = ((pitched || []) as Lead[]).filter((l) => !l.unsubscribed && !(l as Lead & { replied?: boolean | null }).replied && (l.followup_stage ?? 0) < 2);
    const dueAt = (l: Lead) => {
      const stage = (l.followup_stage ?? 0) as 0 | 1;
      return Date.parse(l.pitched_at!) + FOLLOW_UP_DAYS[stage] * 864e5;
    };
    // A follow-up only makes sense close to the pitch: each one has a 7-day window
    // (day 3-10 and day 7-14). Missed windows are listed, never sent weeks late.
    const WINDOW_MS = 7 * 864e5;
    // The job runs once a day, so anything due within the next 24 hours is scheduled now
    // for the lead's own weekday morning.
    const LOOKAHEAD_MS = 864e5;
    const due = open.filter((l) => dueAt(l) <= now + LOOKAHEAD_MS && now - dueAt(l) <= WINDOW_MS);
    const missed = open
      .filter((l) => now - dueAt(l) > WINDOW_MS)
      .map((l) => `${l.company_name} (pitched ${l.pitched_at!.slice(0, 10)}, follow-up ${(l.followup_stage ?? 0) + 1} window passed)`);
    const stage1 = due.filter((l) => (l.followup_stage ?? 0) === 0).slice(0, 20);
    const stage2 = due.filter((l) => l.followup_stage === 1).slice(0, 20);

    // What's coming, for the run log and the daily digest.
    const upcoming = open
      .filter((l) => dueAt(l) > now + LOOKAHEAD_MS)
      .sort((a, b) => dueAt(a) - dueAt(b))
      .slice(0, 10)
      .map((l) => `${l.company_name}: follow-up ${(l.followup_stage ?? 0) + 1} on ${new Date(dueAt(l)).toISOString().slice(0, 10)}`);

    const budget = await getBudget();
    let left = budget.emailsLeftToday;
    let sentCount = 0;
    const failures: string[] = [];
    const scheduled: string[] = [];

    const queue: [Lead, 1 | 2][] = [
      ...((stage2 || []) as Lead[]).map((l) => [l, 2] as [Lead, 2]),
      ...((stage1 || []) as Lead[]).map((l) => [l, 1] as [Lead, 1]),
    ];

    for (const [lead, stage] of queue) {
      if (left <= 0) break;
      const subject = lead.initial_subject ? `Re: ${lead.initial_subject}` : 'Re: your website';
      const content = renderEmail(followUpBody(lead.initial_trigger, stage), lead.first_name);
      const tz = leadTimeZone(lead);
      const plan = nextMorningSend(tz, new Date(now), { notBefore: new Date(dueAt(lead)) });
      const sendAt = plan.at.toISOString();
      const sent = await sendOutreachEmail({
        to: lead.email!,
        subject,
        text: content.text,
        html: content.html,
        messageId: newMessageId(),
        inReplyTo: lead.message_id,
        scheduledAt: plan.immediate ? null : sendAt,
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
          last_followup_at: sendAt, // when it lands in their inbox
          ...(stage === 2 ? { status: 'completed_no_reply' } : {}),
        })
        .eq('id', lead.id);
      await logEvent('sent_followup', lead.id, sent.id, { stage, send_at: sendAt, tz });
      scheduled.push(`${lead.company_name}: follow-up ${stage} → ${formatLocal(plan.at, tz)} (${zoneLabel(tz)})`);
      if (stage === 2 && !lead.opened_at) await notionUpdateStage(lead.notion_page_id, 'No Response');
    }

    await sendDailyDigest().catch((e) => console.error('Digest failed:', e));

    return NextResponse.json({
      message: `Follow-up engine queued ${sentCount} emails (sent now or scheduled for the lead's morning).`,
      pitched: (pitched || []).length,
      waiting: open.length,
      finished: (pitched || []).filter((l) => (l.followup_stage ?? 0) >= 2).length,
      scheduled,
      upcoming,
      missed,
      skippedForBudget: Math.max(0, queue.length - sentCount - failures.length),
      failures,
    });
  } catch (error) {
    console.error('Follow-up Engine Error:', error);
    return NextResponse.json({ error: 'Follow-up engine failed', details: (error as Error).message }, { status: 500 });
  }
}
