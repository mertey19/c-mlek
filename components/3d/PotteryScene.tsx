'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformanceTier } from '@/hooks/use-performance-tier';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { ClayParticles } from './ClayParticles';
import { PotteryWheel } from './PotteryWheel';
import { SceneLighting } from './SceneLighting';
import { TerracottaPot } from './TerracottaPot';

function CameraRig({ scrollProgress, reduced }: { scrollProgress: number; reduced: boolean }) {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);

  useFrame(() => {
    const p = Math.min(1, Math.max(0, scrollProgress));
    const baseX = 0.35 + p * 0.55;
    const baseY = 1.55 - p * 0.15;
    const baseZ = 3.4 - p * 0.55;
    const mx = reduced ? 0 : pointer.current.x * 0.12;
    const my = reduced ? 0 : pointer.current.y * 0.06;
    camera.position.lerp(new THREE.Vector3(baseX + mx, baseY - my, baseZ), 0.06);
    camera.lookAt(0.15 + p * 0.4, 0.85, 0);
  });

  return null;
}

function FormingController({
  reduced,
  onProgress,
}: {
  reduced: boolean;
  onProgress: (value: number) => void;
}) {
  const start = useRef<number | null>(null);
  const lastStep = useRef(-1);

  useFrame(({ clock }) => {
    if (reduced) {
      if (lastStep.current !== 20) {
        lastStep.current = 20;
        onProgress(1);
      }
      return;
    }
    if (start.current === null) start.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - start.current;
    const duration = 3.2;
    const t = Math.min(1, elapsed / duration);
    const eased = t * t * (3 - 2 * t);
    const step = Math.round(eased * 20);
    if (step !== lastStep.current) {
      lastStep.current = step;
      onProgress(step / 20);
    }
  });

  return null;
}

type SceneProps = {
  scrollProgress: number;
  reduced: boolean;
  tier: 'high' | 'medium' | 'low';
};

function PotterySceneInner({ scrollProgress, reduced, tier }: SceneProps) {
  const [formProgress, setFormProgress] = useState(reduced ? 1 : 0);
  const wheelSpeed = useMemo(() => {
    if (reduced) return 0.08;
    return formProgress < 0.95 ? 1.6 - formProgress * 1.1 : 0.12;
  }, [formProgress, reduced]);

  const segments = tier === 'high' ? 56 : tier === 'medium' ? 40 : 28;
  const particles = tier === 'high' ? 36 : tier === 'medium' ? 18 : 0;

  return (
    <>
      <color attach="background" args={['#16110e']} />
      <fog attach="fog" args={['#16110e', 6, 14]} />
      <SceneLighting warm={0.9 + formProgress * 0.2} fire={0} />
      <FormingController reduced={reduced} onProgress={setFormProgress} />
      <CameraRig scrollProgress={scrollProgress} reduced={reduced} />
      <group position={[0.55, -0.15, 0]}>
        <PotteryWheel speed={wheelSpeed} />
        <TerracottaPot
          formProgress={formProgress}
          stage={formProgress > 0.85 ? 5 : 1}
          autoRotate={wheelSpeed * 0.35}
          segments={segments}
        />
      </group>
      <ClayParticles count={particles} enabled={tier !== 'low' && !reduced} />
      {tier !== 'low' && (
        <ContactShadows position={[0.55, -0.38, 0]} opacity={0.45} scale={8} blur={2.4} far={4} color="#000000" />
      )}
      {tier === 'high' && <Environment preset="warehouse" environmentIntensity={0.22} />}
    </>
  );
}

export function PotteryScene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const reduced = useReducedMotion();
  const { tier, visible, dpr } = usePerformanceTier();

  return (
    <Canvas
      className="pottery-canvas"
      dpr={dpr}
      gl={{ antialias: tier !== 'low', alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0.4, 1.55, 3.4], fov: 38, near: 0.1, far: 40 }}
      frameloop={visible ? 'always' : 'never'}
      shadows={tier !== 'low'}
      aria-hidden
    >
      <Suspense fallback={null}>
        <PotterySceneInner scrollProgress={scrollProgress} reduced={reduced} tier={tier} />
      </Suspense>
    </Canvas>
  );
}
