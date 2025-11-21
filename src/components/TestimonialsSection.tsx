"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, Variants } from 'framer-motion';
import { testimonials, Testimonial } from '@/data/testimonialsData';

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
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section ref={ref} className="c-testimonials" id="testimonials">
      <div className="c-testimonials__header">
        <h2 className="c-testimonials__heading">Proof of Impact</h2>
        <p className="c-testimonials__subheading">
          Stories of Partnership and Growth
        </p>
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
              />
            </div>
            <blockquote className="c-testimonial-card__quote">
              {testimonial.quote}
            </blockquote>

            {/* REFINEMENT: Professional author attribution block */}
            <div className="c-testimonial-card__author-info">
              <p className="c-testimonial-card__author-name">{testimonial.authorName}</p>
              <p className="c-testimonial-card__author-role">{testimonial.authorRole}</p>
            </div>
            
            <Link href={testimonial.siteUrl} target="_blank" rel="noopener noreferrer" className="c-testimonial-card__link">
              Visit Site →
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;