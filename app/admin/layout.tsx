import type { Metadata } from 'next';
import './admin.css';

// Oturum çerezine ve canlı içeriğe bağlı: panel asla build sırasında önceden üretilmemeli.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { default: 'Yönetim Paneli', template: '%s | Yönetim Paneli' },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="admin">{children}</div>;
}
