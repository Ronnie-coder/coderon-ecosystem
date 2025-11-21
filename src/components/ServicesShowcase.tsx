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
  const gridVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const cardVariants: Variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

  return (
    <section ref={ref} className="c-services" id="services">
      <div className="container">
        <h3 className="c-services__heading">Our Expertise</h3>
        <h2 className="c-services__subheading">Innovative Solutions to Power Africa&apos;s Growth</h2>
        <motion.div className="c-services__grid" variants={gridVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {services.map((service: Service) => (
            // --- THE FIX ---
            // The <Link> component now directly wraps the motion component.
            // `legacyBehavior` and the inner `<a>` tag have been removed.
            <motion.div key={service.id} variants={cardVariants}>
              <Link href={`/services/${service.slug}`} className="c-service-card">
                <div className="c-service-card__icon">{service.icon}</div>
                <h4 className="c-service-card__title">{service.title}</h4>
                <p className="c-service-card__description">{service.description}</p>
                <div className="c-service-card__learn-more">
                  <span>Learn More</span>
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