// src/components/Footer.tsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { BackToTopButton } from '@/components/BackToTopButton';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-ZA', { timeZone: 'Africa/Johannesburg', hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="c-footer">
      <div className="c-footer__container">
        <div className="c-footer__grid">
          {/* Column 1: Brand & Socials */}
          <div className="c-footer__col c-footer__col--brand">
            <Link href="/" className="c-footer__logo-link">
              <span className="c-footer__logo-text">CODERON</span>
            </Link>
            <p className="c-footer__tagline">
              Driving Africa's digital future with world-class, robust technology solutions.
            </p>
            <div className="c-footer__social">
              <a href="https://github.com/Ronnie-coder" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/ronnie-nyamhute-8b302b360" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://x.com/Coderon28" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)"><FaTwitter /></a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="c-footer__col c-footer__col--links">
            <h4 className="c-footer__col-heading">Explore</h4>
            <ul className="c-footer__link-list">
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/impact">Our Impact</Link></li>
              <li><Link href="/playroom">Our Work</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/journal">Journal</Link></li>
            </ul>
          </div>

          {/* --- NEW COLUMN: Products --- */}
          <div className="c-footer__col c-footer__col--links">
            <h4 className="c-footer__col-heading">Products</h4>
            <ul className="c-footer__link-list">
              <li><a href="https://app.coderon.co.za" target="_blank" rel="noopener noreferrer">QuotePilot SaaS</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="c-footer__col c-footer__col--contact">
            <h4 className="c-footer__col-heading">Get in Touch</h4>
            <ul className="c-footer__link-list">
              <li><a href="mailto:info@coderon.co.za">info@coderon.co.za</a></li>
              <li><a href="mailto:support@coderon.co.za">support@coderon.co.za</a></li>
              <li><a href="tel:+27678184898">+27 67 818 4898</a></li>
            </ul>
          </div>
        </div>

        <div className="c-footer__bottom-bar">
          <div className="c-footer__legal-info">
            <span>&copy; {currentYear} Coderon (Pty) Ltd.</span>
            <span>Reg: 2025 / 482790 / 07</span>
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