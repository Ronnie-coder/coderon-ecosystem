import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { services } from '@/data/servicesData';
import { priceFor } from '@/data/pricingData';
import { Price } from '@/components/ui/Price';

// The four offers, in plain English, with a "from" price on each.
export default function Offers() {
  return (
    <section aria-labelledby="offers-title" className="section border-t-2 border-line/15">
      <div className="container">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">What we do</p>
          <h2 id="offers-title" className="h-section mt-3">
            Four ways we can <span className="accent">help.</span>
          </h2>
          <p className="mt-4 text-lg text-ink/75">
            Fix the website you have, get a new one, let us look after it every month, or build software for the work your
            team does by hand.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const plan = priceFor(s.priceKey);
            return (
              <li key={s.slug} data-reveal>
                <Link href={`/services/${s.slug}/`} className="card-pop group flex h-full flex-col p-7 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-sm font-semibold text-ink/50">0{i + 1}</span>
                    <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink text-xl transition-colors group-hover:bg-gold group-hover:text-[#16130E]">
                      <FiArrowUpRight aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold tracking-tight md:text-3xl">{s.title}</h3>
                  <p className="mt-3 text-ink/75">{s.description}</p>
                  <p className="mt-auto pt-8 text-lg font-bold">
                    <span className="text-ink/60">from </span>
                    <Price price={plan.price} />
                    {plan.period === 'per month' && <span className="text-ink/60"> / month</span>}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
