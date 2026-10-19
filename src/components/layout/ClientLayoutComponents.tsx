"use client";

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import { BackToTopButton } from '@/components/BackToTopButton';
import CookieBanner from "@/components/layout/CookieBanner";
import Reveal from '@/components/motion/Reveal';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

// "top" renders before <main> (navbar); "bottom" renders after the footer so the floating
// buttons and cookie notice come last in keyboard order. Hidden on admin routes.
export const ClientLayoutComponents = ({ part = 'top' }: { part?: 'top' | 'bottom' }) => {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  if (part === 'top') {
    return (
      <>
        <Navbar />
        <Reveal />
      </>
    );
  }
  return (
    <>
      <aside aria-label="Quick actions">
        <WhatsAppButton />
        <BackToTopButton />
      </aside>
      <CookieBanner />
    </>
  );
};
