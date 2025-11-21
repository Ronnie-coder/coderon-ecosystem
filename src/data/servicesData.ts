// src/data/servicesData.ts
import {
  FaCode,
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

// --- ENHANCEMENT: Benefit structure now includes an icon property ---
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
    title: 'Web Development',
    slug: 'web-development',
    description: 'High-performance web applications built with Next.js and React, designed for scale and user engagement.',
    detailedDescription: 'We specialize in building world-class web applications using the modern stack. From dynamic corporate sites to complex e-commerce platforms, our focus is on performance, security, and delivering an exceptional user experience that works flawlessly across all devices.',
    benefits: [
      { text: 'Lightning-fast load times with Next.js', icon: FaRocket },
      { text: 'Secure, scalable, and maintainable codebases', icon: FaServer },
      { text: 'Fully responsive designs for mobile-first indexing', icon: FaMobileAlt },
      { text: 'SEO-optimized architecture from the ground up', icon: FaSearch },
    ],
  },
  {
    id: 2,
    icon: 'AI',
    title: 'AI Solutions & Integration',
    slug: 'ai-solutions',
    description: 'Leveraging artificial intelligence to automate processes, derive insights, and build intelligent products for Africa.',
    detailedDescription: 'Unlock the power of Artificial Intelligence for your business. We help you integrate cutting-edge AI models to automate tasks, analyze data for critical insights, and create innovative products and services that give you a competitive edge in the African market.',
    benefits: [
      { text: 'Automate repetitive business processes', icon: FaCogs },
      { text: 'Integrate Large Language Models (LLMs)', icon: FaRobot },
      { text: 'Derive actionable insights from your data', icon: FaChartLine },
      { text: 'Build smarter, more personalized user experiences', icon: FaUsers },
    ],
  },
  {
    id: 3,
    icon: 'T',
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    description: 'Guiding African businesses through the digital landscape to enhance efficiency, reach, and market competitiveness.',
    detailedDescription: "We partner with you to rethink your business for the digital age. Our digital transformation strategy involves a holistic review of your processes, tools, and customer engagement models to ensure you're not just keeping up, but leading the way in your industry.",
    benefits: [
      { text: 'Modernize legacy systems and workflows', icon: FaSyncAlt },
      { text: 'Improve operational efficiency and reduce costs', icon: FaFileInvoiceDollar },
      { text: 'Enhance customer engagement and satisfaction', icon: FaUsers },
      { text: 'Establish a competitive advantage through technology', icon: FaShieldAlt },
    ],
  },
  {
    id: 4,
    icon: 'C',
    title: 'Custom Software',
    slug: 'custom-software',
    description: 'Tailor-made software solutions that address your unique business challenges and unlock new opportunities for growth.',
    detailedDescription: 'Off-the-shelf software doesn’t always fit. We build bespoke software solutions designed specifically to solve your unique challenges and meet your precise business objectives, ensuring a perfect fit for your operational needs and growth ambitions.',
    benefits: [
      { text: 'Solutions designed for your specific needs', icon: FaDraftingCompass },
      { text: 'Full ownership of the intellectual property', icon: FaShieldAlt },
      { text: 'Seamless integration with your existing systems', icon: FaPuzzlePiece },
      { text: 'Scalable architecture that grows with your business', icon: FaServer },
    ],
  },
  {
    id: 5,
    icon: 'A',
    title: 'Business Automation',
    slug: 'business-automation',
    description: 'Implementing smart automation to streamline your operations, reduce costs, and free up your team for high-value work.',
    detailedDescription: 'Stop wasting time on manual, repetitive tasks. We identify key areas for automation within your business and implement robust systems that handle the workload for you. This frees up your team to focus on strategy, creativity, and growth.',
    benefits: [
      { text: 'Drastically reduce manual data entry and errors', icon: FaDatabase },
      { text: 'Increase productivity and operational throughput', icon: FaBolt },
      { text: 'Lower operational costs', icon: FaFileInvoiceDollar },
      { text: 'Improve team morale and focus on core tasks', icon: FaUsers },
    ],
  },
];