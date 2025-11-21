// CORRECTED: src/app/services/[slug]/page.tsx
import { services } from '@/data/servicesData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const service = services.find(s => s.slug === slug);

  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.title} | Coderon`,
    description: service.description,
  };
}

export async function generateStaticParams() {
  return services.map(service => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = params;
  const service = services.find(s => s.slug === slug);

  if (!service) { notFound(); }

  const { title, description, detailedDescription, benefits } = service;

  return (
    <main className="service-detail-page">
      <section className="service-hero">
        <div className="container">
          <h1>{title}</h1>
          <p className="subtitle">{description}</p>
        </div>
      </section>

      <section className="service-content">
        <div className="container service-grid">
          <div className="service-description-prose">
            <h2>Our Approach</h2>
            {detailedDescription.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="service-benefits-panel">
            <h3>Key Benefits</h3>
            <ul className="benefits-list">
              {benefits.map((benefit, index) => (
                <li key={index} className="benefit-item">
                  <benefit.icon className="benefit-icon" />
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Leverage This Solution?</h2>
          <p>Let&apos;s discuss how our {title} expertise can help you achieve your business goals.</p>
          <Link href="/contact" className="btn btn-primary">Schedule a Free Consultation</Link>
        </div>
      </section>
    </main>
  );
}