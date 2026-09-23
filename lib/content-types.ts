/**
 * Admin panelinin düzenlediği içerik dosyalarının (content/*.json) tipleri ve doğrulaması.
 * Hem sitede hem panelde (istemci + sunucu) kullanılır; Node API'si içermez.
 */

export type ContentBlock = { title: string; body: string; bullets?: string[]; link?: { href: string; label: string } };

export type Business = {
  name: string;
  legalName: string;
  instagram: string;
  instagramHandle: string;
  youtube: string;
  youtubeHandle: string;
  founded: string;
  locality: string;
  region: string;
  country: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string | null;
  streetAddress: string;
  postalCode: string;
  address: string;
  googleBusinessUrl: string;
  googleMapsUrl: string;
  website: string;
};

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

export type Category = { slug: string; name: string; en: string; image: string };

export type BlogSeed = {
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
  updatedAt?: string;
  tags: string[];
  readingMinutes: number;
  blocks: ContentBlock[];
};

export const CONTENT_FILES = {
  business: 'content/business.json',
  products: 'content/products.json',
  categories: 'content/categories.json',
  blog: 'content/blog-posts.json',
} as const;

export type ContentKey = keyof typeof CONTENT_FILES;

/** Blog/ürün metinlerinde kullanılabilen yer tutucular; render sırasında firma bilgisiyle değiştirilir. */
export const TEXT_TOKENS = ['{{firma}}', '{{adres}}', '{{telefon}}'] as const;

export function applyTextTokens(text: string, business: Pick<Business, 'name' | 'address' | 'phoneDisplay'>) {
  return text
    .replaceAll('{{firma}}', business.name)
    .replaceAll('{{adres}}', business.address)
    .replaceAll('{{telefon}}', business.phoneDisplay);
}

/** Link href'lerinde `whatsapp:<bağlam>` yazılırsa güncel WhatsApp numarasıyla bağlantı üretilir. */
export const WHATSAPP_HREF_CONTEXTS = ['default', 'product', 'project', 'wholesale', 'export', 'quote'] as const;

// ---------------------------------------------------------------------------
// Doğrulama
// ---------------------------------------------------------------------------

export class ValidationError extends Error {
  issues: string[];

  constructor(issues: string[]) {
    super(issues.join('\n'));
    this.issues = issues;
  }
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function str(issues: string[], label: string, value: unknown, { required = true, max = 5000 } = {}) {
  if (typeof value !== 'string') {
    issues.push(`${label}: metin olmalı`);
    return '';
  }
  const trimmed = value.trim();
  if (required && !trimmed) issues.push(`${label}: boş bırakılamaz`);
  if (trimmed.length > max) issues.push(`${label}: en fazla ${max} karakter olabilir`);
  return trimmed;
}

function optStr(issues: string[], label: string, value: unknown, max = 5000) {
  if (value === undefined || value === null || value === '') return undefined;
  const result = str(issues, label, value, { required: false, max });
  return result || undefined;
}

function strList(issues: string[], label: string, value: unknown, max = 300) {
  if (value === undefined) return [];
  if (!Array.isArray(value)) {
    issues.push(`${label}: liste olmalı`);
    return [];
  }
  return value.map((item, i) => str(issues, `${label} #${i + 1}`, item, { max })).filter(Boolean);
}

function url(issues: string[], label: string, value: unknown, { required = true } = {}) {
  const result = str(issues, label, value, { required, max: 1000 });
  if (result && !/^https?:\/\//i.test(result)) issues.push(`${label}: http(s):// ile başlamalı`);
  return result;
}

function imagePath(issues: string[], label: string, value: unknown) {
  const result = str(issues, label, value, { max: 300 });
  if (result && !/^\/[\w\-./]+\.(webp|png|jpe?g|avif|svg)$/i.test(result)) {
    issues.push(`${label}: /images/... biçiminde bir görsel yolu olmalı`);
  }
  return result;
}

function slug(issues: string[], label: string, value: unknown) {
  const result = str(issues, label, value, { max: 120 });
  if (result && !SLUG_RE.test(result)) issues.push(`${label}: yalnızca küçük harf, rakam ve tire içerebilir`);
  return result;
}

function href(issues: string[], label: string, value: unknown) {
  const result = str(issues, label, value, { max: 1000 });
  const ok =
    result.startsWith('/') ||
    result.startsWith('#') ||
    /^https?:\/\//i.test(result) ||
    /^(mailto|tel):/i.test(result) ||
    WHATSAPP_HREF_CONTEXTS.some((ctx) => result === `whatsapp:${ctx}`);
  if (result && !ok) issues.push(`${label}: /sayfa, https://..., tel:, mailto: veya whatsapp:<bağlam> olmalı`);
  return result;
}

function unique(issues: string[], label: string, values: string[]) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) issues.push(`${label}: "${value}" birden fazla kez kullanılmış`);
    seen.add(value);
  }
}

