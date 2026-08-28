import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { AnalyticsReady } from '@/components/analytics-ready';
import { SITE_URL } from '@/lib/site-url';
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
  keywords: [
    'Tarsus çömlekçilik',
    'Mersin çömlekçi',
    'Mersin terracotta',
    'Tarsus çömlek atölyesi',
    'terracotta saksı',
    'toptan çömlek',
    'el yapımı terracotta Mersin',
    'terracotta manufacturer Turkey',
  ],
  alternates: { canonical: '/', languages: { 'tr-TR': '/', en: '/en', 'x-default': '/' } },
  openGraph: {
    title: 'Tarsus Çömlekçilik | Toprağın Ustalığı',
    description: '1927’den günümüze el yapımı terracotta; toptan, proje ve ihracat için Tarsus’tan dünyaya.',
    url: '/', siteName: 'Tarsus Çömlekçilik', locale: 'tr_TR', type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Tarsus Çömlekçilik — Toprağın Ustalığı' }],
  },
  twitter: {
    card: 'summary_large_image', title: 'Tarsus Çömlekçilik | Toprağın Ustalığı',
    description: 'El yapımı terracotta; toptan, proje ve ihracat için Tarsus’tan dünyaya.', images: ['/og.png'],
  },
  robots: { index: true, follow: true },
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
