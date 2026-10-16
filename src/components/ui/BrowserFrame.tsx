import Image from 'next/image';

/** A screenshot inside a simple browser window, used for project previews. */
export default function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 700px',
  className = '',
}: {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border-2 border-line bg-card ${className}`}>
      <div className="flex items-center gap-2 border-b-2 border-line px-3 py-2" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full border-2 border-line" />
        <span className="h-2.5 w-2.5 rounded-full border-2 border-line" />
        <span className="h-2.5 w-2.5 rounded-full border-2 border-line bg-gold" />
        {url && <span className="ml-2 truncate font-mono text-[11px] text-ink/60">{url}</span>}
      </div>
      <Image src={src} alt={alt} width={1200} height={800} sizes={sizes} priority={priority} className="block h-auto w-full" />
    </div>
  );
}
