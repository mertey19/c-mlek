import type { MetadataRoute } from 'next';
import { allIndexablePaths, allPages } from '@/lib/all-pages';
import { blogPosts } from '@/lib/blog-data';
import { SITE_URL } from '@/lib/site-url';
import { SERVICE_AREAS_UPDATED } from '@/lib/service-areas';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogDates = new Map(blogPosts.map((post) => [post.path, post.updatedAt ?? post.publishedAt]));
  const blogPaths = new Set(blogDates.keys());
  const contentDates = new Map(allPages.map((page) => [page.path, page.updatedAt]));
  // Actual homepage copy revision, not the time of the current build.
  contentDates.set('/', '2026-10-19');
  const blogIndexDates = new Map(['tr', 'en'].map((locale) => [
    locale === 'tr' ? '/blog' : '/en/blog',
    [...blogPosts.filter((post) => post.locale === locale).map((post) => post.updatedAt ?? post.publishedAt),
      contentDates.get(locale === 'tr' ? '/blog' : '/en/blog')].filter((date): date is string => !!date).sort().at(-1),
  ]));

  return allIndexablePaths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(blogDates.get(path) ?? blogIndexDates.get(path) ?? contentDates.get(path)
      ?? (path === '/mersin' || path.startsWith('/mersin/') ? SERVICE_AREAS_UPDATED : '2026-08-25')),
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
