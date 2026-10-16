"use client";

// Prices show in rand for visitors in Africa and US dollars elsewhere.
// The visitor can switch; the choice is shared by every price on the page.
import { useEffect, useState } from 'react';
import { Currency, formatPrice, guessCurrency } from '@/data/pricingData';

const KEY = 'coderon-currency';
const EVENT = 'coderon:currency';

function readCurrency(): Currency {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'ZAR' || saved === 'USD') return saved;
  } catch {}
  return guessCurrency();
}

export function useCurrency(): [Currency, (c: Currency) => void] {
  const [currency, setCurrency] = useState<Currency>('ZAR');
  useEffect(() => {
    setCurrency(readCurrency());
    const onChange = (e: Event) => setCurrency((e as CustomEvent<Currency>).detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  const set = (c: Currency) => {
    try { localStorage.setItem(KEY, c); } catch {}
    window.dispatchEvent(new CustomEvent(EVENT, { detail: c }));
  };
  return [currency, set];
}

export function Price({ price, className }: { price: { ZAR: number; USD: number }; className?: string }) {
  const [currency] = useCurrency();
  return (
    <span className={className} suppressHydrationWarning>
      {formatPrice(price[currency], currency)}
    </span>
  );
}

export function CurrencySwitch({ className = '' }: { className?: string }) {
  const [currency, setCurrency] = useCurrency();
  return (
    <div role="group" aria-label="Currency" className={`inline-flex rounded-xl border-2 border-ink p-1 ${className}`}>
      {(['ZAR', 'USD'] as Currency[]).map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={currency === c}
          onClick={() => setCurrency(c)}
          className={`rounded-lg px-4 py-1.5 text-sm font-bold transition-colors ${
            currency === c ? 'bg-ink text-paper' : 'text-ink hover:bg-ink/10'
          }`}
        >
          {c === 'ZAR' ? 'R  Rand' : '$  US Dollar'}
        </button>
      ))}
    </div>
  );
}
