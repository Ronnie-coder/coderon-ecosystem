// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Roboto_Mono } from 'next/font/google';
import { Suspense } from 'react';
import Script from 'next/script';
import Footer from "@/components/Footer";
import "@/styles/main.scss";
import { ClientLayoutComponents } from '@/components/layout/ClientLayoutComponents';
import { AnalyticsWrapper } from '@/components/AnalyticsWrapper';
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
  // ✅ Preload the most-used weight for LCP text
  preload: true,
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  // ✅ Don't preload mono — only used in code blocks
  preload: false,
});

const siteUrl = "https://www.coderon.co.za";

export const metadata: Metadata = {
  title: {
    template: "%s | Coderon",
    // ✅ Super short to prevent browser tab cutoff
    default: "Coderon | Software & AI",
  },
  description:
    "Coderon builds custom software, automation tools, and AI integrations for growing businesses. We replace manual processes with systems that save time, reduce costs, and scale with you.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  keywords: [
    "custom software development",
    "business automation",
    "AI integration",
    "Next.js development",
    "digital transformation",
    "internal tools development",
    "Coderon",
  ],
  authors:   [{ name: 'Coderon', url: siteUrl }],
  creator:   'Coderon',
  publisher: 'Coderon',

  verification: {
    other: {
      "facebook-domain-verification": "4opv8gyh8xr02w9n7sxq9psglc2bcl",
    },
  },

  openGraph: {
    title:       "Coderon | Software & AI",
    description: "We build the systems that help businesses run faster, cut costs, and scale. Custom software, automation, and AI — without the complexity.",
    url:         siteUrl,
    siteName:    'Coderon',
    images: [{
      url:    '/og-image.png',
      width:  1200,
      height: 630,
      alt:    'Coderon — Custom Software for Growing Businesses',
    }],
    locale: 'en_ZA',
    type:   'website',
  },

  twitter: {
    card:        'summary_large_image',
    title:       "Coderon | Software & AI",
    description: "We build the systems that help businesses run faster, cut costs, and scale.",
    creator:     '@Coderon28',
    images:      ['/og-image.png'],
  },

  icons: {
    icon:     '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple:    '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto_mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          {/* ✅ GA only in ONE place now */}
          <AnalyticsWrapper />
          <Suspense fallback={null}>
            <ClientLayoutComponents />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </ThemeProvider>

        {/* ✅ Vercel analytics deferred */}
        <Analytics />
      </body>
    </html>
  );
}