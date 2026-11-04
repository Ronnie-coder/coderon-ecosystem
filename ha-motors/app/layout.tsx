import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { ConsentDefaults, ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieBanner, PreferencesModal } from "@/components/consent/CookieBanner";
import { BackToTop } from "@/components/BackToTop";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { Motion } from "@/components/motion/Motion";
import { business } from "@/lib/business";
import { businessSchema } from "@/lib/schema";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Motorcycle Repairs Bloemfontein | Mobile Mechanic | ${business.name}`,
    template: `%s | ${business.name}`,
  },
  description: `Mobile motorcycle, scooter and quad bike repairs anywhere in ${business.area.city}. All brands. Delivery scooter rental from ${business.rental.priceDisplay}/week.`,
  applicationName: business.name,
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: business.name,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#16181B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-ZA" className={`${barlow.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-reveal styles only apply when they can be undone. */}
        <script
          dangerouslySetInnerHTML={{
            // Failsafe: if the site's JS never starts (very old browser, blocked script), un-hide content after 4s.
            __html:
              "(function(){var d=document.documentElement;if('IntersectionObserver' in window){d.classList.add('js');setTimeout(function(){if(!window.__haMotion)d.classList.remove('js')},4000)}})()",
          }}
        />
        <ConsentDefaults />
      </head>
      <body className="min-h-dvh antialiased">
        <ConsentProvider>
          <Header
            logo={<Logo variant="horizontal" tone="light" height={40} priority />}
            logoCompact={<Logo variant="horizontal" tone="light" height={32} />}
          />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <aside aria-label="Quick actions">
            <BackToTop />
            <FloatingWhatsApp />
          </aside>
          <Motion />
          <CookieBanner />
          <PreferencesModal />
        </ConsentProvider>
        <JsonLd data={businessSchema()} />
      </body>
    </html>
  );
}
