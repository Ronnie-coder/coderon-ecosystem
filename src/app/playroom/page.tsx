import type { Metadata } from 'next';
import PlayroomClient from './PlayroomClient';

export const metadata: Metadata = {
  title: 'The Showroom | Coderon',
  description: 'Explore Coderon’s portfolio of deployed projects, from enterprise SaaS to experimental AI demos.',
  alternates: {
    canonical: '/playroom',
  },
};

export default function PlayroomPage() {
  return <PlayroomClient />;
}