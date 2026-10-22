import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { Price } from '@/components/ui/Price';
import { websitePlans, monthlyPlan } from '@/data/pricingData';

// Server component: the headline is the LCP element, so it paints immediately.
// Only the gold markers and the lines below it animate (CSS).
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="container pb-14 pt-12 md:pb-20 md:pt-20">
        <p className="eyebrow animate-fade-up">Coderon · Cape Town web studio</p>
        <h1 id="hero-title" className="h-display mt-5 max-w-[20ch]">
          Your business is real.{' '}<br className="hidden lg:block" />
          <span className="accent marker">Your website should look it.</span>
        </h1>

        <div className="mt-8 grid items-end gap-8 md:mt-12 lg:grid-cols-[1.25fr_1fr]">
          <p className="max-w-xl animate-fade-up text-lg leading-relaxed text-ink/75 [animation-delay:150ms] md:text-xl">
            Fast websites that look the part, are set up properly for Google, and let customers WhatsApp or call you in one tap.
            Need more? We build custom software too.
          </p>
          <div className="flex animate-fade-up flex-wrap gap-3 [animation-delay:250ms] lg:justify-end">
            <Link href="/contact/" className="btn-primary px-6 py-4 text-lg">
              Get a free quote <FiArrowRight aria-hidden="true" />
            </Link>
            <a href="https://wa.me/27678184898" target="_blank" rel="noopener noreferrer" className="btn-ghost px-6 py-4 text-lg">
              <FaWhatsapp aria-hidden="true" /> WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <ul className="mt-12 flex animate-fade-up flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-ink/70 [animation-delay:350ms]">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
            <span>
              Websites from <Price price={websitePlans[0].price} className="text-ink" />, or{' '}
              <Price price={monthlyPlan.price} className="text-ink" /> a month
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
            Fixed price, no hidden costs
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
            You talk to the person building it
          </li>
        </ul>
      </div>
    </section>
  );
}
