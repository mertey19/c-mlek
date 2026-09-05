'use client';

import Link from 'next/link';

const TIMELINE = [
  { year: '1927', label: 'Köken' },
  { year: '2. Kuşak', label: 'Ustalık' },
  { year: '3. Kuşak', label: 'Atölye' },
  { year: 'Bugün', label: 'Proje & ihracat' },
] as const;

export function HeritageTimeline() {
  return (
    <ol className="heritage-timeline" aria-label="Kuşaklar boyunca üretim">
      {TIMELINE.map((item) => (
        <li key={item.year}>
          <strong>{item.year}</strong>
          <span>{item.label}</span>
        </li>
      ))}
    </ol>
  );
}

export function HeritageLink() {
  return (
    <Link className="text-link text-link--dark" href="/hakkimizda">
      Hikâyemizi okuyun <span>↗</span>
    </Link>
  );
}
