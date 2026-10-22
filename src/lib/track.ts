// Small analytics helper. Events go to Google Analytics (only loaded after the visitor
// accepts analytics cookies). Without consent, calls are simply dropped.
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    clarity?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.gtag === 'function') window.gtag('event', event, params);
    if (typeof window.clarity === 'function') window.clarity('event', event);
  } catch {}
}
