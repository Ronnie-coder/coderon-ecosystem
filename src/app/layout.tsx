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
  // Removed '900' — not used. Added '600' — used in buttons/headings.
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const siteUrl = "https://www.coderon.co.za";

export const metadata: Metadata = {
  title: {
    template: "%s | Coderon",
    // Clear, specific — answers "what do you do" immediately
    default: "Coderon — Custom Software, Automation & AI for African Businesses",
  },
  // Specific outcomes — no vague "transforming landscapes"
  description:
    "Coderon builds custom software, automation tools, and AI integrations for African businesses. We replace manual processes with systems that save time, reduce costs, and scale with you.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  keywords: [
    "custom software South Africa",
    "business automation South Africa",
    "AI integration Africa",
    "Next.js development South Africa",
    "digital transformation Africa",
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
    title:       "Coderon — Custom Software, Automation & AI for African Businesses",
    description: "We build the systems that help African businesses run faster, cut costs, and scale. Custom software, automation, and AI — without the complexity.",
    url:         siteUrl,
    siteName:    'Coderon',
    images: [{
      url:    '/og-image.png',
      width:  1200,
      height: 630,
      alt:    'Coderon — Custom Software for African Businesses',
    }],
    locale: 'en_ZA',
    type:   'website',
  },

  twitter: {
    card:        'summary_large_image',
    title:       "Coderon — Custom Software, Automation & AI for African Businesses",
    description: "We build the systems that help African businesses run faster, cut costs, and scale.",
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
          <AnalyticsWrapper />
          <Suspense fallback={null}>
            <ClientLayoutComponents />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />

        {/* Botpress chatbot — lazy loaded, no impact on Core Web Vitals */}
        <Script
          src="https://cdn.botpress.cloud/webchat/v3.3/inject.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://files.bpcontent.cloud/2025/04/29/07/20250429074103-1NATVXCY.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}