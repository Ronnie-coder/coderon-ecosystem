"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide motion, kept in one tiny client component:
 *  - [data-reveal]: fades/slides in when it scrolls into view. Optional data-reveal-delay="120" (ms).
 *  - [data-parallax="0.15"]: moves at a fraction of the scroll speed (decorative elements only).
 *
 * Accessibility: content is only hidden once JS has run (html.js), and nothing moves when the visitor
 * prefers reduced motion. Revealed elements stay in the accessibility tree the whole time.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    // Count page views within this visit (used by the Back button) and tell the inline failsafe we're alive.
    const w = window as Window & { __haNavs?: number; __haMotion?: boolean };
    w.__haNavs = (w.__haNavs ?? 0) + 1;
    w.__haMotion = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));

    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
      return;
    }

    reveals.forEach((el) => {
      const d = el.dataset.revealDelay;
      if (d) el.style.setProperty("--reveal-delay", `${d}ms`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    reveals.forEach((el) => io.observe(el));

    // Parallax
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of layers) {
        const speed = Number(el.dataset.parallax) || 0;
        const rect = el.parentElement?.getBoundingClientRect();
        if (!rect || rect.bottom < -200 || rect.top > vh + 200) continue;
        // 0 when the parent's centre is at the viewport centre
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    if (layers.length) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
