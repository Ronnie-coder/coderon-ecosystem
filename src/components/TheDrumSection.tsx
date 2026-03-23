// src/components/TheDrumSection.tsx
"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, Variants } from 'framer-motion';
import { FaBookOpen, FaRocket } from 'react-icons/fa';

const TheDrumSection = () => {
  const ref  = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const journalArticles = [
    {
      slug:  '/journal/why-we-chose-angular-for-palmsure',
      title: 'Why We Chose a "Boring" Framework for a Mission-Critical Project',
    },
    {
      slug:  '/journal/playbook-for-building-ai-agents',
      title: 'Our Playbook: 3 Core Principles for Building AI Agents That Work',
    },
  ];

  const productUpdates = [
    {
      href:       '/journal/why-we-built-quotepilot',
      title:      'Why We Built QuotePilot: The Origin Story',
      isExternal: false,
    },
    {
      href:       'https://quotepilot.coderon.co.za/',
      title:      'QuotePilot is live — professional invoicing for African freelancers',
      isExternal: true,
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="c-drum-section"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      aria-label="Latest insights and product updates"
    >
      {/* Section Header */}
      <div className="c-drum-section__header-group">
        <h2 className="c-drum-section__main-title">
          Latest Insights
        </h2>
        <p className="c-drum-section__subtitle">
          Technical deep dives, business lessons, and product updates
          from the Coderon team.
        </p>
      </div>

      <div className="c-drum-section__grid">

        {/* Card 1: Journal */}
        <motion.div
          className="c-drum-section__card"
          variants={itemVariants}
        >
          <div className="c-drum-section__card-header">
            <FaBookOpen
              className="c-drum-section__icon"
              aria-hidden="true"
            />
            <h3 className="c-drum-section__heading">The Journal</h3>
          </div>
          <p className="c-drum-section__text">
            Engineering philosophy and business lessons from
            the Coderon team.
          </p>
          <ul
            className="c-drum-section__article-list"
            aria-label="Recent journal articles"
          >
            {journalArticles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={article.slug}
                  aria-label={`Read: ${article.title}`}
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="c-drum-section__footer">
            <Link
              href="/journal"
              className="c-drum-section__link-arrow"
              aria-label="Read all journal articles"
            >
              Read the Journal &rarr;
            </Link>
          </div>
        </motion.div>

        {/* Card 2: QuotePilot */}
        <motion.div
          className="c-drum-section__card c-drum-section__card--product"
          variants={itemVariants}
        >
          <div className="c-drum-section__card-header">
            <FaRocket
              className="c-drum-section__icon"
              aria-hidden="true"
            />
            <h3 className="c-drum-section__heading">
              QuotePilot Updates
            </h3>
          </div>
          <p className="c-drum-section__text">
            News and updates from our invoicing platform — built
            for African freelancers and SMEs.
          </p>
          <ul
            className="c-drum-section__article-list"
            aria-label="QuotePilot news and updates"
          >
            {productUpdates.map((update, index) => (
              <li key={index}>
                {update.isExternal ? (
                  <a
                    href={update.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${update.title} — opens in new tab`}
                  >
                    {update.title}
                  </a>
                ) : (
                  <Link
                    href={update.href}
                    aria-label={`Read: ${update.title}`}
                  >
                    {update.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="c-drum-section__footer">
            <a
              href="https://quotepilot.coderon.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="c-drum-section__link-arrow"
              aria-label="Visit QuotePilot — opens in new tab"
            >
              Visit QuotePilot &rarr;
            </a>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default TheDrumSection;