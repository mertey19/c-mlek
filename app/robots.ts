import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  const production = process.env.NODE_ENV === 'production';

  return {
    rules: production ? { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] } : { userAgent: '*', disallow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
