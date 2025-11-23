// REINFORCED: src/types/global.d.ts

export interface PlayroomProject {
  id: number;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  tech: string[];
  liveUrl: string;
  caseStudyUrl?: string;
  // --- ADDITIONS START ---
  // Adding these optional properties to prevent subsequent type errors
  // in the [slug] page component.
  client?: string;
  year?: string;
  roles?: string[];
  servicesDelivered?: string[];
  narrative_challenge?: string;
  narrative_solution?: string;
  narrative_results?: string[];
  // --- ADDITIONS END ---
}

export interface PlayroomDemo {
  id: number;
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