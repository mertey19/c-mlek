import type { Metadata } from 'next';
import { BusinessEditor } from '@/components/admin/business-editor';
import { PageHeader } from '@/components/admin/ui';
import { readContent, storeMode } from '@/lib/admin/store';
import type { Business } from '@/lib/content-types';

export const metadata: Metadata = { title: 'Firma & iletişim' };

export default async function BusinessPage() {
  const { data } = await readContent<Business>('business');
  return (
    <>
      <PageHeader title="Firma & iletişim bilgileri" description="Üst menü, alt bilgi, WhatsApp düğmeleri, teklif formu ve Google için yapılandırılmış veriler bu bilgileri kullanır." />
      <BusinessEditor initial={data} readOnly={storeMode() === 'readonly'} />
    </>
  );
}
