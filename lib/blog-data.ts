import blogJson from '@/content/blog-posts.json';
import { applyTextTokens, type BlogSeed } from './content-types';
import { business, resolveHref, type PageContent } from './site-data';

export type BlogPost = PageContent & {
  kind: 'blog';
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingMinutes: number;
};

function post(seed: BlogSeed): BlogPost {
  const prefix = seed.locale === 'en' ? '/en/blog' : '/blog';
  const english = seed.locale === 'en';
  const text = (value: string) => applyTextTokens(value, business);
  return {
    kind: 'blog',
    path: `${prefix}/${seed.slug}`,
    locale: seed.locale,
    kicker: seed.kicker,
    title: seed.title,
    intro: text(seed.intro),
    seoTitle: seed.seoTitle,
    seoDescription: seed.seoDescription,
    image: seed.image,
    imageAlt: seed.imageAlt,
    publishedAt: seed.publishedAt,
    updatedAt: seed.updatedAt,
    tags: seed.tags,
    readingMinutes: seed.readingMinutes,
    blocks: seed.blocks.map((block) => ({
      ...block,
      body: text(block.body),
      bullets: block.bullets?.map(text),
      link: block.link && { href: resolveHref(block.link.href, english), label: block.link.label },
    })),
  };
}

/** content/blog-posts.json — admin panelindeki "Blog" ekranından düzenlenir. */
const blogSeeds = blogJson as BlogSeed[];

export const blogPosts: BlogPost[] = blogSeeds.map(post);

export const blogIndexPages: PageContent[] = [
  {
    path: '/blog',
    locale: 'tr',
    kicker: 'Blog',
    title: 'Mersin & Tarsus terracotta rehberi',
    intro:
      'Mersin çömlekçi, terracotta saksı, toptan tedarik ve el yapımı üretim hakkında SEO odaklı rehber yazıları. Tarsus’taki atölyemizden güncel bilgiler.',
    seoTitle: 'Blog | Mersin Çömlekçi & Terracotta Rehberi — Tarsus',
    seoDescription:
      'Çömlekçi, comlek, Mersin terracotta, Tarsus products, pot wholesale ve terracotta shop near me aramaları için rehber yazılar.',
    image: '/images/collection.webp',
    imageAlt: 'Mersin ve Tarsus terracotta blog — temsili görsel',
    blocks: [],
  },
  {
    path: '/en/blog',
    locale: 'en',
    kicker: 'Blog',
    title: 'Terracotta insights from Tarsus, Mersin',
    intro:
      'Articles on Mersin terracotta manufacturing, Turkish wholesale supply and handmade pottery for hospitality and landscape projects.',
    seoTitle: 'Blog | Mersin Terracotta & Turkish Pottery — Tarsus',
    seoDescription:
      'Mersin terracotta manufacturer insights, Turkish terracotta wholesale and handmade pottery from Tarsus for export and project supply.',
    image: '/images/collection.webp',
    imageAlt: 'Mersin terracotta blog — concept image',
    blocks: [],
  },
];

export function postsForLocale(locale: 'tr' | 'en') {
  return blogPosts
    .filter((item) => item.locale === locale)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function isBlogPath(path: string) {
  return path === '/blog' || path === '/en/blog' || path.startsWith('/blog/') || path.startsWith('/en/blog/');
}

export function blogPostFromPath(path: string) {
  return blogPosts.find((item) => item.path === path);
}
