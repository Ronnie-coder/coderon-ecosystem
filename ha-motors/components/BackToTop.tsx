"use client";

import { useEffect, useState } from "react";

/**
 * Floating "Back to top" button. Appears after scrolling down a bit, sits above the WhatsApp button,
 * scrolls smoothly (instantly with reduced motion) and moves keyboard focus back to the top of the page.
 */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    try {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    } catch {
      window.scrollTo(0, 0); // very old browsers
    }
    // Keyboard and screen reader users land at the top of the content, not at the bottom.
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] ring-2 ring-white transition-[opacity,transform] duration-200 hover:bg-black active:scale-95 sm:right-7 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ bottom: "calc(max(1rem, env(safe-area-inset-bottom)) + var(--banner-h, 0px) + 4.5rem)" }}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
