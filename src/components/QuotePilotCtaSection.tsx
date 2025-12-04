"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import Lottie from 'lottie-react';
// IMPORT THE ANIMATION
import revenueAnimation from '../../public/animations/Revenue.json';

const QuotePilotCtaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="c-quotepilot-cta">
      <div className="c-page-container">
        <motion.div
          ref={ref}
          className="c-quotepilot-cta__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* TEXT SIDE (LEFT) */}
          <motion.div className="c-quotepilot-cta__content" variants={itemVariants}>
            <span className="c-quotepilot-cta__badge">Automate Your Success</span>
            <h2 className="c-quotepilot-cta__heading">From Chaos to <span className="text-gold">Cashflow.</span></h2>
            <p className="c-quotepilot-cta__subheading">
              Stop wasting hours on paperwork. QuotePilot automates your quoting and invoicing, 
              making you look professional and helping you get paid faster.
            </p>
            
            <Link 
              href="https://quotepilot.coderon.co.za/" 
              className="cta-button" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Streamline Your Business Now <FaArrowRight />
            </Link>
          </motion.div>

          {/* ANIMATION SIDE (RIGHT) */}
          <motion.div className="c-quotepilot-cta__visual" variants={itemVariants}>
            <div className="c-quotepilot-cta__lottie-wrapper">
              <Lottie 
                animationData={revenueAnimation} 
                loop={true} 
                className="lottie-anim"
              />
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default QuotePilotCtaSection;