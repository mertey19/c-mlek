import { logoutAction } from '@/app/admin/actions';
import { AdminNav } from '@/components/admin/nav';
import { requireAdmin } from '@/lib/admin/auth';
import { storeDescription, storeMode } from '@/lib/admin/store';

export default async function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();
  const mode = storeMode();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <strong>Tarsus Çömlekçilik</strong>
          <span>Yönetim paneli</span>
        </div>
        <AdminNav />
        <div className="admin-sidebar__foot">
          <p className={`admin-mode admin-mode--${mode}`} title={storeDescription()}>
            {mode === 'github' ? 'Canlı: GitHub’a kaydediyor' : mode === 'local' ? 'Yerel mod' : 'Salt okunur'}
          </p>
          <a className="admin-link" href="/" target="_blank" rel="noreferrer">Siteyi görüntüle ↗</a>
          <form action={logoutAction}>
            <button className="admin-link" type="submit">Çıkış yap</button>
          </form>
        </div>
      </aside>
      <main className="admin-main">
        {mode === 'readonly' && (
          <div className="admin-alert admin-alert--warn">
            Panel salt okunur: değişiklikleri kaydetmek için Vercel’de <code>GITHUB_TOKEN</code> ve <code>GITHUB_REPO</code> ortam değişkenlerini tanımlayın.
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
