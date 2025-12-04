// DEFINITIVE FIX: src/types/global.d.ts

export interface PlayroomProject {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  tech: string[];
  liveUrl: string;
  caseStudyUrl?: string;
  // --- ADDED MISSING FIELD BELOW ---
  clientLogo?: string; 
  client?: string;
  year?: string;
  roles?: string[];
  servicesDelivered?: string[];
  narrative_challenge?: string;
  narrative_solution?: string;
  narrative_results?: string[];
}

export interface PlayroomDemo {
  id: string;
  category: string;
  title: string;
  description: string;
  tech: string[];
  href: string;
}

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      target: string,
      params?: { [key: string]: any }
    ) => void;
  }
}