// src/components/ContactSection.tsx
"use client";

import Link from 'next/link';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { FiMail, FiClock } from 'react-icons/fi';

// This is the homepage closing CTA section
// It directs visitors to the /contact page — does NOT duplicate the form
// Rationale: the full form lives at /contact, this section converts browsers to clickers

const ContactSection = () => {
  return (
    <section
      className="c-contact-cta"
      id="contact"
      aria-label="Get in touch with Coderon"
    >
      <div className="container">
        <div className="c-contact-cta__inner">

          {/* Left: Heading + copy */}
          <div className="c-contact-cta__content">
            <p className="c-contact-cta__eyebrow">
              Work With Us
            </p>
            <h2 className="c-contact-cta__heading">
              Got a Project in Mind?{' '}
              <span>Let&apos;s Talk.</span>
            </h2>
            <p className="c-contact-cta__body">
              Tell us what&apos;s slowing your business down. We&apos;ll
              give you a straight answer on what&apos;s possible and
              a clear plan — no fluff, no obligation.
            </p>

            <div className="c-contact-cta__meta">
              <div className="c-contact-cta__meta-item">
                <FiMail aria-hidden="true" />
                <a href="mailto:info@coderon.co.za">
                  info@coderon.co.za
                </a>
              </div>
              <div className="c-contact-cta__meta-item">
                <FiClock aria-hidden="true" />
                <span>Response within one business day</span>
              </div>
            </div>
          </div>

          {/* Right: CTAs */}
          <div className="c-contact-cta__actions">
            <Link
              href="/contact"
              className="cta-button"
              aria-label="Book a free consultation with Coderon"
            >
              Book a Free Call
              <FaArrowRight aria-hidden="true" />
            </Link>

            <Link
              href="https://wa.me/27678184898"
              target="_blank"
              rel="noopener noreferrer"
              className="c-contact-cta__whatsapp"
              aria-label="Chat with Coderon on WhatsApp — opens in new tab"
            >
              <FaWhatsapp aria-hidden="true" />
              WhatsApp Us
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;