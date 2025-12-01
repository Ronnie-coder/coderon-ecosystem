// src/components/QuotePilotCtaSection.tsx
"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const QuotePilotCtaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="c-quotepilot-cta">
      <motion.div
        ref={ref}
        className="c-page-container c-quotepilot-cta__container"
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <h2 className="c-quotepilot-cta__heading">From Chaos to Cashflow.</h2>
        <p className="c-quotepilot-cta__subheading">
          Stop wasting hours on paperwork. QuotePilot automates your quoting and invoicing, 
          making you look professional and helping you get paid faster.
        </p>
        {/* --- WORKAROUND REMOVED: Reverted to the correct, simple markup --- */}
        <Link href="https://quotepilot.coderon.co.za/" className="cta-button" target="_blank" rel="noopener noreferrer">
           Streamline Your Business Now
        </Link>
      </motion.div>
    </section>
  );
};

export default QuotePilotCtaSection;