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
    hidden: { y: 20, opacity: 0 }, // Reduced movement for calmer feel
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="c-hero">
      <div className="c-hero__container">
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* HEADLINE: Precise, Technical Authority */}
          <motion.h1 className="c-hero__title" variants={textItemVariants}>
            Engineering Africa&apos;s <span>Digital Infrastructure</span>
          </motion.h1>

          {/* SUBTITLE: Statement of Fact, not a sales pitch */}
          <motion.p className="c-hero__subtitle" variants={textItemVariants}>
            Scalable systems. Intelligent automation.
            <br className="hidden md:block" />
          </motion.p>

          <motion.div className="c-hero__cta-group" variants={textItemVariants}>
            <Link href="/contact" className="cta-button" aria-label="Book a technical consultation">
              Consultation
            </Link>
            <Link href="/services" className="cta-button-secondary" aria-label="View our engineering services">
              Our Capabilities
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;