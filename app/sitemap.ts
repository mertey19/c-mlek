import type { MetadataRoute } from 'next';
import { indexablePaths } from '@/lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return indexablePaths.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: new Date('2026-08-25'),
    changeFrequency: path === '/' ? 'weekly' : path.startsWith('/rehber/') ? 'monthly' : 'monthly',
    priority: path === '/' ? 1 : path === '/urunler' || path === '/toptan-satis' || path === '/en' ? 0.9 : 0.7,
  }));
}
