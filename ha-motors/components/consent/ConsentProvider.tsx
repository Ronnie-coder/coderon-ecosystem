"use client";

import Script from "next/script";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { setAnalyticsAllowed } from "@/lib/analytics";

/** Bump this when the cookie policy changes materially: every visitor is asked again. */
export const CONSENT_POLICY_VERSION = 1;
const COOKIE = "ha_consent";
const MAX_AGE = 60 * 60 * 24 * 365; // 12 months
const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "";

export type ConsentChoices = { analytics: boolean; marketing: boolean };

type ConsentState = ConsentChoices & {
  /** null until read on the client; false = visitor hasn't chosen yet */
  decided: boolean | null;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (c: ConsentChoices) => void;
  preferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
};

const ConsentContext = createContext<ConsentState | null>(null);

export function useConsent(): ConsentState {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}

function readCookie(): ConsentChoices | null {
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE}=`));
  if (!raw) return null;
  try {
    const v = JSON.parse(decodeURIComponent(raw.slice(COOKIE.length + 1))) as { v?: number; a?: boolean; m?: boolean };
    if (v.v !== CONSENT_POLICY_VERSION) return null; // policy changed: ask again
    return { analytics: Boolean(v.a), marketing: Boolean(v.m) };
  } catch {
    return null;
  }
}

function writeCookie(c: ConsentChoices) {
  const value = encodeURIComponent(JSON.stringify({ v: CONSENT_POLICY_VERSION, a: c.analytics, m: c.marketing, t: Date.now() }));
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

function updateGoogleConsent(c: ConsentChoices) {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
  });
}

function clearGaCookies() {
  const host = location.hostname;
  for (const c of document.cookie.split("; ")) {
    const name = c.split("=")[0];
    if (name && (name === "_ga" || name.startsWith("_ga_") || name === "_gid")) {
      for (const domain of ["", `; Domain=${host}`, `; Domain=.${host}`]) {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain}`;
      }
    }
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [choices, setChoices] = useState<ConsentChoices>({ analytics: false, marketing: false });
  const [decided, setDecided] = useState<boolean | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const stored = readCookie();
    // Reading a cookie is an external system sync; setting state here is intentional.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (stored) {
      setChoices(stored);
      updateGoogleConsent(stored);
      setAnalyticsAllowed(stored.analytics && Boolean(GA_ID));
    }
    setDecided(Boolean(stored));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const save = useCallback((c: ConsentChoices) => {
    const hadAnalytics = choices.analytics;
    writeCookie(c);
    setChoices(c);
    setDecided(true);
    setPreferencesOpen(false);
    updateGoogleConsent(c);
    setAnalyticsAllowed(c.analytics && Boolean(GA_ID));
    if (!c.analytics) {
      clearGaCookies();
      // GA was already running in this page view: reload so nothing keeps collecting.
      if (hadAnalytics) location.reload();
    }
  }, [choices.analytics]);

  const value = useMemo<ConsentState>(
    () => ({
      ...choices,
      decided,
      acceptAll: () => save({ analytics: true, marketing: true }),
      rejectAll: () => save({ analytics: false, marketing: false }),
      save,
      preferencesOpen,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
    }),
    [choices, decided, preferencesOpen, save],
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {GA_ID && decided && choices.analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`} strategy="afterInteractive" />
          <Script id="ga-config" strategy="afterInteractive">
            {`gtag('js', new Date()); gtag('config', ${JSON.stringify(GA_ID)}, { anonymize_ip: true });`}
          </Script>
        </>
      )}
    </ConsentContext.Provider>
  );
}

/**
 * Google Consent Mode v2 defaults. Rendered in <head> before any Google tag.
 * Only defines gtag() and pushes "denied" defaults; it loads nothing from Google.
 */
export function ConsentDefaults() {
  // Hides the server-rendered cookie banner before first paint if a current-version choice exists.
  const pre = `try{var m=document.cookie.match(/(?:^|; )${COOKIE}=([^;]*)/);if(m&&JSON.parse(decodeURIComponent(m[1])).v===${CONSENT_POLICY_VERSION})document.documentElement.classList.add('ha-consented')}catch(e){}`;
  if (!GA_ID) return <script id="consent-pre" dangerouslySetInnerHTML={{ __html: pre }} />;
  const js = pre + `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`;
  return <script id="consent-defaults" dangerouslySetInnerHTML={{ __html: js }} />;
}
