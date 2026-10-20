import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { AnalyticsReady } from '@/components/analytics-ready';
import { SITE_URL } from '@/lib/site-url';
import { allowIndexing } from '@/lib/indexing';
import { photoById } from '@/lib/photography';
import './globals.css';

const serif = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
});

const sans = Manrope({
  variable: '--font-sans',
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tarsus Çömlekçilik | El Yapımı Terracotta & Çömlek Üreticisi',
    template: '%s | Tarsus Çömlekçilik',
  },
  description:
    'Mersin Tarsus\'ta el yapımı terracotta saksı, büyük küp ve çömlek üreticisi. Toptan satış, otel-villa peyzaj projeleri ve ihracat.',
  alternates: { canonical: '/', languages: { 'tr-TR': '/', en: '/en', 'x-default': '/' } },
  openGraph: {
    title: 'Tarsus Çömlekçilik | Toprağın Ustalığı',
    description: '1927’den günümüze el yapımı terracotta; toptan, proje ve ihracat için Tarsus’tan dünyaya.',
    url: '/', siteName: 'Tarsus Çömlekçilik', locale: 'tr_TR', type: 'website',
    images: [{ url: photoById('gardenJars').src, width: 1600, height: 1200, alt: photoById('gardenJars').alt }],
  },
  twitter: {
    card: 'summary_large_image', title: 'Tarsus Çömlekçilik | Toprağın Ustalığı',
    description: 'El yapımı terracotta; toptan, proje ve ihracat için Tarsus’tan dünyaya.', images: [photoById('gardenJars').src],
  },
  robots: { index: allowIndexing, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${serif.variable} ${sans.variable}`}>
        <a className="skip-link" href="#main-content">İçeriğe geç</a>
        <AnalyticsReady />
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
