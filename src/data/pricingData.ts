// src/data/pricingData.ts
//
// ⚠️ PLACEHOLDER PRICES: Ronnie must confirm these before the PR is merged.
// "From" prices: the final price is always agreed before work starts.

export type PriceKey = 'fix' | 'website' | 'care' | 'software';

export interface PricePlan {
  key: PriceKey;
  name: string;
  slug: string;
  usd: string | null;
  zar: string | null;
  period: 'once-off' | 'per month' | 'per project';
  summary: string;
  includes: string[];
  highlight?: boolean;
}

export const pricing: PricePlan[] = [
  {
    key: 'fix',
    name: 'Website Fix',
    slug: 'website-fix',
    usd: '$249',
    zar: 'R4,500',
    period: 'once-off',
    summary: 'Fix speed, security and mobile problems on your current website.',
    includes: [
      'Free website check video',
      'Speed improvements',
      'HTTPS / "not secure" fixed',
      'Mobile layout fixes',
      'Titles, descriptions and sitemap for Google',
      'Before and after report',
    ],
  },
  {
    key: 'website',
    name: 'New Website',
    slug: 'web-development',
    usd: '$899',
    zar: 'R15,000',
    period: 'once-off',
    summary: 'A fast, modern website set up properly for Google.',
    includes: [
      'Custom design (up to 5 pages)',
      'Works on every phone and screen',
      'Local business schema and SEO set-up',
      'Google Search Console connected',
      'Safe domain and email move',
      '30 days of free fixes after launch',
    ],
    highlight: true,
  },
  {
    key: 'care',
    name: 'Website Care Plan',
    slug: 'website-care-plan',
    usd: '$79',
    zar: 'R1,400',
    period: 'per month',
    summary: 'We look after your website so you do not have to.',
    includes: [
      'Monthly speed and security checks',
      'Updates and fixes',
      'Small content changes',
      'Monthly report in plain English',
      'Cancel any month (30 days notice)',
    ],
  },
  {
    key: 'software',
    name: 'Custom Software',
    slug: 'custom-software',
    usd: null,
    zar: null,
    period: 'per project',
    summary: 'Tools, portals, dashboards and automations built for your business.',
    includes: ['Free discovery call', 'Clear scope and fixed quote', 'Built in stages you can test', 'You own the code'],
  },
];

export const priceFor = (key: PriceKey) => pricing.find((p) => p.key === key)!;
