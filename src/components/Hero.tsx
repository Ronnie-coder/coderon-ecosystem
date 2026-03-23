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
      aria-label="Coderon — Custom Software and Automation for Growing Businesses"
    >
      <div className="c-hero__container">
        <div className="c-hero__content">

          {/* ✅ Pure CSS animation — no JS delay */}
          <p className="c-hero__eyebrow c-hero__animate-1">
            Built for African businesses. Designed to scale.
          </p>

          <h1 className="c-hero__title c-hero__animate-2">
            We Build the Systems That{' '}
            <span>Run Your Business</span>
          </h1>

          <p className="c-hero__subtitle c-hero__animate-3">
            Custom software, automation tools, and AI integrations — so your
            team spends less time on manual work and more time on what
            actually grows the business.
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