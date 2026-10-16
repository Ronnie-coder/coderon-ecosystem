import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { getAllPosts } from '@/lib/journal';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Plain-English notes on websites, Google set-up and custom software, from the Coderon team. Real projects, real lessons.',
  alternates: { canonical: '/journal/' },
};

export const revalidate = 3600;

const fmt = (d: string) => new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function JournalPage() {
  const posts = await getAllPosts();
  const [latest, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title={
          <>
            Notes from the <span className="accent">workshop.</span>
          </>
        }
        intro="What we learn building websites and software for real businesses, written in plain English."
      />

      <section aria-label="All posts" className="container pb-24">
        {latest && (
          <Link href={`/journal/${latest.slug}/`} className="card-pop group grid gap-6 p-7 md:grid-cols-[1fr_auto] md:items-end md:p-10" data-reveal>
            <div>
              <p className="chip border-ink bg-gold text-[#16130E]">Latest</p>
              <h2 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">{latest.title}</h2>
              <p className="mt-4 max-w-2xl text-lg text-ink/75">{latest.description}</p>
              <p className="mt-6 font-mono text-sm text-ink/60">
                <time dateTime={latest.date}>{fmt(latest.date)}</time> · {latest.readingTime} min read
              </p>
            </div>
            <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink text-2xl transition-colors group-hover:bg-gold group-hover:text-[#16130E]">
              <FiArrowRight aria-hidden="true" />
            </span>
          </Link>
        )}

        <ul className="mt-8 divide-y-2 divide-line/15 border-y-2 border-line/15">
          {rest.map((p) => (
            <li key={p.slug} data-reveal>
              <Link href={`/journal/${p.slug}/`} className="group grid gap-2 py-7 md:grid-cols-[180px_1fr_auto] md:items-center md:gap-8">
                <p className="font-mono text-sm text-ink/60">
                  <time dateTime={p.date}>{fmt(p.date)}</time>
                </p>
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight transition-colors group-hover:text-gold-text md:text-2xl">{p.title}</h2>
                  <p className="mt-1 line-clamp-2 text-ink/70">{p.description}</p>
                </div>
                <span className="hidden text-sm font-semibold text-ink/60 md:block">{p.readingTime} min</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
