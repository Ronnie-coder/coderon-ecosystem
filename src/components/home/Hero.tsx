import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { Price } from '@/components/ui/Price';
import ServicePool from '@/components/home/ServicePool';
import { websitePlans, monthlyPlan } from '@/data/pricingData';

// Server component: the headline is the LCP element, so it paints immediately.
// Below the buttons our services float around a handwritten "coderon" (ServicePool); the
// text drifts up and fades as you leave the hero (SectionMotion).
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden" data-snap data-exit="hero">
      <div className="container flex flex-col items-center pt-12 text-center md:pt-20" data-hero-text>
        <Link
          href="/pricing/#monthly"
          className="group inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-line bg-card py-1 pl-1 pr-3.5 text-sm font-medium text-ink/80 shadow-soft transition-colors hover:border-ink/20"
        >
          <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-[#16130E]">New</span>
          <span>
            Monthly Website: <Price price={monthlyPlan.price} className="font-semibold text-ink" /> a month
          </span>
          <FiArrowUpRight aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>

        <h1 id="hero-title" className="h-display mt-7 max-w-[18ch]">
          Your business is real.<br />
          <span className="accent inline-block animate-rise text-balance [animation-delay:120ms]">Your website should look it.</span>
        </h1>

        <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink/70 [animation-delay:150ms] md:text-xl">
          Fast websites that look the part, are set up properly for Google, and let customers WhatsApp or call you in one tap.
          Need more? We build custom software too.
        </p>

        <div className="mt-9 flex animate-fade-up flex-wrap justify-center gap-3 [animation-delay:250ms]">
          <Link href="/contact/" className="btn-primary px-6 py-3.5 text-lg">
            Get a free quote <FiArrowRight aria-hidden="true" />
          </Link>
          <a href="https://wa.me/27678184898" target="_blank" rel="noopener noreferrer" className="btn-ghost px-6 py-3.5 text-lg">
            <FaWhatsapp aria-hidden="true" /> WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>

      {/* Our services float around a handwritten "coderon", like rings in a water toy. */}
      <div className="container mt-10 md:mt-14">
        <ServicePool />
      </div>

      <ul className="container flex animate-fade-up flex-wrap justify-center gap-x-8 gap-y-3 py-7 text-sm font-medium text-ink/80 [animation-delay:350ms]">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span>
            Websites from <Price price={websitePlans[0].price} className="font-semibold text-ink" />, or{' '}
            <Price price={monthlyPlan.price} className="font-semibold text-ink" /> a month
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
          Fixed price, no hidden costs
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
          You talk to the person building it
        </li>
      </ul>
    </section>
  );
}
