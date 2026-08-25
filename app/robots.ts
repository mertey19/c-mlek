import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const production = process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SITE_URL;
  return {
    rules: production ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: new URL('/sitemap.xml', base).toString(),
  };
}
