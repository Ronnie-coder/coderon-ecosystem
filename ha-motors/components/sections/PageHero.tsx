import type { ReactNode } from "react";
import type { PhotoKey } from "@/lib/photos";
import { PhotoCard } from "../ui/PhotoCard";
import { Container } from "../ui/Section";
import { Breadcrumbs } from "./Breadcrumbs";

/**
 * Dark, flyer-style hero for inner pages: breadcrumb, eyebrow, H1, intro, actions and an optional
 * framed photo. Decorative stripes drift with parallax (off for reduced motion).
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  actions,
  photo,
  photoAspect,
  aside,
  footnote,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  actions?: ReactNode;
  photo?: PhotoKey;
  photoAspect?: string;
  /** Custom right-hand column instead of a photo. */
  aside?: ReactNode;
  footnote?: ReactNode;
}) {
  const hasAside = Boolean(photo || aside);
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div data-parallax="0.18" className="stripe-bg absolute -top-24 -right-40 h-72 w-[38rem] rotate-[-8deg] opacity-25" />
        <div data-parallax="-0.1" className="absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-brand-green/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgb(245_196_0/0.12),transparent_55%)]" />
      </div>
      <Container className="relative pt-6">
        <Breadcrumbs items={crumbs} tone="dark" />
      </Container>
      <Container className={`relative grid items-center gap-10 pt-8 pb-16 sm:pt-12 sm:pb-20 ${hasAside ? "lg:grid-cols-[1.15fr_1fr]" : ""}`}>
        <div className="animate-fade-up max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-1 text-sm font-bold tracking-wider text-brand-yellow uppercase">
            {eyebrow}
          </p>
          <h1 className="text-[2.5rem] font-extrabold uppercase sm:text-6xl">{title}</h1>
          <div className="mt-5 max-w-2xl text-lg text-white/85 sm:text-xl">{intro}</div>
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
          {footnote && <div className="mt-5 text-sm text-white/70">{footnote}</div>}
        </div>
        {photo && (
          <PhotoCard
            photo={photo}
            priority
            stripe
            aspect={photoAspect}
            sizes="(min-width: 1024px) 460px, 92vw"
            className="mx-auto w-full max-w-md lg:max-w-none"
          />
        )}
        {!photo && aside}
      </Container>
      <div aria-hidden="true" className="stripe-bar" />
    </section>
  );
}
