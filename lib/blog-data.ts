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
      'Mersin çömlekçi, Mersin terracotta, Tarsus çömlek atölyesi ve toptan tedarik hakkında blog yazıları. El yapımı terracotta üretimi ve proje tedariki.',
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
