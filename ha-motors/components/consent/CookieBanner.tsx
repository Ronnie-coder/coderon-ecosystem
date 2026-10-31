"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { routes } from "@/lib/site";
import { useConsent } from "./ConsentProvider";

const btn = "min-h-11 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors";

export function CookieBanner() {
  const { decided, acceptAll, rejectAll, openPreferences, preferencesOpen } = useConsent();
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Rendered in the static HTML (decided === null) so it paints immediately; an inline script in <head>
  // hides it before first paint for visitors who already chose. After hydration React takes over.
  const show = decided !== true && !preferencesOpen;

  // Expose banner height so the floating WhatsApp button can sit above it.
  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!show || !el) {
      root.style.setProperty("--banner-h", "0px");
      return;
    }
    const ro = new ResizeObserver(() => root.style.setProperty("--banner-h", `${el.offsetHeight}px`));
    root.style.setProperty("--banner-h", `${el.offsetHeight}px`);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty("--banner-h", "0px");
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={ref}
      role="region"
      aria-labelledby={titleId}
      className="ha-cookie-banner on-dark fixed inset-x-0 bottom-0 z-50 border-t-4 border-brand-yellow bg-ink text-white shadow-2xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="text-sm">
          <p id={titleId} className="font-heading text-lg font-bold uppercase">Cookies on this site</p>
          <p className="text-white/85">
            We use strictly necessary cookies to make the site work. With your OK, we&apos;d also use analytics
            cookies to see which pages help people. See our{" "}
            <Link href={routes.cookies} className="font-semibold text-brand-yellow underline underline-offset-2">
              cookie policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:flex-nowrap">
          <button type="button" onClick={acceptAll} className={`${btn} bg-white text-ink hover:bg-muted`}>
            Accept all
          </button>
          <button type="button" onClick={rejectAll} className={`${btn} bg-white text-ink hover:bg-muted`}>
            Reject non-essential
          </button>
          <button type="button" onClick={openPreferences} className={`${btn} text-white underline underline-offset-4 hover:text-brand-yellow`}>
            Manage preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export function PreferencesModal() {
  const { preferencesOpen, closePreferences, save, analytics, marketing, decided } = useConsent();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [a, setA] = useState(analytics);
  const [m, setM] = useState(marketing);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (preferencesOpen && !d.open) {
      // Sync toggles with the stored choice each time the dialog opens.
      setA(analytics);
      setM(marketing);
      d.showModal(); // native modal: focus is trapped, background inert, Esc closes
    } else if (!preferencesOpen && d.open) {
      d.close();
    }
  }, [preferencesOpen, analytics, marketing]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={closePreferences}
      className="m-auto w-[min(32rem,calc(100vw-2rem))] rounded-2xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/70"
    >
      <form
        method="dialog"
        className="p-6"
        onSubmit={(e) => {
          e.preventDefault();
          save({ analytics: a, marketing: m });
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-3xl font-extrabold uppercase">Cookie preferences</h2>
          <button
            type="button"
            onClick={closePreferences}
            className="-mt-1 -mr-2 grid h-11 w-11 place-items-center rounded-lg hover:bg-muted"
            aria-label="Close cookie preferences"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-sm text-ink-soft">
          Choose which cookies we may use. You can change this any time with &quot;Cookie settings&quot; in the footer.
        </p>

        <ul className="mt-5 space-y-3">
          <Toggle
            id="c-necessary"
            label="Strictly necessary"
            desc="Remembers your cookie choice. Always on, because the site needs it."
            checked
            disabled
          />
          <Toggle
            id="c-analytics"
            label="Analytics"
            desc="Google Analytics, so we can see which pages help people. Off unless you switch it on."
            checked={a}
            onChange={setA}
          />
          <Toggle
            id="c-marketing"
            label="Marketing"
            desc="Not used at the moment. Kept here in case we add ads measurement later."
            checked={m}
            onChange={setM}
          />
        </ul>

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          <button type="button" onClick={() => save({ analytics: false, marketing: false })} className={`${btn} border-2 border-ink`}>
            Reject non-essential
          </button>
          <button type="button" onClick={() => save({ analytics: true, marketing: true })} className={`${btn} border-2 border-ink`}>
            Accept all
          </button>
          <button type="submit" className={`${btn} bg-ink text-white hover:bg-black`}>
            Save choices
          </button>
        </div>
        {decided === false && <p className="sr-only">You haven&apos;t chosen yet. Non-essential cookies stay off until you do.</p>}
      </form>
    </dialog>
  );
}

function Toggle({
  id,
  label,
  desc,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <li className="flex items-start justify-between gap-4 rounded-xl bg-muted p-4">
      <div>
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
        <p id={`${id}-desc`} className="text-sm text-ink-soft">
          {desc}
        </p>
      </div>
      <span className="relative mt-1 inline-flex shrink-0">
        <input
          id={id}
          type="checkbox"
          role="switch"
          aria-describedby={`${id}-desc`}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer h-7 w-12 cursor-pointer appearance-none rounded-full bg-[#8a9099] transition-colors checked:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-70"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"
        />
      </span>
    </li>
  );
}
