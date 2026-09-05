'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export function ParallaxImage({ src, alt, sizes = '100vw', className = '', priority = false }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      const el = wrap.current;
      const target = img.current;
      if (!el || !target) return;
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const p = (rect.top + rect.height / 2 - view / 2) / view;
      target.style.transform = `translate3d(0, ${p * -28}px, 0) scale(1.05)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  return (
    <div ref={wrap} className={`parallax-image ${className}`.trim()}>
      <div ref={img} className="parallax-image__inner">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}
