'use client';

import { useState } from 'react';
import { deleteBlogPostAction, saveBlogPostAction } from '@/app/admin/actions';
import { slugify, type BlogSeed } from '@/lib/content-types';
import { BlocksEditor, ImagePicker, LinesField, SaveBar, Section, TextArea, TextField, useSaver } from './ui';

function estimateMinutes(post: BlogSeed) {
  const words = [post.intro, ...post.blocks.flatMap((block) => [block.title, block.body, ...(block.bullets ?? [])])]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function BlogEditor({ initial, isNew, images: initialImages, readOnly }: { initial: BlogSeed; isNew: boolean; images: string[]; readOnly: boolean }) {
  const [post, setPost] = useState(initial);
  const [images, setImages] = useState(initialImages);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const saver = useSaver();
  const original = isNew ? null : { locale: initial.locale, slug: initial.slug };
  const publicPath = `${post.locale === 'en' ? '/en/blog' : '/blog'}/${post.slug || '…'}`;

  const set = <K extends keyof BlogSeed>(key: K, value: BlogSeed[K]) => {
    setPost((current) => {
      const next = { ...current, [key]: value };
      if (key === 'title' && !slugTouched) next.slug = slugify(String(value));
      return next;
    });
    saver.markDirty();
  };

  function save() {
    const today = new Date().toISOString().slice(0, 10);
    const payload = isNew ? post : { ...post, updatedAt: today > post.publishedAt ? today : undefined };
    saver.run(() => saveBlogPostAction(original, payload));
  }

  return (
    <>
      <Section
        title="Yazı"
        description={
          <>
            Yayın adresi: <code>{publicPath}</code>
            {!isNew && post.slug !== initial.slug && ' — adres değişirse eski bağlantılar 404 verir.'}
          </>
        }
      >
        <label className="admin-field">
          <span>Dil *</span>
          <select value={post.locale} onChange={(event) => set('locale', event.target.value as BlogSeed['locale'])}>
            <option value="tr">Türkçe (/blog)</option>
            <option value="en">English (/en/blog)</option>
          </select>
        </label>
        <TextField label="Yayın tarihi" type="date" required value={post.publishedAt} onChange={(value) => set('publishedAt', value)} />
        <TextField wide label="Başlık" required recommended={90} value={post.title} onChange={(value) => set('title', value)} />
        <TextField
          label="Adres (slug)"
          required
          value={post.slug}
          hint="Küçük harf, rakam ve tire. Başlıktan otomatik üretilir."
          onChange={(value) => {
            setSlugTouched(true);
            set('slug', slugify(value));
          }}
        />
        <TextField label="Üst başlık (kicker)" required value={post.kicker} onChange={(value) => set('kicker', value)} />
        <TextArea label="Giriş paragrafı" required rows={3} recommended={300} value={post.intro} onChange={(value) => set('intro', value)} />
        <LinesField label="Etiketler" rows={3} value={post.tags} hint="Her satıra bir etiket (anahtar kelime)." onChange={(value) => set('tags', value)} />
        <label className="admin-field">
          <span>Okuma süresi (dk) *</span>
          <div className="admin-inline">
            <input type="number" min={1} max={120} value={post.readingMinutes} onChange={(event) => set('readingMinutes', Number(event.target.value))} />
            <button type="button" className="admin-button" onClick={() => set('readingMinutes', estimateMinutes(post))}>Hesapla</button>
          </div>
        </label>
      </Section>

      <Section title="Kapak görseli">
        <ImagePicker
          label="Görsel"
          value={post.image}
          images={images}
          canUpload={!readOnly}
          onUploaded={(path) => setImages((list) => [...list, path].sort())}
          onChange={(value) => set('image', value)}
        />
        <TextField wide label="Görsel açıklaması (alt metin)" required value={post.imageAlt} hint="Görme engelli kullanıcılar ve Google için görseli tarif edin." onChange={(value) => set('imageAlt', value)} />
      </Section>

      <Section title="Arama motoru (SEO)" description="Google sonuçlarında görünen başlık ve açıklama.">
        <TextField wide label="SEO başlığı" required recommended={60} value={post.seoTitle} onChange={(value) => set('seoTitle', value)} />
        <TextArea label="SEO açıklaması" required rows={2} recommended={160} value={post.seoDescription} onChange={(value) => set('seoDescription', value)} />
        <div className="admin-serp admin-field--wide" aria-label="Google önizlemesi">
          <small>tarsuscomlekcilik.com › {publicPath.split('/').filter(Boolean).join(' › ')}</small>
          <strong>{post.seoTitle || 'SEO başlığı'}</strong>
          <p>{post.seoDescription || 'SEO açıklaması'}</p>
        </div>
      </Section>

      <section className="admin-card">
        <header><h2>İçerik bölümleri</h2></header>
        <BlocksEditor value={post.blocks} onChange={(blocks) => set('blocks', blocks)} />
      </section>

      {!readOnly && (
        <SaveBar
          {...saver}
          label={isNew ? 'Yazıyı yayınla' : 'Kaydet ve yayınla'}
          onSave={save}
          extra={
            !isNew && (
              <button
                type="button"
                className="admin-button admin-button--danger"
                disabled={saver.pending}
                onClick={() =>
                  saver.run(() => deleteBlogPostAction({ locale: initial.locale, slug: initial.slug }), {
                    confirmText: `"${initial.title}" yazısı kalıcı olarak silinsin mi?`,
                  })
                }
              >
                Yazıyı sil
              </button>
            )
          }
        />
      )}
    </>
  );
}
