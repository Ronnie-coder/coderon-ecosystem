"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const navLinks = [
  { href: '/services', label: 'Services', title: 'Capabilities' },
  { href: '/playroom', label: 'Work', title: 'Case Studies' },
  { href: '/journal', label: 'Journal', title: 'Insights' },
  { href: 'https://quotepilot.coderon.co.za', label: 'QuotePilot', isExternal: true, isNew: true, title: 'Invoicing Tool' },
  { href: '/about', label: 'About', title: 'Company' },
];

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header 
      className={`c-navbar ${hasScrolled ? 'has-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      itemScope 
      itemType="http://schema.org/WPHeader"
    >
      <div className="c-navbar__container">
        <Link 
          href="/" 
          className="c-navbar__logo" 
          aria-label="Coderon Home"
          onClick={() => setIsMenuOpen(false)}
        >
          CODERON
        </Link>

        <nav className="c-navbar__desktop-nav" role="navigation">
          <ul>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className={`c-navbar__link ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    title={link.title}
                    target={link.isExternal ? "_blank" : "_self"}
                  >
                    {link.label}
                    {link.isNew && <span className="c-navbar__badge">NEW</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="c-navbar__actions">
          <button 
            onClick={toggleTheme} 
            className="c-navbar__theme-toggle" 
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          
          <Link href="/contact" className="c-navbar__cta">
            Proposal
          </Link>
          
          <button 
            className="c-navbar__mobile-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-expanded={isMenuOpen} 
            aria-controls="mobile-nav-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
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
                <Link 
                  key={link.label}
                  href={link.href} 
                  className={`c-navbar__mobile-link ${isActive ? 'is-active' : ''}`} 
                  onClick={() => setIsMenuOpen(false)}
                  target={link.isExternal ? "_blank" : "_self"}
                >
                  {link.label}
                  {link.isNew && <span className="c-navbar__badge--mobile">NEW</span>}
                </Link>
              );
            })}
            <Link href="/contact" className="c-navbar__mobile-cta" onClick={() => setIsMenuOpen(false)}>
              Start Project
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
export default Navbar;