'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { assertAdmin, authConfigError, checkPassword, createSession, destroySession } from '@/lib/admin/auth';
import { deleteLead, LEAD_STATUSES, rateLimit, updateLead, type LeadStatus } from '@/lib/admin/leads';
import { ConflictError, readContent, updateContent } from '@/lib/admin/store';
import {
  validateBlogPosts,
  validateBlogSeed,
  validateBusiness,
  validateCategories,
  validateProduct,
  validateProducts,
  ValidationError,
  type BlogSeed,
  type Category,
  type Product,
} from '@/lib/content-types';

export type ActionResult =
  | { ok: true; message: string; commitUrl?: string | null; redirectTo?: string }
  | { ok: false; errors: string[] };

async function run(task: () => Promise<Omit<Extract<ActionResult, { ok: true }>, 'ok'>>): Promise<ActionResult> {
  try {
    await assertAdmin();
    return { ok: true, ...(await task()) };
  } catch (error) {
    if (error instanceof ValidationError) return { ok: false, errors: error.issues };
    if (error instanceof ConflictError) return { ok: false, errors: [error.message] };
    console.error('[admin]', error);
    return { ok: false, errors: [error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu.'] };
  }
}

const publishNote = (commitUrl: string | null) =>
  commitUrl ? 'Kaydedildi. Site 1-2 dakika içinde yeniden yayınlanacak.' : 'Kaydedildi.';

// ---------------------------------------------------------------------------
// Oturum
// ---------------------------------------------------------------------------

export type LoginState = { error: string | null };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const configError = authConfigError();
  if (configError) return { error: `Panel yapılandırılmamış: ${configError}` };

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!(await rateLimit(`login:${ip}`, 8, 900))) {
    return { error: 'Çok fazla hatalı deneme. 15 dakika sonra tekrar deneyin.' };
  }
  if (!(await checkPassword(String(formData.get('password') ?? '')))) {
    return { error: 'Şifre hatalı.' };
  }
  await createSession();
  redirect('/admin');
}

export async function logoutAction() {
  await destroySession();
  redirect('/admin/giris');
}

// ---------------------------------------------------------------------------
// Firma bilgileri
// ---------------------------------------------------------------------------

export async function saveBusinessAction(input: unknown) {
  return run(async () => {
    const business = validateBusiness(input);
    const { commitUrl } = await updateContent('business', 'Admin: firma bilgileri güncellendi', () => business);
    return { message: publishNote(commitUrl), commitUrl };
  });
}

// ---------------------------------------------------------------------------
// Ürünler & kategoriler
// ---------------------------------------------------------------------------

async function categorySlugs() {
  return new Set((await readContent<Category[]>('categories')).data.map((category) => category.slug));
}

export async function saveProductAction(originalSlug: string | null, input: unknown) {
  return run(async () => {
    const product = validateProduct(input);
    if ((await categorySlugs()).has(product.slug)) {
      throw new ValidationError([`"${product.slug}" adresi bir kategori sayfasında kullanılıyor; farklı bir adres seçin.`]);
    }
    const { commitUrl } = await updateContent<Product[]>('products', `Admin: ürün kaydedildi — ${product.slug}`, (current) => {
      if (product.slug !== originalSlug && current.some((item) => item.slug === product.slug)) {
        throw new ValidationError([`"${product.slug}" adresiyle başka bir ürün var.`]);
      }
      let next = originalSlug === null ? [...current, product] : current.map((item) => (item.slug === originalSlug ? product : item));
      if (originalSlug !== null && !current.some((item) => item.slug === originalSlug)) {
        throw new ValidationError(['Düzenlediğiniz ürün artık bulunmuyor; listeyi yenileyin.']);
      }
      // Tek bir öne çıkan ürün olsun.
      if (product.featured) next = next.map((item) => (item.slug === product.slug ? item : { ...item, featured: undefined }));
      return validateProducts(next);
    });
    return { message: publishNote(commitUrl), commitUrl, redirectTo: `/admin/urunler/${product.slug}` };
  });
}

export async function deleteProductAction(slug: string) {
  return run(async () => {
    const { commitUrl } = await updateContent<Product[]>('products', `Admin: ürün silindi — ${slug}`, (current) =>
      validateProducts(current.filter((item) => item.slug !== slug)),
    );
    return { message: publishNote(commitUrl), commitUrl, redirectTo: '/admin/urunler' };
  });
}

export async function saveCategoriesAction(input: unknown) {
  return run(async () => {
    const categories = validateCategories(input);
    const products = (await readContent<Product[]>('products')).data;
    const clash = categories.find((category) => products.some((product) => product.slug === category.slug));
    if (clash) throw new ValidationError([`"${clash.slug}" adresi bir ürün sayfasında kullanılıyor.`]);
    const { commitUrl } = await updateContent('categories', 'Admin: kategoriler güncellendi', () => categories);
    return { message: publishNote(commitUrl), commitUrl };
  });
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

type PostKey = { locale: 'tr' | 'en'; slug: string };
const sameKey = (post: BlogSeed, key: PostKey) => post.locale === key.locale && post.slug === key.slug;

export async function saveBlogPostAction(original: PostKey | null, input: unknown) {
  return run(async () => {
    const post = validateBlogSeed(input);
    const { commitUrl } = await updateContent<BlogSeed[]>('blog', `Admin: blog yazısı kaydedildi — ${post.locale}/${post.slug}`, (current) => {
      if ((!original || !sameKey(post, original)) && current.some((item) => sameKey(item, post))) {
        throw new ValidationError([`Bu dilde "${post.slug}" adresiyle başka bir yazı var.`]);
      }
      if (original && !current.some((item) => sameKey(item, original))) {
        throw new ValidationError(['Düzenlediğiniz yazı artık bulunmuyor; listeyi yenileyin.']);
      }
      const next = original ? current.map((item) => (sameKey(item, original) ? post : item)) : [...current, post];
      return validateBlogPosts(next);
    });
    return { message: publishNote(commitUrl), commitUrl, redirectTo: `/admin/blog/${post.locale}/${post.slug}` };
  });
}

export async function deleteBlogPostAction(key: PostKey) {
  return run(async () => {
    const { commitUrl } = await updateContent<BlogSeed[]>('blog', `Admin: blog yazısı silindi — ${key.locale}/${key.slug}`, (current) =>
      current.filter((item) => !sameKey(item, key)),
    );
    return { message: publishNote(commitUrl), commitUrl, redirectTo: '/admin/blog' };
  });
}

// ---------------------------------------------------------------------------
// Teklif talepleri
// ---------------------------------------------------------------------------

export async function updateLeadAction(id: string, patch: { status?: string; note?: string }) {
  return run(async () => {
    const clean: { status?: LeadStatus; note?: string } = {};
    if (patch.status !== undefined) {
      if (!LEAD_STATUSES.some((s) => s.value === patch.status)) throw new ValidationError(['Geçersiz durum']);
      clean.status = patch.status as LeadStatus;
    }
    if (patch.note !== undefined) clean.note = String(patch.note).slice(0, 2000);
    await updateLead(id, clean);
    return { message: 'Güncellendi.' };
  });
}

export async function deleteLeadAction(id: string) {
  return run(async () => {
    await deleteLead(id);
    return { message: 'Kayıt silindi.' };
  });
}
