/**
 * Every absolute URL (canonical, sitemap, robots, Open Graph, JSON-LD) comes from here.
 * Switching to hamotors.co.za later = change NEXT_PUBLIC_SITE_URL and redeploy.
 */
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  // Fallbacks so previews still produce valid absolute URLs.
  // Netlify sets URL (the site's main address) and DEPLOY_PRIME_URL (branch/preview address) at build time.
  const netlify = process.env.CONTEXT === "production" ? process.env.URL : (process.env.DEPLOY_PRIME_URL ?? process.env.URL);
  if (netlify) return netlify.replace(/\/+$/, "");
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const routes = {
  home: "/",
  repairs: "/repairs",
  about: "/about",
  faq: "/faq",
  motorcycle: "/motorcycle-repairs-bloemfontein",
  scooter: "/scooter-repairs-bloemfontein",
  quad: "/quad-bike-repairs-bloemfontein",
  rental: "/scooter-rental-bloemfontein",
  contact: "/contact",
  rentalTerms: "/rental-terms",
  privacy: "/privacy-policy",
  cookies: "/cookie-policy",
  gallery: "/gallery",
} as const;
