// src/types/global.d.ts

// This tells TypeScript that the global 'window' object can have a 'gtag' property.
// src/types/global.d.ts - REPLACE THE WINDOW INTERFACE ONLY

interface Window {
  gtag: {
    (event: 'config', measurementId: string, config: { page_path: string; }): void;
    (event: 'event', eventName: string, eventParams?: { [key: string]: any; }): void;
  };
}

// CORRECTIVE ACTION: Upgraded the PlayroomProject type to support a full narrative.
export interface PlayroomProject {
  id: string;
  title: string;
  category: 'SaaS Product' | 'E-Commerce MVP' | 'Web Application' | 'Conceptual Demo';
  description: string;
  tech: string[];
  liveUrl: string;
  imageUrl: string;
  caseStudyUrl?: string;
  // --- Fields added to support case study pages ---
  client?: string;
  year?: string;
  roles?: string[];
  servicesDelivered?: string[];
  // --- Narrative fields for detailed case studies ---
  narrative_challenge?: string;
  narrative_solution?: string;
  narrative_results?: string[];
}

export interface PlayroomDemo {
  id: string;
  title: string;
  category: 'Interactive Demo' | 'AI Tool';
  description: string;
  tech: string[];
  href: string;
}