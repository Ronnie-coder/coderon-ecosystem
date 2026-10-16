import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import WorkShowcase from '@/components/home/WorkShowcase';
import Offers from '@/components/home/Offers';
import CheckBand from '@/components/home/CheckBand';
import Steps from '@/components/home/Steps';
import Testimonials from '@/components/home/Testimonials';
import LatestJournal from '@/components/home/LatestJournal';
import { getAllPosts } from '@/lib/journal';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// Picks up new journal posts (Notion) without a deploy.
export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getAllPosts();
  return (
    <>
      <Hero />
      <Marquee />
      <WorkShowcase />
      <Offers />
      <CheckBand />
      <Steps />
      <Testimonials />
      <LatestJournal posts={posts} />
    </>
  );
}
