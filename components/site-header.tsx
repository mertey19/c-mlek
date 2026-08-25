'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routePairs, whatsappUrl } from '@/lib/site-data';
import { IconWhatsApp } from './icons';
import { TrackedLink } from './tracked-link';

const trNav = [
  ['/urunler', 'Ürünler'],
  ['/projeler', 'Projeler'],
  ['/toptan-satis', 'Toptan Satış'],
  ['/ihracat', 'İhracat'],
  ['/hakkimizda', 'Hakkımızda'],
  ['/atolye', 'Atölye'],
  ['/iletisim', 'İletişim'],
] as const;

const enNav = [
  ['/en/products', 'Products'],
  ['/en/projects', 'Projects'],
  ['/en/wholesale', 'Wholesale'],
  ['/en/export', 'Export'],
  ['/en/about', 'About'],
  ['/en/contact', 'Contact'],
] as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const english = pathname.startsWith('/en');
  const nav = english ? enNav : trNav;
  const home = english ? '/en' : '/';
  const switchPath = routePairs[pathname] || (english ? '/' : '/en');
  const wa = whatsappUrl('default', undefined, english);

  return (
    <header className={`site-header ${overlay ? 'site-header--overlay' : 'site-header--solid'}`}>
      <div className="site-header__inner shell">
        <Link
          className="brand"
          href={home}
          aria-label={english ? 'Tarsus Pottery home' : 'Tarsus Çömlekçilik ana sayfa'}
        >
          <span className="brand__mark" aria-hidden="true">
            TÇ
          </span>
          <span>
            <strong>Tarsus Çömlekçilik</strong>
            <small>Özçereciler Toprak Sanatları</small>
          </span>
        </Link>

        <nav className="primary-nav" aria-label={english ? 'Main navigation' : 'Ana menü'}>
          {nav.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <TrackedLink
          className="language-switch"
          href={switchPath}
          eventName="language_switch"
          eventData={{ language: english ? 'tr' : 'en' }}
        >
          {english ? 'TR' : 'EN'}
        </TrackedLink>

        <TrackedLink
          className="header-cta header-cta--whatsapp"
          href={wa}
          target="_blank"
          rel="noreferrer"
          eventName="whatsapp_click"
          eventData={{ location: 'header' }}
        >
          <IconWhatsApp />
          WhatsApp
        </TrackedLink>

        <details className="mobile-menu">
          <summary aria-label={english ? 'Open menu' : 'Menüyü aç'}>
            {english ? 'Menu' : 'Menü'}
          </summary>
          <div className="mobile-menu__panel">
            <nav aria-label={english ? 'Mobile navigation' : 'Mobil menü'}>
              {nav.map(([href, label]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
              <TrackedLink
                href={switchPath}
                eventName="language_switch"
                eventData={{ language: english ? 'tr' : 'en' }}
              >
                {english ? 'Türkçe' : 'English'}
              </TrackedLink>
            </nav>
            <TrackedLink
              className="button button--whatsapp"
              href={wa}
              target="_blank"
              rel="noreferrer"
              eventName="whatsapp_click"
              eventData={{ location: 'mobile_menu' }}
            >
              <IconWhatsApp />
              {english ? 'Chat on WhatsApp' : 'WhatsApp’tan yaz'}
            </TrackedLink>
          </div>
        </details>
      </div>
    </header>
  );
}
