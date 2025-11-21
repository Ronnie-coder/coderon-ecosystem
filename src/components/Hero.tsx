// CORRECTED: src/components/Hero.tsx
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
    hidden: { y: 30, opacity: 0, skewY: 3 },
    visible: {
      y: 0,
      opacity: 1,
      skewY: 0,
      transition: { duration: 0.8, ease: "easeOut" },
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
          <motion.h1 className="c-hero__title" variants={textItemVariants}>
            Building Africa&apos;s Future with <span>Code & Purpose</span>
          </motion.h1>

          <motion.p className="c-hero__subtitle" variants={textItemVariants}>
            We design and build world-class web applications and AI systems that empower African businesses to thrive on the global stage.
          </motion.p>

          <motion.div className="c-hero__cta-group" variants={textItemVariants}>
            <Link href="/services" className="cta-button">
              Explore Our Services
            </Link>
            <Link href="/playroom" className="cta-button-secondary">
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;