function blocks(issues: string[], value: unknown): ContentBlock[] {
  if (!Array.isArray(value)) {
    issues.push('Bölümler: liste olmalı');
    return [];
  }
  return value.map((raw, i) => {
    const label = `Bölüm #${i + 1}`;
    const b = (raw ?? {}) as Record<string, unknown>;
    const block: ContentBlock = {
      title: str(issues, `${label} başlık`, b.title, { max: 200 }),
      body: str(issues, `${label} metin`, b.body, { max: 8000 }),
    };
    const bullets = strList(issues, `${label} maddeler`, b.bullets);
    if (bullets.length) block.bullets = bullets;
    const link = b.link as Record<string, unknown> | undefined;
    if (link && (link.href || link.label)) {
      block.link = { href: href(issues, `${label} link adresi`, link.href), label: str(issues, `${label} link metni`, link.label, { max: 120 }) };
    }
    return block;
  });
}

export function validateBusiness(raw: unknown): Business {
  const issues: string[] = [];
  const b = (raw ?? {}) as Record<string, unknown>;
  const digits = (label: string, value: unknown) => {
    const result = str(issues, label, value, { max: 20 });
    if (result && !/^\d{10,15}$/.test(result)) issues.push(`${label}: ülke koduyla, yalnızca rakam (ör. 905xxxxxxxxx)`);
    return result;
  };
  const email = optStr(issues, 'E-posta', b.email, 200) ?? null;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) issues.push('E-posta: geçerli bir adres değil');
  const result: Business = {
    name: str(issues, 'Firma adı', b.name, { max: 120 }),
    legalName: str(issues, 'Ticari unvan', b.legalName, { max: 200 }),
    instagram: url(issues, 'Instagram', b.instagram),
    instagramHandle: str(issues, 'Instagram kullanıcı adı', b.instagramHandle, { max: 80 }),
    youtube: url(issues, 'YouTube', b.youtube),
    youtubeHandle: str(issues, 'YouTube kullanıcı adı', b.youtubeHandle, { max: 80 }),
    founded: str(issues, 'Kuruluş yılı', b.founded, { max: 4 }),
    locality: str(issues, 'İlçe', b.locality, { max: 80 }),
    region: str(issues, 'İl', b.region, { max: 80 }),
    country: str(issues, 'Ülke', b.country, { max: 80 }),
    phone: digits('Telefon', b.phone),
    phoneDisplay: str(issues, 'Telefon (görünen)', b.phoneDisplay, { max: 40 }),
    whatsapp: digits('WhatsApp', b.whatsapp),
    email,
    streetAddress: str(issues, 'Sokak adresi', b.streetAddress, { max: 200 }),
    postalCode: str(issues, 'Posta kodu', b.postalCode, { max: 10 }),
    address: str(issues, 'Tam adres', b.address, { max: 300 }),
    googleBusinessUrl: url(issues, 'Google İşletme linki', b.googleBusinessUrl),
    googleMapsUrl: url(issues, 'Google Haritalar linki', b.googleMapsUrl),
    website: url(issues, 'Web sitesi', b.website),
  };
  if (!/^\d{4}$/.test(result.founded)) issues.push('Kuruluş yılı: 4 haneli yıl olmalı');
  if (issues.length) throw new ValidationError(issues);
  return result;
}

export function validateProduct(raw: unknown): Product {
  const issues: string[] = [];
  const p = (raw ?? {}) as Record<string, unknown>;
  const images = Array.isArray(p.images) ? p.images.map((img, i) => imagePath(issues, `Görsel #${i + 1}`, img)) : [];
  if (!images.length) issues.push('En az bir görsel seçilmeli');
  const product: Product = {
    slug: slug(issues, 'Adres (slug)', p.slug),
    name: str(issues, 'Ürün adı', p.name, { max: 160 }),
    category: str(issues, 'Kategori', p.category, { max: 160 }),
    shortDescription: str(issues, 'Kısa açıklama', p.shortDescription, { max: 400 }),
    description: str(issues, 'Açıklama', p.description, { max: 5000 }),
    images,
  };
  const optional = {
    dimensions: optStr(issues, 'Ölçüler', p.dimensions, 300),
    material: optStr(issues, 'Malzeme', p.material, 200),
    color: optStr(issues, 'Renk', p.color, 200),
    seoTitle: optStr(issues, 'SEO başlığı', p.seoTitle, 120),
    seoDescription: optStr(issues, 'SEO açıklaması', p.seoDescription, 320),
  };
  for (const [key, value] of Object.entries(optional)) if (value) (product as Record<string, unknown>)[key] = value;
  const applications = strList(issues, 'Kullanım alanları', p.applications);
  if (applications.length) product.applications = applications;
  if (p.featured === true) product.featured = true;
  if (issues.length) throw new ValidationError(issues);
  return product;
}

