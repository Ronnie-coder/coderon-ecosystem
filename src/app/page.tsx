"use client";

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import ServicesShowcase from '@/components/ServicesShowcase';
import ImpactSection from '@/components/ImpactSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import TheDrumSection from '@/components/TheDrumSection';
import QuotePilotCtaSection from '@/components/QuotePilotCtaSection';
import { projects, Project } from '@/data/projectsData';

export default function HomePage() {
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Ensure data exists before trying to access it
    if (projects && projects.length > 0) {
      const randomIndex = Math.floor(Math.random() * projects.length);
      setFeaturedProject(projects[randomIndex]);
    }
  }, []);

  return (
    <>
      <Hero />
      <ServicesShowcase />
      {featuredProject && <ImpactSection project={featuredProject} />}
      <QuotePilotCtaSection />
      <TestimonialsSection />
      <TheDrumSection />
    </>
  );
}