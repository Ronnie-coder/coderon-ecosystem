import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'About Coderon',
  description:
    'Coderon is a Cape Town web and software studio founded by Ronnie Nyamhute. Fast websites and custom software for growing businesses.',
  alternates: { canonical: '/about/' },
};

const values = [
  {
    title: 'Built properly',
    text: 'The right HTML, clean code and simple notes on how everything works, so browsers, Google and screen readers understand your site and you are never locked in.',
  },
  {
    title: 'Everyone is welcome',
    text: 'We build to the WCAG accessibility guidelines, so people using a keyboard, a screen reader or an older phone can use your site too.',
  },
  {
    title: 'You talk to the builder',
    text: 'No hand-offs to a junior after you sign. You deal with the person building your project, in plain English.',
  },
  {
    title: 'Honest promises',
    text: 'We never promise "number one on Google". We promise a fast site that is set up properly, and we show you the numbers.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            Small studio. <span className="accent">Serious</span> work.
          </>
        }
        intro="Coderon builds fast websites and custom software for growing businesses. We started in Cape Town and work with clients in South Africa and Europe."
      />

      <section className="container grid gap-12 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-md" data-reveal>
          <div className="overflow-hidden rounded-2xl border border-line shadow-soft-lg">
            <Image
              src="/images/ronnie-nyamhute.jpg"
              alt="Ronnie Nyamhute, founder of Coderon"
              width={500}
              height={600}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <p className="absolute -bottom-5 -right-3 rotate-[-3deg] rounded-full border border-gold bg-gold px-4 py-2 font-bold text-[#16130E] shadow-soft">
            Ronnie, founder
          </p>
        </div>

        <div data-reveal>
          <h2 className="h-section">The story behind the <span className="accent">code</span></h2>
          <blockquote className="mt-8 border-l-4 border-gold pl-5 font-serif text-2xl italic leading-snug md:text-3xl">
            &ldquo;Every visitor matters. A website should work for everyone, not only for people who find technology
            easy.&rdquo;
          </blockquote>
          <p className="mt-8 text-lg leading-relaxed text-ink/80">
            I started with a love for websites and how they work. I learned full-stack development through freeCodeCamp,
            and one thing stood out early: anyone can add animations, but a website has more important jobs. It needs the
            right HTML so browsers, search engines and screen readers understand it, and it needs to follow the WCAG
            accessibility guidelines, because every visitor matters, not just the ones who find technology easy.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/80">
            That idea became Coderon. I registered the business and got to work, and this year the first projects came in.
            Gifted Tours was the first client, then came the Palmsure redesign and QuotePilot, my own invoicing tool for
            freelancers. I also redesigned the website of a hair salon in Denmark.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/80">
            Right now I am building a website for my cousin&apos;s motorbike business, free of charge, to help him get going
            and to show what a good website can do for a small business. Every project teaches me what businesses really
            need, and that goes into the next one.
          </p>
        </div>
      </section>

      <section aria-labelledby="how-we-work" className="section border-t border-line">
        <div className="container">
          <h2 id="how-we-work" className="h-section" data-reveal>
            How we <span className="accent">work</span>
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <li key={v.title} className="card p-6" data-reveal>
                <span className="font-mono text-sm font-semibold text-ink/65">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-ink/75">{v.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3" data-reveal>
            <Link href="/playroom/" className="btn-primary">
              See our work <FiArrowRight aria-hidden="true" />
            </Link>
            <Link href="/contact/" className="btn-ghost">Say hello</Link>
          </div>
        </div>
      </section>
    </>
  );
}
