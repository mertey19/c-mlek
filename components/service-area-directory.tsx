import Link from 'next/link';
import { districtPath, mersinDistricts } from '@/lib/service-areas';

export function ServiceAreaDirectory({ compact = false }: { compact?: boolean }) {
  return <section className={`service-area-directory shell ${compact ? 'service-area-directory--compact' : ''}`} aria-labelledby="service-areas-title">
    <div className="section-heading section-heading--split">
      <div><p className="eyebrow">Tarsus’tan Mersin’e</p><h2 id="service-areas-title">İlçenize göre tedarik bilgisi</h2></div>
      <p>Tek atölye, 13 ilçe için teklif olanağı. Ürün seçimi ve teslimat hazırlığını ilçeniz üzerinden inceleyin. Sevkiyat koşulları siparişe göre teyit edilir.</p>
    </div>
    <ul className="service-area-grid">
      {mersinDistricts.map(district => <li key={district.slug}><Link href={districtPath(district.slug)}>
        <strong>{district.name}<span aria-hidden="true">↗</span></strong>
        {!compact && <span>{district.focus}</span>}
      </Link></li>)}
    </ul>
    {compact && <div className="section-end-link"><Link className="text-link text-link--dark" href="/mersin">Mersin tedarik ve teslimat rehberi <span>↗</span></Link></div>}
  </section>;
}
