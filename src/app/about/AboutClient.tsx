// src/app/about/AboutClient.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Icons = {
  Quality: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Innovation: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Partnership: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
};

const fadeInUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function AboutClient() {
  return (
    <div className="about-page">
      <div className="c-page-container">

        {/* Page Header */}
        <header className="c-page-header">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Built in South Africa.
            <br />
            Built for Africa.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Coderon is a software company that builds custom systems,
            automation tools, and AI integrations for African businesses
            that are serious about growth.
          </motion.p>
        </header>

        <main>

          {/* Founder Section */}
          <section
            className="c-founder-section"
            aria-label="About the founder"
          >
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
              <blockquote cite="https://www.coderon.co.za/about">
                <p>
                  &ldquo;I believe African businesses deserve software
                  that actually fits how they work — not watered-down
                  versions of tools built for someone else&apos;s
                  market.&rdquo;
                </p>
                <footer>— Ronnie Nyamhute, Founder of Coderon</footer>
              </blockquote>
              <p className="founder-text">
                Coderon started from a simple observation: African
                businesses were being underserved by off-the-shelf
                software that didn&apos;t account for local payment
                systems, local languages, or local ways of working.
              </p>
              <p className="founder-text">
                So we started building. Custom software for insurance
                brokers. Redesigned web platforms for tour operators.
                An invoicing tool built specifically for African
                freelancers. Every project teaches us something new
                about what businesses here actually need — and we build
                that knowledge into everything we do.
              </p>
            </motion.div>
          </section>

          {/* Values Section */}
          <section
            className="c-values-section"
            aria-label="Coderon's guiding principles"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              How We Work
            </motion.h2>

            <motion.div
              className="c-values-section__grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* Card 1 */}
              <motion.div
                className="c-value-card"
                variants={fadeInUp}
              >
                <div className="c-value-card__icon">
                  <Icons.Quality />
                </div>
                <h3>We Don&apos;t Ship Shortcuts</h3>
                <p>
                  Every system we build is designed to last.
                  Clean code, proper architecture, and
                  documentation that means you&apos;re never
                  locked in or left in the dark.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                className="c-value-card"
                variants={fadeInUp}
              >
                <div className="c-value-card__icon">
                  <Icons.Innovation />
                </div>
                <h3>We Solve Real Problems</h3>
                <p>
                  We don&apos;t add AI or automation because
                  it&apos;s trendy. We add it when it removes
                  real friction from your team&apos;s day —
                  and we measure it by the time and money
                  you get back.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                className="c-value-card"
                variants={fadeInUp}
              >
                <div className="c-value-card__icon">
                  <Icons.Partnership />
                </div>
                <h3>We Work Like Partners</h3>
                <p>
                  You won&apos;t get handed off to a junior
                  dev after sign-up. We stay involved,
                  communicate plainly, and treat your
                  business goals as our own.
                </p>
              </motion.div>
            </motion.div>
          </section>

          {/* CTA — section, not aside */}
          <motion.section
            className="c-page-cta"
            aria-label="Start working with Coderon"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Ready to Build Something That Works?</h2>
            <p>
              Tell us what your business needs. We&apos;ll tell you
              what&apos;s possible and give you a straight plan —
              no jargon, no obligation.
            </p>
            <Link
              href="/contact"
              className="cta-button"
              aria-label="Book a free consultation with Coderon"
            >
              Book a Free Call
            </Link>
          </motion.section>

        </main>
      </div>
    </div>
  );
}