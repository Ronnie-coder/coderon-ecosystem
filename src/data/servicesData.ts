// src/data/servicesData.ts
import {
  FaRobot,
  FaSyncAlt,
  FaDraftingCompass,
  FaBolt,
  FaServer,
  FaMobileAlt,
  FaSearch,
  FaUsers,
  FaChartLine,
  FaDatabase,
  FaShieldAlt,
  FaPuzzlePiece,
  FaFileInvoiceDollar,
  FaCogs,
  FaRocket,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

export interface ServiceBenefit {
  text: string;
  icon: IconType;
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  slug: string;
  description: string;
  detailedDescription: string;
  benefits: ServiceBenefit[];
}

export const services: Service[] = [
  {
    id: 1,
    icon: 'W',
    title: 'Web Engineering',
    slug: 'web-development',
    // Pain: slow/broken web presence. Solution: we build it properly. Outcome: customers trust you
    description:
      'Your website is your hardest-working salesperson. We build fast, reliable web platforms that convert visitors into paying customers — and keep them coming back.',
    detailedDescription:
      'Most business websites are slow, hard to update, and invisible on Google. We fix all three. Using Next.js and battle-tested standards, we build web platforms that load in under a second, rank well on search engines, and scale as your business grows — without the technical debt that comes back to bite you later.',
    benefits: [
      { text: 'Loads fast — keeps customers from leaving', icon: FaRocket },
      { text: 'Easy to maintain and grow over time', icon: FaServer },
      { text: 'Works perfectly on every device', icon: FaMobileAlt },
      { text: 'Built to rank on Google from day one', icon: FaSearch },
    ],
  },
  {
    id: 2,
    icon: 'AI',
    title: 'AI Integration',
    slug: 'ai-solutions',
    // Pain: repetitive decisions eating time. Solution: AI handles it. Outcome: team focuses on growth
    description:
      'Stop answering the same questions and making the same decisions manually. We embed AI into your business so the routine stuff runs itself — and your team focuses on what matters.',
    detailedDescription:
      'AI is only useful if it solves a real problem in your business. We skip the hype and get practical: whether that\'s an AI assistant that handles customer queries 24/7, a system that flags inventory issues before they become stockouts, or automation that writes your weekly reports — we build AI that earns its keep from day one.',
    benefits: [
      { text: 'Automates repetitive decisions and tasks', icon: FaCogs },
      { text: '24/7 AI customer support — no extra staff', icon: FaRobot },
      { text: 'Turns your data into clear business insights', icon: FaChartLine },
      { text: 'Personalised experiences that increase retention', icon: FaUsers },
    ],
  },
  {
    id: 3,
    icon: 'T',
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    // Pain: old systems slowing growth. Solution: we modernise. Outcome: faster, cheaper ops
    description:
      'Still running your business on spreadsheets, WhatsApp threads, and outdated software? We replace that friction with systems that actually work — and show you the difference in your bottom line.',
    detailedDescription:
      'Outdated systems don\'t just slow you down — they cost you money every single day. We audit your current operations, identify where time and money are being lost, and replace the weak points with modern software that your team will actually use. The result: faster operations, fewer errors, and a business that\'s ready to scale.',
    benefits: [
      { text: 'Replaces slow legacy systems with modern tools', icon: FaSyncAlt },
      { text: 'Reduces operating costs month over month', icon: FaFileInvoiceDollar },
      { text: 'Gives customers a better digital experience', icon: FaUsers },
      { text: 'Protects your business data from day one', icon: FaShieldAlt },
    ],
  },
  {
    id: 4,
    icon: 'C',
    title: 'Custom Software',
    slug: 'custom-software',
    // Pain: off-the-shelf doesn't fit. Solution: we build exactly what you need. Outcome: you own it
    description:
      'Generic software forces your business to adapt to it. We flip that — building tools designed around exactly how your team works, so nothing gets lost in translation.',
    detailedDescription:
      'Off-the-shelf software is built for the average business. Yours isn\'t average. We engineer software from scratch that fits your workflows, your rules, and your growth plans — with no monthly subscription fees and no features you\'ll never use. You own the code. You own the outcome.',
    benefits: [
      { text: 'You own the software — no vendor lock-in', icon: FaShieldAlt },
      { text: 'Built around your exact workflow', icon: FaDraftingCompass },
      { text: 'Connects with your existing tools via API', icon: FaPuzzlePiece },
      { text: 'Scales with your business as you grow', icon: FaServer },
    ],
  },
  {
    id: 5,
    icon: 'A',
    title: 'Business Automation',
    slug: 'business-automation',
    // Pain: team stuck doing manual work. Solution: we automate it. Outcome: time and money saved
    description:
      'If your team is copying data between spreadsheets, chasing approvals over WhatsApp, or building reports by hand — that\'s time and money walking out the door. We automate it.',
    detailedDescription:
      'Manual processes don\'t just waste time — they create errors, slow down decisions, and burn out your best people. We map your repetitive workflows and replace them with reliable automation: from data syncing and report generation to approval chains and customer notifications. Your team gets their time back. Your business gets fewer mistakes.',
    benefits: [
      { text: 'Eliminates manual data entry and human error', icon: FaDatabase },
      { text: 'Gets more done without adding headcount', icon: FaBolt },
      { text: 'Real-time dashboards — always know your numbers', icon: FaChartLine },
      { text: 'Cuts operating costs without cutting corners', icon: FaFileInvoiceDollar },
    ],
  },
];