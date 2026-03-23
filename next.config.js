// next.config.js
const createMDX = require('@next/mdx');

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,
  images: {
    // ✅ REMOVED: unoptimized: true  ← this was killing LCP
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
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

const withMDX = createMDX({});

module.exports = withMDX(nextConfig);