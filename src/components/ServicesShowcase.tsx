// src/components/ServicesShowcase.tsx
"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, Variants } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { services, Service } from '@/data/servicesData';

const ServicesShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={ref}
      className="c-services"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="container">

        {/* Section Header */}
        <p className="c-services__eyebrow">What we do</p>
        <h2 id="services-heading" className="c-services__heading">
          Four ways we can <span>help</span>
        </h2>
        <p className="c-services__subheading">
          Fix the website you have, get a new one, let us look after it every
          month, or build custom software for the work your team does by hand.
        </p>

        {/* Services Grid */}
        <motion.div
          className="c-services__grid"
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service: Service) => (
            <motion.div key={service.id} variants={cardVariants}>
              <Link
                href={`/services/${service.slug}`}
                className="c-service-card"
              >
                {/* Icon */}
                <div
                  className="c-service-card__icon"
                  aria-hidden="true"
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="c-service-card__title">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="c-service-card__description">
                  {service.description}
                </p>

                {/* Card CTA */}
                <div className="c-service-card__learn-more">
                  <span>See details</span>
                  <FiArrowUpRight aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;