"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight } from 'react-icons/fa';
import { BackToTopButton } from '@/components/BackToTopButton';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Only run on client to avoid hydration mismatch
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-ZA', { 
        timeZone: 'Africa/Johannesburg', 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="c-footer">
      <div className="c-footer__container">
        <div className="c-footer__grid">
          
          {/* BRAND COLUMN */}
          <div className="c-footer__col c-footer__col--brand">
            <Link href="/" className="c-footer__logo-link">
              <span className="c-footer__logo-text">CODERON</span>
            </Link>
            <p className="c-footer__tagline">
              Driving Africa&apos;s digital future with world-class, robust technology solutions.
            </p>
            <div className="c-footer__social">
              <a href="https://github.com/Ronnie-coder" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/ronnie-nyamhute-8b302b360" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://x.com/Coderon28" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)"><FaTwitter /></a>
            </div>
          </div>

          {/* EXPLORE COLUMN */}
          <div className="c-footer__col c-footer__col--links">
            <h4 className="c-footer__col-heading">Explore</h4>
            <ul className="c-footer__link-list">
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/impact">Our Impact</Link></li>
              <li><Link href="/playroom">Case Studies</Link></li>
              <li><Link href="/about">About Coderon</Link></li>
              <li><Link href="/journal">Journal</Link></li>
            </ul>
          </div>

          {/* PRODUCTS COLUMN */}
          <div className="c-footer__col c-footer__col--links">
            <h4 className="c-footer__col-heading">Products</h4>
            <ul className="c-footer__link-list">
              <li><a href="https://quotepilot.coderon.co.za/" target="_blank" rel="noopener noreferrer">QuotePilot SaaS</a></li>
            </ul>
          </div>

          {/* ACTION COLUMN (MODIFIED) */}
          <div className="c-footer__col c-footer__col--contact">
            <h4 className="c-footer__col-heading">Start a Project</h4>
            <p className="c-footer__text">
              Ready to scale? Get a detailed proposal for your software vision.
            </p>
            
            {/* THE STRATEGIC 'GET PROPOSAL' BUTTON */}
            <Link href="/contact" className="c-footer__cta">
              Get Proposal <FaArrowRight />
            </Link>

            <ul className="c-footer__link-list c-footer__link-list--contact">
              <li><a href="mailto:info@coderon.co.za">info@coderon.co.za</a></li>
              <li><a href="tel:+27678184898">+27 67 818 4898</a></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="c-footer__bottom-bar">
          <div className="c-footer__legal-info">
            <span>&copy; {currentYear} Coderon (Pty) Ltd.</span>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
          <div className="c-footer__meta-info">
             <div className="c-footer__clock" aria-label="Current time in Johannesburg">
                {currentTime} SAST
             </div>
          </div>
        </div>
      </div>
      <BackToTopButton />
    </footer>
  );
};

export default Footer;