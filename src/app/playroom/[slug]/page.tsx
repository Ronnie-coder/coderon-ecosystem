// CORRECTED: src/app/playroom/[slug]/page.tsx
import { liveProjects } from '@/data/playroomData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export async function generateStaticParams() {
  const paths = liveProjects
    .filter(p => p.caseStudyUrl)
    .map(p => ({ slug: p.id }));
  return paths;
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = liveProjects.find(p => p.id === slug);

  if (!project) {
    notFound();
  }

  const client = project.client || 'Internal Project';
  const year = project.year || new Date().getFullYear().toString();
  const roles = project.roles || ['Full-Stack Development', 'UI/UX Design'];
  const servicesDelivered = project.servicesDelivered || ['Web Application'];
  const liveUrl = project.liveUrl || '#';

  return (
    <div className="c-case-study">
      <div className="c-case-study__header">
        <div className="c-page-container">
            <Link href="/playroom" className="c-case-study__back-link">
                <FaArrowLeft /> Back to Showroom
            </Link>
            <h1 className="c-case-study__title">{project.title}</h1>
            <p className="c-case-study__client">Client: {client}</p>
        </div>
      </div>
      
      <div className="c-page-container">
        <div className="c-case-study__main-content">
          <div className="c-case-study__overview">
            <h2>OVERVIEW</h2>
            <p>{project.description}</p>
            <Link href={liveUrl} className="cta-button" target="_blank" rel="noopener noreferrer">
              View Live Project
            </Link>
          </div>
          <aside className="c-case-study__details">
            <div className="c-case-study__meta-item">
              <h3>YEAR</h3>
              <p>{year}</p>
            </div>
            <div className="c-case-study__meta-item">
              <h3>ROLE</h3>
              {/* FIX: Added explicit 'string' type for the 'role' parameter */}
              {roles.map((role: string) => <p key={role}>{role}</p>)}
            </div>
            <div className="c-case-study__meta-item">
              <h3>SERVICES</h3>
              {/* FIX: Added explicit 'string' type for the 'service' parameter */}
              {servicesDelivered.map((service: string) => <p key={service}>{service}</p>)}
            </div>
          </aside>
        </div>
        
        {(project.narrative_challenge || project.narrative_solution || project.narrative_results) && (
          <div className="c-case-study__narrative">
            {project.narrative_challenge && (
              <section className="c-case-study__narrative-section">
                <h2>The Challenge</h2>
                <p>{project.narrative_challenge}</p>
              </section>
            )}
            {project.narrative_solution && (
              <section className="c-case-study__narrative-section">
                <h2>Our Solution</h2>
                <p>{project.narrative_solution}</p>
              </section>
            )}
            {project.narrative_results && project.narrative_results.length > 0 && (
              <section className="c-case-study__narrative-section">
                <h2>The Results</h2>
                <ul>
                  {/* FIX: Added explicit 'string' and 'number' types for parameters */}
                  {project.narrative_results.map((result: string, index: number) => <li key={index}>{result}</li>)}
                </ul>
              </section>
            )}
          </div>
        )}

        <div className="c-case-study__image-wrapper">
          <Image src={project.imageUrl} alt={`Full showcase of ${project.title}`} width={1600} height={900} quality={95} />
        </div>
      </div>
    </div>
  );
};