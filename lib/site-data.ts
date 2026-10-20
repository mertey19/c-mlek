import { pagePhoto, photoAlt, photoCollection } from './photography';
import businessJson from '@/content/business.json';
import categoriesJson from '@/content/categories.json';
import productsJson from '@/content/products.json';
import { categoryEditorial, CATALOG_CONTENT_UPDATED } from './category-content';
import { guidePages } from './guide-content';
import {
  WHATSAPP_HREF_CONTEXTS,
  type Business,
  type Category,
  type ContentBlock,
  type Product,
} from './content-types';

export type { ContentBlock, Product } from './content-types';

/** content/business.json — admin panelindeki "Firma bilgileri" ekranından düzenlenir. */
export const business: Business = businessJson;

export type WhatsAppContext = (typeof WHATSAPP_HREF_CONTEXTS)[number];

export function whatsappMessage(context: WhatsAppContext = 'default', detail?: string, english = false) {
  if (english) {
    switch (context) {
      case 'product':
        return `Hello Tarsus Pottery, I am contacting you from the website about ${detail || 'a product'}. I would like pricing and availability.`;
      case 'project':
        return 'Hello, I would like a quote for project / wholesale terracotta products for our space.';
      case 'wholesale':
        return 'Hello Tarsus Pottery, I am interested in wholesale terracotta pots. Please share pricing information.';
      case 'export':
        return 'Hello Tarsus Pottery, I am contacting you for export / wholesale terracotta supply.';
      case 'quote':
        return detail || 'Hello Tarsus Pottery, I would like a quote from your website.';
      default:
        return 'Hello Tarsus Pottery, I am reaching out from your website. I would like product information and pricing.';
    }
  }

  switch (context) {
    case 'product':
      return `Merhaba, ${detail || 'bu ürün'} ürünü hakkında fiyat ve stok bilgisi almak istiyorum.`;
    case 'project':
      return 'Merhaba, projemiz için toptan/proje bazlı terracotta ürünler hakkında teklif almak istiyorum.';
    case 'wholesale':
      return 'Merhaba Tarsus Çömlekçilik, toptan terracotta / çömlek fiyatı ve ürün bilgisi almak istiyorum.';
    case 'export':
      return 'Merhaba Tarsus Çömlekçilik, ihracat / wholesale terracotta tedariki hakkında bilgi almak istiyorum.';
    case 'quote':
      return detail || 'Merhaba Tarsus Çömlekçilik, web sitenizden ulaşıyorum. Ürünleriniz hakkında bilgi ve fiyat almak istiyorum.';
    default:
      return 'Merhaba Tarsus Çömlekçilik, web sitenizden ulaşıyorum. Ürünleriniz hakkında bilgi ve fiyat almak istiyorum.';
  }
}

export function whatsappUrl(context: WhatsAppContext = 'default', detail?: string, english = false) {
  const text = encodeURIComponent(whatsappMessage(context, detail, english));
  return `https://wa.me/${business.whatsapp}?text=${text}`;
}

export function phoneHref() {
  return `tel:+${business.phone}`;
}

/** Blok linklerinde `whatsapp:<bağlam>` kısayolunu güncel WhatsApp bağlantısına çevirir. */
export function resolveHref(href: string, english = false) {
  const context = href.startsWith('whatsapp:') ? href.slice('whatsapp:'.length) : null;
  if (context && (WHATSAPP_HREF_CONTEXTS as readonly string[]).includes(context)) {
    return whatsappUrl(context as WhatsAppContext, undefined, english);
  }
  return href;
}

/** content/products.json — admin panelindeki "Ürünler" ekranından düzenlenir. */
export const products: Product[] = productsJson;

/** Ana sayfadaki "Öne çıkan form" alanında gösterilen ürün. */
export const featuredProduct: Product = products.find((product) => product.featured) ?? products[0];

/** content/categories.json — admin panelindeki "Kategoriler" ekranından düzenlenir. */
export const categories: Category[] = categoriesJson;

export function categoryFromPath(path: string) {
  return categories.find((category) => path === `/urunler/${category.slug}`);
}

export function productsForCategory(category: Category) {
  const names = [category.name, category.en, category.slug].map((name) => name.trim().toLocaleLowerCase('tr-TR'));
  return products.filter((product) => names.includes(product.category.trim().toLocaleLowerCase('tr-TR')));
}

export const faqs = [
  ['Toptan satış yapıyor musunuz?', 'Evet. Ürün grubu, adet ve teslimat planına göre toptan tedarik talepleri değerlendirilmektedir.'],
  ['Türkiye geneline gönderim yapıyor musunuz?', 'Sevkiyat planı ürün ölçüsü, adet ve teslimat noktasına göre teklif aşamasında netleştirilir.'],
  ['Yurtdışına ihracat yapıyor musunuz?', 'Yurtdışı toptan ve proje talepleri kabul edilmektedir. Ülke, adet ve ürün bilgilerini paylaşarak ihracat teklifi isteyebilirsiniz.'],
  ['Otel ve villa projeleri için üretim yapıyor musunuz?', 'Evet. Otel, villa, restoran, peyzaj ve mimari projeler için kullanım senaryosuna göre ürün ve ölçü seçimi planlanabilir.'],
  ['Özel ölçü üretim mümkün mü?', 'Uygulanabilirlik ürün formu, ölçü ve adet bilgilerine göre atölye tarafından değerlendirilir.'],
  ['Ürünler el yapımı mı?', 'Ana terracotta ürün grupları el işçiliğiyle şekillendirilir. Bu nedenle yüzey ve tonlarda doğal küçük farklılıklar oluşabilir.'],
  ['Minimum sipariş miktarı nedir?', 'Sipariş miktarı ürün ve projeye göre değişmektedir. Detaylı bilgi için teklif talebi oluşturabilirsiniz.'],
] as const;

export type PageContent = {
  path: string;
  locale: 'tr' | 'en';
  kicker: string;
  title: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  imageAlt: string;
  updatedAt?: string;
  blocks: ContentBlock[];
  faq?: readonly (readonly [string, string])[];
};

