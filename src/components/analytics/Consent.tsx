"use client";

// Cookie consent + analytics, our own lightweight "Cookiebot".
// - Necessary storage (theme, motion, currency, form draft) is always allowed.
// - Google Analytics 4 and Microsoft Clarity load ONLY after the visitor accepts analytics.
// - Vercel Analytics is cookieless and runs for everyone (see layout.tsx).
// - Clicks on WhatsApp, phone, email and [data-cta] elements are tracked as events.
// The banner can be reopened from the footer ("Cookie settings").
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/track';

const KEY = 'coderon-consent-v1';
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-TQQX3FHT1B';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
export const OPEN_EVENT = 'coderon:consent-open';

type Choice = { analytics: boolean; at: string };

function readChoice(): Choice | null {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null');
    return v && typeof v.analytics === 'boolean' ? v : null;
  } catch {
    return null;
  }
}

let loaded = false;
function loadAnalytics() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function gtag() { window.dataLayer!.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  if (CLARITY_ID) {
    (function (c: any, l: Document, a: string, r: string, i: string) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = 'https://www.clarity.ms/tag/' + i;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode!.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
    // Clarity's consent signal (Consent API v2): it only loads after the visitor accepts
    // analytics, so analytics is granted; we run no ads, so ad storage stays denied.
    window.clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
  }
}

export default function Consent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    const choice = readChoice();
    if (!choice) setOpen(true);
    else if (choice.analytics) loadAnalytics();
    const reopen = () => {
      setAnalytics(readChoice()?.analytics ?? true);
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  // Page views on client-side navigation (GA's first view is sent by config).
  useEffect(() => {
    if (loaded && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: pathname, page_location: window.location.href });
    }
  }, [pathname]);

  // Track contact clicks anywhere on the site.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('a, button') as HTMLElement | null;
      if (!el) return;
      const href = el.getAttribute('href') || '';
      const where = el.closest('header') ? 'header' : el.closest('footer') ? 'footer' : el.closest('aside') ? 'floating' : window.location.pathname;
      if (href.includes('wa.me/')) track('whatsapp_click', { location: where });
      else if (href.startsWith('tel:')) track('phone_click', { location: where });
      else if (href.startsWith('mailto:')) track('email_click', { location: where });
      else if (href.startsWith('/contact')) track('quote_cta_click', { location: where, label: (el.textContent || '').trim().slice(0, 60) });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  const save = useCallback((allowAnalytics: boolean) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ analytics: allowAnalytics, at: new Date().toISOString() }));
    } catch {}
    if (allowAnalytics) loadAnalytics();
    else if (loaded) window.location.reload(); // stop scripts that already loaded
    setOpen(false);
  }, []);

  if (!open || pathname?.startsWith('/admin')) return null;

  return (
    <section
      aria-label="Cookie choices"
      className="fixed inset-x-3 bottom-3 z-50 max-w-lg rounded-2xl border border-line bg-card p-5 text-ink shadow-soft sm:left-4 sm:right-auto"
    >
      <h2 className="text-lg font-semibold">Cookies, your choice</h2>
      <p className="mt-2 text-sm text-ink/80">
        We use a few cookies to see which pages help people most, so we can improve the site. Nothing is sold or used for
        ads. Read our{' '}
        <Link href="/privacy-policy/" className="link-underline font-semibold">privacy policy</Link>.
      </p>

      {details && (
        <fieldset className="mt-4 space-y-3 rounded-xl bg-ink/[0.04] p-4 text-sm">
          <legend className="sr-only">Cookie categories</legend>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked disabled className="mt-1 h-4 w-4" />
            <span>
              <span className="font-bold">Necessary</span> (always on): remembers your theme, animation and currency choices.
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 h-4 w-4 accent-[rgb(var(--ink))]" />
            <span>
              <span className="font-bold">Analytics</span>: Google Analytics and Microsoft Clarity show us how people use the site,
              without telling us who you are.
            </span>
          </label>
        </fieldset>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {details ? (
          <button type="button" onClick={() => save(analytics)} className="btn-primary !py-2 text-sm">
            Save my choices
          </button>
        ) : (
          <>
            <button type="button" onClick={() => save(true)} className="btn-primary !py-2 text-sm">
              Accept all
            </button>
            <button type="button" onClick={() => save(false)} className="btn-ghost !py-2 text-sm">
              Only necessary
            </button>
            <button type="button" onClick={() => setDetails(true)} className="px-2 text-sm font-semibold underline underline-offset-4">
              Choose
            </button>
          </>
        )}
      </div>
    </section>
  );
}

/** Footer link that reopens the cookie choices. */
export function CookieSettingsButton({ className = '' }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Cookie settings
    </button>
  );
}
