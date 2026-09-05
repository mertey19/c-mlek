'use client';

export function SceneLighting({ warm = 1, fire = 0 }: { warm?: number; fire?: number }) {
  const keyIntensity = 1.35 * warm + fire * 0.35;
  const fillIntensity = 0.45 * warm;
  const rimIntensity = 0.55 + fire * 0.25;

  return (
    <>
      <ambientLight intensity={0.28 + warm * 0.08} color="#f3e6d4" />
      <directionalLight
        castShadow
        position={[3.2, 5.5, 2.4]}
        intensity={keyIntensity}
        color="#ffd7b0"
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-3.5, 2.2, -1.5]} intensity={fillIntensity} color="#c9b29a" />
      <directionalLight position={[0.5, 2.8, -4]} intensity={rimIntensity} color="#e8c4a0" />
      <pointLight position={[0, 1.2, 1.8]} intensity={0.25 + fire * 0.4} color="#d97a45" distance={8} />
    </>
  );
}