const trPages: PageContent[] = [
  {
    path: '/urunler', locale: 'tr', kicker: 'Tarsus üretimi · Koleksiyonlar', title: 'El yapımı toprak saksı, çömlek ve büyük küpler',
    intro: 'Tarsus toprak saksı ve çömlek koleksiyonlarını kullanım alanına göre keşfedin. Büyük boy toprak küp, bahçe saksısı ve mimari formlar için katalog bilgilerini inceleyin; ölçü, adet ve teslimat noktasıyla teklif isteyin.',
    updatedAt: '2026-10-19',
    seoTitle: 'El Yapımı Terracotta Saksı & Küp Modelleri | Tarsus',
    seoDescription: 'Büyük terracotta küpler, bahçe saksıları, dekoratif ve mimari saksılar. Toptan, otel, villa ve peyzaj projeleri için ürün gruplarını inceleyin.',
    ...pagePhoto('clayCollection', 'tr'),
    blocks: [
      { title: 'Form, ölçek ve kullanım', body: 'Her proje aynı saksıyı istemez. Giriş aksları için heykelsi büyük küpler, dolaşım alanları için daha kontrollü formlar, peyzaj içinse bitki kökü ve sulama düzenine uygun hacimler gerekir.', bullets: ['Doğal terracotta yüzey', 'El yapımından gelen küçük varyasyonlar', 'İç ve dış mekân kullanım senaryoları', 'Toptan ve proje bazlı tedarik'] },
      { title: 'Saksı ile dekoratif küpü kullanımına göre ayırın', body: 'El yapımı toprak saksıda iç hacim, ağız açıklığı ve drenaj bilgisi önemlidir. Büyük bahçe küpü yalnızca dekoratif kullanılacaksa dış oran ve yerleşim öne çıkar. Bir formun bitkili kullanıma uygunluğunu görünüşünden çıkarmayın; katalogdaki ölçüleri ve atölyenin ürün bazındaki açıklamasını esas alın.', link: { href: '/rehber/buyuk-boy-saksi-secerken', label: 'Büyük saksı ve küp seçim rehberi' } },
      { title: 'Birlikte doğru grubu seçelim', body: 'Mekân fotoğrafı, yaklaşık ölçü, adet ve teslimat şehrini paylaşın; uygun ürün grubu üzerinden teklif hazırlığına başlayalım.', link: { href: '/iletisim#teklif', label: 'Ürün talebi oluştur' } },
    ], faq: faqs,
  },
  {
    path: '/toptan-satis', locale: 'tr', kicker: 'B2B tedarik', title: 'Doğrudan üreticiden toptan çömlek',
    intro: 'Tarsus’taki atölyeden mağazalar, peyzaj firmaları ve ticari projeler için toptan çömlek ve terracotta saksı talepleri alıyoruz. Ürün listesini, adet dağılımını ve teslimat kapsamını birlikte netleştirerek üreticiden teklif isteyin.',
    updatedAt: '2026-10-19',
    seoTitle: 'Toptan Çömlek ve Terracotta Saksı | Tarsus, Mersin',
    seoDescription: 'Tarsus, Mersin’de üreticiden toptan çömlek, toprak ve bahçe saksısı talepleri. Ürün, ölçü, adet ve teslimat bilgileriyle fiyat teklifi isteyin.',
    ...pagePhoto('blueStock', 'tr'),
    blocks: [
      { title: 'Toptan toprak saksı için kalemli ürün listesi', body: 'Farklı boy ve formları tek toplam adet altında toplamayın. Toptan bahçe saksısı, dekoratif küp ve mimari saksı taleplerini ayrı satırlarda belirtin. Mevcut ürün bağlantısı, hedef ölçü ve kullanım yeri doğru kapsamı konuşmayı kolaylaştırır. Katalogda görünen bir ürünün hazır stokta bulunduğu varsayılmamalıdır.', bullets: ['Ürün adı veya katalog bağlantısı', 'Ölçü birimiyle yükseklik ve çap', 'Her ürün için tahmini adet', 'Teslimat şehri, ilçe veya ülke', 'Hedef tarih aralığı ve varsa etaplar'], link: { href: '/urunler', label: 'Toptan talep için ürün gruplarını seçin' } },
      { title: 'Mersin ve Tarsus’ta üreticiden tedarik', body: 'Mersin toptan çömlek talepleri Tarsus’taki üretim noktası üzerinden değerlendirilir. Mersin ilçelerindeki teslimat adresini, araç erişimini ve indirme koşullarını paylaşın. İlçe sayfaları ayrı mağaza veya şube anlamına gelmez. Türkiye’nin diğer şehirlerinden gelen taleplerde de taşıma planı ürün ölçüsü, adet ve adresle birlikte netleştirilir.', link: { href: '/mersin', label: 'Mersin ilçe bazlı tedarik bilgileri' } },
      { title: 'Oteller ve proje alımları için ayrı kapsam', body: 'Oteller için toptan saksı alımında giriş, avlu ve teras kalemlerini uygulama etaplarına göre ayırın. Mağaza alımında ise form ve ölçü dağılımını belirtin. Doğal ton farkı, numune veya örnek onayı beklentisini baştan konuşun. Minimum adet ve üretim takvimi, ürün ve sipariş kapsamına göre teyit edilir.', link: { href: '/projeler', label: 'Proje bazlı saksı tedarikini inceleyin' } },
      { title: 'Fiyat ve sevkiyat nasıl netleşir?', body: 'Birim fiyatın yanında paketleme, nakliye, indirme ve son konuma yerleştirmenin hangi kapsamda olduğunu sorun. Ürün listesi ve üretim seçeneği onaylandıktan sonra teslim ve ödeme koşullarını yazılı teklif üzerinden değerlendirin. Özel ölçü terracotta saksı taleplerinde uygulanabilirlik ayrıca incelenir; sabit fiyat veya kesin teslim günü önceden varsayılmaz.', link: { href: '/rehber/toptan-saksi-alirken', label: 'Toptan teklif karşılaştırma rehberi' } },
      { title: 'Toptan fiyat talebinizi gönderin', body: 'Aşağıdaki formda firma, ürün grubu, adet ve teslimat bilgilerini paylaşın. Form talebinizi WhatsApp mesajı olarak hazırlar; gönderimi siz onaylarsınız. Yurtdışı alımlarında hedef ülkeyi ve teslim noktasını da ekleyin.', link: { href: '#teklif', label: 'Toptan teklif formuna geçin' } },
    ], faq: faqs,
  },
  {
    path: '/projeler', locale: 'tr', kicker: 'Mimari & peyzaj', title: 'Mimari saksı üretimi ve proje tedariki',
    updatedAt: '2026-10-19',
    intro: 'Otel, villa, restoran, bahçe ve ticari alanlar için terracotta ürünleri ölçü, dolaşım, bitkilendirme ve mekânsal ritimle birlikte düşünün.',
    seoTitle: 'Mimari Saksı Üretimi ve Peyzaj Projeleri | Tarsus',
    seoDescription: 'Otel, villa, restoran ve peyzaj projeleri için büyük terracotta saksı ve küp çözümleri. Projenizi paylaşın, ürün ve tedarik teklifi alın.',
    ...pagePhoto('hotel', 'tr'),
    blocks: [
      { title: 'Peyzaj projeleri için terracotta ürün listesi', body: 'Plan üzerindeki her yerleşim noktasına bir kod verin; form, yaklaşık ölçü, adet ve bitkili ya da dekoratif kullanım bilgisini ekleyin. Böylece peyzaj saksıları ile büyük peyzaj küpü talepleri birbirine karışmaz. Bitki kök hacmi, sulama ve bakım ihtiyaçlarını peyzaj sorumlusuyla hazırlayıp ürün görüşmesine dahil edin.', link: { href: '/urunler/peyzaj-projeleri', label: 'Peyzaj ürünlerinde seçim kriterleri' } },
      { title: 'Mimari terracotta saksıda form ve uygulanabilirlik', body: 'Giriş aksı, cephe oranı ve dolaşım alanı hedef formu belirlemeye yardımcı olur. Özel ölçü veya farklı form isteniyorsa çizim, referans görsel ve adet paylaşın. Mimari saksı üretimi talebi, atölyenin form ve ölçü değerlendirmesinden sonra netleşir. Her çizimin birebir üretilebileceği veya aynı takvimde teslim edilebileceği varsayılmamalıdır.', link: { href: '/urunler/ozel-uretim', label: 'Özel üretim çömlek talebini hazırlayın' } },
      { title: 'Ürün tedariki ile saha uygulamasını ayırın', body: 'Zemin taşıma kapasitesi, rüzgâr, sabitleme, drenaj ve güvenli geçişler ilgili proje uzmanlarınca değerlendirilmelidir. Saksı tedariki tek başına bitki temini, dikim, taşıma ekipmanı veya son konuma yerleştirmeyi kapsamaz. Ürün, paketleme, sevkiyat ve saha işlerinin sorumlularını teklif aşamasında ayrı ayrı belirleyin.', link: { href: '/otel-villa-peyzaj', label: 'Otel, villa ve restoran kullanım senaryoları' } },
      { title: 'Projenizi paylaşın', body: 'Plan, ölçü veya mekân fotoğrafı; uygun ürün ölçeğini konuşmak için yeterli bir başlangıçtır. Konsept görseller gerçek referans olarak sunulmaz.', link: { href: '/iletisim#teklif', label: 'Proje teklifi alın' } },
    ], faq: faqs.slice(2, 6),
  },
  {
    path: '/otel-villa-peyzaj', locale: 'tr', kicker: 'Uygulama alanları', title: 'Otel ve villa bahçeleri için büyük terracotta saksılar',
    updatedAt: '2026-10-19',
    intro: 'Mimari ölçekte kullanılan saksı ve küpleri giriş, avlu, teras, bahçe ve yaya akslarında tutarlı bir koleksiyon diliyle planlayın.',
    seoTitle: 'Otel & Villa İçin Büyük Terracotta Saksılar | Tarsus',
    seoDescription: 'Otel, villa, resort ve peyzaj uygulamalarına uygun büyük terracotta saksı ve dekoratif küp seçenekleri. Proje bazlı tedarik talebi oluşturun.',
    ...pagePhoto('palmTrio', 'tr'),
    blocks: [
      { title: 'Otel için büyük saksı: karşılama ve avlu', body: 'Karşılama alanında uzaktan görülen yüksek bir form ile dinlenme avlusundaki bitkili saksı farklı işler üstlenir. Misafir ve servis hareketini kesmeden bir yerleşim planı hazırlayın. Birlikte görülecek ürünlerin oranını, yüzey beklentisini ve adetlerini aynı listede tutun. Konsept fotoğraflar gerçek otel referansı değil, kullanım fikridir.', link: { href: '/rehber/otel-peyzajinda-saksi-secimi', label: 'Otel peyzajında seçim ve tedarik rehberi' } },
      { title: 'Villa bahçe saksısı ve dekoratif küp', body: 'Bahçe girişinde odak oluşturmak için dekoratif küp, oturma alanında bitkili kullanım için uygun iç hacimli saksı değerlendirilebilir. Kapı açıklığı, basamak ve araç erişimini fotoğraflayın. Büyük ürünlerde yalnızca son görünümü değil, bahçedeki yerine nasıl ulaşacağını da düşünün. Dikim ve dış ortam uygunluğu seçilen ürün için ayrıca teyit edilmelidir.', link: { href: '/urunler/bahce-saksilari', label: 'Bahçe saksısı koleksiyonunu görün' } },
      { title: 'Restoran dış mekân saksısı', body: 'Masa aralarını ayıran saksılarda sandalye hareketi, servis güzergâhı ve temizlik erişimi korunmalıdır. Formun en geniş çapını yerleşim planına işleyin. Bitki kullanılacaksa ağız açıklığı, drenaj ve bakım düzenini işletme ekibiyle değerlendirin. Dolaşımı yalnızca boş restoran fotoğrafı üzerinden planlamak, kullanım saatlerindeki ihtiyaçları gözden kaçırabilir.' },
      { title: 'Teras terracotta saksı yerleşimi', body: 'Terasta ürünün boş ağırlığı kadar toprak, bitki ve suyla oluşacak toplam yük de önemlidir. Zemin, rüzgâr, drenaj ve taşıma koşullarını ilgili uzmanlarla görüşün. İç saksı, bakım erişimi ve suyun tahliyesi için ürün özelinde bilgi alın; katalog ölçüsü veya temsili görsel teknik uygulama onayı yerine geçmez.', link: { href: '/urunler/mimari-saksilar', label: 'Mimari saksılarda proje hazırlığı' } },
      { title: 'Alanları tek tedarik planında birleştirin', body: 'Otel, villa veya peyzaj projesinin farklı alanlarını ürün kodları ve etaplarla listeleyin. Adet, hedef ölçü ve teslimat noktasına göre atölye değerlendirmesi isteyin. Tedarik, sevkiyat, indirme ve yerleştirme kapsamını ayrıca görüşerek uygulama takviminizi hazırlayın.', link: { href: '/projeler', label: 'Proje tedarik sürecine geçin' } },
    ],
  },
  {
    path: '/ihracat', locale: 'tr', kicker: 'Yurtdışı tedarik', title: 'Türkiye’den terracotta saksı ve çömlek ihracat talepleri',
    updatedAt: '2026-10-19',
    intro: 'Yurtdışı toptancıları, oteller, tasarım stüdyoları ve peyzaj projeleri için ürün, adet, paketleme ve teslimat kapsamını birlikte netleştirin.',
    seoTitle: 'Terracotta Saksı ve Çömlek İhracatı | Tarsus, Türkiye',
    seoDescription: 'Türkiye’den el yapımı terracotta saksı ve küp ihracatı. Toptancı, otel, villa ve peyzaj projeleri için İngilizce teklif talebi oluşturun.',
    ...pagePhoto('packing', 'tr'),
    blocks: [
      { title: 'İhracat talebinizi hazırlayın', body: 'Türkiye’den çömlek üreticisi arayan yurtdışı alıcıları için ilk adım net bir ürün listesidir. Form, ölçü, adet, kullanım alanı ve hedef ülkeyi paylaşın. Varış noktası ve hedef tarih, paketleme ve taşıma seçeneklerinin değerlendirilmesini sağlar. Katalog talebi, stok veya belirli ülkeye kesin sevkiyat taahhüdü değildir.', bullets: ['Ürün bağlantısı ve her kalem için adet', 'Ölçü birimi ve hedef kullanım', 'Varış ülkesi ve teslimat noktası', 'Paketleme ve teslim kapsamı beklentisi'] },
      { title: 'Nakliye ve belge kapsamını netleştirin', body: 'Ambalaj, yükleme, taşıma ve varışta teslim alma sorumlulukları siparişe göre görüşülür. Alıcının veya taşıyıcının istediği belge ve etiket bilgilerini önceden iletin. Ürünün kullanım uygunluğu, teslim koşulları ve gerekli belgeler teyit edilmeden evrensel ihracat uygunluğu veya sabit transit süre varsayılmamalıdır.', link: { href: '/toptan-satis', label: 'Üreticiden toptan alım hazırlığı' } },
      { title: 'English sales pages', body: 'International buyers can review the dedicated English pages and send a structured wholesale enquiry.', link: { href: '/en/export', label: 'View export page in English' } },
    ], faq: faqs.slice(0, 4),
  },
  {
    path: '/atolye', locale: 'tr', kicker: 'Mersin · Tarsus üretim noktası', title: 'Tarsus çömlek atölyesi: toprak, el ve ateş',
    intro: 'Tarsus el yapımı çömlek üretiminde hazırlık, şekillendirme, kurutma ve fırınlama bir bütündür. Mersin’de çömlek imalatı için ürün veya özel form talebinizi Tarsus’taki atölyemizle görüşebilirsiniz.',
    updatedAt: '2026-10-19',
    seoTitle: 'Tarsus Çömlek Atölyesi | Mersin Çömlek İmalatı',
    seoDescription: 'Tarsus çömlek atölyesinde el yapımı terracotta üretim aşamaları. Mersin’de çömlek imalatı, özel form ve toptan ürün talepleri için bilgi alın.',
    ...pagePhoto('workshopInterior', 'tr'),
    blocks: [
      { title: '01—03 · Hazırlık ve şekillendirme', body: 'Toprağın hazırlanmasıyla başlayan süreçte form, ustanın elleriyle katman katman kurulur; ardından çatlama riskini azaltacak biçimde kontrollü kurutulur.', bullets: ['Toprağın hazırlanması', 'Ustanın şekillendirmesi', 'Kontrollü kurutma'] },
      { title: '04—06 · Ateş ve sevkiyat', body: 'Fırınlama sonrasında yüzey ve form kontrol edilir. Sipariş kapsamına göre paketleme ve sevkiyat planı hazırlanır.', bullets: ['Fırınlama', 'Kalite kontrol', 'Paketleme ve sevkiyat'] },
      { title: 'Tarsus terracotta üreticisiyle formu değerlendirin', body: 'Mersin çömlek imalatçısı ararken yalnızca bitmiş ürün fotoğrafını değil, hedef ölçü ve adedi de paylaşın. Büyük form, dar ağız veya özel yüzey beklentisi üretim değerlendirmesini etkiler. Özel üretim çömlek talepleri çizim ya da referans görselle görüşülebilir; yapılabilirlik, tolerans ve takvim atölye incelemesiyle netleşir.', link: { href: '/urunler/ozel-uretim', label: 'Özel üretim talebi için gerekli bilgiler' } },
      { title: 'Üretim atölyesi ile kurs talebini ayırın', body: 'Tarsus seramik atölyesi ararken üretim, ürün satın alma ve eğitim beklentisi farklı olabilir. Bu sayfa çömlek üretimi ve tedarik sürecini anlatır; ilan edilmiş bir kurs programı veya randevusuz ziyaret taahhüdü değildir. Ziyaret planlamadan önce iletişime geçin. Atölye ve ziyaret noktası Tarsus’tadır; ilçe tedarik sayfaları ayrı şubeler değildir.', link: { href: '/iletisim', label: 'Atölye adresi ve iletişim bilgileri' } },
    ],
  },
  {
    path: '/hakkimizda', locale: 'tr', kicker: '1927’den günümüze', title: 'Özçereciler Toprak Sanatları: Tarsus’un çömlek geleneği',
    updatedAt: '2026-10-19',
    intro: 'Tarsus’ta kuşaklar boyunca sürdürülen çömlek ustalığını, günümüzün bahçe, mimari ve ticari mekânlarına taşıyan bir üretim kültürü.',
    seoTitle: 'Özçereciler Toprak Sanatları | Tarsus Çömlekçilik',
    seoDescription: '1927’den günümüze Tarsus’ta sürdürülen el yapımı çömlek ve terracotta üretim kültürünü, atölye yaklaşımını ve marka hikâyesini tanıyın.',
    ...pagePhoto('workshopYard', 'tr'),
    blocks: [
      { title: 'Kökü gelenekte, gözü mekânda', body: 'Geleneksel üretim bilgisi; yalnızca geçmişi korumak için değil, güncel mimari ve peyzaj ihtiyaçlarına doğru formu üretmek için yaşatılır.' },
      { title: 'Özçereciler Toprak Sanatları', body: 'Üretici kimliği; ürün geliştirme, toptan tedarik, proje bazlı çalışma ve uluslararası talepler için markanın kurumsal omurgasını oluşturur.', link: { href: '/atolye', label: 'Üretim sürecini keşfet' } },
      { title: 'Mersin’de üretim, farklı mekânlara tedarik', body: 'Tarsus çömlekçi geleneğini bahçe, konaklama ve mimari kullanım ihtiyaçlarıyla birlikte değerlendiriyoruz. Ürün seçimi için katalog bilgileri; sipariş kararı için ölçü, adet, üretim ve sevkiyat teyidi esas alınır. İşletme iletişim ve ziyaret noktası Tarsus’taki atölyedir. Mersin ilçelerine yönelik içerikler ürün ve teslimat hazırlığı içindir, ayrı şube iddiası taşımaz.', link: { href: '/mersin', label: 'Mersin için yerel tedarik rehberi' } },
    ],
  },
  {
    path: '/galeri', locale: 'tr', kicker: 'Görsel arşiv', title: 'Toprağın yüzeyleri ve ölçekleri',
    updatedAt: '2026-10-20',
    intro: `Büyük terracotta küplerden mavi yeşil sırlı seramiklere; ürün, atölye, hazırlık ve mekân düzenlemelerinden ${photoCollection.length} kare. Her görseli kendi oranında inceleyin ve detayları tam boy açın.`,
    seoTitle: 'Terracotta Ürün, Atölye ve Proje Galerisi | Tarsus',
    seoDescription: 'Büyük terracotta küpler, saksılar, üretim süreci ve mimari kullanım görsellerini editorial galeride keşfedin.',
    ...pagePhoto('blueBatch', 'tr'),
    blocks: [
      { title: 'Form, yüzey ve hazırlık', body: 'Doğal terracotta küpleri, sırlı seramiklerin renk geçişlerini, atölye içindeki ürün gruplarını ve konteyner içi hazırlık karelerini ayrı başlıklarda keşfedin. Ürün ölçüsü, renk seçeneği ve güncel bulunabilirlik sipariş öncesinde teyit edilir.' },
      { title: 'Mekân ve stil örnekleri', body: 'Otel, restoran, giriş ve teras sahneleri yerleşim fikri vermek içindir. Bu sahnelerde görünen mekân ve tabelalar tamamlanmış müşteri projesi veya iş ortaklığı iddiası taşımaz.' },
    ],
  },
  {
    path: '/iletisim', locale: 'tr', kicker: 'Teklif & iletişim', title: 'İhtiyacınızı birkaç ayrıntıyla anlatın',
    intro: 'Ürün grubu, yaklaşık adet, teslimat şehri veya ülkesi ve varsa mekân görseli; doğru teklif için yeterli başlangıç bilgilerini sağlar.',
    seoTitle: 'İletişim & Teklif | Tarsus Çömlekçilik',
    seoDescription: 'Toptan çömlek, terracotta saksı, otel-villa-peyzaj projesi ve ihracat talepleriniz için Tarsus Çömlekçilik ile iletişime geçin.',
    ...pagePhoto('gardenTrio', 'tr'),
    blocks: [
      { title: 'WhatsApp üzerinden hızlı teklif', body: 'Toptan, proje ve ihracat taleplerini Instagram bio’daki doğrulanmış WhatsApp hattından alın. Form gönderimi de WhatsApp mesajına dönüştürülür.', link: { href: whatsappUrl('default'), label: 'WhatsApp’tan yazın' } },
      { title: 'Atölye adresi', body: 'Yeşil Mah., Hasan Özçivi Cd., 4202. Sk. No: 60, 33450 Tarsus/Mersin. Ziyaret veya teslimat planı için önceden haber vermenizi rica ederiz.', link: { href: business.googleMapsUrl, label: 'Google Haritalar’da aç' } },
      { title: 'Teklifinizi hızlandırın', body: 'Firma, ülke/şehir, ürün grubu, tahmini adet ve kullanım alanı bilgilerini hazırlayın. Proje taleplerinde ölçü veya mekân fotoğrafı eklemek ürün seçimini kolaylaştırır.' },
    ], faq: faqs,
  },
  {
    path: '/rehber', locale: 'tr', kicker: 'Terracotta rehberi', title: 'Doğru ürün için doğru bilgi',
    updatedAt: '2026-10-19',
    intro: 'Terracotta malzemeyi, büyük saksı seçimini, peyzaj kullanımını ve toptan tedarik sürecini karar vermeyi kolaylaştıracak biçimde ele alan içerik merkezi. Yerel üretim ve Mersin terracotta konuları için blog sayfamıza da göz atın.',
    seoTitle: 'Terracotta Saksı & Çömlek Rehberi | Tarsus Çömlekçilik',
    seoDescription: 'Terracotta saksı nedir, büyük saksı nasıl seçilir ve toptan alımda nelere dikkat edilir? Uygulama odaklı rehberleri keşfedin.',
    ...pagePhoto('clayCollection', 'tr'),
    blocks: [
      { title: 'Terracotta Saksı Nedir?', body: 'Pişmiş toprağın gözenekli yapısı, doğal renk geçişleri ve elde şekillendirildiğinde kazandığı küçük varyasyonlar terracotta karakterinin temelidir.', link: { href: '/rehber/terracotta-saksi-nedir', label: 'Rehberi oku' } },
      { title: 'Büyük Boy Saksı Seçimi', body: 'Ölçek, drenaj, kök hacmi, rüzgâr ve taşıma rotası; yalnızca estetik değil uygulama kararlarıdır.', link: { href: '/rehber/buyuk-boy-saksi-secerken', label: 'Seçim kriterlerini incele' } },
      { title: 'Otel Peyzajında Saksı', body: 'Sirkülasyon, bakım ve tekrar ritmi üzerinden konaklama alanlarında büyük saksı kullanımını planlayın.', link: { href: '/rehber/otel-peyzajinda-saksi-secimi', label: 'Proje rehberini oku' } },
      { title: 'Toptan Saksı Alımı', body: 'Ürün standardı, adet, paketleme, teslimat ve numune sürecini teklif öncesinde netleştirin.', link: { href: '/rehber/toptan-saksi-alirken', label: 'Toptan alım rehberi' } },
      { title: 'Mersin & Tarsus blog', body: 'Mersin ilçelerinde bahçe, teras ve ticari mekânlar için ürün seçimi, atölye üretimi ve teslimat hazırlığı hakkında pratik yazılar.', link: { href: '/blog', label: 'Blog yazılarını oku' } },
    ],
  },
];

