export const business = {
  name: 'Tarsus Çömlekçilik',
  legalName: 'Özçereciler Toprak Sanatları',
  instagram: 'https://www.instagram.com/tarsus_comlekcilik/',
  instagramHandle: '@tarsus_comlekcilik',
  youtube: 'https://www.youtube.com/@tarsuscomlekcilik',
  youtubeHandle: '@tarsuscomlekcilik',
  founded: '1927',
  locality: 'Tarsus',
  region: 'Mersin',
  country: 'Türkiye',
  /** Instagram bio — doğrulandı */
  phone: '905010163096',
  phoneDisplay: '+90 501 016 30 96',
  whatsapp: '905010163096',
  email: null as string | null,
  streetAddress: 'Yeşil Mah., Hasan Özçivi Cd., 4202. Sk. No: 60',
  postalCode: '33450',
  address: 'Yeşil Mah., Hasan Özçivi Cd., 4202. Sk. No: 60, 33450 Tarsus/Mersin',
  googleBusinessUrl: 'https://share.google/7QKseWR7XjQwdUpvi',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Tarsus+%C3%87%C3%B6mlek%C3%A7ilik+4202+Sokak+Ye%C5%9Fil+Mahalle+Tarsus+Mersin',
  quoteEndpoint: null as string | null,
};

export type WhatsAppContext = 'default' | 'product' | 'project' | 'wholesale' | 'export' | 'quote';

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

export type Product = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  images: string[];
  dimensions?: string;
  material?: string;
  color?: string;
  applications?: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export const products: Product[] = [
  {
    slug: 'buyuk-terracotta-kup',
    name: 'Büyük Terracotta Küp',
    category: 'Büyük Boy Küpler',
    shortDescription: 'Girişler, avlular, bahçeler ve peyzaj aksları için heykelsi el yapımı form.',
    description: 'El işçiliğinin izlerini taşıyan büyük terracotta küpler, tek başına odak parçası veya farklı ölçülerle ritmik bir yerleşim kurmak için değerlendirilir. Her parça el yapımı olduğundan yüzey, ton ve ölçüde doğal küçük farklılıklar görülebilir.',
    images: ['/images/hero-terracotta.webp', '/images/collection.webp'],
    material: 'Pişmiş toprak / terracotta',
    color: 'Doğal terracotta tonları',
    applications: ['Otel ve resort girişleri', 'Villa bahçeleri', 'Peyzaj projeleri', 'Restoran ve ticari mekânlar'],
    featured: true,
    seoTitle: 'Büyük Terracotta Küp | El Yapımı Mimari Çömlek',
    seoDescription: 'Otel, villa, bahçe ve peyzaj projeleri için el yapımı büyük terracotta küp. Ölçü, üretim ve toptan tedarik seçenekleri için teklif alın.',
  },
];

export const categories = [
  { slug: 'buyuk-boy-kupler', name: 'Büyük Boy Küpler', en: 'Oversized Jars', image: '/images/hero-terracotta.webp' },
  { slug: 'terracotta-saksilar', name: 'Terracotta Saksılar', en: 'Terracotta Planters', image: '/images/collection.webp' },
  { slug: 'dekoratif-saksilar', name: 'Dekoratif Saksılar', en: 'Decorative Planters', image: '/images/project-concept.webp' },
  { slug: 'bahce-saksilari', name: 'Bahçe Saksıları', en: 'Garden Planters', image: '/images/collection.webp' },
  { slug: 'seramik-urunler', name: 'Seramik Ürünler', en: 'Ceramic Objects', image: '/images/workshop.webp' },
  { slug: 'mimari-saksilar', name: 'Mimari Saksılar', en: 'Architectural Planters', image: '/images/project-concept.webp' },
  { slug: 'otel-villa-koleksiyonlari', name: 'Otel & Villa', en: 'Hotel & Villa', image: '/images/project-concept.webp' },
  { slug: 'peyzaj-projeleri', name: 'Peyzaj Projeleri', en: 'Landscape Projects', image: '/images/project-concept.webp' },
  { slug: 'ozel-uretim', name: 'Özel Üretim', en: 'Made to Order', image: '/images/workshop.webp' },
] as const;

