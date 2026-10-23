"use client";

// The Coderon C as big hairline line-art behind a section. It draws itself in when it
// scrolls into view, and the cursor block works like an eye: it blinks now and then and
// leans toward the mouse pointer (on touch screens it looks around by itself). The C
// turns its "head" slightly with it. With animations off it is a still drawing.
import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Outline of the logo's C stroke (centre 32.43,32 · radius 16 · stroke 7 · round ends),
// in the same coordinates as the logo, so it matches the mark exactly.
const C_OUTLINE =
  'M47.145 19.206A19.5 19.5 0 1 0 47.145 44.794A3.5 3.5 0 0 0 41.86 40.2A12.5 12.5 0 1 1 41.86 23.8A3.5 3.5 0 0 0 47.145 19.206Z';
const VIEW = 48; // viewBox "8 8 48 48"
const CX = 32.43;
const CY = 32;
const EX = 46.5; // centre of the cursor ("eye")
const EY = 32;

type Props = {
  /** Sets the size (width) and the outline colour (text-*). */
  className?: string;
  /** Outline thickness in screen pixels, whatever the drawing's size. */
  hairline?: number;
};

export default function LogoMascot({ className = '', hairline = 1.25 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const eyeRef = useRef<SVGGElement>(null);
  const [stroke, setStroke] = useState(0.1);
  const [drawn, setDrawn] = useState(false);
  const glowId = `mascot-glow-${useId().replace(/:/g, '')}`;
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

  useEffect(() => {
    const svg = svgRef.current;
    const head = headRef.current;
    const eye = eyeRef.current;
    if (!svg || !head || !eye) return;

    if (still) {
      head.removeAttribute('transform');
      eye.removeAttribute('transform');
      setDrawn(true);
      return;
    }

    let visible = false;
    let raf = 0;
    const target = { x: 0, y: 0 }; // where the eye wants to look, -1..1
    const cur = { x: 0, y: 0 };
    let lastPointer = -Infinity;
    let wanderAt = 0;
    let nextBlink = performance.now() + 2200;
    let blinkStart = 0;

    const tick = (t: number) => {
      raf = 0;
      if (!visible) return;

      // No mouse for a while (or a touch screen): look around calmly.
      if (t - lastPointer > 4000 && t > wanderAt) {
        const a = Math.random() * Math.PI * 2;
        const m = 0.25 + Math.random() * 0.6;
        target.x = Math.cos(a) * m;
        target.y = Math.sin(a) * m * 0.7;
        wanderAt = t + 1800 + Math.random() * 2600;
      }
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;

      // Blink: squash the eye and open it again; sometimes a double blink.
      if (!blinkStart && t > nextBlink) blinkStart = t;
      let sy = 1;
      if (blinkStart) {
        const p = (t - blinkStart) / 240;
        sy = p < 0.5 ? 1 - p * 1.8 : p < 1 ? 0.1 + (p - 0.5) * 1.8 : 1;
        if (p >= 1) {
          blinkStart = 0;
          nextBlink = t + (Math.random() < 0.25 ? 220 : 2800 + Math.random() * 3800);
        }
      }

      head.setAttribute('transform', `rotate(${(cur.x * 5).toFixed(3)} ${CX} ${CY})`);
      eye.setAttribute(
        'transform',
        `translate(${(cur.x * 2.2).toFixed(3)} ${(cur.y * 2).toFixed(3)}) translate(${EX} ${EY}) scale(1 ${sy.toFixed(3)}) translate(${-EX} ${-EY})`
      );
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          setDrawn(true);
          start();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(svg);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !visible) return;
      const r = svg.getBoundingClientRect();
      const ex = r.left + ((EX - 8) / VIEW) * r.width;
      const ey = r.top + ((EY - 8) / VIEW) * r.height;
      const dx = e.clientX - ex;
      const dy = e.clientY - ey;
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

  // Draw-in: each shape is traced once (pathLength 1) when it first scrolls into view.
  const trace = (delay: number) =>
    still
      ? undefined
      : {
          strokeDasharray: 1,
          strokeDashoffset: drawn ? 0 : 1,
          transition: `stroke-dashoffset 2.4s cubic-bezier(.65,0,.35,1) ${delay}s`,
        };

  return (
    <svg ref={svgRef} viewBox="8 8 48 48" className={`overflow-visible ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0" stopColor="var(--logo-accent)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--logo-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g ref={headRef}>
        <path d={C_OUTLINE} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" pathLength={1} style={trace(0)} />
        <g ref={eyeRef}>
          <circle cx={EX} cy={EY} r={7} fill={`url(#${glowId})`} className="mascot-glow" />
          <rect
            x="43"
            y="28"
            width="7"
            height="8"
            rx="1.5"
            fill="var(--logo-accent)"
            fillOpacity={0.12}
            stroke="var(--logo-accent)"
            strokeWidth={stroke * 1.2}
            pathLength={1}
            style={trace(1.2)}
          />
        </g>
      </g>
    </svg>
  );
}
