/** Keep Vercel preview deployments out of search; local production builds remain testable. */
export const allowIndexing = process.env.NODE_ENV === 'production'
  && process.env.VERCEL_ENV !== 'preview'
  && process.env.VERCEL_ENV !== 'development';