export const faqs = [
  ['Toptan satış yapıyor musunuz?', 'Evet. Ürün grubu, adet ve teslimat planına göre toptan tedarik talepleri değerlendirilmektedir.'],
  ['Türkiye geneline gönderim yapıyor musunuz?', 'Sevkiyat planı ürün ölçüsü, adet ve teslimat noktasına göre teklif aşamasında netleştirilir.'],
  ['Yurtdışına ihracat yapıyor musunuz?', 'Yurtdışı toptan ve proje talepleri kabul edilmektedir. Ülke, adet ve ürün bilgilerini paylaşarak ihracat teklifi isteyebilirsiniz.'],
  ['Otel ve villa projeleri için üretim yapıyor musunuz?', 'Evet. Otel, villa, restoran, peyzaj ve mimari projeler için kullanım senaryosuna göre ürün ve ölçü seçimi planlanabilir.'],
  ['Özel ölçü üretim mümkün mü?', 'Uygulanabilirlik ürün formu, ölçü ve adet bilgilerine göre atölye tarafından değerlendirilir.'],
  ['Ürünler el yapımı mı?', 'Ana terracotta ürün grupları el işçiliğiyle şekillendirilir. Bu nedenle yüzey ve tonlarda doğal küçük farklılıklar oluşabilir.'],
  ['Minimum sipariş miktarı nedir?', 'Sipariş miktarı ürün ve projeye göre değişmektedir. Detaylı bilgi için teklif talebi oluşturabilirsiniz.'],
] as const;

export type ContentBlock = { title: string; body: string; bullets?: string[]; link?: { href: string; label: string } };
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
  blocks: ContentBlock[];
  faq?: readonly (readonly [string, string])[];
};

