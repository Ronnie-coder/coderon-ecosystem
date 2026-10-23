import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';
import type { PricePlan } from '@/data/pricingData';
import { Price } from '@/components/ui/Price';

export default function PlanCard({ plan, ctaHref, ctaLabel }: { plan: PricePlan; ctaHref: string; ctaLabel: string }) {
  const featured = plan.highlight;
  return (
    <article
      className={`relative flex flex-col rounded-2xl border p-7 ${
        featured ? 'border-gold bg-card shadow-soft-lg ring-1 ring-gold' : 'border-line bg-card shadow-soft'
      }`}
      data-reveal
    >
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#16130E]">
          Most popular
        </span>
      )}
      <h3 className="text-2xl font-semibold">{plan.name}</h3>
      <p className="mt-2 text-ink/70">{plan.summary}</p>
      <p className="mt-6 flex items-baseline gap-2">
        {plan.period === 'from' && <span className="font-semibold">from</span>}
        <Price price={plan.price} className="text-5xl font-semibold tracking-tight" />
        {plan.period === 'per month' && <span className="font-semibold">/ month</span>}
      </p>
      <p className="mt-1 text-sm font-medium text-ink/60">
        {plan.period === 'per month' ? 'Cancel any month (30 days notice)' : plan.timeline ? `Once-off · ${plan.timeline}` : 'Once-off'}
      </p>
      <ul className="mt-6 space-y-3">
        {plan.includes.map((item) => (
          <li key={item} className="flex gap-3">
            <FiCheck aria-hidden="true" className="mt-1 shrink-0 text-gold-text" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`mt-8 w-full ${featured ? 'btn-primary' : 'btn-ghost'}`}
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
