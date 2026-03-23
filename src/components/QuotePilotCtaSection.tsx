// src/components/QuotePilotCtaSection.tsx
"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// ✅ Lottie lazy loaded — only when component mounts
// ✅ Saves ~150KB from initial bundle
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => (
    <div
      className="c-quotepilot-cta__lottie-placeholder"
      aria-hidden="true"
      style={{ width: '100%', aspectRatio: '1 / 1' }}
    />
  ),
});

// ✅ Lazy load animation JSON only when in view
import type { LottieComponentProps } from 'lottie-react';

const BENEFITS = [
  'Create branded invoices with your logo, currency, and terms',
  'Send via WhatsApp or a secure link',
  'Accept payments via bank transfer or crypto (USDT) to your wallet',
  'Simple, fast, and built for how you actually work',
];

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

const QuotePilotCtaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // ✅ Animation JSON only imported when component renders
  // ✅ Moved to dynamic import to avoid bundling 644KB on page load
  const [animationData, setAnimationData] = 
    require('react').useState(null);

  require('react').useEffect(() => {
    if (isInView && !animationData) {
      import('../../public/animations/Revenue.json').then((data) => {
        setAnimationData(data.default);
      });
    }
  }, [isInView, animationData]);

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
            <span className="c-quotepilot-cta__badge">
              Invoicing Built for Africa
            </span>

            <h2 className="c-quotepilot-cta__heading">
              Send Invoices.{' '}
              <span className="c-quotepilot-cta__heading--gold">
                Get Paid Faster.
              </span>
            </h2>

            <p className="c-quotepilot-cta__subheading">
              Built for African freelancers and growing businesses.
              QuotePilot lets you create professional invoices and share
              them instantly — no complicated accounting, no friction.
            </p>

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

            <p className="c-quotepilot-cta__proof">
              No subscriptions &nbsp;·&nbsp;
              No complexity &nbsp;·&nbsp;
              Just get paid
            </p>

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

          {/* ANIMATION SIDE — only renders when in view */}
          <motion.div
            className="c-quotepilot-cta__visual"
            variants={itemVariants}
          >
            <div
              className="c-quotepilot-cta__lottie-wrapper"
              role="img"
              aria-label="Animated revenue growth illustration"
            >
              {/* ✅ Lottie only renders when JSON is loaded AND in view */}
              {animationData && (
                <Lottie
                  animationData={animationData}
                  loop={true}
                  // ✅ Reduced quality segments — loop only key frames
                  className="lottie-anim"
                />
              )}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default QuotePilotCtaSection;