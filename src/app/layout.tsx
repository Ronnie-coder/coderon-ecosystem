// src/app/layout.tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { Suspense } from 'react';
import Script from 'next/script';
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import "@/styles/demos.scss";
import { ClientLayoutComponents } from '@/components/layout/ClientLayoutComponents';
import { AnalyticsWrapper } from '@/components/AnalyticsWrapper';
import { ThemeProvider, prefsBootScript } from "@/contexts/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL, organizationJsonLd } from "@/lib/site";

const sans = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-mono',
  preload: false,
});

const DEFAULT_TITLE = 'Web Design Cape Town & Custom Software for Small Businesses | Coderon';
const DEFAULT_DESCRIPTION =
  'Coderon builds fast, mobile-friendly websites that Google can understand, and custom software that saves your team time. Based in Cape Town, working worldwide.';

export const metadata: Metadata = {
  title: {
    template: '%s | Coderon',
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  // No site-wide canonical: each page declares its own. (A canonical of "/" here was
  // inherited by every page without one, telling Google they were copies of the homepage.)
  authors:   [{ name: 'Ronnie Nyamhute', url: SITE_URL }],
  creator:   'Coderon',
  publisher: 'Coderon',

  verification: {
    other: {
      "facebook-domain-verification": "4opv8gyh8xr02w9n7sxq9psglc2bcl",
    },
  },

  openGraph: {
    title:       DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url:         `${SITE_URL}/`,
    siteName:    'Coderon',
    images: [{
      url:    '/og-image.jpg',
      width:  1200,
      height: 630,
      alt:    'Coderon: websites and custom software',
    }],
    locale: 'en_ZA',
    type:   'website',
  },

  twitter: {
    card:        'summary_large_image',
    title:       DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator:     '@Coderon28',
    images:      ['/og-image.jpg'],
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth" // ✅ Added to fix smooth scroll warning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsBootScript }} />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider>
          {/* ✅ GA only in ONE place now */}
          <AnalyticsWrapper />
          <Suspense fallback={null}>
            <ClientLayoutComponents />
          </Suspense>
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>

        {/* ✅ Vercel analytics deferred */}
        <Analytics />
      </body>
    </html>
  );
}