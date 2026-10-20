import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/content-types';

/** Server-rendered links keep all admin-managed products discoverable without JavaScript. */
export function ProductDirectory({ products, title, english = false }: { products: Product[]; title: string; english?: boolean }) {
  if (!products.length) return null;
  return <section className="section shell" aria-labelledby="catalog-products-title">
    <div className="section-heading"><p className="eyebrow">{english ? 'Product catalogue' : 'Ürün kataloğu'}</p><h2 id="catalog-products-title">{title}</h2><p>{english ? 'Product names and detail pages are in Turkish. Include a product link in your English enquiry; availability, price and delivery are confirmed individually.' : 'Ürün detaylarındaki fotoğraf ve bilgileri inceleyin. Stok, fiyat ve teslimat koşulları talep sırasında teyit edilir.'}</p></div>
    <div className="blog-grid">{products.map((product) => <article className="blog-card" key={product.slug}>
      <Link className="blog-card__media" href={`/urunler/${product.slug}`} hrefLang={english ? 'tr' : undefined}><Image quality={90} src={product.images[0]} alt={`${product.name} — ${english ? 'product image' : 'ürün görseli'}`} fill sizes="(max-width: 900px) 100vw, 33vw" /></Link>
      <div className="blog-card__body"><h3 lang="tr"><Link href={`/urunler/${product.slug}`} hrefLang={english ? 'tr' : undefined}>{product.name}</Link></h3><p lang="tr">{product.shortDescription}</p>
        {product.dimensions && <p>{english ? 'Listed dimensions' : 'Belirtilen ölçü'}: {product.dimensions}</p>}
        <Link className="text-link text-link--dark" href={`/urunler/${product.slug}`} hrefLang={english ? 'tr' : undefined}>{english ? 'View product details (Turkish)' : 'Ürün detayını inceleyin'} <span>↗</span></Link>
      </div>
    </article>)}</div>
  </section>;
}
