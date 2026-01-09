import type { PlayroomProject, PlayroomDemo } from '@/types/global';

// --- MAIN PORTFOLIO (Real Client Work, Products & MVPs) ---
export const liveProjects: PlayroomProject[] = [
  // 1. PALMSURE
  {
    id: 'palmsure',
    title: 'Palmsure Insurance',
    category: 'Digital Transformation',
    description: 'Coderon led the complete digital transformation for Palmsure, migrating decades of paper-based processes to a robust, modern web platform built on Angular.',
    tech: ['Angular', 'TypeScript', 'Legacy Migration'],
    imageUrl: '/images/palmsure-showcase.webp', // CHANGED to .webp
    liveUrl: 'https://www.palmsure.co.za/',
    caseStudyUrl: '/playroom/palmsure',
    client: 'Palmsure Insurance',
    clientLogo: '/images/palmsure-logo.png', // Logo stays PNG (usually small)
    year: '2025',
    roles: ['Technical Lead', 'Frontend Arch.', 'UI/UX'],
    servicesDelivered: ['System Migration', 'Angular Development', 'API Integration'],
    narrative_challenge: "Palmsure was operating on decades of paper-based processes and disparate spreadsheets. This fragmented workflow caused data redundancy, slow processing times for claims, and a lack of real-time insights for management.",
    narrative_solution: "We engineered a complete digital ecosystem. Using Angular for a robust frontend, we built a centralized platform that digitized their entire workflow. We focused on strict typing and modular architecture to ensure the system could handle complex insurance logic securely.",
    narrative_results: ["100% digitization of paper records", "Reduced claim processing time by 40%", "Real-time reporting dashboard for executives"]
  },
  // 2. GIFTED TOURS
  {
    id: 'gifted-tours',
    title: 'Gifted Tours',
    category: 'Web Redesign',
    description: 'A lightning-fast, modern, and SEO-optimized platform that truly represents the premium brand of Gifted Tours.',
    tech: ['Next.js', 'SEO', 'Tailwind'],
    imageUrl: '/images/gifted-tours-showcase.webp', // CHANGED to .webp
    liveUrl: 'https://giftedtours.co.za/',
    caseStudyUrl: '/playroom/gifted-tours',
    client: 'Gifted Tours',
    clientLogo: '/images/gifted-tours-logo.png',
    year: '2025',
    roles: ['Frontend Dev', 'SEO Engineer'],
    servicesDelivered: ['Website Redesign', 'Performance Optimization', 'Vercel Deployment'],
    narrative_challenge: "The previous website was slow, not mobile-responsive, and invisible to Google. Gifted Tours was losing potential international clients because their digital presence didn't match their service quality.",
    narrative_solution: "We rebuilt the site using Next.js for static site generation (SSG), ensuring instant page loads. We implemented a mobile-first design philosophy and structured data for rich SEO snippets in search results.",
    narrative_results: ["PageSpeed score increased from 45 to 98", "First page Google ranking for key local keywords", "2x increase in mobile inquiries"]
  },
  // 3. QUOTEPILOT
  {
    id: 'quotepilot',
    title: 'QuotePilot SaaS',
    category: 'SaaS Product',
    description: 'A production-ready invoice & quote generator for African SMEs. Built to solve the chaos of manual admin.',
    tech: ['Next.js', 'Supabase', 'SaaS'],
    imageUrl: '/images/quotepilot-showcase.webp', // CHANGED to .webp
    liveUrl: 'https://quotepilot.coderon.co.za/',
    caseStudyUrl: '/playroom/quotepilot',
    client: 'Coderon (Internal)',
    clientLogo:'/images/logo.png',
    year: '2025',
    roles: ['Product Owner', 'Full-Stack Dev'],
    servicesDelivered: ['SaaS Architecture', 'Database Design', 'Auth Integration'],
    narrative_challenge: "Small businesses struggle with professional quoting. Existing tools are expensive subscriptions or complex ERPs.",
    narrative_solution: "We built a streamlined, mobile-first quoting engine. It uses Supabase for real-time data and Next.js for a snappy UI. We prioritized 'Time to Quote'—allowing users to generate a PDF in under 60 seconds.",
    narrative_results: ["Acquired 10 beta users in week 1", "Zero operating costs due to serverless architecture", "High user retention rate"]
  },
  // 4. GHOST FASHION
  {
    id: 'ghost-fashion',
    title: 'Ghost Fashion MVP',
    category: 'E-Commerce MVP',
    description: 'A minimalist, high-performance streetwear store built to demonstrate Next.js commerce capabilities and Stripe integration.',
    tech: ['Next.js', 'Stripe', 'Tailwind'],
    imageUrl: '/images/playroom/broomghost-sa.webp', // CHANGED to .webp
    liveUrl: 'https://ghost-ebon-three.vercel.app/',
    caseStudyUrl: '/playroom/ghost-fashion',
    client: 'Ghost Fashion (Concept)',
    year: '2025',
    roles: ['UX Design', 'Frontend Dev'],
    servicesDelivered: ['E-commerce Development', 'Payment Integration'],
    narrative_challenge: "Fashion brands need speed and style. The challenge was to build a store that feels expensive but loads instantly.",
    narrative_solution: "We utilized Next.js Image optimization and a headless architecture to ensure product images load instantly without layout shifts.",
    narrative_results: ["99/100 Lighthouse Performance Score", "Instant page transitions", "Seamless Stripe Checkout"]
  },
  // 5. FULLAS PHARMACY
  {
    id: 'fullas-pharmacy',
    title: 'Fullas Pharmacy',
    category: 'Healthcare MVP',
    description: 'A modern approach to online medication ordering, focusing on trust, accessibility, and clean UX design.',
    tech: ['Next.js', 'UX Research', 'Framer'],
    imageUrl: '/images/playroom/fullas-pharmacy.webp', // CHANGED to .webp
    liveUrl: 'https://fullas-pharmacy-demo-v-2.vercel.app/',
    caseStudyUrl: '/playroom/fullas-pharmacy',
    client: 'Fullas Pharmacy (Concept)',
    year: '2025',
    roles: ['Prototyping', 'UI Design'],
    servicesDelivered: ['UX/UI Design', 'Frontend Prototyping'],
    narrative_challenge: "Online pharmacies often feel clinical and confusing. We wanted to create a user experience that felt safe, warm, and easy to navigate for elderly users.",
    narrative_solution: "We focused on large typography, high-contrast action buttons, and a simplified checkout flow that reduces friction.",
    narrative_results: ["High accessibility score", "Clear user journey mapping", "Modern brand identity"]
  }
];

// --- THE LAB (Interactive Demos) ---
export const interactiveDemos: PlayroomDemo[] = [
  {
    id: 'sales-dashboard',
    title: 'Sales Intelligence Dashboard',
    category: 'Data Visualization',
    description: 'Interactive financial data visualization using Chart.js.',
    tech: ['Next.js', 'Chart.js'],
    href: '/playroom/sales-dashboard',
  },
   {
    id: 'sentiment-analyzer',
    title: 'AI Sentiment Engine',
    category: 'AI / NLP',
    description: 'Analyze customer feedback tone instantly using local AI models.',
    tech: ['TensorFlow.js', 'Next.js'],
    href: '/playroom/sentiment-analyzer',
  },
  {
    id: 'business-chatbot',
    title: 'Lead Gen Chatbot',
    category: 'Automation',
    description: 'An automated agent that qualifies leads 24/7.',
    tech: ['Botpress', 'Integration'],
    href: '/playroom/business-chatbot',
  },
];