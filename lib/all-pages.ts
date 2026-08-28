import { blogIndexPages, blogPosts } from './blog-data';
import { pages, type PageContent } from './site-data';

export const allPages: PageContent[] = [...pages, ...blogIndexPages, ...blogPosts];

export const allIndexablePaths = ['/', ...allPages.map((page) => page.path)];

export function pageFromAllSegments(segments: string[]) {
  const path = `/${segments.join('/')}`;
  return allPages.find((page) => page.path === path);
}
