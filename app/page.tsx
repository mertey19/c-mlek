import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ContactBars } from '@/components/contact-bars';
import { JsonLd } from '@/components/json-ld';
import { QuoteForm } from '@/components/quote-form';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { TrackedLink } from '@/components/tracked-link';
import { PotteryHero } from '@/components/3d/PotteryHero';
import { ProductionExperience } from '@/components/3d/ProductionExperience';
import { ProductViewer3D } from '@/components/3d/ProductViewer3D';
import { HeritageTimeline } from '@/components/motion/HeritageTimeline';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { Reveal } from '@/components/motion/Reveal';
import { TiltCategoryCard } from '@/components/motion/TiltCard';
import { business, categories, faqs, products, whatsappUrl } from '@/lib/site-data';
import { IconInstagram, IconWhatsApp } from '@/components/icons';
import { absoluteUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Mersin Çömlekçi & El Yapımı Terracotta | Tarsus Çömlekçilik',
  description:
    'Mersin ve Tarsus\'ta el yapımı terracotta saksı, büyük küp ve çömlek üreticisi. Toptan satış, otel-villa peyzaj projeleri ve ihracat için WhatsApp\'tan teklif alın.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Mersin Çömlekçi & Terracotta Üreticisi | Tarsus Çömlekçilik',
    description:
      '1927\'den günümüze Mersin Tarsus\'ta el yapımı terracotta. Toptan tedarik, proje bazlı üretim ve ihracat.',
    url: '/',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Tarsus Çömlekçilik — Mersin terracotta üreticisi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mersin Çömlekçi & Terracotta | Tarsus Çömlekçilik',
    description: 'El yapımı terracotta saksı ve büyük küp — Mersin Tarsus\'tan toptan ve proje tedariki.',
    images: ['/og.png'],
  },
};

