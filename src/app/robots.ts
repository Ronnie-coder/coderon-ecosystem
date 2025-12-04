import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.coderon.co.za';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // Basic protection for API routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}