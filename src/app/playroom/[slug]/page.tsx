import { liveProjects } from '@/data/playroomData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaExternalLinkAlt, FaCheckCircle, FaCalendarAlt, FaLayerGroup, FaTools } from 'react-icons/fa';

export async function generateStaticParams() {
  return liveProjects.map(p => ({ slug: p.id }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = liveProjects.find(p => p.id === slug);

  if (!project) {
    notFound();
  }

  const client = project.client || 'Client Project';
  const year = project.year || new Date().getFullYear().toString();
  const roles = project.roles || ['Development'];
  const servicesDelivered = project.servicesDelivered || ['Software Engineering'];
  const liveUrl = project.liveUrl || '#';

  return (
    <div className="c-case-study">
      <div className="c-page-container">
        
        {/* TOP NAVIGATION */}
        <div className="c-case-study__nav">
            <Link href="/playroom" className="back-link">
                <FaArrowLeft /> Back to Showroom
            </Link>
        </div>

        {/* HERO SECTION: SPLIT LAYOUT */}
        <header className="c-case-study__hero">
          
          {/* LEFT FLANK: INTEL */}
          <div className="c-case-study__hero-content">
            <div className="c-case-study__brand">
              {project.clientLogo ? (
                <Image 
                  src={project.clientLogo} 
                  alt={`${client} Logo`} 
                  width={140} 
                  height={60} 
                  className="client-logo"
                  style={{ objectFit: 'contain', objectPosition: 'left' }}
                />
              ) : (
                 <span className="client-text">{client}</span>
              )}
            </div>
            
            <h1 className="project-title">{project.title}</h1>
            
            <div className="project-brief">
              <h2>The Brief</h2>
              <p>{project.description}</p>
            </div>

            <Link href={liveUrl} className="btn-visit" target="_blank" rel="noopener noreferrer">
              View Live Project <FaExternalLinkAlt />
            </Link>
          </div>

          {/* RIGHT FLANK: VISUAL EVIDENCE (Browser Window) */}
          <div className="c-case-study__hero-visual">
            <div className="browser-frame">
              <div className="browser-header">
                <div className="dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="browser-address-bar">
                  {liveUrl.replace('https://', '').replace(/\/$/, '')}
                </div>
              </div>
              <div className="browser-content">
                <Image 
                  src={project.imageUrl} 
                  alt={`Showcase of ${project.title}`} 
                  width={1200} 
                  height={800} 
                  quality={95}
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        {/* STATS STRIP */}
        <section className="c-case-study__stats">
          <div className="stat-item">
            <div className="stat-icon"><FaCalendarAlt /></div>
            <div className="stat-info">
              <span className="label">Year</span>
              <span className="value">{year}</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><FaLayerGroup /></div>
            <div className="stat-info">
              <span className="label">Role</span>
              <span className="value">{roles.join(', ')}</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><FaTools /></div>
            <div className="stat-info">
              <span className="label">Services</span>
              <span className="value">{servicesDelivered.join(', ')}</span>
            </div>
          </div>
        </section>
        
        {/* NARRATIVE GRID */}
        {(project.narrative_challenge || project.narrative_solution || project.narrative_results) && (
          <div className="c-case-study__narrative">
            <div className="narrative-grid">
              
              {project.narrative_challenge && (
                <section className="narrative-card">
                  <h2>The Challenge</h2>
                  <p>{project.narrative_challenge}</p>
                </section>
              )}
              
              {project.narrative_solution && (
                <section className="narrative-card">
                  <h2>Our Solution</h2>
                  <p>{project.narrative_solution}</p>
                </section>
              )}
              
              {project.narrative_results && project.narrative_results.length > 0 && (
                <section className="narrative-card results-card">
                  <h2>The Results</h2>
                  <ul className="results-list">
                    {project.narrative_results.map((result: string, index: number) => (
                      <li key={index}>
                        <FaCheckCircle className="check-icon"/>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}