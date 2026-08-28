const PRODUCTION_SITE_URL = 'https://www.tarsuscomlekcilik.com';

function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const fallback = PRODUCTION_SITE_URL;

  if (!configured) return fallback;

  const isLocal =
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(configured) || configured.includes('localhost');

  if (process.env.NODE_ENV === 'production' && isLocal) {
    return fallback;
  }

  return configured.replace(/\/$/, '');
}

export const SITE_URL = resolveSiteUrl();

export function absoluteUrl(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalized, `${SITE_URL}/`).toString();
}
