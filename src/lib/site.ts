// Single source of truth for site-wide SEO facts.
export const SITE_URL = 'https://www.coderon.co.za';
export const SITE_NAME = 'Coderon';

// The site uses `trailingSlash: true`, so every canonical URL must end in "/"
// (otherwise the canonical points at a redirect).
export function canonical(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${clean}/` : '/';
}

export const BUSINESS = {
  legalName: 'Coderon (Pty) Ltd',
  email: 'info@coderon.co.za',
  phone: '+27 67 818 4898',
  city: 'Cape Town',
  region: 'Western Cape',
  country: 'ZA',
  sameAs: [
    'https://github.com/Ronnie-coder',
    'https://www.linkedin.com/in/ronnie-nyamhute-8b302b360',
    'https://x.com/Coderon28',
    'https://www.facebook.com/profile.php?id=61586558918279',
  ],
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: BUSINESS.legalName,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon-512.png`,
  image: `${SITE_URL}/og-image.jpg`,
  email: BUSINESS.email,
  telephone: BUSINESS.phone,
  description:
    'Coderon is a Cape Town web studio that builds fast, mobile-friendly websites with local SEO set-up for small businesses, and custom software that saves teams time.',
  founder: { '@type': 'Person', name: 'Ronnie Nyamhute' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  },
  priceRange: 'R2,500 - R16,500',
  areaServed: ['Cape Town', 'South Africa', 'United Kingdom', 'United States', 'Australia', 'Europe'],
  sameAs: BUSINESS.sameAs,
  knowsAbout: ['Website design', 'Website speed optimisation', 'Local SEO set-up', 'Custom software', 'Business automation'],
};

/** Shortens text for a meta description (Google shows about 155-160 characters). */
export function metaDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const firstSentence = clean.match(/^.*?[.!?](\s|$)/)?.[0]?.trim();
  if (firstSentence && firstSentence.length >= 70 && firstSentence.length <= max) return firstSentence;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
}

/** Page title for the <title> tag: drops the " | Coderon" suffix when it would push past ~60 characters. */
export function seoTitle(title: string): string | { absolute: string } {
  return title.length + ' | Coderon'.length > 62 ? { absolute: title } : title;
}
