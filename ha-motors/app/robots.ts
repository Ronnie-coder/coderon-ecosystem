import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site";

// Netlify sets CONTEXT at build time. Branch and preview builds tell search engines to stay out,
// so only the live site gets indexed.
export default function robots(): MetadataRoute.Robots {
  const context = process.env.CONTEXT;
  if (context && context !== "production") return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
