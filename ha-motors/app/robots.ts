import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site";

// Vercel already sends `X-Robots-Tag: noindex` on preview deployment URLs, so production stays indexable
// while previews stay out of search.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
