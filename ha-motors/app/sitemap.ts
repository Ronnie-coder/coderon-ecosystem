import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: routes.home, priority: 1, changeFrequency: "weekly" },
    { path: routes.rental, priority: 0.9, changeFrequency: "weekly" },
    { path: routes.motorcycle, priority: 0.9, changeFrequency: "monthly" },
    { path: routes.scooter, priority: 0.9, changeFrequency: "monthly" },
    { path: routes.quad, priority: 0.8, changeFrequency: "monthly" },
    { path: routes.contact, priority: 0.8, changeFrequency: "monthly" },
    { path: routes.rentalTerms, priority: 0.4, changeFrequency: "yearly" },
    { path: routes.privacy, priority: 0.2, changeFrequency: "yearly" },
    { path: routes.cookies, priority: 0.2, changeFrequency: "yearly" },
  ];
  return pages.map((p) => ({ url: absoluteUrl(p.path), lastModified, changeFrequency: p.changeFrequency, priority: p.priority }));
}
