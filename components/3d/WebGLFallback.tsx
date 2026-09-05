'use client';

import Image from 'next/image';

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
};

export function WebGLFallback({
  src = '/images/hero-terracotta.webp',
  alt = 'El yapımı terracotta küp — temsili görsel',
  className = '',
  priority = false,
}: Props) {
  return (
    <div className={`webgl-fallback ${className}`.trim()} aria-hidden="true">
      <Image src={src} alt={alt} fill sizes="100vw" priority={priority} className="webgl-fallback__image" />
    </div>
  );
}
