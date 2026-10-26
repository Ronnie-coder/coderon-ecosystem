"use client";

// Scroll reveals for any element with a data-reveal attribute, powered by GSAP ScrollTrigger.
// Elements are only hidden when animations are on (see globals.css), and a CSS fallback
// shows them after a few seconds if this script never runs.
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { prefersReducedMotion } from '@/contexts/ThemeContext';

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    const run = async () => {
      const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)'));
      if (!targets.length) return;
      if (prefersReducedMotion()) {
        targets.forEach((el) => el.classList.add('is-revealed'));
        return;
      }
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // Anything already scrolled past (refresh mid-page, anchor links) shows straight away.
      const pending = targets.filter((el) => {
        if (el.getBoundingClientRect().bottom < 0) {
          el.classList.add('is-revealed');
          return false;
        }
        return true;
      });

      const reveal = (batch: Element[]) => {
        gsap.fromTo(
          batch,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.09,
            clearProps: 'transform',
            onStart() {
              batch.forEach((el) => el.classList.add('is-revealed'));
            },
          }
        );
      };
      const triggers = ScrollTrigger.batch(pending, { start: 'top 88%', once: true, onEnter: reveal, onEnterBack: reveal });
      cleanup = () => triggers.forEach((t) => t.kill());
    };

    // Wait a frame so the new route's DOM is in place.
    const id = requestAnimationFrame(() => void run());
    const onMotion = () => document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'));
    window.addEventListener('coderon:motion', onMotion);
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
      window.removeEventListener('coderon:motion', onMotion);
      cleanup();
    };
  }, [pathname]);

  return null;
}
