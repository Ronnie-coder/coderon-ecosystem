import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'About Coderon',
  description:
    'Coderon is a small web and software studio in Cape Town, founded by Ronnie Nyamhute. We build fast websites and custom software for growing businesses in South Africa and abroad.',
  alternates: { canonical: '/about/' },
};

const values = [
  {
    title: 'No shortcuts',
    text: 'Clean code, proper set-up and simple notes on how everything works, so you are never locked in or left in the dark.',
  },
  {
    title: 'Real problems first',
    text: 'We add automation or AI only when it removes real work from your day, and we measure it by the time you get back.',
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
          <div className="overflow-hidden rounded-2xl border-2 border-ink shadow-hard-lg dark:border-line">
            <Image
              src="/images/ronnie-nyamhute.jpg"
              alt="Ronnie Nyamhute, founder of Coderon"
              width={500}
              height={600}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
          <p className="absolute -bottom-5 -right-3 rotate-[-3deg] rounded-xl border-2 border-ink bg-gold px-4 py-2 font-bold text-[#16130E] shadow-hard-sm">
            Ronnie, founder
          </p>
        </div>

        <div data-reveal>
          <h2 className="h-section">The story behind the <span className="accent">code</span></h2>
          <blockquote className="mt-8 border-l-4 border-gold pl-5 font-serif text-2xl italic leading-snug md:text-3xl">
            &ldquo;Growing businesses deserve software that fits how they actually work, not a watered-down tool built for
            someone else&apos;s market.&rdquo;
          </blockquote>
          <p className="mt-8 text-lg leading-relaxed text-ink/80">
            Coderon started from a simple observation: small and growing businesses were being let down by slow websites and
            off-the-shelf software that did not fit local payments, local customers or local ways of working.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/80">
            So we started building. Software for an insurance broker. New websites for a tour company and a hair salon in
            Denmark. An invoicing tool for freelancers. Every project teaches us what businesses really need, and that goes
            into the next one.
          </p>
        </div>
      </section>

      <section aria-labelledby="how-we-work" className="section border-t-2 border-line/15">
        <div className="container">
          <h2 id="how-we-work" className="h-section" data-reveal>
            How we <span className="accent">work</span>
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <li key={v.title} className="card p-6" data-reveal>
                <span className="font-mono text-sm font-semibold text-ink/50">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-extrabold">{v.title}</h3>
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
