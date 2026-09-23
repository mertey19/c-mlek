import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/admin/login-form';
import { authConfigError, isAuthenticated } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'Giriş' };

export default async function LoginPage() {
  if (await isAuthenticated()) redirect('/admin');
  const configError = authConfigError();

  return (
    <main className="admin-login">
      <div className="admin-login__card">
        <p className="admin-eyebrow">Tarsus Çömlekçilik</p>
        <h1>Yönetim paneli</h1>
        {configError ? (
          <div className="admin-alert admin-alert--error">
            <strong>Panel henüz yapılandırılmamış.</strong>
            <p>{configError}</p>
            <p>Vercel → Project → Settings → Environment Variables bölümüne <code>ADMIN_PASSWORD</code> ve <code>ADMIN_SESSION_SECRET</code> ekleyin (yerelde <code>.env.local</code>).</p>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </main>
  );
}
