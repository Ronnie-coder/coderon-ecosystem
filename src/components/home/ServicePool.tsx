"use client";

// The hero's "water game": our services float like the rings in those old water-ring toys,
// around a handwritten "coderon". When the pool scrolls into view the services rise into
// place and bob for a few seconds, then settle (moving content stops within 5 seconds,
// WCAG 2.2.2). Press a button, or tap the water, and a current pushes them around before
// they drift home. Light: a few transforms per frame, and only while something is moving.
// With animations off everything is simply in place.
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { LuWaves } from 'react-icons/lu';
import HandwrittenCoderon from '@/components/motion/HandwrittenCoderon';
import { useTheme } from '@/contexts/ThemeContext';

// Resting spots as % of the pool: desktop [x, y] and phone [x, y].
const ITEMS = [
  { label: 'Website Fix', href: '/services/website-fix/', d: [15, 20], m: [30, 7] },
  { label: 'New Website', href: '/services/web-development/', d: [84, 17], m: [71, 16] },
  { label: 'Monthly Website', href: '/pricing/#monthly', d: [11, 57], m: [33, 26] },
  { label: 'Website Care', href: '/services/website-care-plan/', d: [89, 55], m: [68, 64] },
  { label: 'Custom Software', href: '/services/custom-software/', d: [29, 84], m: [31, 73] },
  { label: 'Free quote', href: '/contact/', d: [71, 83], m: [69, 83] },
] as const;

const FLOAT_MS = 4200; // bobbing after a press, then everything settles
const ENTRANCE_MS = 2600; // shorter on entrance, so it's all still within about 5 seconds

type Body = { x: number; y: number; vx: number; vy: number; phase: number };

