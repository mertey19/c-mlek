'use client';

import Link from 'next/link';
import type { ComponentProps, MouseEvent } from 'react';

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

type Props = ComponentProps<typeof Link> & { eventName?: string; eventData?: Record<string, unknown> };

export function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export function TrackedLink({ eventName, eventData, onClick, ...props }: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (eventName) track(eventName, eventData);
    onClick?.(event);
  }
  return <Link {...props} onClick={handleClick} />;
}
