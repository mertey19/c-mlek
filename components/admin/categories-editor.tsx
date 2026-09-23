'use client';

import { useRef, useState } from 'react';
import { saveCategoriesAction } from '@/app/admin/actions';
import { slugify, type Category } from '@/lib/content-types';
import { ImagePicker, SaveBar, TextField, useSaver } from './ui';

export function CategoriesEditor({ initial, images: initialImages, readOnly }: { initial: Category[]; images: string[]; readOnly: boolean }) {
  const [list, setList] = useState(initial);
  const [images, setImages] = useState(initialImages);
  const [keys, setKeys] = useState(() => initial.map((category) => category.slug));
  const counter = useRef(0);
  const saver = useSaver();
  const originalSlugs = new Set(initial.map((category) => category.slug));

  const change = (next: Category[], nextKeys = keys) => {
    setList(next);
    setKeys(nextKeys);
    saver.markDirty();
  };
  const update = (index: number, patch: Partial<Category>) => change(list.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= list.length) return;
    const swap = <T,>(items: T[]) => {
      const copy = [...items];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    };
    change(swap(list), swap(keys));
  };
  const remove = (index: number) => {
    if (!window.confirm(`"${list[index].name}" kategorisi silinsin mi? /urunler/${list[index].slug} sayfası kaldırılır.`)) return;
    change(list.filter((_, i) => i !== index), keys.filter((_, i) => i !== index));
  };
  const add = () => change([...list, { slug: '', name: '', en: '', image: '/images/collection.webp' }], [...keys, `new-${counter.current++}`]);

  return (
    <>
      <p className="admin-hint">
        Sıralama sitede aynen kullanılır: ana sayfada ilk 6 kategori, “Ürünler” sayfasında tümü gösterilir. Her kategori için <code>/urunler/&lt;adres&gt;</code> sayfası oluşturulur.
      </p>
      <div className="admin-category-list">
        {list.map((category, index) => (
          <fieldset key={keys[index]} className="admin-block">
            <legend>
              {index + 1}. {category.name || 'Yeni kategori'}
              {index < 6 && <span className="admin-badge admin-badge--accent">Ana sayfada</span>}
              <span className="admin-block__tools">
                <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Yukarı taşı">↑</button>
                <button type="button" onClick={() => move(index, 1)} disabled={index === list.length - 1} aria-label="Aşağı taşı">↓</button>
                <button type="button" onClick={() => remove(index)} aria-label="Kategoriyi sil">Sil</button>
              </span>
            </legend>
            <div className="admin-grid">
              <TextField
                label="Türkçe ad"
                required
                value={category.name}
                onChange={(name) => update(index, originalSlugs.has(category.slug) ? { name } : { name, slug: slugify(name) })}
              />
              <TextField label="İngilizce ad" required value={category.en} onChange={(en) => update(index, { en })} />
              <TextField
                wide
                label="Adres (slug)"
                required
                value={category.slug}
                hint={originalSlugs.has(category.slug) ? 'Mevcut sayfanın adresini değiştirmek eski bağlantıları bozar.' : undefined}
                onChange={(slug) => update(index, { slug: slugify(slug) })}
              />
              <ImagePicker
                label="Görsel"
                value={category.image}
                images={images}
                canUpload={!readOnly}
                onUploaded={(path) => setImages((current) => [...current, path].sort())}
                onChange={(image) => update(index, { image })}
              />
            </div>
          </fieldset>
        ))}
      </div>
      {!readOnly && (
        <>
          <button type="button" className="admin-button" onClick={add}>+ Kategori ekle</button>
          <SaveBar {...saver} onSave={() => saver.run(() => saveCategoriesAction(list))} />
        </>
      )}
    </>
  );
}
