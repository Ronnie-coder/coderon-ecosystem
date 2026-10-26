"use client";

// Gentle exits as you scroll (entrances are in Reveal.tsx):
// - Every top-level section of the page lifts a little and fades back while the next one
//   takes over, and returns as you scroll back up. It only starts once the section's
//   bottom edge is above the middle of the screen, so nothing fades while you read it.
// - The hero's text drifts up slower than the page and fades as you leave it.
// Scrubbed to the scroll position (GSAP ScrollTrigger); off when animations are off.
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { prefersReducedMotion } from '@/contexts/ThemeContext';

const transparent = (el: HTMLElement) => {
  const bg = getComputedStyle(el).backgroundColor;
  return bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)';
};

export default function SectionMotion() {
  const pathname = usePathname();

  useEffect(() => {
    let revert = () => {};
    let cancelled = false;

    const run = async () => {
      if (prefersReducedMotion()) return;
      const main = document.getElementById('main');
      if (!main) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Hero: text drifts and fades over the first ~500px of scrolling.
        const hero = main.querySelector<HTMLElement>('[data-exit="hero"]');
        const heroText = hero?.querySelector<HTMLElement>('[data-hero-text]');
        if (hero && heroText) {
          gsap.to(heroText, {
            y: 120,
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top 72px', end: '+=520', scrub: true },
          });
        }

        // Every other top-level section: lift and fade back as it leaves.
        const sections = Array.from(main.querySelectorAll<HTMLElement>('section, header')).filter(
          (el) => !el.parentElement?.closest('section, header') && !el.hasAttribute('data-exit')
        );
        sections.forEach((section) => {
          // Fade the section itself when it has no background; otherwise fade its content
          // so coloured bands keep their colour.
          const targets = transparent(section) ? [section] : Array.from(section.children);
          gsap.to(targets, {
            y: -48,
            opacity: 0.2,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'bottom 50%', end: 'bottom 5%', scrub: true },
          });
        });
      }, main);

      revert = () => ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    // Wait a frame so the new route's DOM is in place.
    const id = requestAnimationFrame(() => void run());
    const onMotion = (e: Event) => {
      if ((e as CustomEvent).detail === 'reduce') revert();
    };
    window.addEventListener('coderon:motion', onMotion);
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
      window.removeEventListener('coderon:motion', onMotion);
      revert();
    };
  }, [pathname]);

  return null;
}
