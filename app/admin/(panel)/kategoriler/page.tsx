import type { Metadata } from 'next';
import { CategoriesEditor } from '@/components/admin/categories-editor';
import { PageHeader } from '@/components/admin/ui';
import { listImages, readContent, storeMode } from '@/lib/admin/store';
import type { Category } from '@/lib/content-types';

export const metadata: Metadata = { title: 'Kategoriler' };

export default async function CategoriesPage() {
  const [{ data }, images] = await Promise.all([readContent<Category[]>('categories'), listImages()]);
  return (
    <>
      <PageHeader title="Ürün kategorileri" />
      <CategoriesEditor initial={data} images={images} readOnly={storeMode() === 'readonly'} />
    </>
  );
}
