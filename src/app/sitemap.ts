import { MetadataRoute } from 'next';
import { services } from '@/data/servicesData';
import { liveProjects, interactiveDemos } from '@/data/playroomData';
import { getJournalEntries } from '@/lib/journal';
import { SITE_URL, canonical } from '@/lib/site';

// Bump when page copy changes so Google re-crawls.
const SITE_UPDATED = '2026-10-15';

const url = (path: string) => `${SITE_URL}${canonical(path)}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: url(''), lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 1 },
    { url: url('services'), lastModified: SITE_UPDATED, priority: 0.9 },
    ...services.map((s) => ({ url: url(`services/${s.slug}`), lastModified: SITE_UPDATED, priority: 0.9 })),
    { url: url('playroom'), lastModified: SITE_UPDATED, priority: 0.8 },
    ...liveProjects.map((p) => ({ url: url(`playroom/${p.id}`), lastModified: SITE_UPDATED, priority: 0.7 })),
    ...interactiveDemos.map((d) => ({ url: url(`playroom/${d.id}`), lastModified: SITE_UPDATED, priority: 0.4 })),
    { url: url('about'), lastModified: SITE_UPDATED, priority: 0.6 },
    { url: url('contact'), lastModified: SITE_UPDATED, priority: 0.7 },
    { url: url('impact'), lastModified: SITE_UPDATED, priority: 0.5 },
    { url: url('journal'), lastModified: SITE_UPDATED, priority: 0.6 },
    ...getJournalEntries().map((post) => ({
      url: url(`journal/${post.slug}`),
      lastModified: post.date,
      priority: 0.6,
    })),
    { url: url('privacy-policy'), lastModified: SITE_UPDATED, priority: 0.2 },
    { url: url('terms-of-service'), lastModified: SITE_UPDATED, priority: 0.2 },
  ];
  return core;
}
