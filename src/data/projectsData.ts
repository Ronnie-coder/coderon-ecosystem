// src/data/projectsData.ts
export interface Project {
  id: string;
  client: string;
  title: string;
  tags: string[];
  description: string;
  imageUrl: string;
  liveUrl: string;
  year: number;
  roles: string[];
  servicesDelivered: string[];
}

export const projects: Project[] = [
  {
    id: 'eddies-cut',
    client: "Eddie's Cut",
    title: 'From Sluggish to Lightning Fast',
    tags: ['Web Redesign', 'Next.js', 'SEO Optimization'],
    description:
      'A complete digital overhaul for a premium Hellerup hair salon. We migrated them off an outdated site builder to a custom Next.js architecture, hitting perfect 100/100 Lighthouse scores.',
    imageUrl: '/images/eddiescut-after.webp',
    liveUrl: 'https://eddiescut.dk',
    year: 2026,
    roles: [
      'Lead Developer',
      'Performance Engineer',
      'UI/UX Designer'
    ],
    servicesDelivered: [
      'Custom Web Development',
      'SEO & Performance Optimisation',
      'Zero-Downtime DNS Migration'
    ],
  },
  {
    id: 'palmsure',
    client: 'Palmsure Insurance',
    title: 'Honouring a Legacy with Digital Transformation',
    tags: ['Web Platform', 'Angular', 'Legacy System Modernisation'],
    description:
      'Palmsure had decades of paper-based processes holding them back. Coderon led their complete digital transformation — migrating everything to a modern Angular web platform. Built with care, because some businesses carry more than just data.',
    imageUrl: '/images/palmsure-showcase.webp',
    liveUrl: 'https://www.palmsure.co.za/',
    year: 2025,
    roles: [
      'Technical Lead',
      'Frontend Developer (Angular)',
      'UI/UX Designer',
      'DevOps & Deployment Engineer',
    ],
    servicesDelivered: [
      'System Migration & Legacy Modernisation',
      'Web Application Development (Angular)',
      'API Development & Integrations',
      'Deployment to Vercel',
      'Continuous Support & Maintenance',
    ],
  },
  {
    id: 'gifted-tours',
    client: 'Gifted Tours',
    title: 'From Outdated to Outstanding',
    tags: ['Web Redesign', 'Next.js', 'SEO Optimisation'],
    description:
      'Gifted Tours had a great service and a website that didn\'t reflect it. We delivered a complete redesign and rebuild — fast, modern, and optimised for search — so their digital presence finally matches their reputation.',
    imageUrl: '/images/gifted-tours-showcase.webp',
    liveUrl: 'https://giftedtours.co.za/',
    year: 2025,
    roles: [
      'Frontend Developer (Next.js)',
      'UI/UX Designer',
      'Performance & SEO Engineer',
      'DevOps & Deployment Engineer',
    ],
    servicesDelivered: [
      'Complete Website Redesign',
      'Performance Optimisation',
      'SEO Optimisation',
      'Vercel Deployment & DNS Setup',
      'Ongoing Maintenance',
    ],
  },
  {
    id: 'quotepilot',
    client: 'Coderon — Internal Product',
    title: 'Professional Invoicing Built for African Freelancers',
    tags: ['SaaS', 'Next.js', 'Supabase', 'PostgreSQL'],
    description:
      'We built QuotePilot to solve a problem we saw firsthand — African freelancers and SMEs sending invoices on WhatsApp or via messy Word docs. QuotePilot lets you create branded invoices, embed your payment gateway, and get paid faster. Built, shipped, and maintained by Coderon.',
    imageUrl: '/images/quotepilot-showcase.webp',
    liveUrl: 'https://quotepilot.coderon.co.za/',
    year: 2025,
    roles: [
      'Technical Lead',
      'Full-Stack Developer',
      'Product Designer',
      'System & Database Architect',
      'UI/UX Designer',
    ],
    servicesDelivered: [
      'SaaS Development',
      'System Architecture & Project Planning',
      'Database Design (PostgreSQL)',
      'Authentication Setup (Google, GitHub)',
      'API Development & Integrations',
    ],
  },
];