import type { ReactNode } from 'react';

/** Standard top of an inner page: eyebrow, big headline, short intro. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="container pb-12 pt-12 md:pb-16 md:pt-20">
      <p className="eyebrow animate-fade-up">{eyebrow}</p>
      <h1 className="h-display mt-4 max-w-[16ch]">{title}</h1>
      {intro && <p className="mt-6 max-w-2xl animate-fade-up text-lg text-ink/75 [animation-delay:120ms] md:text-xl">{intro}</p>}
      {children}
    </header>
  );
}
