// src/app/contact/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import {
  FaWhatsapp,
  FaEnvelope,
  FaHeadset,
  FaClock,
} from 'react-icons/fa';
import { ConsultationForm } from '@/components/ConsultationForm';

export const metadata: Metadata = {
  title: 'Contact: Free Website Check',
  description:
    'Send us your website for a free check, or tell us about the software you need. We reply within one business day. No obligation.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <div className="c-page-container">

      {/* Page Header */}
      <header className="c-page-header">
        <h1>Get a free website check</h1>
        <p>
          Send us your website address and we&apos;ll check its speed, security and
          mobile layout for free. Need custom software instead? Tell us about it
          below. No sales pitch, no obligation.
        </p>
      </header>

      <div className="c-contact__wrapper">

        {/* Left: Contact info */}
        <div className="c-contact__info">
          <h2>How to Reach Us</h2>
          <p>
            Send us a message using the form, or reach out directly
            below. We respond to all inquiries within one business day.
          </p>

          <ul className="c-contact__details" aria-label="Contact channels">
            <li>
              <span className="icon" aria-hidden="true">
                <FaEnvelope />
              </span>
              <div>
                <strong>Sales &amp; General Inquiries</strong>
                <br />
                <a href="mailto:info@coderon.co.za">
                  info@coderon.co.za
                </a>
              </div>
            </li>
            <li>
              <span className="icon" aria-hidden="true">
                <FaHeadset />
              </span>
              <div>
                <strong>Technical &amp; App Support</strong>
                <br />
                <a href="mailto:support@coderon.co.za">
                  support@coderon.co.za
                </a>
              </div>
            </li>
            <li>
              <span className="icon" aria-hidden="true">
                <FaClock />
              </span>
              <div>
                Mon – Fri, 9:00 – 17:00 SAST
                <br />
                <small>We respond within one business day</small>
              </div>
            </li>
          </ul>

          <Link
            href="https://wa.me/27678184898"
            target="_blank"
            rel="noopener noreferrer"
            className="c-contact__whatsapp-btn"
            aria-label="Chat with Coderon on WhatsApp — opens in new tab"
          >
            <FaWhatsapp aria-hidden="true" />
            Chat on WhatsApp
          </Link>
        </div>

        {/* Right: Form */}
        <ConsultationForm />

      </div>
    </div>
  );
}