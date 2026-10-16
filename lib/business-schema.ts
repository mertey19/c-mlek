import { business } from './site-data';
import { districtAreas } from './service-areas';
import { absoluteUrl } from './site-url';

/** One real business identity, never a fabricated branch per service area. */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    '@id': `${absoluteUrl('/')}#organization`,
    name: business.name, alternateName: business.legalName, foundingDate: business.founded,
    url: absoluteUrl('/'), logo: absoluteUrl('/og.png'), image: absoluteUrl('/og.png'),
    telephone: `+${business.phone}`,
    address: { '@type': 'PostalAddress', streetAddress: business.streetAddress, addressLocality: business.locality, addressRegion: business.region, postalCode: business.postalCode, addressCountry: 'TR' },
    sameAs: [business.website, business.instagram, business.youtube, business.googleBusinessUrl, business.googleMapsUrl],
    areaServed: [{ '@type': 'Country', name: 'Türkiye' }, { '@type': 'AdministrativeArea', name: 'Mersin' }, ...districtAreas],
  };
}
