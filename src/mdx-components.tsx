// src/mdx-components.tsx
// Journal MDX is styled by .prose-coderon (globals.css), so no overrides are needed.
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
