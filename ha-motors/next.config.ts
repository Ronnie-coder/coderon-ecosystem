import type { NextConfig } from "next";

// This app lives inside another repo; pin the root so the parent project is never picked up.
const root = process.cwd();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root },
  outputFileTracingRoot: root,
  // Inline the (small) Tailwind CSS into the HTML: removes the render-blocking request on slow mobile data.
  experimental: { inlineCss: true },
  images: {
    formats: ["image/avif", "image/webp"],
    // Photos are WhatsApp quality (400 to 1280px). Never generate sizes above that.
    deviceSizes: [400, 640, 828, 1080, 1280],
    imageSizes: [64, 128, 256, 320],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
