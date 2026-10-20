import { getImageProps } from 'next/image';
import { photoById } from '@/lib/photography';

/** Browser selects one composition; no desktop preload wasting bytes on mobile. */
export function HeroPhotograph() {
  const wide = photoById('gardenJars');
  const portrait = photoById('gardenTrio');
  const shared = { alt: 'Açık alanda kabartma desenli büyük doğal terracotta küpler', quality: 90, sizes: '100vw', loading: 'eager' as const, fetchPriority: 'high' as const };
  const { props: mobile } = getImageProps({ ...shared, src: portrait.src, width: portrait.width, height: portrait.height });
  const { props: desktop } = getImageProps({ ...shared, src: wide.src, width: wide.width, height: wide.height });
  return (
    <picture>
      <source media="(max-width: 700px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
      {/* getImageProps provides Next's optimized responsive sources for art direction. */}
      <img {...desktop} alt={shared.alt} className="hero__image" />
    </picture>
  );
}
