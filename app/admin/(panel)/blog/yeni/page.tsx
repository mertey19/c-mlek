import type { Metadata } from 'next';
import { BlogEditor } from '@/components/admin/blog-editor';
import { PageHeader } from '@/components/admin/ui';
import { listImages, storeMode } from '@/lib/admin/store';
import { emptyBlogSeed } from '@/lib/content-types';

export const metadata: Metadata = { title: 'Yeni blog yazısı' };

export default async function NewBlogPostPage() {
  return (
    <>
      <PageHeader title="Yeni blog yazısı" />
      <BlogEditor initial={emptyBlogSeed()} isNew images={await listImages()} readOnly={storeMode() === 'readonly'} />
    </>
  );
}
