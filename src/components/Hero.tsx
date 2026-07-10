// src/components/Hero.tsx
"use client";

import Link from 'next/link';

// ✅ Hero has ZERO animation delay now
// ✅ CSS handles the fade-in — no JS needed for LCP element
// ✅ Framer Motion removed from above-the-fold entirely

const Hero = () => {
  return (
    <section
      className="c-hero"
      aria-label="Coderon — Technical Partner for Founders"
    >
      <div className="c-hero__container">
        <div className="c-hero__content">

          {/* ✅ Pure CSS animation — no JS delay */}
          <p className="c-hero__eyebrow c-hero__animate-1">
            CODERON FOR FOUNDERS
          </p>

          <h1 className="c-hero__title c-hero__animate-2">
            The Technical Partner For{' '}
            <span>Non-Technical Founders.</span>
          </h1>

          <p className="c-hero__subtitle c-hero__animate-3">
            You bring the business vision, we handle the software, AI, and automation. We translate your ideas into scalable systems so you can launch with absolute confidence.
          </p>

          <div className="c-hero__cta-group c-hero__animate-4">
            <Link
              href="/contact"
              className="cta-button"
              aria-label="Book a free consultation with Coderon"
            >
              Book a Free Consultation
            </Link>
            <Link
              href="/services"
              className="cta-button-secondary"
              aria-label="See the services and tools we build"
            >
              See What We Build
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;