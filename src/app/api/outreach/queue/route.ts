import { NextResponse } from 'next/server';
import { supabase, type Lead } from '@/lib/outreach/db';
import { cleanCompanyName, domainOf } from '@/lib/outreach/names';
import { pitchedKeys, repeatReason } from '@/lib/outreach/dedupe';
import { buildPitch, renderEmail } from '../../pitch/pitch-templates';
import { requireAdmin } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

// Next pitch-ready leads, best first, with the exact email that will be sent.
export async function GET(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get('limit') || 15), 50);
  const exclude = (url.searchParams.get('exclude') || '').split(',').filter(Boolean);

  let q = supabase
    .from('leads')
    .select('*')
    .eq('status', 'audited')
    .not('pitch_trigger', 'is', null)
    .eq('email_ok', true)
    .is('pitched_at', null)
    .is('skipped_at', null)
    .order('opportunity_score', { ascending: false, nullsFirst: false })
    .limit(Math.min(limit * 3, 150)); // extra rows, since repeats are dropped below
  if (exclude.length) q = q.not('id', 'in', `(${exclude.join(',')})`);

  const [{ data, error }, keys] = await Promise.all([q, pitchedKeys()]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // One card per business: skip anything already pitched, and later rows with an email or
  // domain already shown higher up (rows are best-first, so the best one is kept).
  const shown = { emails: new Set(keys.emails), domains: new Set(keys.domains) };
  const unique = ((data || []) as Lead[]).filter((lead) => {
    if (repeatReason(lead, shown)) return false;
    if (lead.email) shown.emails.add(lead.email.trim().toLowerCase());
    const d = domainOf(lead.website);
    if (d) shown.domains.add(d);
    return true;
  });

  const leads = unique
    .map((lead) => {
      const pitch = buildPitch(lead);
      if (!pitch) return null;
      return {
        id: lead.id,
        name: cleanCompanyName(lead.company_name),
        rawName: lead.company_name,
        website: lead.website,
        email: lead.email,
        emailSource: lead.audit?.email_source || null,
        firstName: lead.first_name,
        niche: lead.niche,
        city: lead.city,
        country: lead.country,
        notes: lead.notes,
        score: lead.opportunity_score,
        issues: lead.audit?.issues || [],
        loomNotes: lead.audit?.notes || [],
        psi: lead.audit?.psi_mobile ?? null,
        checkedAt: lead.audit?.checked_at || null,
        subject: pitch.subject,
        preview: renderEmail(pitch.body, lead.first_name).text,
        trigger: pitch.trigger,
      };
    })
    .filter(Boolean)
    .slice(0, limit);

  return NextResponse.json({ leads });
}