export default function Home() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${absoluteUrl('/')}#organization`,
      name: business.name,
      alternateName: business.legalName,
      foundingDate: business.founded,
      url: absoluteUrl('/'),
      logo: absoluteUrl('/og.png'),
      image: absoluteUrl('/og.png'),
      telephone: `+${business.phone}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.streetAddress,
        addressLocality: business.locality,
        addressRegion: business.region,
        postalCode: business.postalCode,
        addressCountry: 'TR',
      },
      sameAs: [business.website, business.instagram, business.youtube, business.googleBusinessUrl, business.googleMapsUrl],
      areaServed: [{ '@type': 'Country', name: 'Türkiye' }, { '@type': 'AdministrativeArea', name: 'Mersin' }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${absoluteUrl('/')}#website`,
      name: business.name,
      alternateName: [business.legalName, 'Tarsus Pottery', 'Mersin terracotta'],
      url: absoluteUrl('/'),
      inLanguage: ['tr-TR', 'en'],
      publisher: { '@id': `${absoluteUrl('/')}#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ];

  return (
    <>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <PotteryHero />
          <div className="hero__shade" />
          <SiteHeader overlay />
          <div className="hero__content shell">
            <p className="eyebrow">Tarsus Çömlekçilik · Tarsus’ta el yapımı · 1927’den günümüze</p>
            <h1 id="hero-title">
              Toprağın ustalığı,
              <br />
              mekânların karakteri.
            </h1>
            <p className="hero__brand">Özçereciler Toprak Sanatları — Mersin Tarsus el yapımı terracotta üreticisi</p>
            <p className="hero__lead">
              El yapımı terracotta küp ve saksıları; bahçeler, oteller, villalar, peyzaj projeleri ve toptan tedarik için
              Tarsus’tan dünyaya taşıyoruz.
            </p>
            <div className="hero__actions">
              <Link className="button button--solid" href="/urunler">
                Ürünleri keşfet
              </Link>
              <TrackedLink
                className="button button--whatsapp"
                href={whatsappUrl('wholesale')}
                target="_blank"
                rel="noreferrer"
                eventName="whatsapp_click"
                eventData={{ location: 'hero' }}
              >
                <IconWhatsApp /> WhatsApp’tan teklif al
              </TrackedLink>
            </div>
            <p className="concept-note">3D görselleştirme temsili konsepttir; gerçek ürün ölçüleri teklifle netleşir.</p>
          </div>
          <div className="trust-strip">
            <div className="shell trust-strip__grid">
              <p>
                <strong>1927’den beri</strong>
                <span>Geleneksel üretim mirası</span>
              </p>
              <p>
                <strong>El yapımı</strong>
                <span>Her formda usta dokunuşu</span>
              </p>
              <p>
                <strong>Toptan üretim</strong>
                <span>Projeye göre planlanan tedarik</span>
              </p>
              <p>
                <strong>Dünya geneli</strong>
                <span>İhracat taleplerine açık</span>
              </p>
            </div>
          </div>
        </section>

        <section className="section shell" aria-labelledby="categories-title">
          <Reveal>
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">Koleksiyonlar</p>
                <h2 id="categories-title">Toprağın farklı ölçekleri</h2>
              </div>
              <p>
                Bahçeden anıtsal girişlere, tek üründen toptan tedarike; terracotta’yı kullanım senaryosuna göre
                keşfedin.
              </p>
            </div>
          </Reveal>
          <div className="category-grid">
            {categories.slice(0, 6).map((category, index) => (
              <TiltCategoryCard
                key={category.slug}
                className={`category-card--${index + 1}`}
                href={`/urunler/${category.slug}`}
                image={category.image}
                alt={`${category.name} — temsili terracotta görseli`}
                title={category.name}
                subtitle="Koleksiyonu gör ↗"
                eventData={{ category: category.slug }}
              />
            ))}
          </div>
          <div className="section-end-link">
            <Link className="text-link text-link--dark" href="/urunler">
              Tüm ürün gruplarını keşfet <span>↗</span>
            </Link>
          </div>
        </section>

        <section className="story-section">
          <div className="shell story-section__grid">
            <Reveal>
              <figure className="story-section__media">
                <Image
                  src="/images/workshop.webp"
                  alt="Büyük bir terracotta formu şekillendiren usta elleri — temsili görsel"
                  fill
                  sizes="(max-width: 800px) 100vw, 52vw"
                />
                <figcaption>Temsili üretim görseli</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={120}>
              <div className="story-section__copy">
                <p className="eyebrow">Kuşaklar boyunca</p>
                <h2>Dört kuşağa uzanan bir toprak hikâyesi</h2>
                <p className="story-section__lead">
                  Tarsus’ta sürdürülen çömlek ustalığı; bugün büyük ölçekli bahçe, mimari ve ticari mekânların
                  ihtiyaçlarıyla yeniden buluşuyor.
                </p>
                <HeritageTimeline />
                <div className="story-section__notes">
                  <span>01</span>
                  <p>El yapımının bıraktığı yüzey izleri, her parçaya seri üretimde bulunmayan doğal bir karakter verir.</p>
                  <span>02</span>
                  <p>
                    Üretici kimliği; toptan tedarik, proje bazlı çalışma ve yurtdışı talepler için süreci tek merkezde
                    toplar.
                  </p>
                </div>
                <Link className="text-link text-link--dark" href="/hakkimizda">
                  Hikâyemizi okuyun <span>↗</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="project-feature">
          <ParallaxImage
            src="/images/project-concept.webp"
            alt="Otel avlusunda anıtsal terracotta saksılar — temsili mimari konsept"
            className="project-feature__parallax"
          />
          <div className="project-feature__shade" />
          <div className="shell project-feature__copy">
            <p className="eyebrow">Hotels · Villas · Landscape</p>
            <h2>Mekânlara toprağın karakterini katıyoruz</h2>
            <p>
              Giriş, avlu, teras ve peyzaj aksları için ölçü, form ve yerleşimi birlikte değerlendiren terracotta
              tedariki.
            </p>
            <div>
              <Link className="button button--light" href="/projeler">
                Proje yaklaşımını keşfet
              </Link>
              <TrackedLink
                className="button button--whatsapp"
                href={whatsappUrl('project')}
                target="_blank"
                rel="noreferrer"
                eventName="whatsapp_click"
                eventData={{ location: 'projects_band' }}
              >
                <IconWhatsApp /> WhatsApp’tan projenizi gönderin
              </TrackedLink>
            </div>
            <small>Görsel temsili konsepttir; gerçek müşteri projesi değildir.</small>
          </div>
        </section>

        <section className="trade-section shell section" aria-labelledby="trade-title">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">Üreticiden doğrudan tedarik</p>
              <h2 id="trade-title">Toptan, proje ve ihracat için tek üretim odağı</h2>
            </div>
          </Reveal>
          <div className="trade-grid">
            <article className="trade-card trade-card--clay">
              <span>01 / Wholesale</span>
              <h3>Doğrudan üreticiden toptan çömlek</h3>
              <p>Ürün grubu, adet, teslimat şehri ve takvim bilgisiyle tedarik kapsamını netleştirin.</p>
              <ul>
                <li>Farklı ürün ve ölçü seçenekleri</li>
                <li>Proje bazlı üretim değerlendirmesi</li>
                <li>Paketleme ve sevkiyat planı</li>
              </ul>
              <Link className="text-link" href="/toptan-satis">
                Toptan fiyat iste <span>↗</span>
              </Link>
            </article>
            <article className="trade-card trade-card--dark">
              <span>02 / Export</span>
              <h3>Handmade terracotta from Tarsus to the world</h3>
              <p>Wholesale and project-based supply for international buyers, hotels and landscape practices.</p>
              <ul>
                <li>English enquiry flow</li>
                <li>Export packing review</li>
                <li>Worldwide trade requests</li>
              </ul>
              <TrackedLink className="text-link" href="/en/export" eventName="catalog_request">
                Request wholesale catalogue <span>↗</span>
              </TrackedLink>
            </article>
          </div>
        </section>

        <ProductionExperience />

        <section className="featured-product section shell">
          <div className="featured-product__media">
            <ProductViewer3D fallbackSrc={products[0].images[1]} />
            <span>İnteraktif 3D / temsili form</span>
          </div>
          <div className="featured-product__copy">
            <p className="eyebrow">Öne çıkan form</p>
            <h2>{products[0].name}</h2>
            <p>{products[0].description}</p>
            <dl>
              <div>
                <dt>Malzeme</dt>
                <dd>{products[0].material}</dd>
              </div>
              <div>
                <dt>Kullanım</dt>
                <dd>Mimari, bahçe ve peyzaj</dd>
              </div>
              <div>
                <dt>Fiyat</dt>
                <dd>Teklif ile</dd>
              </div>
            </dl>
            <TrackedLink
              className="button button--dark"
              href={`/urunler/${products[0].slug}`}
              eventName="product_view"
              eventData={{ product: products[0].slug }}
            >
              Ürünü incele
            </TrackedLink>
          </div>
        </section>

        <section className="faq-section section shell" aria-labelledby="home-faq-title">
          <div className="section-heading">
            <p className="eyebrow">Satış öncesi</p>
            <h2 id="home-faq-title">Sık sorulan sorular</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span>+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section shell" aria-labelledby="blog-home-title">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Blog</p>
              <h2 id="blog-home-title">Mersin çömlekçi ve terracotta rehberi</h2>
            </div>
            <p>Mersin terracotta, Tarsus çömlek atölyesi ve toptan tedarik hakkında güncel yazılar.</p>
          </div>
          <div className="blog-grid blog-grid--compact">
            <article className="blog-card">
              <Link className="blog-card__media" href="/blog/mersin-comlekci">
                <Image src="/images/workshop.webp" alt="Mersin çömlekçi rehberi" fill sizes="(max-width: 700px) 100vw, 33vw" />
              </Link>
              <div className="blog-card__body">
                <h3>
                  <Link href="/blog/mersin-comlekci">Mersin çömlekçi arayanlar için Tarsus’ta el yapımı üretim</Link>
                </h3>
                <Link className="text-link text-link--dark" href="/blog">
                  Tüm yazılar <span>↗</span>
                </Link>
              </div>
            </article>
            <article className="blog-card">
              <Link className="blog-card__media" href="/blog/mersin-terracotta">
                <Image src="/images/collection.webp" alt="Mersin terracotta rehberi" fill sizes="(max-width: 700px) 100vw, 33vw" />
              </Link>
              <div className="blog-card__body">
                <h3>
                  <Link href="/blog/mersin-terracotta">Mersin terracotta saksı ve küp üreticisi</Link>
                </h3>
                <Link className="text-link text-link--dark" href="/blog/mersin-terracotta">
                  Yazıyı oku <span>↗</span>
                </Link>
              </div>
            </article>
            <article className="blog-card">
              <Link className="blog-card__media" href="/blog/tarsus-comlek-atolyesi">
                <Image src="/images/workshop.webp" alt="Tarsus çömlek atölyesi" fill sizes="(max-width: 700px) 100vw, 33vw" />
              </Link>
              <div className="blog-card__body">
                <h3>
                  <Link href="/blog/tarsus-comlek-atolyesi">Tarsus çömlek atölyesi: 1927’den günümüze</Link>
                </h3>
                <Link className="text-link text-link--dark" href="/blog/tarsus-comlek-atolyesi">
                  Yazıyı oku <span>↗</span>
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="instagram-section">
          <div className="shell instagram-section__grid">
            <div>
              <p className="eyebrow">Atölyeden güncel kareler</p>
              <h2>Atölyemizi Instagram’da takip edin</h2>
              <p>{business.instagramHandle}</p>
              <TrackedLink
                className="button button--dark button--with-icon"
                href={business.instagram}
                target="_blank"
                rel="noreferrer"
                eventName="instagram_click"
              >
                <IconInstagram /> Instagram’ı aç
              </TrackedLink>
            </div>
            <div className="instagram-section__images">
              <figure>
                <Image src="/images/workshop.webp" alt="Terracotta üretim süreci — temsili görsel" fill sizes="35vw" />
              </figure>
              <figure>
                <Image src="/images/collection.webp" alt="Terracotta ürün koleksiyonu — temsili görsel" fill sizes="35vw" />
              </figure>
            </div>
          </div>
        </section>

        <div className="shell section">
          <QuoteForm />
        </div>

        <section className="final-cta">
          <div className="shell final-cta__inner">
            <p className="eyebrow">Toptan · Proje · İhracat</p>
            <h2>Projeniz için doğru çömleği birlikte seçelim.</h2>
            <p>Ürün türü, adet ve teslimat noktasını WhatsApp’tan paylaşın; doğru tedarik planıyla başlayalım.</p>
            <div className="final-cta__actions">
              <TrackedLink
                className="button button--whatsapp"
                href={whatsappUrl('default')}
                target="_blank"
                rel="noreferrer"
                eventName="whatsapp_click"
                eventData={{ location: 'final_cta' }}
              >
                <IconWhatsApp /> WhatsApp’tan teklif al
              </TrackedLink>
              <Link className="button button--light" href="#teklif">
                Teklif formunu aç
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ContactBars />
      <JsonLd data={schemas} />
    </>
  );
}
