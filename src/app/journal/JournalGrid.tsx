'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PostFrontmatter } from '@/lib/journal';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Cascading effect
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map(({ slug, title, date, description, readingTime }) => (
        <motion.div key={slug} variants={cardVariants}>
          <Link href={`/journal/${slug}/`} className="journal-card-link">
            <article className="journal-card">
              {/* Browser Header Visual Decoration */}
              <div className="card-browser-header">
                <div className="browser-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="card-content">
                <div className="card-meta">
                  <time dateTime={date as string}>
                    {new Date(date as string).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{readingTime} min read</span>
                </div>
                
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
                
                <div className="card-read-more">
                  Read File_
                </div>
              </div>
            </article>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}