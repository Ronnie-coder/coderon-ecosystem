import { Metadata } from 'next';
import ImpactClient from './ImpactClient';

export const metadata: Metadata = {
  title: 'Our Impact | Case Studies',
  description: 'See the real-world impact of our work. Explore case studies of how Coderon has helped African businesses thrive.',
  alternates: {
    canonical: '/impact',
  },
};

export default function ImpactPage() {
  return <ImpactClient />;
}