export default function ServicePool() {
  const poolRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { motion } = useTheme();
  const still = motion === 'reduce';
  const api = useRef<{ push: (px: number, py: number, force: number) => void } | null>(null);

  useEffect(() => {
    const pool = poolRef.current;
    const els = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!pool || !els.length) return;

    const place = (el: HTMLLIElement, b: Body) => {
      const r = Math.max(-14, Math.min(14, b.vx * 2.5));
      el.style.transform = `translate(-50%, -50%) translate3d(${b.x.toFixed(2)}px, ${b.y.toFixed(2)}px, 0) rotate(${r.toFixed(2)}deg)`;
    };

    if (still) {
      pool.classList.add('is-in');
      els.forEach((el) => (el.style.transform = 'translate(-50%, -50%)'));
      api.current = null;
      return;
    }

    const bodies: Body[] = els.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, phase: Math.random() * Math.PI * 2 }));
    let raf = 0;
    let floatUntil = 0;

    const tick = (t: number) => {
      raf = 0;
      const W = pool.clientWidth;
      const H = pool.clientHeight;
      const floating = t < floatUntil;
      let moving = floating;
      els.forEach((el, i) => {
        const b = bodies[i];
        // Gently bob around the resting spot while floating; otherwise drift home.
        const tx = floating ? Math.sin(t * 0.0012 + b.phase) * 7 : 0;
        const ty = floating ? Math.cos(t * 0.0009 + b.phase) * 9 : 0;
        b.vx = (b.vx + (tx - b.x) * 0.018) * 0.94;
        b.vy = (b.vy + (ty - b.y) * 0.018) * 0.94;
        b.x += b.vx;
        b.y += b.vy;
        // Keep inside the pool: bounce softly off the walls.
        const halfW = el.offsetWidth / 2;
        const halfH = el.offsetHeight / 2;
        const left = el.offsetLeft + b.x - halfW;
        const right = el.offsetLeft + b.x + halfW;
        const top = el.offsetTop + b.y - halfH;
        const bottom = el.offsetTop + b.y + halfH;
        if (left < 0 || right > W) {
          b.x -= left < 0 ? left : right - W;
          b.vx *= -0.5;
        }
        if (top < 0 || bottom > H) {
          b.y -= top < 0 ? top : bottom - H;
          b.vy *= -0.5;
        }
        place(el, b);
        if (Math.abs(b.vx) + Math.abs(b.vy) + Math.abs(b.x) + Math.abs(b.y) > 0.15) moving = true;
      });
      if (moving) raf = requestAnimationFrame(tick);
      else
        els.forEach((el, i) => {
          Object.assign(bodies[i], { x: 0, y: 0, vx: 0, vy: 0 });
          place(el, bodies[i]);
        });
    };
    const run = (ms: number) => {
      floatUntil = performance.now() + ms;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // A current from point (px, py), in pool pixels: pushes services away and upward.
    api.current = {
      push: (px, py, force) => {
        els.forEach((el, i) => {
          const b = bodies[i];
          const dx = el.offsetLeft + b.x - px;
          const dy = el.offsetTop + b.y - py;
          const d = Math.hypot(dx, dy) || 1;
          const f = force * Math.exp(-d / 320);
          b.vx += (dx / d) * f;
          b.vy += (dy / d) * f - f * 0.6;
        });
        run(FLOAT_MS);
      },
    };

    // Entrance: rise from below, staggered, when the pool first comes into view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const H = pool.clientHeight;
        bodies.forEach((b, i) => {
          b.x = (Math.random() - 0.5) * 40;
          b.y = H * 0.55 + i * 18;
          b.vy = -2 - Math.random() * 2;
        });
        els.forEach((el, i) => place(el, bodies[i]));
        requestAnimationFrame(() => pool.classList.add('is-in'));
        run(ENTRANCE_MS);
      },
      { threshold: 0.3 }
    );
    io.observe(pool);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      api.current = null;
    };
  }, [still]);

  const jet = (side: 'left' | 'right') => {
    const pool = poolRef.current;
    if (!pool || !api.current) return;
    api.current.push(side === 'left' ? pool.clientWidth * 0.04 : pool.clientWidth * 0.96, pool.clientHeight, 26);
  };

  // Tapping the water itself (not a service or a button) sends a ripple from that spot.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!api.current || (e.target as HTMLElement).closest('a, button')) return;
    const r = e.currentTarget.getBoundingClientRect();
    api.current.push(e.clientX - r.left, e.clientY - r.top, 18);
  };

  return (
    <div
      ref={poolRef}
      onPointerDown={onPointerDown}
      className="pool relative z-10 h-[460px] overflow-hidden rounded-[2rem] border border-line bg-paper bg-[radial-gradient(ellipse_at_50%_40%,rgb(var(--gold)/0.07),transparent_65%)] sm:h-[380px]"
    >
      <div className="pointer-events-none absolute left-1/2 top-[45%] w-[250px] -translate-x-1/2 -translate-y-1/2 sm:top-[42%] sm:w-[340px] md:w-[420px]">
        <HandwrittenCoderon className="w-full" />
      </div>

      <ul aria-label="Our services">
        {ITEMS.map((item, i) => (
          <li
            key={item.href}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            style={
              {
                '--x': `${item.d[0]}%`,
                '--y': `${item.d[1]}%`,
                '--mx': `${item.m[0]}%`,
                '--my': `${item.m[1]}%`,
                transform: 'translate(-50%, -50%)',
                transitionDelay: `${i * 90}ms`,
              } as React.CSSProperties
            }
            className="pool-item absolute left-[var(--mx)] top-[var(--my)] sm:left-[var(--x)] sm:top-[var(--y)]"
          >
            <Link
              href={item.href}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-card px-4 py-2 text-sm font-medium shadow-soft transition-colors hover:border-ink/30"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {!still && (
        <>
          <button
            type="button"
            onClick={() => jet('left')}
            aria-label="Press to stir the services from the left"
            className="btn-ghost absolute bottom-3 left-3 !px-3 !py-1.5 text-xs"
          >
            <LuWaves aria-hidden="true" /> Press
          </button>
          <button
            type="button"
            onClick={() => jet('right')}
            aria-label="Press to stir the services from the right"
            className="btn-ghost absolute bottom-3 right-3 !px-3 !py-1.5 text-xs"
          >
            Press <LuWaves aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
