import type { Metadata } from 'next';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiClock, FiArrowRight } from 'react-icons/fi';
import { ConsultationForm } from '@/components/ConsultationForm';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Get a Free Quote',
  description:
    'Get a free, fixed quote for a new website, a website fix, monthly care or custom software. We reply within one working day, or WhatsApp us.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free quote"
        title={
          <>
            Let&apos;s build <span className="accent">yours.</span>
          </>
        }
        intro="Tell us a little about your business and what you need. You get a fixed price within one working day, in plain English, with no sales pitch."
      />

      <section className="container grid gap-10 pb-24 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <a
            href="https://wa.me/27678184898"
            target="_blank"
            rel="noopener noreferrer"
            className="card-pop group block border-gold bg-gold p-6 text-[#16130E]"
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em]">Prefer to chat?</p>
            <p className="mt-2 flex items-center gap-2 text-2xl font-semibold">
              <FaWhatsapp aria-hidden="true" /> WhatsApp us
            </p>
            <p className="mt-1">Send a voice note or a message. +27 67 818 4898</p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold">
              Open WhatsApp <FiArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>

          <div className="card p-6">
            <h2 className="text-xl font-semibold">Other ways to reach us</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <FiMail aria-hidden="true" className="mt-1 shrink-0 text-gold-text" />
                <div>
                  <p className="font-bold">Projects and questions</p>
                  <a href="mailto:info@coderon.co.za" className="link-underline">info@coderon.co.za</a>
                </div>
              </li>
              <li className="flex gap-3">
                <FiMail aria-hidden="true" className="mt-1 shrink-0 text-gold-text" />
                <div>
                  <p className="font-bold">Support for existing clients</p>
                  <a href="mailto:support@coderon.co.za" className="link-underline">support@coderon.co.za</a>
                </div>
              </li>
              <li className="flex gap-3">
                <FiClock aria-hidden="true" className="mt-1 shrink-0 text-gold-text" />
                <div>
                  <p className="font-bold">Monday to Friday, 9:00 to 17:00 (SAST)</p>
                  <p className="text-ink/70">We reply within one working day.</p>
                </div>
              </li>
            </ul>

          </div>
        </div>

        <ConsultationForm />
      </section>
    </>
  );
}
