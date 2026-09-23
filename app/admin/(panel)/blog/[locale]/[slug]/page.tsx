import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogEditor } from '@/components/admin/blog-editor';
import { PageHeader } from '@/components/admin/ui';
import { listImages, readContent, storeMode } from '@/lib/admin/store';
import type { BlogSeed } from '@/lib/content-types';

export const metadata: Metadata = { title: 'Yazıyı düzenle' };

export default async function EditBlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const [{ data }, images] = await Promise.all([readContent<BlogSeed[]>('blog'), listImages()]);
  const post = data.find((item) => item.locale === locale && item.slug === slug);
  if (!post) notFound();
  const publicPath = `${post.locale === 'en' ? '/en/blog' : '/blog'}/${post.slug}`;

  return (
    <>
      <PageHeader title={post.title} description={<a href={publicPath} target="_blank" rel="noreferrer">{publicPath} ↗</a>} />
      {/* key: kayıttan sonra yeni adrese geçildiğinde editör durumu sıfırlansın */}
      <BlogEditor key={`${post.locale}/${post.slug}`} initial={post} isNew={false} images={images} readOnly={storeMode() === 'readonly'} />
    </>
  );
}
