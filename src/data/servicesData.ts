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
    description: 'Scalable Next.js architectures designed for high availability and SEO dominance.',
    detailedDescription: 'We build enterprise-grade web applications. Utilizing Next.js and strict TypeScript standards, we deliver platforms that are secure, accessible (WCAG), and performant under load. No bloat, just code.',
    benefits: [
      { text: 'Sub-second load times (Next.js/React)', icon: FaRocket },
      { text: 'Type-safe, maintainable codebases', icon: FaServer },
      { text: 'Mobile-first, responsive architecture', icon: FaMobileAlt },
      { text: 'Technical SEO optimization included', icon: FaSearch },
    ],
  },
  {
    id: 2,
    icon: 'AI',
    title: 'AI Integration',
    slug: 'ai-solutions',
    description: 'Practical AI implementation for data analysis and process automation.',
    detailedDescription: 'We move beyond the hype to implement practical AI. From integrating LLMs for customer support to building custom prediction models, we engineer intelligence into your existing stack.',
    benefits: [
      { text: 'Workflow automation via LLMs', icon: FaCogs },
      { text: 'Custom chatbot & agent development', icon: FaRobot },
      { text: 'Data-driven decision engines', icon: FaChartLine },
      { text: 'Personalized user experiences', icon: FaUsers },
    ],
  },
  {
    id: 3,
    icon: 'T',
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    description: 'Modernizing legacy infrastructure for efficiency and market competitiveness.',
    detailedDescription: 'We refactor and modernize aging business logic. We analyze your current operational bottlenecks and deploy modern software solutions to increase throughput and reduce technical debt.',
    benefits: [
      { text: 'Legacy system refactoring', icon: FaSyncAlt },
      { text: 'Operational cost reduction', icon: FaFileInvoiceDollar },
      { text: 'Customer-facing digital channels', icon: FaUsers },
      { text: 'Data security hardening', icon: FaShieldAlt },
    ],
  },
  {
    id: 4,
    icon: 'C',
    title: 'Custom Software',
    slug: 'custom-software',
    description: 'Bespoke software built to solve specific operational constraints.',
    detailedDescription: 'Off-the-shelf software rarely fits perfectly. We engineer custom solutions where you own the IP. Designed for your specific workflows, APIs, and business rules.',
    benefits: [
      { text: '100% IP Ownership', icon: FaShieldAlt },
      { text: 'Exact-fit functionality', icon: FaDraftingCompass },
      { text: 'Seamless API integrations', icon: FaPuzzlePiece },
      { text: 'Scalable cloud infrastructure', icon: FaServer },
    ],
  },
  {
    id: 5,
    icon: 'A',
    title: 'Business Automation',
    slug: 'business-automation',
    description: 'Replacing manual data entry with reliable, automated pipelines.',
    detailedDescription: 'We eliminate human error in repetitive tasks. By scripting logic for data transfers, reporting, and notifications, we free your human capital for high-value strategic work.',
    benefits: [
      { text: 'Eliminate manual data entry', icon: FaDatabase },
      { text: 'Increase operational throughput', icon: FaBolt },
      { text: 'Real-time reporting dashboards', icon: FaChartLine },
      { text: 'Reduced overhead costs', icon: FaFileInvoiceDollar },
    ],
  },
];