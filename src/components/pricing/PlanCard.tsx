import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';
import type { PricePlan } from '@/data/pricingData';
import { Price } from '@/components/ui/Price';

export default function PlanCard({ plan, ctaHref, ctaLabel }: { plan: PricePlan; ctaHref: string; ctaLabel: string }) {
  const featured = plan.highlight;
  return (
    <article
      className={`relative flex flex-col rounded-2xl border-2 p-7 ${
        featured ? 'border-ink bg-gold text-[#16130E] shadow-hard-lg dark:border-gold' : 'border-line bg-card shadow-hard'
      }`}
      data-reveal
    >
      {featured && (
        <span className="absolute -top-3.5 left-6 rounded-full border-2 border-ink bg-[#16130E] px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-[#F2C230]">
          Most popular
        </span>
      )}
      <h3 className="text-2xl font-extrabold">{plan.name}</h3>
      <p className={`mt-2 ${featured ? 'text-[#16130E]/80' : 'text-ink/70'}`}>{plan.summary}</p>
      <p className="mt-6 flex items-baseline gap-2">
        {plan.period === 'from' && <span className="font-semibold">from</span>}
        <Price price={plan.price} className="text-5xl font-extrabold tracking-tight" />
        {plan.period === 'per month' && <span className="font-semibold">/ month</span>}
      </p>
      <p className={`mt-1 text-sm font-semibold ${featured ? 'text-[#16130E]/70' : 'text-ink/60'}`}>
        {plan.period === 'per month' ? 'Cancel any month (30 days notice)' : plan.timeline ? `Once-off · ${plan.timeline}` : 'Once-off'}
      </p>
      <ul className="mt-6 space-y-3">
        {plan.includes.map((item) => (
          <li key={item} className="flex gap-3">
            <FiCheck aria-hidden="true" className="mt-1 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`btn mt-8 w-full ${featured ? 'border-[#16130E] bg-[#16130E] text-[#F2EBDD] shadow-[5px_5px_0_#FFFDF8]' : 'btn-primary'}`}
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
