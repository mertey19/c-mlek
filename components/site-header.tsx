'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from '@/hooks/use-media-query';
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
  ['/blog', 'Blog'],
  ['/iletisim', 'İletişim'],
] as const;

const enNav = [
  ['/en/products', 'Products'],
  ['/en/projects', 'Projects'],
  ['/en/wholesale', 'Wholesale'],
  ['/en/export', 'Export'],
  ['/en/about', 'About'],
  ['/en/blog', 'Blog'],
  ['/en/contact', 'Contact'],
] as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const english = pathname.startsWith('/en');
  const nav = english ? enNav : trNav;
  const home = english ? '/en' : '/';
  const switchPath = routePairs[pathname] || (english ? '/' : '/en');
  const wa = whatsappUrl('default', undefined, english);
  const isDesktop = useMediaQuery('(min-width: 1161px)');
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const mobileMenu =
    mounted && open && !isDesktop
      ? createPortal(
          <>
            <button
              type="button"
              className="mobile-menu-backdrop"
              aria-label={english ? 'Close menu' : 'Menüyü kapat'}
              onClick={() => setOpen(false)}
            />
            <div className="mobile-menu-panel" id={menuId}>
              <nav className="shell" aria-label={english ? 'Mobile navigation' : 'Mobil menü'}>
                {nav.map(([href, label]) => (
                  <Link key={href} href={href} onClick={() => setOpen(false)}>
                    {label}
                  </Link>
                ))}
                <TrackedLink
                  href={switchPath}
                  eventName="language_switch"
                  eventData={{ language: english ? 'tr' : 'en' }}
                  onClick={() => setOpen(false)}
                >
                  {english ? 'Türkçe' : 'English'}
                </TrackedLink>
              </nav>
              <div className="shell mobile-menu-panel__cta">
                <TrackedLink
                  className="button button--whatsapp"
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  eventName="whatsapp_click"
                  eventData={{ location: 'mobile_menu' }}
                  onClick={() => setOpen(false)}
                >
                  <IconWhatsApp />
                  {english ? 'Chat on WhatsApp' : 'WhatsApp’tan yaz'}
                </TrackedLink>
              </div>
            </div>
          </>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        className={`site-header ${overlay ? 'site-header--overlay' : 'site-header--solid'} ${open ? 'site-header--menu-open' : ''}`}
      >
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

          {isDesktop ? (
            <>
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
            </>
          ) : (
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={
                open ? (english ? 'Close menu' : 'Menüyü kapat') : english ? 'Open menu' : 'Menüyü aç'
              }
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (english ? 'Close' : 'Kapat') : english ? 'Menu' : 'Menü'}
            </button>
          )}
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