export function validateProducts(raw: unknown): Product[] {
  if (!Array.isArray(raw)) throw new ValidationError(['Ürün listesi geçersiz']);
  const list = raw.map(validateProduct);
  if (!list.length) throw new ValidationError(['En az bir ürün kalmalı (ana sayfadaki öne çıkan ürün alanı için)']);
  const issues: string[] = [];
  unique(issues, 'Ürün adresi', list.map((p) => p.slug));
  if (issues.length) throw new ValidationError(issues);
  return list;
}

export function validateCategories(raw: unknown): Category[] {
  const issues: string[] = [];
  if (!Array.isArray(raw)) throw new ValidationError(['Kategori listesi geçersiz']);
  const list = raw.map((item, i) => {
    const c = (item ?? {}) as Record<string, unknown>;
    const label = `Kategori #${i + 1}`;
    return {
      slug: slug(issues, `${label} adres`, c.slug),
      name: str(issues, `${label} ad`, c.name, { max: 120 }),
      en: str(issues, `${label} İngilizce ad`, c.en, { max: 120 }),
      image: imagePath(issues, `${label} görsel`, c.image),
    };
  });
  if (!list.length) issues.push('En az bir kategori olmalı');
  unique(issues, 'Kategori adresi', list.map((c) => c.slug));
  if (issues.length) throw new ValidationError(issues);
  return list;
}

export function validateBlogSeed(raw: unknown): BlogSeed {
  const issues: string[] = [];
  const b = (raw ?? {}) as Record<string, unknown>;
  const locale = b.locale === 'en' ? 'en' : b.locale === 'tr' ? 'tr' : null;
  if (!locale) issues.push('Dil: tr veya en olmalı');
  const publishedAt = str(issues, 'Yayın tarihi', b.publishedAt, { max: 10 });
  if (publishedAt && !DATE_RE.test(publishedAt)) issues.push('Yayın tarihi: YYYY-AA-GG biçiminde olmalı');
  const readingMinutes = Number(b.readingMinutes);
  if (!Number.isInteger(readingMinutes) || readingMinutes < 1 || readingMinutes > 120) issues.push('Okuma süresi: 1–120 arası tam sayı');
  const post: BlogSeed = {
    slug: slug(issues, 'Adres (slug)', b.slug),
    locale: locale ?? 'tr',
    kicker: str(issues, 'Üst başlık', b.kicker, { max: 120 }),
    title: str(issues, 'Başlık', b.title, { max: 200 }),
    intro: str(issues, 'Giriş', b.intro, { max: 1000 }),
    seoTitle: str(issues, 'SEO başlığı', b.seoTitle, { max: 120 }),
    seoDescription: str(issues, 'SEO açıklaması', b.seoDescription, { max: 320 }),
    image: imagePath(issues, 'Kapak görseli', b.image),
    imageAlt: str(issues, 'Görsel açıklaması (alt)', b.imageAlt, { max: 300 }),
    publishedAt,
    tags: strList(issues, 'Etiketler', b.tags, 80),
    readingMinutes,
    blocks: blocks(issues, b.blocks),
  };
  const updatedAt = optStr(issues, 'Güncelleme tarihi', b.updatedAt, 10);
  if (updatedAt) {
    if (!DATE_RE.test(updatedAt)) issues.push('Güncelleme tarihi: YYYY-AA-GG biçiminde olmalı');
    post.updatedAt = updatedAt;
  }
  if (!post.blocks.length) issues.push('En az bir bölüm ekleyin');
  if (issues.length) throw new ValidationError(issues);
  return post;
}

export function validateBlogPosts(raw: unknown): BlogSeed[] {
  if (!Array.isArray(raw)) throw new ValidationError(['Blog listesi geçersiz']);
  const list = raw.map(validateBlogSeed);
  const issues: string[] = [];
  unique(issues, 'Blog adresi', list.map((p) => `${p.locale}/${p.slug}`));
  if (issues.length) throw new ValidationError(issues);
  return list;
}

export function emptyBlogSeed(): BlogSeed {
  return {
    slug: '',
    locale: 'tr',
    kicker: '',
    title: '',
    intro: '',
    seoTitle: '',
    seoDescription: '',
    image: '/images/collection.webp',
    imageAlt: '',
    publishedAt: new Date().toISOString().slice(0, 10),
    tags: [],
    readingMinutes: 5,
    blocks: [{ title: '', body: '' }],
  };
}

export function emptyProduct(): Product {
  return { slug: '', name: '', category: '', shortDescription: '', description: '', images: ['/images/collection.webp'] };
}

export function slugify(text: string) {
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
