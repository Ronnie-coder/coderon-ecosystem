"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, Variants } from 'framer-motion';
import { FaBookOpen, FaRocket } from 'react-icons/fa';

const TheDrumSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Coderon Articles (Tech & Business)
  const journalArticles = [
    {
      slug: '/journal/why-we-chose-angular-for-palmsure',
      title: 'Why We Chose a "Boring" Framework for a Mission-Critical Project'
    },
    {
      slug: '/journal/playbook-for-building-ai-agents',
      title: 'Our Playbook: 3 Core Principles for Building AI Agents That Work'
    },
  ];

  // QuotePilot Updates (Product & SaaS)
  const productUpdates = [
    {
      // UPDATED: Now points to the internal "Origin Story" MDX article
      href: '/journal/why-we-built-quotepilot', 
      title: 'From Chaos to Cashflow: Why We Built QuotePilot (The Origin Story)',
      isExternal: false // Set to false to use Next.js Link
    },
    {
      // Remains external until we build the specific feature page
      href: 'https://quotepilot.coderon.co.za/', 
      title: 'New Feature: Send Professional PDF Invoices Directly from Your Phone',
      isExternal: true
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="c-drum-section"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="c-drum-section__header-group">
        <h2 className="c-drum-section__main-title">Latest Insights</h2>
        <p className="c-drum-section__subtitle">Technical deep dives, business lessons, and product updates.</p>
      </div>

      <div className="c-drum-section__grid">
        
        {/* CARD 1: CODERON JOURNAL */}
        <motion.div className="c-drum-section__card" variants={itemVariants}>
          <div className="c-drum-section__card-header">
            <FaBookOpen className="c-drum-section__icon" />
            <h3 className="c-drum-section__heading">The Journal</h3>
          </div>
          <p className="c-drum-section__text">
            Engineering philosophies and business strategies from the Coderon team.
          </p>
          <ul className="c-drum-section__article-list">
            {journalArticles.map((article) => (
              <li key={article.slug}>
                <Link href={article.slug}>{article.title}</Link>
              </li>
            ))}
          </ul>
          <div className="c-drum-section__footer">
            <Link href="/journal" className="c-drum-section__link-arrow">
              Read the Journal &rarr;
            </Link>
          </div>
        </motion.div>

        {/* CARD 2: QUOTEPILOT UPDATES */}
        <motion.div className="c-drum-section__card c-drum-section__card--product" variants={itemVariants}>
          <div className="c-drum-section__card-header">
            <FaRocket className="c-drum-section__icon" />
            <h3 className="c-drum-section__heading">QuotePilot News</h3>
          </div>
          <p className="c-drum-section__text">
            Latest features, tips, and changelogs for our flagship invoicing platform.
          </p>
          <ul className="c-drum-section__article-list">
            {productUpdates.map((update, index) => (
              <li key={index}>
                {update.isExternal ? (
                  /* External Link (New Tab) */
                  <a 
                    href={update.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {update.title}
                  </a>
                ) : (
                  /* Internal Link (SPA Navigation) */
                  <Link href={update.href}>
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
                className="c-drum-section__link-arrow"
            >
              View Product Blog &rarr;
            </a>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default TheDrumSection;