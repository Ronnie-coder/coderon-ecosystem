// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

// QuotePilot removed from nav — it lives in the dedicated CTA section
const navLinks = [
  { href: '/services',  label: 'Services', title: 'What We Build'   },
  { href: '/playroom',  label: 'Work',     title: 'Case Studies'    },
  { href: '/journal',   label: 'Journal',  title: 'Insights'        },
  { href: '/about',     label: 'About',    title: 'Our Story'       },
];

const mobileMenuVariants = {
  hidden:  { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { theme, toggleTheme }        = useTheme();
  const pathname                      = usePathname();

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
    <motion.header
      className={`c-navbar${hasScrolled ? ' has-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      itemScope
      itemType="http://schema.org/WPHeader"
    >
      <div className="c-navbar__container">

        {/* Logo */}
        <Link
          href="/"
          className="c-navbar__logo"
          aria-label="Coderon — go to homepage"
          onClick={() => setIsMenuOpen(false)}
        >
          CODERON
        </Link>

        {/* Desktop Nav */}
        <nav
          className="c-navbar__desktop-nav"
          aria-label="Main navigation"
        >
          <ul role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`c-navbar__link${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    title={link.title}
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

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="c-navbar__theme-toggle"
            aria-label={
              theme === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            {theme === 'dark' ? (
              <FiSun aria-hidden="true" />
            ) : (
              <FiMoon aria-hidden="true" />
            )}
          </button>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="c-navbar__cta"
            aria-label="Get a project proposal from Coderon"
          >
            Get a Proposal
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
              const isActive = pathname === link.href;
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

            {/* Mobile CTA — consistent with desktop */}
            <Link
              href="/contact"
              className="c-navbar__mobile-cta"
              aria-label="Get a project proposal from Coderon"
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Proposal
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;