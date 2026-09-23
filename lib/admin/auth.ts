import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Tek kullanıcılı admin oturumu.
 * - ADMIN_PASSWORD: panel şifresi
 * - ADMIN_SESSION_SECRET: oturum çerezini imzalamak için en az 32 karakterlik rastgele değer
 * Çerez, son kullanma zamanını HMAC-SHA256 ile imzalanmış olarak taşır; sunucuda oturum tablosu gerekmez.
 */

export const SESSION_COOKIE = 'tc_admin';
const SESSION_TTL_SECONDS = 60 * 60 * 12;

const encoder = new TextEncoder();

export function authConfigError(): string | null {
  const password = process.env.ADMIN_PASSWORD ?? '';
  const secret = process.env.ADMIN_SESSION_SECRET ?? '';
  if (!password) return 'ADMIN_PASSWORD ortam değişkeni tanımlı değil.';
  if (password.length < 10) return 'ADMIN_PASSWORD en az 10 karakter olmalı.';
  if (secret.length < 32) return 'ADMIN_SESSION_SECRET en az 32 karakter olmalı.';
  return null;
}

async function hmac(value: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(process.env.ADMIN_SESSION_SECRET ?? ''),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return Buffer.from(signature).toString('base64url');
}

/** Uzunluk sızdırmadan sabit zamanlı karşılaştırma (iki tarafın da özetini karşılaştırır). */
async function safeEqual(a: string, b: string) {
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(a)),
    crypto.subtle.digest('SHA-256', encoder.encode(b)),
  ]);
  const va = new Uint8Array(ha);
  const vb = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

export async function checkPassword(candidate: string) {
  if (authConfigError()) return false;
  return safeEqual(candidate, process.env.ADMIN_PASSWORD ?? '');
}

export async function createSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `v1.${expires}`;
  const store = await cookies();
  store.set(SESSION_COOKIE, `${payload}.${await hmac(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, '', { path: '/admin', maxAge: 0 });
}

export async function isAuthenticated() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (authConfigError()) return false;
  if (!token) return false;
  const lastDot = token.lastIndexOf('.');
  if (lastDot < 0) return false;
  const payload = token.slice(0, lastDot);
  const [version, expires] = payload.split('.');
  if (version !== 'v1' || !(Number(expires) > Date.now() / 1000)) return false;
  return safeEqual(token.slice(lastDot + 1), await hmac(payload));
}

/** Sayfalarda: oturum yoksa giriş sayfasına yönlendirir. */
export async function requireAdmin() {
  if (!(await isAuthenticated())) redirect('/admin/giris');
}

/** Server action / route handler içinde: oturum yoksa hata fırlatır. */
export async function assertAdmin() {
  if (!(await isAuthenticated())) throw new Error('Oturum süresi doldu. Lütfen yeniden giriş yapın.');
}
