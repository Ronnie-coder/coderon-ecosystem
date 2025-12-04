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
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

export default function ServicesClient() {
  return (
    <div className="c-page-container">
      <header className="c-page-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Driving Africa&apos;s digital future with a suite of robust, modern technology solutions.
        </motion.p>
      </header>

      <motion.main 
        className="c-services-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => {
          // Dynamic Icon rendering
          const IconComponent = service.benefits[0].icon;

          return (
            <motion.article 
              key={service.id} 
              className="c-service-card"
              variants={itemVariants}
            >
              <div className="c-service-card__header">
                <div className="c-service-card__icon-wrapper">
                  {IconComponent && <IconComponent />}
                </div>
                <h2 className="c-service-card__title">{service.title}</h2>
              </div>
              
              <p className="c-service-card__description">{service.description}</p>
              
              <ul className="c-service-card__benefits-preview">
                {service.benefits.slice(0, 2).map((benefit, index) => (
                  <li key={index}>• {benefit.text}</li>
                ))}
              </ul>

              <div className="c-service-card__footer">
                <Link href={`/services/${service.slug}`} className="c-service-card__link">
                  Explore Solution <FaArrowRight className="c-service-card__arrow" />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </motion.main>

      <motion.aside 
        className="c-page-cta"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>Ready to Start Your Project?</h2>
        <p>Let&apos;s discuss how our expertise can align with your vision.</p>
        <Link href="/contact" className="btn-primary">
          Get in Touch
        </Link>
      </motion.aside>
    </div>
  );
}