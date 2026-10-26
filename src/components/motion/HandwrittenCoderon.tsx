"use client";

// "coderon" written in one continuous pen stroke, like the "hello" on a new iPhone.
// It writes itself once when it scrolls into view. Plain SVG + CSS (see .handwriting in
// globals.css): no animation library. With animations off it is simply shown.
import { useEffect, useId, useRef, useState } from 'react';

// Hand-drawn cursive centreline: c, o, d (bowl, then up and back down the stem), e, r, o, n.
const PATH = [
  'M40 56C34 46 20 44 12 54C3 66 4 90 17 98C28 104 42 99 50 86',
  'C54 68 64 48 82 46',
  'C70 43 59 53 58 70C57 89 66 100 78 98C91 96 97 79 94 61C92 51 87 46 81 47',
  'C94 52 112 48 141 48',
  'C126 44 112 50 110 69C108 89 118 100 130 98C142 96 148 80 148 62',
  'C149 40 150 18 152 2',
  'C152 30 150 70 152 92C153 99 160 101 168 94',
  'C180 84 194 70 191 58C189 49 178 49 174 60C168 76 172 96 186 99C196 101 204 96 210 90',
  'C215 78 219 60 223 48C227 54 233 56 240 50C238 66 237 84 240 98C246 100 252 90 258 72',
  'C262 58 270 48 290 47',
  'C278 43 266 53 265 70C264 89 273 100 285 98C298 96 304 78 301 61C299 51 294 46 288 47',
  'C298 52 308 52 318 47',
  'C317 64 317 82 318 98',
  'C318 70 328 46 342 46C356 46 360 60 358 76C357 90 360 98 370 98C380 98 390 88 396 80',
].join('');

export default function HandwrittenCoderon({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [written, setWritten] = useState(false);
  const gradient = `hw-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWritten(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="-6 -6 424 116"
      className={`handwriting overflow-visible ${written ? 'is-written' : ''} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradient} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--hw-1)" />
          <stop offset="0.55" stopColor="var(--hw-2)" />
          <stop offset="1" stopColor="var(--hw-1)" />
        </linearGradient>
      </defs>
      {/* Slanted like handwriting. */}
      <g transform="skewX(-10) translate(18 0)">
        <path
          d={PATH}
          pathLength={1000}
          fill="none"
          stroke={`url(#${gradient})`}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
