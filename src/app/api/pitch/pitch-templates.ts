import type { Audit, Issue } from '@/lib/outreach/audit';
import { BUSINESS_ADDRESS } from '@/lib/outreach/config';
import { cleanCompanyName, domainOf } from '@/lib/outreach/names';

// Every sentence below must stay TRUE for any lead that reaches it:
// claims come only from verified audit evidence (see src/lib/outreach/audit.ts),
// and each pitch points the owner at something they can check themselves.

export type Pitch = {
  trigger: string;
  subject: string;
  body: string;
  evidence: string[];
};

type PitchInput = {
  company_name: string;
  website: string | null;
  first_name?: string | null;
  city?: string | null;
  country?: string | null;
  audit: Audit | null;
};

// Value first: offer the free report and let them say yes. One clear question, no links,
// no buttons (a plain reply reads as a real conversation and stays out of spam folders).
const REPORT_ASK = 'I put together a short free report showing what I found and how I\'d fix it. Want me to send it over? Just reply "yes".';

// South African leads (POPIA section 69): the first email is our one approach, so it ends
// with a plain request for consent and says exactly what happens after a yes or a no.
const SA_CONSENT_ASK =
  'I\'ve put together a short free report on what I found and how to fix it. May I send it to you? If you reply "yes", I\'ll email it to you, and I may follow up once about it. If you\'d rather not hear from me, reply "no" and I won\'t contact you again.';

// Cape Town metro gets "here in Cape Town"; the Winelands get "here in the Western Cape";
// other provinces get "based in Cape Town" plus their own city, which is the honest version.
const CAPE_TOWN_METRO = ['Cape Town', 'Bellville', 'Durbanville', 'Brackenfell', 'Kuils River', 'Claremont', 'Sea Point', 'Table View', 'Milnerton'];
const WESTERN_CAPE_WINELANDS = ['Stellenbosch', 'Paarl', 'Somerset West'];

/** The first sentence for South African leads ('' for everyone else). */
export function localOpener(name: string, city: string | null | undefined, country: string | null | undefined): string {
  if (country !== 'South Africa') return '';
  const town = (city || '').replace(/,\s*South Africa$/i, '').trim();
  if (CAPE_TOWN_METRO.includes(town)) {
    return `I run Coderon, a web studio here in Cape Town, and came across ${name} while looking at local businesses.`;
  }
  if (WESTERN_CAPE_WINELANDS.includes(town)) {
    return `I run Coderon, a web studio here in the Western Cape, and came across ${name} while looking at local businesses.`;
  }
  const where = town ? `businesses in ${town}` : 'local businesses';
  return `I run Coderon, a web studio based in Cape Town, and came across ${name} while looking at ${where}.`;
}

function secondIssueLine(issues: Issue[]): string {
  const second = issues[1];
  if (!second) return '';
  switch (second.key) {
    case 'speed':
      return ` While I was at it, Google's PageSpeed test also scored the mobile site ${second.label.replace('PageSpeed ', '')}.`;
    case 'mobile':
      return ' It also doesn\'t resize for phones, so mobile visitors get a shrunk-down desktop page.';
    case 'snippet':
      return ' The homepage is also missing the short description Google shows under your name in search.';
    case 'ssl':
      return ' The secure (https) version of the site also doesn\'t load.';
  }
}

export function buildPitch(lead: PitchInput): Pitch | null {
  const isSouthAfrica = lead.country === 'South Africa';
  const pitch = buildEvidencePitch(lead, isSouthAfrica ? SA_CONSENT_ASK : REPORT_ASK);
  if (!pitch) return null;
  const opener = localOpener(cleanCompanyName(lead.company_name), lead.city, lead.country);
  return opener ? { ...pitch, body: `${opener}\n\n${pitch.body}` } : pitch;
}

