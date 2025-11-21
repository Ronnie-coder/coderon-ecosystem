// src/components/NavLinks.tsx

"use client"; // This MUST be a client component because it uses a hook

import { usePathname } from 'next/navigation';
import Link from 'next/link';

// You might need to adjust this list to match your actual navigation
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/impact', label: 'Our Impact' },
  { href: '/playroom', label: 'Playroom' },
];

export const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="c-navbar__nav-links">
      {navLinks.map((link) => {
        // You can add logic here to apply an "active" class if you want
        // const isActive = pathname === link.href;
        return (
          <li key={link.href} className="c-navbar__link">
            <Link href={link.href}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};