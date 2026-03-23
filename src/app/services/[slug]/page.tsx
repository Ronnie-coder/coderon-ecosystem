import { services } from '@/data/servicesData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const service = services.find(s => s.slug === slug);

  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.title} | Coderon Agency`,
    description: service.description,
  };
}

export async function generateStaticParams() {
  return services.map(service => ({ slug: service.slug }));
}

export default function ServiceDetailPage({ params }: PageProps) {
  const { slug } = params;
  const service = services.find(s => s.slug === slug);

  if (!service) { notFound(); }

  const { title, description, detailedDescription, benefits } = service;

  // JSON-LD for SEO (Service Schema)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'Coderon',
      url: 'https://coderon.co.za'
    },
    areaServed: 'Global', 
    serviceType: title
  };

  return (
    <main className="service-detail-page">
      {/* Inject SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="service-hero">
        <div className="container">
          <Link href="/services" className="back-link"><FaArrowLeft /> Back to Services</Link>
          <h1 className="animate-fade-up">{title}</h1>
          <p className="subtitle animate-fade-up delay-100">{description}</p>
        </div>
      </section>

      <section className="service-content">
        <div className="container service-grid">
          
          {/* Left Column: Prose */}
          <div className="service-description-prose animate-fade-in delay-200">
            <h2>Our Approach</h2>
            <div className="prose-content">
              {detailedDescription.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Benefits Card */}
          <div className="service-benefits-panel animate-slide-left delay-300">
            <h3>Why Choose Coderon?</h3>
            <ul className="benefits-list">
              {benefits.map((benefit, index) => (
                <li key={index} className="benefit-item">
                  <div className="icon-box">
                    <benefit.icon />
                  </div>
                  <span className="benefit-text">{benefit.text}</span>
                </li>
              ))}
            </ul>
            <div className="cta-wrapper">
              <Link href="/contact" className="btn btn-full-width">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}