'use client';

import { useState } from 'react';
import { saveBusinessAction } from '@/app/admin/actions';
import type { Business } from '@/lib/content-types';
import { SaveBar, Section, TextField, useSaver } from './ui';

type Key = Exclude<keyof Business, 'email'>;

export function BusinessEditor({ initial, readOnly }: { initial: Business; readOnly: boolean }) {
  const [data, setData] = useState(initial);
  const saver = useSaver();
  const field = (key: Key, label: string, extra: { hint?: string; wide?: boolean; type?: string } = {}) => (
    <TextField
      label={label}
      required
      value={data[key]}
      onChange={(value) => {
        setData({ ...data, [key]: value });
        saver.markDirty();
      }}
      {...extra}
    />
  );

  return (
    <>
      <Section title="Kimlik">
        {field('name', 'Firma adı')}
        {field('legalName', 'Ticari unvan')}
        {field('founded', 'Kuruluş yılı')}
        {field('website', 'Web sitesi', { type: 'url' })}
      </Section>
      <Section title="Telefon & WhatsApp" description="Sitedeki tüm Ara / WhatsApp düğmeleri ve teklif formu bu numaraları kullanır.">
        {field('phone', 'Telefon (arama)', { hint: 'Ülke koduyla, yalnızca rakam: 905xxxxxxxxx' })}
        {field('phoneDisplay', 'Telefon (sitede görünen)', { hint: 'Örn. +90 501 016 30 96' })}
        {field('whatsapp', 'WhatsApp numarası', { hint: 'Ülke koduyla, yalnızca rakam' })}
        <TextField
          label="E-posta (isteğe bağlı)"
          type="email"
          value={data.email ?? ''}
          onChange={(value) => {
            setData({ ...data, email: value || null });
            saver.markDirty();
          }}
        />
      </Section>
      <Section title="Adres">
        {field('streetAddress', 'Sokak adresi', { wide: true })}
        {field('postalCode', 'Posta kodu')}
        {field('locality', 'İlçe')}
        {field('region', 'İl')}
        {field('country', 'Ülke')}
        {field('address', 'Tam adres (sitede görünen)', { wide: true })}
        {field('googleMapsUrl', 'Google Haritalar linki', { wide: true, type: 'url' })}
        {field('googleBusinessUrl', 'Google İşletme profili linki', { wide: true, type: 'url' })}
      </Section>
      <Section title="Sosyal medya">
        {field('instagram', 'Instagram linki', { type: 'url' })}
        {field('instagramHandle', 'Instagram kullanıcı adı')}
        {field('youtube', 'YouTube linki', { type: 'url' })}
        {field('youtubeHandle', 'YouTube kullanıcı adı')}
      </Section>
      {!readOnly && <SaveBar {...saver} onSave={() => saver.run(() => saveBusinessAction(data))} />}
    </>
  );
}
