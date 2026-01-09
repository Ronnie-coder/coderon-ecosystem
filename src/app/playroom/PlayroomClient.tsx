"use client"; // Retains animations

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight, FaFlask, FaLaptopCode } from 'react-icons/fa';
import { liveProjects, interactiveDemos } from '@/data/playroomData';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 50, damping: 20 } 
  }
};

const PlayroomClient = () => {
  return (
    <div className="c-page-container">
      
      {/* HERO SECTION */}
      <section className="c-playroom-hero">
        <motion.h1 
          className="c-playroom-hero__title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          The Showroom.
        </motion.h1>
        <motion.p 
          className="c-playroom-hero__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          We don&apos;t just write code; we ship products. From enterprise SaaS to experimental AI, explore the work that defines Coderon.
        </motion.p>
      </section>

      {/* SECTION 1: DEPLOYED WORK (The Heavy Hitters) */}
      <motion.section 
        className="c-playroom-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="c-playroom-section__header">
          <FaLaptopCode className="c-playroom-section__icon" />
          <h2>Featured Projects</h2>
        </div>
        
        <motion.div className="c-playroom__grid">
          {liveProjects.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Link 
                href={project.caseStudyUrl || project.liveUrl} 
                className="c-playroom-card c-playroom-card--project"
                target={project.caseStudyUrl ? '_self' : '_blank'} 
                rel={project.caseStudyUrl ? undefined : "noopener noreferrer"}
              >
                <div className="c-playroom-card__image-wrapper">
                  <Image 
                    src={project.imageUrl || '/images/placeholder.png'} 
                    alt={project.title} 
                    width={800} 
                    height={500}
                    className="c-playroom-card__img"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>
                <div className="c-playroom-card__content">
                  <span className="c-playroom-card__category">{project.category}</span>
                  <h3 className="c-playroom-card__title">{project.title}</h3>
                  <p className="c-playroom-card__description">{project.description}</p>
                  <div className="c-playroom-card__tech-stack">
                    {project.tech.slice(0, 3).map((tech: string) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="c-playroom-card__footer">
                  <div className="c-playroom-card__link">
                    {project.caseStudyUrl ? 'Read Case Study' : 'Visit Live Site'} <FaArrowRight />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* SECTION 2: THE LAB (Demos) */}
      <motion.section 
        className="c-playroom-section c-playroom-section--lab"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="c-playroom-section__header">
          <FaFlask className="c-playroom-section__icon" />
          <h2>The Lab</h2>
          <p>Experimental demos, AI tools, and proof-of-concepts.</p>
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
              <Link href={demo.href} className="c-playroom-card c-playroom-card--demo">
                <div className="c-playroom-card__content">
                  <span className="c-playroom-card__category">{demo.category}</span>
                  <h3 className="c-playroom-card__title">{demo.title}</h3>
                  <p className="c-playroom-card__description">{demo.description}</p>
                </div>
                <div className="c-playroom-card__footer">
                  <div className="c-playroom-card__link">
                    Launch Demo <FaArrowRight />
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