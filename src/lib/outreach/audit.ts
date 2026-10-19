// Verified website auditor (v2).
//
// Rule: an issue only becomes a pitch trigger when it is (1) confirmed by a second check and
// (2) something the business owner can verify themselves. Everything else is kept as a
// "note" for the Loom video, never claimed in an email.
import { promises as dns } from 'dns';
import { domainOf } from './names';

export type Trigger = 'ssl' | 'speed' | 'mobile' | 'snippet';

export type Issue = {
  key: Trigger;
  severity: number;
  label: string; // short chip text for the dashboard
  evidence: string; // the fact, phrased so the prospect can check it
};

export type Audit = {
  version: 2;
  checked_at: string;
  url: string;
  reachable: boolean;
  https_ok: boolean | null;
  http_ok: boolean | null;
  final_url: string | null;
  load_ms: number | null;
  title: string | null;
  meta_description: string | null;
  has_viewport: boolean | null;
  text_length: number | null;
  js_shell: boolean | null;
  psi_mobile: number | null; // Google PageSpeed Insights mobile performance score 0-100
  psi_lcp_s: number | null; // Largest Contentful Paint, seconds (lab, mobile)
  tracking: { gtm: boolean; meta_pixel: boolean; google_analytics: boolean; google_ads: boolean } | null;
  issues: Issue[];
  notes: string[]; // unclaimed observations, for the Loom only
  trigger: Trigger | null;
  email: string | null;
  email_source: string | null;
  email_ok: boolean;
  emails_found: string[];
  first_name: string | null;
};

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36';

async function fetchText(url: string, timeoutMs: number): Promise<{ ok: boolean; status: number; url: string; html: string; ms: number } | null> {
  const t0 = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, redirect: 'follow', headers: { 'User-Agent': UA, Accept: 'text/html' } });
    const html = (await res.text()).slice(0, 1_500_000);
    return { ok: res.status < 400, status: res.status, url: res.url, html, ms: Date.now() - t0 };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ---------- HTML parsing -----------------------------------------------------------------

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function metaContent(html: string, name: string): string | null {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const n = tag.match(/\b(?:name|property)\s*=\s*["']([^"']+)["']/i)?.[1];
    if (n && n.toLowerCase() === name) {
      const c = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1];
      return c != null ? decode(c) : '';
    }
  }
  return null;
}

function visibleTextLength(html: string): number {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  return decode(
    body
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  ).length;
}

function parseHtml(html: string) {
  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '') || null;
  const metaDescription = metaContent(html, 'description');
  const hasViewport = metaContent(html, 'viewport') !== null;
  const textLength = visibleTextLength(html);
  // A page whose real content is rendered by JavaScript: very little server HTML text.
  const jsShell = textLength < 400;
  const tracking = {
    gtm: /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]{4,}/.test(html),
    meta_pixel: /connect\.facebook\.net\/[^"']*fbevents\.js|fbq\(\s*['"]init/.test(html),
    google_analytics: /gtag\/js\?id=G-|google-analytics\.com\/(analytics|ga)\.js|['"]G-[A-Z0-9]{6,}['"]/.test(html),
    google_ads: /gtag\/js\?id=AW-|['"]AW-\d{6,}['"]|googleadservices\.com/.test(html),
  };
  return { title, metaDescription, hasViewport, textLength, jsShell, tracking };
}

// ---------- Email discovery ----------------------------------------------------------------

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const FREEMAIL = /^(gmail|googlemail|outlook|hotmail|live|yahoo|icloud|me|aol|proton|protonmail|gmx|zoho|mail|msn|bigpond|btinternet|sky|xtra|optusnet|telkomsa|webmail|vodamail)\./i;
const JUNK_DOMAINS =
  /(^|\.)(example\.(com|org|net)|domain\.com|email\.com|yourdomain\.com|yoursite\.com|website\.com|company\.com|sentry\.io|sentry-next\.wixpress\.com|wixpress\.com|wix\.com|squarespace\.com|godaddy\.com|mysite\.com|test\.com|placeholder\.com|latofonts\.com|schema\.org|w3\.org|ingest\.sentry\.io|cloudflare\.com|jquery\.com|sentry\.wixpress\.com)$/i;
const JUNK_LOCAL = /^(user|username|name|yourname|your\.?name|first\.?last|firstname|email|you|someone|john\.?doe|jane\.?doe|test|example|noreply|no-reply|donotreply|do-not-reply|privacy|abuse|postmaster|webmaster|hostmaster|admin)$/i;
const ROLE_PREFERRED = /^(info|hello|contact|office|enquiries|enquiry|inquiries|sales|admin|bookings|service|support|team|mail)$/i;

export function cleanEmail(raw: string): string | null {
  const email = raw.trim().replace(/^mailto:/i, '').replace(/[.,;:)]+$/, '').toLowerCase();
  const [local, domain] = email.split('@');
  if (!local || !domain) return null;
  if (/\.(png|jpe?g|gif|webp|svg|css|js)$/i.test(domain)) return null;
  if (/^[0-9a-f]{16,}$/i.test(local)) return null; // hashed tracking ids (sentry etc.)
  if (JUNK_DOMAINS.test(domain) || JUNK_LOCAL.test(local)) return null;
  return email;
}

