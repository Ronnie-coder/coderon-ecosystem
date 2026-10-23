// Free-tier guard rails. Resend free = 100 emails/day + 3,000/month, so outreach
// (pitches + follow-ups) is capped below that and new pitches ramp up weekly.

export const RESEND_DAILY_CAP = Number(process.env.OUTREACH_DAILY_EMAIL_CAP || 80);
export const RESEND_MONTHLY_CAP = Number(process.env.OUTREACH_MONTHLY_EMAIL_CAP || 2800);

// Week 1: 10/day, week 2: 15, week 3: 20, week 4+: 25 (max on the free plan).
const RAMP = [10, 15, 20, 25];
const RAMP_START = process.env.OUTREACH_RAMP_START || '2026-10-15';

export function dailyPitchTarget(now = new Date()): number {
  if (process.env.OUTREACH_DAILY_PITCH_TARGET) return Number(process.env.OUTREACH_DAILY_PITCH_TARGET);
  const weeks = Math.floor((now.getTime() - new Date(RAMP_START).getTime()) / (7 * 864e5));
  return RAMP[Math.min(Math.max(weeks, 0), RAMP.length - 1)];
}

// Day boundary in South African time, so "today" matches Ronnie's day.
export const TIMEZONE = 'Africa/Johannesburg';

export function startOfTodayISO(now = new Date()): string {
  const local = new Date(now.toLocaleString('en-US', { timeZone: TIMEZONE }));
  const offsetMs = local.getTime() - now.getTime();
  const localMidnight = new Date(local);
  localMidnight.setHours(0, 0, 0, 0);
  return new Date(localMidnight.getTime() - offsetMs).toISOString();
}

export function startOfMonthISO(now = new Date()): string {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
}

export const FOLLOW_UP_DAYS = [3, 7];

export const SENDER = process.env.OUTREACH_FROM || 'Ronnie <ronnie@coderon.co.za>';
export const REPLY_TO = process.env.OUTREACH_REPLY_TO || 'ronnie@coderon.co.za';
export const BUSINESS_ADDRESS =
  process.env.BUSINESS_ADDRESS || 'Coderon (Pty) Ltd · Reg 2025/482790/07 · Cape Town, South Africa';
