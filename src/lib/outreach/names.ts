// "Evan Downey | Evan Downey Real Estate Group, eXp Realty" -> "Evan Downey Real Estate Group"
// "FOX Roofing | Dallas" -> "FOX Roofing"
const LEGAL = /\b(llc|l\.l\.c\.|inc\.?|ltd\.?|limited|pty|\(pty\)|co\.|corp\.?|plc|gmbh)\b\.?/gi;

export function cleanCompanyName(raw: string | null | undefined): string {
  if (!raw) return 'your business';
  const parts = raw
    .split(/\s*\|\s*|\s[–—-]\s|,\s/)
    .map((p) => p.trim())
    .filter(Boolean);
  // Take the first segment, unless a later segment extends it ("Evan Downey" -> "Evan Downey Real Estate Group").
  let name = parts[0] || raw;
  const extended = parts.slice(1).find((p) => p.toLowerCase().startsWith(name.toLowerCase()) && p.length > name.length);
  if (extended) name = extended;
  name = name.replace(LEGAL, '').replace(/\s{2,}/g, ' ').replace(/[\s,.-]+$/, '').trim();
  if (name.length > 45) name = name.slice(0, 45).replace(/\s\S*$/, '');
  return name || raw.trim();
}

export function domainOf(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return null;
  }
}
