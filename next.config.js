// next.config.js

const createMDX = require('@next/mdx');

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,
  images: {
    unoptimized: true,
    qualities: [75, 80, 90],
  },
};

const withMDX = createMDX({
  // Add MDX options here, if needed.
});

module.exports = withMDX(nextConfig);