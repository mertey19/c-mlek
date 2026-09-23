'use client';

import { useActionState } from 'react';
import { loginAction, type LoginState } from '@/app/admin/actions';

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, { error: null });
  return (
    <form action={action} className="admin-form">
      <label className="admin-field">
        <span>Şifre</span>
        <input type="password" name="password" autoComplete="current-password" required autoFocus />
      </label>
      {state.error && <p className="admin-alert admin-alert--error" role="alert">{state.error}</p>}
      <button className="admin-button admin-button--primary" type="submit" disabled={pending}>
        {pending ? 'Kontrol ediliyor…' : 'Giriş yap'}
      </button>
    </form>
  );
}
