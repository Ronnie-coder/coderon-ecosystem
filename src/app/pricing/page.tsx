// src/app/pricing/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import { pricing } from '@/data/pricingData';
import { canonical } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing: Website Fix, New Website, Care Plan',
  description:
    'Clear starting prices for website fixes, new websites with local SEO set-up and monthly website care. Custom software is quoted per project.',
  alternates: { canonical: canonical('pricing') },
};

const faqs = [
  {
    q: 'Why "from" prices?',
    a: 'Every business is a bit different. You always get one fixed price in writing before any work starts. No surprises.',
  },
  {
    q: 'Do you work with businesses outside South Africa?',
    a: 'Yes. We work with clients in South Africa, Europe, the UK, the US and Australia. Prices are shown in US dollars and rand.',
  },
  {
    q: 'How do I pay?',
    a: 'For once-off work: 50% to start and 50% when you are happy. Care Plans are billed monthly.',
  },
  {
    q: 'Do you guarantee Google rankings?',
    a: 'No. Nobody can honestly guarantee rankings. We make sure your site is fast and set up properly so Google can understand it.',
  },
];

export default function PricingPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <div className="c-page-container c-pricing">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <header className="c-page-header">
        <h1>Simple, honest pricing</h1>
        <p>
          Start with a free website check. You get a fixed price before any work starts, and you only pay for
          what you need.
        </p>
      </header>

      <div className="c-pricing__grid">
        {pricing.map((plan) => (
          <section
            key={plan.key}
            className={`c-pricing__card${plan.highlight ? ' c-pricing__card--highlight' : ''}`}
            aria-labelledby={`plan-${plan.key}`}
          >
            {plan.highlight && <span className="c-pricing__badge">Most popular</span>}
            <h2 id={`plan-${plan.key}`}>{plan.name}</h2>
            <p className="c-pricing__summary">{plan.summary}</p>

            <div className="c-pricing__price">
              {plan.usd ? (
                <>
                  <span className="c-pricing__from">From</span>
                  <span className="c-pricing__amount">{plan.usd}</span>
                  <span className="c-pricing__meta">
                    {plan.zar} · {plan.period}
                  </span>
                </>
              ) : (
                <span className="c-pricing__amount c-pricing__amount--quote">Quoted per project</span>
              )}
            </div>

            <ul className="c-pricing__list">
              {plan.includes.map((item) => (
                <li key={item}>
                  <FaCheck aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="c-pricing__actions">
              <Link
                href={plan.key === 'software' ? '/contact/?topic=software' : '/contact/?topic=website'}
                className={plan.highlight ? 'cta-button' : 'cta-button-secondary'}
              >
                {plan.key === 'software' ? 'Talk about custom software' : 'Get a free website check'}
              </Link>
              <Link href={`/services/${plan.slug}/`} className="c-pricing__details">
                What&apos;s included in {plan.name}
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section className="c-pricing__faq" aria-labelledby="pricing-faq">
        <h2 id="pricing-faq">Questions about pricing</h2>
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
