import { business } from './site-data';
import { districtAreas } from './service-areas';
import { absoluteUrl } from './site-url';
import { photoById } from './photography';

/** One real business identity, never a fabricated branch per service area. */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    '@id': `${absoluteUrl('/')}#organization`,
    name: business.name, alternateName: business.legalName, foundingDate: business.founded,
    url: absoluteUrl('/'), logo: absoluteUrl('/icon-512.png'), image: absoluteUrl(photoById('gardenJars').src),
    telephone: `+${business.phone}`,
    address: { '@type': 'PostalAddress', streetAddress: business.streetAddress, addressLocality: business.locality, addressRegion: business.region, postalCode: business.postalCode, addressCountry: 'TR' },
    sameAs: [business.website, business.instagram, business.youtube, business.googleBusinessUrl, business.googleMapsUrl],
    areaServed: [{ '@type': 'Country', name: 'Türkiye' }, { '@type': 'AdministrativeArea', name: 'Mersin' }, ...districtAreas],
  };
}
