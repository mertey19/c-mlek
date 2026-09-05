'use client';

import Image from 'next/image';
import { useRef, type MouseEvent } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { TrackedLink } from '@/components/tracked-link';

type ImageCardProps = {
  href: string;
  className?: string;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  eventData?: Record<string, string>;
};

export function TiltCategoryCard({ href, className = '', image, alt, title, subtitle, eventData }: ImageCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || window.matchMedia('(max-width: 900px)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg) translateY(-2px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = '';
  };

  return (
    <div ref={ref} className="tilt-card-wrap" onMouseMove={onMove} onMouseLeave={onLeave}>
      <TrackedLink
        href={href}
        className={`tilt-card category-card ${className}`.trim()}
        eventName="category_view"
        eventData={eventData}
      >
        <Image src={image} alt={alt} fill sizes="(max-width: 700px) 100vw, 40vw" />
        <span>
          <strong>{title}</strong>
          <small>{subtitle}</small>
        </span>
      </TrackedLink>
    </div>
  );
}
