// REINFORCED: src/types/global.d.ts

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

// This export statement is essential. It ensures TypeScript treats this as a module,
// applying the global type augmentation correctly.
export {};