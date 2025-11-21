// src/app/about/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Coderon | Our Mission & Founder',
  description: "Learn about Coderon's mission, born from founder Ronnie Nyamhute's dedication to building Africa's digital future and putting African innovation on the global map.",
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="c-page-container">
      <header className="c-page-header">
        <h1>Our Mission</h1>
        <p>We are a South African software company building world-class digital tools to empower a new generation of African entrepreneurs.</p>
      </header>

      <main>
        {/* --- NEW: Dedicated Founder Section --- */}
        <section className="c-founder-section">
          <div className="c-founder-section__image">
            <Image 
              src="/images/ronnie-nyamhute.jpg"
              alt="Ronnie Nyamhute, Founder of Coderon"
              width={400}
              height={400}
              quality={90}
            />
          </div>
          <div className="c-founder-section__content">
            <h2>The Story Behind the Code</h2>
            <blockquote>
              <p>&ldquo;I believe the immense talent within Africa deserves a prominent place on the world&apos;s digital stage. Coderon was created to bridge that gap—to combine world-class technology with a uniquely African perspective.&rdquo;</p>
              <footer>- Ronnie Nyamhute, Founder</footer>
            </blockquote>
            <p>
              This journey was fueled by a passion for technology and a deep-seated desire to see African businesses thrive. We saw a continent rich with innovation but often underserved by modern digital tools.
            </p>
            <p>
              Every project we undertake is a step towards that goal. We don&apos;t just build websites or software; we build digital foundations for African entrepreneurs to compete, succeed, and lead globally.
            </p>
          </div>
        </section>

        {/* --- REFINED: Core Values Section --- */}
        <section className="c-values-section">
          <h2>Our Guiding Principles</h2>
          <div className="c-values-section__grid">
            <div className="c-value-card">
              <div className="c-value-card__icon">✓</div>
              <h3>Quality & Craftsmanship</h3>
              <p>We build with precision and pride, delivering solutions that are not only functional but also elegant and durable.</p>
            </div>
            <div className="c-value-card">
              <div className="c-value-card__icon">✓</div>
              <h3>Purpose-Driven Innovation</h3>
              <p>Our work is guided by our mission. We innovate not for technology&apos;s sake, but to create real, tangible impact for our partners.</p>
            </div>
            <div className="c-value-card">
              <div className="c-value-card__icon">✓</div>
              <h3>True Partnership</h3>
              <p>Your success is our success. We work as collaborative partners, invested in understanding and achieving your vision.</p>
            </div>
          </div>
        </section>

        {/* REFINED: Final Call to Action */}
        <aside className="c-page-cta">
          <h2>Partner With Us</h2>
          <p>Whether you&apos;re a startup with a bold idea or an established enterprise seeking digital transformation, let&apos;s build the future together.</p>
          <Link href="/contact" className="cta-button">
            Start the Conversation
          </Link>
        </aside>
      </main>
    </div>
  );
}