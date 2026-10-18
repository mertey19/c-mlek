import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/content-types';

/** Server-rendered links keep all admin-managed products discoverable without JavaScript. */
export function ProductDirectory({ products, title }: { products: Product[]; title: string }) {
  if (!products.length) return null;
  return <section className="section shell" aria-labelledby="catalog-products-title">
    <div className="section-heading"><p className="eyebrow">Ürün kataloğu</p><h2 id="catalog-products-title">{title}</h2><p>Ürün detaylarındaki fotoğraf ve bilgileri inceleyin. Stok, fiyat ve teslimat koşulları talep sırasında teyit edilir.</p></div>
    <div className="blog-grid">{products.map((product) => <article className="blog-card" key={product.slug}>
      <Link className="blog-card__media" href={`/urunler/${product.slug}`}><Image src={product.images[0]} alt={`${product.name} ürün görseli`} fill sizes="(max-width: 900px) 100vw, 33vw" /></Link>
      <div className="blog-card__body"><h3><Link href={`/urunler/${product.slug}`}>{product.name}</Link></h3><p>{product.shortDescription}</p>
        {product.dimensions && <p>Belirtilen ölçü: {product.dimensions}</p>}
        <Link className="text-link text-link--dark" href={`/urunler/${product.slug}`}>Ürün detayını inceleyin <span>↗</span></Link>
      </div>
    </article>)}</div>
  </section>;
}
