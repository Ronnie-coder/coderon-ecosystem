import { NextResponse } from 'next/server';
import { supabase } from '@/lib/outreach/db';
import { getBudget } from '@/lib/outreach/budget';
import { TIMEZONE, auditFreshSinceISO, HOME_COUNTRY, showAllRegions } from '@/lib/outreach/config';
import { requireAdmin } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

async function count(build: (q: any) => any, allRegions: boolean): Promise<number> {
  const base = supabase.from('leads').select('id', { count: 'exact', head: true });
  const { count } = await build(allRegions ? base : base.eq('country', HOME_COUNTRY));
  return count || 0;
}

const pitchReady = (q: any) =>
  q.eq('status', 'audited').not('pitch_trigger', 'is', null).eq('email_ok', true).is('pitched_at', null).is('skipped_at', null).gte('audit->>checked_at', auditFreshSinceISO());

function localDay(iso: string) {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: TIMEZONE });
}

// True totals via COUNT queries (the old dashboard downloaded rows and hit Supabase's 1,000-row cap).
export async function GET(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  try {
    const all = showAllRegions(new URL(req.url));
    const pitchedQuery = supabase
      .from('leads')
      .select('niche, country, initial_trigger, pitched_at, delivered_at, opened_at, clicked_at, replied_at, bounced_at, call_booked_at, won_at, deal_value, followup_stage')
      .not('pitched_at', 'is', null)
      .limit(10000);
    const [total, verified, queue, noIssue, unverifiedBacklog, budget, pitchedRows] = await Promise.all([
      count((q) => q, all),
      count((q) => q.eq('audit_version', 2), all),
      count(pitchReady, all),
      count((q) => q.eq('audit_version', 2).is('pitch_trigger', null), all),
      count((q) => q.not('website', 'is', null).is('pitched_at', null).or('audit_version.is.null,audit_version.lt.2'), all),
      getBudget(), // email budget is account-wide, so it never filters by region
      all ? pitchedQuery : pitchedQuery.eq('country', HOME_COUNTRY),
    ]);

    const rows = pitchedRows.data || [];
    const funnel = {
      pitched: rows.length,
      delivered: rows.filter((r) => r.delivered_at || r.opened_at).length,
      opened: rows.filter((r) => r.opened_at).length,
      clicked: rows.filter((r) => r.clicked_at).length,
      replied: rows.filter((r) => r.replied_at).length,
      calls: rows.filter((r) => r.call_booked_at).length,
      won: rows.filter((r) => r.won_at).length,
      bounced: rows.filter((r) => r.bounced_at).length,
      followups: rows.reduce((s, r) => s + (r.followup_stage || 0), 0),
      revenue: rows.reduce((s, r) => s + (r.won_at ? Number(r.deal_value) || 0 : 0), 0),
    };

    // Streak: consecutive local days (ending today or yesterday) with at least one pitch.
    const days = new Set(rows.map((r) => localDay(r.pitched_at)));
    let streak = 0;
    const cursor = new Date();
    if (!days.has(localDay(cursor.toISOString()))) cursor.setDate(cursor.getDate() - 1);
    while (days.has(localDay(cursor.toISOString()))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    // Last 14 days of pitches for the activity strip.
    const activity = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(Date.now() - (13 - i) * 864e5);
      const key = localDay(d.toISOString());
      return { day: key, pitches: rows.filter((r) => localDay(r.pitched_at) === key).length };
    });

    const group = (key: 'niche' | 'country' | 'initial_trigger') => {
      const m = new Map<string, { name: string; sent: number; opened: number; clicked: number; replied: number }>();
      for (const r of rows) {
        const name = (r[key] as string) || 'Unknown';
        const e = m.get(name) || { name, sent: 0, opened: 0, clicked: 0, replied: 0 };
        e.sent++;
        if (r.opened_at) e.opened++;
        if (r.clicked_at) e.clicked++;
        if (r.replied_at) e.replied++;
        m.set(name, e);
      }
      return [...m.values()].sort((a, b) => b.sent - a.sent);
    };

    return NextResponse.json({
      total,
      verified,
      queue,
      noIssue,
      unverifiedBacklog,
      budget,
      funnel,
      streak,
      activity,
      byNiche: group('niche'),
      byCountry: group('country'),
      byTrigger: group('initial_trigger'),
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
