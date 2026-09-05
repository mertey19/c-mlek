'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import Link from 'next/link';
import { usePerformanceTier } from '@/hooks/use-performance-tier';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { ClayParticles } from './ClayParticles';
import { PotteryWheel } from './PotteryWheel';
import { SceneLighting } from './SceneLighting';
import { TerracottaPot } from './TerracottaPot';
import { WebGLFallback } from './WebGLFallback';

const STEPS = [
  { id: '01', title: 'Toprağın hazırlanması', body: 'Şekillendirmeye uygun kıvam ve homojenlik.' },
  { id: '02', title: 'Ustanın şekillendirmesi', body: 'Formun el ve araçlarla katman katman kurulması.' },
  { id: '03', title: 'Kurutma', body: 'Yüzey ve gövdenin kontrollü biçimde dinlendirilmesi.' },
  { id: '04', title: 'Fırınlama', body: 'Toprağın kalıcı terracotta yapısına ulaşması.' },
  { id: '05', title: 'Kalite kontrol', body: 'Form, yüzey ve kullanım uygunluğunun incelenmesi.' },
  { id: '06', title: 'Paketleme & sevkiyat', body: 'Sipariş kapsamına göre koruma ve taşıma planı.' },
] as const;

function ProductionScene({ stage, reduced, tier }: { stage: number; reduced: boolean; tier: 'high' | 'medium' | 'low' }) {
  const formProgress = useMemo(() => {
    if (stage <= 0) return 0.12;
    if (stage === 1) return 0.55;
    return 1;
  }, [stage]);

  const fire = stage === 3 ? 1 : stage > 3 ? 0.15 : 0;
  const autoRotate = stage === 4 ? 0.55 : stage >= 5 ? 0.08 : stage === 1 ? 0.9 : 0.2;
  const segments = tier === 'low' ? 28 : 44;

  return (
    <>
      <color attach="background" args={['#1a1410']} />
      <SceneLighting warm={stage >= 3 ? 1.1 : 0.85} fire={fire} />
      <group position={[0, -0.2, 0]}>
        {stage <= 1 && <PotteryWheel speed={stage === 1 ? 1.2 : 0.3} />}
        <TerracottaPot formProgress={formProgress} stage={stage} autoRotate={reduced ? 0 : autoRotate} segments={segments} />
      </group>
      <ClayParticles count={tier === 'high' ? 24 : 0} enabled={tier === 'high' && !reduced} />
      {tier !== 'low' && <ContactShadows position={[0, -0.42, 0]} opacity={0.4} scale={7} blur={2.2} far={3.5} />}
    </>
  );
}

function ProductionCanvas({ stage }: { stage: number }) {
  const reduced = useReducedMotion();
  const { tier, visible, dpr } = usePerformanceTier();

  return (
    <Canvas
      className="production-canvas"
      dpr={dpr}
      camera={{ position: [1.8, 1.4, 3.2], fov: 36 }}
      frameloop={visible ? 'always' : 'never'}
      gl={{ antialias: tier !== 'low', alpha: true }}
      shadows={tier !== 'low'}
      aria-hidden
    >
      <Suspense fallback={null}>
        <ProductionScene stage={stage} reduced={reduced} tier={tier} />
      </Suspense>
    </Canvas>
  );
}

const LazyProductionCanvas = dynamic(() => Promise.resolve(ProductionCanvas), { ssr: false });

export function ProductionExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const [webgl, setWebgl] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      const ok = !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
      queueMicrotask(() => setWebgl(ok));
    } catch {
      queueMicrotask(() => setWebgl(false));
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight;
      const start = view * 0.15;
      const end = Math.max(1, rect.height - view * 0.4);
      const raw = (-rect.top + start) / end;
      const p = Math.min(1, Math.max(0, raw));
      setStage(Math.min(5, Math.floor(p * 6)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="production-experience" ref={sectionRef} aria-labelledby="process-title">
      <div className="shell production-experience__intro">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Atölyeden sevkiyata</p>
            <h2 id="process-title">Altı adımda üretim</h2>
          </div>
          <p>Büyük bir form, aceleye gelmeyen bir ritim ister. Her adım bir sonrakinin dayanıklılığını ve karakterini belirler.</p>
        </div>
      </div>

      <div className="shell production-experience__layout">
        <div className="production-experience__stage" aria-hidden={reduced || undefined}>
          {webgl && !reduced ? (
            <LazyProductionCanvas stage={stage} />
          ) : (
            <WebGLFallback src="/images/workshop.webp" alt="Terracotta üretim süreci" />
          )}
        </div>

        <ol className="production-experience__steps">
          {STEPS.map((step, index) => (
            <li key={step.id} className={index === stage ? 'is-active' : ''} aria-current={index === stage ? 'step' : undefined}>
              <span>{step.id}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="shell section-end-link">
        <Link className="text-link text-link--dark" href="/atolye">
          Atölye sürecini inceleyin <span>↗</span>
        </Link>
      </div>
    </section>
  );
}
