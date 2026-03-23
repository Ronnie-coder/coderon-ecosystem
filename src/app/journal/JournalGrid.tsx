// src/app/journal/JournalGrid.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PostFrontmatter } from '@/lib/journal';

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20 },
  },
};

interface JournalGridProps {
  posts: PostFrontmatter[];
}

export default function JournalGrid({ posts }: JournalGridProps) {
  return (
    <motion.div
      className="journal-grid"
      role="list"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map(({ slug, title, date, description, readingTime }) => {
        const formattedDate = new Date(date as string).toLocaleDateString(
          'en-ZA',
          { year: 'numeric', month: 'short', day: 'numeric' }
        );

        return (
          <motion.div
            key={slug}
            variants={cardVariants}
            role="listitem"
          >
            <Link
              href={`/journal/${slug}/`}
              className="journal-card-link"
              aria-label={`Read: ${title} — ${readingTime} min read`}
            >
              <article className="journal-card">

                {/* Decorative browser chrome — hidden from screen readers */}
                <div
                  className="card-browser-header"
                  aria-hidden="true"
                >
                  <div className="browser-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="card-content">
                  {/* Meta — separator is decorative */}
                  <div className="card-meta">
                    <time dateTime={date as string}>
                      {formattedDate}
                    </time>
                    <span aria-hidden="true">&bull;</span>
                    <span>{readingTime} min read</span>
                  </div>

                  <h2 className="card-title">{title}</h2>
                  <p className="card-description">{description}</p>

                  <div className="card-read-more">
                    Read Article →
                  </div>
                </div>

              </article>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}