export type Pitch = {
  trigger: 'ads' | 'ssl' | 'schema' | 'seo';
  subject: string;
  body: string;
  followUp1: string;
  followUp2: string;
};

export const FOLLOW_UP_DAYS = [3, 7];

// Registered business address for email compliance
const ADDRESS = 'Coderon (Pty) Ltd, Cape Town, South Africa';

export function buildPitch(args: { companyName: string; notes: string }): Pitch | null {
  const { companyName, notes } = args;

  // Extract load time measured by enrich/route.ts
  const loadMatch = notes.match(/Load: ([\d.]+)s/);
  const loadSeconds = loadMatch ? Math.floor(parseFloat(loadMatch[1])) : 0;

  const hasAdTracking = notes.includes('Google Ads Active') || notes.includes('Meta Pixel Active');

  // 1. ADS + Verified Slow Load Speed (Fires only if load time is 3s+)
  if (hasAdTracking && loadSeconds >= 3) {
    return {
      trigger: 'ads',
      subject: `${companyName} site speed`,
      body: `${companyName} has ad tracking on its site, so I'm guessing you pay for clicks. I timed the site: about ${loadSeconds} seconds before anything showed up, and plenty of people leave before that. So some of that ad money is walking away. Want me to record a 60-second Loom showing it?`,
      followUp1: `Bumping this in case it got buried. I can record the Loom showing the slow part in a couple of minutes. Want it?`,
      followUp2: `Guessing the timing's off, so I'll stop bugging you. If ad clicks ever start feeling expensive, just reply and I'll record the video.`,
    };
  }

  // 2. NO SSL CERTIFICATE
  if (notes.includes('No SSL')) {
    return {
      trigger: 'ssl',
      subject: `${companyName} website says "not secure"`,
      body: `${companyName}'s site shows "Not secure" in Chrome's address bar, before anyone reads a word. Plenty of people won't type their details into that, so some quote requests quietly never happen. Want me to record a 60-second Loom showing what visitors see?`,
      followUp1: `Quick nudge on this. It's usually a fast fix once you can see it. Want me to record that Loom?`,
      followUp2: `Guessing you're slammed, so I'll leave it here. If quote requests ever seem lower than they should be, reply and I'll show you the warning.`,
    };
  }

  // 3. NO LOCAL SCHEMA (Factual local search matching)
  if (notes.includes('No Local Schema')) {
    return {
      trigger: 'schema',
      subject: `${companyName} and local searches`,
      body: `${companyName}'s site is missing the behind-the-scenes info Google uses to match businesses to local searches. Competitors that have it get the edge when someone nearby searches for what you do. Want me to record a 60-second Loom showing what's missing?`,
      followUp1: `Bumping this in case it got buried. Showing you what's missing takes me a couple of minutes. Want the Loom?`,
      followUp2: `Sounds like the timing's off, so I'll stop here. If you ever want to see what Google can't find on your site, reply and I'll send the video.`,
    };
  }

  // 4. FALLBACK: MISSING TITLE OR META DESCRIPTION
  const noTitle = notes.includes('No Title');
  const noDesc = notes.includes('No Meta Desc');
  if (noTitle || noDesc) {
    const what = noTitle && noDesc ? 'headline and short blurb' : noTitle ? 'headline' : 'short blurb';
    return {
      trigger: 'seo',
      subject: `${companyName} in Google search`,
      body: `${companyName}'s site is missing the ${what} Google shows under your name in search results, so it has to guess what to show. People comparing you to the next business see that first. Want me to record a 60-second Loom showing what it looks like?`,
      followUp1: `Bumping this in case it got buried. It's a quick thing to show. Want me to record the Loom?`,
      followUp2: `Guessing it's not a priority right now, so I'll stop here. If you ever want to see how you look in Google search, reply and I'll send it over.`,
    };
  }

  // Skip lead if no verified flaw exists
  return null;
}

/**
  * Renders both Plain Text and HTML versions.
  * HTML is strictly required for Resend open pixel and click tracking wrappers to function.
  */
export function renderEmail(body: string, firstName?: string): { text: string; html: string } {
  const greetingText = firstName ? `Hey ${firstName},\n\n` : '';
  const greetingHtml = firstName ? `Hey ${firstName},<br><br>` : '';

  const text = `${greetingText}${body}\n\nRonnie\nCoderon | coderon.co.za\n\n--\nNot relevant? Just reply "no" and I won't email again.\n${ADDRESS}`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; color: #1e293b; line-height: 1.6; max-width: 600px;">
      ${greetingHtml}
      ${body.replace(/\n/g, '<br>')}
      <br><br>
      Ronnie<br>
      <strong>Coderon</strong> | <a href="https://coderon.co.za" style="color: #0284c7; text-decoration: none;">coderon.co.za</a>
      <br><br>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
      <span style="font-size: 12px; color: #64748b;">
        Not relevant? Just reply "no" and I won't email again.<br>
        ${ADDRESS}
      </span>
    </div>
  `;

  return { text, html };
}