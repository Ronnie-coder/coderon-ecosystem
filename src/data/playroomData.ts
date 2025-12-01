// src/data/playroomData.ts

import type { PlayroomProject, PlayroomDemo } from '@/types/global';

// --- LIVE PROJECTS & APPLICATIONS ---
export const liveProjects: PlayroomProject[] = [
  {
    id: 'quotepilot',
    title: 'QuotePilot SaaS',
    category: 'SaaS Product',
    description: 'A production-ready invoice & quote generator for African SMEs, built with a robust Supabase backend and a clean Next.js frontend.',
    tech: ['SaaS', 'Next.js', 'Supabase', 'TypeScript'],
    liveUrl: 'https://quotepilot.coderon.co.za/',
    imageUrl: '/images/playroom/quotepilot-v1.png',
    caseStudyUrl: '/playroom/quotepilot',
    client: 'Coderon (Internal Product)',
    year: '2025',
    roles: ['Lead Developer', 'UI/UX Designer', 'Product Manager'],
    servicesDelivered: ['Full-Stack Development', 'SaaS Architecture', 'Database Design', 'UI/UX'],
    // CORRECTIVE ACTION: Added the full case study narrative.
    narrative_challenge: "Small and medium businesses across Africa struggle with creating professional quotes and invoices quickly. Many existing tools are slow, confusing, or built for international markets, not local needs. As a result, SMEs waste valuable time on admin, lose clients because of slow turnaround, and struggle to maintain a consistent, professional brand. QuotePilot set out to solve this by giving African entrepreneurs a fast, simple, and beautiful tool that helps them look professional, close deals faster, and keep their financial documents organized.",
    narrative_solution: "QuotePilot was rebuilt from the ground up over a focused three-month “lab phase,” driven by real user feedback. Every screen, interaction, and click was simplified to make onboarding effortless — from sign-up to creating your first invoice in minutes. The platform now delivers a clean, frictionless experience with clear navigation, smart defaults, reusable client data, beautiful PDF exports, and a workflow that requires just a few steps to generate a quote or invoice. Technically, QuotePilot uses a modern stack optimized for speed and security: Next.js, TypeScript, Supabase Auth, Supabase Database, and Resend for transactional email. The interface is powered by ShadCN UI + Tailwind, fully responsive, and built to scale as new features roll out.",
    narrative_results: [
      "Users reported drastically faster quote creation (often under 2–3 minutes).",
      "Onboarding became effortless, with most new users understanding the system without tutorials.",
      "Improved client trust thanks to clean, professional PDF designs.",
      "Higher engagement, with returning users citing the “smooth” and “no-stress” workflow.",
      "Strong product-market fit emerging among freelancers, creatives, and small business owners."
    ]
  },
  {
    id: 'md-shuttles-web-app',
    title: 'MD Shuttles (Modern Refresh)',
    category: 'Web Application',
    description: 'A redesigned, vibrant, and user-friendly interface for a transport and delivery service, built for conversion.',
    tech: ['Next.js', 'Web Design', 'SCSS'],
    liveUrl: 'https://md-shuttles-2.vercel.app/',
    imageUrl: '/images/playroom/md-shuttles-v2.png',
  },
  {
    id: 'pharmacy-demo-web-app',
    title: 'Pharmacy Demo Web App',
    category: 'Conceptual Demo',
    description: 'A sleek, modern e-commerce and prescription management concept for the pharmaceutical industry, showcasing a focus on UX.',
    tech: ['Next.js', 'TypeScript', 'E-commerce'],
    liveUrl: 'https://fullas-pharmacy-demo-v-2.vercel.app/',
    imageUrl: '/images/playroom/fullas-pharmacy.png',
  },
  {
    id: 'e-commerce-demo',
    title: 'E-commerce Demo Web App',
    category: 'E-Commerce MVP',
    description: 'A stylish and minimalist e-commerce platform for a modern streetwear brand, focusing on product presentation and a smooth checkout flow.',
    tech: ['Next.js', 'E-commerce', 'Brand Identity'],
    liveUrl: 'https://ghost-ebon-three.vercel.app/',
    imageUrl: '/images/playroom/broomghost-sa.png',
  },
];


// --- INTERACTIVE DEMOS & TOOLS ---
export const interactiveDemos: PlayroomDemo[] = [
  {
    id: 'sales-dashboard',
    title: 'Interactive Sales Dashboard',
    category: 'Interactive Demo',
    description: 'A dynamic dashboard for visualizing sales data, built with Next.js and Chart.js. Experience data-driven decision making.',
    tech: ['Next.js', 'TypeScript', 'Chart.js'],
    href: '/playroom/sales-dashboard',
  },
   {
    id: 'sentiment-analyzer',
    title: 'AI Sentiment Analyzer',
    category: 'AI Tool',
    description: 'An AI-powered tool that analyzes text for emotional tone. A practical example of our machine learning solutions for business.',
    tech: ['Next.js', 'AI', 'NLP'],
    href: '/playroom/sentiment-analyzer',
  },
  {
    id: 'business-chatbot',
    title: 'Business AI Chatbot',
    category: 'AI Tool',
    description: 'An AI chatbot to handle inquiries, qualify leads, and provide 24/7 support. A demo of our automation solutions.',
    tech: ['Botpress', 'AI', 'Automation'],
    href: '/playroom/business-chatbot',
  },
];