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
            Sound like <span className="accent">you?</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/75">
            We do <Link href="/web-design-cape-town/" className="kw">web design in Cape Town</Link> and across South Africa:{' '}
            <Link href="/services/web-development/" className="kw">new websites for small businesses</Link>,{' '}
            <Link href="/services/website-fix/" className="kw">website fixes</Link> for slow or &ldquo;not secure&rdquo; sites,{' '}
            <Link href="/services/website-care-plan/" className="kw">monthly website care</Link>, and{' '}
            <Link href="/services/custom-software/" className="kw">custom software and automation</Link> for teams buried in
            spreadsheets. Every website comes with an <Link href="/journal/website-not-showing-on-google/" className="kw">SEO set-up</Link>{' '}
            so Google can understand it.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const plan = priceFor(s.priceKey);
            return (
              <li key={s.slug} data-reveal>
                <Link href={`/services/${s.slug}/`} className="card-pop group flex h-full flex-col p-7 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-sm font-semibold text-ink/65">0{i + 1}</span>
                    <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink text-xl transition-colors group-hover:bg-gold group-hover:text-[#16130E]">
                      <FiArrowUpRight aria-hidden="true" />
                    </span>
                  </div>
                  <p className="eyebrow mt-6">{s.title}</p>
                  <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">{s.need}</h3>
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
