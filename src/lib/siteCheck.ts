// Free website check for visitors (/website-check).
// Same honesty rule as the outreach auditor: every result is something the visitor can check
// themselves, and anything we could not test is shown as "could not test", never as a fail.
import { promises as dns } from 'dns';
import net from 'net';
import { parseHtml } from '@/lib/outreach/audit';

export type CheckStatus = 'good' | 'warn' | 'bad' | 'unknown';

export type CheckItem = {
  key: 'speed' | 'https' | 'mobile' | 'title' | 'description' | 'seo' | 'accessibility';
  label: string;
  status: CheckStatus;
  detail: string;
};

export type SiteCheckResult = {
  url: string;
  finalUrl: string | null;
  reachable: boolean;
  scores: { performance: number | null; seo: number | null; accessibility: number | null; bestPractices: number | null };
  lcpSeconds: number | null;
  items: CheckItem[];
  summary: { good: number; warn: number; bad: number };
  checkedAt: string;
};

export class CheckInputError extends Error {}

/** Turns what the visitor typed into a safe https URL, or throws CheckInputError. */
export async function normaliseTarget(input: string): Promise<URL> {
  const raw = String(input || '').trim();
  if (!raw || raw.length > 300) throw new CheckInputError('Please enter your website address, like yourbusiness.co.za');
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    throw new CheckInputError('That does not look like a website address. Try something like yourbusiness.co.za');
  }
  const host = url.hostname.toLowerCase();
  if (url.username || url.password || (url.port && !['80', '443'].includes(url.port))) {
    throw new CheckInputError('Please enter a normal website address, without a port or login.');
  }
  if (net.isIP(host) || !host.includes('.') || /(^|\.)(localhost|local|internal|lan|home|corp)$/.test(host)) {
    throw new CheckInputError('Please enter a public website address, like yourbusiness.co.za');
  }
  // Refuse anything that resolves to a private or reserved network (no internal probing).
  let addresses: { address: string }[] = [];
  try {
    addresses = await dns.lookup(host, { all: true });
  } catch {
    throw new CheckInputError(`We could not find ${host}. Check the spelling and try again.`);
  }
  if (!addresses.length || addresses.some((a) => isPrivateAddress(a.address))) {
    throw new CheckInputError('Please enter a public website address.');
  }
  url.protocol = 'https:';
  url.hash = '';
  return url;
}

function isPrivateAddress(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    return (
      a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224
    );
  }
  const v6 = ip.toLowerCase();
  return v6 === '::1' || v6 === '::' || v6.startsWith('fc') || v6.startsWith('fd') || v6.startsWith('fe80') || v6.startsWith('::ffff:');
}


const UA = 'Mozilla/5.0 (compatible; CoderonWebsiteCheck/1.0; +https://www.coderon.co.za/website-check/)';

async function resolvesPublic(host: string): Promise<boolean> {
  if (net.isIP(host)) return !isPrivateAddress(host);
  try {
    const addresses = await dns.lookup(host, { all: true });
    return addresses.length > 0 && !addresses.some((a) => isPrivateAddress(a.address));
  } catch {
    return false;
  }
}

