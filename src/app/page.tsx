// src/app/page.tsx
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import { projects } from '@/data/projectsData';

// ✅ Only Hero loads eagerly — it's the LCP element
// ✅ Everything below fold is lazy loaded via standard dynamic imports

const ServicesShowcase = dynamic(() => import('@/components/ServicesShowcase'));
const ImpactSection = dynamic(() => import('@/components/ImpactSection'));

// QuotePilot import removed to keep homepage clean

const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'));
const TheDrumSection = dynamic(() => import('@/components/TheDrumSection'));
const ContactSection = dynamic(() => import('@/components/ContactSection'));

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
      
      {/* QuotePilot CTA removed from here */}
      
      <TestimonialsSection />
      <TheDrumSection />
      <ContactSection />
    </>
  );
}