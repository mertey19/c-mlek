'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
  count?: number;
  enabled?: boolean;
};

function seeded(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function ClayParticles({ count = 28, enabled = true }: Props) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (seeded(i) - 0.5) * 4.5;
      arr[i * 3 + 1] = seeded(i + 17) * 3.2;
      arr[i * 3 + 2] = (seeded(i + 41) - 0.5) * 3.2;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!enabled || !ref.current) return;
    const t = clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i += 1) {
      const y = positions[i * 3 + 1] + Math.sin(t * 0.25 + i) * 0.002;
      pos.setY(i, ((y % 3.2) + 3.2) % 3.2);
    }
    pos.needsUpdate = true;
    ref.current.rotation.y = t * 0.02;
  });

  if (!enabled) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d9c1a3" size={0.028} sizeAttenuation transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}
