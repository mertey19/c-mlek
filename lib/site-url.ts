export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tarsuscomlekcilik.com').replace(/\/$/, '');

export function absoluteUrl(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalized, `${SITE_URL}/`).toString();
}
