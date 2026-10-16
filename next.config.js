const createMDX = require('@next/mdx');

const securityHeaders = [
  // 1. Forces secure HTTPS connections
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  // 2. Prevents Clickjacking
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  // 3. Prevents MIME Sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // 4. Protects user privacy tracking
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  // 5. Hardware Lock
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  },
  // 6. Optimizes DNS resolution
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  // 7. Content Security Policy for the A+ grade - UPDATED FOR EXTERNAL SCRIPTS & IFRAMES
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com https://js.stripe.com https://www.paypal.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; frame-src 'self' https://cdn.botpress.cloud https://lottie.host https://js.stripe.com https://www.paypal.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://va.vercel-scripts.com https://vitals.vercel-insights.com;"
  }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,
  
  // --- RETIRED SERVICE PAGES ---
  // The 5 old services were merged into 4 clearer offers; keep old links working.
  async redirects() {
    return [
      ...['ai-solutions', 'digital-transformation', 'business-automation'].map((slug) => ({
        source: `/services/${slug}`,
        destination: '/services/custom-software/',
        permanent: true,
      })),
      // /impact duplicated the Work page.
      { source: '/impact', destination: '/playroom/', permanent: true },
    ];
  },

  // --- SECURITY HEADERS ---
  async headers() {
    return [
      {
        // Apply these headers to ALL routes in the application
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  images: {
    // ✅ REMOVED: unoptimized: true  ← this was killing LCP
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    qualities: [25, 50, 75, 90, 95, 100], // ✅ Added to fix the console warning
    minimumCacheTTL: 60,
  },
  // ✅ Compress responses
  compress: true,
  // ✅ Reduce bundle size
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'react-icons',
      'lottie-react',
    ],
  },
};

// MDX here has no frontmatter support, so a post's "--- title: ... ---" block was parsed as a
// divider plus a heading and shown at the top of every article. This drops it (gray-matter
// still reads it in src/lib/journal.ts).
function remarkStripFrontmatter() {
  return (tree) => {
    const [first, second] = tree.children;
    if (first && first.type === 'thematicBreak' && second && second.type === 'heading') {
      tree.children.splice(0, 2);
    }
  };
}

const withMDX = createMDX({ options: { remarkPlugins: [remarkStripFrontmatter] } });

module.exports = withMDX(nextConfig);