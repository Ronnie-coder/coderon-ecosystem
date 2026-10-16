"use client";

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import { BackToTopButton } from '@/components/BackToTopButton';
import CookieBanner from "@/components/layout/CookieBanner";
import Reveal from '@/components/motion/Reveal';

export const ClientLayoutComponents = () => {
  const pathname = usePathname();

  // Hide all public layout elements on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Reveal />
      <BackToTopButton />
      <CookieBanner />
    </>
  );
};
