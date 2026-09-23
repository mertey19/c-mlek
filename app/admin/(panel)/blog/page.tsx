import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/admin/ui';
import { readContent } from '@/lib/admin/store';
import type { BlogSeed } from '@/lib/content-types';

export const metadata: Metadata = { title: 'Blog yazıları' };

export default async function BlogListPage({ searchParams }: { searchParams: Promise<{ dil?: string }> }) {
  const { dil } = await searchParams;
  const { data } = await readContent<BlogSeed[]>('blog');
  const posts = data
    .filter((post) => !dil || post.locale === dil)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const trCount = data.filter((post) => post.locale === 'tr').length;

  return (
    <>
      <PageHeader
        title="Blog yazıları"
        description={`${data.length} yazı · ${trCount} Türkçe, ${data.length - trCount} İngilizce`}
        actions={<Link className="admin-button admin-button--primary" href="/admin/blog/yeni">+ Yeni yazı</Link>}
      />
      <nav className="admin-tabs" aria-label="Dil filtresi">
        <Link href="/admin/blog" className={!dil ? 'is-active' : undefined}>Tümü</Link>
        <Link href="/admin/blog?dil=tr" className={dil === 'tr' ? 'is-active' : undefined}>Türkçe</Link>
        <Link href="/admin/blog?dil=en" className={dil === 'en' ? 'is-active' : undefined}>English</Link>
      </nav>
      <div className="admin-card admin-card--flush">
        <table className="admin-table">
          <thead>
            <tr><th>Başlık</th><th>Dil</th><th>Yayın</th><th><span className="sr-only">İşlemler</span></th></tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const publicPath = `${post.locale === 'en' ? '/en/blog' : '/blog'}/${post.slug}`;
              return (
                <tr key={`${post.locale}/${post.slug}`}>
                  <td>
                    <Link href={`/admin/blog/${post.locale}/${post.slug}`} className="admin-table__title">{post.title}</Link>
                    <small>{publicPath}</small>
                  </td>
                  <td><span className="admin-badge">{post.locale.toUpperCase()}</span></td>
                  <td>{post.publishedAt}</td>
                  <td className="admin-table__actions">
                    <a href={publicPath} target="_blank" rel="noreferrer">Sitede aç ↗</a>
                  </td>
                </tr>
              );
            })}
            {!posts.length && <tr><td colSpan={4} className="admin-empty">Yazı yok.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