const trPages: PageContent[] = [
  {
    path: '/urunler', locale: 'tr', kicker: 'Koleksiyonlar', title: 'Toprağın farklı ölçekleri',
    intro: 'Bahçe saksısından anıtsal küplere uzanan ürün gruplarını kullanım alanı, ölçek ve tedarik ihtiyacına göre keşfedin.',
    seoTitle: 'El Yapımı Terracotta Saksı & Küp Modelleri | Tarsus',
    seoDescription: 'Büyük terracotta küpler, bahçe saksıları, dekoratif ve mimari saksılar. Toptan, otel, villa ve peyzaj projeleri için ürün gruplarını inceleyin.',
    image: '/images/collection.webp', imageAlt: 'Farklı formlarda el yapımı terracotta küp ve saksı koleksiyonu — temsili görsel',
    blocks: [
      { title: 'Form, ölçek ve kullanım', body: 'Her proje aynı saksıyı istemez. Giriş aksları için heykelsi büyük küpler, dolaşım alanları için daha kontrollü formlar, peyzaj içinse bitki kökü ve sulama düzenine uygun hacimler gerekir.', bullets: ['Doğal terracotta yüzey', 'El yapımından gelen küçük varyasyonlar', 'İç ve dış mekân kullanım senaryoları', 'Toptan ve proje bazlı tedarik'] },
      { title: 'Birlikte doğru grubu seçelim', body: 'Mekân fotoğrafı, yaklaşık ölçü, adet ve teslimat şehrini paylaşın; uygun ürün grubu üzerinden teklif hazırlığına başlayalım.', link: { href: '/iletisim#teklif', label: 'Ürün talebi oluştur' } },
    ], faq: faqs,
  },
  {
    path: '/toptan-satis', locale: 'tr', kicker: 'B2B tedarik', title: 'Doğrudan üreticiden toptan çömlek',
    intro: 'Mağazalar, peyzaj firmaları, mimarlık ofisleri ve ticari projeler için ürün, adet, teslimat ve paketleme ihtiyacını tek teklif akışında planlayın.',
    seoTitle: 'Toptan Çömlek & Terracotta Saksı Üreticisi | Tarsus',
    seoDescription: 'Üreticiden toptan terracotta saksı, büyük küp ve dekoratif çömlek tedariki. Türkiye geneli sevkiyat ve ihracat talepleri için teklif alın.',
    image: '/images/collection.webp', imageAlt: 'Toptan tedarik için farklı ölçülerde terracotta ürünler — temsili görsel',
    blocks: [
      { title: 'Teklif için gerekenler', body: 'Doğru fiyat ve tedarik planı; ürün grubu, tahmini adet, teslimat noktası ve zaman bilgisiyle başlar.', bullets: ['Üreticiden doğrudan tedarik', 'Farklı ürün ve ölçü seçenekleri', 'Proje bazlı üretim değerlendirmesi', 'Türkiye geneli ve uluslararası sevkiyat planı'] },
      { title: 'Sipariş akışı', body: 'Talebiniz incelenir, uygun ürün ve üretim seçeneği netleştirilir, paketleme ve sevkiyat koşullarıyla birlikte yazılı teklif hazırlanır.', link: { href: '#teklif', label: 'Toptan fiyat iste' } },
    ], faq: faqs,
  },
  {
    path: '/projeler', locale: 'tr', kicker: 'Mimari & peyzaj', title: 'Mekânlara toprağın karakterini katıyoruz',
    intro: 'Otel, villa, restoran, bahçe ve ticari alanlar için terracotta ürünleri ölçü, dolaşım, bitkilendirme ve mekânsal ritimle birlikte düşünün.',
    seoTitle: 'Otel, Villa ve Peyzaj Saksıları | Tarsus Çömlekçilik',
    seoDescription: 'Otel, villa, restoran ve peyzaj projeleri için büyük terracotta saksı ve küp çözümleri. Projenizi paylaşın, ürün ve tedarik teklifi alın.',
    image: '/images/project-concept.webp', imageAlt: 'Mimari avluda büyük terracotta saksı kullanımı — temsili konsept görsel',
    blocks: [
      { title: 'Ölçek mekânı değiştirir', body: 'Büyük bir terracotta form yalnızca bitki kabı değildir; giriş vurgusu, yönlendirme elemanı ve mimari doku olarak çalışabilir.', bullets: ['Hotels & resorts', 'Villas & gardens', 'Restaurants', 'Landscape & architecture projects', 'Commercial spaces'] },
      { title: 'Projenizi paylaşın', body: 'Plan, ölçü veya mekân fotoğrafı; uygun ürün ölçeğini konuşmak için yeterli bir başlangıçtır. Konsept görseller gerçek referans olarak sunulmaz.', link: { href: '/iletisim#teklif', label: 'Proje teklifi alın' } },
    ], faq: faqs.slice(2, 6),
  },
  {
    path: '/otel-villa-peyzaj', locale: 'tr', kicker: 'Uygulama alanları', title: 'Otel, villa ve peyzaj için terracotta',
    intro: 'Mimari ölçekte kullanılan saksı ve küpleri giriş, avlu, teras, bahçe ve yaya akslarında tutarlı bir koleksiyon diliyle planlayın.',
    seoTitle: 'Otel & Villa İçin Büyük Terracotta Saksılar | Tarsus',
    seoDescription: 'Otel, villa, resort ve peyzaj uygulamalarına uygun büyük terracotta saksı ve dekoratif küp seçenekleri. Proje bazlı tedarik talebi oluşturun.',
    image: '/images/project-concept.webp', imageAlt: 'Otel avlusunda büyük el yapımı terracotta saksılar — temsili konsept görsel',
    blocks: [
      { title: 'Mekâna göre ürün seçimi', body: 'Yükseklik, çap, görüş hattı, rüzgâr, drenaj ve bakım düzeni ürün seçiminin parçasıdır.', bullets: ['Giriş ve karşılama alanları', 'Avlu ve teraslar', 'Bahçe sınırları', 'Restoran açık alanları', 'Peyzaj odak noktaları'] },
      { title: 'Tekrarlanabilir bir koleksiyon', body: 'Aynı form ailesini farklı ölçülerde kullanmak, büyük alanlarda görsel bütünlük ve güçlü bir ritim kurar.', link: { href: '/projeler', label: 'Proje yaklaşımını incele' } },
    ],
  },
  {
    path: '/ihracat', locale: 'tr', kicker: 'Worldwide export', title: 'Tarsus’tan dünyaya terracotta',
    intro: 'Yurtdışı toptancıları, oteller, tasarım stüdyoları ve peyzaj projeleri için ürün, adet, paketleme ve teslimat kapsamını birlikte netleştirin.',
    seoTitle: 'Terracotta Wholesale & Export from Turkey | Tarsus',
    seoDescription: 'Türkiye’den el yapımı terracotta saksı ve küp ihracatı. Toptancı, otel, villa ve peyzaj projeleri için İngilizce teklif talebi oluşturun.',
    image: '/images/hero-terracotta.webp', imageAlt: 'İhracata uygun büyük terracotta ürün grubu — temsili görsel',
    blocks: [
      { title: 'İhracat talebinizi hazırlayın', body: 'Ürün grubu, tahmini adet, hedef ülke, teslimat noktası ve proje takvimi teklif sürecini hızlandırır.', bullets: ['Wholesale enquiries', 'Project-based supply', 'Export packing planning', 'International delivery coordination'] },
      { title: 'English sales pages', body: 'International buyers can review the dedicated English pages and send a structured wholesale enquiry.', link: { href: '/en/export', label: 'View export page in English' } },
    ], faq: faqs.slice(0, 4),
  },
  {
    path: '/atolye', locale: 'tr', kicker: 'Üretim süreci', title: 'Toprak, el ve ateş',
    intro: 'Hazırlıktan şekillendirmeye, kontrollü kurutmadan fırınlamaya uzanan süreç; büyük bir formun sabırla kurulmasını gerektirir.',
    seoTitle: 'El Yapımı Çömlek Üretim Süreci | Tarsus Atölyesi',
    seoDescription: 'Toprağın hazırlanması, usta eliyle şekillendirme, kurutma, fırınlama, kontrol ve sevkiyat adımlarını keşfedin.',
    image: '/images/workshop.webp', imageAlt: 'Büyük bir terracotta formu şekillendiren usta elleri — temsili görsel',
    blocks: [
      { title: '01—03 · Hazırlık ve şekillendirme', body: 'Toprağın hazırlanmasıyla başlayan süreçte form, ustanın elleriyle katman katman kurulur; ardından çatlama riskini azaltacak biçimde kontrollü kurutulur.', bullets: ['Toprağın hazırlanması', 'Ustanın şekillendirmesi', 'Kontrollü kurutma'] },
      { title: '04—06 · Ateş ve sevkiyat', body: 'Fırınlama sonrasında yüzey ve form kontrol edilir. Sipariş kapsamına göre paketleme ve sevkiyat planı hazırlanır.', bullets: ['Fırınlama', 'Kalite kontrol', 'Paketleme ve sevkiyat'] },
    ],
  },
  {
    path: '/hakkimizda', locale: 'tr', kicker: 'Since 1927', title: 'Dört kuşağa uzanan toprak hikâyesi',
    intro: 'Tarsus’ta kuşaklar boyunca sürdürülen çömlek ustalığını, günümüzün bahçe, mimari ve ticari mekânlarına taşıyan bir üretim kültürü.',
    seoTitle: 'Hakkımızda | Tarsus Çömlekçilik ve Toprak Sanatı',
    seoDescription: '1927’den günümüze Tarsus’ta sürdürülen el yapımı çömlek ve terracotta üretim kültürünü, atölye yaklaşımını ve marka hikâyesini tanıyın.',
    image: '/images/workshop.webp', imageAlt: 'Tarsus çömlekçilik geleneğini temsil eden el yapımı üretim sahnesi — temsili görsel',
    blocks: [
      { title: 'Kökü gelenekte, gözü mekânda', body: 'Geleneksel üretim bilgisi; yalnızca geçmişi korumak için değil, güncel mimari ve peyzaj ihtiyaçlarına doğru formu üretmek için yaşatılır.' },
      { title: 'Özçereciler Toprak Sanatları', body: 'Üretici kimliği; ürün geliştirme, toptan tedarik, proje bazlı çalışma ve uluslararası talepler için markanın kurumsal omurgasını oluşturur.', link: { href: '/atolye', label: 'Üretim sürecini keşfet' } },
    ],
  },
  {
    path: '/galeri', locale: 'tr', kicker: 'Görsel arşiv', title: 'Toprağın yüzeyleri ve ölçekleri',
    intro: 'Ürün, üretim ve mimari kullanım görselleri için hazırlanmış editorial galeri. Bu sürümde yer alan AI konseptleri gerçek proje veya atölye referansı değildir.',
    seoTitle: 'Terracotta Ürün, Atölye ve Proje Galerisi | Tarsus',
    seoDescription: 'Büyük terracotta küpler, saksılar, üretim süreci ve mimari kullanım görsellerini editorial galeride keşfedin.',
    image: '/images/collection.webp', imageAlt: 'El yapımı terracotta ürün formları — temsili görsel',
    blocks: [
      { title: 'Gerçek materyaller için hazır', body: 'Galeri altyapısı; atölye, üretim, ürünler, projeler, sevkiyat ve mimari kullanım kategorilerinde gerçek firma fotoğrafları eklendiğinde doğrudan güncellenebilir.' },
      { title: 'Görsel doğruluk', body: 'Konsept görseller gerçek müşteri projesi, sevkiyat, atölye veya ürün kataloğu kanıtı olarak etiketlenmez.' },
    ],
  },
  {
    path: '/iletisim', locale: 'tr', kicker: 'Teklif & iletişim', title: 'İhtiyacınızı birkaç ayrıntıyla anlatın',
    intro: 'Ürün grubu, yaklaşık adet, teslimat şehri veya ülkesi ve varsa mekân görseli; doğru teklif için yeterli başlangıç bilgilerini sağlar.',
    seoTitle: 'İletişim & Teklif | Tarsus Çömlekçilik',
    seoDescription: 'Toptan çömlek, terracotta saksı, otel-villa-peyzaj projesi ve ihracat talepleriniz için Tarsus Çömlekçilik ile iletişime geçin.',
    image: '/images/hero-terracotta.webp', imageAlt: 'Tarsus Çömlekçilik büyük terracotta küp detayları — temsili görsel',
    blocks: [
      { title: 'WhatsApp üzerinden hızlı teklif', body: 'Toptan, proje ve ihracat taleplerini Instagram bio’daki doğrulanmış WhatsApp hattından alın. Form gönderimi de WhatsApp mesajına dönüştürülür.', link: { href: whatsappUrl('default'), label: 'WhatsApp’tan yazın' } },
      { title: 'Atölye adresi', body: 'Yeşil Mah., Hasan Özçivi Cd., 4202. Sk. No: 60, 33450 Tarsus/Mersin. Ziyaret veya teslimat planı için önceden haber vermenizi rica ederiz.', link: { href: business.googleMapsUrl, label: 'Google Haritalar’da aç' } },
      { title: 'Teklifinizi hızlandırın', body: 'Firma, ülke/şehir, ürün grubu, tahmini adet ve kullanım alanı bilgilerini hazırlayın. Proje taleplerinde ölçü veya mekân fotoğrafı eklemek ürün seçimini kolaylaştırır.' },
    ], faq: faqs,
  },
  {
    path: '/rehber', locale: 'tr', kicker: 'Terracotta rehberi', title: 'Doğru ürün için doğru bilgi',
    intro: 'Terracotta malzemeyi, büyük saksı seçimini, peyzaj kullanımını ve toptan tedarik sürecini karar vermeyi kolaylaştıracak biçimde ele alan içerik merkezi.',
    seoTitle: 'Terracotta Saksı & Çömlek Rehberi | Tarsus Çömlekçilik',
    seoDescription: 'Terracotta saksı nedir, büyük saksı nasıl seçilir ve toptan alımda nelere dikkat edilir? Uygulama odaklı rehberleri keşfedin.',
    image: '/images/collection.webp', imageAlt: 'Terracotta malzeme ve farklı saksı formları — temsili görsel',
    blocks: [
      { title: 'Terracotta Saksı Nedir?', body: 'Pişmiş toprağın gözenekli yapısı, doğal renk geçişleri ve elde şekillendirildiğinde kazandığı küçük varyasyonlar terracotta karakterinin temelidir.', link: { href: '/rehber/terracotta-saksi-nedir', label: 'Rehberi oku' } },
      { title: 'Büyük Boy Saksı Seçimi', body: 'Ölçek, drenaj, kök hacmi, rüzgâr ve taşıma rotası; yalnızca estetik değil uygulama kararlarıdır.', link: { href: '/rehber/buyuk-boy-saksi-secerken', label: 'Seçim kriterlerini incele' } },
      { title: 'Otel Peyzajında Saksı', body: 'Sirkülasyon, bakım ve tekrar ritmi üzerinden konaklama alanlarında büyük saksı kullanımını planlayın.', link: { href: '/rehber/otel-peyzajinda-saksi-secimi', label: 'Proje rehberini oku' } },
      { title: 'Toptan Saksı Alımı', body: 'Ürün standardı, adet, paketleme, teslimat ve numune sürecini teklif öncesinde netleştirin.', link: { href: '/rehber/toptan-saksi-alirken', label: 'Toptan alım rehberi' } },
    ],
  },
];

