'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
  speed?: number;
};

export function PotteryWheel({ speed = 1 }: Props) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * speed;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.95, 1.05, 0.12, 48]} />
        <meshStandardMaterial color="#3a2a22" roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.42, 24]} />
        <meshStandardMaterial color="#2a1f1a" roughness={0.9} metalness={0.08} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <circleGeometry args={[1.6, 48]} />
        <meshStandardMaterial color="#1c1612" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}
