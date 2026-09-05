'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import { usePerformanceTier } from '@/hooks/use-performance-tier';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { SceneLighting } from './SceneLighting';
import { TerracottaPot } from './TerracottaPot';
import { WebGLFallback } from './WebGLFallback';

function ViewerScene({ reduced }: { reduced: boolean }) {
  const { tier } = usePerformanceTier();
  return (
    <>
      <color attach="background" args={['#d9c1a3']} />
      <SceneLighting warm={1} />
      <TerracottaPot formProgress={1} stage={5} autoRotate={reduced ? 0 : 0.18} segments={tier === 'low' ? 32 : 52} />
      {tier !== 'low' && <ContactShadows position={[0, -0.05, 0]} opacity={0.35} scale={6} blur={2} far={3} />}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.85}
        autoRotate={!reduced}
        autoRotateSpeed={0.45}
      />
    </>
  );
}

function ProductViewerCanvas() {
  const reduced = useReducedMotion();
  const { visible, dpr, tier } = usePerformanceTier();

  return (
    <Canvas
      className="product-viewer-canvas"
      dpr={dpr}
      camera={{ position: [2.2, 1.4, 2.8], fov: 35 }}
      frameloop={visible ? 'always' : 'never'}
      gl={{ antialias: tier !== 'low' }}
      aria-label="Büyük terracotta küp 360 derece görüntüleyici"
    >
      <Suspense fallback={null}>
        <ViewerScene reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}

const LazyViewer = dynamic(() => Promise.resolve(ProductViewerCanvas), { ssr: false });

export function ProductViewer3D({ fallbackSrc }: { fallbackSrc: string }) {
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      const ok = !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
      queueMicrotask(() => setEnabled(ok));
    } catch {
      queueMicrotask(() => setEnabled(false));
    }
  }, []);

  if (!enabled || reduced) {
    return (
      <WebGLFallback
        src={fallbackSrc}
        alt="El yapımı büyük terracotta küp — temsili ürün görseli"
        className="product-viewer-fallback"
      />
    );
  }

  return (
    <div className="product-viewer">
      <LazyViewer />
      <p className="product-viewer__hint">360° incelemek için sürükleyin</p>
    </div>
  );
}
