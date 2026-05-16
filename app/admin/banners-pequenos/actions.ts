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

function payloadFromForm(formData: FormData) {
  return {
    eyebrow: clean(formData.get('eyebrow')),
    title: clean(formData.get('title')),
    cta_label: clean(formData.get('cta_label')) || 'Ver opciones',
    image_url: clean(formData.get('image_url')),
    mobile_image_url: nullable(formData.get('mobile_image_url')),
    whatsapp_message: nullable(formData.get('whatsapp_message')),
    href: nullable(formData.get('href')),
    status: clean(formData.get('status')) || 'published',
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,
  };
}

export async function createHomePromoCard(formData: FormData) {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    redirect('/admin/banners-pequenos');
  }

  const payload = payloadFromForm(formData);

  if (!payload.eyebrow || !payload.title || !payload.image_url) {
    throw new Error('Texto superior, título e imagen son obligatorios.');
  }

  const accessToken = await getAdminAccessToken();

  await supabaseFetch('/home_promo_cards', {
    method: 'POST',
    body: payload,
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/banners-pequenos');
  redirect('/admin/banners-pequenos');
}

export async function updateHomePromoCard(formData: FormData) {
  await requireAdminUser();

  const id = clean(formData.get('id'));

  if (!id || !isSupabaseConfigured) {
    redirect('/admin/banners-pequenos');
  }

  const payload = payloadFromForm(formData);
  const accessToken = await getAdminAccessToken();

  await supabaseFetch(`/home_promo_cards?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/banners-pequenos');
  redirect('/admin/banners-pequenos');
}

export async function archiveHomePromoCard(formData: FormData) {
  await requireAdminUser();

  const id = clean(formData.get('id'));

  if (!id || !isSupabaseConfigured) {
    redirect('/admin/banners-pequenos');
  }

  const accessToken = await getAdminAccessToken();

  await supabaseFetch(`/home_promo_cards?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: {
      status: 'archived',
    },
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/banners-pequenos');
}
