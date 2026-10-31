"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '@/contexts/ThemeContext';
import { Logo } from '@/components/Logo';

const navLinks = [
  { href: '/services/', label: 'Services' },
  { href: '/playroom/', label: 'Work' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/about/', label: 'About' },
  { href: '/journal/', label: 'Journal' },
];

export const QUOTE_HREF = '/contact/';
export const WHATSAPP_HREF = 'https://wa.me/27678184898';

// Pathnames end in "/" (trailingSlash: true); a section stays active on its sub-pages.
const isActivePath = (pathname: string | null, href: string) =>
  !!pathname && (pathname === href || pathname.startsWith(href));

/** Small switch that turns site animations on or off. */
export function MotionSwitch({ className = '' }: { className?: string }) {
  const { motion, toggleMotion } = useTheme();
  const on = motion !== 'reduce';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={toggleMotion}
      className={`group inline-flex items-center gap-2 text-sm font-semibold ${className}`}
    >
      <span
        aria-hidden="true"
        className={`relative h-6 w-10 rounded-full border border-field transition-colors ${on ? 'bg-gold' : 'bg-transparent'}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-ink transition-[left] duration-200 ${on ? 'left-[18px]' : 'left-0.5'}`}
        />
      </span>
      Animations
    </button>
  );
}

export function ThemeButton({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`grid h-10 w-10 place-items-center rounded-full border border-transparent text-lg transition hover:bg-ink/[0.06] ${className}`}
    >
      {dark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
    </button>
  );
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        open ? 'border-line bg-paper' : scrolled ? 'border-line bg-paper/80 backdrop-blur-md' : 'border-transparent bg-paper'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-bold focus:text-[#16130E]"
      >
        Skip to content
      </a>
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="Coderon home" className="shrink-0 text-ink">
          <Logo height={28} animated />
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className="group relative rounded-lg px-3 py-2 text-[15px] font-medium text-ink/80 transition-colors hover:text-ink aria-[current=page]:text-ink"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-gold transition-transform duration-200 ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeButton />
          <Link href={QUOTE_HREF} className="btn-dark hidden !py-2.5 text-[15px] sm:inline-flex">
            Get a free quote
          </Link>
          <button
            type="button"
            className="btn-icon text-xl lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="mobile-nav container overflow-y-auto pb-10 pt-4 lg:hidden"
        >
          <ul className="divide-y divide-line">
            {navLinks.map((link, i) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className="flex items-center justify-between py-4 text-3xl font-semibold tracking-tight"
                  >
                    {link.label}
                    {active && <span aria-hidden="true" className="h-3 w-3 rounded-full bg-gold" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href={QUOTE_HREF} className="btn-primary mt-8 w-full text-lg">
            Get a free quote
          </Link>
          <div className="mt-8 flex items-center justify-between">
            <MotionSwitch />
            <ThemeButton className="border-line" />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
