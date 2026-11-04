"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * "← Back" link for inner pages. If the visitor came from another page on this site it goes back
 * (keeping their scroll position); otherwise (e.g. they arrived from Google) it goes to `fallback`.
 * It's a real link, so it still works without JavaScript.
 */
export function BackButton({ fallback = "/", label = "Back", tone = "light" }: { fallback?: string; label?: string; tone?: "light" | "dark" }) {
  const router = useRouter();
  const dark = tone === "dark";
  return (
    <Link
      href={fallback}
      onClick={(e) => {
        const navs = (window as Window & { __haNavs?: number }).__haNavs ?? 1;
        let sameSite = false;
        try {
          sameSite = Boolean(document.referrer) && new URL(document.referrer).origin === window.location.origin;
        } catch {
          sameSite = false;
        }
        // Go back only if the previous page was on this site; otherwise use the normal link.
        if ((navs > 1 || sameSite) && window.history.length > 1) {
          e.preventDefault();
          router.back();
        }
      }}
      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 px-4 text-sm font-bold transition-colors active:scale-[0.98] ${
        dark ? "border-white/30 text-white hover:border-white hover:bg-white/10" : "border-ink/15 text-ink hover:border-ink hover:bg-muted"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </Link>
  );
}
