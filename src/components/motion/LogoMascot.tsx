"use client";

// The Coderon C as big hairline line-art behind a section.
// - It draws itself as you scroll: both edges of the C trace together from the top tip
//   round to the bottom tip while the C turns into place, and rewind if you scroll back
//   up (GSAP ScrollTrigger, smoothed so it glides rather than jumps).
// - When the C is complete, the cursor block from the logo appears and blinks like a text
//   cursor waiting for you to type. It leans gently toward the mouse pointer (on touch
//   screens it looks around by itself).
// - With animations off it is a finished, still drawing (see .mascot-* in globals.css).
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Outline of the logo's C stroke (centre 32.43,32 · radius 16 · stroke 7 · round ends), in the
// logo's own coordinates, split so both edges can draw at once: top cap, two edges, bottom cap.
const TOP_CAP = 'M41.86 23.8A3.5 3.5 0 0 0 47.145 19.206';
const OUTER_EDGE = 'M47.145 19.206A19.5 19.5 0 1 0 47.145 44.794';
const INNER_EDGE = 'M41.86 23.8A12.5 12.5 0 1 0 41.86 40.2';
const BOTTOM_CAP = 'M47.145 44.794A3.5 3.5 0 0 0 41.86 40.2';
const VIEW = 48; // viewBox "8 8 48 48"
const CX = 32.43; // centre of the C
const CY = 32;
const EX = 46.5; // centre of the cursor
const EY = 32;

type Props = {
  /** Sets the size (width) and the outline colour (text-*). */
  className?: string;
  /** Outline thickness in screen pixels, whatever the drawing's size. */
  hairline?: number;
};

export default function LogoMascot({ className = '', hairline = 1.25 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const turnRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const eyeRef = useRef<SVGGElement>(null);
  const [stroke, setStroke] = useState(0.1);
  const { motion } = useTheme();
  const still = motion === 'reduce';

  // Keep the outline a crisp hairline at any size.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const fit = () => svg.clientWidth && setStroke((hairline * VIEW) / svg.clientWidth);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(svg);
    return () => ro.disconnect();
  }, [hairline]);

  // Draw on scroll.
  useEffect(() => {
    const svg = svgRef.current;
    const turn = turnRef.current;
    if (!svg || !turn || still) return;
    let revert = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const q = (selector: string) => svg.querySelectorAll(selector);

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: svg,
          start: 'top bottom', // already part-drawn if it starts on screen (the hero)
          end: 'clamp(top 30%)', // clamp: still completes at the very bottom of a page
          scrub: 1.2,
          onUpdate: (self) => svg.classList.toggle('is-complete', self.progress > 0.98),
        },
      });
      // Lines are measured as 0–100 (pathLength); autoRound off so GSAP doesn't snap to whole pixels.
      const draw = { strokeDashoffset: 0, autoRound: false };
      tl.fromTo(q('.mascot-cap-top'), { strokeDashoffset: 100 }, { ...draw, duration: 0.06 })
        .fromTo(q('.mascot-edge'), { strokeDashoffset: 100 }, { ...draw, duration: 0.8, ease: 'power1.inOut' })
        .fromTo(q('.mascot-cap-bottom'), { strokeDashoffset: 100 }, { ...draw, duration: 0.06 })
        .fromTo(turn, { rotation: -18, svgOrigin: `${CX} ${CY}` }, { rotation: 0, duration: 0.92, ease: 'power2.out' }, 0)
        .fromTo(
          q('.mascot-cursor'),
          { opacity: 0, scale: 0.3, svgOrigin: `${EX} ${EY}` },
          { opacity: 1, scale: 1, duration: 0.08, ease: 'back.out(2.5)' }
        );

      revert = () => {
        tl.scrollTrigger?.kill();
        tl.revert();
        svg.classList.remove('is-complete');
      };
    })();

    return () => {
      cancelled = true;
      revert();
    };
  }, [still]);

  // The C and its cursor lean toward the pointer; on touch screens they look around calmly.
  useEffect(() => {
    const svg = svgRef.current;
    const head = headRef.current;
    const eye = eyeRef.current;
    if (!svg || !head || !eye) return;
    if (still) {
      head.removeAttribute('transform');
      eye.removeAttribute('transform');
      return;
    }

    let visible = false;
    let raf = 0;
    const target = { x: 0, y: 0 }; // where the cursor wants to lean, -1..1
    const cur = { x: 0, y: 0 };
    let lastPointer = -Infinity;
    let wanderAt = 0;

    const tick = (t: number) => {
      raf = 0;
      if (!visible) return;
      if (t - lastPointer > 4000 && t > wanderAt) {
        const a = Math.random() * Math.PI * 2;
        const m = 0.25 + Math.random() * 0.6;
        target.x = Math.cos(a) * m;
        target.y = Math.sin(a) * m * 0.7;
        wanderAt = t + 2200 + Math.random() * 2600;
      }
      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;
      head.setAttribute('transform', `rotate(${(cur.x * 4).toFixed(3)} ${CX} ${CY})`);
      eye.setAttribute('transform', `translate(${(cur.x * 2.2).toFixed(3)} ${(cur.y * 2).toFixed(3)})`);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(tick);
      },
      { threshold: 0 }
    );
    io.observe(svg);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !visible) return;
      const r = svg.getBoundingClientRect();
      const dx = e.clientX - (r.left + ((EX - 8) / VIEW) * r.width);
      const dy = e.clientY - (r.top + ((EY - 8) / VIEW) * r.height);
      const d = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, d / 500);
      target.x = (dx / d) * reach;
      target.y = (dy / d) * reach;
      lastPointer = performance.now();
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [still]);

  const line = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    pathLength: 100,
  };

  return (
    <svg ref={svgRef} viewBox="8 8 48 48" className={`overflow-visible ${className}`} aria-hidden="true" focusable="false">
      <g ref={turnRef}>
        <g ref={headRef}>
          <path d={TOP_CAP} className="mascot-draw mascot-cap-top" {...line} />
          <path d={OUTER_EDGE} className="mascot-draw mascot-edge" {...line} />
          <path d={INNER_EDGE} className="mascot-draw mascot-edge" {...line} />
          <path d={BOTTOM_CAP} className="mascot-draw mascot-cap-bottom" {...line} />
          <g ref={eyeRef}>
            {/* The cursor from the logo: solid gold, like the mark itself. */}
            <rect x="43" y="28" width="7" height="8" rx="1.5" fill="var(--logo-accent)" className="mascot-cursor" />
          </g>
        </g>
      </g>
    </svg>
  );
}
