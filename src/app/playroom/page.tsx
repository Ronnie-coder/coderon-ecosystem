import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { FaArrowRight } from 'react-icons/fa';
import { liveProjects, interactiveDemos } from '@/data/playroomData';

export const metadata: Metadata = {
  title: 'Our Work & Demos',
  description: 'Explore live client projects, applications, and interactive demos built by Coderon. Experience our technical capabilities firsthand.',
};

const PlayroomPage = () => {
  return (
    <div className="c-page-container">
      <section className="c-playroom">
        <div className="c-playroom__header">
          <h1 className="c-playroom__title">Welcome to the Coderon Showroom.</h1>
          <p className="c-playroom__subtitle">
            Don&apos;t just take our word for it. Explore live projects and interact with our technical demos to see the quality of our work in action.
          </p>
        </div>

        <div className="c-playroom__section">
          <h2 className="c-playroom__section-heading">Live Projects & Applications</h2>
          <div className="c-playroom__grid">
            {liveProjects.map((project) => (
              <Link href={project.caseStudyUrl || project.liveUrl} key={project.id} className="c-playroom-card c-playroom-card--project" target={project.caseStudyUrl ? '_self' : '_blank'} rel="noopener noreferrer">
                <div className="c-playroom-card__image-wrapper">
                  <Image src={project.imageUrl} alt={project.title} width={800} height={600} />
                </div>
                <div className="c-playroom-card__content">
                  <span className="c-playroom-card__category">{project.category}</span>
                  <h3 className="c-playroom-card__title">{project.title}</h3>
                  <p className="c-playroom-card__description">{project.description}</p>
                  <div className="c-playroom-card__tech-stack">
                    {project.tech.map((tech: string) => <span key={tech}>{tech}</span>)}
                  </div>
                </div>
                <div className="c-playroom-card__footer">
                  <div className="c-playroom-card__link">
                    {project.caseStudyUrl ? 'View Case Study' : 'View Live Site'} <FaArrowRight />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="c-playroom__section">
          <h2 className="c-playroom__section-heading">Interactive Demos & Tools</h2>
          <div className="c-playroom__grid">
            {interactiveDemos.map((demo) => (
              <Link href={demo.href} key={demo.id} className="c-playroom-card c-playroom-card--demo">
                <div className="c-playroom-card__content">
                  <span className="c-playroom-card__category">{demo.category}</span>
                  <h3 className="c-playroom-card__title">{demo.title}</h3>
                  <p className="c-playroom-card__description">{demo.description}</p>
                  <div className="c-playroom-card__tech-stack">
                    {demo.tech.map((tech: string) => <span key={tech}>{tech}</span>)}
                  </div>
                </div>
                <div className="c-playroom-card__footer">
                  <div className="c-playroom-card__link">
                    Launch Demo <FaArrowRight />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlayroomPage;