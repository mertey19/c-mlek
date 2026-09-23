'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition, type ReactNode } from 'react';
import type { ActionResult } from '@/app/admin/actions';
import type { ContentBlock } from '@/lib/content-types';

// ---------------------------------------------------------------------------
// Kaydetme durumu
// ---------------------------------------------------------------------------

export function useSaver() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function run(action: () => Promise<ActionResult>, { confirmText }: { confirmText?: string } = {}) {
    if (confirmText && !window.confirm(confirmText)) return;
    startTransition(async () => {
      let response: ActionResult;
      try {
        response = await action();
      } catch {
        response = { ok: false, errors: ['Sunucuya ulaşılamadı. Bağlantınızı kontrol edip tekrar deneyin.'] };
      }
      setResult(response);
      if (response.ok) {
        setDirty(false);
        if (response.redirectTo && response.redirectTo !== window.location.pathname) router.push(response.redirectTo);
        router.refresh();
      }
    });
  }

  return { pending, result, dirty, markDirty: () => setDirty(true), run };
}

export function ResultMessage({ result }: { result: ActionResult | null }) {
  if (!result) return null;
  if (result.ok) {
    return (
      <p className="admin-alert admin-alert--ok" role="status">
        {result.message}{' '}
        {result.commitUrl && (
          <a href={result.commitUrl} target="_blank" rel="noreferrer">Değişikliği gör ↗</a>
        )}
      </p>
    );
  }
  return (
    <div className="admin-alert admin-alert--error" role="alert">
      <strong>Kaydedilemedi:</strong>
      <ul>{result.errors.map((error) => <li key={error}>{error}</li>)}</ul>
    </div>
  );
}

export function SaveBar({
  pending,
  dirty,
  result,
  onSave,
  label = 'Kaydet ve yayınla',
  extra,
}: {
  pending: boolean;
  dirty: boolean;
  result: ActionResult | null;
  onSave: () => void;
  label?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="admin-savebar">
      <div className="admin-savebar__msg">
        {pending ? <p className="admin-muted">Kaydediliyor…</p> : dirty ? <p className="admin-muted">Kaydedilmemiş değişiklikler var.</p> : <ResultMessage result={result} />}
      </div>
      <div className="admin-savebar__actions">
        {extra}
        <button className="admin-button admin-button--primary" type="button" onClick={onSave} disabled={pending}>
          {pending ? 'Kaydediliyor…' : label}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Form alanları
// ---------------------------------------------------------------------------

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: ReactNode;
  required?: boolean;
  recommended?: number;
  wide?: boolean;
};

function Counter({ value, recommended }: { value: string; recommended?: number }) {
  if (!recommended) return null;
  const over = value.length > recommended;
  return <small className={over ? 'admin-counter is-over' : 'admin-counter'}>{value.length}/{recommended}</small>;
}

export function TextField({ label, value, onChange, hint, required, recommended, wide, type = 'text', placeholder }: FieldProps & { type?: string; placeholder?: string }) {
  return (
    <label className={wide ? 'admin-field admin-field--wide' : 'admin-field'}>
      <span>{label}{required && ' *'} <Counter value={value} recommended={recommended} /></span>
      <input type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      {hint && <small>{hint}</small>}
    </label>
  );
}

export function TextArea({ label, value, onChange, hint, required, recommended, rows = 4, wide = true }: FieldProps & { rows?: number }) {
  return (
    <label className={wide ? 'admin-field admin-field--wide' : 'admin-field'}>
      <span>{label}{required && ' *'} <Counter value={value} recommended={recommended} /></span>
      <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
      {hint && <small>{hint}</small>}
    </label>
  );
}

/** Her satır bir öğe. */
export function LinesField({ label, value, onChange, hint, rows = 4, wide = true }: Omit<FieldProps, 'value' | 'onChange'> & { value: string[]; onChange: (value: string[]) => void; rows?: number }) {
  const [text, setText] = useState(value.join('\n'));
  return (
    <label className={wide ? 'admin-field admin-field--wide' : 'admin-field'}>
      <span>{label}</span>
      <textarea
        rows={rows}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          onChange(event.target.value.split('\n').map((line) => line.trim()).filter(Boolean));
        }}
      />
      <small>{hint ?? 'Her satıra bir madde yazın.'}</small>
    </label>
  );
}

// ---------------------------------------------------------------------------
// Görsel seçici
// ---------------------------------------------------------------------------

