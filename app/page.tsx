import Image from 'next/image';
import Link from 'next/link';
import { ContactBars } from '@/components/contact-bars';
import { JsonLd } from '@/components/json-ld';
import { QuoteForm } from '@/components/quote-form';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { TrackedLink } from '@/components/tracked-link';
import { business, categories, faqs, products, whatsappUrl } from '@/lib/site-data';
import { IconInstagram, IconWhatsApp } from '@/components/icons';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const absolute = (path: string) => new URL(path, baseUrl).toString();

export default function Home() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${absolute('/')}#organization`,
      name: business.name,
      alternateName: business.legalName,
      foundingDate: business.founded,
      url: absolute('/'),
      logo: absolute('/og.png'),
      image: absolute('/og.png'),
      telephone: `+${business.phone}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.streetAddress,
        addressLocality: business.locality,
        addressRegion: business.region,
        postalCode: business.postalCode,
        addressCountry: 'TR',
      },
      sameAs: [business.instagram, business.youtube, business.googleBusinessUrl],
      areaServed: [{ '@type': 'Country', name: 'Türkiye' }, { '@type': 'AdministrativeArea', name: 'Mersin' }],
    },
    {
      '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${absolute('/')}#website`, name: business.name, url: absolute('/'),
      inLanguage: ['tr-TR', 'en'], publisher: { '@id': `${absolute('/')}#organization` },
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
    },
  ];

  return (
    <>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <Image className="hero__image" src="/images/hero-terracotta.webp" alt="Akdeniz taş avlusunda el yapımı büyük terracotta küp ve saksılar — temsili görsel" fill priority sizes="100vw" />
          <div className="hero__shade" />
          <SiteHeader overlay />
          <div className="hero__content shell">
            <p className="eyebrow">Tarsus’ta el yapımı · 1927’den günümüze</p>
            <h1 id="hero-title">Toprağın ustalığı,<br />mekânların karakteri.</h1>
            <p className="hero__lead">El yapımı terracotta küp ve saksıları; bahçeler, oteller, villalar, peyzaj projeleri ve toptan tedarik için Tarsus’tan dünyaya taşıyoruz.</p>
            <div className="hero__actions">
              <Link className="button button--solid" href="/urunler">Ürünleri keşfet</Link>
              <TrackedLink className="button button--whatsapp" href={whatsappUrl('wholesale')} target="_blank" rel="noreferrer" eventName="whatsapp_click" eventData={{ location: 'hero' }}>
                <IconWhatsApp /> WhatsApp’tan teklif al
              </TrackedLink>
            </div>
            <p className="concept-note">Hero görseli temsili konsept çalışmadır.</p>
          </div>
          <div className="trust-strip"><div className="shell trust-strip__grid"><p><strong>1927’den beri</strong><span>Geleneksel üretim mirası</span></p><p><strong>El yapımı</strong><span>Her formda usta dokunuşu</span></p><p><strong>Toptan üretim</strong><span>Projeye göre planlanan tedarik</span></p><p><strong>Dünya geneli</strong><span>İhracat taleplerine açık</span></p></div></div>
        </section>

        <section className="section shell" aria-labelledby="categories-title">
          <div className="section-heading section-heading--split"><div><p className="eyebrow">Koleksiyonlar</p><h2 id="categories-title">Toprağın farklı ölçekleri</h2></div><p>Bahçeden anıtsal girişlere, tek üründen toptan tedarike; terracotta’yı kullanım senaryosuna göre keşfedin.</p></div>
          <div className="category-grid">
            {categories.slice(0, 6).map((category, index) => (
              <TrackedLink className={`category-card category-card--${index + 1}`} href={`/urunler/${category.slug}`} eventName="category_view" eventData={{ category: category.slug }} key={category.slug}>
                <Image src={category.image} alt={`${category.name} — temsili terracotta görseli`} fill sizes="(max-width: 700px) 100vw, 40vw" />
                <span><strong>{category.name}</strong><small>Koleksiyonu gör ↗</small></span>
              </TrackedLink>
            ))}
          </div>
          <div className="section-end-link"><Link className="text-link text-link--dark" href="/urunler">Tüm ürün gruplarını keşfet <span>↗</span></Link></div>
        </section>

        <section className="story-section">
          <div className="shell story-section__grid">
            <figure className="story-section__media"><Image src="/images/workshop.webp" alt="Büyük bir terracotta formu şekillendiren usta elleri — temsili görsel" fill sizes="(max-width: 800px) 100vw, 52vw" /><figcaption>Temsili üretim görseli</figcaption></figure>
            <div className="story-section__copy"><p className="eyebrow">Kuşaklar boyunca</p><h2>Dört kuşağa uzanan bir toprak hikâyesi</h2><p className="story-section__lead">Tarsus’ta sürdürülen çömlek ustalığı; bugün büyük ölçekli bahçe, mimari ve ticari mekânların ihtiyaçlarıyla yeniden buluşuyor.</p><div className="story-section__notes"><span>01</span><p>El yapımının bıraktığı yüzey izleri, her parçaya seri üretimde bulunmayan doğal bir karakter verir.</p><span>02</span><p>Üretici kimliği; toptan tedarik, proje bazlı çalışma ve yurtdışı talepler için süreci tek merkezde toplar.</p></div><Link className="text-link text-link--dark" href="/hakkimizda">Hikâyemizi okuyun <span>↗</span></Link></div>
          </div>
        </section>

        <section className="project-feature">
          <Image src="/images/project-concept.webp" alt="Otel avlusunda anıtsal terracotta saksılar — temsili mimari konsept" fill sizes="100vw" />
          <div className="project-feature__shade" />
          <div className="shell project-feature__copy"><p className="eyebrow">Hotels · Villas · Landscape</p><h2>Mekânlara toprağın karakterini katıyoruz</h2><p>Giriş, avlu, teras ve peyzaj aksları için ölçü, form ve yerleşimi birlikte değerlendiren terracotta tedariki.</p><div><Link className="button button--light" href="/projeler">Proje yaklaşımını keşfet</Link><TrackedLink className="button button--whatsapp" href={whatsappUrl('project')} target="_blank" rel="noreferrer" eventName="whatsapp_click" eventData={{ location: 'projects_band' }}><IconWhatsApp /> WhatsApp’tan projenizi gönderin</TrackedLink></div><small>Görsel temsili konsepttir; gerçek müşteri projesi değildir.</small></div>
        </section>

        <section className="trade-section shell section" aria-labelledby="trade-title">
          <div className="section-heading"><p className="eyebrow">Üreticiden doğrudan tedarik</p><h2 id="trade-title">Toptan, proje ve ihracat için tek üretim odağı</h2></div>
          <div className="trade-grid">
            <article className="trade-card trade-card--clay"><span>01 / Wholesale</span><h3>Doğrudan üreticiden toptan çömlek</h3><p>Ürün grubu, adet, teslimat şehri ve takvim bilgisiyle tedarik kapsamını netleştirin.</p><ul><li>Farklı ürün ve ölçü seçenekleri</li><li>Proje bazlı üretim değerlendirmesi</li><li>Paketleme ve sevkiyat planı</li></ul><Link className="text-link" href="/toptan-satis">Toptan fiyat iste <span>↗</span></Link></article>
            <article className="trade-card trade-card--dark"><span>02 / Export</span><h3>Handmade terracotta from Tarsus to the world</h3><p>Wholesale and project-based supply for international buyers, hotels and landscape practices.</p><ul><li>English enquiry flow</li><li>Export packing review</li><li>Worldwide trade requests</li></ul><TrackedLink className="text-link" href="/en/export" eventName="catalog_request">Request wholesale catalogue <span>↗</span></TrackedLink></article>
          </div>
        </section>

        <section className="process-section">
          <div className="shell section-heading section-heading--split"><div><p className="eyebrow">Atölyeden sevkiyata</p><h2>Altı adımda üretim</h2></div><p>Büyük bir form, aceleye gelmeyen bir ritim ister. Her adım bir sonrakinin dayanıklılığını ve karakterini belirler.</p></div>
          <ol className="shell process-grid"><li><span>01</span><h3>Toprağın hazırlanması</h3><p>Şekillendirmeye uygun kıvam ve homojenlik.</p></li><li><span>02</span><h3>Ustanın şekillendirmesi</h3><p>Formun el ve araçlarla katman katman kurulması.</p></li><li><span>03</span><h3>Kurutma</h3><p>Yüzey ve gövdenin kontrollü biçimde dinlendirilmesi.</p></li><li><span>04</span><h3>Fırınlama</h3><p>Toprağın kalıcı terracotta yapısına ulaşması.</p></li><li><span>05</span><h3>Kalite kontrol</h3><p>Form, yüzey ve kullanım uygunluğunun incelenmesi.</p></li><li><span>06</span><h3>Paketleme & sevkiyat</h3><p>Sipariş kapsamına göre koruma ve taşıma planı.</p></li></ol>
          <div className="shell section-end-link"><Link className="text-link text-link--dark" href="/atolye">Atölye sürecini inceleyin <span>↗</span></Link></div>
        </section>

        <section className="featured-product section shell">
          <div className="featured-product__media"><Image src={products[0].images[1]} alt="El yapımı büyük terracotta küp koleksiyonu — temsili ürün görseli" fill sizes="(max-width: 800px) 100vw, 58vw" /><span>Temsili ürün görseli</span></div>
          <div className="featured-product__copy"><p className="eyebrow">Öne çıkan form</p><h2>{products[0].name}</h2><p>{products[0].description}</p><dl><div><dt>Malzeme</dt><dd>{products[0].material}</dd></div><div><dt>Kullanım</dt><dd>Mimari, bahçe ve peyzaj</dd></div><div><dt>Fiyat</dt><dd>Teklif ile</dd></div></dl><TrackedLink className="button button--dark" href={`/urunler/${products[0].slug}`} eventName="product_view" eventData={{ product: products[0].slug }}>Ürünü incele</TrackedLink></div>
        </section>

        <section className="faq-section section shell" aria-labelledby="home-faq-title"><div className="section-heading"><p className="eyebrow">Satış öncesi</p><h2 id="home-faq-title">Sık sorulan sorular</h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

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
              <Link className="blog-card__media" href="/blog/mersin-comlekci"><Image src="/images/workshop.webp" alt="Mersin çömlekçi rehberi" fill sizes="(max-width: 700px) 100vw, 33vw" /></Link>
              <div className="blog-card__body"><h3><Link href="/blog/mersin-comlekci">Mersin çömlekçi arayanlar için Tarsus’ta el yapımı üretim</Link></h3><Link className="text-link text-link--dark" href="/blog">Tüm yazılar <span>↗</span></Link></div>
            </article>
            <article className="blog-card">
              <Link className="blog-card__media" href="/blog/mersin-terracotta"><Image src="/images/collection.webp" alt="Mersin terracotta rehberi" fill sizes="(max-width: 700px) 100vw, 33vw" /></Link>
              <div className="blog-card__body"><h3><Link href="/blog/mersin-terracotta">Mersin terracotta saksı ve küp üreticisi</Link></h3><Link className="text-link text-link--dark" href="/blog/mersin-terracotta">Yazıyı oku <span>↗</span></Link></div>
            </article>
            <article className="blog-card">
              <Link className="blog-card__media" href="/blog/tarsus-comlek-atolyesi"><Image src="/images/workshop.webp" alt="Tarsus çömlek atölyesi" fill sizes="(max-width: 700px) 100vw, 33vw" /></Link>
              <div className="blog-card__body"><h3><Link href="/blog/tarsus-comlek-atolyesi">Tarsus çömlek atölyesi: 1927’den günümüze</Link></h3><Link className="text-link text-link--dark" href="/blog/tarsus-comlek-atolyesi">Yazıyı oku <span>↗</span></Link></div>
            </article>
          </div>
        </section>

        <section className="instagram-section"><div className="shell instagram-section__grid"><div><p className="eyebrow">Atölyeden güncel kareler</p><h2>Atölyemizi Instagram’da takip edin</h2><p>{business.instagramHandle}</p><TrackedLink className="button button--dark button--with-icon" href={business.instagram} target="_blank" rel="noreferrer" eventName="instagram_click"><IconInstagram /> Instagram’ı aç</TrackedLink></div><div className="instagram-section__images"><figure><Image src="/images/workshop.webp" alt="Terracotta üretim süreci — temsili görsel" fill sizes="35vw" /></figure><figure><Image src="/images/collection.webp" alt="Terracotta ürün koleksiyonu — temsili görsel" fill sizes="35vw" /></figure></div></div></section>

        <div className="shell section"><QuoteForm /></div>

        <section className="final-cta"><div className="shell final-cta__inner"><p className="eyebrow">Toptan · Proje · İhracat</p><h2>Projeniz için doğru çömleği birlikte seçelim.</h2><p>Ürün türü, adet ve teslimat noktasını WhatsApp’tan paylaşın; doğru tedarik planıyla başlayalım.</p><div className="final-cta__actions"><TrackedLink className="button button--whatsapp" href={whatsappUrl('default')} target="_blank" rel="noreferrer" eventName="whatsapp_click" eventData={{ location: 'final_cta' }}><IconWhatsApp /> WhatsApp’tan teklif al</TrackedLink><Link className="button button--light" href="#teklif">Teklif formunu aç</Link></div></div></section>
      </main>
      <SiteFooter />
      <ContactBars />
      <JsonLd data={schemas} />
    </>
  );
}
