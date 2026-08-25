'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { track } from './tracked-link';

export function AnalyticsReady() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === '/urunler/buyuk-terracotta-kup') track('product_view', { product: 'buyuk-terracotta-kup' });
    else if (pathname.startsWith('/urunler/')) track('category_view', { category: pathname.split('/').pop() });
  }, [pathname]);
  return null;
}