const categoryPages: PageContent[] = categories.slice(0, 5).map((category) => ({
  path: `/urunler/${category.slug}`,
  locale: 'tr' as const,
  kicker: 'Ürün koleksiyonu',
  title: category.name,
  intro: `${category.name}; bahçe, mimari, ticari mekân ve toptan tedarik ihtiyaçları için doğal terracotta karakterini farklı ölçeklerde sunar.`,
  seoTitle: `${category.name} | Tarsus Çömlekçilik`,
  seoDescription: `El yapımı ${category.name.toLocaleLowerCase('tr-TR')} seçeneklerini keşfedin. Toptan, otel, villa ve peyzaj projeleri için üretim ve tedarik teklifi alın.`,
  image: category.image,
  imageAlt: `${category.name} koleksiyonu — temsili terracotta görseli`,
  blocks: [
    { title: 'El yapımının doğal karakteri', body: 'Terracotta yüzeylerde ton, iz ve ölçü açısından küçük farklılıklar oluşabilir. Bu varyasyonlar seri üretim kusuru değil, el işçiliğinin malzemeyle kurduğu ilişkinin parçasıdır.' },
    { title: 'Projenize göre teklif', body: 'Kullanım alanı, hedef ölçü, tahmini adet ve teslimat bilgisini paylaşın; uygun üretim ve tedarik seçeneği değerlendirilsin.', link: { href: '/iletisim#teklif', label: 'Teklif talebi oluştur' } },
  ],
  faq: faqs.slice(0, 5),
}));

