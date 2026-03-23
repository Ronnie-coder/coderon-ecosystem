// src/components/TestimonialsSection.tsx
"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, Variants } from 'framer-motion';
import { testimonials, Testimonial } from '@/data/testimonialsData';

const ArrowIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const gridVariants: Variants = {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden:  { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      ref={ref}
      className="c-testimonials"
      id="testimonials"
      aria-label="Client testimonials"
    >
      <div className="c-testimonials__header">
        <motion.p
          className="c-testimonials__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Client Results
        </motion.p>
        <motion.h2
          className="c-testimonials__heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          What Our Clients Say
        </motion.h2>
        <motion.p
          className="c-testimonials__subheading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Don&apos;t take our word for it.
        </motion.p>
      </div>

      <motion.div
        className="c-testimonials__grid"
        variants={gridVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {testimonials.map((testimonial: Testimonial) => (
          <motion.div
            key={testimonial.id}
            className="c-testimonial-card"
            variants={cardVariants}
          >
            {/* Client logo */}
            <div className="c-testimonial-card__logo-wrapper">
              <Image
                src={testimonial.logoUrl}
                alt={testimonial.logoAlt}
                width={testimonial.logoWidth}
                height={testimonial.logoHeight}
                className="c-testimonial-card__logo"
                style={{ width: 'auto', height: '100%' }}
              />
            </div>

            {/* Quote — cite added for semantics */}
            <blockquote
              className="c-testimonial-card__quote"
              cite={testimonial.siteUrl}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="c-testimonial-card__author-info">
              <div className="c-testimonial-card__author-details">
                <p className="c-testimonial-card__author-name">
                  {testimonial.authorName}
                </p>
                <p className="c-testimonial-card__author-role">
                  {testimonial.authorRole}
                </p>
              </div>

              <Link
                href={testimonial.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="c-testimonial-card__link"
                aria-label={`Visit ${testimonial.authorName}'s website — opens in new tab`}
              >
                <ArrowIcon />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;