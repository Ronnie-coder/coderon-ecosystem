import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import WorkShowcase from '@/components/home/WorkShowcase';
import Offers from '@/components/home/Offers';
import WhoWeHelp from '@/components/home/WhoWeHelp';
import WhyCoderon from '@/components/home/WhyCoderon';
import Steps from '@/components/home/Steps';
import Testimonials from '@/components/home/Testimonials';
import LatestJournal from '@/components/home/LatestJournal';
import { getAllPosts } from '@/lib/journal';

export const metadata: Metadata = {
  title: { absolute: 'Web Design Cape Town & Custom Software for Small Businesses | Coderon' },
  description:
    'Coderon is a Cape Town web studio: fast websites set up for Google with WhatsApp buttons, from R3,500 once-off, plus custom software for growing businesses.',
  alternates: { canonical: '/' },
};

// Picks up new journal posts (Notion) without a deploy.
export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getAllPosts();
  return (
    <>
      <Hero />
      <WhoWeHelp />
      <WorkShowcase />
      <Offers />
      <WhyCoderon />
      <Steps />
      <Testimonials />
      <LatestJournal posts={posts} />
    </>
  );
}
