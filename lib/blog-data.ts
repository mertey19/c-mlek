import { business, whatsappUrl, type ContentBlock, type PageContent } from './site-data';

export type BlogPost = PageContent & {
  kind: 'blog';
  publishedAt: string;
  tags: string[];
  readingMinutes: number;
};

type BlogSeed = {
  slug: string;
  locale: 'tr' | 'en';
  kicker: string;
  title: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  tags: string[];
  readingMinutes: number;
  blocks: ContentBlock[];
};

function post(seed: BlogSeed): BlogPost {
  const prefix = seed.locale === 'en' ? '/en/blog' : '/blog';
  return {
    kind: 'blog',
    path: `${prefix}/${seed.slug}`,
    locale: seed.locale,
    kicker: seed.kicker,
    title: seed.title,
    intro: seed.intro,
    seoTitle: seed.seoTitle,
    seoDescription: seed.seoDescription,
    image: seed.image,
    imageAlt: seed.imageAlt,
    publishedAt: seed.publishedAt,
    tags: seed.tags,
    readingMinutes: seed.readingMinutes,
    blocks: seed.blocks,
  };
}

const trBlogSeeds: BlogSeed[] = [
  {
    slug: 'mersin-comlekci',
    locale: 'tr',
    kicker: 'Mersin çömlekçi',
    title: 'Mersin çömlekçi arayanlar için Tarsus’ta el yapımı terracotta üretimi',
    intro:
      'Mersin ve çevresinde çömlekçi, terracotta saksı veya büyük küp arayanlar için Tarsus’taki atölyemiz; el yapımı üretim, toptan tedarik ve proje bazlı çalışma sunar.',
    seoTitle: 'Mersin Çömlekçi | El Yapımı Terracotta Atölyesi — Tarsus',
    seoDescription:
      'Mersin çömlekçi arayanlar için Tarsus’ta el yapımı terracotta saksı, büyük küp ve çömlek üretimi. Toptan, proje ve ihracat teklifi alın.',
    image: '/images/workshop.webp',
    imageAlt: 'Mersin Tarsus’ta el yapımı terracotta üretim atölyesi — temsili görsel',
    publishedAt: '2026-08-20',
    tags: ['Mersin çömlekçi', 'Tarsus çömlek', 'el yapımı terracotta'],
    readingMinutes: 6,
    blocks: [
      {
        title: 'Mersin’de çömlekçi ararken nelere bakılmalı?',
        body: 'Mersin ve Tarsus bölgesinde çömlek veya terracotta ürün arayanlar çoğu zaman üç ihtiyacı bir arada değerlendirir: el yapımı karakter, proje ölçeğinde üretim kapasitesi ve toptan tedarik düzeni. Seri plastik saksı ile el şekillendirilmiş terracotta arasındaki fark yalnızca estetik değildir; malzeme nefes alır, yüzeyde doğal ton geçişleri oluşur ve mekâna daha sıcak bir doku katar.',
        bullets: [
          'El yapımı üretim ve doğal yüzey varyasyonu',
          'Büyük ölçekli küp ve saksı seçenekleri',
          'Toptan, proje ve ihracat taleplerine açık tedarik',
          'Tarsus Yeşil Mahalle atölye adresi',
        ],
      },
      {
        title: 'Tarsus Çömlekçilik kimdir?',
        body: `${business.name}, ${business.legalName} çatısı altında Tarsus’ta faaliyet gösteren bir toprak sanatları atölyesidir. 1927’den günümüze uzanan üretim kültürü; bugün bahçe, otel, villa, restoran ve peyzaj projelerinin ihtiyaç duyduğu büyük terracotta formlarla buluşur. Mersin çömlekçi araması yapan kullanıcılar için atölye, şehir merkezine yakın Tarsus lokasyonuyla hem ziyaret hem de sevkiyat planlaması açısından erişilebilir konumdadır.`,
      },
      {
        title: 'Hangi ürün grupları talep görüyor?',
        body: 'Mersin ve Akdeniz ikliminde bahçe saksıları, dekoratif küpler, mimari saksılar ve otel-villa peyzajında kullanılan büyük terracotta formlar en sık talep edilen gruplardır. Proje bazlı çalışmalarda aynı form ailesinin farklı ölçülerde tekrarlanması, geniş alanlarda görsel bütünlük sağlar.',
        link: { href: '/urunler', label: 'Ürün koleksiyonlarını incele' },
      },
      {
        title: 'Teklif ve iletişim',
        body: 'Ürün grubu, tahmini adet, teslimat şehri ve kullanım alanını paylaşarak teklif sürecini başlatabilirsiniz. Mersin içi ve Türkiye geneli sevkiyat planı; ürün ölçüsü ve adet bilgisine göre teklif aşamasında netleştirilir.',
        link: { href: whatsappUrl('default'), label: 'WhatsApp’tan teklif al' },
      },
    ],
  },
  {
    slug: 'mersin-terracotta',
    locale: 'tr',
    kicker: 'Mersin terracotta',
    title: 'Mersin terracotta saksı ve küp üreticisi: Tarsus’tan doğrudan tedarik',
    intro:
      'Mersin terracotta araması yapan peyzaj firmaları, oteller ve toptancılar için Tarsus’taki üretim atölyesinden el yapımı saksı, küp ve dekoratif toprak formlar.',
    seoTitle: 'Mersin Terracotta | Saksı & Küp Üreticisi Tarsus',
    seoDescription:
      'Mersin terracotta saksı ve büyük küp üreticisi. El yapımı terracotta; toptan tedarik, otel-villa peyzajı ve ihracat için Tarsus’tan teklif alın.',
    image: '/images/collection.webp',
    imageAlt: 'Mersin terracotta saksı ve küp koleksiyonu — temsili görsel',
    publishedAt: '2026-08-18',
    tags: ['Mersin terracotta', 'terracotta saksı', 'Tarsus üretici'],
    readingMinutes: 5,
    blocks: [
      {
        title: 'Terracotta neden Mersin ve Tarsus’ta güçlü bir tercih?',
        body: 'Akdeniz iklimi, açık hava yaşamı ve geniş bahçe-otel projeleri terracotta kullanımını doğal olarak artırır. Pişmiş toprağın gözenekli yapısı bitki kökleri için daha dengeli bir ortam sunar; doğal renk tonları ise modern mimari ve geleneksel peyzaj diliyle uyum kurar.',
      },
      {
        title: 'Üretimden projeye uzanan süreç',
        body: 'Terracotta üretimi; toprağın hazırlanması, usta eliyle şekillendirme, kontrollü kurutma ve fırınlama adımlarından geçer. Büyük formlarda her aşama bir sonrakinin dayanıklılığını belirler. Bu nedenle proje tedarikinde yalnızca ürün değil, üretim takvimi de birlikte planlanır.',
        link: { href: '/atolye', label: 'Atölye sürecini keşfet' },
      },
      {
        title: 'Toptan ve proje tedariki',
        body: 'Mersin terracotta talepleri çoğunlukla toptan satış, otel-villa peyzajı veya ihracat kapsamında gelir. Ürün standardı, adet, paketleme ve teslimat noktası teklif öncesinde netleştirildiğinde süreç hızlanır.',
        bullets: ['Büyük boy küpler', 'Bahçe ve mimari saksılar', 'Dekoratif terracotta formlar', 'Türkiye geneli ve ihracat sevkiyatı'],
        link: { href: '/toptan-satis', label: 'Toptan terracotta tedariki' },
      },
    ],
  },
  {
    slug: 'tarsus-comlek-atolyesi',
    locale: 'tr',
    kicker: 'Tarsus çömlek atölyesi',
    title: 'Tarsus çömlek atölyesi: 1927’den günümüze el yapımı üretim',
    intro:
      'Tarsus çömlek atölyesi arayanlar için Yeşil Mahalle’deki üretim merkezimiz; geleneksel çömlekçilik bilgisini günümüzün mimari ve peyzaj ihtiyaçlarıyla buluşturur.',
    seoTitle: 'Tarsus Çömlek Atölyesi | El Yapımı Üretim Merkezi',
    seoDescription:
      'Tarsus çömlek atölyesi ve el yapımı terracotta üretimi. Büyük küp, saksı ve dekoratif çömlek; toptan ve proje tedariki için ziyaret veya teklif.',
    image: '/images/workshop.webp',
    imageAlt: 'Tarsus çömlek atölyesinde el yapımı terracotta üretimi — temsili görsel',
    publishedAt: '2026-08-15',
    tags: ['Tarsus çömlek atölyesi', 'çömlek üretimi', 'toprak sanatları'],
    readingMinutes: 5,
    blocks: [
      {
        title: 'Atölye nerede?',
        body: `Tarsus Çömlekçilik atölyesi, ${business.address} adresinde yer alır. Tarsus çömlek atölyesi araması yapan ziyaretçiler için önceden haber verilmesi, üretim planına göre en uygun görüşme zamanının ayarlanmasını kolaylaştırır.`,
        link: { href: business.googleMapsUrl, label: 'Google Haritalar’da aç' },
      },
      {
        title: 'Atölyede neler üretiliyor?',
        body: 'Büyük terracotta küpler, bahçe saksıları, dekoratif formlar ve mimari ölçekte saksılar atölyenin ana üretim gruplarını oluşturur. Her parça el işçiliğiyle şekillendirildiğinden yüzey ve tonlarda küçük doğal farklılıklar oluşabilir; bu durum seri üretim hatası değil, malzemenin karakterinin parçasıdır.',
      },
      {
        title: 'Ziyaret ve teklif',
        body: 'Atölye ziyareti, ürün seçimi veya proje görüşmesi için WhatsApp üzerinden iletişime geçebilirsiniz. Toptan ve ihracat taleplerinde ürün listesi, adet ve teslimat bilgisi paylaşılması teklif sürecini hızlandırır.',
        link: { href: '/iletisim', label: 'İletişim ve teklif formu' },
      },
    ],
  },
  {
    slug: 'mersin-toptan-comlek',
    locale: 'tr',
    kicker: 'Mersin toptan çömlek',
    title: 'Mersin toptan çömlek ve terracotta tedarik rehberi',
    intro:
      'Mersin ve çevresinde toptan çömlek, terracotta saksı veya büyük küp tedarik eden mağaza ve projeler için üreticiden doğrudan teklif süreci.',
    seoTitle: 'Mersin Toptan Çömlek & Terracotta Tedarik | Üretici',
    seoDescription:
      'Mersin toptan çömlek ve terracotta saksı tedariki. Üreticiden doğrudan toptan fiyat, proje bazlı üretim ve sevkiyat planı için teklif alın.',
    image: '/images/collection.webp',
    imageAlt: 'Mersin toptan terracotta çömlek tedariki — temsili görsel',
    publishedAt: '2026-08-12',
    tags: ['Mersin toptan çömlek', 'toptan terracotta', 'B2B tedarik'],
    readingMinutes: 5,
    blocks: [
      {
        title: 'Toptan alımda ilk adım',
        body: 'Toptan çömlek veya terracotta tedarik kararı; ürün grubu, hedef ölçü, tahmini adet ve teslimat noktası bilgileriyle başlar. Üreticiden doğrudan çalışmak aracı maliyetini azaltır ve üretim takvimini daha net görmenizi sağlar.',
      },
      {
        title: 'Paketleme ve sevkiyat',
        body: 'Büyük terracotta formlarda paketleme ve taşıma planı, ürün güvenliği açısından kritiktir. Mersin içi teslimat veya Türkiye geneli sevkiyat koşulları; ölçü, adet ve hedef şehir bilgisine göre teklif aşamasında netleştirilir.',
        link: { href: '/toptan-satis', label: 'Toptan satış sayfası' },
      },
      {
        title: 'Proje bazlı üretim',
        body: 'Otel, villa, restoran ve peyzaj projelerinde aynı formun farklı ölçülerde üretilmesi veya belirli bir koleksiyon dilinin korunması sık talep edilir. Proje fotoğrafı, yaklaşık ölçü ve adet bilgisi paylaşıldığında ürün seçimi hızlanır.',
        link: { href: '/projeler', label: 'Proje tedarik yaklaşımı' },
      },
    ],
  },
  {
    slug: 'el-yapimi-saksi-mersin',
    locale: 'tr',
    kicker: 'El yapımı saksı Mersin',
    title: 'El yapımı saksı Mersin: bahçe, villa ve otel projeleri için terracotta',
    intro:
      'Mersin’de el yapımı saksı arayan bahçe tasarımcıları, otel işletmecileri ve villa sahipleri için Tarsus’ta üretilen terracotta saksı ve küp seçenekleri.',
    seoTitle: 'El Yapımı Saksı Mersin | Terracotta Bahçe & Peyzaj',
    seoDescription:
      'Mersin el yapımı saksı ve terracotta üretimi. Bahçe, villa, otel ve peyzaj projeleri için büyük saksı ve küp; Tarsus’tan teklif alın.',
    image: '/images/project-concept.webp',
    imageAlt: 'Mersin otel ve villa projelerinde el yapımı terracotta saksı — temsili konsept',
    publishedAt: '2026-08-10',
    tags: ['el yapımı saksı Mersin', 'bahçe saksısı', 'peyzaj terracotta'],
    readingMinutes: 5,
    blocks: [
      {
        title: 'El yapımı saksının avantajı',
        body: 'El yapımı terracotta saksılar; seri üretim plastik veya fiber kaplama ürünlerden farklı olarak mekâna malzeme derinliği ve doğal karakter katar. Yüzeydeki küçük izler ve ton farkları her parçayı benzersiz kılar.',
      },
      {
        title: 'Hangi alanlarda kullanılır?',
        body: 'Villa bahçeleri, otel avluları, restoran terasları, peyzaj giriş aksları ve mimari süsleme alanları el yapımı büyük saksıların en sık kullanıldığı mekânlardır.',
        bullets: ['Giriş ve karşılama alanları', 'Teras ve avlu düzenlemeleri', 'Peyzaj odak noktaları', 'Ticari ve konaklama projeleri'],
        link: { href: '/otel-villa-peyzaj', label: 'Otel & villa peyzaj çözümleri' },
      },
      {
        title: 'Doğru ölçüyü seçmek',
        body: 'Büyük bir saksıda form kadar taşıma kapasitesi, drenaj, kök hacmi ve rüzgâr etkisi de önemlidir. Mekân fotoğrafı ve yaklaşık ölçü paylaşımı doğru ürün grubunun belirlenmesini kolaylaştırır.',
        link: { href: '/rehber/buyuk-boy-saksi-secerken', label: 'Büyük saksı seçim rehberi' },
      },
    ],
  },
  {
    slug: 'tarsus-buyuk-kup-ureticisi',
    locale: 'tr',
    kicker: 'Tarsus büyük küp',
    title: 'Tarsus büyük küp üreticisi: anıtsal terracotta formlar',
    intro:
      'Tarsus’ta büyük terracotta küp üreten atölyemiz; otel girişleri, villa avluları ve mimari peyzaj projeleri için heykelsi formlar sunar.',
    seoTitle: 'Tarsus Büyük Küp Üreticisi | Anıtsal Terracotta',
    seoDescription:
      'Tarsus büyük küp ve terracotta üreticisi. Otel, villa ve mimari projeler için el yapımı anıtsal küpler; toptan ve proje teklifi alın.',
    image: '/images/hero-terracotta.webp',
    imageAlt: 'Tarsus büyük terracotta küp üretimi — temsili görsel',
    publishedAt: '2026-08-08',
    tags: ['Tarsus büyük küp', 'anıtsal terracotta', 'mimari küp'],
    readingMinutes: 4,
    blocks: [
      {
        title: 'Büyük küp neden tercih edilir?',
        body: 'Anıtsal terracotta küpler tek başına bir odak elemanı olarak çalışabilir veya farklı ölçülerle ritmik bir yerleşim kurmak için kullanılabilir. Otel ve villa girişlerinde güçlü bir karşılama etkisi yaratır.',
        link: { href: '/urunler/buyuk-terracotta-kup', label: 'Büyük terracotta küp incele' },
      },
      {
        title: 'Üretim ve teslimat',
        body: 'Büyük formların üretimi ve taşınması planlı bir süreç gerektirir. Adet, ölçü ve teslimat noktası bilgisi paylaşıldığında üretim takvimi ve paketleme planı teklif ile birlikte sunulur.',
        link: { href: whatsappUrl('project'), label: 'Proje teklifi gönder' },
      },
    ],
  },
  {
    slug: 'tarsus-comlekci',
    locale: 'tr',
    kicker: 'Tarsus çömlekçi',
    title: 'Tarsus çömlekçi: el yapımı terracotta üretim merkezi',
    intro:
      '“Tarsus çömlekçi” araması yapanlar için Yeşil Mahalle’deki atölyemiz; büyük küp, saksı ve dekoratif terracotta formları üreticiden doğrudan sunar.',
    seoTitle: 'Tarsus Çömlekçi | El Yapımı Terracotta Atölyesi',
    seoDescription:
      'Tarsus çömlekçi arayanlar için el yapımı terracotta saksı, büyük küp ve çömlek üretimi. Toptan, proje ve ihracat teklifi alın.',
    image: '/images/workshop.webp',
    imageAlt: 'Tarsus çömlekçi atölyesi — el yapımı terracotta üretimi',
    publishedAt: '2026-08-29',
    tags: ['Tarsus çömlekçi', 'Tarsus çömlek', 'terracotta atölye'],
    readingMinutes: 5,
    blocks: [
      {
        title: 'Tarsus’ta çömlekçilik geleneği',
        body: 'Tarsus, Mersin bölgesinde toprak sanatları ve çömlekçilik için köklü bir üretim hattına sahiptir. Tarsus Çömlekçilik bu geleneği günümüzün otel, villa, bahçe ve mimari projelerine taşır.',
      },
      {
        title: 'Kimler başvurur?',
        body: 'Peyzaj mimarları, otel işletmecileri, toptancılar, iç mimarlar ve bireysel bahçe sahipleri en sık talep eden gruplardır. Ürün grubu ve adet bilgisi paylaşıldığında teklif süreci başlar.',
        link: { href: '/iletisim', label: 'İletişime geç' },
      },
      {
        title: 'Atölyeyi ziyaret',
        body: `Atölye adresi: ${business.address}. Ziyaret öncesi WhatsApp üzerinden haber vermeniz üretim planına göre en uygun görüşme saatini belirlememize yardımcı olur.`,
        link: { href: business.googleMapsUrl, label: 'Haritada gör' },
      },
    ],
  },
  {
    slug: 'otel-villa-terracotta-saksi',
    locale: 'tr',
    kicker: 'Otel & villa',
    title: 'Otel ve villa projeleri için terracotta saksı seçimi',
    intro:
      'Konaklama ve villa projelerinde terracotta saksılar; giriş, avlu ve teras alanlarında hem dekoratif hem mimari bir rol üstlenir.',
    seoTitle: 'Otel & Villa Terracotta Saksı | Tarsus Üretici',
    seoDescription:
      'Otel, villa ve resort projeleri için büyük terracotta saksı ve küp. El yapımı üretim, toptan tedarik ve proje teklifi — Tarsus.',
    image: '/images/project-concept.webp',
    imageAlt: 'Otel villa terracotta saksı projesi — temsili konsept',
    publishedAt: '2026-08-28',
    tags: ['otel saksı', 'villa terracotta', 'peyzaj projesi'],
    readingMinutes: 5,
    blocks: [
      {
        title: 'Proje dilini belirlemek',
        body: 'Otel ve villa projelerinde aynı form ailesinin farklı ölçülerde kullanılması, geniş alanlarda tutarlı bir koleksiyon dili oluşturur. Giriş, lobiden avluya uzanan bir terracotta ritmi kurulabilir.',
        bullets: ['Karşılama ve giriş aksları', 'Avlu ve iç bahçe', 'Teras ve havuz çevresi', 'Restoran açık alanları'],
      },
      {
        title: 'Bakım ve operasyon',
        body: 'Büyük saksılarda drenaj, sulama erişimi ve mevsimsel bakım planı proje aşamasında düşünülmelidir. Form seçimi bu operasyonel ihtiyaçlarla birlikte değerlendirilir.',
        link: { href: '/otel-villa-peyzaj', label: 'Otel & villa çözümleri' },
      },
      {
        title: 'Teklif süreci',
        body: 'Mekân planı, yaklaşık ölçü, adet ve teslimat şehri paylaşıldığında proje bazlı terracotta teklifi hazırlanır.',
        link: { href: whatsappUrl('project'), label: 'Proje teklifi gönder' },
      },
    ],
  },
  {
    slug: 'bahce-terracotta-saksi',
    locale: 'tr',
    kicker: 'Bahçe saksısı',
    title: 'Bahçe için terracotta saksı: Akdeniz iklimine uygun seçim',
    intro:
      'Mersin ve Akdeniz bölgesinde bahçe düzenlemelerinde terracotta saksılar; doğal görünüm, dayanıklılık ve bitki sağlığı açısından güçlü bir tercihtir.',
    seoTitle: 'Bahçe Terracotta Saksı | El Yapımı — Tarsus',
    seoDescription:
      'Bahçe terracotta saksı ve büyük küp seçenekleri. El yapımı üretim, toptan tedarik ve Mersin-Tarsus sevkiyatı için teklif alın.',
    image: '/images/collection.webp',
    imageAlt: 'Bahçe terracotta saksı koleksiyonu — temsili görsel',
    publishedAt: '2026-08-27',
    tags: ['bahçe saksısı', 'terracotta bahçe', 'Akdeniz peyzaj'],
    readingMinutes: 4,
    blocks: [
      {
        title: 'Neden terracotta?',
        body: 'Pişmiş toprağın gözenekli yapısı kök bölgesinde daha dengeli bir ortam sağlar. Doğal renk tonları yeşillikle uyumlu bir zemin oluşturur; plastik saksılara kıyasla daha premium bir bahçe karakteri verir.',
      },
      {
        title: 'Ölçek ve yerleşim',
        body: 'Tek büyük küp ile odak noktası yaratılabilir; farklı ölçülerde tekrarlayan formlarla bahçede ritim kurulabilir. Yürüyüş aksları, girişler ve oturma alanları için farklı hacimler değerlendirilir.',
        link: { href: '/urunler', label: 'Saksı koleksiyonları' },
      },
    ],
  },
  {
    slug: 'terracotta-ihracat-turkiye',
    locale: 'tr',
    kicker: 'İhracat',
    title: 'Türkiye’den terracotta ihracat: Tarsus üreticiden dünyaya',
    intro:
      'Yurtdışı toptancıları, oteller ve peyzaj firmaları için Türkiye’den el yapımı terracotta ihracat tedariki.',
    seoTitle: 'Terracotta İhracat Türkiye | Tarsus Üretici',
    seoDescription:
      'Türkiye’den terracotta ihracat. El yapımı saksı ve büyük küp; toptan, otel ve peyzaj projeleri için ihracat teklifi alın.',
    image: '/images/hero-terracotta.webp',
    imageAlt: 'Türkiye terracotta ihracat — temsili ürün görseli',
    publishedAt: '2026-08-26',
    tags: ['terracotta ihracat', 'Türkiye çömlek', 'wholesale export'],
    readingMinutes: 5,
    blocks: [
      {
        title: 'İhracat talebinde gerekli bilgiler',
        body: 'Hedef ülke, ürün grubu, tahmini adet, teslimat noktası ve hedef takvim ihracat teklifinin temelini oluşturur. Paketleme ve taşıma planı ürün ölçüsüne göre ayrıca değerlendirilir.',
        bullets: ['Ürün listesi ve ölçüler', 'Tahmini sipariş adedi', 'Hedef ülke ve liman/şehir', 'Proje veya toptan kapsamı'],
      },
      {
        title: 'İngilizce iletişim',
        body: 'Uluslararası alıcılar için İngilizce ürün ve ihracat sayfalarımız mevcuttur. Teklif talebi WhatsApp veya web formu üzerinden iletilebilir.',
        link: { href: '/ihracat', label: 'İhracat sayfası' },
      },
      {
        title: 'Üretim kapasitesi',
        body: 'El yapımı üretimde her parça usta eliyle şekillendirilir; büyük siparişlerde üretim takvimi teklif aşamasında netleştirilir.',
        link: { href: '/en/export', label: 'Export page in English' },
      },
    ],
  },
  {
    slug: 'comlekci-nedir',
    locale: 'tr',
    kicker: 'Çömlekçi',
    title: 'Çömlekçi nedir? El yapımı terracotta üreticisini tanımak',
    intro:
      '“Çömlekçi” araması; kil ile şekillenen, fırınlanan ve mekâna doğal karakter katan ürünlerin ustasını arayanlar içindir. Tarsus’taki atölyemiz bu geleneği toptan ve proje ölçeğinde sürdürür.',
    seoTitle: 'Çömlekçi Nedir? | El Yapımı Terracotta Üreticisi — Tarsus',
    seoDescription:
      'Çömlekçi kimdir, nasıl çalışır? Tarsus’ta el yapımı terracotta saksı ve büyük küp üreten çömlekçi atölyesi. Toptan ve proje teklifi alın.',
    image: '/images/workshop.webp',
    imageAlt: 'Çömlekçi atölyesinde el yapımı terracotta üretimi — temsili görsel',
    publishedAt: '2026-09-05',
    tags: ['çömlekçi', 'çömlek ustası', 'terracotta üretici'],
    readingMinutes: 5,
    blocks: [
      {
        title: 'Çömlekçi ne üretir?',
        body: 'Çömlekçi; toprağın hazırlanması, şekillendirme, kurutma ve fırınlama adımlarıyla saksı, küp ve dekoratif toprak formlar üretir. El yapımı terracotta’da yüzey tonları ve küçük ölçü farkları doğal kabul edilir.',
        bullets: ['El şekillendirme', 'Fırınlanmış terracotta', 'Bahçe ve mimari ölçek', 'Toptan / proje tedariki'],
      },
      {
        title: 'Neden üreticiden almak avantajlı?',
        body: 'Aracı olmadan üreticiyle çalışmak; ölçü, adet, paketleme ve teslimat planını tek konuşmada netleştirmenizi sağlar. Tarsus Çömlekçilik, Mersin bölgesinde doğrudan atölye tedariki sunar.',
        link: { href: '/toptan-satis', label: 'Toptan tedarik' },
      },
      {
        title: 'İletişim',
        body: 'Ürün grubu, tahmini adet ve teslimat şehrini paylaşarak teklif sürecini başlatabilirsiniz.',
        link: { href: whatsappUrl('default'), label: 'WhatsApp’tan yaz' },
      },
    ],
  },
  {
    slug: 'comlek-ureticisi',
    locale: 'tr',
    kicker: 'Comlek',
    title: 'Comlek / çömlek üreticisi: Tarsus’tan el yapımı terracotta',
    intro:
      '“Comlek” veya “çömlek” yazarak arayanlar için: Tarsus’ta el yapımı terracotta saksı, büyük küp ve dekoratif form üreten atölye.',
    seoTitle: 'Comlek & Çömlek Üreticisi | Tarsus Terracotta',
    seoDescription:
      'Comlek, çömlek ve terracotta üreticisi Tarsus. El yapımı saksı ve büyük küp; toptan, proje ve WhatsApp teklifi.',
    image: '/images/collection.webp',
    imageAlt: 'Comlek çömlek terracotta ürün grubu — temsili görsel',
    publishedAt: '2026-09-05',
    tags: ['comlek', 'çömlek', 'çömlek üreticisi'],
    readingMinutes: 4,
    blocks: [
      {
        title: 'Comlek araması neden önemli?',
        body: 'Birçok kullanıcı Türkçe karakter kullanmadan “comlek” yazar. Bu sayfa hem comlek hem çömlek aramalarını karşılayacak şekilde hazırlandı; ürünlerimiz el yapımı terracotta’dır.',
      },
      {
        title: 'Ürün yelpazesi',
        body: 'Büyük boy küpler, bahçe saksıları, dekoratif ve mimari formlar. Ölçü ve adet projeye göre planlanır; liste fiyatı yerine teklif ile ilerlenir.',
        link: { href: '/urunler', label: 'Ürünleri incele' },
      },
      {
        title: 'Teklif alın',
        body: 'Comlek / çömlek tedariki için ürün tipi ve adedi WhatsApp’tan paylaşın.',
        link: { href: whatsappUrl('wholesale'), label: 'Toptan teklif' },
      },
    ],
  },
];

