import Image from 'next/image';
import Link from 'next/link';
import { categories, categoryFromPath, products, productsForCategory, productFromPath, whatsappUrl, type PageContent } from '@/lib/site-data';
import { absoluteUrl } from '@/lib/site-url';
import { ContactBars } from './contact-bars';
import { IconWhatsApp } from './icons';
import { JsonLd } from './json-ld';
import { QuoteForm } from './quote-form';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { TrackedLink } from './tracked-link';
import { ServiceAreaDirectory } from './service-area-directory';
import { districtFromPath, districtPath, mersinDistricts, SERVICE_AREAS_UPDATED } from '@/lib/service-areas';
import { localBusinessSchema } from '@/lib/business-schema';
import { postsForServiceArea } from '@/lib/blog-data';
import { ProductDirectory } from './product-directory';
import { photoAlt, photoCaption, photoForSrc } from '@/lib/photography';
import { PhotographyGallery } from './photography-gallery';

const labelMap: Record<string, string> = {
  urunler: 'Ürünler', projeler: 'Projeler', 'toptan-satis': 'Toptan Satış', ihracat: 'İhracat', atolye: 'Atölye',
  hakkimizda: 'Hakkımızda', galeri: 'Galeri', iletisim: 'İletişim', rehber: 'Rehber', en: 'English',
  products: 'Products', wholesale: 'Wholesale', projects: 'Projects', export: 'Export', about: 'About', contact: 'Contact',
  mersin: 'Mersin',
};

