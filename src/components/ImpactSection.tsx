// src/components/ImpactSection.tsx
"use client";

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projectsData';
import { FaArrowRight } from 'react-icons/fa';

interface ImpactSectionProps {
  project: Project;
}

const ImpactSection = ({ project }: ImpactSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const featureVariants: Variants = {
    hidden:  { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  if (!project) return null;

  return (
    <section
      className="c-impact"
      id="impact"
      aria-label={`Featured project — ${project.client}`}
    >
      <motion.div
        ref={ref}
        className="c-impact-feature"
        variants={featureVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Project image */}
        <div className="c-impact-feature__image-wrapper">
          <Image
            src={project.imageUrl}
            alt={`Screenshot of the ${project.client} project`}
            width={1200}
            height={800}
            quality={90}
          />
        </div>

        {/* Project content */}
        <div className="c-impact-feature__content">
          <p className="c-impact-feature__eyebrow">
            Client Work
          </p>
          <p className="c-impact-feature__client">
            {project.client}
          </p>
          <h2 className="c-impact-feature__title">
            {project.title}
          </h2>
          <p className="c-impact-feature__description">
            {project.description}
          </p>
          <div className="c-impact-feature__actions">
            <Link
              href={project.liveUrl}
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View the live ${project.client} project — opens in new tab`}
            >
              View Live Project
              <FaArrowRight aria-hidden="true" />
            </Link>
            <Link
              href="/playroom"
              className="cta-button-secondary"
              aria-label="See all our work and case studies"
            >
              See All Our Work
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ImpactSection;