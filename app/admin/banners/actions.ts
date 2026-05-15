'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

const placementLabels: Record<string, string> = {
  hero: 'Hero principal',
  'ambiente-cocinas': 'Ambiente - Cocinas',
  'ambiente-banos': 'Ambiente - Baños',
  'ambiente-quinchos': 'Ambiente - Quinchos',
  'ambiente-revestimientos': 'Ambiente - Revestimientos',
  'ambiente-escaleras': 'Ambiente - Escaleras',
  'promo-1': 'Banner comercial 1',
  'promo-2': 'Banner comercial 2',
  'promo-3': 'Banner comercial 3',
  'side-promo': 'Banner lateral destacado',
};

function clean(value: FormDataEntryValue | null) {
  return String(value ?? '').trim();
}

function bannerPayloadFromForm(formData: FormData) {
  const placement = clean(formData.get('placement')) || 'hero';

  return {
    placement,
    title: placementLabels[placement] || placement,
    eyebrow: '',
    description: '',
    cta_label: '',
    cta_url: clean(formData.get('cta_url')),
    whatsapp_message: '',
    desktop_image: clean(formData.get('desktop_image')),
    mobile_image: clean(formData.get('mobile_image')),
    status: clean(formData.get('status')) || 'draft',
    sort_order: Number(formData.get('sort_order') ?? 0),
  };
}

export async function createHomeBanner(formData: FormData) {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    redirect('/admin/banners');
  }

  const payload = bannerPayloadFromForm(formData);

  if (!payload.desktop_image) {
    throw new Error('La imagen desktop es obligatoria.');
  }

  const accessToken = await getAdminAccessToken();

  await supabaseFetch('/home_banners?on_conflict=placement', {
    method: 'POST',
    body: payload,
    accessToken,
    prefer: 'resolution=merge-duplicates,return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/banners');
  redirect('/admin/banners');
}

export async function updateHomeBanner(formData: FormData) {
  await requireAdminUser();

  const id = clean(formData.get('id'));

  if (!id || !isSupabaseConfigured) {
    redirect('/admin/banners');
  }

  const payload = bannerPayloadFromForm(formData);
  const accessToken = await getAdminAccessToken();

  await supabaseFetch(`/home_banners?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/banners');
  redirect('/admin/banners');
}

export async function archiveHomeBanner(formData: FormData) {
  await requireAdminUser();

  const id = clean(formData.get('id'));

  if (!id || !isSupabaseConfigured) {
    redirect('/admin/banners');
  }

  const accessToken = await getAdminAccessToken();

  await supabaseFetch(`/home_banners?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: { status: 'archived' },
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/banners');
}
