import Image from "next/image";
import { getPhoto, type PhotoKey } from "@/lib/photos";

/**
 * Framed photo card (never full-bleed). Photos are WhatsApp quality, so `maxWidth` caps
 * the displayed size at the photo's native width and `sizes` stops the browser asking for more.
 * Until the real photo is added, an honest "photo coming soon" frame is shown.
 */
export function PhotoCard({
  photo,
  sizes = "(min-width: 1024px) 480px, 100vw",
  priority = false,
  caption = false,
  className = "",
  aspect,
  stripe = false,
}: {
  photo: PhotoKey;
  sizes?: string;
  priority?: boolean;
  caption?: boolean;
  className?: string;
  /** Force an aspect ratio (crops with object-cover), e.g. "4/3". */
  aspect?: string;
  /** Diagonal brand stripe peeking out behind the card. */
  stripe?: boolean;
}) {
  const p = getPhoto(photo);
  const style = aspect ? { aspectRatio: aspect } : { aspectRatio: `${p.width}/${p.height}` };

  return (
    <figure className={`relative ${className}`} style={{ maxWidth: p.ready ? p.width : undefined }}>
      {stripe && (
        <div aria-hidden="true" className="stripe-bg absolute -right-3 -bottom-3 h-2/3 w-2/3 rounded-[var(--radius-photo)] opacity-90" />
      )}
      <div
        className="relative overflow-hidden rounded-[var(--radius-photo)] border border-black/10 bg-muted shadow-[0_10px_30px_-12px_rgba(22,24,27,0.45)]"
        style={style}
      >
        {p.ready ? (
          <Image
            src={p.src}
            alt={p.alt}
            fill={Boolean(aspect)}
            width={aspect ? undefined : p.width}
            height={aspect ? undefined : p.height}
            sizes={sizes}
            priority={priority}
            className={`photo-treat ${aspect ? "object-cover" : "h-auto w-full"}`}
          />
        ) : (
          <div
            role="img"
            aria-label={`${p.alt} (photo coming soon)`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink p-4 text-center text-white"
          >
            <div aria-hidden="true" className="stripe-bg absolute inset-x-0 bottom-0 h-3 opacity-90" />
            {/* TODO: real photo pending, add it to images-src/ and rebuild */}
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand-yellow" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span className="font-heading text-lg font-bold uppercase">{p.caption}</span>
            <span className="text-xs text-white/70">Photo coming soon</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-2 text-sm text-ink-soft">{p.caption}</figcaption>}
    </figure>
  );
}
