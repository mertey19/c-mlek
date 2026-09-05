'use client';

import dynamic from 'next/dynamic';
import { Component, type ReactNode, useEffect, useState } from 'react';
import { WebGLFallback } from './WebGLFallback';

const PotteryScene = dynamic(() => import('./PotteryScene').then((m) => m.PotteryScene), {
  ssr: false,
  loading: () => null,
});

class CanvasErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { error: boolean }> {
  state = { error: false };

  static getDerivedStateFromError() {
    return { error: true };
  }

  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export function PotteryHero() {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!supportsWebGL()) return;
    queueMicrotask(() => {
      setEnabled(true);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.hero') as HTMLElement | null;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const total = Math.max(1, hero.offsetHeight);
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setScrollProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="hero__canvas-wrap" aria-hidden="true">
      <WebGLFallback className={`hero__fallback ${ready && enabled ? 'hero__fallback--hidden' : ''}`} priority />
      {enabled && (
        <CanvasErrorBoundary fallback={<WebGLFallback priority />}>
          <div className={`hero__canvas ${ready ? 'hero__canvas--ready' : ''}`}>
            <PotteryScene scrollProgress={scrollProgress} />
          </div>
        </CanvasErrorBoundary>
      )}
    </div>
  );
}
