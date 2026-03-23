// src/components/Hero.tsx
"use client";

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const textItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      className="c-hero"
      aria-label="Coderon — Custom Software and Automation for Growing Businesses"
    >
      <div className="c-hero__container">
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* EYEBROW: Context setter */}
          <motion.p className="c-hero__eyebrow" variants={textItemVariants}>
            Built for African businesses. Designed to scale.
          </motion.p>

          {/* HEADLINE: What you do + who you help */}
          <motion.h1 className="c-hero__title" variants={textItemVariants}>
            We Build the Systems That{' '}
            <span>Run Your Business</span>
          </motion.h1>

          {/* SUBTITLE: Outcomes, not features */}
          <motion.p
            className="c-hero__subtitle"
            variants={textItemVariants}
          >
            Custom software, automation tools, and AI integrations — so your
            team spends less time on manual work and more time on what
            actually grows the business.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="c-hero__cta-group"
            variants={textItemVariants}
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;