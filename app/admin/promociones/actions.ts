'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

function clean(value: FormDataEntryValue | null) {
  return String(value ?? '').trim();
}

function nullable(value: FormDataEntryValue | null) {
  const cleaned = clean(value);
  return cleaned ? cleaned : null;
}

function checkboxValue(value: FormDataEntryValue | null, defaultValue = false) {
  if (value === null) return defaultValue;
  return clean(value) === 'on';
}

function promotionPayloadFromForm(formData: FormData) {
  return {
    placement: clean(formData.get('placement')) || 'home-wide',
    name: clean(formData.get('name')) || 'Promoción Home',
    media_type: clean(formData.get('media_type')) || 'image',

    desktop_media_url: clean(formData.get('desktop_media_url')),
    mobile_media_url: nullable(formData.get('mobile_media_url')),
    poster_url: nullable(formData.get('poster_url')),

    href: nullable(formData.get('href')),
    alt_text: nullable(formData.get('alt_text')),

    status: clean(formData.get('status')) || 'published',
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,

    autoplay: checkboxValue(formData.get('autoplay'), true),
    muted: checkboxValue(formData.get('muted'), true),
    loop: checkboxValue(formData.get('loop'), true),
  };
}

export async function createHomePromotion(formData: FormData) {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    redirect('/admin/promociones');
  }

  const payload = promotionPayloadFromForm(formData);

  if (!payload.desktop_media_url) {
    throw new Error('El archivo desktop es obligatorio.');
  }

  const accessToken = await getAdminAccessToken();

  await supabaseFetch('/home_promotions', {
    method: 'POST',
    body: payload,
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/promociones');
  redirect('/admin/promociones');
}

export async function updateHomePromotion(formData: FormData) {
  await requireAdminUser();

  const id = clean(formData.get('id'));

  if (!id || !isSupabaseConfigured) {
    redirect('/admin/promociones');
  }

  const payload = promotionPayloadFromForm(formData);
  const accessToken = await getAdminAccessToken();

  await supabaseFetch(`/home_promotions?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/promociones');
  redirect('/admin/promociones');
}

export async function archiveHomePromotion(formData: FormData) {
  await requireAdminUser();

  const id = clean(formData.get('id'));

  if (!id || !isSupabaseConfigured) {
    redirect('/admin/promociones');
  }

  const accessToken = await getAdminAccessToken();

  await supabaseFetch(`/home_promotions?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: {
      status: 'archived',
    },
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/promociones');
}
