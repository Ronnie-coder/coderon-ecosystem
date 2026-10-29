// src/app/playroom/business-chatbot/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import BackLink from '@/components/ui/BackLink';

export const metadata: Metadata = {
  title: 'Meet Kojo, our AI assistant',
  description:
    'Meet Kojo, the AI assistant Coderon built on Botpress. It captures enquiries and answers questions. We build chatbots and AI integrations for businesses.',
  alternates: { canonical: '/playroom/business-chatbot/' },
};

const CHATBOT_URL =
  'https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/29/07/20250429074103-QV7JOANL.json';

// What Kojo does, in the order a visitor experiences it.
const steps = [
  'Welcomes you and asks which service you are interested in',
  'Takes your name, phone number and email',
  'Asks for a short description of your project',
  'Then answers your questions about Coderon',
];

export default function BusinessChatbotPage() {
  return (
    <div className="container pb-20 pt-12 md:pt-16">
      <BackLink href="/playroom/" label="Back to our work" className="mb-8" />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">Chatbots and AI</p>
          <h1 className="h-display mt-4 max-w-[14ch]">
            Meet <span className="accent">Kojo</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/75">
            Kojo is the AI assistant we built for Coderon on Botpress. It turns a website visit into a proper enquiry, any
            time of day:
          </p>
          <ol className="mt-6 space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold text-sm font-semibold text-[#16130E]">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-ink/85">{s}</span>
              </li>
            ))}
          </ol>
          <div className="card mt-8 p-6">
            <h2 className="font-semibold">Want one for your business?</h2>
            <p className="mt-2 text-ink/75">
              We build chatbots and AI integrations that capture enquiries and answer your customers&apos; questions, trained
              on your own information.
            </p>
            <Link href="/contact/?topic=software" className="btn-primary mt-5">
              Get a free quote <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div>
          <div className="card overflow-hidden">
            <iframe title="Chat with Kojo, Coderon's AI assistant" src={CHATBOT_URL} className="block h-[640px] w-full" />
          </div>
          <p className="mt-3 text-sm text-ink/70">Live demo. Kojo runs on Botpress, so it loads from their servers.</p>
        </div>
      </div>
    </div>
  );
}
