// Cold emails land in the lead's local morning, when people sit down and clear their inbox.
// The hunter only searches a fixed list of cities, so each lead's city gives its time zone
// (with a country fallback). Delivery happens on a weekday between 08:00 and 10:00 local
// time: right away if it's already that time there, otherwise Resend schedules it.

const CITY_TZ: Record<string, string> = {
  'New York, NY': 'America/New_York',
  'Los Angeles, CA': 'America/Los_Angeles',
  'Chicago, IL': 'America/Chicago',
  'Houston, TX': 'America/Chicago',
  'Phoenix, AZ': 'America/Phoenix',
  'Miami, FL': 'America/New_York',
  'Atlanta, GA': 'America/New_York',
  'Dallas, TX': 'America/Chicago',
  'Seattle, WA': 'America/Los_Angeles',
  'Denver, CO': 'America/Denver',
  'Austin, TX': 'America/Chicago',
  'Boston, MA': 'America/New_York',
  'Nashville, TN': 'America/Chicago',
  'Las Vegas, NV': 'America/Los_Angeles',
  'San Diego, CA': 'America/Los_Angeles',
  'Perth, Australia': 'Australia/Perth',
  'Adelaide, Australia': 'Australia/Adelaide',
  'Brisbane, Australia': 'Australia/Brisbane',
  'Vancouver, Canada': 'America/Vancouver',
};

const COUNTRY_TZ: Record<string, string> = {
  'South Africa': 'Africa/Johannesburg',
  'United Kingdom': 'Europe/London',
  Australia: 'Australia/Sydney',
  'New Zealand': 'Pacific/Auckland',
  UAE: 'Asia/Dubai',
  Canada: 'America/Toronto',
  Singapore: 'Asia/Singapore',
  'United States': 'America/New_York',
};

const US_STATE_TZ: Record<string, string> = {
  CA: 'America/Los_Angeles', WA: 'America/Los_Angeles', OR: 'America/Los_Angeles', NV: 'America/Los_Angeles',
  AZ: 'America/Phoenix', CO: 'America/Denver', UT: 'America/Denver', NM: 'America/Denver',
  TX: 'America/Chicago', IL: 'America/Chicago', TN: 'America/Chicago', MN: 'America/Chicago', MO: 'America/Chicago',
};

export const HOME_TZ = 'Africa/Johannesburg';

/** Best time zone for a lead; falls back to South Africa when nothing matches. */
export function leadTimeZone(lead: { city?: string | null; country?: string | null }): string {
  const city = lead.city?.trim() || '';
  if (CITY_TZ[city]) return CITY_TZ[city];
  const state = city.match(/,\s*([A-Z]{2})$/)?.[1];
  if (state && US_STATE_TZ[state]) return US_STATE_TZ[state];
  if (lead.country && COUNTRY_TZ[lead.country]) return COUNTRY_TZ[lead.country];
  return HOME_TZ;
}

type Parts = { y: number; m: number; d: number; h: number; min: number; wd: number };

function partsIn(date: Date, tz: string): Parts {
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', weekday: 'short', hourCycle: 'h23',
  });
  const p = Object.fromEntries(f.formatToParts(date).map((x) => [x.type, x.value]));
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour % 24, min: +p.minute, wd };
}

/** The instant when the wall clock in `tz` shows y-m-d h:min. */
function zonedToUtc(y: number, m: number, d: number, h: number, min: number, tz: string): Date {
  let guess = Date.UTC(y, m - 1, d, h, min);
  for (let i = 0; i < 2; i++) {
    const p = partsIn(new Date(guess), tz);
    const shown = Date.UTC(p.y, p.m - 1, p.d, p.h, p.min);
    guess += Date.UTC(y, m - 1, d, h, min) - shown;
  }
  return new Date(guess);
}

const WINDOW_START = 8 * 60; // 08:00 local
const WINDOW_END = 10 * 60; // 10:00 local
const isWeekday = (wd: number) => wd >= 1 && wd <= 5;

/**
 * When an email to this lead should arrive: `now` if it's a weekday morning there,
 * otherwise the next weekday morning at a random minute between 08:05 and 09:35, so
 * scheduled emails don't all go out on the same second.
 * `notBefore` pushes the earliest time later (used for follow-up due dates).
 */
export function nextMorningSend(
  tz: string,
  now: Date = new Date(),
  opts: { notBefore?: Date; random?: () => number } = {}
): { at: Date; immediate: boolean } {
  const start = opts.notBefore && opts.notBefore > now ? opts.notBefore : now;
  const local = partsIn(start, tz);
  const minuteOfDay = local.h * 60 + local.min;
  if (start === now && isWeekday(local.wd) && minuteOfDay >= WINDOW_START && minuteOfDay < WINDOW_END - 5) {
    return { at: now, immediate: true };
  }
  const offsetMinutes = 5 + Math.floor((opts.random ?? Math.random)() * 90); // 08:05-09:35
  for (let addDays = 0; addDays < 8; addDays++) {
    const day = new Date(Date.UTC(local.y, local.m - 1, local.d + addDays));
    const wd = day.getUTCDay();
    if (!isWeekday(wd)) continue;
    const at = zonedToUtc(day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate(), 8, offsetMinutes, tz);
    if (at > start) return { at, immediate: false };
  }
  return { at: now, immediate: true }; // unreachable, but never block sending
}

/** "Tue 10 Nov, 08:42" in the given time zone. */
export function formatLocal(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(date);
}

/** Short place name for the time zone, e.g. "Los Angeles" from America/Los_Angeles. */
export function zoneLabel(tz: string): string {
  return tz.split('/').pop()!.replace(/_/g, ' ');
}
