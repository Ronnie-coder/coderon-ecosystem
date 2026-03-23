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
      aria-label="Coderon services — what we build for your business"
    >
      <div className="container">

        {/* Section Header */}
        <p className="c-services__eyebrow">What We Do</p>
        <h2 className="c-services__heading">
          Stop Running Your Business{' '}
          <span>on Workarounds</span>
        </h2>
        <p className="c-services__subheading">
          We build the software, automation, and AI tools that replace the
          spreadsheets, manual processes, and duct-tape systems holding your
          business back.
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
                aria-label={`Learn more about our ${service.title} service`}
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
                <div
                  className="c-service-card__learn-more"
                  aria-hidden="true"
                >
                  <span>See How It Works</span>
                  <FiArrowUpRight />
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