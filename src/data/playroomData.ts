// src/data/playroomData.ts
import type { PlayroomProject, PlayroomDemo } from '@/types/global';

// --- MAIN PORTFOLIO ---
export const liveProjects: PlayroomProject[] = [
  // 1. EDDIE'S CUT
  // Numbers below match the Lighthouse screenshots in /public/images (mobile run).
  {
    id: 'eddies-cut',
    title: "Eddie's Cut",
    category: 'Website redesign',
    sector: 'Hair salon',
    location: 'Hellerup, Denmark',
    description:
      'A hair salon in Hellerup with 25 years of experience and a slow, dated website. We redesigned it, set it up for local search with a page per treatment and area pages, and brought their Planway booking inside the site.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    imageUrl: '/images/eddiescut-after.webp',
    beforeImage: '/images/eddiescut-before.webp',
    afterImage: '/images/eddiescut-after.webp',
    lighthouseBefore: '/images/eddiescut-lighthouse-before.webp',
    lighthouseAfter: '/images/eddiescut-lighthouse-after.webp',
    featureImages: ['/images/eddiescut-feature-pricing.webp'],
    liveUrl: 'https://eddiescut.dk',
    caseStudyUrl: '/playroom/eddies-cut/',
    client: "Eddie's Cut",
    clientLogo: '/images/razor.svg',
    logo: '/images/logos/eddies-cut.svg',
    year: '2026',
    stat: { label: 'Mobile PageSpeed', before: 47, after: 92 },
    roles: ['Design', 'Development', 'SEO set-up'],
    servicesDelivered: ['Website redesign', 'Booking inside the site', 'Page per treatment', 'Area pages', 'Local schema', 'Google Maps', 'Search Console'],
    narrative_challenge:
      'The old website was slow on phones: Google PageSpeed scored it 47 out of 100 on mobile. Like most Danish salons they book through Planway, but the old booking button sent people off the website to Planway. And the site only talked about Hellerup, not the nearby areas their clients come from.',
    narrative_solution:
      'We redesigned the website in Next.js with clear prices and a smooth scrolling menu. Instead of sending people away, the Planway booking now opens in a window on the website itself. Each treatment has its own page with the questions people ask, linked from the homepage text. We built pages for Gentofte and Charlottenlund, added local business schema, opening hours and Google Maps, configured the domain (DNS) and the contact form emails, and host the site on Vercel with Vercel Analytics and Google Search Console.',
    narrative_results: [
      'Mobile PageSpeed performance from 47 to 92',
      '100 out of 100 for accessibility, best practices and SEO in Lighthouse',
      'Clients book through Planway inside the website instead of being sent away',
      'A page for each treatment, plus pages for Gentofte and Charlottenlund',
      'Local business schema and Google Maps set up',
    ],
  },

  // 2. PALMSURE
  // A corporate website redesign we still maintain. The client portal is Palmsure's own system;
  // we linked it from the site. Facts confirmed by Ronnie (Oct 2026).
  {
    id: 'palmsure',
    title: 'Palmsure Insurance',
    category: 'Website redesign',
    sector: 'Insurance brokers (FSP 47156)',
    location: 'South Africa',
    description:
      'A corporate website redesign for an independent insurance broker: clear cover pages, their legal documents set up properly, a quote request flow and their client portal one click away. We still look after the site every month.',
    tech: ['Angular', 'TypeScript', 'Vercel'],
    imageUrl: '/images/palmsure-showcase-2026.webp',
    liveUrl: 'https://www.palmsure.co.za/',
    caseStudyUrl: '/playroom/palmsure/',
    client: 'Palmsure Insurance',
    clientLogo: '/images/logos/palmsure.webp',
    logo: '/images/logos/palmsure.webp',
    year: '2025',
    roles: ['Design', 'Development', 'Ongoing care'],
    servicesDelivered: ['Website redesign', 'Legal pages', 'Quote request flow', 'SEO set-up', 'Local schema', 'Review widget', 'Cookie consent', 'Monthly care'],
    narrative_challenge:
      'Palmsure is a respected broker, but their website did not show it. Clients needed to understand the cover on offer, find the legal documents a financial services provider must publish, and reach the client portal without hunting for it.',
    narrative_solution:
      'We redesigned the site in Angular as a clean corporate website. Each type of cover has its own page, the legal documents are set up and easy to find, and a step-by-step quote form asks the right questions. The Client Portal button links straight to their existing portal. We added a Google review widget, optimised every image for speed, set up local business schema and basic SEO, configured the domain (DNS) and the contact form emails, and host the site on Vercel with Cookiebot consent, Vercel Analytics and Google Search Console.',
    narrative_results: [
      'A corporate website that explains their cover in plain words',
      'Legal documents published and easy to find',
      'Step-by-step quote request form',
      'Client Portal one click away from every page',
      'Google reviews shown on the site',
      'Looked after by us every month',
    ],
  },

  // 3. GIFTED TOURS
  // Facts confirmed by Ronnie (Oct 2026).
  {
    id: 'gifted-tours',
    title: 'Gifted Tours',
    category: 'Website redesign',
    sector: 'Tours and shuttles',
    location: 'Cape Town, South Africa',
    description:
      'A Cape Town tour and shuttle company with a website that did not do their tours justice. We redesigned it with a booking request form, nine languages, a full-width adventure gallery, and a local SEO set-up.',
    tech: ['Next.js', 'Multilingual', 'Vercel'],
    imageUrl: '/images/gifted-tours-showcase-2026.webp',
    liveUrl: 'https://giftedtours.co.za/',
    caseStudyUrl: '/playroom/gifted-tours/',
    client: 'Gifted Tours',
    clientLogo: '/images/logos/gifted-tours.webp',
    logo: '/images/logos/gifted-tours.webp',
    year: '2025',
    roles: ['Design', 'Development', 'SEO set-up'],
    servicesDelivered: ['Website redesign', 'Booking request form', 'Nine languages', 'Adventure gallery', 'QR business card', 'Local SEO set-up'],
    narrative_challenge:
      'Gifted Tours runs great tours across Cape Town and beyond, but the old website was hard to use on a phone, did not show the places they take guests, and made booking slow. Their email was also not working properly, so enquiries were getting lost.',
    narrative_solution:
      'We redesigned the site with a booking request form that captures the details they need up front: tour type (Cape Peninsula, wine tasting, Garden Route, airport transfer and more), preferred vehicle, tour length including a custom duration, and date. A language switcher shows the site in nine languages. A large, full-width gallery shows each adventure with its photo, its name and the place it happens. A QR code lets people save their business card in one scan. We also set up local SEO and schema, configured the domain (DNS) and the contact form emails, and host the site on Vercel with analytics and Google Search Console.',
    narrative_results: [
      'Booking requests arrive with tour, vehicle, duration and date filled in',
      'Website in English, Afrikaans, German, French, Dutch, Spanish, Italian, Portuguese and Chinese',
      'A full-width gallery of their adventures, each with its name and place',
      'QR code to save their business card',
      'Local SEO set-up and business email working again',
    ],
  },

  // 4. QUOTEPILOT
  {
    id: 'quotepilot',
    title: 'QuotePilot',
    category: 'Our own product',
    sector: 'Invoicing software',
    location: 'Built in Cape Town',
    description:
      'A professional invoicing platform built for African freelancers and SMEs. Create branded invoices, connect your payment gateway, and get paid faster.',
    tech: ['Next.js', 'Supabase', 'PostgreSQL'],
    imageUrl: '/images/quotepilot-showcase.webp',
    liveUrl: 'https://quotepilot.coderon.co.za/',
    caseStudyUrl: '/playroom/quotepilot/',
    client: 'Coderon (Internal)',
    clientLogo: '/images/logos/quotepilot.svg',
    logo: '/images/logos/quotepilot.svg',
    year: '2025',
    roles: ['Product Owner', 'Full-Stack Dev'],
    servicesDelivered: [
      'SaaS Architecture',
      'Database Design',
      'Auth Integration',
    ],
    narrative_challenge:
      'African freelancers and small businesses were sending invoices on WhatsApp as Word docs or screenshots. Existing tools were either expensive subscriptions or complex accounting systems they did not need.',
    narrative_solution:
      'We built a streamlined invoicing platform using Supabase and Next.js. Users set up their business profile once — logo, signature, bank details, and payment gateway links — then create and send professional invoices in minutes. Every invoice is cryptographically verified to prevent fraud.',
    narrative_results: [
      'Professional branded invoices with auto-VAT',
      'Clients pay via Paystack, Yoco, PayPal, or bank transfer',
      'Cryptographic verification on every invoice',
      'Free for early users — no credit card required',
    ],
  }
];

// --- THE LAB (Interactive Demos) ---
export const interactiveDemos: PlayroomDemo[] = [
  {
    id: 'business-chatbot',
    title: 'Kojo, our AI assistant',
    category: 'Chatbot & AI',
    description:
      'Our own Botpress assistant: it captures enquiries (service, contact details, project brief) and answers questions about Coderon. Try it.',
    tech: ['Botpress', 'Integration'],
    href: '/playroom/business-chatbot',
  },
];