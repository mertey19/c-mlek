import type { Metadata } from 'next';
import { LeadsTable } from '@/components/admin/leads-table';
import { PageHeader } from '@/components/admin/ui';
import { leadStoreMode, listLeads } from '@/lib/admin/leads';

export const metadata: Metadata = { title: 'Teklif talepleri' };

export default async function LeadsPage() {
  const mode = leadStoreMode();
  const { leads, error } = await listLeads()
    .then((list) => ({ leads: list, error: null }))
    .catch((err: unknown) => ({ leads: [], error: err instanceof Error ? err.message : 'Kayıtlar okunamadı.' }));

  return (
    <>
      <PageHeader
        title="Teklif talepleri"
        description="Sitedeki teklif formunu dolduranlar. Form gönderildiğinde talep burada kaydedilir ve müşteri WhatsApp’a yönlendirilir."
      />
      {mode === 'disabled' && (
        <div className="admin-alert admin-alert--warn">
          Talepler kaydedilmiyor: Vercel → Storage → Upstash (Redis) bağlayın; <code>KV_REST_API_URL</code> ve <code>KV_REST_API_TOKEN</code> otomatik eklenir.
          Bu sürede form yine WhatsApp’a yönlendirmeye devam eder.
        </div>
      )}
      {mode === 'file' && <div className="admin-alert admin-alert--info">Geliştirme modu: talepler <code>.data/leads.json</code> dosyasına yazılıyor.</div>}
      {error && <div className="admin-alert admin-alert--error">{error}</div>}
      <LeadsTable initial={leads} />
    </>
  );
}
