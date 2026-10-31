"use client";

import { useConsent } from "./ConsentProvider";

export function CookieSettingsLink({ className = "" }: { className?: string }) {
  const { openPreferences } = useConsent();
  return (
    <button type="button" onClick={openPreferences} className={className}>
      Cookie settings
    </button>
  );
}
