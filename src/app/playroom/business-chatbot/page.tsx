// CORRECTED: src/app/playroom/business-chatbot/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Demo: Business AI Chatbot',
  description: 'Interact with a live demo of a Coderon business chatbot.',
};

const BusinessChatbotPage = () => {
  const chatbotUrl = "https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/29/07/20250429074103-QV7JOANL.json";

  return (
    <div className="c-page-container playroom-demo">
      <div className="playroom-demo__header">
        <h1>Demo: Business AI Chatbot</h1>
        <p>
          This is a live example of an intelligent chatbot. It can be trained on your company&apos;s data to answer questions, book meetings, and improve customer engagement.
        </p>
        <Link href="/playroom" className="playroom-demo__back-link">
          &larr; Back to Playroom
        </Link>
      </div>

      <div className="playroom-demo__content-area">
        <iframe
          title="Coderon Business AI Chatbot Demo"
          src={chatbotUrl}
          className="playroom-demo__iframe"
        ></iframe>
      </div>
    </div>
  );
};

export default BusinessChatbotPage;