const enBlogSeeds: BlogSeed[] = [
  {
    slug: 'mersin-terracotta-manufacturer',
    locale: 'en',
    kicker: 'Mersin terracotta',
    title: 'Mersin terracotta manufacturer in Tarsus, Turkey',
    intro:
      'For international buyers searching for a Mersin terracotta manufacturer, our Tarsus workshop produces handmade jars, planters and decorative pottery for wholesale and project supply.',
    seoTitle: 'Mersin Terracotta Manufacturer | Handmade in Tarsus, Turkey',
    seoDescription:
      'Mersin terracotta manufacturer in Tarsus. Handmade Turkish terracotta pots, oversized jars and planters for wholesale, hotels and export enquiries.',
    image: '/images/hero-terracotta.webp',
    imageAlt: 'Handmade terracotta production in Tarsus, Mersin — concept image',
    publishedAt: '2026-08-20',
    tags: ['Mersin terracotta', 'Turkish manufacturer', 'handmade pottery'],
    readingMinutes: 5,
    blocks: [
      {
        title: 'Why source terracotta from Tarsus?',
        body: 'Tarsus sits within the Mersin region and combines a long pottery tradition with practical access for Mediterranean landscape, hospitality and export projects. Handmade terracotta offers natural texture, breathable material behaviour and architectural presence that molded alternatives rarely match.',
      },
      {
        title: 'Product scope',
        body: 'Oversized terracotta jars, garden planters, decorative pottery and architectural-scale forms are the core ranges. Each piece is shaped by hand, so small variations in tone and surface are part of the material identity.',
        link: { href: '/en/products', label: 'Explore product collections' },
      },
      {
        title: 'Wholesale and export enquiries',
        body: 'Share the product family, estimated quantity, destination country and target schedule to start a structured quotation. Export packing and delivery planning are reviewed during the enquiry stage.',
        link: { href: '/en/export', label: 'Export information' },
      },
    ],
  },
  {
    slug: 'turkish-terracotta-wholesale',
    locale: 'en',
    kicker: 'Turkish terracotta wholesale',
    title: 'Turkish terracotta wholesale from a maker in Tarsus',
    intro:
      'Wholesale buyers, landscape companies and hospitality projects looking for Turkish terracotta supply can work directly with our production workshop in Tarsus, Mersin.',
    seoTitle: 'Turkish Terracotta Wholesale | Direct from Tarsus Maker',
    seoDescription:
      'Turkish terracotta wholesale from Tarsus, Mersin. Handmade pots and oversized jars for retailers, hotels, villas and landscape projects. Request a quote.',
    image: '/images/collection.webp',
    imageAlt: 'Turkish terracotta wholesale collection — concept image',
    publishedAt: '2026-08-15',
    tags: ['Turkish terracotta', 'wholesale', 'pottery supplier'],
    readingMinutes: 4,
    blocks: [
      {
        title: 'Direct-from-maker supply',
        body: 'Working with the manufacturer reduces unnecessary intermediaries and makes production timing, packing and product variation easier to coordinate. Wholesale terracotta decisions should consider not only unit price but also packing, breakage risk and delivery planning.',
      },
      {
        title: 'Typical buyer profiles',
        body: 'Retailers, landscape practices, hotel groups, villa developers and export traders are the most common enquiry types. Project-based supply often requires repeatable forms in different sizes to keep visual rhythm across large sites.',
        link: { href: '/en/wholesale', label: 'Wholesale page' },
      },
      {
        title: 'Start an enquiry',
        body: 'Send the product type, quantity, destination and intended use on WhatsApp to open a focused trade conversation.',
        link: { href: whatsappUrl('wholesale', undefined, true), label: 'Message on WhatsApp' },
      },
    ],
  },
  {
    slug: 'tarsus-products',
    locale: 'en',
    kicker: 'Tarsus products',
    title: 'Tarsus products: handmade terracotta pots and jars from Turkey',
    intro:
      'Looking for Tarsus products? Our workshop in Tarsus, Mersin produces handmade terracotta pots, oversized jars and decorative pottery for wholesale and project buyers.',
    seoTitle: 'Tarsus Products | Handmade Terracotta Pots & Jars',
    seoDescription:
      'Tarsus products: handmade terracotta pots, jars and planters from Tarsus, Turkey. Wholesale, hospitality and export enquiries welcome.',
    image: '/images/collection.webp',
    imageAlt: 'Tarsus products — handmade terracotta collection concept',
    publishedAt: '2026-09-05',
    tags: ['Tarsus products', 'Tarsus pottery', 'Turkish terracotta'],
    readingMinutes: 4,
    blocks: [
      {
        title: 'What “Tarsus products” usually means',
        body: 'Buyers searching for Tarsus products often want authentic handmade pottery from the Mersin–Tarsus region: large terracotta jars, garden planters and architectural forms made by local craftsmanship.',
      },
      {
        title: 'Product families we supply',
        body: 'Oversized jars, garden terracotta, decorative pots and project-scale planters. Each piece is handmade, so natural tone and surface variation are part of the material.',
        link: { href: '/en/products', label: 'Browse products' },
      },
      {
        title: 'Request a quote',
        body: 'Share product type, quantity and destination to start a structured wholesale or project quotation.',
        link: { href: whatsappUrl('default', undefined, true), label: 'WhatsApp enquiry' },
      },
    ],
  },
  {
    slug: 'terracotta-shop-near-me',
    locale: 'en',
    kicker: 'Near me',
    title: 'Terracotta shop near me? Source directly from a Tarsus maker',
    intro:
      'Searching “terracotta shop near me”? If you need handmade terracotta at production scale, buy directly from our workshop in Tarsus, Mersin — with shipping planned for Turkey and export.',
    seoTitle: 'Terracotta Shop Near Me | Maker in Tarsus, Turkey',
    seoDescription:
      'Terracotta shop near me alternatives: buy handmade terracotta pots and jars directly from a Tarsus workshop. Wholesale and project supply.',
    image: '/images/workshop.webp',
    imageAlt: 'Terracotta workshop in Tarsus — concept image',
    publishedAt: '2026-09-05',
    tags: ['terracotta shop near me', 'terracotta store', 'pottery near me'],
    readingMinutes: 4,
    blocks: [
      {
        title: 'Local shop vs. maker supply',
        body: 'A retail terracotta shop near you may stock small decorative pieces. For large jars, garden planters and project quantities, working with a maker in Tarsus often gives better control over size, packing and delivery timing.',
      },
      {
        title: 'Where we are',
        body: `Our workshop is in Tarsus, Mersin (${business.address}). Visits by appointment; WhatsApp is the fastest way to start a quote.`,
        link: { href: business.googleMapsUrl, label: 'Open in Google Maps' },
      },
      {
        title: 'How to order',
        body: 'Send photos of your space or a product type, estimated quantity and city/country. We reply with a focused wholesale or project plan.',
        link: { href: '/en/contact', label: 'Contact / quote' },
      },
    ],
  },
  {
    slug: 'pot-wholesale',
    locale: 'en',
    kicker: 'Pot wholesale',
    title: 'Pot wholesale: handmade terracotta pots from Tarsus',
    intro:
      'Need pot wholesale for retail, landscape or hospitality? Order handmade terracotta pots and oversized jars directly from our Tarsus production workshop.',
    seoTitle: 'Pot Wholesale | Handmade Terracotta from Tarsus',
    seoDescription:
      'Pot wholesale from Turkey: handmade terracotta pots and jars from Tarsus. Direct-from-maker pricing for retailers, hotels and landscape projects.',
    image: '/images/hero-terracotta.webp',
    imageAlt: 'Pot wholesale terracotta jars — concept image',
    publishedAt: '2026-09-05',
    tags: ['pot wholesale', 'wholesale pots', 'terracotta wholesale'],
    readingMinutes: 5,
    blocks: [
      {
        title: 'What wholesale buyers should prepare',
        body: 'Clear product type, target size range, estimated quantity, destination and packing expectations speed up pot wholesale quotes. Unit price alone is not enough for large terracotta forms.',
        bullets: ['Product family and sizes', 'Estimated quantity', 'Delivery city or country', 'Timeline'],
      },
      {
        title: 'Why buy from the maker',
        body: 'Direct pot wholesale from Tarsus reduces intermediary layers and makes production scheduling, packing and surface variation easier to discuss before you commit.',
        link: { href: '/en/wholesale', label: 'Wholesale page' },
      },
      {
        title: 'Start a wholesale enquiry',
        body: 'Message us on WhatsApp with your pot wholesale brief — we continue the conversation in English when needed.',
        link: { href: whatsappUrl('wholesale', undefined, true), label: 'WhatsApp wholesale' },
      },
    ],
  },
];

