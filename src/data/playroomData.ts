// src/data/playroomData.ts
import type { PlayroomProject, PlayroomDemo } from '@/types/global';

// --- MAIN PORTFOLIO ---
export const liveProjects: PlayroomProject[] = [
  // 1. PALMSURE
  {
    id: 'palmsure',
    title: 'Palmsure Insurance',
    category: 'Digital Transformation',
    description:
      'Coderon led the complete digital transformation for Palmsure, migrating decades of paper-based processes to a robust, modern web platform built on Angular.',
    tech: ['Angular', 'TypeScript', 'Legacy Migration'],
    imageUrl: '/images/palmsure-showcase.webp',
    liveUrl: 'https://www.palmsure.co.za/',
    caseStudyUrl: '/playroom/palmsure',
    client: 'Palmsure Insurance',
    clientLogo: '/images/palmsure-logo.png',
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
      '100% digitisation of paper records',
      'Significantly reduced claim processing time',
      'Real-time reporting dashboard for management',
    ],
  },

  // 2. GIFTED TOURS
  {
    id: 'gifted-tours',
    title: 'Gifted Tours',
    category: 'Web Redesign',
    description:
      'A lightning-fast, modern, and SEO-optimised platform that finally gives Gifted Tours the digital presence their service deserves.',
    tech: ['Next.js', 'SEO', 'Vercel'],
    imageUrl: '/images/gifted-tours-showcase.webp',
    liveUrl: 'https://giftedtours.co.za/',
    caseStudyUrl: '/playroom/gifted-tours',
    client: 'Gifted Tours',
    clientLogo: '/images/gifted-tours-logo.png',
    year: '2025',
    roles: ['Frontend Dev', 'SEO Engineer'],
    servicesDelivered: [
      'Website Redesign',
      'Performance Optimisation',
      'Vercel Deployment',
    ],
    narrative_challenge:
      'The previous website was slow, not mobile-responsive, and invisible to Google. Gifted Tours was losing potential clients because their digital presence did not reflect their service quality.',
    narrative_solution:
      'We rebuilt the site using Next.js static site generation for instant page loads. Mobile-first design and structured data for Google rich snippets were built in from day one.',
    narrative_results: [
      'PageSpeed score increased from 45 to 98',
      'First page Google ranking for key local terms',
      '2× increase in mobile enquiries',
    ],
  },

  // 3. QUOTEPILOT
  {
    id: 'quotepilot',
    title: 'QuotePilot SaaS',
    category: 'SaaS Product',
    // FIXED: accurate description — invoicing, not quote generation
    description:
      'A professional invoicing platform built for African freelancers and SMEs. Create branded invoices, connect your payment gateway, and get paid faster.',
    tech: ['Next.js', 'Supabase', 'PostgreSQL'],
    imageUrl: '/images/quotepilot-showcase.webp',
    liveUrl: 'https://quotepilot.coderon.co.za/',
    caseStudyUrl: '/playroom/quotepilot',
    client: 'Coderon (Internal)',
    clientLogo: '/images/logo.png',
    year: '2025',
    roles: ['Product Owner', 'Full-Stack Dev'],
    servicesDelivered: [
      'SaaS Architecture',
      'Database Design',
      'Auth Integration',
    ],
    narrative_challenge:
      'African freelancers and small businesses were sending invoices on WhatsApp as Word docs or screenshots. Existing tools were either expensive subscriptions or complex accounting systems they did not need.',
    // FIXED: "Time to Quote" → "Time to Invoice"
    narrative_solution:
      'We built a streamlined invoicing platform using Supabase and Next.js. Users set up their business profile once — logo, signature, bank details, and payment gateway links — then create and send professional invoices in minutes. Every invoice is cryptographically verified to prevent fraud.',
    // FIXED: more accurate results
    narrative_results: [
      'Professional branded invoices with auto-VAT',
      'Clients pay via Paystack, Yoco, PayPal, or bank transfer',
      'Cryptographic verification on every invoice',
      'Free for early users — no credit card required',
    ],
  },

  // 4. GHOST FASHION
  {
    id: 'ghost-fashion',
    title: 'Ghost Fashion MVP',
    category: 'E-Commerce MVP',
    description:
      'A minimalist, high-performance streetwear store demonstrating Next.js commerce capabilities and Stripe checkout integration.',
    tech: ['Next.js', 'Stripe', 'Vercel'],
    imageUrl: '/images/playroom/broomghost-sa.webp',
    liveUrl: 'https://ghost-ebon-three.vercel.app/',
    caseStudyUrl: '/playroom/ghost-fashion',
    client: 'Ghost Fashion (Concept)',
    year: '2025',
    roles: ['UX Design', 'Frontend Dev'],
    servicesDelivered: ['E-commerce Development', 'Payment Integration'],
    narrative_challenge:
      'Fashion brands need speed and visual impact. The challenge was to build a store that feels premium but loads instantly on mobile.',
    narrative_solution:
      'Next.js Image optimisation and a headless architecture ensure product images load without layout shifts. Stripe Checkout handles payments with zero friction.',
    narrative_results: [
      '99/100 Lighthouse Performance Score',
      'Instant page transitions',
      'Seamless Stripe Checkout integration',
    ],
  },

  // 5. FULLAS PHARMACY
  {
    id: 'fullas-pharmacy',
    title: 'Fullas Pharmacy',
    category: 'Healthcare MVP',
    description:
      'A modern approach to online medication ordering — focused on trust, accessibility, and clean UX for all age groups.',
    tech: ['Next.js', 'UX Research', 'Framer'],
    imageUrl: '/images/playroom/fullas-pharmacy.webp',
    liveUrl: 'https://fullas-pharmacy-demo-v-2.vercel.app/',
    caseStudyUrl: '/playroom/fullas-pharmacy',
    client: 'Fullas Pharmacy (Concept)',
    year: '2025',
    roles: ['Prototyping', 'UI Design'],
    servicesDelivered: ['UX/UI Design', 'Frontend Prototyping'],
    narrative_challenge:
      'Online pharmacies often feel clinical and confusing. The goal was a user experience that felt safe, warm, and easy to navigate — especially for older users.',
    narrative_solution:
      'Large typography, high-contrast action buttons, and a simplified checkout flow. Every design decision was tested against accessibility standards.',
    narrative_results: [
      'High accessibility score across all pages',
      'Clear and tested user journey',
      'Modern, trustworthy brand identity',
    ],
  },
];

// --- THE LAB (Interactive Demos) ---
// REMOVED: sentiment-analyzer and sales-dashboard
// KEPT: business-chatbot only
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