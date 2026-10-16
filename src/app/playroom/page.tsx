import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { liveProjects, interactiveDemos } from '@/data/playroomData';
import PageHeader from '@/components/ui/PageHeader';
import BrowserFrame from '@/components/ui/BrowserFrame';

export const metadata: Metadata = {
  title: 'Our Work: Websites and Software We Have Built',
  description:
    "Websites and software Coderon has designed, built and launched: Eddie's Cut, Palmsure Insurance, Gifted Tours and QuotePilot.",
  alternates: { canonical: '/playroom/' },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title={
          <>
            Built, launched, <span className="accent">live.</span>
          </>
        }
        intro="Real websites and software for real businesses. Each one has a short story: the problem, what we did, and what changed."
      />

      <section aria-label="Projects" className="container space-y-10 pb-20 md:space-y-14">
        {liveProjects.map((p, i) => (
          <article key={p.id} className="card-pop grid gap-8 p-5 md:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center" data-reveal>
            <Link href={p.caseStudyUrl || p.liveUrl} className={`block ${i % 2 ? 'lg:order-2' : ''}`} tabIndex={-1} aria-hidden="true">
              <BrowserFrame
                src={p.imageUrl}
                alt=""
                url={p.liveUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                priority={i === 0}
              />
            </Link>
            <div className="px-2 pb-2 lg:px-4">
              <p className="eyebrow">{p.category}</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{p.title}</h2>
              <p className="mt-1 font-semibold text-ink/60">
                {p.sector} · {p.location} · {p.year}
              </p>
              <p className="mt-4 text-lg text-ink/75">{p.description}</p>
              {p.stat && (
                <p className="mt-5 inline-flex items-baseline gap-2 rounded-xl border-2 border-ink bg-gold px-4 py-2 font-bold text-[#16130E] dark:border-gold">
                  {p.stat.label}: <span className="line-through opacity-60">{p.stat.before}</span> → <span className="text-xl">{p.stat.after}</span>
                </p>
              )}
              <div className="mt-7 flex flex-wrap gap-3">
                {p.caseStudyUrl && (
                  <Link href={p.caseStudyUrl} className="btn-primary">
                    Read the story <FiArrowRight aria-hidden="true" />
                  </Link>
                )}
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Visit site <FiArrowUpRight aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {interactiveDemos.length > 0 && (
        <section aria-labelledby="lab" className="section border-t-2 border-line/15">
          <div className="container">
            <div className="max-w-2xl" data-reveal>
              <p className="eyebrow">The lab</p>
              <h2 id="lab" className="h-section mt-3">Try a <span className="accent">demo</span></h2>
              <p className="mt-4 text-lg text-ink/75">Small working examples of the kind of tools we build. Click and play.</p>
            </div>
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {interactiveDemos.map((d) => (
                <li key={d.id} data-reveal>
                  <Link href={`${d.href}/`} className="card-pop group flex h-full flex-col p-6">
                    <p className="eyebrow">{d.category}</p>
                    <h3 className="mt-3 text-xl font-extrabold">{d.title}</h3>
                    <p className="mt-2 text-ink/75">{d.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 font-bold">
                      Open the demo <FiArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
