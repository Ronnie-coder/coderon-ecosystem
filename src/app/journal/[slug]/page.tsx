// src/app/journal/[slug]/page.tsx
import { getJournalEntries } from '@/lib/journal';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Metadata } from 'next';
import React from 'react';

// ✅ FIX: The 'params' prop MUST be a Promise in Next.js 16+
type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = getJournalEntries();
  return posts.map((post) => ({ slug: post.slug }));
}

// ✅ FIX: Await the params before using them
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const postMeta = getJournalEntries().find(p => p.slug === slug);
  if (!postMeta) return { title: 'Post Not Found' };
  return {
    title: postMeta.title,
    description: postMeta.description,
  };
}

// ✅ FIX: Component must be async to await params
export default async function JournalArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

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