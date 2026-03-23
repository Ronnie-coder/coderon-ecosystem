// src/app/page.tsx
import Hero from '@/components/Hero';
import ServicesShowcase from '@/components/ServicesShowcase';
import ImpactSection from '@/components/ImpactSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import TheDrumSection from '@/components/TheDrumSection';
import QuotePilotCtaSection from '@/components/QuotePilotCtaSection';
import ContactSection from '@/components/ContactSection';
import { projects } from '@/data/projectsData';

// Use first project as the featured one — deterministic, no hydration risk
const featuredProject = projects?.[0] ?? null;

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesShowcase />
      {featuredProject && (
        <ImpactSection project={featuredProject} />
      )}
      <QuotePilotCtaSection />
      <TestimonialsSection />
      <TheDrumSection />
      {/* Closing CTA — convert visitors who reach the end */}
      <ContactSection />
    </>
  );
}