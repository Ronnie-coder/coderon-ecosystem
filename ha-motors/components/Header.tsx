"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { business } from "@/lib/business";
import { routes } from "@/lib/site";
import { repairLink, rentalLink } from "@/lib/whatsapp";
import { ScrollRider } from "./ScrollRider";
import { Icon } from "./ui/Icon";
import { TrackedLink } from "./ui/TrackedLink";

const repairLinks = [
  { href: routes.repairs, label: "All repairs", hint: "Services, electrics, engines, tyres" },
  { href: routes.motorcycle, label: "Motorcycles", hint: "Commuter, delivery and big bikes" },
  { href: routes.scooter, label: "Scooters", hint: "All brands, all sizes" },
  { href: routes.quad, label: "Quad bikes", hint: "Sport and utility quads" },
];

const mainLinks = [
  { href: routes.rental, label: "Scooter Rental" },
  { href: routes.gallery, label: "Gallery" },
  { href: routes.about, label: "About" },
  { href: routes.faq, label: "FAQ" },
  { href: routes.contact, label: "Contact" },
];

const repairPaths: string[] = repairLinks.map((l) => l.href);

/** Logo is passed in from the server layout so the brand manifest stays out of the client bundle. */
export function Header({ logo, logoCompact }: { logo: ReactNode; logoCompact: ReactNode }) {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [repairsOpen, setRepairsOpen] = useState(false);
  const repairsRef = useRef<HTMLLIElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const rentalPage = pathname === routes.rental || pathname === routes.rentalTerms;
  const intent = rentalPage ? "rental" : "repair";
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

  const navLink = (active: boolean) =>
    `relative inline-flex min-h-11 items-center rounded-lg px-3 font-semibold transition-colors hover:bg-muted ${
      active ? "text-brand-green-dark after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:rounded after:bg-brand-yellow" : ""
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-[0_1px_0_rgb(22_24_27/0.06)] backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="relative">
      <div
        className={`relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 transition-[height,padding] duration-200 sm:px-6 ${
          compact ? "h-[62px] pb-2.5" : "h-[78px] pb-3.5"
        }`}
      >
        <Link href="/" className="shrink-0 rounded-lg" aria-label={`${business.name} home`}>
          <span className={compact ? "hidden" : "block"}>{logo}</span>
          <span className={compact ? "block" : "hidden"}>{logoCompact}</span>
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            <li ref={repairsRef} className="relative">
              <button
                type="button"
                aria-expanded={repairsOpen}
                aria-controls="repairs-menu"
                onClick={() => setRepairsOpen((o) => !o)}
                className={`${navLink(repairPaths.includes(pathname))} gap-1`}
              >
                Repairs <Icon name="chevronDown" className={`h-4 w-4 transition-transform ${repairsOpen ? "rotate-180" : ""}`} />
              </button>
              <ul
                id="repairs-menu"
                hidden={!repairsOpen}
                className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-black/10 bg-white p-2 shadow-xl"
              >
                {repairLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block rounded-xl px-3 py-2.5 hover:bg-muted"
                      aria-current={pathname === l.href ? "page" : undefined}
                    >
                      <span className="block font-semibold">{l.label}</span>
                      <span className="block text-sm text-ink-soft">{l.hint}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {mainLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={navLink(pathname === l.href)} aria-current={pathname === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <TrackedLink
            event="phone_click"
            intent={intent}
            href={business.phone.tel}
            className="hidden h-11 w-11 place-items-center rounded-xl border-2 border-ink/15 text-ink hover:bg-muted min-[380px]:grid"
            aria-label={`Call ${business.phone.display}`}
          >
            <Icon name="phone" className="h-5 w-5" />
          </TrackedLink>
          <TrackedLink
            event="whatsapp_click"
            intent={intent}
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
            className="grid h-11 w-11 place-items-center rounded-xl hover:bg-muted xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? "x" : "menu"} className="h-6 w-6" />
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      <ScrollRider />
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-black/10 bg-white xl:hidden"
      >
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-5 sm:grid-cols-2 sm:px-6">
          <div>
            <p className="px-3 pb-1 text-xs font-bold tracking-widest text-ink-soft uppercase">Repairs</p>
            <ul className="space-y-1">
              {repairLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className="flex min-h-12 flex-col justify-center rounded-xl px-3 py-1.5 hover:bg-muted aria-[current=page]:bg-muted"
                  >
                    <span className="text-lg font-semibold">{l.label}</span>
                    <span className="text-sm text-ink-soft">{l.hint}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="px-3 pb-1 text-xs font-bold tracking-widest text-ink-soft uppercase">More</p>
            <ul className="space-y-1">
              {mainLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className="flex min-h-12 items-center rounded-xl px-3 text-lg font-semibold hover:bg-muted aria-[current=page]:bg-muted"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-2 px-1">
              <TrackedLink
                event="phone_click"
                intent={intent}
                href={business.phone.tel}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-ink font-bold"
              >
                <Icon name="phone" className="h-5 w-5" /> Call {business.phone.local}
              </TrackedLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
