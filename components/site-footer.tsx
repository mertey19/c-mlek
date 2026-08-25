import Link from 'next/link';
import { business, phoneHref, whatsappUrl } from '@/lib/site-data';
import { IconInstagram, IconPhone, IconWhatsApp, IconYouTube } from './icons';
import { TrackedLink } from './tracked-link';

export function SiteFooter({ english = false }: { english?: boolean }) {
  const wa = whatsappUrl('default', undefined, english);

  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div className="site-footer__brand">
          <Link className="brand" href={english ? '/en' : '/'}>
            <span className="brand__mark" aria-hidden="true">
              TÇ
            </span>
            <span>
              <strong>Tarsus Çömlekçilik</strong>
              <small>Özçereciler Toprak Sanatları</small>
            </span>
          </Link>
          <p>
            {english
              ? 'Handmade terracotta for wholesale, hospitality, landscape and architectural projects.'
              : 'Toptan tedarik, otel, villa, peyzaj ve mimari projeler için Tarsus’ta el yapımı terracotta.'}
          </p>
          <p className="footer-location">Tarsus · Mersin · Türkiye</p>
          <div className="footer-social">
            <TrackedLink
              href={wa}
              target="_blank"
              rel="noreferrer"
              eventName="whatsapp_click"
              eventData={{ location: 'footer' }}
              aria-label="WhatsApp"
            >
              <IconWhatsApp />
            </TrackedLink>
            <TrackedLink href={phoneHref()} eventName="phone_click" eventData={{ location: 'footer' }} aria-label={english ? 'Call' : 'Ara'}>
              <IconPhone />
            </TrackedLink>
            <TrackedLink
              href={business.instagram}
              target="_blank"
              rel="noreferrer"
              eventName="instagram_click"
              eventData={{ location: 'footer' }}
              aria-label="Instagram"
            >
              <IconInstagram />
            </TrackedLink>
            <a href={business.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
              <IconYouTube />
            </a>
          </div>
        </div>
        <div>
          <h2>{english ? 'Collections' : 'Ürünler'}</h2>
          <Link href={english ? '/en/products' : '/urunler'}>{english ? 'All products' : 'Tüm ürünler'}</Link>
          <Link href={english ? '/en/products' : '/urunler/buyuk-boy-kupler'}>
            {english ? 'Oversized jars' : 'Büyük boy küpler'}
          </Link>
          <Link href={english ? '/en/projects' : '/otel-villa-peyzaj'}>
            {english ? 'Architectural planters' : 'Mimari saksılar'}
          </Link>
        </div>
        <div>
          <h2>{english ? 'Trade' : 'Kurumsal'}</h2>
          <Link href={english ? '/en/wholesale' : '/toptan-satis'}>{english ? 'Wholesale' : 'Toptan satış'}</Link>
          <Link href={english ? '/en/projects' : '/projeler'}>{english ? 'Projects' : 'Projeler'}</Link>
          <Link href={english ? '/en/export' : '/ihracat'}>{english ? 'Export' : 'İhracat'}</Link>
          <Link href={english ? '/en/about' : '/hakkimizda'}>{english ? 'About' : 'Hakkımızda'}</Link>
        </div>
        <div>
          <h2>{english ? 'Contact' : 'İletişim'}</h2>
          <TrackedLink href={wa} target="_blank" rel="noreferrer" eventName="whatsapp_click" eventData={{ location: 'footer_text' }}>
            WhatsApp {business.phoneDisplay}
          </TrackedLink>
          <TrackedLink href={phoneHref()} eventName="phone_click" eventData={{ location: 'footer_text' }}>
            {english ? 'Call' : 'Ara'} {business.phoneDisplay}
          </TrackedLink>
          <TrackedLink href={business.instagram} target="_blank" rel="noreferrer" eventName="instagram_click">
            Instagram {business.instagramHandle}
          </TrackedLink>
          <a href={business.youtube} target="_blank" rel="noreferrer">
            YouTube {business.youtubeHandle}
          </a>
          {!english && <Link href="/rehber">Terracotta rehberi</Link>}
        </div>
      </div>
      <div className="shell site-footer__legal">
        <span>© {new Date().getFullYear()} Tarsus Çömlekçilik</span>
        <div>
          <Link href="/gizlilik">Gizlilik</Link>
          <Link href="/kvkk">KVKK</Link>
          <Link href="/cerez-politikasi">Çerezler</Link>
        </div>
      </div>
    </footer>
  );
}