/** GET a page, following up to 5 redirects and re-checking every hop against private networks. */
async function fetchText(start: string, timeoutMs: number): Promise<{ ok: boolean; url: string; html: string } | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let url = start;
    for (let hop = 0; hop < 6; hop++) {
      const u = new URL(url);
      if (!['http:', 'https:'].includes(u.protocol) || !(await resolvesPublic(u.hostname))) return null;
      const res = await fetch(url, { signal: controller.signal, redirect: 'manual', headers: { 'User-Agent': UA, Accept: 'text/html' } });
      const location = res.headers.get('location');
      if (res.status >= 300 && res.status < 400 && location) {
        url = new URL(location, url).href;
        continue;
      }
      const html = (await res.text()).slice(0, 1_500_000);
      return { ok: res.status < 400, url, html };
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

type Psi = { performance: number | null; seo: number | null; accessibility: number | null; bestPractices: number | null; lcp: number | null };

async function pageSpeedFull(url: string): Promise<Psi | null> {
  const params = new URLSearchParams({ url, strategy: 'mobile' });
  for (const c of ['performance', 'seo', 'accessibility', 'best-practices']) params.append('category', c);
  if (process.env.PAGESPEED_API_KEY) params.set('key', process.env.PAGESPEED_API_KEY);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45_000);
  try {
    const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`, { signal: controller.signal });
    if (!res.ok) return null;
    const data = await res.json();
    const cat = data?.lighthouseResult?.categories ?? {};
    const pct = (v: unknown) => (typeof v === 'number' ? Math.round(v * 100) : null);
    const lcpMs = data?.lighthouseResult?.audits?.['largest-contentful-paint']?.numericValue;
    return {
      performance: pct(cat.performance?.score),
      seo: pct(cat.seo?.score),
      accessibility: pct(cat.accessibility?.score),
      bestPractices: pct(cat['best-practices']?.score),
      lcp: typeof lcpMs === 'number' ? Math.round(lcpMs / 100) / 10 : null,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const band = (score: number | null, good = 90, ok = 50): CheckStatus =>
  score == null ? 'unknown' : score >= good ? 'good' : score >= ok ? 'warn' : 'bad';

export async function runSiteCheck(target: URL): Promise<SiteCheckResult> {
  const httpsUrl = target.href;
  const httpUrl = httpsUrl.replace(/^https:/, 'http:');

  // Start Google's test straight away; it is the slow part.
  const psiPromise = pageSpeedFull(httpsUrl);

  let page = await fetchText(httpsUrl, 9000);
  let httpsOk: boolean | null = null;
  if (page?.ok && page.url.startsWith('https://')) {
    httpsOk = true;
  } else {
    const retry = await fetchText(httpsUrl, 9000);
    if (retry?.ok && retry.url.startsWith('https://')) {
      httpsOk = true;
      page = retry;
    } else {
      const httpPage = await fetchText(httpUrl, 9000);
      if (httpPage?.ok) {
        httpsOk = httpPage.url.startsWith('https://');
        page = httpPage;
      } else {
        page = null;
      }
    }
  }

  const psi = await psiPromise;
  const parsed = page ? parseHtml(page.html) : null;
  const items: CheckItem[] = [];

  // 1. Speed on phones (Google PageSpeed, mobile)
  const perf = psi?.performance ?? null;
  items.push({
    key: 'speed',
    label: 'Speed on phones',
    status: band(perf),
    detail:
      perf == null
        ? 'Google could not test the speed right now. Try again in a minute.'
        : `Google PageSpeed scores your site ${perf}/100 on mobile${psi?.lcp ? `. The main content appears after about ${psi.lcp}s` : ''}. ${
            perf >= 90 ? 'That is fast.' : perf >= 50 ? 'Visitors on slower phones will wait.' : 'Many visitors leave before a page this slow loads.'
          }`,
  });

  // 2. HTTPS
  items.push({
    key: 'https',
    label: 'Secure connection (HTTPS)',
    status: httpsOk === true ? 'good' : httpsOk === false ? 'bad' : 'unknown',
    detail:
      httpsOk === true
        ? 'Your site loads securely, so browsers show the padlock.'
        : httpsOk === false
          ? 'The secure (https) version does not work, so browsers warn visitors that the site is "Not secure".'
          : 'We could not open your site to check this.',
  });

  // 3. Phone layout
  const shell = parsed?.jsShell ?? false;
  items.push({
    key: 'mobile',
    label: 'Set up for phones',
    status: !parsed || shell ? 'unknown' : parsed.hasViewport ? 'good' : 'bad',
    detail: !parsed
      ? 'We could not open your site to check this.'
      : shell
        ? 'Your page is built with JavaScript, so we could not read its layout settings.'
        : parsed.hasViewport
          ? 'Your page tells phones to show the mobile layout.'
          : 'Your page has no mobile viewport tag, so phones show a shrunk desktop page.',
  });

  // 4. Google title + description
  items.push({
    key: 'title',
    label: 'Title in Google',
    status: !parsed || shell ? 'unknown' : parsed.title ? 'good' : 'bad',
    detail: !parsed || shell
      ? 'We could not read this.'
      : parsed.title
        ? `Your homepage title is "${parsed.title.slice(0, 80)}${parsed.title.length > 80 ? '…' : ''}".`
        : 'Your homepage has no title, the blue headline Google shows in search results.',
  });
  items.push({
    key: 'description',
    label: 'Description in Google',
    status: !parsed || shell ? 'unknown' : parsed.metaDescription ? 'good' : 'warn',
    detail: !parsed || shell
      ? 'We could not read this.'
      : parsed.metaDescription
        ? 'Your homepage has a description for search results.'
        : 'Your homepage has no description, so Google picks its own text to show under your name.',
  });

  // 5. Google's own SEO basics and accessibility checks
  items.push({
    key: 'seo',
    label: 'Google SEO basics',
    status: band(psi?.seo ?? null),
    detail: psi?.seo == null ? 'Google could not run this test right now.' : `Lighthouse SEO basics score: ${psi.seo}/100.`,
  });
  items.push({
    key: 'accessibility',
    label: 'Easy for everyone to use',
    status: band(psi?.accessibility ?? null),
    detail:
      psi?.accessibility == null
        ? 'Google could not run this test right now.'
        : `Lighthouse accessibility score: ${psi.accessibility}/100 (contrast, labels, readable text).`,
  });

  const count = (s: CheckStatus) => items.filter((i) => i.status === s).length;
  return {
    url: httpsUrl,
    finalUrl: page?.url ?? null,
    reachable: Boolean(page),
    scores: {
      performance: perf,
      seo: psi?.seo ?? null,
      accessibility: psi?.accessibility ?? null,
      bestPractices: psi?.bestPractices ?? null,
    },
    lcpSeconds: psi?.lcp ?? null,
    items,
    summary: { good: count('good'), warn: count('warn'), bad: count('bad') },
    checkedAt: new Date().toISOString(),
  };
}
