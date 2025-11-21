// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { services } from '@/data/servicesData'; // Import your services data

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.coderon.co.za';
  const staticContentDate = '2025-10-28'; // Update to a recent date

  // Map over your services to create dynamic URLs
  const serviceUrls = services.map(service => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: staticContentDate,
  }));

  return [
    { url: `${baseUrl}/`, lastModified: staticContentDate },
    { url: `${baseUrl}/about`, lastModified: staticContentDate },
    { url: `${baseUrl}/services`, lastModified: staticContentDate },
    ...serviceUrls, // Add the dynamic service URLs
    { url: `${baseUrl}/impact`, lastModified: staticContentDate },
    { url: `${baseUrl}/contact`, lastModified: staticContentDate },
    { url: `${baseUrl}/playroom`, lastModified: staticContentDate },
    { url: `${baseUrl}/privacy-policy`, lastModified: staticContentDate },
    { url: `${baseUrl}/terms-of-service`, lastModified: staticContentDate },
  ]
}