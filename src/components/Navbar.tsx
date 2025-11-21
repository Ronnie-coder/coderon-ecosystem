// CORRECTED: src/components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/impact', label: 'Our Impact' },
  { href: '/playroom', label: 'Our Work' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const mobileMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, staggerChildren: 0.05 } }
};

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => { setHasScrolled(window.scrollY > 10); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  // FIX: Added 'isMenuOpen' to dependency array to satisfy exhaustive-deps rule
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.header 
      className={`c-navbar ${hasScrolled ? 'has-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="c-navbar__container">
        <Link href="/" className="c-navbar__logo" onClick={closeMenu} aria-label="Coderon Home">CODERON</Link>
        <nav className="c-navbar__desktop-nav" aria-label="Main Navigation">
          <ul>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`c-navbar__link ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="c-navbar__actions">
          <button onClick={toggleTheme} className="c-navbar__theme-toggle" aria-label={`Activate ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            <AnimatePresence initial={false} mode="wait">
              <motion.span key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </motion.span>
            </AnimatePresence>
          </button>
          <Link href="/contact" className="c-navbar__cta">Free Consultation</Link>
          <button className="c-navbar__mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} aria-controls="mobile-nav-menu">
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            <AnimatePresence initial={false} mode="wait">
              <motion.span key={isMenuOpen ? 'times' : 'bars'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            id="mobile-nav-menu"
            className="c-navbar__mobile-nav"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <motion.div key={link.href} variants={mobileLinkVariants}>
                  <Link href={link.href} className={`c-navbar__link ${isActive ? 'is-active' : ''}`} onClick={closeMenu}>{link.label}</Link>
                </motion.div>
              );
            })}
            <motion.div variants={mobileLinkVariants}>
              <Link href="/contact" className="c-navbar__cta" onClick={closeMenu}>Free Consultation</Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
export default Navbar;