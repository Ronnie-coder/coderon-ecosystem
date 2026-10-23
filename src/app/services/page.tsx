import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { services } from '@/data/servicesData';
import { priceFor } from '@/data/pricingData';
import { Price } from '@/components/ui/Price';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Services: Websites, Fixes, Care & Software',
  description:
    'Website fixes, new websites with local SEO set-up, monthly website care, and custom software for growing businesses. Clear prices, plain English.',
  alternates: { canonical: '/services/' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Pick what you <span className="accent">need.</span>
          </>
        }
        intro="Four clear services. Start small with a fix, get a new website, let us look after it, or build software for the work your team does by hand."
      />

      <section aria-label="Our services" className="container space-y-6 pb-24">
        {services.map((s, i) => {
          const plan = priceFor(s.priceKey);
          return (
            <article key={s.slug} className="card-pop grid gap-8 p-7 md:grid-cols-[1.2fr_1fr] md:p-10" data-reveal>
              <div>
                <p className="font-mono text-sm font-semibold text-ink/65">0{i + 1} · {s.kind === 'website' ? 'Websites' : 'Software'}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{s.title}</h2>
                <p className="mt-4 text-lg text-ink/75">{s.description}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href={`/services/${s.slug}/`} className="btn-primary">
                    How it works <FiArrowRight aria-hidden="true" />
                  </Link>
                  <p className="text-lg font-bold">
                    <span className="text-ink/60">from </span>
                    <Price price={plan.price} />
                    {plan.period === 'per month' && <span className="text-ink/60"> / month</span>}
                  </p>
                </div>
              </div>
              <ul className="space-y-3 self-center rounded-2xl bg-ink/[0.04] p-6">
                {s.benefits.map((b) => (
                  <li key={b.text} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-sm text-[#16130E]" aria-hidden="true">
                      <FiCheck />
                    </span>
                    <span className="font-medium">{b.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>
    </>
  );
}
