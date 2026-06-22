import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description: "Learn about Coderon's mission, born from founder Ronnie Nyamhute's dedication to building the digital future and putting innovation on the global map.",
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}