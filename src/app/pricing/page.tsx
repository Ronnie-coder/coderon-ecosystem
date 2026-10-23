// src/app/pricing/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { websitePlans, monthlyPlan, fixPlan, carePlans, softwarePlan } from '@/data/pricingData';
import { canonical } from '@/lib/site';
import PageHeader from '@/components/ui/PageHeader';
import PlanCard from '@/components/pricing/PlanCard';
import { CurrencySwitch, Price } from '@/components/ui/Price';

export const metadata: Metadata = {
  title: 'Pricing: Website Packages, Website Fix, Care Plans',
  description:
    'Clear prices for small business websites: from R3,500 once-off or R599 a month with no upfront cost, plus website fixes, care plans and custom software.',
  alternates: { canonical: canonical('pricing') },
};

const faqs = [
  {
    q: 'Is the price fixed?',
    a: 'Yes. After a free check or call you get one fixed price in writing before any work starts. If something changes, we agree it with you first.',
  },
  {
    q: 'How do I pay?',
    a: 'For once-off work: 50% to start and 50% when you are happy and the site goes live. Monthly Website and care plans are billed monthly, month to month, with 30 days notice to cancel.',
  },
  {
    q: 'How does the Monthly Website work?',
    a: 'You buy your own domain (your web address, from about R100 a year for .co.za) and we help you if needed. You pay the first month upfront and we start. Hosting, updates and small changes are included. After that you pay monthly and can cancel any time with 30 days notice. Your domain is always yours; the website itself stays with Coderon if you cancel.',
  },
  {
    q: 'What about domain and hosting?',
    a: 'With a once-off package you pay the domain and hosting provider directly, so you always own them, and we set everything up. With the Monthly Website, you own and pay for your domain, and hosting is included in the monthly fee.',
  },
  {
    q: 'Do you work with businesses outside South Africa?',
    a: 'Yes. We work with clients in South Africa, Europe, the UK and the US. Use the switch at the top to see prices in rand or US dollars.',
  },
  {
    q: 'Do you guarantee Google rankings?',
    a: 'No. Nobody can honestly guarantee rankings. We make sure your site is fast, works on phones and is set up properly so Google can understand it, which is the foundation for ranking.',
  },
];

function SectionHead({ id, eyebrow, title, intro }: { id: string; eyebrow: string; title: React.ReactNode; intro: string }) {
  return (
    <div className="max-w-2xl" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="h-section mt-3">{title}</h2>
      <p className="mt-4 text-lg text-ink/75">{intro}</p>
    </div>
  );
}

export default function PricingPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Clear prices. <span className="accent">No surprises.</span>
          </>
        }
        intro="Pick the package that fits today. You get one fixed price before any work starts, and you only pay for what you need."
      >
        <CurrencySwitch className="mt-8" />
      </PageHeader>

      <section aria-labelledby="websites" className="section border-t border-line">
        <div className="container">
          <SectionHead
            id="websites"
            eyebrow="New website"
            title={<>Website <span className="accent">packages</span></>}
            intro="Every package is fast, works on every phone and is set up properly for Google from day one."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {websitePlans.map((p) => (
              <PlanCard key={p.key} plan={p} ctaHref={`/contact/?topic=${p.key}`} ctaLabel={`Get a quote for ${p.name}`} />
            ))}
          </div>
          <p className="mt-6 text-sm text-ink/60">Need more than 10 pages or an online shop? We quote it after a free call.</p>
        </div>
      </section>

      <section aria-labelledby="monthly" className="section border-t border-line">
        <div className="container grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHead
              id="monthly"
              eyebrow="No big upfront cost"
              title={<>Prefer to pay <span className="accent">monthly?</span></>}
              intro="Get a professional website without paying a lump sum. One monthly fee covers the website, hosting, updates and small changes. Your domain stays in your name."
            />
            <h3 className="mt-10 text-xl font-semibold">How it works</h3>
            <ol className="mt-4 space-y-4">
              {[
                ['Get your domain', 'Your domain is your web address, like yourbusiness.co.za. You buy it in your own name (a .co.za is about R100 a year). No domain yet? We show you how, step by step.'],
                ['Pay your first month', 'You pay the first month upfront and we start building. No other set-up fee.'],
                ['Your site goes live', 'Usually within about a week. Hosting, updates, backups and up to 30 minutes of changes a month are included.'],
                ['Then month to month', 'You pay monthly. Cancel any time with 30 days notice.'],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line font-semibold" aria-hidden="true">{i + 1}</span>
                  <div>
                    <p className="font-bold">{t}</p>
                    <p className="text-ink/75">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="card mt-8 p-5">
              <h3 className="font-semibold">If you cancel</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink/80">
                <li>Your domain is in your name, so it stays yours.</li>
                <li>The website design and code stay with Coderon, and the site goes offline at the end of your notice.</li>
                <li>Want to keep the website itself? Choose a once-off package instead and it is yours.</li>
              </ul>
            </div>
          </div>
          <PlanCard plan={monthlyPlan} ctaHref="/contact/?topic=monthly" ctaLabel="Start my Monthly Website" />
        </div>
      </section>

      <section aria-labelledby="fix" className="section border-t border-line">
        <div className="container grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <SectionHead
            id="fix"
            eyebrow="Already have a website?"
            title={<>Fix it, don&apos;t <span className="accent">replace</span> it.</>}
            intro="If your site is slow, says 'not secure' or breaks on phones, we fix it on the website you already have. Most fixes are done in a week."
          />
          <PlanCard plan={fixPlan} ctaHref="/contact/?topic=fix" ctaLabel="Get a quote for a fix" />
        </div>
      </section>

      <section aria-labelledby="care" className="section border-t border-line">
        <div className="container">
          <SectionHead
            id="care"
            eyebrow="Every month"
            title={<>Care <span className="accent">plans</span></>}
            intro="A website is not finished on launch day. We keep it updated, safe and fast, so you can get on with your business."
          />
          <div className="mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            {carePlans.map((p) => (
              <PlanCard key={p.key} plan={p} ctaHref="/contact/?topic=care" ctaLabel={`Choose ${p.name}`} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="software" className="band-dark">
        <div className="container grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1.4fr_1fr]">
          <div data-reveal>
            <p className="eyebrow text-[#F2F2F2]/60">Custom software</p>
            <h2 id="software" className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Tools built around <span className="font-serif font-normal italic text-[#F2C230]">how you work.</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg text-[#F2F2F2]/70">{softwarePlan.summary} Every project is different, so we quote after a free call.</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-7" data-reveal>
            <p className="font-semibold text-[#F2F2F2]/70">Projects from</p>
            <Price price={softwarePlan.price} className="mt-1 block text-5xl font-semibold tracking-tight" />
            <ul className="mt-5 space-y-2 text-[#F2F2F2]/85">
              {softwarePlan.includes.map((i) => (
                <li key={i}>✦ {i}</li>
              ))}
            </ul>
            <Link href="/contact/?topic=software" className="btn-primary mt-7 w-full">
              Book a free call <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="pricing-faq" className="section">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <h2 id="pricing-faq" className="h-section">
            Good to <span className="accent">know</span>
          </h2>
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
