import type { Metadata } from 'next';
import { ProductEditor } from '@/components/admin/product-editor';
import { PageHeader } from '@/components/admin/ui';
import { listImages, readContent, storeMode } from '@/lib/admin/store';
import { emptyProduct, type Category } from '@/lib/content-types';

export const metadata: Metadata = { title: 'Yeni ürün' };

export default async function NewProductPage() {
  const [{ data: categories }, images] = await Promise.all([readContent<Category[]>('categories'), listImages()]);
  return (
    <>
      <PageHeader title="Yeni ürün" />
      <ProductEditor
        initial={emptyProduct()}
        isNew
        isOnlyProduct={false}
        images={images}
        categories={categories.map((category) => category.name)}
        readOnly={storeMode() === 'readonly'}
      />
    </>
  );
}
