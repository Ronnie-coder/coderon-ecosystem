"use client";

import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

const CookieBanner = () => (
  <section aria-label="Cookie notice">
  <CookieConsent
    location="bottom"
    buttonText="Okay"
    cookieName="coderonCookieConsent"
    disableStyles
    containerClasses="fixed inset-x-3 bottom-3 z-50 flex flex-col items-start gap-3 rounded-2xl border-2 border-ink bg-card p-4 text-sm text-ink shadow-hard sm:inset-x-auto sm:left-3 sm:max-w-md sm:flex-row sm:items-center"
    contentClasses="flex-1"
    buttonClasses="btn-primary !py-2 text-sm"
    expires={150}
  >
    We use cookies to see which pages help people most. Read our{' '}
    <Link href="/privacy-policy/" className="link-underline font-semibold">
      privacy policy
    </Link>
    .
  </CookieConsent>
  </section>
);

export default CookieBanner;
