// src/mdx-components.tsx
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g., styling <h1>s.
    h1: ({ children }) => <h1 style={{ fontSize: '2.5rem' }}>{children}</h1>,
    ...components,
  };
}