const categoryPages: PageContent[] = categories.map((category) => {
  const editorial = categoryEditorial(category);
  return {
    path: `/urunler/${category.slug}`,
    locale: 'tr' as const,
    kicker: 'Ürün koleksiyonu',
    title: category.name,
    intro: editorial.intro,
    seoTitle: editorial.seoTitle ?? `${category.name} Modelleri ve Seçim Rehberi`,
    seoDescription: editorial.description,
    updatedAt: CATALOG_CONTENT_UPDATED,
    image: category.image,
    imageAlt: photoAlt(category.image, `${category.name} koleksiyonu`),
    blocks: editorial.blocks,
    faq: faqs.slice(0, 5),
  };
});

const articlePages: PageContent[] = guidePages;

const enPages: PageContent[] = [
  {
    path: '/en', locale: 'en', kicker: 'Handmade in Tarsus · Since 1927', title: 'Handmade terracotta pots from Turkey',
    intro: 'Tarsus Pottery — Özçereciler Toprak Sanatları — makes handmade terracotta in Tarsus, Mersin. Explore large jars, garden planters and decorative pottery for wholesale and project enquiries from Turkey.',
    updatedAt: '2026-10-19',
    seoTitle: 'Terracotta Pots Manufacturer in Turkey | Tarsus Pottery',
    seoDescription: 'Handmade Turkish terracotta pots and oversized planters for wholesale, hotels, villas and landscape projects. Request an export quotation.',
    ...pagePhoto('gardenTrio', 'en'),
    blocks: [
      { title: 'Choose a product family before requesting a quote', body: 'A sculptural jar and a planting vessel can have similar silhouettes but different requirements. For planting, ask about usable internal dimensions, drainage and care. For decorative placement, compare the height, widest diameter and base against the intended space. Catalogue images do not establish stock availability or suitability for every outdoor setting.', link: { href: '/en/products', label: 'Explore terracotta pots and large planters' } },
      { title: 'Work directly with the Tarsus production workshop', body: 'Our production and visit location is in Tarsus, Mersin. Handmade surfaces can vary in tone, texture and dimensions; discuss the acceptable variation before ordering a group. Custom forms and sizes are reviewed for feasibility rather than offered as an unlimited manufacturing promise.', link: { href: '/en/about', label: 'About our pottery workshop' } },
      { title: 'Wholesale supply and export enquiries', body: 'Retailers, hospitality teams and landscape companies can share a product list with quantities and a destination. Production availability, packing and delivery scope are confirmed for the individual order. International buyers should include the destination country and receiving point so the export requirements can be reviewed.', link: { href: '/en/wholesale', label: 'Wholesale terracotta supply from Turkey' } },
      { title: 'Start a trade enquiry', body: 'Share the product category, estimated quantity, destination country and target schedule for a structured quotation.', link: { href: '/en/contact#quote', label: 'Request a quotation' } },
    ],
  },
  {
    path: '/en/products', locale: 'en', kicker: 'Collections made in Tarsus', title: 'Handmade terracotta pots, large jars and planters',
    updatedAt: '2026-10-19',
    intro: 'Explore oversized jars, planters, garden pottery and architectural terracotta for wholesale and project-based supply.',
    seoTitle: 'Turkish Terracotta Pots & Large Planters | Products', seoDescription: 'Explore handmade terracotta pots, oversized jars, garden planters and architectural pottery made in Tarsus, Turkey.',
    ...pagePhoto('clayCollection', 'en'),
    blocks: [
      { title: 'Large jars for a focal point', body: 'Compare height, shoulder width, mouth opening and base size when choosing a large terracotta jar. A narrow-necked decorative vessel may not accept the inner pot you intend to use. Share a placement photo and the route from the delivery point to the final position; the widest part of the form matters as much as its height.', link: { href: '/en/projects', label: 'Planning jars and planters for a project' } },
      { title: 'Garden and architectural planters', body: 'For planting, request internal dimensions, drainage details and product-specific care information. Exterior dimensions alone do not establish usable root space. If a planter will stand on a terrace or raised structure, the project team should assess the full planted load and site conditions. A product suggestion does not replace a technical site assessment.' },
      { title: 'Handmade surfaces and custom requirements', body: 'Natural differences in tone, surface and dimensions can occur between handmade pieces. Describe the finish and consistency you need for a grouped installation. Custom-size requests are assessed against the form, quantity and intended use; exact reproduction of a reference image is not assumed. Availability, lead time and any sample arrangements are confirmed individually.' },
      { title: 'Build a product enquiry with separate line items', body: 'List the product name or catalogue link, target dimensions with units, quantity and intended use for each form. The catalogue detail pages are currently in Turkish; include their links in your English enquiry to identify the products clearly. For trade orders, add the destination and preferred schedule.', link: { href: '/en/wholesale', label: 'Request a wholesale product quotation' } },
    ],
  },
  {
    path: '/en/wholesale', locale: 'en', kicker: 'B2B supply from Tarsus', title: 'Wholesale terracotta pots from Turkey',
    intro: 'Source handmade pots, large terracotta planters and decorative jars through a direct manufacturer enquiry. Retailers, landscape companies and hospitality buyers can request a quotation by product, quantity and destination.',
    updatedAt: '2026-10-19',
    seoTitle: 'Wholesale Terracotta Pots Turkey | Manufacturer Supply', seoDescription: 'Request wholesale Turkish terracotta pots, large jars and garden planters directly from a Tarsus manufacturer.',
    ...pagePhoto('blueStock', 'en'),
    blocks: [
      { title: 'Large terracotta planters for wholesale orders', body: 'Separate large planting vessels from decorative jars in your buying list. Specify height, widest diameter, mouth opening and units, along with quantity for each form. For a planted installation, add internal-space and drainage requirements. A mixed-size order can be reviewed, but availability and production feasibility must be confirmed for each item.', link: { href: '/en/products', label: 'Browse pots, jars and planters' } },
      { title: 'Quantity, samples and production timing', body: 'There is no universal minimum quantity or lead time stated for every product. These depend on the form, dimensions, production situation and order scope. If you need a sample or finish approval, include that in the brief so availability, cost and timing can be discussed. Handmade variation should be considered when pieces will be displayed together.' },
      { title: 'Compare quotations on the same delivery basis', body: 'Ask which packing, loading, freight, unloading and final placement tasks are included. An item price alone is not a delivered project cost. Share the receiving address, access restrictions and preferred delivery window. For overseas orders, the destination country and agreed delivery scope are needed before transport and documentation requirements can be confirmed.', link: { href: '/en/export', label: 'Review export enquiry requirements' } },
      { title: 'Send a wholesale purchasing brief', body: 'Provide company details and a separate line for each product. Mark alternatives and phased project quantities clearly. The form prepares a WhatsApp message for you to review and send; it does not place an order or reserve stock.', bullets: ['Product link, form and target dimensions with units', 'Estimated quantity per product', 'Destination country and receiving location', 'Required timing and any approval stages'], link: { href: '#quote', label: 'Request a wholesale quote' } },
    ], faq: [
      ['What is the minimum order quantity?', 'Minimum quantities are confirmed for the selected product and order. Share the forms, dimensions and quantity breakdown to request a wholesale quotation.'],
      ['Can I request custom-size terracotta planters?', 'Yes, you can submit a custom-size enquiry. Feasibility, dimensional expectations, quantity and production timing must be reviewed by the workshop before confirmation.'],
      ['Does wholesale pricing include international delivery?', 'Do not assume freight or final placement is included. Packing, transport and delivery responsibilities are agreed for the specific quotation and destination.'],
    ],
  },
  {
    path: '/en/projects', locale: 'en', kicker: 'Hotels · Villas · Landscape', title: 'Terracotta with architectural presence',
    updatedAt: '2026-10-19',
    intro: 'Oversized planters and jars for entrances, courtyards, terraces, gardens, restaurants and commercial landscapes.',
    seoTitle: 'Hotel, Villa & Landscape Terracotta Planters | Turkey', seoDescription: 'Large terracotta planters for hotels, villas, restaurants and landscape projects. Share your project and request a supply proposal.',
    ...pagePhoto('hotel', 'en'),
    blocks: [
      { title: 'Hotels and villa gardens', body: 'An entrance jar can create a focal point, while a planter beside seating needs different proportions and maintenance access. Assign a code to each placement and separate decorative use from planting. Group quantities by project phase and discuss natural finish variation for pieces that will be displayed together.', link: { href: '/en/products', label: 'Choose a terracotta product family' } },
      { title: 'Restaurant terraces and landscape routes', body: 'Check chair movement, service routes and maintenance access against the widest part of each vessel. For planted forms, ask for usable internal dimensions and drainage information. The project team should assess ground conditions, wind exposure, support and planted loads; a concept image or catalogue entry is not a technical installation approval.' },
      { title: 'From design brief to supply scope', body: 'Send a marked-up plan or site photos with approximate dimensions, quantity and the receiving location. Custom forms require workshop feasibility review. Clarify whether packing, unloading, final placement and planting are included or handled by others. The hospitality and terrace scenes are placement inspiration, not verified client references.', link: { href: '/en/wholesale', label: 'Prepare a project purchasing list' } },
      { title: 'Share your project', body: 'A plan, approximate dimensions or a photo of the setting is enough to begin a product discussion.', link: { href: '/en/contact#quote', label: 'Start a project enquiry' } },
    ],
  },
  {
    path: '/en/export', locale: 'en', kicker: 'International trade enquiries', title: 'Terracotta planters from Turkey: export enquiries',
    intro: 'Looking for a terracotta planters exporter in Turkey? Discuss handmade pots and large jars with our Tarsus workshop. We review international wholesale and project enquiries by product, quantity, destination and delivery scope.',
    updatedAt: '2026-10-19',
    seoTitle: 'Terracotta Planters Exporter Turkey | Trade Enquiries', seoDescription: 'Request handmade terracotta pots and large planters from Tarsus, Turkey. Share quantities and destination to review packing, production and export scope.',
    ...pagePhoto('container', 'en'),
    blocks: [
      { title: 'Identify products and the destination first', body: 'Send a product list with links or reference images, dimensions with units and quantities for each form. Include the destination country, receiving location and intended use. Large terracotta planters require particular attention to packed dimensions and handling. A catalogue enquiry is not a confirmation of stock, shipping availability or a delivery date.', link: { href: '/en/products', label: 'Review handmade terracotta products' } },
      { title: 'Agree packing and handling responsibilities', body: 'Packing requirements depend on the selected forms, quantity and transport plan. Explain any receiving-site restrictions and how the goods will be unloaded. Confirm packing, loading, transport and final placement responsibilities in the quotation. Do not assume that delivery to an address includes moving large vessels into a courtyard or onto a terrace.' },
      { title: 'Review destination requirements before confirming', body: 'Tell us which documents, labels or product information your buyer, carrier or local adviser requires. Requirements and availability must be reviewed for the actual order and destination; this page does not promise universal certification or shipment to every country. Any agreed delivery terms, costs and timing should be recorded in the quotation.' },
      { title: 'Connect the export plan to the production plan', body: 'For project orders, distinguish required quantities from alternatives and identify approval stages. Custom dimensions, sample review and phased supply can affect the proposed schedule. The workshop must first confirm feasibility and production availability; transit timing alone is not the complete lead time.', link: { href: '/en/wholesale', label: 'Prepare your wholesale buying brief' } },
      { title: 'Start an export conversation', body: 'Share your company, country, product list and delivery expectations through the contact form. It prepares a WhatsApp message for your review. You can also include links to the Turkish product records so the specific forms are clear without relying on a generic collection image.', link: { href: '/en/contact#quote', label: 'Send an export enquiry' } },
    ], faq: [
      ['What information is needed for an export quotation?', 'Provide product links or references, dimensions with units, quantity per form, destination country, receiving location and preferred timing. Include any document or packing requirements.'],
      ['Are delivery dates and packing fixed for every order?', 'No. Production availability, packing, transport and delivery scope are reviewed for the selected products and destination before confirmation.'],
      ['Can international buyers enquire in English?', 'Yes. Use the English contact form or WhatsApp link, and include catalogue links with your product requirements.'],
    ],
  },
  {
    path: '/en/about', locale: 'en', kicker: 'Tarsus · Since 1927', title: 'A craft carried across generations',
    intro: 'A pottery culture rooted in Tarsus, bringing traditional making knowledge into contemporary gardens, hospitality and architectural settings.',
    seoTitle: 'About Tarsus Pottery | Handmade Terracotta Since 1927', seoDescription: 'Learn about the multi-generation pottery tradition behind handmade terracotta production in Tarsus, Turkey.',
    ...pagePhoto('workshopYard', 'en'),
    blocks: [
      { title: 'Rooted in making', body: 'Traditional knowledge is kept relevant by applying it to the scale, consistency and supply needs of contemporary projects.' },
      { title: 'Özçereciler Toprak Sanatları', body: 'The production identity behind wholesale, project and international enquiries.', link: { href: '/en/products', label: 'Explore the collections' } },
    ],
  },
  {
    path: '/en/contact', locale: 'en', kicker: 'Contact & quotations', title: 'Tell us what you are sourcing',
    intro: 'Share the product family, estimated quantity, destination and project context for a more useful quotation.',
    seoTitle: 'Contact & Wholesale Quote | Tarsus Terracotta', seoDescription: 'Contact Tarsus Pottery for wholesale terracotta, project supply and export enquiries from Turkey.',
    ...pagePhoto('blueBatch', 'en'),
    blocks: [
      { title: 'WhatsApp-first contact', body: 'Wholesale, project and export requests continue on the verified WhatsApp line from the Instagram bio. Quote forms open a prefilled WhatsApp message.', link: { href: whatsappUrl('default', undefined, true), label: 'Message on WhatsApp' } },
      { title: 'Prepare your brief', body: 'Company, country/city, product type, estimated quantity and intended application are the key details.' },
    ],
  },
];

