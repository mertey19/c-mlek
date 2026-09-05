import * as THREE from 'three';

export type ProfilePoint = [number, number];

/** Ham kil kütlesi (yan profil, x=yarıçap, y=yükseklik) */
export const CLAY_PROFILE: ProfilePoint[] = [
  [0, 0],
  [0.22, 0.02],
  [0.38, 0.18],
  [0.42, 0.42],
  [0.36, 0.62],
  [0.22, 0.78],
  [0.08, 0.86],
  [0, 0.88],
];

/** Final terracotta küp profili */
export const JAR_PROFILE: ProfilePoint[] = [
  [0, 0],
  [0.18, 0.02],
  [0.42, 0.12],
  [0.58, 0.32],
  [0.64, 0.55],
  [0.58, 0.78],
  [0.42, 0.98],
  [0.3, 1.1],
  [0.26, 1.18],
  [0.3, 1.22],
  [0.28, 1.24],
  [0, 1.24],
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function sampleProfile(profile: ProfilePoint[], t: number): ProfilePoint {
  const clamped = Math.min(1, Math.max(0, t));
  const scaled = clamped * (profile.length - 1);
  const i = Math.floor(scaled);
  const f = scaled - i;
  const a = profile[i];
  const b = profile[Math.min(i + 1, profile.length - 1)];
  return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)];
}

/** progress 0 = kil, 1 = final küp */
export function interpolateProfile(progress: number, samples = 24): ProfilePoint[] {
  const t = Math.min(1, Math.max(0, progress));
  // Ease-out for forming feel
  const eased = 1 - Math.pow(1 - t, 2.2);
  const points: ProfilePoint[] = [];
  for (let i = 0; i <= samples; i += 1) {
    const u = i / samples;
    const clay = sampleProfile(CLAY_PROFILE, u);
    const jar = sampleProfile(JAR_PROFILE, u);
    // Slight handmade irregularity that softens as form settles
    const wobble = (1 - eased) * 0.012 * Math.sin(u * Math.PI * 6 + eased * 4);
    points.push([lerp(clay[0], jar[0], eased) + wobble, lerp(clay[1], jar[1], eased)]);
  }
  return points;
}

export function createLatheGeometry(
  progress: number,
  radialSegments = 48,
  samples = 24,
): THREE.LatheGeometry {
  const profile = interpolateProfile(progress, samples);
  const points = profile.map(([x, y]) => new THREE.Vector2(Math.max(0.001, x), y));
  const geo = new THREE.LatheGeometry(points, radialSegments);
  // Mild vertex irregularity for handmade feel
  const pos = geo.attributes.position;
  const strength = 0.008 * (0.35 + progress * 0.65);
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const n = Math.sin(x * 18 + y * 11) * Math.cos(z * 14 + y * 7);
    const f = 1 + n * strength;
    pos.setXYZ(i, x * f, y, z * f);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  geo.center();
  // Re-anchor base near y=0 after center
  geo.translate(0, geo.boundingBox ? -geo.boundingBox.min.y : 0.62, 0);
  return geo;
}

export const CLAY_COLOR = new THREE.Color('#c4a07a');
export const BISQUE_COLOR = new THREE.Color('#b88968');
export const TERRACOTTA_COLOR = new THREE.Color('#a85f3d');
export const FIRED_COLOR = new THREE.Color('#8f4e32');

export function potColorForStage(stage: number, formProgress: number): THREE.Color {
  // stage: 0 clay prep, 1 forming, 2 drying, 3 firing, 4 qc, 5 packing
  const c = new THREE.Color();
  if (stage <= 1) {
    c.copy(CLAY_COLOR).lerp(BISQUE_COLOR, formProgress);
  } else if (stage === 2) {
    c.copy(BISQUE_COLOR);
  } else if (stage === 3) {
    c.copy(BISQUE_COLOR).lerp(TERRACOTTA_COLOR, 0.85);
  } else {
    c.copy(FIRED_COLOR);
  }
  return c;
}
