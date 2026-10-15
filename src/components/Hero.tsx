// src/components/Hero.tsx
import Link from 'next/link';

// Server component: the hero is the LCP element, so no client JS here.
// CSS handles the fade-in.
const Hero = () => {
  return (
    <section className="c-hero" aria-labelledby="hero-title">
      <div className="c-hero__container">
        <div className="c-hero__content">
          <p className="c-hero__eyebrow c-hero__animate-1">Websites &amp; custom software</p>

          <h1 id="hero-title" className="c-hero__title c-hero__animate-2">
            Websites and software that help your <span>business grow.</span>
          </h1>

          <p className="c-hero__subtitle c-hero__animate-3">
            We build fast websites that work on every phone and are set up properly for Google.
            When a website is not enough, we build custom tools that save your team hours every week.
          </p>

          <div className="c-hero__cta-group c-hero__animate-4">
            <Link href="/contact/?topic=website" className="cta-button">
              Get a free website check
            </Link>
            <Link href="/contact/?topic=software" className="cta-button-secondary">
              Talk about custom software
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
