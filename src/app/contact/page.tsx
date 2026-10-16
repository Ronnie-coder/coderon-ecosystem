import type { Metadata } from 'next';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiClock, FiArrowRight } from 'react-icons/fi';
import { ConsultationForm } from '@/components/ConsultationForm';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Contact Coderon',
  description:
    'Tell us about your website or the software you need. We reply within one business day. Or run the free website check for instant results.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="accent">talk.</span>
          </>
        }
        intro="Tell us a little about your business and what you need. We reply within one working day, in plain English, with no sales pitch."
      />

      <section className="container grid gap-10 pb-24 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <Link href="/website-check/" className="card-pop group block border-ink bg-gold p-6 text-[#16130E] dark:border-gold">
            <p className="text-sm font-bold uppercase tracking-[0.18em]">Want answers right now?</p>
            <p className="mt-2 text-2xl font-extrabold">Run the free website check</p>
            <p className="mt-1">Real Google results for your site in under a minute.</p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold">
              Check my website <FiArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <div className="card p-6">
            <h2 className="text-xl font-extrabold">Other ways to reach us</h2>
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
            <a
              href="https://wa.me/27678184898"
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-6 w-full border-[#075E54] bg-[#075E54] text-white shadow-hard"
            >
              <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <ConsultationForm />
      </section>
    </>
  );
}
