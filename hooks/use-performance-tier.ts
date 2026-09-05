'use client';

import { useEffect, useState } from 'react';

export type PerformanceTier = 'high' | 'medium' | 'low';

export function usePerformanceTier() {
  const [tier, setTier] = useState<PerformanceTier>('medium');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 900px)').matches;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const next: PerformanceTier =
      reduced || mobile || cores <= 4 || memory <= 4 ? (mobile ? 'low' : 'medium') : 'high';

    queueMicrotask(() => setTier(next));

    const onVisibility = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return {
    tier,
    visible,
    dpr:
      tier === 'high'
        ? ([1, 1.75] as [number, number])
        : tier === 'medium'
          ? ([1, 1.25] as [number, number])
          : ([1, 1] as [number, number]),
  };
}
