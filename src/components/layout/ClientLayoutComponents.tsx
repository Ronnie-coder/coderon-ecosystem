// src/components/layout/ClientLayoutComponents.tsx
"use client";

import Navbar from "@/components/Navbar";
import { BackToTopButton } from '@/components/BackToTopButton';
import CookieBanner from "@/components/layout/CookieBanner";

// ✅ REMOVED GoogleAnalytics from here
// ✅ GA already handled by AnalyticsWrapper in layout.tsx
// ✅ Was loading GA scripts TWICE — doubling network requests

export const ClientLayoutComponents = () => {
  return (
    <>
      <Navbar />
      <BackToTopButton />
      <CookieBanner />
    </>
  );
};