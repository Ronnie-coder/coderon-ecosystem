import { NextResponse } from 'next/server';
import { supabase } from '@/lib/outreach/db';
import { cleanCompanyName } from '@/lib/outreach/names';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data, error } = await supabase
    .from('leads')
    .select('id, company_name, website, email, niche, country, initial_trigger, initial_subject, pitched_at, delivered_at, opened_at, open_count, clicked_at, replied_at, bounced_at, call_booked_at, won_at, lost_at, deal_value, followup_stage, unsubscribed, notes')
    .not('pitched_at', 'is', null)
    .order('pitched_at', { ascending: false })
    .limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leads: (data || []).map((l) => ({ ...l, name: cleanCompanyName(l.company_name) })) });
}
