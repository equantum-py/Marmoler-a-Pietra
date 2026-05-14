'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export type SiteSettings = {
  id: string;
  logo_desktop?: string | null;
  logo_mobile?: string | null;
  company_name?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  instagram?: string | null;
};

const SETTINGS_ID = 'pietra';

function getSupabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

function getAccessTokenFromCookies(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const knownCookieNames = [
    'pietra_admin_access_token',
    'pietra-admin-access-token',
    'admin_access_token',
    'supabase_access_token',
    'sb-access-token',
    'access_token',
  ];

  for (const name of knownCookieNames) {
    const value = cookieStore.get(name)?.value;
    if (value) return value;
  }

  return cookieStore
    .getAll()
    .find((cookie) => cookie.name.toLowerCase().includes('access') && cookie.value.startsWith('eyJ'))
    ?.value;
}

async function fetchSettingsWithToken(path: string, init?: RequestInit) {
  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    throw new Error('Supabase no está configurado.');
  }

  const cookieStore = await cookies();
  const accessToken = getAccessTokenFromCookies(cookieStore);

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${accessToken || key}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed with status ${response.status}`);
  }

  if (response.status === 204) return null;

  return response.json();
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    return null;
  }

  try {
    const rows = await fetchSettingsWithToken(
      `site_settings?id=eq.${SETTINGS_ID}&select=*&limit=1`,
    );

    return Array.isArray(rows) ? rows[0] ?? null : null;
  } catch {
    return null;
  }
}

export async function updateSiteLogos(formData: FormData) {
  const logoDesktop = String(formData.get('logo_desktop') ?? '').trim();
  const logoMobile = String(formData.get('logo_mobile') ?? '').trim();

  await fetchSettingsWithToken('site_settings?on_conflict=id', {
    method: 'POST',
    headers: {
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify({
      id: SETTINGS_ID,
      logo_desktop: logoDesktop || null,
      logo_mobile: logoMobile || null,
    }),
  });

  revalidatePath('/admin/configuracion');
  revalidatePath('/');
}
