import { supabase } from './db';
import { domainOf } from './names';

// One business, one pitch. A business can be saved more than once (www or not, http or
// https, a branch page) and can list several addresses, so duplicates are matched on the
// email address (any case) and on the website's domain.

const norm = (email: string | null | undefined) => (email || '').trim().toLowerCase();

/** Emails and domains that have already been pitched. */
export async function pitchedKeys(): Promise<{ emails: Set<string>; domains: Set<string> }> {
  const { data, error } = await supabase.from('leads').select('email, website').not('pitched_at', 'is', null).limit(20000);
  if (error) throw new Error(error.message);
  const emails = new Set<string>();
  const domains = new Set<string>();
  for (const r of data || []) {
    if (r.email) emails.add(norm(r.email));
    const d = domainOf(r.website);
    if (d) domains.add(d);
  }
  return { emails, domains };
}

/** Why this lead would be a repeat pitch, or null when it is new. */
export function repeatReason(
  lead: { email: string | null; website: string | null },
  keys: { emails: Set<string>; domains: Set<string> }
): string | null {
  if (lead.email && keys.emails.has(norm(lead.email))) return 'This email was already pitched';
  const d = domainOf(lead.website);
  if (d && keys.domains.has(d)) return 'This business (same website) was already pitched';
  return null;
}

/** Domains from the list that are already saved as a lead (so the hunter can skip them). */
export async function savedDomains(domains: string[]): Promise<Set<string>> {
  const unique = [...new Set(domains.filter((d) => /^[a-z0-9.-]+$/.test(d)))];
  const found = new Set<string>();
  // Small batches keep the OR filter short.
  for (let i = 0; i < unique.length; i += 20) {
    const batch = unique.slice(i, i + 20);
    const { data, error } = await supabase
      .from('leads')
      .select('website')
      .or(batch.map((d) => `website.ilike.*${d}*`).join(','));
    if (error) throw new Error(error.message);
    for (const r of data || []) {
      const d = domainOf(r.website);
      if (d && batch.includes(d)) found.add(d);
    }
  }
  return found;
}