export function PageShell({ page }: { page: PageContent }) {
  const english = page.locale === 'en';
  const heroPhoto = photoForSrc(page.image);
  const caption = photoCaption(page.image, english);
  const district = districtFromPath(page.path);
  const isAreaHub = page.path === '/mersin';
  const isServiceArea = !!district || isAreaHub;
  const areaPosts = isServiceArea ? postsForServiceArea(page.path) : [];
  const segments = page.path.split('/').filter(Boolean);
  const showCategories = page.path === '/urunler' || page.path === '/en/products';
  const showGallery = page.path === '/galeri';
  const product = productFromPath(page.path);
  const category = categoryFromPath(page.path);
  const catalogProducts = showCategories ? products : category ? productsForCategory(category) : [];
  const showQuote = isServiceArea || /toptan-satis|projeler|otel-villa-peyzaj|ihracat|iletisim|en\/(wholesale|projects|export|contact)|urunler\//.test(page.path);
  const crumbs = segments.map((segment, index) => ({
    name: labelMap[segment] || (district?.slug === segment ? district.name : page.title),
    path: `/${segments.slice(0, index + 1).join('/')}`,
  }));
  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: english ? 'Home' : 'Ana Sayfa', item: absoluteUrl(english ? '/en' : '/') },
      ...crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 2, name: crumb.name, item: absoluteUrl(crumb.path) })),
    ],
  };
  const schema: Record<string, unknown>[] = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, description: page.seoDescription, inLanguage: english ? 'en' : 'tr-TR', url: absoluteUrl(page.path), ...(page.updatedAt ? { dateModified: page.updatedAt } : {}), isPartOf: { '@id': `${absoluteUrl('/')}#website` } },
    { '@context': 'https://schema.org', ...breadcrumbSchema },
  ];
  if (page.faq) schema.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: page.faq.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) });
  if (isServiceArea) schema.push(localBusinessSchema());
  if (district) schema.push({
    '@context': 'https://schema.org', '@type': 'Service', '@id': `${absoluteUrl(page.path)}#service`,
    name: `${district.name} için çömlek ve terracotta tedariki`, serviceType: 'El yapımı terracotta ürün tedariki',
    description: page.seoDescription, url: absoluteUrl(page.path),
    provider: { '@id': `${absoluteUrl('/')}#organization` },
    areaServed: { '@type': 'AdministrativeArea', name: `${district.name}, Mersin`, containedInPlace: { '@type': 'AdministrativeArea', name: 'Mersin, Türkiye' } },
  });
  if (isAreaHub) schema.push({
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'Mersin ilçe tedarik rehberi',
    numberOfItems: mersinDistricts.length,
    itemListElement: mersinDistricts.map((area, index) => ({ '@type': 'ListItem', position: index + 1, name: area.name, url: absoluteUrl(districtPath(area.slug)) })),
  });
  if (catalogProducts.length) schema.push({
    '@context': 'https://schema.org', '@type': 'ItemList', name: `${page.title} — ${english ? 'product catalogue' : 'ürün kataloğu'}`,
    numberOfItems: catalogProducts.length,
    itemListElement: catalogProducts.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: absoluteUrl(`/urunler/${item.slug}`) })),
  });

  return (
    <>
      <SiteHeader />
      <main lang={english ? 'en' : 'tr'}>
        <div className="page-hero">
          <div className="shell page-hero__grid">
            <div className="page-hero__copy">
              <nav className="breadcrumbs" aria-label={english ? 'Breadcrumb' : 'Sayfa yolu'}>
                <Link href={english ? '/en' : '/'}>{english ? 'Home' : 'Ana Sayfa'}</Link>
                {crumbs.map((crumb) => <span key={crumb.path}><i>—</i><Link href={crumb.path} aria-current={crumb.path === page.path ? 'page' : undefined}>{crumb.name}</Link></span>)}
              </nav>
              <p className="eyebrow">{page.kicker}</p>
              <h1>{page.title}</h1>
              <p className="page-hero__lead">{page.intro}</p>
              <div className="page-hero__actions">
                <TrackedLink
                  className="button button--whatsapp"
                  href={district ? whatsappUrl('quote', `Merhaba, ${district.name} / Mersin için çömlek ve terracotta ürün teklifi almak istiyorum. Ürün, adet ve teslimat ayrıntılarını paylaşmak istiyorum.`) : whatsappUrl('default', undefined, english)}
                  target="_blank"
                  rel="noreferrer"
                  eventName="whatsapp_click"
                  eventData={{ location: 'page_hero', ...(district ? { district: district.slug } : {}) }}
                >
                  <IconWhatsApp />
                  {english ? 'WhatsApp quote' : 'WhatsApp’tan teklif'}
                </TrackedLink>
                <Link className="text-link" href={english ? '/en/products' : '/urunler'}>
                  {english ? 'Explore products' : 'Ürünleri keşfedin'} <span>↗</span>
                </Link>
              </div>
            </div>
            <figure className={`page-hero__media${heroPhoto ? ' page-hero__media--photograph' : ''}`}>
              {heroPhoto
                ? <Image quality={90} src={page.image} alt={page.imageAlt} width={heroPhoto.width} height={heroPhoto.height} priority sizes="(max-width: 900px) 100vw, 46vw" />
                : <Image quality={90} src={page.image} alt={page.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 46vw" />}
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          </div>
        </div>

        {isAreaHub && <ServiceAreaDirectory />}

        {showCategories && (
          <section className="section shell" aria-labelledby="collections-title">
            <div className="section-heading"><p className="eyebrow">{english ? 'Browse by application' : 'Kullanıma göre keşfet'}</p><h2 id="collections-title">{english ? 'Terracotta collections' : 'Terracotta ürün grupları'}</h2></div>
            <div className="category-grid category-grid--inner">
              {categories.map((category, index) => (
                <Link className={`category-card category-card--${(index % 4) + 1}`} href={`/urunler/${category.slug}`} hrefLang={english ? 'tr' : undefined} key={category.slug}>
                  <Image quality={90} src={category.image} alt={photoAlt(category.image, english ? category.en : category.name, english)} fill sizes="(max-width: 700px) 100vw, 33vw" />
                  <span><strong>{english ? category.en : category.name}</strong><small>{english ? 'View collection (Turkish)' : 'Koleksiyonu gör'} ↗</small></span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <ProductDirectory products={catalogProducts} title={category ? `${category.name} grubundaki ürünler` : english ? 'Products in the catalogue' : 'Katalogdaki tüm ürünler'} english={english} />

        <section className="content-section shell">
          <aside><span>01</span><p>{english ? 'Material, scale and supply' : 'Malzeme, ölçek ve tedarik'}</p></aside>
          <div className="content-section__blocks">
            {page.blocks.map((block, index) => (
              <article key={block.title} className="content-block">
                <span className="content-block__number">0{index + 1}</span>
                <h2>{block.title}</h2>
                <p>{block.body}</p>
                {block.bullets && <ul>{block.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                {block.link && <Link className="text-link text-link--dark" href={block.link.href}>{block.link.label} <span>↗</span></Link>}
              </article>
            ))}
          </div>
        </section>

        {product && (
          <section className="section shell product-specs">
            <div className="section-heading"><p className="eyebrow">Ürün bilgileri</p><h2>Teklif öncesi temel kapsam</h2></div>
            <dl><div><dt>Malzeme</dt><dd>{product.material || 'Pişmiş toprak / terracotta'}</dd></div><div><dt>Renk</dt><dd>{product.color || 'Doğal terracotta tonları'}</dd></div><div><dt>Ölçüler</dt><dd>{product.dimensions || 'Üretim ve mevcut seçenekler için teyit edilir'}</dd></div><div><dt>Minimum sipariş</dt><dd>Ürün ve projeye göre değişir</dd></div></dl>
          </section>
        )}

        {showGallery && <PhotographyGallery />}
        {isServiceArea && <div className="service-area-note shell"><p>Üretim ve ziyaret noktası Tarsus’taki atölyemizdir. İlçe bazlı sayfalar ayrı şube veya mağaza adresi değildir.</p><p>Son içerik güncellemesi: <time dateTime={SERVICE_AREAS_UPDATED}>{new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(SERVICE_AREAS_UPDATED))}</time></p>{district && <Link className="text-link text-link--dark" href="/mersin">Diğer Mersin ilçeleri <span>↗</span></Link>}</div>}
        {areaPosts.length > 0 && <section className="section shell" aria-labelledby="district-reading-title">
          <div className="section-heading"><p className="eyebrow">Ürün seçimine hazırlanırken</p><h2 id="district-reading-title">{district ? `${district.name} için pratik rehber` : 'Mersin ilçelerinden kullanım rehberleri'}</h2></div>
          <div className="blog-grid">{areaPosts.map((post) => <article key={post.path} className="blog-card"><div className="blog-card__body">
            <h3><Link href={post.path}>{post.title}</Link></h3><p>{post.intro}</p><Link className="text-link text-link--dark" href={post.path}>Rehberi okuyun <span>↗</span></Link>
          </div></article>)}</div>
        </section>}
        {page.faq && <Faq items={page.faq} english={english} />}
        {showQuote && <div className="shell section"><QuoteForm english={english} /></div>}
        <FinalCta english={english} />
      </main>
      <SiteFooter english={english} />
      <ContactBars english={english} />
      <JsonLd data={schema} />
    </>
  );
}

function Faq({ items, english }: { items: readonly (readonly [string, string])[]; english: boolean }) {
  return (
    <section className="faq-section section shell" aria-labelledby="faq-title">
      <div className="section-heading"><p className="eyebrow">FAQ</p><h2 id="faq-title">{english ? 'Frequently asked questions' : 'Sık sorulan sorular'}</h2></div>
      <div className="faq-list">{items.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
    </section>
  );
}

function FinalCta({ english }: { english: boolean }) {
  return (
    <section className="final-cta">
      <div className="shell final-cta__inner">
        <p className="eyebrow">{english ? 'Wholesale · Projects · Export' : 'Toptan · Proje · İhracat'}</p>
        <h2>
          {english
            ? 'Let’s choose the right terracotta for your space.'
            : 'Projeniz için doğru çömleği birlikte seçelim.'}
        </h2>
        <p>
          {english
            ? 'Share the product type, quantity and destination on WhatsApp to start a focused conversation.'
            : 'Ürün türü, adet ve teslimat noktasını WhatsApp’tan paylaşın; doğru tedarik planıyla başlayalım.'}
        </p>
        <div className="final-cta__actions">
          <TrackedLink
            className="button button--whatsapp"
            href={whatsappUrl('default', undefined, english)}
            target="_blank"
            rel="noreferrer"
            eventName="whatsapp_click"
            eventData={{ location: 'final_cta' }}
          >
            <IconWhatsApp />
            {english ? 'WhatsApp quote' : 'WhatsApp’tan teklif al'}
          </TrackedLink>
          <Link className="button button--light" href={english ? '/en/contact#quote' : '/iletisim#teklif'}>
            {english ? 'Open quote form' : 'Teklif formunu aç'}
          </Link>
        </div>
      </div>
    </section>
  );
}
