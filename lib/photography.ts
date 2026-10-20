import photography from '@/content/photography.json';

export const PHOTOGRAPHY_UPDATED = '2026-10-20';
export const photoCollection = photography.map((photo) => ({
  ...photo,
  src: `/images/photography-2026-10/${photo.file}.webp`,
}));

export function photoById(id: string) {
  const photo = photoCollection.find((item) => item.id === id);
  if (!photo) throw new Error(`Unknown photograph: ${id}`);
  return photo;
}

export function photoForSrc(src: string) {
  return photoCollection.find((photo) => photo.src === src);
}

export function photoCaption(src: string, english = false) {
  return photoForSrc(src)?.placement
    ? english ? 'Placement inspiration — not a verified client reference' : 'Yerleşim örneği — doğrulanmış müşteri referansı değildir'
    : undefined;
}

export function photoAlt(src: string, fallback: string, english = false) {
  const photo = photoForSrc(src);
  return photo ? english ? photo.altEn : photo.alt : fallback;
}

export function pagePhoto(id: string, locale: 'tr' | 'en' = 'tr') {
  const photo = photoById(id);
  return { image: photo.src, imageAlt: locale === 'en' ? photo.altEn : photo.alt };
}
