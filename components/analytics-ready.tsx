'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import productsJson from '@/content/products.json';
import { track } from './tracked-link';

const productSlugs = new Set(productsJson.map((product) => product.slug));

export function AnalyticsReady() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname.startsWith('/urunler/')) return;
    const slug = pathname.split('/').pop() ?? '';
    if (productSlugs.has(slug)) track('product_view', { product: slug });
    else track('category_view', { category: slug });
  }, [pathname]);
  return null;
}
