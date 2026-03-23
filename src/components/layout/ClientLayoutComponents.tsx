// src/components/layout/ClientLayoutComponents.tsx

"use client"; // This is the most important part

import Navbar from "@/components/Navbar";
import { BackToTopButton } from '@/components/BackToTopButton';
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/layout/CookieBanner";

/**
 * This component wraps all layout elements that are client-side only.
 * By using this in the root layout with Suspense, we prevent server-rendering
 * errors from hooks like usePathname or useSearchParams that might be used
 * in GoogleAnalytics or CookieBanner.
 */
export const ClientLayoutComponents = () => {
  return (
    <>
      <Navbar />
      <BackToTopButton />
      <GoogleAnalytics />
      <CookieBanner />
    </>
  );
};