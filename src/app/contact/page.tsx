// src/app/contact/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { FaWhatsapp, FaEnvelope, FaHeadset, FaClock } from 'react-icons/fa';
import { ConsultationForm } from '@/components/ConsultationForm';

export const metadata: Metadata = {
  title: 'Contact Us | Coderon',
  description: 'Book a free, no-obligation 30-minute strategy session with Coderon to discuss your project, or contact us for general and technical support inquiries.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="c-page-container">
      <header className="c-page-header">
        <h1>Let&apos;s Build Together</h1>
        <p>
          Your free 30-minute strategy session is the first step. Use the form below, or reach out to the appropriate channel directly. We&apos;re ready to listen.
        </p>
      </header>

      <main className="c-contact__wrapper">
        <div className="c-contact__info">
          <h2>Direct Contact Channels</h2>
          <p>
            For the fastest response, please direct your inquiry to the relevant department below. All inquiries are typically answered within one business day.
          </p>
          
          <ul className="c-contact__details">
            <li>
              <span><FaEnvelope /></span>
              <div>
                <strong>For General & Sales Inquiries:</strong>
                <br />
                <a href="mailto:info@coderon.co.za">info@coderon.co.za</a>
              </div>
            </li>
            <li>
              <span><FaHeadset /></span>
              <div>
                <strong>For App & Technical Support:</strong>
                <br />
                <a href="mailto:support@coderon.co.za">support@coderon.co.za</a>
              </div>
            </li>
            <li>
              <span><FaClock /></span>
              <div>Response within 24 hours</div>
            </li>
          </ul>
          
          <Link href="https://wa.me/27678184898" target="_blank" rel="noopener noreferrer" className="c-contact__whatsapp-btn">
            <FaWhatsapp /> Chat on WhatsApp
          </Link>
        </div>
        <div className="c-contact__form-area">
          <ConsultationForm />
        </div>
      </main>
    </div>
  );
}