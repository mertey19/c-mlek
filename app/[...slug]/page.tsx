import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/page-shell';
import { indexablePaths, pageFromSegments, routePairs } from '@/lib/site-data';

type Props = { params: Promise<{ slug: string[] }> };

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function generateStaticParams() {
  return indexablePaths.filter((path) => path !== '/').map((path) => ({ slug: path.slice(1).split('/') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pageFromSegments(slug);
  if (!page) return {};
  const paired = routePairs[page.path];
  const image = new URL(page.image, baseUrl).toString();
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: {
      canonical: page.path,
      languages: paired ? {
        'tr-TR': page.locale === 'tr' ? page.path : paired,
        en: page.locale === 'en' ? page.path : paired,
        'x-default': page.locale === 'tr' ? page.path : paired,
      } : undefined,
    },
    openGraph: { title: page.seoTitle, description: page.seoDescription, url: page.path, locale: page.locale === 'en' ? 'en_US' : 'tr_TR', type: 'website', images: [{ url: image, alt: page.imageAlt }] },
    twitter: { card: 'summary_large_image', title: page.seoTitle, description: page.seoDescription, images: [image] },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = pageFromSegments(slug);
  if (!page) notFound();
  return <PageShell page={page} />;
}
