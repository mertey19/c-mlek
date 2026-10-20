import { blogIndexPages, blogPosts } from './blog-data';
import { pages, type PageContent } from './site-data';
import { districtPages, serviceAreaHub } from './service-areas';
import { photoForSrc, PHOTOGRAPHY_UPDATED } from './photography';

// A real image/alt revision is a page update too; retain later editorial dates.
export const allPages: PageContent[] = [...pages, ...blogIndexPages, ...blogPosts, serviceAreaHub, ...districtPages].map((page) =>
  photoForSrc(page.image)
    ? { ...page, updatedAt: page.updatedAt && page.updatedAt > PHOTOGRAPHY_UPDATED ? page.updatedAt : PHOTOGRAPHY_UPDATED }
    : page,
);

export const allIndexablePaths = ['/', ...allPages.map((page) => page.path)];

export function pageFromAllSegments(segments: string[]) {
  const path = `/${segments.join('/')}`;
  return allPages.find((page) => page.path === path);
}
