import Image from 'next/image';
import { photoCollection } from '@/lib/photography';

export function PhotographyGallery() {
  const groups = [...new Set(photoCollection.map((photo) => photo.group))];
  return (
    <section className="section shell photography-gallery" aria-labelledby="photography-title">
      <div className="section-heading">
        <p className="eyebrow">30 kare · Ürün, atölye ve yerleşim</p>
        <h2 id="photography-title">Koleksiyona yakından bakın</h2>
        <p>Dokuyu ve formu tam boy görmek için bir görseli açın. Mekân ve stil görselleri müşteri referansı olarak sunulmaz.</p>
      </div>
      <nav className="photography-gallery__nav" aria-label="Görsel grupları">
        {groups.map((group, index) => <a key={group} href={`#photo-group-${index}`}>{group}</a>)}
      </nav>
      {groups.map((group, index) => (
        <div className="photography-gallery__group" id={`photo-group-${index}`} key={group}>
          <h3>{group}</h3>
          <div className="photography-gallery__grid">
            {photoCollection.filter((photo) => photo.group === group).map((photo) => (
              <figure key={photo.id}>
                <a href={photo.src} target="_blank" rel="noreferrer" aria-label={`${photo.alt} — tam boy görseli yeni sekmede aç`}>
                  <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} quality={90} sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1000px) 45vw, 30vw" loading="lazy" />
                  <span className="photography-gallery__expand" aria-hidden="true">↗</span>
                </a>
                <figcaption>{photo.alt}{photo.placement && <small>Yerleşim örneği</small>}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
