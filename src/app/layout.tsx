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
    default: "Coderon | Technical Partner for Founders",
  },
  description:
    "Coderon is the technical partner for non-technical founders. We translate your business vision into custom software, scalable systems, and AI automation.",
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
    "technical partner for founders",
    "startup development agency"
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
    title:       "Coderon | Technical Partner for Founders",
    description: "Coderon is the technical partner for non-technical founders. We translate your business vision into custom software, scalable systems, and AI automation.",
    url:         siteUrl,
    siteName:    'Coderon',
    images: [{
      url:    '/og-image.png',
      width:  1200,
      height: 630,
      alt:    'Coderon — Technical Partner for Founders',
    }],
    locale: 'en_ZA',
    type:   'website',
  },

  twitter: {
    card:        'summary_large_image',
    title:       "Coderon | Technical Partner for Founders",
    description: "Coderon is the technical partner for non-technical founders. We translate your business vision into custom software, scalable systems, and AI automation.",
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
      data-scroll-behavior="smooth" // ✅ Added to fix smooth scroll warning
    >
      <head>
        {/* ✅ Google Analytics 4 Script - Injected safely for Next.js App Router */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-TQQX3FHT1B`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TQQX3FHT1B');
            `,
          }}
        />
      </head>
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