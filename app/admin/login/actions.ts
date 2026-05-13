'use server';

import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { signInAdmin, signOutAdmin } from '@/lib/supabase/auth';
import type { MaterialFormState } from '@/lib/supabase/types';

export async function loginAdmin(
  _state: MaterialFormState,
  formData: FormData,
): Promise<MaterialFormState> {
  if (!isSupabaseConfigured) {
    return {
      ok: true,
      message: 'Supabase no está configurado. El admin queda en modo fallback local.',
    };
  }

  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return { ok: false, message: 'Ingresá email y contraseña.' };
  }

  try {
    await signInAdmin(email, password);
  } catch {
    return {
      ok: false,
      message: 'No se pudo iniciar sesión. Revisá las credenciales de Supabase Auth.',
    };
  }

  redirect('/admin');
}

export async function logoutAdmin() {
  await signOutAdmin();
  redirect('/admin/login');
}
