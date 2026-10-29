import { supabase } from './db';
import { RESEND_DAILY_CAP, RESEND_MONTHLY_CAP, dailyPitchTarget, startOfMonthISO, startOfTodayISO } from './config';

async function countEvents(types: string[], sinceISO: string): Promise<number> {
  const { count } = await supabase
    .from('email_events')
    .select('id', { count: 'exact', head: true })
    .in('type', types)
    .gte('created_at', sinceISO);
  return count || 0;
}

export async function getBudget() {
  const today = startOfTodayISO();
  const [pitchesToday, followupsToday, emailsMonth] = await Promise.all([
    countEvents(['sent_pitch'], today),
    countEvents(['sent_followup'], today),
    countEvents(['sent_pitch', 'sent_followup'], startOfMonthISO()),
  ]);
  const emailsToday = pitchesToday + followupsToday;
  const target = dailyPitchTarget();
  return {
    pitchesToday,
    followupsToday,
    emailsToday,
    emailsMonth,
    target,
    dailyCap: RESEND_DAILY_CAP,
    monthlyCap: RESEND_MONTHLY_CAP,
    emailsLeftToday: Math.max(0, Math.min(RESEND_DAILY_CAP - emailsToday, RESEND_MONTHLY_CAP - emailsMonth)),
  };
}
