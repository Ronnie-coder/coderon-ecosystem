// src/data/pricingData.ts
//
// Prices set from SA and international market research (Oct 2026): low-to-mid market,
// affordable for small businesses. USD prices are set for international clients,
// not converted from ZAR. "From" prices: the final price is agreed before work starts.

export type PriceKey = 'starter' | 'business' | 'growth' | 'fix' | 'careBasic' | 'carePlus' | 'software';
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
      'One scrolling page (up to 5 sections)',
      'Works on every phone and screen',
      'Contact form and WhatsApp button',
      'Page title, description and local business schema',
      'Help setting up your Google Business Profile',
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
      'Sitemap and Google Search Console connected',
      'Google Analytics, so you can see your visitors',
      'Edit text and images yourself, or we do it',
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
      'Blog or online booking / enquiry system',
      'A page for each service or area you work in',
      'Speed and SEO set-up report at launch',
      '60 days of free fixes after launch',
    ],
  },
];

export const fixPlan: PricePlan = {
  key: 'fix',
  name: 'Website Fix',
  slug: 'website-fix',
  price: { ZAR: 2500, USD: 395 },
  period: 'from',
  summary: 'Fix speed, "not secure" and phone problems on the website you already have.',
  timeline: '5 to 7 working days',
  includes: [
    'Free website check first',
    'Speed improvements',
    'HTTPS fixed, so "not secure" goes away',
    'Layout fixed for phones',
    'Titles, descriptions and sitemap for Google',
    'Before-and-after report',
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
    includes: ['Updates and backups', 'Uptime monitoring', 'Monthly speed and security check', 'Fixes if something breaks'],
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
      'Up to 1 hour of changes every month',
      'Monthly report in plain English',
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

export const allPlans: PricePlan[] = [...websitePlans, fixPlan, ...carePlans, softwarePlan];

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
