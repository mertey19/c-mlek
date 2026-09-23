'use client';

import { useState } from 'react';
import { deleteProductAction, saveProductAction } from '@/app/admin/actions';
import { slugify, type Product } from '@/lib/content-types';
import { ImagePicker, LinesField, SaveBar, Section, TextArea, TextField, useSaver } from './ui';

type Props = { initial: Product; isNew: boolean; images: string[]; categories: string[]; readOnly: boolean; isOnlyProduct: boolean };

export function ProductEditor({ initial, isNew, images: initialImages, categories, readOnly, isOnlyProduct }: Props) {
  const [product, setProduct] = useState(initial);
  const [images, setImages] = useState(initialImages);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const saver = useSaver();

  const set = <K extends keyof Product>(key: K, value: Product[K]) => {
    setProduct((current) => {
      const next = { ...current, [key]: value };
      if (key === 'name' && !slugTouched) next.slug = slugify(String(value));
      return next;
    });
    saver.markDirty();
  };
  const setImage = (index: number, value: string) =>
    set('images', value ? product.images.map((image, i) => (i === index ? value : image)) : product.images.filter((_, i) => i !== index));

  return (
    <>
      <Section
        title="Ürün"
        description={
          <>
            Ürün sayfası: <code>/urunler/{product.slug || '…'}</code>
            {!isNew && product.slug !== initial.slug && ' — adres değişirse eski bağlantılar 404 verir.'}
          </>
        }
      >
        <TextField wide label="Ürün adı" required value={product.name} onChange={(value) => set('name', value)} />
        <TextField
          label="Adres (slug)"
          required
          value={product.slug}
          hint="Küçük harf, rakam ve tire. Addan otomatik üretilir."
          onChange={(value) => {
            setSlugTouched(true);
            set('slug', slugify(value));
          }}
        />
        <label className="admin-field">
          <span>Kategori *</span>
          <input list="admin-category-list" value={product.category} onChange={(event) => set('category', event.target.value)} />
          <datalist id="admin-category-list">
            {categories.map((name) => <option key={name} value={name} />)}
          </datalist>
        </label>
        <TextArea label="Kısa açıklama" required rows={2} recommended={160} value={product.shortDescription} hint="Ürün sayfasının giriş cümlesi." onChange={(value) => set('shortDescription', value)} />
        <TextArea label="Açıklama" required rows={5} value={product.description} onChange={(value) => set('description', value)} />
        <label className="admin-check admin-field--wide">
          <input type="checkbox" checked={Boolean(product.featured)} onChange={(event) => set('featured', event.target.checked || undefined)} />
          <span>Ana sayfada “Öne çıkan form” olarak göster (yalnızca bir ürün seçilebilir)</span>
        </label>
      </Section>

      <Section title="Teknik bilgiler" description="Boş bırakılan alanlar ürün sayfasında varsayılan metinle gösterilir.">
        <TextField label="Malzeme" value={product.material ?? ''} placeholder="Pişmiş toprak / terracotta" onChange={(value) => set('material', value || undefined)} />
        <TextField label="Renk" value={product.color ?? ''} placeholder="Doğal terracotta tonları" onChange={(value) => set('color', value || undefined)} />
        <TextField wide label="Ölçüler" value={product.dimensions ?? ''} placeholder="Üretim ve mevcut seçenekler için teyit edilir" onChange={(value) => set('dimensions', value || undefined)} />
        <LinesField label="Kullanım alanları" value={product.applications ?? []} onChange={(value) => set('applications', value.length ? value : undefined)} />
      </Section>

      <section className="admin-card">
        <header>
          <h2>Görseller</h2>
          <p className="admin-muted">İlk görsel ürün sayfasının kapağıdır; ikinci görsel (varsa) ana sayfadaki öne çıkan alanda kullanılır.</p>
        </header>
        <div className="admin-grid">
          {product.images.map((image, index) => (
            <ImagePicker
              key={index}
              label={`Görsel ${index + 1}${index === 0 ? ' (kapak)' : ''}`}
              value={image}
              images={images}
              canUpload={!readOnly}
              onUploaded={(path) => setImages((list) => [...list, path].sort())}
              onChange={(value) => setImage(index, value)}
            />
          ))}
        </div>
        <button type="button" className="admin-button" onClick={() => set('images', [...product.images, ''])}>+ Görsel ekle</button>
      </section>

      <Section title="Arama motoru (SEO)" description="Boş bırakılırsa ürün adı ve kısa açıklama kullanılır.">
        <TextField wide label="SEO başlığı" recommended={60} value={product.seoTitle ?? ''} onChange={(value) => set('seoTitle', value || undefined)} />
        <TextArea label="SEO açıklaması" rows={2} recommended={160} value={product.seoDescription ?? ''} onChange={(value) => set('seoDescription', value || undefined)} />
      </Section>

      {!readOnly && (
        <SaveBar
          {...saver}
          label={isNew ? 'Ürünü yayınla' : 'Kaydet ve yayınla'}
          onSave={() => saver.run(() => saveProductAction(isNew ? null : initial.slug, { ...product, images: product.images.filter(Boolean) }))}
          extra={
            !isNew &&
            !isOnlyProduct && (
              <button
                type="button"
                className="admin-button admin-button--danger"
                disabled={saver.pending}
                onClick={() => saver.run(() => deleteProductAction(initial.slug), { confirmText: `"${initial.name}" ürünü kalıcı olarak silinsin mi? Siteden bu ürüne verilen linkler 404 verir.` })}
              >
                Ürünü sil
              </button>
            )
          }
        />
      )}
    </>
  );
}
