import { NextResponse } from 'next/server';
import { supabase, type Lead } from '@/lib/outreach/db';
import { cleanCompanyName } from '@/lib/outreach/names';
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
    .limit(limit);
  if (exclude.length) q = q.not('id', 'in', `(${exclude.join(',')})`);

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const leads = ((data || []) as Lead[])
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
    .filter(Boolean);

  return NextResponse.json({ leads });
}