const articlePages: PageContent[] = [
  ['terracotta-saksi-nedir', 'Terracotta Saksı Nedir?', 'Terracotta, doğal kilin şekillendirilip kontrollü biçimde pişirilmesiyle oluşan gözenekli bir seramik malzemedir.', ['Gözenekli yüzey', 'Doğal renk varyasyonu', 'İç ve dış mekân uyumu']],
  ['buyuk-boy-saksi-secerken', 'Büyük Boy Saksı Seçerken Nelere Dikkat Edilmeli?', 'Büyük bir saksıda form kadar taşıma, drenaj, kök hacmi, rüzgâr ve zemin taşıma kapasitesi de önemlidir.', ['Mekân ve görüş hattı', 'Bitki kök hacmi', 'Drenaj ve sulama', 'Taşıma rotası']],
  ['otel-peyzajinda-saksi-secimi', 'Otel Peyzajında Saksı Seçimi', 'Konaklama projelerinde saksılar; karşılama, yönlendirme, ritim ve bakım operasyonunu aynı anda desteklemelidir.', ['Yoğun dolaşım', 'Bakım erişimi', 'Koleksiyon bütünlüğü', 'Mevsimsel kullanım']],
  ['toptan-saksi-alirken', 'Toptan Saksı Alırken Nelere Dikkat Edilmeli?', 'Toptan alım kararı; yalnızca birim fiyat değil ürün standardı, varyasyon toleransı, paketleme ve teslimat planıyla birlikte değerlendirilir.', ['Ürün ve ölçü listesi', 'Tahmini adet', 'Paketleme planı', 'Teslimat noktası ve takvim']],
] .map(([slug, title, intro, bullets]) => ({
  path: `/rehber/${slug}`,
  locale: 'tr' as const,
  kicker: 'Uygulama rehberi',
  title: title as string,
  intro: intro as string,
  seoTitle: `${title as string} | Tarsus Çömlekçilik`,
  seoDescription: `${intro as string} Uygulama kriterlerini, ürün seçimini ve teklif öncesi hazırlanması gereken bilgileri keşfedin.`,
  image: slug === 'otel-peyzajinda-saksi-secimi' ? '/images/project-concept.webp' : '/images/collection.webp',
  imageAlt: `${title as string} konusunu anlatan terracotta uygulama görseli — temsili`,
  blocks: [
    { title: 'Kararı belirleyen başlıklar', body: 'Doğru seçim, ürünün kullanılacağı alanın gerçek koşullarını ve tedarik sürecini birlikte ele almakla başlar.', bullets: bullets as string[] },
    { title: 'Üründen uygulamaya', body: 'Seçtiğiniz ürün grubunu proje, toptan tedarik ve teklif sayfalarıyla ilişkilendirerek bir sonraki adıma geçin.', link: { href: '/toptan-satis', label: 'Toptan tedariki incele' } },
  ],
}));

