import type { ReactNode } from "react";

type Bg = "paper" | "muted" | "ink" | "green" | "yellow";
const bgs: Record<Bg, string> = {
  paper: "bg-paper text-ink",
  muted: "bg-muted text-ink",
  ink: "bg-ink text-white on-dark",
  green: "bg-brand-green-dark text-white on-dark",
  yellow: "bg-brand-yellow text-ink",
};

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Section({
  children,
  bg = "paper",
  id,
  className = "",
  labelledBy,
}: {
  children: ReactNode;
  bg?: Bg;
  id?: string;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${bgs[bg]} scroll-mt-20 py-14 sm:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] ${
        dark ? "text-brand-yellow" : "text-brand-green-dark"
      }`}
    >
      <span aria-hidden="true" className="inline-block h-1 w-6 -skew-x-12 bg-brand-yellow" />
      {children}
    </p>
  );
}

export function H2({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <h2 id={id} className={`text-4xl font-extrabold uppercase sm:text-5xl ${className}`}>
      {children}
    </h2>
  );
}
