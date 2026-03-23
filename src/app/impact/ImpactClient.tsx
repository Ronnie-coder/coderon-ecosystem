// src/app/impact/ImpactClient.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/data/projectsData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 40, damping: 15 },
  },
};

export default function ImpactClient() {
  return (
    <div className="impact-page">
      <div className="c-page-container">

        {/* Page Header */}
        <header className="c-page-header">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Work We&apos;re Proud Of
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Real projects, real clients, real results. Here&apos;s
            what we&apos;ve built and the problems we&apos;ve solved.
          </motion.p>
        </header>

        <main>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project) => (
              <motion.article
                key={project.id}
                className="c-project-card"
                variants={cardVariants}
                aria-label={`${project.client} — ${project.title}`}
              >

                {/* Browser frame visual */}
                <div className="c-project-card__browser-frame">
                  <div className="c-project-browser-header">
                    <div
                      className="browser-dots"
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="c-project-card__image">
                    <Image
                      src={project.imageUrl}
                      alt={`Screenshot of the ${project.client} project — ${project.title}`}
                      width={1200}
                      height={800}
                      quality={90}
                      priority={project.id === '1'}
                    />
                  </div>
                </div>

                {/* Card body */}
                <div className="c-project-card__body">

                  {/* Main content */}
                  <div className="c-project-card__content">
                    <p className="c-project-card__client">
                      {project.client}
                    </p>
                    <h2 className="c-project-card__title">
                      {project.title}
                    </h2>
                    <p className="c-project-card__description">
                      {project.description}
                    </p>

                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-button"
                      aria-label={`View the live ${project.client} project — opens in new tab`}
                    >
                      View Live System →
                    </Link>
                  </div>

                  {/* Metadata — div, not aside (aside is for complementary to the page, not to a card) */}
                  <div
                    className="c-project-card__details"
                    aria-label={`Project details for ${project.client}`}
                  >
                    <div className="c-project-card__meta-item">
                      <h3 className="c-project-card__meta-heading">
                        Year
                      </h3>
                      <p className="c-project-card__meta-content">
                        {project.year}
                      </p>
                    </div>

                    <div className="c-project-card__meta-item">
                      <h3 className="c-project-card__meta-heading">
                        Role
                      </h3>
                      {project.roles.map((role) => (
                        <p
                          key={role}
                          className="c-project-card__meta-content"
                        >
                          {role}
                        </p>
                      ))}
                    </div>

                    <div className="c-project-card__meta-item">
                      <h3 className="c-project-card__meta-heading">
                        Services
                      </h3>
                      {project.servicesDelivered.map((service) => (
                        <p
                          key={service}
                          className="c-project-card__meta-content"
                        >
                          {service}
                        </p>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.article>
            ))}
          </motion.div>
        </main>

      </div>
    </div>
  );
}