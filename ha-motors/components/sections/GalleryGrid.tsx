"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/photos";
import { Icon } from "../ui/Icon";

/**
 * Responsive grid of work photos. Tapping one opens a lightweight lightbox built on the native
 * <dialog> (focus trapped, Esc closes, arrow keys navigate). Optional "See more" expansion.
 */
export function GalleryGrid({ photos, initial }: { photos: Photo[]; initial?: number }) {
  const [expanded, setExpanded] = useState(!initial);
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const shown = expanded || !initial ? photos : photos.slice(0, initial);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dlg.addEventListener("keydown", onKey);
    return () => dlg.removeEventListener("keydown", onKey);
  }, [step]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((p, i) => (
          <li key={p.key}>
            <figure>
              <button
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                type="button"
                onClick={() => open(i)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-photo)] border border-black/10 bg-ink shadow-md"
                aria-label={p.ready ? `View larger: ${p.caption}` : `View larger: ${p.caption}. Photo coming soon`}
              >
                {p.ready ? (
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 270px, (min-width: 768px) 33vw, 50vw"
                    className="photo-treat object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-3 text-center text-white">
                    <Icon name="camera" className="h-7 w-7 text-brand-yellow" />
                    <span className="text-xs text-white/70">Photo coming soon</span>
                  </span>
                )}
              </button>
              <figcaption className="mt-2 text-sm leading-snug text-ink-soft">{p.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {initial && photos.length > initial && (
        <div className="mt-8 text-center">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((e) => !e)}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-ink px-5 font-bold hover:bg-ink hover:text-white"
          >
            {expanded ? "Show fewer" : `See more (${photos.length - initial})`}
            <Icon name="chevronDown" className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-label={current ? `Photo: ${current.caption}` : "Photo viewer"}
        onClose={() => {
          if (index !== null) triggerRefs.current[index]?.focus();
          setIndex(null);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close(); // click on backdrop
        }}
        className="m-auto max-h-[100dvh] w-full max-w-5xl bg-transparent p-3 backdrop:bg-black/85"
      >
        {current && (
          <figure className="relative">
            <div className="relative mx-auto overflow-hidden rounded-2xl bg-ink" style={{ maxWidth: current.ready ? current.width : undefined }}>
              {current.ready ? (
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="photo-treat mx-auto max-h-[78dvh] w-auto object-contain"
                />
              ) : (
                <div className="grid aspect-[4/3] place-items-center text-white">Photo coming soon</div>
              )}
            </div>
            <figcaption className="mt-3 text-center text-white">
              {current.caption} <span className="text-white/70">({(index ?? 0) + 1} of {photos.length})</span>
            </figcaption>
            <div className="mt-3 flex justify-center gap-3">
              <button type="button" onClick={() => step(-1)} className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink" aria-label="Previous photo">
                <Icon name="chevronLeft" className="h-6 w-6" />
              </button>
              <button type="button" onClick={close} className="grid h-12 w-12 place-items-center rounded-full bg-brand-yellow text-ink" aria-label="Close photo viewer" autoFocus>
                <Icon name="x" className="h-6 w-6" />
              </button>
              <button type="button" onClick={() => step(1)} className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink" aria-label="Next photo">
                <Icon name="chevronRight" className="h-6 w-6" />
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </>
  );
}
