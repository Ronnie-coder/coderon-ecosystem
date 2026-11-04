"use client";

import { useEffect, useRef } from "react";

/**
 * A little H A Motors delivery scooter that rides along the bottom edge of the header.
 * It rides in from behind the logo on load, then its position follows how far down the page you are
 * (a reading-progress indicator). Wheels spin only while you scroll.
 *
 * Purely decorative: aria-hidden, no focusable parts. With prefers-reduced-motion it stays put as a
 * plain progress marker (no ride-in, no spinning wheels, no easing).
 */
export function ScrollRider() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    let stopTimer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const x = p * Math.max(0, track.clientWidth - 40);
      track.style.setProperty("--ride-x", `${x.toFixed(1)}px`);
    };
    const onScroll = () => {
      track.classList.add("is-moving");
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => track.classList.remove("is-moving"), 180);
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    // Ride-in on first paint.
    requestAnimationFrame(() => track.classList.add("is-ready"));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(stopTimer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={trackRef} className="rider-track" aria-hidden="true">
      <div className="rider-road" />
      <div className="rider-trail" />
      <div className="rider">
        <svg viewBox="0 0 64 40" className="rider-svg" focusable="false">
          {/* speed lines */}
          <g className="rider-speed" stroke="#1E8E3E" strokeWidth="2.5" strokeLinecap="round">
            <path d="M-14 18h9" />
            <path d="M-18 25h11" stroke="#F5C400" />
            <path d="M-12 32h7" />
          </g>
          {/* delivery box */}
          <rect x="3" y="3" width="15" height="11" rx="2" fill="#1E8E3E" stroke="#16181B" strokeWidth="2" />
          <path d="M6 8.5h9" stroke="#F5C400" strokeWidth="2" strokeLinecap="round" />
          {/* body */}
          <path d="M4 27c0-7 5-11 12-11h14c2 0 3 1 3 3v6H4Z" fill="#F5C400" stroke="#16181B" strokeWidth="2.2" strokeLinejoin="round" />
          {/* seat */}
          <path d="M11 16c0-2.5 2-4 4.5-4H28c1.8 0 2.6 1.4 1.8 3L29 16Z" fill="#16181B" />
          {/* floorboard */}
          <path d="M31 24h12v3H31Z" fill="#16181B" />
          {/* leg shield + steering */}
          <path d="M41 27 47 10h4l-5 17Z" fill="#F5C400" stroke="#16181B" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M49 10l1.5-5M46 5h9" stroke="#16181B" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="52" cy="13" r="1.8" fill="#FFF7CC" stroke="#16181B" strokeWidth="1.2" />
          {/* wheels */}
          <g className="rider-wheel">
            <circle cx="13" cy="31" r="7" fill="#fff" stroke="#16181B" strokeWidth="3.4" />
            <path d="M13 26v10M8 31h10" stroke="#16181B" strokeWidth="1.6" />
          </g>
          <g className="rider-wheel">
            <circle cx="49" cy="31" r="7" fill="#fff" stroke="#16181B" strokeWidth="3.4" />
            <path d="M49 26v10M44 31h10" stroke="#16181B" strokeWidth="1.6" />
          </g>
        </svg>
      </div>
    </div>
  );
}
