// src/data/playroomData.ts
import type { PlayroomProject, PlayroomDemo } from '@/types/global';

// --- MAIN PORTFOLIO ---
export const liveProjects: PlayroomProject[] = [
  // 1. EDDIE'S CUT
  // Numbers below match the Lighthouse screenshots in /public/images (mobile run).
  {
    id: 'eddies-cut',
    title: "Eddie's Cut",
    category: 'New website',
    sector: 'Hair salon',
    location: 'Hellerup, Denmark',
    description:
      'A hair salon with 25 years of experience, stuck on a slow site builder. We rebuilt the website from scratch and moved it to new hosting without touching their email.',
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
    roles: ['Design', 'Development', 'Hosting move'],
    servicesDelivered: ['New website', 'Speed and SEO set-up', 'Domain and hosting move'],
    narrative_challenge:
      'The old site builder made the website slow on phones: Google PageSpeed scored it 47 out of 100 on mobile. The salon wanted a site that felt as premium as their service, and they could not risk losing their business email during a move.',
    narrative_solution:
      'We designed and built a new website in Next.js, with clear prices, easy booking buttons and a smooth scrolling menu. Then we moved the domain to new hosting step by step, so the site never went down and their email kept working.',
    narrative_results: [
      'Mobile PageSpeed performance from 47 to 92',
      '100 out of 100 for accessibility, best practices and SEO in Lighthouse',
      'Moved to new hosting with no downtime, email untouched',
    ],
  },

  // 2. PALMSURE
  {
    id: 'palmsure',
    title: 'Palmsure Insurance',
    category: 'Custom software',
    sector: 'Insurance brokers',
    location: 'South Africa',
    description:
      'An independent insurance broker (Authorised FSP 47156) that ran on paper. We moved their work onto a modern web platform, and gave them a clear website with a client portal where policyholders can log in.',
    tech: ['Angular', 'TypeScript', 'Legacy Migration'],
    imageUrl: '/images/palmsure-showcase-2026.webp',
    liveUrl: 'https://www.palmsure.co.za/',
    caseStudyUrl: '/playroom/palmsure/',
    client: 'Palmsure Insurance',
    clientLogo: '/images/logos/palmsure.webp',
    logo: '/images/logos/palmsure.webp',
    year: '2025',
    roles: ['Technical Lead', 'Frontend Arch.', 'UI/UX'],
    servicesDelivered: [
      'System Migration',
      'Angular Development',
      'API Integration',
    ],
    narrative_challenge:
      'Palmsure was operating on decades of paper-based processes and disconnected spreadsheets. This created data redundancy, slow claims processing, and no real-time visibility for management.',
    narrative_solution:
      'We engineered a complete digital platform using Angular. The system centralised their entire workflow with strict TypeScript typing and a modular architecture built to handle complex insurance logic securely and reliably.',
    narrative_results: [
      'Client portal, so policyholders can log in online',
      'Clear website that explains their cover and the underwriters they work with',
      '100% digitisation of paper records',
      'Significantly reduced claim processing time',
      'Real-time reporting dashboard for management',
    ],
  },

  // 3. GIFTED TOURS
  // Results kept to what we can show. Ronnie: add PageSpeed/enquiry numbers back when there is proof.
  {
    id: 'gifted-tours',
    title: 'Gifted Tours',
    category: 'Website redesign',
    sector: 'Tours and shuttles',
    location: 'Cape Town, South Africa',
    description:
      'A great tour company with a website that did not show it. We rebuilt it so it is fast, works on every phone, is set up properly for Google, and speaks to visitors in their own language.',
    tech: ['Next.js', 'SEO set-up', 'Vercel'],
    imageUrl: '/images/gifted-tours-showcase.webp',
    liveUrl: 'https://giftedtours.co.za/',
    caseStudyUrl: '/playroom/gifted-tours/',
    client: 'Gifted Tours',
    clientLogo: '/images/logos/gifted-tours.webp',
    logo: '/images/logos/gifted-tours.webp',
    year: '2025',
    roles: ['Design', 'Development', 'SEO set-up'],
    servicesDelivered: ['Website redesign', 'Speed and SEO set-up', 'Hosting and domain set-up'],
    narrative_challenge:
      'The old website was slow, hard to use on a phone and did not explain the tours clearly. Their email was also not working properly, so enquiries were getting lost.',
    narrative_solution:
      'We rebuilt the site in Next.js with a mobile-first design, clear tour pages and booking buttons. To welcome visitors from abroad, we added a language switcher with nine languages. We also added structured data so Google understands the business, and set up their email and domain properly.',
    narrative_results: [
      'Fast, mobile-first website that matches the quality of their tours',
      'Available in English, Afrikaans, German, French, Dutch, Spanish, Italian, Portuguese and Chinese',
      'Dark mode, fleet and gallery pages, and a Book a Tour button on every page',
      'Structured data and sitemap so Google understands the business',
      'Business email working again',
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
    title: 'Lead Gen Chatbot',
    category: 'Automation',
    description:
      'An automated agent that qualifies leads 24/7. Ask it anything about Coderon\'s services and it will guide you to the right solution.',
    tech: ['Botpress', 'Integration'],
    href: '/playroom/business-chatbot',
  },
];