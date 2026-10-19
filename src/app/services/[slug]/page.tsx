// src/app/services/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';
import { services } from '@/data/servicesData';
import { allPlans } from '@/data/pricingData';
import { canonical, SITE_URL } from '@/lib/site';
import PlanCard from '@/components/pricing/PlanCard';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Service not found' };
  return {
    title: service.seoTitle || service.title,
    description: service.description,
    alternates: { canonical: canonical(`services/${service.slug}`) },
    openGraph: { url: canonical(`services/${service.slug}`) },
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const { title, description, detailedDescription, forWho, benefits, steps, faqs, kind } = service;
  const plans = allPlans.filter((p) => p.slug === slug);
  const cta = kind === 'website'
    ? { href: `/contact/?topic=${slug === 'website-fix' ? 'fix' : slug === 'website-care-plan' ? 'care' : 'new'}`, label: 'Get a free quote' }
    : { href: '/contact/?topic=software', label: 'Talk about custom software' };

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description,
      serviceType: title,
      provider: { '@id': `${SITE_URL}/#organization` },
      url: `${SITE_URL}${canonical(`services/${slug}`)}`,
      areaServed: 'Worldwide',
      offers: plans.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        price: p.price.ZAR,
        priceCurrency: 'ZAR',
        description: p.summary,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="container pb-12 pt-12 md:pb-16 md:pt-16">
        <Link href="/services/" className="inline-flex items-center gap-2 font-semibold text-ink/70 hover:text-ink">
          <FiArrowLeft aria-hidden="true" /> All services
        </Link>
        <h1 className="h-display mt-6 max-w-[14ch]">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink/75 md:text-xl">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={cta.href} className="btn-primary px-6 py-4 text-lg">
            {cta.label} <FiArrowRight aria-hidden="true" />
          </Link>
          <a href="#prices" className="btn-ghost px-6 py-4 text-lg">See prices</a>
        </div>
      </header>

      <section className="border-y-2 border-line/15 bg-ink/[0.03]">
        <div className="container grid gap-12 py-16 md:py-20 lg:grid-cols-[1.4fr_1fr]">
          <div data-reveal>
            <h2 className="h-section">How we <span className="accent">help</span></h2>
            {detailedDescription.split('\n').map((p, i) => (
              <p key={i} className="mt-5 text-lg leading-relaxed text-ink/80">{p}</p>
            ))}
          </div>
          <aside className="card-pop h-fit p-7" aria-labelledby="included" data-reveal>
            <h2 id="included" className="eyebrow">What you get</h2>
            <ul className="mt-5 space-y-4">
              {benefits.map((b) => (
                <li key={b.text} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-gold text-[#16130E] dark:border-gold" aria-hidden="true">
                    <b.icon />
                  </span>
                  <span className="self-center font-semibold">{b.text}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div data-reveal>
            <h2 className="h-section">Is this for <span className="accent">you?</span></h2>
            <ul className="mt-8 space-y-4">
              {forWho.map((item) => (
                <li key={item} className="flex gap-3 text-lg">
                  <FiCheck aria-hidden="true" className="mt-1 shrink-0 text-gold-text" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <h2 className="h-section">How it <span className="accent">works</span></h2>
            <ol className="mt-8 space-y-6">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink text-lg font-extrabold" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold">{step.title}</h3>
                    <p className="mt-1 text-ink/75">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="prices" aria-labelledby="prices-title" className="section scroll-mt-24 border-t-2 border-line/15">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <h2 id="prices-title" className="h-section">Prices</h2>
            <Link href="/pricing/" className="link-underline font-bold">See all prices</Link>
          </div>
          <div className={`mt-10 grid gap-6 ${plans.length >= 3 ? 'lg:grid-cols-3' : plans.length === 2 ? 'md:grid-cols-2' : 'max-w-xl'}`}>
            {plans.map((p) => (
              <PlanCard key={p.key} plan={p} ctaHref={cta.href} ctaLabel={kind === 'website' ? `Get a quote for ${p.name}` : 'Book a free call'} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="section border-t-2 border-line/15">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <h2 id="faq-title" className="h-section">Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="card group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                  {f.q}
                  <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-ink/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
