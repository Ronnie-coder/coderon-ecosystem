import { MetadataRoute } from 'next'
import { services } from '@/data/servicesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.coderon.co.za';
  const staticContentDate = '2025-12-03'; // Updated to Current Mission Date

  // Map dynamic Service URLs
  const serviceUrls = services.map(service => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: staticContentDate,
  }));

  return [
    { url: `${baseUrl}/`, lastModified: staticContentDate },
    { url: `${baseUrl}/about`, lastModified: staticContentDate },
    { url: `${baseUrl}/services`, lastModified: staticContentDate },
    // --- DYNAMIC SERVICES ---
    ...serviceUrls,
    
    // --- KEY SECTIONS ---
    { url: `${baseUrl}/impact`, lastModified: staticContentDate },
    { url: `${baseUrl}/playroom`, lastModified: staticContentDate },
    { url: `${baseUrl}/journal`, lastModified: staticContentDate }, // ADDED: Critical for SEO
    { url: `${baseUrl}/contact`, lastModified: staticContentDate },
    
    // --- LEGAL ---
    { url: `${baseUrl}/privacy-policy`, lastModified: staticContentDate },
    { url: `${baseUrl}/terms-of-service`, lastModified: staticContentDate },
  ]
}