export type ProductPage = PageContent & { product: Product };

// Kategori sayfalarıyla aynı adreste bir ürün olursa kategori sayfası önceliklidir; panel bunu engeller.
const productPages: ProductPage[] = products.map((product) => ({
  path: `/urunler/${product.slug}`, locale: 'tr', kicker: 'El yapımı · Büyük ölçek', title: product.name,
  intro: product.shortDescription,
  seoTitle: product.seoTitle || `${product.name} | Tarsus Çömlekçilik`,
  seoDescription: product.seoDescription || product.shortDescription,
  image: product.images[0], imageAlt: photoAlt(product.images[0], `${product.name} — ürün görseli`),
  blocks: [
    { title: 'Heykelsi bir terracotta form', body: product.description, bullets: product.applications },
    { title: 'Fiyat için teklif alın', body: 'Fiyat; ölçü, adet, üretim durumu, paketleme ve teslimat noktasına göre hazırlanır. Sahte veya bağlayıcı olmayan liste fiyatı yayınlanmaz.', link: { href: '/iletisim#teklif', label: 'Ürün teklifi iste' } },
  ], faq: faqs.slice(0, 6),
  product,
}));

export function productFromPath(path: string) {
  return productPages.find((page) => page.path === path)?.product;
}

const utilityPages: PageContent[] = [
  ...productPages,
  ...[
    ['/gizlilik', 'Gizlilik Politikası', 'Bu önizleme sürümü kullanıcı hesabı açmaz; teklif formuna yazılan bilgiler yalnızca talebi yanıtlamak amacıyla işletmenin teklif kayıtlarına alınır ve doğrulanmış bir analiz/izleme sağlayıcısı bağlanana kadar pazarlama çerezi çalıştırmaz.'],
    ['/kvkk', 'KVKK Aydınlatma Metni', 'İletişim formunun veri sorumlusu, alıcı adresi, saklama süresi ve hukuki dayanak bilgileri işletme tarafından doğrulanmadan form gönderimi etkinleştirilmez.'],
    ['/cerez-politikasi', 'Çerez Politikası', 'Bu sürüm yalnızca sitenin çalışması için gerekli teknik işlevleri kullanır. Analiz veya reklam etiketleri, açık rıza ve onay yönetimi kurulmadan otomatik başlatılmaz.'],
  ].map(([path, title, intro]) => ({
    path, locale: 'tr' as const, kicker: 'Yasal bilgilendirme', title, intro,
    seoTitle: `${title} | Tarsus Çömlekçilik`, seoDescription: `${title} kapsamında veri işleme, form gönderimi ve çerez kullanımına ilişkin yayın öncesi bilgilendirme.`,
    ...pagePhoto('workshopInterior'),
    blocks: [
      { title: 'Yayın öncesi taslak', body: 'Bu metin hukuki danışmanlık değildir. Ticari işletme bilgileri, veri işleme süreçleri, iletişim kanalları ve kullanılan üçüncü taraf hizmetler doğrulandıktan sonra yetkili hukuk danışmanı tarafından gözden geçirilmelidir.' },
      { title: 'Şeffaflık ilkesi', body: 'Doğrulanmamış iletişim veya veri sorumlusu bilgisi yayınlanmaz; onay gerektiren takip kodları açık rıza mekanizması olmadan çalıştırılmaz.' },
    ],
  })),
];

export const pages = [...trPages, ...categoryPages, ...articlePages, ...enPages, ...utilityPages];

export const routePairs: Record<string, string> = {
  '/': '/en',
  '/urunler': '/en/products',
  '/toptan-satis': '/en/wholesale',
  '/projeler': '/en/projects',
  '/otel-villa-peyzaj': '/en/projects',
  '/ihracat': '/en/export',
  '/hakkimizda': '/en/about',
  '/iletisim': '/en/contact',
  '/blog': '/en/blog',
  '/en': '/',
  '/en/products': '/urunler',
  '/en/wholesale': '/toptan-satis',
  '/en/projects': '/projeler',
  '/en/export': '/ihracat',
  '/en/about': '/hakkimizda',
  '/en/contact': '/iletisim',
  '/en/blog': '/blog',
};

export const indexablePaths = ['/', ...pages.map((page) => page.path)];

export function pageFromSegments(segments: string[]) {
  return pages.find((page) => page.path === `/${segments.join('/')}`);
}
