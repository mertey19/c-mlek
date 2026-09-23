'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/admin', label: 'Genel bakış', exact: true },
  { href: '/admin/talepler', label: 'Teklif talepleri' },
  { href: '/admin/blog', label: 'Blog yazıları' },
  { href: '/admin/urunler', label: 'Ürünler' },
  { href: '/admin/kategoriler', label: 'Kategoriler' },
  { href: '/admin/firma', label: 'Firma & iletişim' },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="admin-nav" aria-label="Panel menüsü">
      {items.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={active ? 'is-active' : undefined} aria-current={active ? 'page' : undefined}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
