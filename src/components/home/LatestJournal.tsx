import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import type { JournalPost } from '@/lib/journal';

export default function LatestJournal({ posts }: { posts: JournalPost[] }) {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="journal-title" className="section" data-snap>
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div>
            <p className="eyebrow">From the journal</p>
            <h2 id="journal-title" className="h-section mt-3">
              Notes from the <span className="accent">workshop.</span>
            </h2>
          </div>
          <Link href="/journal/" className="btn-ghost">
            All posts <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <li key={p.slug} data-reveal>
              <Link href={`/journal/${p.slug}/`} className="card-pop group flex h-full flex-col p-6">
                <p className="font-mono text-xs text-ink/60">
                  <time dateTime={p.date}>{new Date(p.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                  {' · '}
                  {p.readingTime} min read
                </p>
                <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight">{p.title}</h3>
                <p className="mt-3 line-clamp-3 text-ink/75">{p.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 font-bold">
                  Read <FiArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
