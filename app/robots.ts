import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  const production = process.env.NODE_ENV === 'production';

  return {
    rules: production ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: production ? 'https://www.tarsuscomlekcilik.com' : undefined,
  };
}
