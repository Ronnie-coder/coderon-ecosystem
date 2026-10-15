// src/app/services/ServicesClient.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { services } from '@/data/servicesData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20 },
  },
};

export default function ServicesClient() {
  return (
    <div className="c-page-container">

      {/* Page Header */}
      <header className="c-page-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Websites and Software, Explained Simply
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We fix and build websites that load fast, work on every phone
          and are set up properly for Google. When a website is not
          enough, we build custom software that saves your team time.
        </motion.p>
      </header>

      {/* Services Grid */}
      <motion.div
        className="c-services-grid"
        aria-label="List of Coderon services"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => {
          const IconComponent =
            service.benefits?.[0]?.icon ?? null;

          return (
            <motion.article
              key={service.id}
              className="c-service-card"
              variants={itemVariants}
            >
              <div className="c-service-card__header">
                <div
                  className="c-service-card__icon-wrapper"
                  aria-hidden="true"
                >
                  {IconComponent && <IconComponent />}
                </div>
                <h2 className="c-service-card__title">
                  {service.title}
                </h2>
              </div>

              <p className="c-service-card__description">
                {service.description}
              </p>

              <ul
                className="c-service-card__benefits-preview"
                aria-label={`Key benefits of ${service.title}`}
              >
                {service.benefits.slice(0, 2).map((benefit, index) => (
                  <li key={index}>{benefit.text}</li>
                ))}
              </ul>

              <div className="c-service-card__footer">
                <Link
                  href={`/services/${service.slug}`}
                  className="c-service-card__link"
                >
                  {service.title}: see details
                  <FaArrowRight
                    className="c-service-card__arrow"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.section
        className="c-page-cta"
        aria-label="Start a project with Coderon"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>Not sure which one you need?</h2>

        <p>
          Send us your website address. We&apos;ll check it for free and
          tell you honestly what it needs, even if the answer is
          &quot;nothing&quot;.
        </p>

        <div className="c-page-cta__actions">
          <Link href="/contact/?topic=website" className="cta-button">
            Get a free website check
          </Link>
          <Link href="/pricing/" className="cta-button-secondary">
            See prices
          </Link>
        </div>
      </motion.section>

    </div>
  );
}