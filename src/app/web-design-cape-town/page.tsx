import type { Metadata } from 'next';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { websitePlans } from '@/data/pricingData';
import { liveProjects } from '@/data/playroomData';
import { industries } from '@/data/industriesData';
import { canonical, SITE_URL } from '@/lib/site';
import PlanCard from '@/components/pricing/PlanCard';
import BrowserFrame from '@/components/ui/BrowserFrame';
import Accent from '@/components/ui/Accent';

export const metadata: Metadata = {
  title: 'Web Design Cape Town: Websites from R3,500',
  description:
    'Web design in Cape Town for small businesses: fast, mobile-first websites set up for Google, with WhatsApp buttons and clear once-off prices from R3,500.',
  alternates: { canonical: canonical('web-design-cape-town') },
  openGraph: { url: canonical('web-design-cape-town') },
};

const areas = [
  'City Bowl', 'Atlantic Seaboard', 'Southern Suburbs', 'Northern Suburbs', 'Bellville', 'Durbanville',
  'Table View', 'Somerset West', 'Stellenbosch', 'Paarl', 'Fish Hoek', 'Mitchells Plain',
];

const reasons = [
  { title: 'Prices on the page', text: 'R3,500, R8,500 or R16,500 once-off. You know the cost before you call, and you get a fixed quote before we start.' },
  { title: 'Fast on mobile data', text: 'We build light, modern sites instead of heavy templates, so they load quickly on the phones your customers use.' },
  { title: 'Set up for Google', text: 'Titles, descriptions, local business schema, sitemap, Search Console and help with your Google Business Profile.' },
  { title: 'You talk to the builder', text: 'No account managers or hand-offs. You deal with Ronnie, who designs and builds your site.' },
  { title: 'Real, checkable work', text: 'Look at the sites we built for Gifted Tours in Cape Town and Palmsure Insurance. They are live.' },
  { title: 'Software when you need it', text: 'When your business outgrows spreadsheets, the same team can build the system behind your website.' },
];

const faqs = [
  { q: 'How much does a website cost in Cape Town?', a: 'Most small business websites in Cape Town cost between about R3,000 and R20,000 once-off. Ours are R3,500 for one page, R8,500 for up to 5 pages and R16,500 for up to 10 pages with a blog or booking.' },
  { q: 'How long does it take?', a: 'About a week for a one-page site, 2 to 3 weeks for a Business site and 3 to 5 weeks for Growth.' },
  { q: 'Do you only work with Cape Town businesses?', a: 'No. We are based in Cape Town and work with businesses across South Africa and abroad, all online.' },
  { q: 'Will my website rank first on Google?', a: 'No one can honestly guarantee that. We make sure your site is fast and set up so Google can understand it, and help with your Google Business Profile, which matters most for local searches.' },
];

export default function WebDesignCapeTownPage() {
  const proof = liveProjects.filter((p) => ['gifted-tours', 'palmsure'].includes(p.id));
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Web design in Cape Town',
      serviceType: 'Website design',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'City', name: 'Cape Town' },
      offers: websitePlans.map((p) => ({ '@type': 'Offer', name: p.name, price: p.price.ZAR, priceCurrency: 'ZAR' })),
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
      <header className="container pb-14 pt-12 md:pt-20">
        <p className="eyebrow">Web design · Cape Town</p>
        <h1 className="h-display mt-4 max-w-[16ch]">
          Web design in Cape Town, <span className="accent">without the guesswork.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink/75 md:text-xl">
          Coderon is a Cape Town studio that builds fast, mobile-first websites for small businesses, set up properly for
          Google, with buttons on every page that let customers WhatsApp or call you in one tap. Clear prices from R3,500 once-off.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact/?topic=new" className="btn-primary px-6 py-4 text-lg">
            Get a free quote <FiArrowRight aria-hidden="true" />
          </Link>
          <a href="https://wa.me/27678184898" target="_blank" rel="noopener noreferrer" className="btn-ghost px-6 py-4 text-lg">
            <FaWhatsapp aria-hidden="true" /> WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </header>

      <section aria-labelledby="packages" className="section border-t-2 border-line/15">
        <div className="container">
          <h2 id="packages" className="h-section" data-reveal>Website <span className="accent">packages</span></h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {websitePlans.map((p) => (
              <PlanCard key={p.key} plan={p} ctaHref={`/contact/?topic=${p.key}`} ctaLabel={`Get a quote for ${p.name}`} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="why" className="section border-t-2 border-line/15 bg-ink/[0.03]">
        <div className="container">
          <h2 id="why" className="h-section" data-reveal>Why Cape Town businesses <span className="accent">choose</span> us</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <li key={r.title} className="card p-6" data-reveal>
                <FiCheck aria-hidden="true" className="text-2xl text-gold-text" />
                <h3 className="mt-3 text-xl font-extrabold">{r.title}</h3>
                <p className="mt-2 text-ink/75">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="proof" className="section">
        <div className="container">
          <h2 id="proof" className="h-section" data-reveal>Work you can <span className="accent">visit</span></h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {proof.map((p) => (
              <Link key={p.id} href={p.caseStudyUrl || '/playroom/'} className="card-pop group block p-5" data-reveal>
                <BrowserFrame src={p.imageUrl} alt={`The ${p.title} website`} />
                <p className="mt-5 text-2xl font-extrabold">{p.title}</p>
                <p className="text-ink/70">{p.sector} · {p.location}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="areas" className="section border-t-2 border-line/15">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div data-reveal>
            <h2 id="areas" className="h-section">Across <span className="accent">Cape Town</span></h2>
            <p className="mt-4 text-lg text-ink/75">We work with businesses all over the city and the Winelands, and with clients across South Africa online.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {areas.map((a) => <li key={a} className="chip border-line/40">{a}</li>)}
            </ul>
          </div>
          <div data-reveal>
            <h2 className="h-section">Who we <span className="accent">help</span></h2>
            <ul className="mt-6 space-y-3">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}/`} className="card group flex items-center justify-between gap-4 p-5 hover:bg-gold/10">
                    <span>
                      <span className="block font-extrabold">{i.name}</span>
                      <span className="block text-sm text-ink/70"><Accent text={i.headline} /></span>
                    </span>
                    <FiArrowRight aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq" className="section border-t-2 border-line/15">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <h2 id="faq" className="h-section">Questions</h2>
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
