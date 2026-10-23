// src/data/servicesData.ts
//
// Copy rules: plain English, short sentences, and only promises we actually deliver.
// We set websites up so Google can understand them; we never promise rankings.
import {
  FaRocket,
  FaLock,
  FaMobileAlt,
  FaSearch,
  FaMapMarkerAlt,
  FaPen,
  FaTools,
  FaShieldAlt,
  FaSyncAlt,
  FaDraftingCompass,
  FaPuzzlePiece,
  FaCogs,
  FaChartLine,
  FaServer,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import type { PriceKey } from './pricingData';

export interface ServiceBenefit {
  text: string;
  icon: IconType;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  slug: string;
  seoTitle?: string;
  kind: 'website' | 'software';
  /** The visitor's problem in their words, shown on the homepage offer cards. */
  need: string;
  description: string;
  detailedDescription: string;
  forWho: string[];
  benefits: ServiceBenefit[];
  steps: { title: string; text: string }[];
  faqs: ServiceFaq[];
  priceKey: PriceKey;
}

export const services: Service[] = [
  {
    id: 1,
    icon: 'F',
    title: 'Website Fix',
    slug: 'website-fix',
    need: 'Your website is slow, broken or says “not secure”',
    seoTitle: 'Website Fix: Speed, Security & Mobile Repairs',
    kind: 'website',
    description:
      'Your website is slow, says "not secure", or looks broken on phones. We fix it in about a week, without rebuilding everything.',
    detailedDescription:
      'Most small business websites lose customers quietly. The page takes too long to load, the browser shows a "not secure" warning, or the layout breaks on a phone. People leave and call someone else.\nWe start with a free check of your site and show you exactly what is wrong in a short video. Then we fix the problems on your existing website: speed, security (HTTPS), mobile layout and the basic Google set-up. You keep your design, your content and your domain.',
    forWho: [
      'Your site shows "not secure" in the browser',
      'Google PageSpeed gives your site a low mobile score',
      'Your site is hard to use on a phone',
      'You do not want to pay for a full new website yet',
    ],
    benefits: [
      { text: 'Faster loading, especially on phones', icon: FaRocket },
      { text: 'HTTPS set up, so the "not secure" warning goes away', icon: FaLock },
      { text: 'Layout fixed for phones and tablets', icon: FaMobileAlt },
      { text: 'Page titles, descriptions and sitemap set up for Google', icon: FaSearch },
    ],
    steps: [
      { title: 'Free website check', text: 'We test your site and send you a short video of what we found.' },
      { title: 'Fixed price', text: 'You get one clear price before any work starts.' },
      { title: 'Fix and report', text: 'We fix it, then show you the before and after results.' },
    ],
    faqs: [
      { q: 'Do I need a new website?', a: 'Usually not. Most problems can be fixed on the website you already have.' },
      { q: 'How long does it take?', a: 'Most fixes are done within 5 to 7 working days.' },
      { q: 'Will my site look different?', a: 'No, unless you ask for changes. We fix what is broken and keep your design.' },
    ],
    priceKey: 'fix',
  },
  {
    id: 2,
    icon: 'W',
    title: 'New Website',
    slug: 'web-development',
    need: "No website yet, or one you'd rather not share",
    seoTitle: 'Website Design & Development for Small Businesses',
    kind: 'website',
    description:
      'A fast, modern website that works on every phone and is set up properly for Google from day one.',
    detailedDescription:
      'If your current website is old, built on a slow site builder, or does not explain what you do, a fresh website is the better option.\nWe design and build it for you. It loads fast, works on every screen, and is set up so Google can understand your business: clear page titles, descriptions, a sitemap and local business details (schema) so search engines know who you are and where you work. We also connect Google Search Console and help you with your Google Business Profile.',
    forWho: [
      'Your website is more than a few years old',
      'You are stuck on a slow or expensive site builder',
      'You are starting a business and need a proper website',
      'Your site does not clearly say what you do or how to contact you',
    ],
    benefits: [
      { text: 'Custom design that matches your business', icon: FaPen },
      { text: 'Fast on phones and laptops', icon: FaRocket },
      { text: 'Local business schema and SEO set-up included', icon: FaMapMarkerAlt },
      { text: 'Google Search Console connected', icon: FaSearch },
    ],
    steps: [
      { title: 'Plan', text: 'A short call to understand your business, your customers and your pages.' },
      { title: 'Design and build', text: 'You see the design first, then we build it. You give feedback at every step.' },
      { title: 'Launch', text: 'We move your domain and email safely and make sure nothing breaks.' },
    ],
    faqs: [
      { q: 'How long does a new website take?', a: 'Most small business websites take 2 to 4 weeks, depending on the number of pages.' },
      { q: 'Will you guarantee I rank first on Google?', a: 'No one can honestly promise that. We set your site up properly so Google can understand it, which is the foundation for ranking.' },
      { q: 'Can I update the website myself?', a: 'Yes. We can set it up so you can edit text and images, or we can do updates for you on a Care Plan.' },
    ],
    priceKey: 'starter',
  },
  {
    id: 3,
    icon: 'C',
    title: 'Website Care Plan',
    slug: 'website-care-plan',
    need: 'Nobody is looking after your website',
    seoTitle: 'Website Maintenance & Care Plan',
    kind: 'website',
    description:
      'We look after your website every month: updates, fixes, speed and security checks, and small changes when you need them.',
    detailedDescription:
      'A website is not finished on launch day. Things break, plugins get old, and content needs changing.\nOn a Care Plan, we keep your site healthy for a fixed monthly fee. We check speed and security every month, fix problems, make small content changes for you, and send you a short report so you always know where your website stands.',
    forWho: [
      'You do not have time to look after your website',
      'You want someone to call when something breaks',
      'You want small changes done quickly without new quotes',
    ],
    benefits: [
      { text: 'Monthly speed and security checks', icon: FaShieldAlt },
      { text: 'Fixes and updates included', icon: FaTools },
      { text: 'Small text and image changes done for you', icon: FaSyncAlt },
      { text: 'Short monthly report in plain English', icon: FaChartLine },
    ],
    steps: [
      { title: 'Start', text: 'We check your website and fix anything urgent first.' },
      { title: 'Every month', text: 'We run checks, apply updates and handle your change requests.' },
      { title: 'Report', text: 'You get a short report on what we did and how your site is doing.' },
    ],
    faqs: [
      { q: 'Is there a contract?', a: 'No long contract. You can cancel any month with 30 days notice.' },
      { q: 'Does it work with any website?', a: 'It works best with websites we built or fixed. For other sites we check first and tell you.' },
    ],
    priceKey: 'careBasic',
  },
  {
    id: 4,
    icon: 'S',
    title: 'Custom Software & Automation',
    slug: 'custom-software',
    need: 'Your team is buried in admin and spreadsheets',
    seoTitle: 'Custom Software & Business Automation',
    kind: 'software',
    description:
      'If your team runs on spreadsheets, paperwork or WhatsApp threads, we build the tool that does the job for you.',
    detailedDescription:
      'Some problems are not solved by a website. You might be copying data between spreadsheets, chasing approvals, or doing the same report every week.\nWe build software around how your business already works: internal tools, client portals, dashboards and automations. We have built invoicing software (QuotePilot), lead generation tools and chatbots. You own the code, and we keep it simple to use.',
    forWho: [
      'Your team does the same manual task every day',
      'Off-the-shelf software does not fit how you work',
      'You need a dashboard, portal or internal tool',
      'You want to connect the tools you already use',
    ],
    benefits: [
      { text: 'Built around your exact workflow', icon: FaDraftingCompass },
      { text: 'Automates repetitive tasks', icon: FaCogs },
      { text: 'Connects to the tools you already use', icon: FaPuzzlePiece },
      { text: 'You own the software', icon: FaServer },
    ],
    steps: [
      { title: 'Free call', text: 'You explain the problem. We tell you honestly if software is the right fix.' },
      { title: 'Scope and quote', text: 'A clear plan of what we will build, with a fixed quote.' },
      { title: 'Build in stages', text: 'You see working parts early and give feedback as we go.' },
    ],
    faqs: [
      { q: 'How much does custom software cost?', a: 'It depends on what you need, so we quote per project after a free call.' },
      { q: 'Do you build AI tools?', a: 'Yes, when it genuinely helps, for example chatbots that answer customer questions or tools that sort documents.' },
    ],
    priceKey: 'software',
  },
];
