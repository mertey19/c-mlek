import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site-url';
import { allowIndexing } from '@/lib/indexing';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowIndexing ? { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] } : { userAgent: '*', disallow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
