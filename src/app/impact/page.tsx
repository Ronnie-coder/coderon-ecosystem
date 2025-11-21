import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projectsData';

export const metadata: Metadata = {
  title: 'Our Impact',
  description: 'See the real-world impact of our work. Explore case studies of how Coderon has helped African businesses thrive.',
  alternates: {
    canonical: '/impact',
  },
};

export default function ImpactPage() {
  return (
    <div className="c-page-container">
      <header className="c-page-header">
        <h1>Our Impact</h1>
        <p>We measure success by the success of our partners. Here are some of their stories.</p>
      </header>

      <main>
        {projects.map((project) => (
          <article key={project.id} className="c-project-card">
            <div className="c-project-card__image">
              <Image src={project.imageUrl} alt={`Showcase of the ${project.client} project`} width={1200} height={800} quality={90} />
            </div>
            <div className="c-project-card__body">
              <div className="c-project-card__content">
                <p className="c-project-card__client">{project.client}</p>
                <h2 className="c-project-card__title">{project.title}</h2>
                <p className="c-project-card__description">{project.description}</p>
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cta-button">
                  View Live Project
                </Link>
              </div>
              <aside className="c-project-card__details">
                <div className="c-project-card__meta-item">
                  <h3 className="c-project-card__meta-heading">YEAR</h3>
                  <p className="c-project-card__meta-content">{project.year}</p>
                </div>
                <div className="c-project-card__meta-item">
                  <h3 className="c-project-card__meta-heading">ROLE</h3>
                  {project.roles.map(role => <p key={role} className="c-project-card__meta-content">{role}</p>)}
                </div>
                <div className="c-project-card__meta-item">
                  <h3 className="c-project-card__meta-heading">SERVICES</h3>
                  {project.servicesDelivered.map(service => <p key={service} className="c-project-card__meta-content">{service}</p>)}
                </div>
              </aside>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}