function rankEmails(emails: string[], siteDomain: string | null): string[] {
  const score = (e: string) => {
    const [local, domain] = e.split('@');
    let s = 0;
    if (siteDomain && (domain === siteDomain || domain.endsWith(`.${siteDomain}`) || siteDomain.endsWith(`.${domain}`))) s += 100;
    else if (FREEMAIL.test(domain)) s += 40; // small businesses often run on Gmail (Delta & UltraVolt both did, and opened)
    if (ROLE_PREFERRED.test(local)) s += 10;
    return s;
  };
  return [...new Set(emails)].filter((e) => score(e) >= 40).sort((a, b) => score(b) - score(a));
}

function extractEmails(html: string): string[] {
  const out: string[] = [];
  for (const m of html.match(/mailto:[^"'?>\s]+/gi) || []) {
    const e = cleanEmail(decodeURIComponent(m));
    if (e) out.push(e);
  }
  for (const m of html.match(EMAIL_RE) || []) {
    const e = cleanEmail(m);
    if (e) out.push(e);
  }
  return out;
}

const mxCache = new Map<string, boolean>();
export async function hasMx(domain: string): Promise<boolean> {
  if (mxCache.has(domain)) return mxCache.get(domain)!;
  let ok = false;
  try {
    const records = await dns.resolveMx(domain);
    ok = records.some((r) => r.exchange && r.exchange !== '.');
  } catch {
    ok = false;
  }
  mxCache.set(domain, ok);
  return ok;
}

// ---------- Google PageSpeed Insights (free) ---------------------------------------------

async function pageSpeed(url: string): Promise<{ score: number; lcp: number | null } | null> {
  const params = new URLSearchParams({ url, strategy: 'mobile', category: 'performance' });
  if (process.env.PAGESPEED_API_KEY) params.set('key', process.env.PAGESPEED_API_KEY);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`, { signal: controller.signal });
    if (!res.ok) return null;
    const data = await res.json();
    const raw = data?.lighthouseResult?.categories?.performance?.score;
    if (typeof raw !== 'number') return null;
    const lcpMs = data?.lighthouseResult?.audits?.['largest-contentful-paint']?.numericValue;
    return { score: Math.round(raw * 100), lcp: typeof lcpMs === 'number' ? Math.round(lcpMs / 100) / 10 : null };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ---------- Main --------------------------------------------------------------------------

export function ratingFromNotes(notes: string | null | undefined): number | null {
  const m = notes?.match(/Rating:\s*([\d.]+)/);
  return m ? Number(m[1]) : null;
}

export function opportunityScore(audit: Audit, rating: number | null): number {
  if (!audit.trigger) return 0;
  const issues = audit.issues.reduce((s, i) => s + i.severity, 0);
  const reviews = rating == null ? 0 : rating >= 4.5 ? 15 : rating >= 4 ? 8 : 0; // good business, weak site = best lead
  const reach = audit.email_source === 'site-domain' ? 10 : 0;
  return Math.min(100, issues + reviews + reach);
}

export async function auditWebsite(
  website: string,
  opts: { existingEmail?: string | null; runPageSpeed?: boolean } = {}
): Promise<Audit> {
  const domain = domainOf(website);
  const httpsUrl = `https://${domain ?? website.replace(/^https?:\/\//, '')}`;
  const httpUrl = httpsUrl.replace(/^https:/, 'http:');

  const audit: Audit = {
    version: 2,
    checked_at: new Date().toISOString(),
    url: httpsUrl,
    reachable: false,
    https_ok: null,
    http_ok: null,
    final_url: null,
    load_ms: null,
    title: null,
    meta_description: null,
    has_viewport: null,
    text_length: null,
    js_shell: null,
    psi_mobile: null,
    psi_lcp_s: null,
    tracking: null,
    issues: [],
    notes: [],
    trigger: null,
    email: null,
    email_source: null,
    email_ok: false,
    emails_found: [],
    first_name: null,
  };

  // 1. HTTPS first. Chrome auto-upgrades typed addresses to https, so "not secure" is only
  //    true when the https version genuinely fails (checked twice) while http works.
  let page = await fetchText(httpsUrl, 7000);
  if (page && page.ok && page.url.startsWith('https://')) {
    audit.https_ok = true;
  } else {
    const retry = await fetchText(httpsUrl, 7000);
    if (retry && retry.ok && retry.url.startsWith('https://')) {
      audit.https_ok = true;
      page = retry;
    } else {
      const httpPage = await fetchText(httpUrl, 7000);
      audit.http_ok = Boolean(httpPage && httpPage.ok);
      if (audit.http_ok && httpPage && httpPage.url.startsWith('http://')) {
        audit.https_ok = false;
        page = httpPage;
      } else if (httpPage && httpPage.ok) {
        // http redirected to a working https URL on another host; treat as secure.
        audit.https_ok = true;
        page = httpPage;
      } else {
        audit.https_ok = null; // site down or blocking us: no claims at all
        page = null;
      }
    }
  }

  const psiPromise = page && opts.runPageSpeed !== false ? pageSpeed(page.url) : Promise.resolve(null);

  if (page) {
    audit.reachable = true;
    audit.final_url = page.url;
    audit.load_ms = page.ms;
    const parsed = parseHtml(page.html);
    audit.title = parsed.title;
    audit.meta_description = parsed.metaDescription;
    audit.has_viewport = parsed.hasViewport;
    audit.text_length = parsed.textLength;
    audit.js_shell = parsed.jsShell;
    audit.tracking = parsed.tracking;

    // Emails: homepage, then contact/about pages.
    let found = extractEmails(page.html);
    if (rankEmails(found, domain).length === 0) {
      const subs = await Promise.all(
        ['/contact', '/contact-us', '/about', '/about-us'].map((path) => fetchText(new URL(path, page!.url).href, 6000))
      );
      for (const sub of subs) if (sub?.ok) found = found.concat(extractEmails(sub.html));
    }
    audit.emails_found = [...new Set(found)].slice(0, 10);
  }

  // 2. Issues (claimable) --------------------------------------------------------------
  if (audit.https_ok === false && audit.http_ok) {
    audit.issues.push({
      key: 'ssl',
      severity: 45,
      label: 'No working HTTPS',
      evidence: `https://${domain} doesn't load, so browsers show "Not secure" on ${domain}`,
    });
  }

  {
    const psi = await psiPromise;
    if (psi) {
      audit.psi_mobile = psi.score;
      audit.psi_lcp_s = psi.lcp;
      if (psi.score < 50) {
        audit.issues.push({
          key: 'speed',
          severity: psi.score < 30 ? 40 : 30,
          label: `PageSpeed ${psi.score}/100`,
          evidence: `Google PageSpeed (mobile) scores the site ${psi.score}/100${psi.lcp ? `, main content shows after ~${psi.lcp}s` : ''}`,
        });
      }
    }
  }

  if (audit.reachable && audit.has_viewport === false && !audit.js_shell) {
    audit.issues.push({
      key: 'mobile',
      severity: 35,
      label: 'Not mobile-friendly',
      evidence: 'No mobile viewport tag, so phones show a shrunk desktop page',
    });
  }

  if (audit.reachable && !audit.js_shell && (audit.meta_description === null || audit.meta_description === '' || !audit.title)) {
    audit.issues.push({
      key: 'snippet',
      severity: 15,
      label: !audit.title ? 'No page title' : 'No Google description',
      evidence: !audit.title
        ? 'The homepage has no title, the headline Google shows in search results'
        : 'The homepage has no meta description, so Google picks its own text under the name',
    });
  }

  // 3. Unclaimed notes for the Loom (never used as pitch triggers) ---------------------
  if (audit.tracking) {
    if (!audit.tracking.google_analytics && !audit.tracking.gtm) audit.notes.push('No Google Analytics or Tag Manager found in the page source');
    if (!audit.tracking.meta_pixel && !audit.tracking.gtm) audit.notes.push('No Meta Pixel found in the page source');
    if (audit.tracking.google_ads) audit.notes.push('Google Ads conversion tag present');
  }
  if (audit.js_shell) audit.notes.push('Content is rendered by JavaScript; HTML checks skipped');
  if (!audit.reachable) audit.notes.push('Site did not load (down or blocking bots); no claims made');

  audit.issues.sort((a, b) => b.severity - a.severity);
  audit.trigger = audit.issues[0]?.key ?? null;

  // 4. Email: keep the existing one if it is valid, otherwise use the best one found.
  const candidates = rankEmails(
    [opts.existingEmail ? cleanEmail(opts.existingEmail) : null, ...audit.emails_found].filter(Boolean) as string[],
    domain
  );
  for (const email of candidates) {
    if (await hasMx(email.split('@')[1])) {
      audit.email = email;
      audit.email_ok = true;
      const emailDomain = email.split('@')[1];
      audit.email_source = domain && (emailDomain === domain || emailDomain.endsWith(`.${domain}`)) ? 'site-domain' : 'freemail';
      break;
    }
  }

  return audit;
}

// Optional Hunter.io lookup. Free plan = 25 searches/month, so only call for leads that
// are otherwise pitchable and have no usable email.
export async function hunterLookup(domain: string): Promise<{ email: string; first_name: string | null } | null> {
  const key = process.env.HUNTER_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`https://api.hunter.io/v2/domain-search?domain=${encodeURIComponent(domain)}&limit=5&api_key=${key}`);
    const data = await res.json();
    const emails: { value: string; first_name?: string; confidence?: number; verification?: { status?: string } }[] = data?.data?.emails || [];
    const best = emails
      .filter((e) => e.verification?.status !== 'invalid' && (e.confidence ?? 0) >= 70)
      .sort((a, b) => (b.confidence ?? 0) - (a.confidence ?? 0))[0];
    if (!best) return null;
    const email = cleanEmail(best.value);
    return email ? { email, first_name: best.first_name || null } : null;
  } catch {
    return null;
  }
}
