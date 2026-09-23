import type { MetadataRoute } from 'next';
import { allIndexablePaths } from '@/lib/all-pages';
import { blogPosts } from '@/lib/blog-data';
import { SITE_URL } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogDates = new Map(blogPosts.map((post) => [post.path, post.updatedAt ?? post.publishedAt]));
  const blogPaths = new Set(blogDates.keys());

  return allIndexablePaths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(blogDates.get(path) ?? '2026-08-25'),
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