export function ImagePicker({
  label,
  value,
  onChange,
  images,
  onUploaded,
  canUpload,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  images: string[];
  onUploaded: (path: string) => void;
  canUpload: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const options = value && !images.includes(value) ? [value, ...images] : images;

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.set('file', file);
      const response = await fetch('/admin/api/upload', { method: 'POST', body });
      const data = (await response.json()) as { path?: string; error?: string };
      if (!response.ok || !data.path) throw new Error(data.error || 'Yükleme başarısız.');
      setPreviews((current) => ({ ...current, [data.path!]: URL.createObjectURL(file) }));
      onUploaded(data.path);
      onChange(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yükleme başarısız.');
    } finally {
      setUploading(false);
      if (input.current) input.current.value = '';
    }
  }

  return (
    <div className="admin-field admin-field--wide admin-image">
      <span>{label}</span>
      <div className="admin-image__row">
        <div className="admin-image__thumb">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- panel önizlemesi; next/image optimizasyonuna gerek yok
            <img src={previews[value] ?? value} alt="" />
          ) : (
            <em>Görsel yok</em>
          )}
        </div>
        <div className="admin-image__controls">
          <select value={value} onChange={(event) => onChange(event.target.value)}>
            <option value="">Görsel seçin…</option>
            {options.map((image) => <option key={image} value={image}>{image}</option>)}
          </select>
          {canUpload && (
            <>
              <input ref={input} type="file" accept="image/webp,image/jpeg,image/png,image/avif" hidden onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])} />
              <button type="button" className="admin-button" onClick={() => input.current?.click()} disabled={uploading}>
                {uploading ? 'Yükleniyor…' : 'Yeni görsel yükle'}
              </button>
            </>
          )}
          {previews[value] && <small>Yeni yüklenen görsel, site yeniden yayınlandığında görünür.</small>}
          {error && <small className="admin-error-text">{error}</small>}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// İçerik bölümleri
// ---------------------------------------------------------------------------

export function BlocksEditor({ value, onChange }: { value: ContentBlock[]; onChange: (value: ContentBlock[]) => void }) {
  // Satır tabanlı madde alanlarının yeniden oluşturulmaması için her bölüme kalıcı bir anahtar ver.
  const [keys, setKeys] = useState(() => value.map((_, i) => `b${i}`));
  const counter = useRef(value.length);

  const update = (index: number, patch: Partial<ContentBlock>) => onChange(value.map((block, i) => (i === index ? { ...block, ...patch } : block)));
  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= value.length) return;
    const swap = <T,>(list: T[]) => {
      const copy = [...list];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    };
    setKeys(swap(keys));
    onChange(swap(value));
  };
  const remove = (index: number) => {
    if (!window.confirm('Bu bölüm silinsin mi?')) return;
    setKeys(keys.filter((_, i) => i !== index));
    onChange(value.filter((_, i) => i !== index));
  };
  const add = () => {
    setKeys([...keys, `b${counter.current++}`]);
    onChange([...value, { title: '', body: '' }]);
  };

  return (
    <div className="admin-blocks">
      {value.map((block, index) => (
        <fieldset key={keys[index]} className="admin-block">
          <legend>
            Bölüm {index + 1}
            <span className="admin-block__tools">
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Yukarı taşı">↑</button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === value.length - 1} aria-label="Aşağı taşı">↓</button>
              <button type="button" onClick={() => remove(index)} aria-label="Bölümü sil">Sil</button>
            </span>
          </legend>
          <div className="admin-grid">
            <TextField wide label="Ara başlık" required value={block.title} onChange={(title) => update(index, { title })} />
            <TextArea label="Metin" required rows={5} value={block.body} onChange={(body) => update(index, { body })} />
            <LinesField label="Maddeler (isteğe bağlı)" rows={3} value={block.bullets ?? []} onChange={(bullets) => update(index, { bullets: bullets.length ? bullets : undefined })} />
            <TextField
              label="Link adresi (isteğe bağlı)"
              value={block.link?.href ?? ''}
              placeholder="/iletisim#teklif veya whatsapp:project"
              onChange={(href) => update(index, { link: href || block.link?.label ? { href, label: block.link?.label ?? '' } : undefined })}
            />
            <TextField
              label="Link metni"
              value={block.link?.label ?? ''}
              onChange={(label) => update(index, { link: label || block.link?.href ? { href: block.link?.href ?? '', label } : undefined })}
            />
          </div>
        </fieldset>
      ))}
      <button type="button" className="admin-button" onClick={add}>+ Bölüm ekle</button>
      <p className="admin-hint">
        Link adresinde <code>whatsapp:default</code>, <code>whatsapp:project</code>, <code>whatsapp:wholesale</code>, <code>whatsapp:export</code> yazarsanız güncel WhatsApp numarasına hazır mesajlı bağlantı oluşur.
        Metinlerde <code>{'{{adres}}'}</code>, <code>{'{{telefon}}'}</code>, <code>{'{{firma}}'}</code> firma bilgileriyle otomatik doldurulur.
      </p>
    </div>
  );
}

export function Section({ title, children, description }: { title: string; description?: ReactNode; children: ReactNode }) {
  return (
    <section className="admin-card">
      <header>
        <h2>{title}</h2>
        {description && <p className="admin-muted">{description}</p>}
      </header>
      <div className="admin-grid">{children}</div>
    </section>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="admin-pagehead">
      <div>
        <h1>{title}</h1>
        {description && <p className="admin-muted">{description}</p>}
      </div>
      {actions && <div className="admin-pagehead__actions">{actions}</div>}
    </header>
  );
}
