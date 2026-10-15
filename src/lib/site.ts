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
  logo: `${SITE_URL}/apple-touch-icon.png`,
  image: `${SITE_URL}/og-image.jpg`,
  email: BUSINESS.email,
  telephone: BUSINESS.phone,
  description:
    'Coderon builds fast, mobile-friendly websites with local SEO set-up, and custom software that saves businesses time.',
  founder: { '@type': 'Person', name: 'Ronnie Nyamhute' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  },
  areaServed: ['South Africa', 'United Kingdom', 'United States', 'Australia', 'Europe'],
  sameAs: BUSINESS.sameAs,
  knowsAbout: ['Website design', 'Website speed optimisation', 'Local SEO set-up', 'Custom software', 'Business automation'],
};
