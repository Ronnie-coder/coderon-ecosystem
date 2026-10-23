import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { industries } from '@/data/industriesData';
import Accent from '@/components/ui/Accent';

export default function WhoWeHelp() {
  return (
    <section aria-labelledby="who-title" className="section" data-snap>
      <div className="container">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">Who we help</p>
          <h2 id="who-title" className="h-section mt-3">
            Built for businesses <span className="accent">like yours.</span>
          </h2>
          <p className="mt-4 text-lg text-ink/75">
            Most of our clients are in these three groups, so we already know their customers. Run a different kind of
            business? We build for you too.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {industries.map((i, n) => (
            <li key={i.slug} data-reveal>
              <Link href={`/industries/${i.slug}/`} className="card-pop group flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-sm font-semibold text-ink/65">0{n + 1}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-line text-xl transition-colors group-hover:bg-gold group-hover:text-[#16130E]">
                    <FiArrowUpRight aria-hidden="true" />
                  </span>
                </div>
                <p className="eyebrow mt-6">{i.name}</p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight">
                  <Accent text={i.headline} />
                </h3>
                <p className="mt-3 text-ink/70">{i.examples.slice(0, 4).join(' · ')}</p>
              </Link>
            </li>
          ))}
          <li data-reveal>
            <Link href="/contact/?topic=new" className="card-pop group flex h-full flex-col border-dashed p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-sm font-semibold text-ink/65">04</span>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-line text-xl transition-colors group-hover:bg-gold group-hover:text-[#16130E]">
                  <FiArrowUpRight aria-hidden="true" />
                </span>
              </div>
              <p className="eyebrow mt-6">Any other business</p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight">
                Something <span className="accent">else?</span>
              </h3>
              <p className="mt-3 text-ink/70">Shops, schools, churches, NGOs, consultants, start-ups. Tell us what you do and we&apos;ll show you how we&apos;d help.</p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
