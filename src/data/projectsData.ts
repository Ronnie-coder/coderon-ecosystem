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
    id: 'palmsure',
    client: 'Palmsure Insurance',
    title: 'Honoring a Legacy with Digital Transformation',
    tags: ['Web Platform', 'Angular', 'Legacy System Modernization'],
    description: 'Coderon led the complete digital transformation for Palmsure, migrating decades of paper-based processes to a robust, modern web platform built on Angular. It was more than code; it was about purpose.',
    imageUrl: '/images/palmsure-showcase.png',
    liveUrl: 'https://palmsure-coperate-hani.vercel.app/',
    year: 2025,
    roles: [
      'Technical Lead',
      'Frontend Developer (Angular)',
      'UI/UX Designer',
      'DevOps & Deployment Engineer',
    ],
    servicesDelivered: [
      'System Migration & Legacy Modernization',
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
    tags: ['Web Redesign', 'Next.js', 'SEO Optimization'],
    description: 'Gifted Tours needed a digital refresh. We delivered a complete redesign and rebuild, resulting in a lightning-fast, modern, and SEO-optimized platform that truly represents their brand.',
    imageUrl: '/images/gifted-tours-showcase.png',
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
      'Performance Optimization',
      'SEO Optimization',
      'Vercel Deployment & DNS Setup',
      'Ongoing Maintenance',
    ],
  },
  {
    id: 'quotepilot',
    client: 'Coderon (Internal Product)',
    title: 'A Free Quote System for African SMEs',
    tags: ['SaaS', 'Next.js', 'Supabase', 'PostgreSQL'],
    description: 'To empower African entrepreneurs, we built QuotePilot: a smart, simple, and free quote generator. This production-ready tool showcases our ability to build, ship, and maintain our own software products.',
    imageUrl: '/images/quotepilot-showcase.png',
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