'use client';

import { useActionState } from 'react';
import { loginAdmin } from '@/app/admin/login/actions';
import type { MaterialFormState } from '@/lib/supabase/types';

const initialState: MaterialFormState = { ok: true, message: '' };

export function LoginForm({ fallbackMode }: { fallbackMode: boolean }) {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      {fallbackMode ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          Supabase no está configurado: el panel queda accesible en modo fallback local.
        </div>
      ) : null}
      {state.message ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${state.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'}`}
        >
          {state.message}
        </div>
      ) : null}
      <label className="block text-sm font-semibold text-pietra-ink">
        Email
        <input type="email" name="email" placeholder="admin@pietra.com" className="admin-input" />
      </label>
      <label className="block text-sm font-semibold text-pietra-ink">
        Contraseña
        <input type="password" name="password" placeholder="••••••••" className="admin-input" />
      </label>
      <button
        type="submit"
        disabled={pending || fallbackMode}
        className="inline-flex w-full items-center justify-center rounded-full bg-pietra-green px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-pietra-sage disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  );
}
