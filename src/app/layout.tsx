// src/app/layout.tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { Suspense } from 'react';
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import "@/styles/demos.scss";
import { ClientLayoutComponents } from '@/components/layout/ClientLayoutComponents';
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
        {/* Older iPhones (iOS 15.3 and earlier) lack structuredClone, which Next.js's router uses.
            Its route data is plain JSON, so a JSON copy is a safe stand-in. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(typeof structuredClone!=='function'){window.structuredClone=function(v){return v===undefined?v:JSON.parse(JSON.stringify(v))}}",
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider>
          <Suspense fallback={null}>
            <ClientLayoutComponents />
          </Suspense>
          {/* ScrollSmoother moves #smooth-content; fixed UI (header, floating buttons, consent) stays outside it. */}
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <div aria-hidden="true" className="h-[72px]" />
              <main id="main">{children}</main>
              <Footer />
            </div>
          </div>
          <Suspense fallback={null}>
            <ClientLayoutComponents part="bottom" />
          </Suspense>
        </ThemeProvider>

        {/* ✅ Vercel analytics deferred */}
        <Analytics />
      </body>
    </html>
  );
}