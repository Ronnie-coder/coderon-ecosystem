import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { Price } from '@/components/ui/Price';
import { websitePlans } from '@/data/pricingData';

// Server component: the headline is the LCP element, so it paints immediately.
// Only the gold markers and the lines below it animate (CSS).
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="container pb-14 pt-12 md:pb-20 md:pt-20">
        <p className="eyebrow animate-fade-up">Websites · SEO set-up · Custom software</p>
        <h1 id="hero-title" className="h-display mt-5 max-w-[17ch]">
          Websites people <span className="accent marker">trust.</span> Software that{' '}
          <span className="accent marker">saves</span> time.
        </h1>

        <div className="mt-8 grid items-end gap-8 md:mt-12 lg:grid-cols-[1.25fr_1fr]">
          <p className="max-w-xl animate-fade-up text-lg leading-relaxed text-ink/75 [animation-delay:150ms] md:text-xl">
            We&apos;re Coderon, a small studio in Cape Town. We build fast websites that work on every phone and are set
            up properly for Google, and custom tools for teams buried in spreadsheets.
          </p>
          <div className="flex animate-fade-up flex-wrap gap-3 [animation-delay:250ms] lg:justify-end">
            <Link href="/website-check/" className="btn-primary px-6 py-4 text-lg">
              Free website check <FiArrowRight aria-hidden="true" />
            </Link>
            <Link href="/services/custom-software/" className="btn-ghost px-6 py-4 text-lg">
              Custom software
            </Link>
          </div>
        </div>

        <ul className="mt-12 flex animate-fade-up flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-ink/70 [animation-delay:350ms]">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
            Websites from <Price price={websitePlans[0].price} className="text-ink" />
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
            Fixed price before we start
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
            Reply within one working day
          </li>
        </ul>
      </div>
    </section>
  );
}
