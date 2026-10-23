// CORRECTED: src/app/playroom/business-chatbot/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Demo: Business Chatbot',
  description: 'Try a live demo of a business chatbot built by Coderon: it answers questions about our services and points you to the right one.',
  alternates: { canonical: '/playroom/business-chatbot/' },
};

const BusinessChatbotPage = () => {
  const chatbotUrl = "https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/29/07/20250429074103-QV7JOANL.json";

  return (
    <div className="container pb-20 pt-12 md:pt-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Demo: business chatbot</h1>
        <p className="mt-4 text-lg text-ink/75">
          This is a live example of an intelligent chatbot. It can be trained on your company&apos;s data to answer questions, book meetings, and improve customer engagement.
        </p>
        <Link href="/playroom/" className="mt-4 inline-block font-semibold text-ink/70 hover:text-ink">
          &larr; Back to our work
        </Link>
      </div>

      <div className="card mt-10 overflow-hidden">
        <iframe
          title="Coderon Business AI Chatbot Demo"
          src={chatbotUrl}
          className="block h-[640px] w-full"
        ></iframe>
      </div>
    </div>
  );
};

export default BusinessChatbotPage;