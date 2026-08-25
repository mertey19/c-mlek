import Image from 'next/image';
import Link from 'next/link';
import { categories, products, whatsappUrl, type PageContent } from '@/lib/site-data';
import { ContactBars } from './contact-bars';
import { IconWhatsApp } from './icons';
import { JsonLd } from './json-ld';
import { QuoteForm } from './quote-form';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { TrackedLink } from './tracked-link';

const labelMap: Record<string, string> = {
  urunler: 'Ürünler', projeler: 'Projeler', 'toptan-satis': 'Toptan Satış', ihracat: 'İhracat', atolye: 'Atölye',
  hakkimizda: 'Hakkımızda', galeri: 'Galeri', iletisim: 'İletişim', rehber: 'Rehber', en: 'English',
  products: 'Products', wholesale: 'Wholesale', projects: 'Projects', export: 'Export', about: 'About', contact: 'Contact',
};

function absolute(path: string) {
  return new URL(path, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').toString();
}

export function PageShell({ page }: { page: PageContent }) {
  const english = page.locale === 'en';
  const segments = page.path.split('/').filter(Boolean);
  const showCategories = page.path === '/urunler' || page.path === '/en/products';
  const showGallery = page.path === '/galeri';
  const showQuote = /toptan-satis|projeler|otel-villa-peyzaj|ihracat|iletisim|en\/(wholesale|projects|export|contact)|urunler\//.test(page.path);
  const crumbs = segments.map((segment, index) => ({
    name: labelMap[segment] || page.title,
    path: `/${segments.slice(0, index + 1).join('/')}`,
  }));
  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: english ? 'Home' : 'Ana Sayfa', item: absolute(english ? '/en' : '/') },
      ...crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 2, name: crumb.name, item: absolute(crumb.path) })),
    ],
  };
  const schema: Record<string, unknown>[] = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, description: page.seoDescription, inLanguage: english ? 'en' : 'tr-TR', url: absolute(page.path), isPartOf: { '@id': `${absolute('/')}#website` } },
    { '@context': 'https://schema.org', ...breadcrumbSchema },
  ];
  if (page.faq) schema.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: page.faq.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) });

  return (
    <>
      <SiteHeader />
      <main>
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
                  href={whatsappUrl(english ? 'default' : 'default', undefined, english)}
                  target="_blank"
                  rel="noreferrer"
                  eventName="whatsapp_click"
                  eventData={{ location: 'page_hero' }}
                >
                  <IconWhatsApp />
                  {english ? 'WhatsApp quote' : 'WhatsApp’tan teklif'}
                </TrackedLink>
                <Link className="text-link" href={english ? '/en/products' : '/urunler'}>
                  {english ? 'Explore products' : 'Ürünleri keşfedin'} <span>↗</span>
                </Link>
              </div>
            </div>
            <figure className="page-hero__media">
              <Image src={page.image} alt={page.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 46vw" />
              <figcaption>{english ? 'Concept image — not a client reference' : 'Temsili konsept — gerçek proje/referans değildir'}</figcaption>
            </figure>
          </div>
        </div>

        {showCategories && (
          <section className="section shell" aria-labelledby="collections-title">
            <div className="section-heading"><p className="eyebrow">{english ? 'Browse by application' : 'Kullanıma göre keşfet'}</p><h2 id="collections-title">{english ? 'Nine ways to work with terracotta' : 'Terracotta’nın dokuz farklı ölçeği'}</h2></div>
            <div className="category-grid category-grid--inner">
              {categories.map((category, index) => (
                <Link className={`category-card category-card--${(index % 4) + 1}`} href={english ? '/en/contact#quote' : `/urunler/${category.slug}`} key={category.slug}>
                  <Image src={category.image} alt={`${english ? category.en : category.name} — ${english ? 'concept image' : 'temsili görsel'}`} fill sizes="(max-width: 700px) 100vw, 33vw" />
                  <span><strong>{english ? category.en : category.name}</strong><small>{english ? 'View collection' : 'Koleksiyonu gör'} ↗</small></span>
                </Link>
              ))}
            </div>
          </section>
        )}

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

        {page.path === '/urunler/buyuk-terracotta-kup' && (
          <section className="section shell product-specs">
            <div className="section-heading"><p className="eyebrow">Ürün bilgileri</p><h2>Teklif öncesi temel kapsam</h2></div>
            <dl><div><dt>Malzeme</dt><dd>{products[0].material}</dd></div><div><dt>Renk</dt><dd>{products[0].color}</dd></div><div><dt>Ölçüler</dt><dd>Üretim ve mevcut seçenekler için teyit edilir</dd></div><div><dt>Minimum sipariş</dt><dd>Ürün ve projeye göre değişir</dd></div></dl>
          </section>
        )}

        {showGallery && <EditorialGallery />}
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

function EditorialGallery() {
  const images = [
    ['/images/hero-terracotta.webp', 'Büyük boy küpler'], ['/images/workshop.webp', 'Üretim'], ['/images/collection.webp', 'Ürünler'],
    ['/images/project-concept.webp', 'Mimari kullanım'], ['/images/collection.webp', 'Koleksiyon'], ['/images/hero-terracotta.webp', 'Yüzey ve form'],
  ] as const;
  return <section className="section shell"><div className="editorial-gallery">{images.map(([src, label], index) => <figure key={`${label}-${index}`}><Image src={src} alt={`${label} — temsili konsept görsel`} fill sizes="(max-width: 700px) 100vw, 40vw" /><figcaption>{label}<small>Temsili görsel</small></figcaption></figure>)}</div></section>;
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
