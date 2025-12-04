'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Icons as inline SVGs
const Icons = {
  Quality: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  Innovation: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Partnership: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
  )
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function AboutClient() {
  return (
    <div className="about-page">
      <div className="c-page-container">
        
        {/* HERO */}
        <header className="c-page-header">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We are a South African software company building world-class digital tools to empower a new generation of African entrepreneurs.
          </motion.p>
        </header>

        <main>
          {/* FOUNDER SECTION */}
          <section className="c-founder-section">
            <motion.div 
              className="c-founder-image-wrapper"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image 
                src="/images/ronnie-nyamhute.jpg"
                alt="Ronnie Nyamhute, Founder of Coderon"
                width={500}
                height={600}
                quality={90}
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
            
            <motion.div 
              className="c-founder-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2>The Story Behind the Code</h2>
              <blockquote>
                <p>&ldquo;I believe the immense talent within Africa deserves a prominent place on the world&apos;s digital stage. Coderon was created to bridge that gap.&rdquo;</p>
                <footer>- Ronnie Nyamhute, Founder</footer>
              </blockquote>
              <p className="founder-text">
                This journey was fueled by a passion for technology and a deep-seated desire to see African businesses thrive. We saw a continent rich with innovation but often underserved by modern digital tools.
              </p>
              <p className="founder-text">
                Every project we undertake is a step towards that goal. We don&apos;t just build websites or software; we build digital foundations for African entrepreneurs to compete, succeed, and lead globally.
              </p>
            </motion.div>
          </section>

          {/* VALUES SECTION */}
          <section className="c-values-section">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Guiding Principles
            </motion.h2>

            <motion.div 
              className="c-values-section__grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Card 1 */}
              <motion.div className="c-value-card" variants={fadeInUp}>
                <div className="c-value-card__icon"><Icons.Quality /></div>
                <h3>Quality & Craftsmanship</h3>
                <p>We build with precision and pride, delivering solutions that are not only functional but also elegant and durable.</p>
              </motion.div>

              {/* Card 2 */}
              <motion.div className="c-value-card" variants={fadeInUp}>
                <div className="c-value-card__icon"><Icons.Innovation /></div>
                <h3>Purpose-Driven Innovation</h3>
                <p>Our work is guided by our mission. We innovate not for technology&apos;s sake, but to create real, tangible impact.</p>
              </motion.div>

              {/* Card 3 */}
              <motion.div className="c-value-card" variants={fadeInUp}>
                <div className="c-value-card__icon"><Icons.Partnership /></div>
                <h3>True Partnership</h3>
                <p>Your success is our success. We work as collaborative partners, invested in understanding and achieving your vision.</p>
              </motion.div>
            </motion.div>
          </section>

          {/* CTA */}
          <motion.aside 
            className="c-page-cta"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Partner With Us</h2>
            <p>Whether you&apos;re a startup with a bold idea or an established enterprise seeking digital transformation, let&apos;s build the future together.</p>
            <Link href="/contact" className="cta-button">
              Start the Conversation
            </Link>
          </motion.aside>
        </main>
      </div>
    </div>
  );
}