const enPages: PageContent[] = [
  {
    path: '/en', locale: 'en', kicker: 'Handmade in Tarsus · Since 1927', title: 'Handmade terracotta from Tarsus to the world',
    intro: 'Large-scale terracotta, garden planters and decorative pottery for wholesalers, hotels, villas, landscape and architectural projects.',
    seoTitle: 'Handmade Terracotta Manufacturer Turkey | Tarsus Pottery',
    seoDescription: 'Handmade Turkish terracotta pots and oversized planters for wholesale, hotels, villas and landscape projects. Request an export quotation.',
    image: '/images/hero-terracotta.webp', imageAlt: 'Large handmade terracotta jars in a Mediterranean courtyard — concept image',
    blocks: [
      { title: 'Craft at architectural scale', body: 'From sculptural jars to generous planters, each category is considered through scale, placement and supply requirements.', bullets: ['Handmade terracotta', 'Wholesale supply', 'Project-based enquiries', 'Export planning'] },
      { title: 'Start a trade enquiry', body: 'Share the product category, estimated quantity, destination country and target schedule for a structured quotation.', link: { href: '/en/contact#quote', label: 'Request a quotation' } },
    ],
  },
  {
    path: '/en/products', locale: 'en', kicker: 'Collections', title: 'Terracotta forms for considered spaces',
    intro: 'Explore oversized jars, planters, garden pottery and architectural terracotta for wholesale and project-based supply.',
    seoTitle: 'Turkish Terracotta Pots & Large Planters | Products', seoDescription: 'Explore handmade terracotta pots, oversized jars, garden planters and architectural pottery made in Tarsus, Turkey.',
    image: '/images/collection.webp', imageAlt: 'Handmade terracotta pot and jar collection — concept image',
    blocks: [
      { title: 'Natural variation', body: 'Handmade terracotta carries small differences in tone, surface and dimension. These variations are part of the material’s identity.', bullets: ['Oversized terracotta jars', 'Garden planters', 'Decorative forms', 'Architectural planters'] },
      { title: 'Choose by application', body: 'Share the intended setting, approximate size and quantity to identify the most relevant product family.', link: { href: '/en/contact#quote', label: 'Send product requirements' } },
    ],
  },
  {
    path: '/en/wholesale', locale: 'en', kicker: 'B2B supply', title: 'Wholesale terracotta, directly from the maker',
    intro: 'Structured supply enquiries for retailers, landscape companies, design studios and commercial projects.',
    seoTitle: 'Wholesale Terracotta Pots Turkey | Manufacturer Supply', seoDescription: 'Request wholesale Turkish terracotta pots, large jars and garden planters directly from a Tarsus manufacturer.',
    image: '/images/collection.webp', imageAlt: 'Wholesale grouping of handmade terracotta vessels — concept image',
    blocks: [
      { title: 'A useful wholesale brief', body: 'Product family, target dimensions, estimated quantity, destination and required timing are the key details for a useful quotation.', bullets: ['Direct manufacturer supply', 'Mixed size requirements', 'Project-based production review', 'Export packing planning'] },
      { title: 'Request wholesale pricing', body: 'Send your company and project details through the structured enquiry form.', link: { href: '#quote', label: 'Request wholesale quote' } },
    ],
  },
  {
    path: '/en/projects', locale: 'en', kicker: 'Hotels · Villas · Landscape', title: 'Terracotta with architectural presence',
    intro: 'Oversized planters and jars for entrances, courtyards, terraces, gardens, restaurants and commercial landscapes.',
    seoTitle: 'Hotel, Villa & Landscape Terracotta Planters | Turkey', seoDescription: 'Large terracotta planters for hotels, villas, restaurants and landscape projects. Share your project and request a supply proposal.',
    image: '/images/project-concept.webp', imageAlt: 'Oversized terracotta planters in a hotel courtyard — concept visualization',
    blocks: [
      { title: 'Scale shapes the experience', body: 'A large terracotta form can work as a focal point, spatial marker and planting vessel at the same time.', bullets: ['Hospitality entrances', 'Villa gardens', 'Restaurant terraces', 'Landscape axes', 'Commercial spaces'] },
      { title: 'Share your project', body: 'A plan, approximate dimensions or a photo of the setting is enough to begin a product discussion.', link: { href: '/en/contact#quote', label: 'Start a project enquiry' } },
    ],
  },
  {
    path: '/en/export', locale: 'en', kicker: 'Export worldwide', title: 'Handmade terracotta from Turkey',
    intro: 'Terracotta supply enquiries for international wholesalers, hotels, landscape contractors and design-led projects.',
    seoTitle: 'Terracotta Exporter Turkey | Wholesale Handmade Pots', seoDescription: 'Handmade terracotta pots and oversized planters exported from Turkey for wholesalers and international projects.',
    image: '/images/hero-terracotta.webp', imageAlt: 'Large Turkish terracotta jars prepared for international product enquiries — concept image',
    blocks: [
      { title: 'Export-ready enquiry flow', body: 'Tell us the destination country, product category, estimated quantity and delivery requirements.', bullets: ['Wholesale catalogue request', 'Project-based supply', 'Packing review', 'International delivery coordination'] },
      { title: 'Request the wholesale catalogue', body: 'Contact information must be verified before the site goes live; the enquiry structure is ready for connection.', link: { href: '/en/contact#quote', label: 'Prepare an enquiry' } },
    ],
  },
  {
    path: '/en/about', locale: 'en', kicker: 'Tarsus · Since 1927', title: 'A craft carried across generations',
    intro: 'A pottery culture rooted in Tarsus, bringing traditional making knowledge into contemporary gardens, hospitality and architectural settings.',
    seoTitle: 'About Tarsus Pottery | Handmade Terracotta Since 1927', seoDescription: 'Learn about the multi-generation pottery tradition behind handmade terracotta production in Tarsus, Turkey.',
    image: '/images/workshop.webp', imageAlt: 'Hands shaping a large terracotta planter — concept image',
    blocks: [
      { title: 'Rooted in making', body: 'Traditional knowledge is kept relevant by applying it to the scale, consistency and supply needs of contemporary projects.' },
      { title: 'Özçereciler Toprak Sanatları', body: 'The production identity behind wholesale, project and international enquiries.', link: { href: '/en/products', label: 'Explore the collections' } },
    ],
  },
  {
    path: '/en/contact', locale: 'en', kicker: 'Contact & quotations', title: 'Tell us what you are sourcing',
    intro: 'Share the product family, estimated quantity, destination and project context for a more useful quotation.',
    seoTitle: 'Contact & Wholesale Quote | Tarsus Terracotta', seoDescription: 'Contact Tarsus Pottery for wholesale terracotta, project supply and export enquiries from Turkey.',
    image: '/images/collection.webp', imageAlt: 'Handmade terracotta products for wholesale enquiries — concept image',
    blocks: [
      { title: 'WhatsApp-first contact', body: 'Wholesale, project and export requests continue on the verified WhatsApp line from the Instagram bio. Quote forms open a prefilled WhatsApp message.', link: { href: whatsappUrl('default', undefined, true), label: 'Message on WhatsApp' } },
      { title: 'Prepare your brief', body: 'Company, country/city, product type, estimated quantity and intended application are the key details.' },
    ],
  },
];

