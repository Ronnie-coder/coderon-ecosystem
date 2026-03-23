// src/app/playroom/PlayroomClient.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight, FaFlask, FaLaptopCode } from 'react-icons/fa';
import { liveProjects, interactiveDemos } from '@/data/playroomData';

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20 },
  },
};

const PlayroomClient = () => {
  return (
    <div className="c-page-container">

      {/* Hero */}
      <section className="c-playroom-hero" aria-label="Coderon work and projects">
        <motion.h1
          className="c-playroom-hero__title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          The Showroom.
        </motion.h1>
        <motion.p
          className="c-playroom-hero__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Real products, real clients, real results. From enterprise
          web platforms to AI tools — here&apos;s what we&apos;ve
          built and shipped.
        </motion.p>
      </section>

      {/* Section 1: Live Projects */}
      <motion.section
        className="c-playroom-section"
        aria-label="Featured live projects"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="c-playroom-section__header">
          <FaLaptopCode
            className="c-playroom-section__icon"
            aria-hidden="true"
          />
          <div>
            <h2>Featured Projects</h2>
            <p>Live systems we&apos;ve designed, built, and deployed.</p>
          </div>
        </div>

        <motion.div className="c-playroom__grid">
          {liveProjects.map((project, index) => {
            const isInternal = !!project.caseStudyUrl;
            const href = project.caseStudyUrl || project.liveUrl;

            return (
              <motion.div key={project.id} variants={itemVariants}>
                <Link
                  href={href}
                  className="c-playroom-card c-playroom-card--project"
                  target={isInternal ? '_self' : '_blank'}
                  rel={isInternal ? undefined : 'noopener noreferrer'}
                  aria-label={`${project.title} — ${isInternal ? 'Read case study' : 'Visit live site'}`}
                >
                  <div className="c-playroom-card__image-wrapper">
                    <Image
                      src={project.imageUrl || '/images/placeholder.png'}
                      alt={`Screenshot of ${project.title}`}
                      width={800}
                      height={500}
                      className="c-playroom-card__img"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </div>

                  <div className="c-playroom-card__content">
                    <span className="c-playroom-card__category">
                      {project.category}
                    </span>
                    <h3 className="c-playroom-card__title">
                      {project.title}
                    </h3>
                    <p className="c-playroom-card__description">
                      {project.description}
                    </p>
                    <div className="c-playroom-card__tech-stack">
                      {project.tech.slice(0, 3).map((tech: string) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="c-playroom-card__footer">
                    <div className="c-playroom-card__link">
                      {isInternal ? 'Read Case Study' : 'Visit Live Site'}
                      <FaArrowRight aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Section 2: The Lab */}
      <motion.section
        className="c-playroom-section c-playroom-section--lab"
        aria-label="Interactive demos and experimental tools"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="c-playroom-section__header">
          <FaFlask
            className="c-playroom-section__icon"
            aria-hidden="true"
          />
          <div>
            <h2>The Lab</h2>
            <p>
              Experimental demos, AI tools, and proof-of-concepts.
              Interactive — try them yourself.
            </p>
          </div>
        </div>

        <div className="c-playroom__grid c-playroom__grid--compact">
          {interactiveDemos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={demo.href}
                className="c-playroom-card c-playroom-card--demo"
                aria-label={`Launch demo: ${demo.title}`}
              >
                <div className="c-playroom-card__content">
                  <span className="c-playroom-card__category">
                    {demo.category}
                  </span>
                  <h3 className="c-playroom-card__title">
                    {demo.title}
                  </h3>
                  <p className="c-playroom-card__description">
                    {demo.description}
                  </p>
                </div>
                <div className="c-playroom-card__footer">
                  <div className="c-playroom-card__link">
                    Launch Demo
                    <FaArrowRight aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
};

export default PlayroomClient;