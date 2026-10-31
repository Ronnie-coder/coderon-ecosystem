"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { business } from "@/lib/business";
import { routes } from "@/lib/site";
import { repairLink, rentalLink } from "@/lib/whatsapp";
import { Icon } from "./ui/Icon";
import { TrackedLink } from "./ui/TrackedLink";

const repairLinks = [
  { href: routes.motorcycle, label: "Motorcycles" },
  { href: routes.scooter, label: "Scooters" },
  { href: routes.quad, label: "Quad Bikes" },
];

/** Logo is passed in from the server layout so the brand manifest stays out of the client bundle. */
export function Header({ logo, logoCompact }: { logo: ReactNode; logoCompact: ReactNode }) {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [repairsOpen, setRepairsOpen] = useState(false);
  const repairsRef = useRef<HTMLLIElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const rentalPage = pathname === routes.rental || pathname === routes.rentalTerms;
  const waHref = rentalPage ? rentalLink : repairLink();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setMenuOpen(false);
    setRepairsOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  // Desktop dropdown: close on outside click / Escape.
  useEffect(() => {
    if (!repairsOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!repairsRef.current?.contains(e.target as Node)) setRepairsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setRepairsOpen(false);
        repairsRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [repairsOpen]);

  // Mobile menu: Escape closes and returns focus; lock body scroll.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLink = "rounded-lg px-3 py-2 font-semibold hover:bg-muted";

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className={`mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 transition-[height] duration-200 sm:px-6 ${compact ? "h-14" : "h-[4.5rem]"}`}>
        <Link href="/" className="shrink-0 rounded-lg" aria-label={`${business.name} home`}>
          <span className={compact ? "hidden" : "block"}>{logo}</span>
          <span className={compact ? "block" : "hidden"}>{logoCompact}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li ref={repairsRef} className="relative">
              <button
                type="button"
                aria-expanded={repairsOpen}
                aria-controls="repairs-menu"
                onClick={() => setRepairsOpen((o) => !o)}
                className={`${navLink} inline-flex min-h-11 items-center gap-1`}
              >
                Repairs <Icon name="chevronDown" className={`h-4 w-4 transition-transform ${repairsOpen ? "rotate-180" : ""}`} />
              </button>
              <ul
                id="repairs-menu"
                hidden={!repairsOpen}
                className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-black/10 bg-white p-2 shadow-xl"
              >
                {repairLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block rounded-lg px-3 py-2.5 font-semibold hover:bg-muted" aria-current={pathname === l.href ? "page" : undefined}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><Link href={routes.rental} className={`${navLink} inline-flex min-h-11 items-center`} aria-current={pathname === routes.rental ? "page" : undefined}>Scooter Rental</Link></li>
            <li><Link href={routes.gallery} className={`${navLink} inline-flex min-h-11 items-center`}>Gallery</Link></li>
            <li><Link href={routes.contact} className={`${navLink} inline-flex min-h-11 items-center`} aria-current={pathname === routes.contact ? "page" : undefined}>Contact</Link></li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <TrackedLink
            event="phone_click"
            intent={rentalPage ? "rental" : "repair"}
            href={business.phone.tel}
            className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink/15 text-ink hover:bg-muted"
            aria-label={`Call ${business.phone.display}`}
          >
            <Icon name="phone" className="h-5 w-5" />
          </TrackedLink>
          <TrackedLink
            event="whatsapp_click"
            intent={rentalPage ? "rental" : "repair"}
            href={waHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-green-dark px-3 py-2 font-bold text-white hover:bg-[#0f4a20] sm:px-4"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
            <span className="hidden sm:inline">WhatsApp Us</span>
            <span className="sr-only sm:hidden">WhatsApp Us</span>
          </TrackedLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl hover:bg-muted lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? "x" : "menu"} className="h-6 w-6" />
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-black/10 bg-white lg:hidden"
      >
        <ul className="mx-auto max-w-6xl space-y-1 px-4 py-4">
          <li className="px-3 pt-1 pb-1 text-xs font-bold tracking-widest text-ink-soft uppercase">Repairs</li>
          {repairLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="flex min-h-12 items-center rounded-lg px-3 text-lg font-semibold hover:bg-muted">
                {l.label}
              </Link>
            </li>
          ))}
          <li className="my-2 border-t border-black/10" aria-hidden="true" />
          <li><Link href={routes.rental} className="flex min-h-12 items-center rounded-lg px-3 text-lg font-semibold hover:bg-muted">Scooter Rental</Link></li>
          <li><Link href={routes.gallery} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center rounded-lg px-3 text-lg font-semibold hover:bg-muted">Gallery</Link></li>
          <li><Link href={routes.contact} className="flex min-h-12 items-center rounded-lg px-3 text-lg font-semibold hover:bg-muted">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
