'use client';

import { useRef, useState } from 'react';
import { business, whatsappUrl } from '@/lib/site-data';
import { IconWhatsApp } from './icons';
import { track } from './tracked-link';

export function QuoteForm({ english = false }: { english?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const started = useRef(false);

  function begin() {
    if (!started.current) {
      started.current = true;
      track('quote_form_start', { language: english ? 'en' : 'tr' });
    }
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    const form = new FormData(event.currentTarget);
    const lines = english
      ? [
          'Hello Tarsus Pottery, quote request from the website:',
          `Name: ${String(form.get('name') || '').trim()}`,
          `Company: ${String(form.get('company') || '').trim()}`,
          `Phone: ${String(form.get('phone') || '').trim()}`,
          `Email: ${String(form.get('email') || '').trim()}`,
          `Country: ${String(form.get('country') || '').trim()}`,
          `City: ${String(form.get('city') || '').trim()}`,
          `Product: ${String(form.get('product') || '').trim()}`,
          `Quantity: ${String(form.get('quantity') || '').trim()}`,
          `Message: ${String(form.get('message') || '').trim()}`,
        ]
      : [
          'Merhaba Tarsus Çömlekçilik, web sitesinden teklif talebi:',
          `Ad Soyad: ${String(form.get('name') || '').trim()}`,
          `Firma: ${String(form.get('company') || '').trim()}`,
          `Telefon: ${String(form.get('phone') || '').trim()}`,
          `E-posta: ${String(form.get('email') || '').trim()}`,
          `Ülke: ${String(form.get('country') || '').trim()}`,
          `Şehir: ${String(form.get('city') || '').trim()}`,
          `Ürün: ${String(form.get('product') || '').trim()}`,
          `Adet: ${String(form.get('quantity') || '').trim()}`,
          `Mesaj: ${String(form.get('message') || '').trim()}`,
        ];

    track('quote_form_submit', { language: english ? 'en' : 'tr', channel: 'whatsapp' });
    window.location.href = whatsappUrl('quote', lines.join('\n'), english);
  }

  const labels = english
    ? {
        title: 'Trade & project enquiry',
        intro: 'Fields marked * are required. Submit opens WhatsApp with your details.',
        name: 'Full name',
        company: 'Company',
        phone: 'Phone',
        email: 'Email',
        country: 'Country',
        city: 'City',
        product: 'Product of interest',
        quantity: 'Estimated quantity',
        message: 'Project or request',
        submit: 'Send on WhatsApp',
        loading: 'Opening WhatsApp…',
        hint: `Or message us directly: ${business.phoneDisplay}`,
      }
    : {
        title: 'Toptan & proje teklif formu',
        intro: '* işaretli alanlar zorunludur. Gönderince talebiniz WhatsApp’ta açılır.',
        name: 'Ad soyad',
        company: 'Firma',
        phone: 'Telefon',
        email: 'E-posta',
        country: 'Ülke',
        city: 'Şehir',
        product: 'İlgilendiğiniz ürün',
        quantity: 'Tahmini adet',
        message: 'Proje veya talebiniz',
        submit: 'WhatsApp’tan gönder',
        loading: 'WhatsApp açılıyor…',
        hint: `Doğrudan yazın: ${business.phoneDisplay}`,
      };

  return (
    <section className="quote-panel" id={english ? 'quote' : 'teklif'} aria-labelledby="quote-title">
      <div className="quote-panel__intro">
        <p className="eyebrow">{english ? 'Reply on WhatsApp' : 'Cevap WhatsApp’tan'}</p>
        <h2 id="quote-title">{labels.title}</h2>
        <p>
          {english
            ? 'Share the key commercial details — we continue the conversation on WhatsApp.'
            : 'Temel bilgileri paylaşın; görüşmeyi WhatsApp üzerinden sürdürelim.'}
        </p>
        <small>{labels.intro}</small>
      </div>
      <form className="quote-form" onFocus={begin} onSubmit={submit}>
        <label>
          <span>{labels.name} *</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>{labels.company} *</span>
          <input name="company" autoComplete="organization" required />
        </label>
        <label>
          <span>{labels.phone} *</span>
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
        <label>
          <span>{labels.email}</span>
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label>
          <span>{labels.country} *</span>
          <input name="country" autoComplete="country-name" required />
        </label>
        <label>
          <span>{labels.city}</span>
          <input name="city" autoComplete="address-level2" />
        </label>
        <label>
          <span>{labels.product} *</span>
          <select name="product" defaultValue="" required>
            <option value="" disabled>
              {english ? 'Select' : 'Seçiniz'}
            </option>
            <option>{english ? 'Oversized jars' : 'Büyük boy küpler'}</option>
            <option>{english ? 'Terracotta planters' : 'Terracotta saksılar'}</option>
            <option>{english ? 'Project supply' : 'Proje tedariki'}</option>
            <option>{english ? 'Other' : 'Diğer'}</option>
          </select>
        </label>
        <label>
          <span>{labels.quantity}</span>
          <input name="quantity" inputMode="numeric" />
        </label>
        <label className="quote-form__wide">
          <span>{labels.message} *</span>
          <textarea name="message" rows={5} required />
        </label>
        <div className="quote-form__wide quote-form__submit">
          <button className="button button--whatsapp" type="submit" disabled={status === 'loading'}>
            <IconWhatsApp />
            {status === 'loading' ? labels.loading : labels.submit}
          </button>
          <p className="form-privacy">{labels.hint}</p>
        </div>
      </form>
    </section>
  );
}
