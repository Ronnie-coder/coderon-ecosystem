import type { ReactNode } from "react";
import { Container } from "../ui/Section";
import { Breadcrumbs } from "./Breadcrumbs";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <section className="bg-paper pb-20">
      <Container className="pt-6">
        <Breadcrumbs items={[{ name: title, path }]} />
      </Container>
      <Container className="pt-8">
        <div className="prose-ha mx-auto max-w-3xl">
          <h1 className="text-5xl font-extrabold uppercase sm:text-6xl">{title}</h1>
          <p className="text-ink-soft">Last updated: {updated}</p>
          {children}
        </div>
      </Container>
    </section>
  );
}
