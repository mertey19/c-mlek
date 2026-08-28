import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogShell } from '@/components/blog-shell';
import { PageShell } from '@/components/page-shell';
import { allIndexablePaths, pageFromAllSegments } from '@/lib/all-pages';
import { isBlogPath } from '@/lib/blog-data';
import { routePairs } from '@/lib/site-data';

type Props = { params: Promise<{ slug: string[] }> };

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function generateStaticParams() {
  return allIndexablePaths.filter((path) => path !== '/').map((path) => ({ slug: path.slice(1).split('/') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pageFromAllSegments(slug);
  if (!page) return {};
  const paired = routePairs[page.path];
  const image = new URL(page.image, baseUrl).toString();
  const isArticle = page.path.startsWith('/blog/') || page.path.startsWith('/en/blog/');

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: 'tags' in page && Array.isArray((page as { tags?: string[] }).tags) ? (page as { tags: string[] }).tags : undefined,
    alternates: {
      canonical: page.path,
      languages: paired
        ? {
            'tr-TR': page.locale === 'tr' ? page.path : paired,
            en: page.locale === 'en' ? page.path : paired,
            'x-default': page.locale === 'tr' ? page.path : paired,
          }
        : undefined,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url: page.path,
      locale: page.locale === 'en' ? 'en_US' : 'tr_TR',
      type: isArticle ? 'article' : 'website',
      images: [{ url: image, alt: page.imageAlt }],
      ...(isArticle && 'publishedAt' in page
        ? { publishedTime: (page as { publishedAt: string }).publishedAt }
        : {}),
    },
    twitter: { card: 'summary_large_image', title: page.seoTitle, description: page.seoDescription, images: [image] },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = pageFromAllSegments(slug);
  if (!page) notFound();
  if (isBlogPath(page.path)) return <BlogShell page={page} />;
  return <PageShell page={page} />;
}
