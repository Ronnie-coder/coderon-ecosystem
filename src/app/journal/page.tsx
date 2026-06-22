// src/app/journal/page.tsx
import { Metadata } from 'next';
import { getJournalEntries } from '@/lib/journal';
import JournalGrid from './JournalGrid';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Practical insights, engineering lessons, and business strategies from the Coderon team — written for founders and operators, not just developers.',
  alternates: { canonical: '/journal' },
};

export default function JournalPage() {
  const posts = getJournalEntries();

  return (
    <main className="journal-page">

      {/* Hero */}
      <section
        className="journal-hero"
        aria-label="Coderon Journal"
      >
        <div className="container">
          <h1>Insights & Engineering Notes</h1>
          <p>
            Practical lessons on software, automation, and building
            a tech company — written by the team doing the work.
          </p>
        </div>
      </section>

      {/* Article Grid */}
      <section
        className="journal-list"
        aria-label="All journal articles"
      >
        <div className="container">
          <JournalGrid posts={posts} />
        </div>
      </section>

    </main>
  );
}