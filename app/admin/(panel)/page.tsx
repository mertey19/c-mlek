import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/admin/ui';
import { leadStoreMode, listLeads, type Lead } from '@/lib/admin/leads';
import { readContent, storeDescription, storeMode } from '@/lib/admin/store';
import type { BlogSeed, Category, Product } from '@/lib/content-types';

export const metadata: Metadata = { title: 'Genel bakış' };

const dateFormat = new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Istanbul' });

function countSince(leads: Lead[], days: number) {
  const since = Date.now() - days * 86400_000;
  return leads.filter((lead) => Date.parse(lead.createdAt) > since).length;
}

export default async function DashboardPage() {
  const [blog, products, categories, leads] = await Promise.all([
    readContent<BlogSeed[]>('blog'),
    readContent<Product[]>('products'),
    readContent<Category[]>('categories'),
    listLeads().catch(() => []),
  ]);
  const newLeads = leads.filter((lead) => lead.status === 'yeni');
  const lastWeek = countSince(leads, 7);
  const latestPost = [...blog.data].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0];

  const stats = [
    { label: 'Yeni talep', value: newLeads.length, href: '/admin/talepler', note: `Son 7 günde ${lastWeek} talep` },
    { label: 'Blog yazısı', value: blog.data.length, href: '/admin/blog', note: latestPost ? `Son: ${latestPost.publishedAt}` : undefined },
    { label: 'Ürün', value: products.data.length, href: '/admin/urunler' },
    { label: 'Kategori', value: categories.data.length, href: '/admin/kategoriler' },
  ];

  return (
    <>
      <PageHeader title="Genel bakış" description={`Kayıt yeri: ${storeDescription()}`} />
      <div className="admin-stats">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="admin-stat">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
            {stat.note && <small>{stat.note}</small>}
          </Link>
        ))}
      </div>

      <div className="admin-columns">
        <section className="admin-card">
          <header className="admin-card__head">
            <h2>Son teklif talepleri</h2>
            <Link href="/admin/talepler">Tümü →</Link>
          </header>
          {leadStoreMode() === 'disabled' ? (
            <p className="admin-muted">Talep kaydı kapalı — Upstash Redis bağlandığında burada listelenir.</p>
          ) : leads.length ? (
            <ul className="admin-list">
              {leads.slice(0, 5).map((lead) => (
                <li key={lead.id}>
                  <span><strong>{lead.name}</strong> · {lead.company}<small>{lead.product}</small></span>
                  <small>{dateFormat.format(new Date(lead.createdAt))}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="admin-muted">Henüz talep yok.</p>
          )}
        </section>

        <section className="admin-card">
          <header className="admin-card__head"><h2>Hızlı işlemler</h2></header>
          <div className="admin-quick">
            <Link className="admin-button admin-button--primary" href="/admin/blog/yeni">+ Blog yazısı ekle</Link>
            <Link className="admin-button" href="/admin/urunler/yeni">+ Ürün ekle</Link>
            <Link className="admin-button" href="/admin/firma">Telefon / adres güncelle</Link>
          </div>
          {storeMode() === 'github' && (
            <p className="admin-hint">Kaydettiğiniz her değişiklik GitHub’a işlenir ve Vercel siteyi 1-2 dakikada yeniden yayınlar. Vercel panelindeki “Deployments” sekmesinden takip edebilirsiniz.</p>
          )}
        </section>
      </div>
    </>
  );
}
