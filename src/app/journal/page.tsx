// src/app/journal/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { getJournalEntries } from '@/lib/journal';

export const metadata: Metadata = {
  title: 'The Coderon Journal',
  description: 'Insights, tutorials, and deep dives into software development, AI, and digital strategy from the team at Coderon.',
};

export default function JournalPage() {
  const posts = getJournalEntries();

  return (
    <main className="journal-page">
      <section className="journal-hero">
        <div className="container">
          <h1>The Coderon Journal</h1>
          <p>Insights, tutorials, and our thoughts on the digital frontier.</p>
        </div>
      </section>

      <section className="journal-list">
        <div className="container">
          <div className="journal-grid">
            {/* --- ENHANCEMENT: Destructured readingTime --- */}
            {posts.map(({ slug, title, date, description, readingTime }) => (
              <Link key={slug} href={`/journal/${slug}/`} className="journal-card">
                <article>
                  <div className="card-content">
                    <p className="card-meta">
                      <time dateTime={date as string}>
                        {new Date(date as string).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      {/* --- ENHANCEMENT: Display reading time --- */}
                      <span className="card-reading-time"> • {readingTime} min read</span>
                    </p>
                    <h2 className="card-title">{title as string}</h2>
                    <p className="card-description">{description as string}</p>
                    <span className="card-read-more">Read Article →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}