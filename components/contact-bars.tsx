import Link from 'next/link';
import { phoneHref, whatsappUrl } from '@/lib/site-data';
import { IconPhone, IconQuote, IconWhatsApp } from './icons';
import { TrackedLink } from './tracked-link';

export function ContactBars({ english = false }: { english?: boolean }) {
  const quote = english ? '/en/contact#quote' : '/iletisim#teklif';
  const wa = whatsappUrl('default', undefined, english);

  return (
    <>
      <TrackedLink
        className="floating-whatsapp"
        href={wa}
        target="_blank"
        rel="noreferrer"
        eventName="whatsapp_click"
        eventData={{ location: 'float' }}
        aria-label="WhatsApp"
      >
        <IconWhatsApp />
      </TrackedLink>

      <nav className="mobile-cta-bar" aria-label={english ? 'Quick contact' : 'Hızlı iletişim'}>
        <TrackedLink
          href={phoneHref()}
          eventName="phone_click"
          eventData={{ location: 'sticky_bar' }}
        >
          <IconPhone />
          <span>{english ? 'Call' : 'Ara'}</span>
        </TrackedLink>

        <TrackedLink
          className="mobile-cta-bar__whatsapp"
          href={wa}
          target="_blank"
          rel="noreferrer"
          eventName="whatsapp_click"
          eventData={{ location: 'sticky_bar' }}
        >
          <IconWhatsApp />
          <span>WhatsApp</span>
        </TrackedLink>

        <Link className="mobile-cta-bar__primary" href={quote}>
          <IconQuote />
          <span>{english ? 'Quote' : 'Teklif'}</span>
        </Link>
      </nav>
    </>
  );
}