const utilityPages: PageContent[] = [
  {
    path: '/urunler/buyuk-terracotta-kup', locale: 'tr', kicker: 'El yapımı · Büyük ölçek', title: products[0].name,
    intro: products[0].shortDescription,
    seoTitle: products[0].seoTitle!, seoDescription: products[0].seoDescription!,
    image: products[0].images[0], imageAlt: 'El yapımı büyük terracotta küp — temsili ürün görseli',
    blocks: [
      { title: 'Heykelsi bir terracotta form', body: products[0].description, bullets: products[0].applications },
      { title: 'Fiyat için teklif alın', body: 'Fiyat; ölçü, adet, üretim durumu, paketleme ve teslimat noktasına göre hazırlanır. Sahte veya bağlayıcı olmayan liste fiyatı yayınlanmaz.', link: { href: '/iletisim#teklif', label: 'Ürün teklifi iste' } },
    ], faq: faqs.slice(0, 6),
  },
  ...[
    ['/gizlilik', 'Gizlilik Politikası', 'Bu önizleme sürümü kullanıcı hesabı açmaz, form verisi kaydetmez ve doğrulanmış bir analiz/izleme sağlayıcısı bağlanana kadar pazarlama çerezi çalıştırmaz.'],
    ['/kvkk', 'KVKK Aydınlatma Metni', 'İletişim formunun veri sorumlusu, alıcı adresi, saklama süresi ve hukuki dayanak bilgileri işletme tarafından doğrulanmadan form gönderimi etkinleştirilmez.'],
    ['/cerez-politikasi', 'Çerez Politikası', 'Bu sürüm yalnızca sitenin çalışması için gerekli teknik işlevleri kullanır. Analiz veya reklam etiketleri, açık rıza ve onay yönetimi kurulmadan otomatik başlatılmaz.'],
  ].map(([path, title, intro]) => ({
    path, locale: 'tr' as const, kicker: 'Yasal bilgilendirme', title, intro,
    seoTitle: `${title} | Tarsus Çömlekçilik`, seoDescription: `${title} kapsamında veri işleme, form gönderimi ve çerez kullanımına ilişkin yayın öncesi bilgilendirme.`,
    image: '/images/workshop.webp', imageAlt: 'Toprak sanatları üretim detayı — temsili görsel',
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
  '/en': '/',
  '/en/products': '/urunler',
  '/en/wholesale': '/toptan-satis',
  '/en/projects': '/projeler',
  '/en/export': '/ihracat',
  '/en/about': '/hakkimizda',
  '/en/contact': '/iletisim',
};

export const indexablePaths = ['/', ...pages.map((page) => page.path)];

export function pageFromSegments(segments: string[]) {
  return pages.find((page) => page.path === `/${segments.join('/')}`);
}
