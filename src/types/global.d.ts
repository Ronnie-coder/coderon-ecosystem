// REINFORCED: src/types/global.d.ts

// --- Type Definitions for Playroom Data ---
// These interfaces define the 'shape' of your project and demo objects,
// neutralizing the type error.
export interface PlayroomProject {
  id: number;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  tech: string[];
  liveUrl: string;
  caseStudyUrl?: string; // The '?' makes this property optional.
}

export interface PlayroomDemo {
  id: number;
  category: string;
  title: string;
  description: string;
  tech: string[];
  href: string;
}

// --- Global Augmentations ---
// This section augments existing global types, like adding 'gtag' to the Window object.
declare global {
  interface Window {
    // This provides a precise signature for the gtag function on the window object.
    gtag: (
      command: 'config' | 'event',
      target: string,
      params?: { [key: string]: any }
    ) => void;
  }
}

// Note: The previous 'export {};' is no longer needed. The 'export interface'
// statements above automatically designate this file as a module, satisfying TypeScript's requirements.