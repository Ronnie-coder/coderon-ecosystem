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
  audit: Audit | null;
};

const LOOM_ASK = 'Want me to record a free 60-second Loom showing exactly what I mean and how it gets fixed?';

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
        body: `I opened ${domain} and Chrome shows "Not secure" next to the address. The secure (https) version of the site doesn't load, so every visitor sees that warning before they read a word, and plenty of people won't send a quote request through a page that says it.${extra}\n\n${LOOM_ASK}`,
        evidence,
      };
    case 'speed': {
      const score = audit.psi_mobile;
      const lcp = audit.psi_lcp_s ? ` and the main content takes about ${audit.psi_lcp_s}s to appear` : '';
      return {
        trigger: 'speed',
        subject: `${name} on mobile`,
        body: `I ran ${domain} through Google's own PageSpeed test (pagespeed.web.dev, you can try it yourself). It scored ${score}/100 on mobile${lcp}. On a phone, a lot of people back out before a page that slow finishes loading and call the next business instead.${extra}\n\n${LOOM_ASK}`,
        evidence,
      };
    }
    case 'mobile':
      return {
        trigger: 'mobile',
        subject: `${name}'s site on phones`,
        body: `I checked ${domain} and it isn't set up for mobile: there's no mobile viewport tag, so phones load it as a shrunk-down desktop page and visitors have to pinch and zoom to read anything or tap the call button. A lot of people find local businesses on their phone, so that's often the first impression.${extra}\n\n${LOOM_ASK}`,
        evidence,
      };
    case 'snippet': {
      const noTitle = !audit.title;
      return {
        trigger: 'snippet',
        subject: `${name} in Google search`,
        body: noTitle
          ? `I looked at ${domain} and the homepage has no page title, which is the headline Google shows for you in search results. Without it Google has to guess, and that's the first thing people see when comparing you with the next business.${extra}\n\n${LOOM_ASK}`
          : `I looked at ${domain} and the homepage is missing its meta description, which is the short summary Google shows under your name in search results. Without one, Google grabs random text from the page instead, and that's the first thing people read when comparing you with the next business.${extra}\n\n${LOOM_ASK}`,
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
    'Quick nudge on the "not secure" warning. It\'s usually a quick fix once you can see it. Want me to send that Loom?',
    'I\'ll leave it here. If quote requests ever feel lower than they should be, reply and I\'ll show you the warning visitors see.',
  ],
  speed: [
    'Bumping this in case it got buried. I can record the Loom showing what\'s slowing the mobile site down in a couple of minutes. Want it?',
    'Last note from me. If you ever want the site loading fast on phones, just reply and I\'ll send the video.',
  ],
  mobile: [
    'Quick follow-up on the site not resizing for phones. Happy to record the 60-second Loom so you can see it. Want it?',
    'I\'ll stop here. If you ever want the site working properly on phones, reply and I\'ll send the video over.',
  ],
  snippet: [
    'Bumping this in case it got buried. It\'s a quick thing to show. Want me to record the Loom?',
    'Guessing it\'s not a priority right now, so I\'ll stop here. If you ever want to see how you look in Google search, reply and I\'ll send it.',
  ],
  default: [
    'Bumping this in case it got buried. Happy to record that 60-second Loom if it\'s useful. Want it?',
    'I\'ll leave it here. If it ever becomes useful, just reply and I\'ll send the video over.',
  ],
};

export function followUpBody(trigger: string | null | undefined, stage: 1 | 2): string {
  const set = FOLLOW_UPS[trigger || ''] || FOLLOW_UPS.default;
  return set[stage - 1];
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Plain-text-first email; the light HTML version enables Resend open/click tracking. */
export function renderEmail(body: string, firstName?: string | null): { text: string; html: string } {
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,';
  const footer = `Not relevant? Just reply "no" and I won't email again.\n${BUSINESS_ADDRESS}`;

  const text = `${greeting}\n\n${body}\n\nRonnie Nyamhute\nCoderon · websites & SEO for service businesses\ncoderon.co.za\n\n--\n${footer}`;

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;color:#1e293b;line-height:1.6;max-width:600px;">
${escapeHtml(greeting)}<br><br>
${escapeHtml(body).replace(/\n/g, '<br>')}
<br><br>
Ronnie Nyamhute<br>
Coderon · websites &amp; SEO for service businesses<br>
<a href="https://coderon.co.za" style="color:#0284c7;text-decoration:none;">coderon.co.za</a>
<hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;">
<span style="font-size:12px;color:#64748b;">${escapeHtml(footer).replace(/\n/g, '<br>')}</span>
</div>`;

  return { text, html };
}
