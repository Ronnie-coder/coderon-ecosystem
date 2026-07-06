// src/app/playroom/[slug]/page.tsx
import { liveProjects } from '@/data/playroomData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaExternalLinkAlt, FaCheckCircle, FaCalendarAlt, FaLayerGroup, FaTools } from 'react-icons/fa';

export async function generateStaticParams() {
  return liveProjects.map(p => ({ slug: p.id }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

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

        {/* HERO SECTION: SPLIT GRID */}
        <header className="c-case-study__hero">
          
          {/* LEFT FLANK: INTEL */}
          <div className="c-case-study__hero-content">
            <div className="c-case-study__brand">
              {project.clientLogo ? (
                <div className="logo-wrapper animate-fade-in">
                  <Image 
                    src={project.clientLogo} 
                    alt={`${client} Logo`} 
                    width={48} 
                    height={48} 
                    className="client-logo-svg"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
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
                  style={{ width: '100%', height: 'auto', display: 'block' }}
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
            <div className="stat-icon-box"><FaCalendarAlt /></div>
            <div className="stat-info">
              <span className="label">Year</span>
              <span className="value">{year}</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-box"><FaLayerGroup /></div>
            <div className="stat-info">
              <span className="label">Role</span>
              <span className="value">{roles.join(', ')}</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-box"><FaTools /></div>
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
                      <li key={index} className="results-item">
                        <div className="check-icon-wrapper">
                          <FaCheckCircle />
                        </div>
                        <span className="results-text">{result}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        )}

        {/* EXTRA FEATURE IMAGES GALLERY */}
        {((project as any).featureImages && (project as any).featureImages.length > 0) && (
          <section className="c-showcase-gallery">
            <h2 className="gallery-title">Deep Dive Evidence</h2>
            <div className="gallery-grid">
              {(project as any).featureImages.map((img: string, idx: number) => (
                <div key={idx} className="gallery-card">
                  <div className="browser-frame">
                    <div className="browser-header">
                      <div className="dots">
                        <span className="dot dot-red"></span>
                        <span className="dot dot-yellow"></span>
                        <span className="dot dot-green"></span>
                      </div>
                    </div>
                    <div className="browser-content">
                       <Image 
                         src={img} 
                         alt={`Feature view ${idx + 1}`} 
                         width={1200} 
                         height={800} 
                         style={{ width: '100%', height: 'auto', display: 'block' }} 
                         quality={95} 
                       />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* THE PERFORMANCE PROOF */}
        {(project.lighthouseBefore && project.lighthouseAfter) && (
          <section className="c-performance-proof">
            <div className="c-performance-proof__header">
              <span className="eyebrow">Hard Evidence</span>
              <h2>The Performance Upgrade</h2>
              <p>We don&apos;t just build pretty layouts. We engineer mathematically perfect websites that dominate Google search rankings.</p>
            </div>
            
            <div className="c-performance-proof__grid">
               {/* Before Image */}
               <div className="c-performance-proof__card">
                 <div className="card-header">
                    <span className="red">Before: Outdated & Slow</span>
                 </div>
                 <div className="card-body">
                    {/* ✅ FIX: Removed 'fill' prop, using standard width/height safely */}
                    <Image 
                      src={project.lighthouseBefore} 
                      alt="Lighthouse Before Score" 
                      width={800} 
                      height={600} 
                      style={{ width: '100%', height: 'auto', display: 'block' }} 
                    />
                 </div>
               </div>
               
               {/* After Image */}
               <div className="c-performance-proof__card">
                 <div className="card-header">
                    <span className="green">After: Next.js Optimised</span>
                 </div>
                 <div className="card-body gold-glow">
                    {/* ✅ FIX: Removed 'fill' prop, using standard width/height safely */}
                    <Image 
                      src={project.lighthouseAfter} 
                      alt="Lighthouse After Score" 
                      width={800} 
                      height={600} 
                      style={{ width: '100%', height: 'auto', display: 'block' }} 
                    />
                 </div>
               </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}