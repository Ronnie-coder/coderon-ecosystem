// src/app/services/[slug]/page.tsx
import { services } from '@/data/servicesData';
import { priceFor } from '@/data/pricingData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { canonical, SITE_URL } from '@/lib/site';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };

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
  const price = priceFor(service.priceKey);
  const ctaLabel = kind === 'website' ? 'Get a free website check' : 'Talk about custom software';
  const ctaHref = kind === 'website' ? '/contact/?topic=website' : '/contact/?topic=software';

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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <div className="service-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="service-hero">
        <div className="container">
          <Link href="/services/" className="back-link">
            <FaArrowLeft aria-hidden="true" /> All services
          </Link>
          <h1>{title}</h1>
          <p className="subtitle">{description}</p>
          <div className="service-hero__actions">
            <Link href={ctaHref} className="cta-button">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="service-content">
        <div className="container service-grid">
          <div className="service-description-prose">
            <h2>How we help</h2>
            {detailedDescription.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <h2>Is this for you?</h2>
            <ul className="service-checklist">
              {forWho.map((item) => (
                <li key={item}>
                  <FaCheck aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2>How it works</h2>
            <ol className="service-steps">
              {steps.map((step, i) => (
                <li key={step.title}>
                  <span className="service-steps__number" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2>Questions</h2>
            <div className="service-faq">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="service-benefits-panel" aria-labelledby="included-heading">
            <h2 id="included-heading" className="service-benefits-panel__heading">
              What you get
            </h2>
            <ul className="benefits-list">
              {benefits.map((benefit) => (
                <li key={benefit.text} className="benefit-item">
                  <span className="icon-box" aria-hidden="true">
                    <benefit.icon />
                  </span>
                  <span className="benefit-text">{benefit.text}</span>
                </li>
              ))}
            </ul>

            <div className="service-price">
              {price.usd ? (
                <>
                  <span className="service-price__label">From</span>
                  <span className="service-price__amount">{price.usd}</span>
                  <span className="service-price__meta">
                    {price.zar} · {price.period}
                  </span>
                </>
              ) : (
                <span className="service-price__amount service-price__amount--small">Quoted per project</span>
              )}
              <Link href="/pricing/" className="service-price__link">
                See all prices
              </Link>
            </div>

            <div className="cta-wrapper">
              <Link href={ctaHref} className="cta-button">
                {ctaLabel}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
