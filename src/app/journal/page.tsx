import { Metadata } from 'next';
import { getJournalEntries } from '@/lib/journal';
import JournalGrid from './JournalGrid';

export const metadata: Metadata = {
  title: 'The Coderon Journal | Digital Insights',
  description: 'Insights, tutorials, and deep dives into software development, AI, and digital strategy from the team at Coderon.',
};

export default function JournalPage() {
  // 1. Fetch data on the Server
  const posts = getJournalEntries();

  return (
    <main className="journal-page">
      <section className="journal-hero">
        <div className="container">
          <h1>System Logs & Insights</h1>
          <p>Decoding the digital frontier, one commit at a time.</p>
        </div>
      </section>

      <section className="journal-list">
        <div className="container">
          {/* 2. Pass data to the Client Component for Animation */}
          <JournalGrid posts={posts} />
        </div>
      </section>
    </main>
  );
}