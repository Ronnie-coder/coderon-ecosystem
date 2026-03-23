// src/app/page.tsx
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import { projects } from '@/data/projectsData';

// ✅ Only Hero loads eagerly — it's the LCP element
// ✅ Everything below fold is lazy loaded

const ServicesShowcase = dynamic(
  () => import('@/components/ServicesShowcase'),
  { ssr: false }
);

const ImpactSection = dynamic(
  () => import('@/components/ImpactSection'),
  { ssr: false }
);

const QuotePilotCtaSection = dynamic(
  () => import('@/components/QuotePilotCtaSection'),
  { ssr: false }
);

const TestimonialsSection = dynamic(
  () => import('@/components/TestimonialsSection'),
  { ssr: false }
);

const TheDrumSection = dynamic(
  () => import('@/components/TheDrumSection'),
  { ssr: false }
);

const ContactSection = dynamic(
  () => import('@/components/ContactSection'),
  { ssr: false }
);

const featuredProject = projects?.[0] ?? null;

export default function HomePage() {
  return (
    <>
      {/* ✅ Hero is eager — must paint fast for LCP */}
      <Hero />
      <ServicesShowcase />
      {featuredProject && (
        <ImpactSection project={featuredProject} />
      )}
      <QuotePilotCtaSection />
      <TestimonialsSection />
      <TheDrumSection />
      <ContactSection />
    </>
  );
}