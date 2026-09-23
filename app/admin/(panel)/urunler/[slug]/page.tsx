import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductEditor } from '@/components/admin/product-editor';
import { PageHeader } from '@/components/admin/ui';
import { listImages, readContent, storeMode } from '@/lib/admin/store';
import type { Category, Product } from '@/lib/content-types';

export const metadata: Metadata = { title: 'Ürünü düzenle' };

export default async function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [{ data: products }, { data: categories }, images] = await Promise.all([
    readContent<Product[]>('products'),
    readContent<Category[]>('categories'),
    listImages(),
  ]);
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <>
      <PageHeader title={product.name} description={<a href={`/urunler/${product.slug}`} target="_blank" rel="noreferrer">/urunler/{product.slug} ↗</a>} />
      <ProductEditor
        key={product.slug}
        initial={product}
        isNew={false}
        isOnlyProduct={products.length === 1}
        images={images}
        categories={categories.map((category) => category.name)}
        readOnly={storeMode() === 'readonly'}
      />
    </>
  );
}
