import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { industries } from '@/data/industriesData';
import PageHeader from '@/components/ui/PageHeader';
import Accent from '@/components/ui/Accent';

export const metadata: Metadata = {
  title: 'Who We Help: Local Businesses, Tourism & Brokers',
  description:
    'Coderon builds websites and software for local service businesses, tour operators and guesthouses, and insurance brokers in South Africa and abroad.',
  alternates: { canonical: '/industries/' },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who we help"
        title={<>Built for businesses <span className="accent">like yours.</span></>}
        intro="Most of our clients are in these three groups, so we already know their customers. Run a different kind of business? We build for you too."
      />
      <section className="container grid gap-6 pb-24 md:grid-cols-2 xl:grid-cols-4">
        {industries.map((i) => (
          <Link key={i.slug} href={`/industries/${i.slug}/`} className="card-pop group flex flex-col p-7" data-reveal>
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow">{i.name}</p>
              <FiArrowUpRight aria-hidden="true" className="text-2xl transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight"><Accent text={i.headline} /></h2>
            <p className="mt-3 text-ink/75">{i.examples.slice(0, 4).join(' · ')}</p>
          </Link>
        ))}
        <Link href="/contact/?topic=new" className="card-pop group flex flex-col border-dashed p-7" data-reveal>
          <div className="flex items-start justify-between gap-4">
            <p className="eyebrow">Any other business</p>
            <FiArrowUpRight aria-hidden="true" className="text-2xl transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight">Something <span className="accent">else?</span></h2>
          <p className="mt-3 text-ink/75">Shops, schools, churches, NGOs, consultants, start-ups. Tell us what you do.</p>
        </Link>
      </section>
    </>
  );
}
