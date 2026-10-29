"use client";

// Smooth scrolling, parallax and gentle section snapping (GSAP ScrollSmoother + ScrollTrigger).
// - Desktop with a mouse or trackpad only; phones keep native scrolling.
// - Parallax: any element with data-speed (e.g. data-speed="0.7") inside #smooth-content.
// - Snap: elements with data-snap. When scrolling stops close to the top of one, the page
//   settles onto it; it never pulls you away from the middle of a section.
// - Everything is off when animations are off (our switch or the OS setting).
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { prefersReducedMotion } from '@/contexts/ThemeContext';

const HEADER = 72;

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    const start = async () => {
      if (prefersReducedMotion()) return;
      const [{ gsap }, { ScrollTrigger }, { ScrollSmoother }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('gsap/ScrollSmoother'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      let keyboard = false;
      try { keyboard = sessionStorage.getItem('coderon-keyboard') === '1'; } catch {}
      const fine = window.matchMedia('(pointer: fine)').matches && !keyboard;
      const smoother = fine
        ? ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 1.1, effects: true, smoothTouch: false })
        : null;
      let smooth = smoother; // set to null if the visitor switches to keyboard navigation

      // Gentle snap to sections marked data-snap: when scrolling stops within 18% of the
      // viewport of a section top, glide onto it. Mid-section, nothing happens.
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-snap]'));
      const topOf = (el: HTMLElement) =>
        smooth ? smooth.offset(el, `top ${HEADER}px`) : el.getBoundingClientRect().top + window.scrollY - HEADER;
      const onScrollEnd = () => {
        if (sections.length < 2 || keyboard) return;
        const y = window.scrollY;
        // Never snap back to the very top: a small scroll from the hero should stay put.
        const tops = sections.map(topOf).filter((t) => t > 8);
        if (!tops.length) return;
        const nearest = tops.reduce((a, b) => (Math.abs(b - y) < Math.abs(a - y) ? b : a));
        const gap = Math.abs(nearest - y);
        if (gap < 4 || gap > window.innerHeight * 0.18) return;
        if (smooth) smooth.scrollTo(Math.max(0, nearest), true);
        else window.scrollTo({ top: Math.max(0, nearest), behavior: 'smooth' });
      };
      ScrollTrigger.addEventListener('scrollEnd', onScrollEnd);
      const snapTrigger = { kill: () => ScrollTrigger.removeEventListener('scrollEnd', onScrollEnd) };

      // Keyboard users get native scrolling: the first Tab press turns smoothing off for the
      // visit, so the browser can always scroll the focused element into view.
      const onKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        keyboard = true; // no snapping for keyboard users either
        if (!smooth) return;
        const y = window.scrollY;
        smooth.kill();
        smooth = null;
        window.scrollTo(0, y);
        try { sessionStorage.setItem('coderon-keyboard', '1'); } catch {}
      };
      document.addEventListener('keydown', onKey);

      const onMotion = (e: Event) => {
        if ((e as CustomEvent).detail === 'reduce') cleanup();
      };
      window.addEventListener('coderon:motion', onMotion);
      requestAnimationFrame(() => ScrollTrigger.refresh());

      cleanup = () => {
        window.removeEventListener('coderon:motion', onMotion);
        document.removeEventListener('keydown', onKey);
        snapTrigger.kill();
        smooth?.kill();
        document.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => (el.style.transform = ''));
      };
    };

    void start();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pathname]);

  return null;
}
