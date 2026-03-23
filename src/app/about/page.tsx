import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Coderon | Our Mission & Founder',
  description: "Learn about Coderon's mission, born from founder Ronnie Nyamhute's dedication to building Africa's digital future and putting African innovation on the global map.",
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}