"use client";

// Counts from one number to another when it scrolls into view (GSAP).
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/contexts/ThemeContext';

export default function CountUp({ from, to, duration = 1.4, className }: { from: number; to: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let tween: { kill: () => void } | null = null;
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const { gsap } = await import('gsap');
        const state = { n: from };
        setValue(from);
        tween = gsap.to(state, { n: to, duration, ease: 'power2.out', onUpdate: () => setValue(Math.round(state.n)) });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      tween?.kill();
    };
  }, [from, to, duration]);

  return (
    <span ref={ref} className={className} aria-label={String(to)}>
      <span aria-hidden="true">{value}</span>
    </span>
  );
}
