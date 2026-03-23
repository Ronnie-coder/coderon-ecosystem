// src/app/journal/[slug]/page.tsx
import { getJournalEntries } from '@/lib/journal';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Metadata } from 'next';
import React from 'react';

// CORRECTED: The 'params' prop is a plain object, not a Promise.
type PageProps = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = getJournalEntries();
  return posts.map((post) => ({ slug: post.slug }));
}

// CORRECTED: Destructuring the 'params' object directly.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const postMeta = getJournalEntries().find(p => p.slug === slug);
  if (!postMeta) return { title: 'Post Not Found' };
  return {
    title: postMeta.title,
    description: postMeta.description,
  };
}

export default function JournalArticlePage({ params }: PageProps) {
  // CORRECTED: Replaced React.use() with standard destructuring for the object prop.
  const { slug } = params;

  const Content = dynamic(() => import(`../(posts)/${slug}.mdx`).catch(() => notFound()));
  const postMeta = getJournalEntries().find(p => p.slug === slug);

  if (!postMeta) {
    notFound();
  }

  return (
    <article className="c-article-page">
      <div className="c-page-container">
        <header className="c-page-header">
          <h1>{postMeta.title}</h1>
          <p className="article-meta">
            <span>
              Published on {new Date(postMeta.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
            <span className="reading-time"> • {postMeta.readingTime} min read</span>
          </p>
        </header>

        <main className="c-article-content">
          <Content />
        </main>

        <footer className="c-article-footer">
          <Link href="/journal/">← Back to All Articles</Link>
        </footer>
      </div>
    </article>
  );
}