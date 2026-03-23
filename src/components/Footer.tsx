// src/components/Footer.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaArrowRight,
} from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import { BackToTopButton } from '@/components/BackToTopButton';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-ZA', {
          timeZone: 'Africa/Johannesburg',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="c-footer" aria-label="Site footer">
      <div className="c-footer__container">
        <div className="c-footer__grid">

          {/* BRAND COLUMN */}
          <div className="c-footer__col c-footer__col--brand">
            <Link
              href="/"
              className="c-footer__logo-link"
              aria-label="Coderon — go to homepage"
            >
              <span className="c-footer__logo-text">CODERON</span>
            </Link>

            <p className="c-footer__tagline">
              We build the software that helps African businesses
              run faster, smarter, and at scale.
            </p>

            <div className="c-footer__social">
              <a
                href="https://github.com/Ronnie-coder"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Coderon on GitHub"
              >
                <FaGithub aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/ronnie-nyamhute-8b302b360"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Coderon on LinkedIn"
              >
                <FaLinkedin aria-hidden="true" />
              </a>
              <a
                href="https://x.com/Coderon28"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Coderon on X (formerly Twitter)"
              >
                <FiTwitter aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61586558918279"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Coderon on Facebook"
              >
                <FaFacebook aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* COMPANY COLUMN */}
          <div className="c-footer__col c-footer__col--links">
            <h4 className="c-footer__col-heading">Company</h4>
            <ul className="c-footer__link-list" role="list">
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/playroom">Our Work</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/journal">Journal</Link></li>
            </ul>
          </div>

          {/* ECOSYSTEM COLUMN */}
          <div className="c-footer__col c-footer__col--links">
            <h4 className="c-footer__col-heading">Ecosystem</h4>
            <ul className="c-footer__link-list" role="list">
              <li>
                <a
                  href="https://quotepilot.coderon.co.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="QuotePilot — invoicing platform, opens in new tab"
                >
                  QuotePilot
                </a>
              </li>
              <li>
                <Link href="/playroom">
                </Link>
              </li>
            </ul>
          </div>

          {/* WORK WITH US COLUMN */}
          <div className="c-footer__col c-footer__col--contact">
            <h4 className="c-footer__col-heading">Work With Us</h4>

            {/* ✅ FIXED: "Let's" → "Let&apos;s" | "what's" → "what&apos;s" */}
            <p className="c-footer__text">
              Ready to build something? Let&apos;s talk about your
              project and what&apos;s possible.
            </p>

            <Link
              href="/contact"
              className="c-footer__cta"
              aria-label="Request a project proposal from Coderon"
            >
              Request a Proposal
              <FaArrowRight aria-hidden="true" />
            </Link>

            <ul
              className="c-footer__link-list c-footer__link-list--contact"
              role="list"
              aria-label="Contact details"
            >
              <li>
                <a href="mailto:info@coderon.co.za">
                  info@coderon.co.za
                </a>
              </li>
              <li>
                <a href="tel:+27678184898">
                  +27 67 818 4898
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="c-footer__bottom-bar">
          <div className="c-footer__legal-info">
            <span>
              &copy; {currentYear} Coderon (Pty) Ltd.
            </span>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>

          <div className="c-footer__meta-info">
            {currentTime && (
              <div
                className="c-footer__clock"
                aria-label={`Current time in Johannesburg: ${currentTime}`}
              >
                {currentTime} SAST
              </div>
            )}
          </div>
        </div>

      </div>
      <BackToTopButton />
    </footer>
  );
};

export default Footer;