export const blogPosts: BlogPost[] = [...trBlogSeeds, ...enBlogSeeds].map(post);

export const blogIndexPages: PageContent[] = [
  {
    path: '/blog',
    locale: 'tr',
    kicker: 'Blog',
    title: 'Mersin & Tarsus terracotta rehberi',
    intro:
      'Mersin çömlekçi, terracotta saksı, toptan tedarik ve el yapımı üretim hakkında SEO odaklı rehber yazıları. Tarsus’taki atölyemizden güncel bilgiler.',
    seoTitle: 'Blog | Mersin Çömlekçi & Terracotta Rehberi — Tarsus',
    seoDescription:
      'Çömlekçi, comlek, Mersin terracotta, Tarsus products, pot wholesale ve terracotta shop near me aramaları için rehber yazılar.',
    image: '/images/collection.webp',
    imageAlt: 'Mersin ve Tarsus terracotta blog — temsili görsel',
    blocks: [],
  },
  {
    path: '/en/blog',
    locale: 'en',
    kicker: 'Blog',
    title: 'Terracotta insights from Tarsus, Mersin',
    intro:
      'Articles on Mersin terracotta manufacturing, Turkish wholesale supply and handmade pottery for hospitality and landscape projects.',
    seoTitle: 'Blog | Mersin Terracotta & Turkish Pottery — Tarsus',
    seoDescription:
      'Mersin terracotta manufacturer insights, Turkish terracotta wholesale and handmade pottery from Tarsus for export and project supply.',
    image: '/images/collection.webp',
    imageAlt: 'Mersin terracotta blog — concept image',
    blocks: [],
  },
];

export function postsForLocale(locale: 'tr' | 'en') {
  return blogPosts
    .filter((item) => item.locale === locale)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function isBlogPath(path: string) {
  return path === '/blog' || path === '/en/blog' || path.startsWith('/blog/') || path.startsWith('/en/blog/');
}

export function blogPostFromPath(path: string) {
  return blogPosts.find((item) => item.path === path);
}
