// src/data/industriesData.ts
//
// Who we help. Each entry is a landing page at /industries/<slug>/ written for one audience,
// in their words, with proof from a real project. Same honesty rule as the rest of the site:
// promise what we deliver (fast site, Google set-up, WhatsApp buttons), never rankings.
import type { PriceKey } from './pricingData';

export interface Industry {
  slug: string;
  name: string; // short label, e.g. "Local service businesses"
  seoTitle: string;
  metaDescription: string;
  headline: string; // may contain one *accent* word
  intro: string;
  examples: string[]; // who this is for
  pains: { title: string; text: string }[];
  solution: { title: string; text: string }[];
  caseStudyId: string; // id in playroomData
  recommended: PriceKey[];
  faqs: { q: string; a: string }[];
}

export const industries: Industry[] = [
  {
    slug: 'local-service-businesses',
    name: 'Local service businesses',
    seoTitle: 'Websites for Plumbers, Electricians, Salons & Local Businesses',
    metaDescription:
      'Fast, mobile-first websites for local service businesses in South Africa: trades, salons, clinics and cleaners. Click-to-WhatsApp, Google set-up, from R3,500.',
    headline: 'Websites for businesses people *call*.',
    intro:
      'Plumbers, electricians, solar installers, salons, clinics and cleaners: most of your customers find you on their phone. We build a fast website that tells them what you do, where you work and how to reach you in one tap.',
    examples: ['Plumbers & electricians', 'Roofers & solar installers', 'Salons & barbers', 'Clinics & physios', 'Cleaning companies', 'Builders & painters'],
    pains: [
      { title: 'People cannot find you', text: 'You get work from word of mouth, but new customers search on Google first, and your business does not show up the way it should.' },
      { title: 'Your site looks out of date', text: 'An old or slow website makes a good business look small. People compare you with the next result and call them instead.' },
      { title: 'Enquiries get lost', text: 'No clear phone number, no WhatsApp button, a contact form nobody checks. Every missed enquiry is a missed job.' },
    ],
    solution: [
      { title: 'One-tap WhatsApp and call buttons', text: 'On every page, so a customer on a phone can reach you in seconds.' },
      { title: 'Set up for Google from day one', text: 'Page titles, descriptions, local business schema, a sitemap, Search Console, and help with your Google Business Profile.' },
      { title: 'A page for each service and area', text: 'So "geyser repairs in Bellville" or "nail salon in Claremont" has a page that matches what people search.' },
      { title: 'Fast on cheap phones and mobile data', text: 'Light pages that load quickly, because most of your visitors are not on Wi-Fi.' },
      { title: 'Your booking system inside the site', text: 'Already use a booking app? We show it in a window on your website, so clients book without leaving, like we did for Eddie\'s Cut.' },
    ],
    caseStudyId: 'eddies-cut',
    recommended: ['starter', 'monthly', 'business'],
    faqs: [
      { q: 'How much does a website for a small business cost?', a: 'Our Starter one-page website is R3,500 once-off and a full Business website with up to 5 pages is R8,500. You get one fixed price before we start.' },
      { q: 'Will I show up first on Google?', a: 'Nobody can honestly promise that. We build your site so Google can understand it and help you set up your Google Business Profile, which is where most local searches start.' },
      { q: 'Can customers book or WhatsApp me from the site?', a: 'Yes. Every site has buttons that open WhatsApp or call you in one tap, and the Growth package can include online booking.' },
    ],
  },
  {
    slug: 'tourism',
    name: 'Tour operators & guesthouses',
    seoTitle: 'Website Design for Tour Operators & Guesthouses in South Africa',
    metaDescription:
      'Websites for tour operators, shuttle services and guesthouses in South Africa: beautiful photos, fast on mobile, multilingual, with Book Now and WhatsApp buttons.',
    headline: 'Websites that make people want to *book*.',
    intro:
      'Your guests plan their trip on a phone, often from another country. We build websites that show off your tours and rooms, load fast anywhere, speak their language and make booking easy.',
    examples: ['Tour operators', 'Shuttle & transfer services', 'Guesthouses & B&Bs', 'Safari & adventure companies', 'Event venues'],
    pains: [
      { title: 'Your photos deserve better', text: 'Great experiences, but the website looks dated or loads slowly, so the photos never get seen.' },
      { title: 'Visitors from abroad drift off', text: 'International guests compare you with big booking sites. If yours is hard to read or only in English, they move on.' },
      { title: 'Booking is clumsy', text: 'Emails back and forth, unclear prices, no quick way to ask a question. Guests book somewhere easier.' },
    ],
    solution: [
      { title: 'Fast, photo-first design', text: 'Optimised images that look sharp and still load quickly on mobile data.' },
      { title: 'Language switcher', text: 'Show your site in the languages your guests speak, like German, French or Chinese.' },
      { title: 'Book Now and WhatsApp everywhere', text: 'Clear buttons on every page, plus a simple enquiry or booking form.' },
      { title: 'Set up for Google and maps', text: 'Tour and area pages, structured data, and your Google Business Profile linked up.' },
    ],
    caseStudyId: 'gifted-tours',
    recommended: ['business', 'growth', 'carePlus'],
    faqs: [
      { q: 'Can my website be in more than one language?', a: 'Yes. We built Gifted Tours a switcher for nine languages, including German, French and Chinese.' },
      { q: 'Can guests book online?', a: 'Yes. The Growth package includes an online booking or enquiry system, or we connect the booking tool you already use.' },
      { q: 'Do I still need booking platforms?', a: 'They are useful, but they take a commission. Your own website gives guests a way to book with you directly.' },
    ],
  },
  {
    slug: 'insurance-brokers',
    name: 'Insurance brokers & FSPs',
    seoTitle: 'Website Design for Insurance Brokers (FSPs) in South Africa',
    metaDescription:
      'Websites for South African insurance brokers and financial services providers: clear cover pages, legal documents, quote request forms, client portal links and monthly care.',
    headline: 'Websites that make *brokers* look as trusted as they are.',
    intro:
      'Clients want to understand their cover, see that you are authorised, and reach you quickly. We build broker websites that do exactly that, and look after them every month so you can focus on clients.',
    examples: ['Short-term insurance brokers', 'Financial advisers', 'Medical aid brokers', 'Funeral cover providers', 'Other FSPs'],
    pains: [
      { title: 'Clients do not see the difference', text: 'Your service is personal, but your website looks like everyone else\'s, or does not explain what you actually do.' },
      { title: 'Quote requests arrive half-empty', text: 'A basic contact form means calls and emails back and forth before you can even start quoting.' },
      { title: 'Legal pages are hard to find', text: 'Your FSP number, complaints policy and other required documents are buried or missing, which makes clients and insurers uneasy.' },
    ],
    solution: [
      { title: 'A page for each type of cover', text: 'Plain-English pages for each product, the insurers you work with, and your FSP details shown clearly.' },
      { title: 'Quote requests that arrive complete', text: 'Forms that ask the right questions, so you can quote faster.' },
      { title: 'Legal documents set up properly', text: 'Your required documents published and easy to find, plus cookie consent and a privacy policy page.' },
      { title: 'Your client portal one click away', text: 'Already have a portal or insurer platform? We link it from every page, like we did for Palmsure.' },
      { title: 'Reviews and monthly care', text: 'Your Google reviews on the site, and a care plan that keeps everything updated and secure.' },
    ],
    caseStudyId: 'palmsure',
    recommended: ['business', 'growth', 'carePlus'],
    faqs: [
      { q: 'Can you add our FSP number and disclosures?', a: 'Yes. We show your FSP number and add the policies and disclosures you give us, like your complaints and conflict-of-interest policies. Your compliance officer signs off the content.' },
      { q: 'Can you link our client portal or insurer platform?', a: 'Yes. We add a clear Client Portal button on every page that opens your existing portal.' },
      { q: 'Do you look after the website afterwards?', a: 'Yes. Our care plans keep your site updated, secure and fast, with changes when you need them. We still look after the Palmsure website every month.' },
    ],
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
