// Renders Notion blocks as article HTML (styled by .prose-coderon).
import { Fragment, ReactNode } from 'react';
import type { NotionBlock, RichText } from '@/lib/notionJournal';

function Text({ rt }: { rt: RichText[] | undefined }) {
  return (
    <>
      {(rt ?? []).map((t, i) => {
        let node: ReactNode = t.plain_text;
        const a = t.annotations;
        if (a.code) node = <code>{node}</code>;
        if (a.bold) node = <strong>{node}</strong>;
        if (a.italic) node = <em>{node}</em>;
        if (a.strikethrough) node = <s>{node}</s>;
        if (a.underline) node = <u>{node}</u>;
        if (t.href) {
          const external = /^https?:\/\//.test(t.href) && !t.href.includes('coderon.co.za');
          node = (
            <a href={t.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {node}
            </a>
          );
        }
        return <Fragment key={i}>{node}</Fragment>;
      })}
    </>
  );
}

const imageSrc = (b: NotionBlock) =>
  b.image.type === 'external' ? b.image.external.url : `/api/notion-image/?block=${b.id}`;

function Block({ b }: { b: NotionBlock }) {
  const v = b[b.type] ?? {};
  const kids = b.children?.length ? <NotionBlocks blocks={b.children} /> : null;
  switch (b.type) {
    case 'paragraph':
      return v.rich_text?.length ? <p><Text rt={v.rich_text} /></p> : null;
    case 'heading_1':
    case 'heading_2':
      return <h2><Text rt={v.rich_text} /></h2>;
    case 'heading_3':
      return <h3><Text rt={v.rich_text} /></h3>;
    case 'quote':
      return <blockquote><Text rt={v.rich_text} />{kids}</blockquote>;
    case 'callout':
      return (
        <div className="not-prose rounded-xl border-2 border-line bg-gold/15 p-5 text-ink">
          {v.icon?.emoji && <span className="mr-2" aria-hidden="true">{v.icon.emoji}</span>}
          <Text rt={v.rich_text} />
          {kids}
        </div>
      );
    case 'code':
      return <pre><code>{(v.rich_text ?? []).map((t: RichText) => t.plain_text).join('')}</code></pre>;
    case 'divider':
      return <hr />;
    case 'image': {
      const caption = (v.caption ?? []).map((t: RichText) => t.plain_text).join('');
      return (
        <figure>
          {/* Notion images have unknown sizes, so a plain img is used. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc(b)} alt={caption || ''} loading="lazy" />
          {caption && <figcaption className="mt-2 text-center text-sm text-ink/60">{caption}</figcaption>}
        </figure>
      );
    }
    case 'to_do':
      return (
        <p>
          <span aria-hidden="true">{v.checked ? '☑' : '☐'}</span> <Text rt={v.rich_text} />
        </p>
      );
    case 'toggle':
      return (
        <details>
          <summary className="cursor-pointer font-bold"><Text rt={v.rich_text} /></summary>
          {kids}
        </details>
      );
    case 'bookmark':
    case 'embed':
    case 'video':
    case 'link_preview': {
      const url = v.url ?? v.external?.url;
      return url ? <p><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p> : null;
    }
    default:
      return null;
  }
}

/** Groups consecutive list items into <ul>/<ol>. */
export default function NotionBlocks({ blocks }: { blocks: NotionBlock[] }) {
  const out: ReactNode[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === 'bulleted_list_item' || b.type === 'numbered_list_item') {
      const type = b.type;
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === type) items.push(blocks[i++]);
      i--;
      const List = type === 'bulleted_list_item' ? 'ul' : 'ol';
      out.push(
        <List key={items[0].id}>
          {items.map((it) => (
            <li key={it.id}>
              <Text rt={it[type].rich_text} />
              {it.children?.length ? <NotionBlocks blocks={it.children} /> : null}
            </li>
          ))}
        </List>
      );
    } else {
      out.push(<Block key={b.id} b={b} />);
    }
  }
  return <>{out}</>;
}
