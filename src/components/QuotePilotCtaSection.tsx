// src/components/QuotePilotCtaSection.tsx
"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import Lottie from 'lottie-react';
import revenueAnimation from '../../public/animations/Revenue.json';

// Official QuotePilot copy — confirmed from product site
const BENEFITS = [
  'Create branded invoices with your logo, currency, and terms',
  'Send via WhatsApp or a secure link',
  'Accept payments via bank transfer or crypto (USDT) to your wallet',
  'Simple, fast, and built for how you actually work',
];

const QuotePilotCtaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      className="c-quotepilot-cta"
      aria-label="QuotePilot — professional invoicing for African freelancers and growing businesses"
    >
      <div className="c-page-container">
        <motion.div
          ref={ref}
          className="c-quotepilot-cta__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >

          {/* TEXT SIDE */}
          <motion.div
            className="c-quotepilot-cta__content"
            variants={itemVariants}
          >
            {/* Badge */}
            <span className="c-quotepilot-cta__badge">
              Invoicing Built for Africa
            </span>

            {/* Heading — their own hero copy, it's strong */}
            <h2 className="c-quotepilot-cta__heading">
              Send Invoices.{' '}
              <span className="c-quotepilot-cta__heading--gold">
                Get Paid Faster.
              </span>
            </h2>

            {/* Subheading — their own copy, word for word */}
            <p className="c-quotepilot-cta__subheading">
              Built for African freelancers and growing businesses.
              QuotePilot lets you create professional invoices and share
              them instantly — no complicated accounting, no friction.
            </p>

            {/* Benefits — their own official copy */}
            <ul
              className="c-quotepilot-cta__benefits"
              aria-label="QuotePilot features"
            >
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="c-quotepilot-cta__benefit-item"
                >
                  <FaCheck
                    className="c-quotepilot-cta__benefit-icon"
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Closing line — their own */}
            <p className="c-quotepilot-cta__proof">
              No subscriptions &nbsp;·&nbsp;
              No complexity &nbsp;·&nbsp;
              Just get paid
            </p>

            {/* CTA — their own CTA text */}
            <Link
              href="https://quotepilot.coderon.co.za/"
              className="cta-button c-quotepilot-cta__cta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Start sending invoices with QuotePilot — opens in a new tab"
            >
              Start Sending Invoices
              <FaArrowRight aria-hidden="true" />
            </Link>
          </motion.div>

          {/* ANIMATION SIDE */}
          <motion.div
            className="c-quotepilot-cta__visual"
            variants={itemVariants}
          >
            <div
              className="c-quotepilot-cta__lottie-wrapper"
              role="img"
              aria-label="Animated revenue growth illustration"
            >
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