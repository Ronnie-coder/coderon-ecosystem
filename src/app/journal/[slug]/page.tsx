// src/app/journal/[slug]/page.tsx
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { getAllPosts, getPost } from '@/lib/journal';
import { getNotionBlocks } from '@/lib/notionJournal';
import NotionBlocks from '@/components/journal/NotionBlocks';
import { canonical, SITE_URL } from '@/lib/site';

type PageProps = { params: Promise<{ slug: string }> };

// New Notion posts appear without a deploy (and scheduled posts go live on their date).
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: canonical(`journal/${slug}`) },
    openGraph: {
      type: 'article',
      url: canonical(`journal/${slug}`),
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: { title: post.title, description: post.description },
  };
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  let body: React.ReactNode;
  if (post.source === 'notion' && post.notionId) {
    body = <NotionBlocks blocks={await getNotionBlocks(post.notionId)} />;
  } else {
    const Content = dynamic(() => import(`../(posts)/${slug}.mdx`));
    body = <Content />;
  }

  const all = await getAllPosts();
  const more = all.filter((p) => p.slug !== slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}${canonical(`journal/${slug}`)}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="container max-w-4xl pb-10 pt-12 md:pt-20">
        <Link href="/journal/" className="inline-flex items-center gap-2 font-semibold text-ink/70 hover:text-ink">
          <FiArrowLeft aria-hidden="true" /> Journal
        </Link>
        <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">{post.title}</h1>
        {post.description && <p className="mt-5 text-xl text-ink/75">{post.description}</p>}
        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-ink/60">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
        </p>
      </header>

      <div className="container max-w-4xl border-t-2 border-line/15 pb-16 pt-10">
        <div className="prose-coderon">{body}</div>
      </div>

      {more.length > 0 && (
        <aside aria-labelledby="more-posts" className="container max-w-4xl pb-20">
          <h2 id="more-posts" className="eyebrow">Keep reading</h2>
          <ul className="mt-5 grid gap-5 md:grid-cols-2">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={`/journal/${p.slug}/`} className="card-pop group flex h-full flex-col p-6">
                  <h3 className="text-lg font-extrabold leading-snug">{p.title}</h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 font-bold">
                    Read <FiArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
