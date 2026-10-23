// Journal posts come from two places:
//  1. MDX files in src/app/journal/(posts) (older posts, written in code)
//  2. A Notion database (new posts): write in Notion, set Status = Published and a Date,
//     and the post goes live on that date. Pages revalidate hourly, so no deploy is needed.
// Posts dated in the future stay hidden until their date, from either source.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getNotionPosts } from './notionJournal';

const postsDirectory = path.join(process.cwd(), 'src/app/journal/(posts)');

export type JournalPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  readingTime: number;
  author: string;
  tags: string[];
  source: 'mdx' | 'notion';
  notionId?: string;
  cover?: string | null;
};

/** @deprecated kept for older imports */
export type PostFrontmatter = JournalPost;

const isLive = (date: string) => {
  const t = new Date(date).getTime();
  return Number.isFinite(t) && t <= Date.now();
};

export function getMdxPosts(): JournalPost[] {
  try {
    return fs
      .readdirSync(postsDirectory)
      .filter((f) => f.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const { data, content } = matter(fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'));
        return {
          slug,
          title: String(data.title ?? slug),
          date: String(data.date ?? '1970-01-01'),
          description: String(data.description ?? ''),
          readingTime: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
          author: String(data.author ?? 'Ronnie Nyamhute'),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          source: 'mdx' as const,
        };
      });
  } catch (error) {
    console.error(`Error reading journal entries from ${postsDirectory}:`, error);
    return [];
  }
}

/** All published posts, newest first. Notion wins if both sources use the same slug. */
export async function getAllPosts(): Promise<JournalPost[]> {
  const notion = await getNotionPosts();
  const notionSlugs = new Set(notion.map((p) => p.slug));
  return [...notion, ...getMdxPosts().filter((p) => !notionSlugs.has(p.slug))]
    .filter((p) => isLive(p.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<JournalPost | null> {
  return (await getAllPosts()).find((p) => p.slug === slug) ?? null;
}

/** Synchronous MDX-only list (used where async is not possible). */
export function getJournalEntries(): JournalPost[] {
  return getMdxPosts()
    .filter((p) => isLive(p.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
