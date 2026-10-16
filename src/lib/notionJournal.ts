// Reads journal posts from a Notion database (free Notion API).
// Needs NOTION_TOKEN (already used by the outreach CRM) and NOTION_JOURNAL_DB.
// Without them, the journal simply shows the MDX posts.
//
// Database properties (names matter):
//   Name (title) · Slug (text, optional) · Description (text) · Date (date)
//   Status (select or status: "Published") · Tags (multi-select, optional) · Author (text, optional)
import type { JournalPost } from './journal';

const NOTION_VERSION = '2022-06-28';
const REVALIDATE = 3600;

const enabled = () => Boolean(process.env.NOTION_TOKEN && process.env.NOTION_JOURNAL_DB);

async function notion<T = any>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method: init.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
    next: { revalidate: REVALIDATE, tags: ['journal'] },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Notion ${res.status}`);
  return json as T;
}

export type RichText = {
  plain_text: string;
  href: string | null;
  annotations: { bold: boolean; italic: boolean; strikethrough: boolean; underline: boolean; code: boolean };
};

export type NotionBlock = {
  id: string;
  type: string;
  has_children: boolean;
  children?: NotionBlock[];
  [key: string]: any;
};

const plain = (rt: RichText[] | undefined) => (rt ?? []).map((t) => t.plain_text).join('').trim();

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

function prop(page: any, name: string) {
  return page.properties?.[name];
}

function toPost(page: any): JournalPost | null {
  const title = plain(prop(page, 'Name')?.title ?? prop(page, 'Title')?.title);
  const date = prop(page, 'Date')?.date?.start;
  if (!title || !date) return null;
  const slug = slugify(plain(prop(page, 'Slug')?.rich_text) || title);
  const words = Number(prop(page, 'Words')?.number) || 0;
  const coverFile = page.cover;
  const cover = coverFile?.type === 'external' ? coverFile.external.url : coverFile?.type === 'file' ? `/api/notion-image/?page=${page.id}` : null;
  return {
    slug,
    title,
    date,
    description: plain(prop(page, 'Description')?.rich_text),
    readingTime: words ? Math.max(1, Math.ceil(words / 200)) : 4,
    author: plain(prop(page, 'Author')?.rich_text) || 'Ronnie Nyamhute',
    tags: (prop(page, 'Tags')?.multi_select ?? []).map((t: { name: string }) => t.name),
    source: 'notion',
    notionId: page.id,
    cover,
  };
}

export async function getNotionPosts(): Promise<JournalPost[]> {
  if (!enabled()) return [];
  try {
    const today = new Date().toISOString().slice(0, 10);
    const statusFilter = (kind: 'select' | 'status') => ({ property: 'Status', [kind]: { equals: 'Published' } });
    const query = async (kind: 'select' | 'status') =>
      notion<{ results: any[] }>(`databases/${process.env.NOTION_JOURNAL_DB}/query`, {
        method: 'POST',
        body: {
          filter: { and: [statusFilter(kind), { property: 'Date', date: { on_or_before: today } }] },
          sorts: [{ property: 'Date', direction: 'descending' }],
          page_size: 100,
        },
      });
    // "Status" can be a Select or a Status property; try both.
    let data: { results: any[] };
    try {
      data = await query('status');
    } catch {
      data = await query('select');
    }
    return data.results.map(toPost).filter((p): p is JournalPost => p !== null);
  } catch (err) {
    console.error('Notion journal unavailable:', err);
    return [];
  }
}

/** Fetches a page's blocks, including one level of nested children (lists, toggles). */
export async function getNotionBlocks(pageId: string, depth = 0): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;
  do {
    const data = await notion<{ results: NotionBlock[]; has_more: boolean; next_cursor: string | null }>(
      `blocks/${pageId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ''}`
    );
    blocks.push(...data.results);
    cursor = data.has_more ? data.next_cursor ?? undefined : undefined;
  } while (cursor);

  if (depth < 2) {
    await Promise.all(
      blocks.filter((b) => b.has_children && b.type !== 'child_page').map(async (b) => {
        b.children = await getNotionBlocks(b.id, depth + 1);
      })
    );
  }
  return blocks;
}

/** Fresh URL for a Notion-hosted image (they expire after an hour). */
export async function getNotionFileUrl(opts: { block?: string; page?: string }): Promise<string | null> {
  if (!enabled()) return null;
  if (opts.block) {
    const b = await notion<NotionBlock>(`blocks/${opts.block}`);
    const img = b.image;
    return img?.type === 'file' ? img.file.url : img?.external?.url ?? null;
  }
  if (opts.page) {
    const p = await notion<any>(`pages/${opts.page}`);
    return p.cover?.type === 'file' ? p.cover.file.url : p.cover?.external?.url ?? null;
  }
  return null;
}

export const wordCount = (blocks: NotionBlock[]): number =>
  blocks.reduce((n, b) => {
    const rt: RichText[] | undefined = b[b.type]?.rich_text;
    return n + plain(rt).split(/\s+/).filter(Boolean).length + (b.children ? wordCount(b.children) : 0);
  }, 0);
