import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { industries } from '@/data/industriesData';
import Accent from '@/components/ui/Accent';

export default function WhoWeHelp() {
  return (
    <section aria-labelledby="who-title" className="section">
      <div className="container">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">Who we help</p>
          <h2 id="who-title" className="h-section mt-3">
            Built for businesses <span className="accent">like yours.</span>
          </h2>
          <p className="mt-4 text-lg text-ink/75">
            We focus on a few kinds of business, so we understand your customers before we write a line of code.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {industries.map((i, n) => (
            <li key={i.slug} data-reveal>
              <Link href={`/industries/${i.slug}/`} className="card-pop group flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-sm font-semibold text-ink/50">0{n + 1}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink text-xl transition-colors group-hover:bg-gold group-hover:text-[#16130E]">
                    <FiArrowUpRight aria-hidden="true" />
                  </span>
                </div>
                <p className="eyebrow mt-6">{i.name}</p>
                <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight">
                  <Accent text={i.headline} />
                </h3>
                <p className="mt-3 text-ink/70">{i.examples.slice(0, 4).join(' · ')}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
