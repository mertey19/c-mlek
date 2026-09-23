import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/admin/ui';
import { readContent } from '@/lib/admin/store';
import type { Product } from '@/lib/content-types';

export const metadata: Metadata = { title: 'Ürünler' };

export default async function ProductListPage() {
  const { data } = await readContent<Product[]>('products');

  return (
    <>
      <PageHeader
        title="Ürünler"
        description="Her ürün için /urunler/<adres> altında bir ürün sayfası oluşturulur."
        actions={<Link className="admin-button admin-button--primary" href="/admin/urunler/yeni">+ Yeni ürün</Link>}
      />
      <div className="admin-card admin-card--flush">
        <table className="admin-table">
          <thead>
            <tr><th>Ürün</th><th>Kategori</th><th>Durum</th><th><span className="sr-only">İşlemler</span></th></tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.slug}>
                <td>
                  <span className="admin-table__media">
                    {/* eslint-disable-next-line @next/next/no-img-element -- panel küçük resmi */}
                    <img src={product.images[0]} alt="" />
                    <span>
                      <Link href={`/admin/urunler/${product.slug}`} className="admin-table__title">{product.name}</Link>
                      <small>/urunler/{product.slug}</small>
                    </span>
                  </span>
                </td>
                <td>{product.category}</td>
                <td>{product.featured && <span className="admin-badge admin-badge--accent">Öne çıkan</span>}</td>
                <td className="admin-table__actions">
                  <a href={`/urunler/${product.slug}`} target="_blank" rel="noreferrer">Sitede aç ↗</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
