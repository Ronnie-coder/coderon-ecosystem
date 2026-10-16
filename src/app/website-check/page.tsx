import type { Metadata } from 'next';
import SiteCheck from '@/components/check/SiteCheck';
import { canonical } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free Website Check: Speed, Security & Google Set-up',
  description:
    'Paste your website address and get a free check in under a minute: Google PageSpeed on mobile, HTTPS, phone layout and what Google shows in search.',
  alternates: { canonical: canonical('website-check') },
  openGraph: { url: canonical('website-check') },
};

const faqs = [
  {
    q: 'Is it really free?',
    a: 'Yes. The check runs Google PageSpeed and our own tests on your homepage. If you want, we also record a short video showing how to fix what we found. No obligation.',
  },
  {
    q: 'Where do the numbers come from?',
    a: 'The speed, SEO and accessibility scores come straight from Google PageSpeed Insights on a test phone. The HTTPS, phone layout and Google title checks are read from your homepage.',
  },
  {
    q: 'Why does my score change between tests?',
    a: 'Google runs a real test each time, so the score can move a few points with network conditions. Big gaps are what matter.',
  },
];

export default function WebsiteCheckPage() {
  return (
    <>
      <section className="container pb-16 pt-12 md:pt-20">
        <p className="eyebrow">Free website check</p>
        <h1 className="h-display mt-4 max-w-[15ch]">
          How is your website <span className="accent">really</span> doing?
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink/75 md:text-xl">
          Paste your link. In under a minute you&apos;ll see your Google speed score on a phone, whether the site is secure, and
          what Google shows in search. Real numbers, plain English.
        </p>
        <div className="mt-10 max-w-5xl">
          <SiteCheck />
        </div>
      </section>

      <section className="section border-t-2 border-line/15" aria-labelledby="check-faq">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <h2 id="check-faq" className="h-section">
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
