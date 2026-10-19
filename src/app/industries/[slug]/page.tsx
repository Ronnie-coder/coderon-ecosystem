import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { industries, industryBySlug } from '@/data/industriesData';
import { liveProjects } from '@/data/playroomData';
import { priceFor } from '@/data/pricingData';
import { canonical, SITE_URL } from '@/lib/site';
import Accent from '@/components/ui/Accent';
import BrowserFrame from '@/components/ui/BrowserFrame';
import PlanCard from '@/components/pricing/PlanCard';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) return { title: 'Not found' };
  return {
    title: industry.seoTitle,
    description: industry.metaDescription,
    alternates: { canonical: canonical(`industries/${slug}`) },
    openGraph: { url: canonical(`industries/${slug}`) },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();
  const project = liveProjects.find((p) => p.id === industry.caseStudyId);
  const plans = industry.recommended.map(priceFor);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: industry.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Who we help', item: `${SITE_URL}/industries/` },
      { '@type': 'ListItem', position: 3, name: industry.name, item: `${SITE_URL}${canonical(`industries/${slug}`)}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbs]) }} />

      <header className="container pb-14 pt-12 md:pt-20">
        <p className="eyebrow">{industry.name}</p>
        <h1 className="h-display mt-4 max-w-[15ch]">
          <Accent text={industry.headline} />
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink/75 md:text-xl">{industry.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/contact/?topic=${industry.recommended[0]}`} className="btn-primary px-6 py-4 text-lg">
            Get a free quote <FiArrowRight aria-hidden="true" />
          </Link>
          <a href="https://wa.me/27678184898" target="_blank" rel="noopener noreferrer" className="btn-ghost px-6 py-4 text-lg">
            <FaWhatsapp aria-hidden="true" /> WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Who this is for">
          {industry.examples.map((e) => (
            <li key={e} className="chip border-line/40 text-sm">{e}</li>
          ))}
        </ul>
      </header>

      <section aria-labelledby="pains" className="section border-t-2 border-line/15 bg-ink/[0.03]">
        <div className="container">
          <h2 id="pains" className="h-section" data-reveal>Sound <span className="accent">familiar?</span></h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {industry.pains.map((p) => (
              <li key={p.title} className="card p-6" data-reveal>
                <h3 className="text-xl font-extrabold">{p.title}</h3>
                <p className="mt-2 text-ink/75">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="solution" className="section">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div data-reveal>
            <h2 id="solution" className="h-section">What we <span className="accent">build</span> for you</h2>
            <ul className="mt-8 space-y-6">
              {industry.solution.map((s) => (
                <li key={s.title} className="flex gap-4">
                  <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-[#16130E]" aria-hidden="true"><FiCheck /></span>
                  <div>
                    <h3 className="text-lg font-extrabold">{s.title}</h3>
                    <p className="mt-1 text-ink/75">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {project && (
            <Link href={project.caseStudyUrl || '/playroom/'} className="card-pop group block p-5" data-reveal>
              <p className="eyebrow">Real project</p>
              <p className="mt-2 text-2xl font-extrabold">{project.title}</p>
              <p className="mt-1 text-ink/70">{project.sector} · {project.location}</p>
              <BrowserFrame src={project.imageUrl} alt={`The ${project.title} website`} className="mt-5" />
              <span className="mt-5 inline-flex items-center gap-2 font-bold">
                Read the story <FiArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          )}
        </div>
      </section>

      <section aria-labelledby="prices" className="section border-t-2 border-line/15">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <h2 id="prices" className="h-section">Clear <span className="accent">prices</span></h2>
            <Link href="/pricing/" className="link-underline font-bold">See all prices</Link>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {plans.map((p) => (
              <PlanCard key={p.key} plan={p} ctaHref={`/contact/?topic=${p.key}`} ctaLabel={`Get a quote for ${p.name}`} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="faq" className="section border-t-2 border-line/15">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <h2 id="faq" className="h-section">Questions</h2>
          <div className="space-y-4">
            {industry.faqs.map((f) => (
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
