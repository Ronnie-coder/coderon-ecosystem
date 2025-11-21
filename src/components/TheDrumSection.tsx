// src/components/TheDrumSection.tsx (REPLACE ENTIRE FILE)
"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, Variants } from 'framer-motion';
import { FaWhatsapp, FaBullhorn } from 'react-icons/fa';

const WHATSAPP_LINK_URL = 'https://wa.me/27678184898';

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

  // --- CONTENT SYNCHRONIZATION: Updated with the latest three journal entries ---
  const articles = [
    {
      slug: '/journal/why-we-chose-angular-for-palmsure',
      title: 'Why We Chose a "Boring" Framework for a Mission-Critical Project'
    },
    {
      slug: '/journal/framework-agnostic-philosophy',
      title: 'Beyond the Hype Cycle: Our Philosophy on Being Framework Agnostic'
    },
    {
      slug: '/journal/playbook-for-building-ai-agents',
      title: 'Our Playbook: 3 Core Principles for Building AI Agents That Work'
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
      <div className="c-drum-section__grid">
        {/* --- CARD 1: THE MISSION --- */}
        <motion.div className="c-drum-section__card c-drum-section__card--mission" variants={itemVariants}>
          <div className="c-drum-section__header">
            <FaBullhorn className="c-drum-section__icon" />
            <h3 className="c-drum-section__heading">Our Mission</h3>
          </div>
          <p className="c-drum-section__quote">
            "We are here to put Africa on the map by helping each other rise."
          </p>
          <div className="c-drum-section__footer">
            <a
              href={WHATSAPP_LINK_URL}
              className="c-drum-section__button"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ask a question on WhatsApp"
            >
              <FaWhatsapp />
              <span>Ask a Direct Question</span>
            </a>
          </div>
        </motion.div>

        {/* --- CARD 2: THE JOURNAL --- */}
        <motion.div className="c-drum-section__card c-drum-section__card--journal" variants={itemVariants}>
          <div className="c-drum-section__header">
             <h3 className="c-drum-section__heading">From the Drum</h3>
          </div>
          <p className="c-drum-section__text">
            Tips, tutorials, and insights from my journey building a tech company in Africa.
          </p>
          <ul className="c-drum-section__article-list">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link href={article.slug}>{article.title}</Link>
              </li>
            ))}
          </ul>
          <div className="c-drum-section__footer">
            <Link href="/journal" className="c-drum-section__button--secondary">
              Explore All Articles
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TheDrumSection;