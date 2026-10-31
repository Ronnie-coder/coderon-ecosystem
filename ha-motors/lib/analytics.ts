type Intent = "repair" | "rental";
type EventName = "whatsapp_click" | "phone_click" | "generate_lead";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let analyticsAllowed = false;

/** Called by the consent provider. Events are dropped (not queued) until analytics consent exists. */
export function setAnalyticsAllowed(allowed: boolean): void {
  analyticsAllowed = allowed;
}

export function track(name: EventName, intent: Intent): void {
  if (!analyticsAllowed || typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, { page: window.location.pathname, intent });
}