/** The evidence-based body; every claim comes from the verified audit. */
function buildEvidencePitch(lead: PitchInput, ask: string): Pitch | null {
  const audit = lead.audit;
  if (!audit || audit.version !== 2 || !audit.trigger || audit.issues.length === 0) return null;

  const name = cleanCompanyName(lead.company_name);
  const domain = domainOf(audit.final_url || lead.website) || 'your site';
  const [top] = audit.issues;
  const extra = secondIssueLine(audit.issues);
  const evidence = audit.issues.map((i) => i.evidence);

  switch (top.key) {
    case 'ssl':
      return {
        trigger: 'ssl',
        subject: `${name}'s site shows "not secure"`,
        body: `I opened ${domain} and Chrome shows "Not secure" next to the address. The secure (https) version of the site doesn't load, so every visitor sees that warning before they read a word, and plenty of people won't send a quote request through a page that says it.${extra}\n\n${ask}`,
        evidence,
      };
    case 'speed': {
      const score = audit.psi_mobile;
      const lcp = audit.psi_lcp_s ? ` and the main content takes about ${audit.psi_lcp_s}s to appear` : '';
      return {
        trigger: 'speed',
        subject: `${name} on mobile`,
        body: `I ran ${domain} through Google's own PageSpeed test (pagespeed.web.dev, you can try it yourself). It scored ${score}/100 on mobile${lcp}. On a phone, a lot of people back out before a page that slow finishes loading and call the next business instead.${extra}\n\n${ask}`,
        evidence,
      };
    }
    case 'mobile':
      return {
        trigger: 'mobile',
        subject: `${name}'s site on phones`,
        body: `I checked ${domain} and it isn't set up for mobile: there's no mobile viewport tag, so phones load it as a shrunk-down desktop page and visitors have to pinch and zoom to read anything or tap the call button. A lot of people find local businesses on their phone, so that's often the first impression.${extra}\n\n${ask}`,
        evidence,
      };
    case 'snippet': {
      const noTitle = !audit.title;
      return {
        trigger: 'snippet',
        subject: `${name} in Google search`,
        body: noTitle
          ? `I looked at ${domain} and the homepage has no page title, which is the headline Google shows for you in search results. Without it Google has to guess, and that's the first thing people see when comparing you with the next business.${extra}\n\n${ask}`
          : `I looked at ${domain} and the homepage is missing its meta description, which is the short summary Google shows under your name in search results. Without one, Google grabs random text from the page instead, and that's the first thing people read when comparing you with the next business.${extra}\n\n${ask}`,
        evidence,
      };
    }
  }
  return null;
}

// Follow-ups are keyed by the trigger stored at send time, so they never depend on
// re-parsing notes. Legacy triggers from the v1 engine are kept for already-sent pitches.
const FOLLOW_UPS: Record<string, [string, string]> = {
  ssl: [
    'Quick nudge on the "not secure" warning. It\'s usually a quick fix once you can see it. Want me to send the free report?',
    'I\'ll leave it here. If quote requests ever feel lower than they should be, reply and I\'ll send the free report showing the warning visitors see.',
  ],
  speed: [
    'Bumping this in case it got buried. The free report shows what\'s slowing the mobile site down and how to fix it. Want it?',
    'Last note from me. If you ever want the site loading fast on phones, just reply and I\'ll send the free report.',
  ],
  mobile: [
    'Quick follow-up on the site not resizing for phones. The free report shows exactly what visitors see and how to fix it. Want it?',
    'I\'ll stop here. If you ever want the site working properly on phones, reply and I\'ll send the free report over.',
  ],
  snippet: [
    'Bumping this in case it got buried. It\'s a quick thing to show in the free report. Want me to send it?',
    'Guessing it\'s not a priority right now, so I\'ll stop here. If you ever want to see how you look in Google search, reply and I\'ll send the free report.',
  ],
  default: [
    'Bumping this in case it got buried. Happy to send the free report if it\'s useful. Want it?',
    'I\'ll leave it here. If it ever becomes useful, just reply and I\'ll send the free report over.',
  ],
};

export function followUpBody(trigger: string | null | undefined, stage: 1 | 2): string {
  const set = FOLLOW_UPS[trigger || ''] || FOLLOW_UPS.default;
  return set[stage - 1];
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Matches how coderon.co.za describes the business (homepage and site description).
const SIGNATURE = [
  'Ronnie Nyamhute',
  'Founder, Coderon',
  'Websites & custom software for growing businesses',
  'coderon.co.za · WhatsApp +27 67 818 4898',
];

/** Plain-text-first email; the light HTML version enables Resend open/click tracking. */
export function renderEmail(body: string, firstName?: string | null): { text: string; html: string } {
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,';
  const footer = `Not relevant? Just reply "no" and I won't email again.\n${BUSINESS_ADDRESS}`;

  const text = `${greeting}\n\n${body}\n\n${SIGNATURE.join('\n')}\n\n--\n${footer}`;

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;color:#1e293b;line-height:1.6;max-width:600px;">
${escapeHtml(greeting)}<br><br>
${escapeHtml(body).replace(/\n/g, '<br>')}
<br><br>
Ronnie Nyamhute<br>
Founder, Coderon<br>
<span style="color:#64748b;">Websites &amp; custom software for growing businesses</span><br>
<a href="https://www.coderon.co.za" style="color:#0284c7;text-decoration:none;">coderon.co.za</a> · WhatsApp +27 67 818 4898
<hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;">
<span style="font-size:12px;color:#64748b;">${escapeHtml(footer).replace(/\n/g, '<br>')}</span>
</div>`;

  return { text, html };
}
