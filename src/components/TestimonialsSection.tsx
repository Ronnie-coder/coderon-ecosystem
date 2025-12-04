"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, Variants } from 'framer-motion';
import { testimonials, Testimonial } from '@/data/testimonialsData';

// Simple SVG Arrow to avoid external icon dependencies
const ArrowIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }, // Premium Easing
    },
  };

  return (
    <section ref={ref} className="c-testimonials" id="testimonials">
      <div className="c-testimonials__header">
        <motion.h2 
          className="c-testimonials__heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Proof of Impact
        </motion.h2>
        <motion.p 
          className="c-testimonials__subheading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Real results from partners who trust the code.
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
            <div className="c-testimonial-card__logo-wrapper">
              <Image
                src={testimonial.logoUrl}
                alt={testimonial.logoAlt}
                width={testimonial.logoWidth}
                height={testimonial.logoHeight}
                className="c-testimonial-card__logo"
                style={{ width: 'auto', height: '100%' }} // Ensure aspect ratio
              />
            </div>
            
            <blockquote className="c-testimonial-card__quote">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <div className="c-testimonial-card__author-info">
              <div className="c-testimonial-card__author-details">
                <p className="c-testimonial-card__author-name">{testimonial.authorName}</p>
                <p className="c-testimonial-card__author-role">{testimonial.authorRole}</p>
              </div>
              
              <Link 
                href={testimonial.siteUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="c-testimonial-card__link"
                aria-label={`Visit ${testimonial.authorName} website`}
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