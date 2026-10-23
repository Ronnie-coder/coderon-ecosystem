// src/app/playroom/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiCheck } from 'react-icons/fi';
import { liveProjects } from '@/data/playroomData';
import { canonical, metaDescription } from '@/lib/site';
import BrowserFrame from '@/components/ui/BrowserFrame';
import CountUp from '@/components/ui/CountUp';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = liveProjects.find((p) => p.id === slug);
  if (!project) return { title: 'Case study not found' };
  return {
    title: `${project.title}: case study`,
    description: metaDescription(project.description),
    alternates: { canonical: canonical(`playroom/${slug}`) },
    openGraph: { url: canonical(`playroom/${slug}`), images: [{ url: project.imageUrl }] },
  };
}

export async function generateStaticParams() {
  return liveProjects.map((p) => ({ slug: p.id }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const index = liveProjects.findIndex((p) => p.id === slug);
  if (index === -1) notFound();
  const project = liveProjects[index];
  const next = liveProjects[(index + 1) % liveProjects.length];
  const host = project.liveUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  const facts = [
    { label: 'Client', value: project.client },
    { label: 'Business', value: `${project.sector ?? ''}${project.location ? `, ${project.location}` : ''}` },
    { label: 'Year', value: project.year },
  ].filter((f) => f.value);

  return (
    <>
      <header className="container pb-12 pt-12 md:pt-16">
        <Link href="/playroom/" className="inline-flex items-center gap-2 font-semibold text-ink/70 hover:text-ink">
          <FiArrowLeft aria-hidden="true" /> All work
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <div className="flex items-center gap-4">
              {project.clientLogo && (
                <span className="grid h-14 w-14 place-items-center rounded-xl border border-line bg-white p-2">
                  <Image src={project.clientLogo} alt="" width={44} height={44} className="h-auto max-h-10 w-auto" />
                </span>
              )}
              <p className="eyebrow">{project.category}</p>
            </div>
            <h1 className="h-display mt-5">{project.title}</h1>
            <p className="mt-5 text-lg text-ink/75 md:text-xl">{project.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Visit {host} <FiArrowUpRight aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
          <BrowserFrame src={project.imageUrl} alt={`Homepage of the ${project.title} website`} url={host} priority className="shadow-soft-lg" />
        </div>
      </header>

      <section aria-label="Project facts" className="border-y border-line bg-card">
        <dl className="container grid gap-6 py-8 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_0.6fr_2fr]">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="eyebrow">{f.label}</dt>
              <dd className="mt-2 font-semibold">{f.value}</dd>
            </div>
          ))}
          {project.servicesDelivered && project.servicesDelivered.length > 0 && (
            <div className="sm:col-span-3 lg:col-span-1">
              <dt className="eyebrow">What we did</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {project.servicesDelivered.map((s) => (
                    <li key={s} className="chip whitespace-nowrap border-line text-sm">{s}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </section>

      {project.stat && (
        <section aria-label="Result" className="container pt-16">
          <div className="card flex flex-col gap-6 border-gold bg-gold p-8 text-[#16130E] shadow-soft-lg md:flex-row md:items-center md:justify-between md:p-10" data-reveal>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em]">{project.stat.label}</p>
              <p className="mt-2 font-serif text-2xl italic">Google Lighthouse, mobile test, before and after</p>
            </div>
            <p className="flex items-baseline gap-4 text-6xl font-semibold tracking-tight md:text-8xl">
              <span className="opacity-50 line-through decoration-4">{project.stat.before}</span>
              <span aria-hidden="true">→</span>
              <CountUp from={project.stat.before} to={project.stat.after} />
            </p>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-3">
          {project.narrative_challenge && (
            <div data-reveal>
              <p className="font-mono text-sm font-semibold text-ink/65">01</p>
              <h2 className="mt-2 text-2xl font-semibold">The problem</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink/80">{project.narrative_challenge}</p>
            </div>
          )}
          {project.narrative_solution && (
            <div data-reveal>
              <p className="font-mono text-sm font-semibold text-ink/65">02</p>
              <h2 className="mt-2 text-2xl font-semibold">What we did</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink/80">{project.narrative_solution}</p>
            </div>
          )}
          {project.narrative_results && project.narrative_results.length > 0 && (
            <div className="card-pop h-fit p-7" data-reveal>
              <p className="font-mono text-sm font-semibold text-ink/65">03</p>
              <h2 className="mt-2 text-2xl font-semibold">The result</h2>
              <ul className="mt-4 space-y-3">
                {project.narrative_results.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-sm text-[#16130E]" aria-hidden="true">
                      <FiCheck />
                    </span>
                    <span className="font-medium">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {project.lighthouseBefore && project.lighthouseAfter && (
        <section aria-labelledby="proof" className="section border-t border-line">
          <div className="container">
            <div className="max-w-2xl" data-reveal>
              <p className="eyebrow">The proof</p>
              <h2 id="proof" className="h-section mt-3">Same test, <span className="accent">before and after.</span></h2>
              <p className="mt-4 text-lg text-ink/75">Screenshots of Google Lighthouse running the mobile test on the old site and on the new one.</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                { src: project.lighthouseBefore, label: 'Before', cls: 'bg-bad text-paper' },
                { src: project.lighthouseAfter, label: 'After', cls: 'bg-good text-paper' },
              ].map((s) => (
                <figure key={s.label} className="card overflow-hidden" data-reveal>
                  <figcaption className="flex items-center justify-between border-b border-line px-5 py-3 font-bold">
                    {s.label}
                    <span className={`rounded-full px-3 py-0.5 text-xs ${s.cls}`}>{s.label === 'Before' ? 'Old site' : 'New site'}</span>
                  </figcaption>
                  <Image src={s.src} alt={`Lighthouse scores ${s.label.toLowerCase()} the rebuild`} width={1900} height={725} className="h-auto w-full" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.featureImages && project.featureImages.length > 0 && (
        <section aria-label="More screens" className="container pb-16">
          <div className="grid gap-6">
            {project.featureImages.map((img, i) => (
              <BrowserFrame key={img} src={img} alt={`${project.title} website, screen ${i + 2}`} url={host} />
            ))}
          </div>
        </section>
      )}

      <nav aria-label="Next project" className="border-t border-line">
        <Link href={next.caseStudyUrl || `/playroom/${next.id}/`} className="group container flex items-center justify-between gap-6 py-12">
          <span>
            <span className="eyebrow">Next project</span>
            <span className="mt-2 block text-3xl font-semibold tracking-tight transition-colors group-hover:text-gold-text md:text-5xl">{next.title}</span>
          </span>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line text-2xl transition-colors group-hover:bg-gold group-hover:text-[#16130E]">
            <FiArrowRight aria-hidden="true" />
          </span>
        </Link>
      </nav>
    </>
  );
}
