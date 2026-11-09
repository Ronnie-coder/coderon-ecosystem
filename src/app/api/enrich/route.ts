import { NextResponse } from 'next/server';
import { supabase, type Lead } from '@/lib/outreach/db';
import { isCronAuthorized } from '@/lib/adminAuth';
import { auditWebsite, hunterLookup, opportunityScore, ratingFromNotes, type Audit } from '@/lib/outreach/audit';
import { domainOf } from '@/lib/outreach/names';
import { AUDIT_FRESH_DAYS } from '@/lib/outreach/config';

export const maxDuration = 60;

const PER_RUN = 4; // each audit can take ~30-45s (PageSpeed), run in parallel within the 60s limit

function summarize(audit: Audit): string {
  const parts = audit.issues.map((i) => `✅ ${i.label}`);
  if (!audit.reachable) parts.push('⚠️ Site unreachable');
  if (audit.reachable && !audit.issues.length) parts.push('No verified issue');
  if (audit.email) parts.push(`✉️ ${audit.email}`);
  return parts.join(', ');
}

async function processLead(lead: Lead) {
  const audit = await auditWebsite(lead.website!, { existingEmail: lead.email });

  // Hunter.io free quota is tiny: only spend it on leads we could actually pitch.
  if (!audit.email && audit.trigger) {
    const domain = domainOf(lead.website);
    const found = domain ? await hunterLookup(domain) : null;
    if (found) {
      audit.email = found.email;
      audit.email_ok = true;
      audit.email_source = 'hunter';
      audit.first_name = found.first_name;
    }
  }

  const baseNotes = (lead.notes || '').split(' | Audit:')[0];
  const { error } = await supabase
    .from('leads')
    .update({
      status: lead.status === 'new' ? 'audited' : lead.status,
      email: audit.email || lead.email,
      email_ok: audit.email_ok,
      first_name: audit.first_name || lead.first_name,
      audit,
      audit_version: 2,
      pitch_trigger: audit.trigger,
      opportunity_score: opportunityScore(audit, ratingFromNotes(lead.notes)),
      notes: `${baseNotes} | Audit: ${summarize(audit)}`,
    })
    .eq('id', lead.id);
  if (error) throw new Error(error.message);
  return audit;
}

// Runs on GitHub Actions (.github/workflows/outreach-jobs.yml). Re-checks pitch-ready leads
// before their check expires, then verifies the backlog and new leads from the hunter.
export async function GET(req: Request) {
  if (!isCronAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const pending = () =>
      supabase
        .from('leads')
        .select('*')
        .not('website', 'is', null)
        .is('pitched_at', null)
        .or('audit_version.is.null,audit_version.lt.2');

    // 1. Pitch-ready leads whose check is getting old (re-checked 4 days before it expires).
    const recheckBefore = new Date(Date.now() - (AUDIT_FRESH_DAYS - 4) * 864e5).toISOString();
    const { data: stale } = await supabase
      .from('leads')
      .select('*')
      .eq('status', 'audited')
      .not('pitch_trigger', 'is', null)
      .is('pitched_at', null)
      .is('skipped_at', null)
      .lt('audit->>checked_at', recheckBefore)
      .order('opportunity_score', { ascending: false, nullsFirst: false })
      .limit(PER_RUN);
    let leads = (stale || []) as Lead[];

    // 2. The unverified backlog, then new leads from the hunter.
    if (leads.length < PER_RUN) {
      const { data: backlog } = await pending().eq('status', 'audited').not('email', 'is', null).limit(PER_RUN - leads.length);
      leads = leads.concat((backlog || []) as Lead[]);
    }
    if (leads.length < PER_RUN) {
      const { data: fresh } = await pending().in('status', ['new', 'audited']).limit(PER_RUN - leads.length);
      leads = leads.concat((fresh || []) as Lead[]);
    }
    if (!leads.length) return NextResponse.json({ message: 'Nothing left to verify.' });

    const results = await Promise.allSettled(leads.map(processLead));
    const report = results.map((r, i) => ({
      company: leads[i].company_name,
      ok: r.status === 'fulfilled',
      trigger: r.status === 'fulfilled' ? r.value.trigger : null,
      email: r.status === 'fulfilled' ? r.value.email : null,
      error: r.status === 'rejected' ? String(r.reason) : undefined,
    }));

    return NextResponse.json({ message: `Verified ${report.filter((r) => r.ok).length} leads.`, report });
  } catch (error) {
    return NextResponse.json({ error: 'Fatal error', details: (error as Error).message }, { status: 500 });
  }
}
