'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  createLatheGeometry,
  potColorForStage,
  TERRACOTTA_COLOR,
} from '@/lib/pottery-geometry';

type Props = {
  formProgress: number;
  stage?: number;
  autoRotate?: number;
  segments?: number;
  interactive?: boolean;
};

export function TerracottaPot({
  formProgress,
  stage = 5,
  autoRotate = 0.15,
  segments = 48,
  interactive = false,
}: Props) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const drag = useRef({ active: false, lastX: 0, velocity: 0 });

  const geometry = useMemo(
    () => createLatheGeometry(formProgress, segments, 22),
    [formProgress, segments],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    if (!drag.current.active) {
      mesh.current.rotation.y += delta * autoRotate + drag.current.velocity;
      drag.current.velocity *= 0.92;
    }
    if (material.current) {
      const target = stage >= 0 ? potColorForStage(stage, formProgress) : TERRACOTTA_COLOR;
      material.current.color.lerp(target, 0.08);
      material.current.roughness = stage >= 3 ? 0.78 : 0.92;
    }
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      castShadow
      receiveShadow
      position={[0, 0.12, 0]}
      scale={1.15}
      onPointerDown={
        interactive
          ? (e) => {
              e.stopPropagation();
              drag.current.active = true;
              drag.current.lastX = e.clientX;
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            }
          : undefined
      }
      onPointerUp={
        interactive
          ? () => {
              drag.current.active = false;
            }
          : undefined
      }
      onPointerMove={
        interactive
          ? (e) => {
              if (!drag.current.active || !mesh.current) return;
              const dx = e.clientX - drag.current.lastX;
              drag.current.lastX = e.clientX;
              mesh.current.rotation.y += dx * 0.01;
              drag.current.velocity = dx * 0.002;
            }
          : undefined
      }
    >
      <meshStandardMaterial
        ref={material}
        color={TERRACOTTA_COLOR}
        roughness={0.82}
        metalness={0.02}
      />
    </mesh>
  );
}
