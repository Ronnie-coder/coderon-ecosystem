// src/data/pricingData.ts
//
// Prices set from SA and international market research (Oct 2026): low-to-mid market,
// affordable for small businesses. USD prices are set for international clients,
// not converted from ZAR. "From" prices: the final price is agreed before work starts.

export type PriceKey = 'starter' | 'business' | 'growth' | 'monthly' | 'fix' | 'careBasic' | 'carePlus' | 'software';
export type Currency = 'ZAR' | 'USD';

export interface PricePlan {
  key: PriceKey;
  name: string;
  /** Service page this plan belongs to. */
  slug: string;
  price: { ZAR: number; USD: number };
  period: 'once-off' | 'per month' | 'from';
  summary: string;
  includes: string[];
  timeline?: string;
  highlight?: boolean;
}

export const websitePlans: PricePlan[] = [
  {
    key: 'starter',
    name: 'Starter',
    slug: 'web-development',
    price: { ZAR: 3500, USD: 650 },
    period: 'once-off',
    summary: 'One strong page that says what you do and how to reach you.',
    timeline: 'About 1 week',
    includes: [
      'One scrolling page (up to 5 sections) about your business',
      'Looks right on every phone, tablet and computer',
      'Buttons that open WhatsApp or call you in one tap',
      'A contact form that sends enquiries to your email',
      'Set up so Google can read your site: page title, description and your business details',
      'Help setting up your Google Business Profile (your business on Google Maps)',
    ],
  },
  {
    key: 'business',
    name: 'Business',
    slug: 'web-development',
    price: { ZAR: 8500, USD: 1600 },
    period: 'once-off',
    summary: 'A full website for a business that is ready to grow.',
    timeline: '2 to 3 weeks',
    highlight: true,
    includes: [
      'Everything in Starter',
      'Up to 5 pages',
      'Your site submitted to Google (sitemap and Google Search Console)',
      'Visitor stats, so you can see how many people visit',
      'Change text and photos yourself, or ask us to',
      '30 days of free fixes after launch',
    ],
  },
  {
    key: 'growth',
    name: 'Growth',
    slug: 'web-development',
    price: { ZAR: 16500, USD: 3200 },
    period: 'once-off',
    summary: 'More pages, a blog or bookings, and pages for each area you serve.',
    timeline: '3 to 5 weeks',
    includes: [
      'Everything in Business',
      'Up to 10 pages',
      'A blog, or online booking or enquiry forms',
      'A page for each service or area you work in, so people searching for it find the right page',
      'Tracking of calls, WhatsApp taps and enquiries, so you see what brings in customers',
      'A launch report on speed and Google set-up',
      '60 days of free fixes after launch',
    ],
  },
];

// No big upfront cost. The client owns and pays for their domain; we host and look after the site.
export const monthlyPlan: PricePlan = {
  key: 'monthly',
  name: 'Monthly Website',
  slug: 'web-development',
  price: { ZAR: 599, USD: 79 },
  period: 'per month',
  summary: 'No big upfront cost: pay your first month and we start. Hosting, care and small changes included.',
  includes: [
    'A website with up to 3 pages, designed for you',
    'Hosting included: we keep your site online',
    'Updates, backups and security checks',
    'Up to 30 minutes of changes every month (new photos, prices, text)',
    'Buttons that open WhatsApp or call you in one tap',
    'Set up so Google can read your site',
    'You own your domain (your web address); we help you buy one if needed',
  ],
};

export const fixPlan: PricePlan = {
  key: 'fix',
  name: 'Website Fix',
  slug: 'website-fix',
  price: { ZAR: 2500, USD: 395 },
  period: 'from',
  summary: 'Fix speed, "not secure" and phone problems on the website you already have.',
  timeline: '5 to 7 working days',
  includes: [
    'We look at your site first and tell you what is wrong, free',
    'Faster loading, especially on phones',
    'The "not secure" warning removed (HTTPS fixed)',
    'Layout fixed so it works on phones',
    'Page titles, descriptions and sitemap set up for Google',
    'A before-and-after report',
  ],
};

export const carePlans: PricePlan[] = [
  {
    key: 'careBasic',
    name: 'Care Basic',
    slug: 'website-care-plan',
    price: { ZAR: 450, USD: 59 },
    period: 'per month',
    summary: 'We keep your website safe, updated and online.',
    includes: ['Software updates and regular backups', 'We get an alert if your site goes down, and fix it', 'A speed and security check every month', 'Fixes if something breaks'],
  },
  {
    key: 'carePlus',
    name: 'Care Plus',
    slug: 'website-care-plan',
    price: { ZAR: 950, USD: 149 },
    period: 'per month',
    summary: 'Everything in Basic, plus changes and a monthly report.',
    highlight: true,
    includes: [
      'Everything in Care Basic',
      'Up to 1 hour of changes every month (text, photos, prices, new sections)',
      'A short monthly report in plain English',
      'Same-day replies on working days',
    ],
  },
];

export const softwarePlan: PricePlan = {
  key: 'software',
  name: 'Custom Software',
  slug: 'custom-software',
  price: { ZAR: 15000, USD: 1500 },
  period: 'from',
  summary: 'Internal tools, client portals, dashboards and automations, built around how you work.',
  includes: ['Free discovery call', 'Clear scope and a fixed quote', 'Built in stages you can test', 'You own the code'],
};

export const allPlans: PricePlan[] = [...websitePlans, monthlyPlan, fixPlan, ...carePlans, softwarePlan];

export const priceFor = (key: PriceKey) => allPlans.find((p) => p.key === key)!;

export function formatPrice(amount: number, currency: Currency) {
  return currency === 'ZAR' ? `R${amount.toLocaleString('en-US')}` : `$${amount.toLocaleString('en-US')}`;
}

/** Visitors in Africa see rand by default; everyone else sees US dollars. */
export function guessCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return tz.startsWith('Africa/') ? 'ZAR' : 'USD';
  } catch {
    return 'ZAR';
  }
}
