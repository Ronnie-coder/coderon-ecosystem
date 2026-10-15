"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Logo } from '@/components/Logo';

const navLinks = [
  { href: '/services/', label: 'Services' },
  { href: '/playroom/', label: 'Work'     },
  { href: '/pricing/',  label: 'Pricing'  },
  { href: '/about/',    label: 'About'    },
  { href: '/journal/',  label: 'Journal'  },
];

const CTA_HREF = '/contact/?topic=website';
const CTA_LABEL = 'Free website check';

// Pathnames end in "/" (trailingSlash: true); a section stays active on its sub-pages.
const isActivePath = (pathname: string | null, href: string) =>
  !!pathname && (pathname === href || pathname.startsWith(href));

const mobileMenuVariants = {
  hidden:  { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mounted, setMounted]         = useState(false);
  const { theme, toggleTheme }        = useTheme();
  const pathname                      = usePathname();

  // Prevent hydration mismatch for theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll detection — throttled via rAF
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setHasScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`c-navbar${hasScrolled ? ' has-scrolled' : ''}`}>
      <div className="c-navbar__container">

        {/* Logo */}
        <Link
          href="/"
          className="c-navbar__logo"
          aria-label="Coderon home"
          onClick={() => setIsMenuOpen(false)}
        >
          <Logo height={30} />
        </Link>

        {/* Desktop Nav */}
        <nav
          className="c-navbar__desktop-nav"
          aria-label="Main navigation"
        >
          <ul role="list">
            {navLinks.map((link) => {
              const isActive = isActivePath(pathname, link.href);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`c-navbar__link${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="c-navbar__actions">

          {/* Theme toggle - Hydration mismatch fixed */}
          <button
            onClick={toggleTheme}
            className="c-navbar__theme-toggle"
            aria-label={
              mounted && theme === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            {mounted ? (
              theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />
            ) : (
              <FiSun aria-hidden="true" className="opacity-0" />
            )}
          </button>

          {/* Desktop CTA */}
          <Link href={CTA_HREF} className="c-navbar__cta">
            {CTA_LABEL}
          </Link>

          {/* Mobile toggle */}
          <button
            className="c-navbar__mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? (
              <FaTimes aria-hidden="true" />
            ) : (
              <FaBars aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-nav-menu"
            className="c-navbar__mobile-nav"
            role="navigation"
            aria-label="Mobile navigation"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {navLinks.map((link) => {
              const isActive = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`c-navbar__mobile-link${isActive ? ' is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile CTA */}
            <Link
              href={CTA_HREF}
              className="c-navbar__mobile-cta"
              onClick={() => setIsMenuOpen(false)}
            >
              {CTA_LABEL}
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;