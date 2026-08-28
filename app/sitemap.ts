import type { MetadataRoute } from 'next';
import { allIndexablePaths } from '@/lib/all-pages';
import { blogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const blogPaths = new Set(blogPosts.map((post) => post.path));

  return allIndexablePaths.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: blogPaths.has(path) ? new Date('2026-08-28') : new Date('2026-08-25'),
    changeFrequency:
      path === '/'
        ? 'weekly'
        : path === '/blog' || path === '/en/blog' || path.startsWith('/blog/') || path.startsWith('/en/blog/')
          ? 'weekly'
          : 'monthly',
    priority:
      path === '/'
        ? 1
        : path === '/blog' || path === '/urunler' || path === '/toptan-satis' || path === '/en'
          ? 0.9
          : blogPaths.has(path)
            ? 0.85
            : 0.7,
  }));
}
