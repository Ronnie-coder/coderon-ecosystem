// src/components/ImpactSection.tsx
"use client";

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projectsData';

interface ImpactSectionProps {
  project: Project;
}

const ImpactSection = ({ project }: ImpactSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const featureVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  if (!project) {
    return null; 
  }

  return (
    <section className="c-impact" id="impact">
      <motion.div
        ref={ref}
        className="c-impact-feature"
        variants={featureVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="c-impact-feature__image-wrapper">
          <Image
            src={project.imageUrl}
            alt={`Showcase of the ${project.client} project`}
            width={1200}
            height={800}
            quality={90}
          />
        </div>
        <div className="c-impact-feature__content">
          <h3>Featured Project: {project.client}</h3>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          {/* --- WORKAROUND REMOVED: Reverted to the correct, simple markup --- */}
          <Link href={project.liveUrl} className="cta-button" target="_blank" rel="noopener noreferrer">
            View Live Site
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ImpactSection;