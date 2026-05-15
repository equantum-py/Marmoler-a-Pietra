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

function dateOrNull(value: FormDataEntryValue | null) {
  const cleaned = clean(value);
  return cleaned ? new Date(cleaned).toISOString() : null;
}

function bannerPayloadFromForm(formData: FormData) {
  const status = clean(formData.get('status')) || 'draft';

  return {
    placement: clean(formData.get('placement')) || 'hero',
    name: clean(formData.get('name')) || 'Hero principal Marmolería Pietra',
    is_active: status === 'published',
    status,
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,

    desktop_image_url: clean(formData.get('desktop_image_url')),
    mobile_image_url: clean(formData.get('mobile_image_url')),
    tablet_image_url: nullable(formData.get('tablet_image_url')),
    alt_text: nullable(formData.get('alt_text')),

    eyebrow: nullable(formData.get('eyebrow')),
    title: clean(formData.get('title')) || 'Lujo en cada detalle',
    highlighted_text: nullable(formData.get('highlighted_text')),
    subtitle: nullable(formData.get('subtitle')),

    primary_cta_label: nullable(formData.get('primary_cta_label')),
    primary_cta_href: nullable(formData.get('primary_cta_href')),
    secondary_cta_label: nullable(formData.get('secondary_cta_label')),
    secondary_cta_href: nullable(formData.get('secondary_cta_href')),
    whatsapp_message: nullable(formData.get('whatsapp_message')),

    text_position: clean(formData.get('text_position')) || 'left',
    vertical_position: clean(formData.get('vertical_position')) || 'center',
    object_position_desktop: clean(formData.get('object_position_desktop')) || 'center center',
    object_position_mobile: clean(formData.get('object_position_mobile')) || 'center center',

    starts_at: dateOrNull(formData.get('starts_at')),
    ends_at: dateOrNull(formData.get('ends_at')),
  };
}

export async function createHomeBanner(formData: FormData) {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    redirect('/admin/banners');
  }

  const payload = bannerPayloadFromForm(formData);

  if (!payload.desktop_image_url) {
    throw new Error('La imagen desktop es obligatoria.');
  }

  if (!payload.mobile_image_url) {
    throw new Error('La imagen mobile es obligatoria.');
  }

  const accessToken = await getAdminAccessToken();

  await supabaseFetch('/home_banners', {
    method: 'POST',
    body: payload,
    accessToken,
    prefer: 'return=representation',
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
    body: {
      status: 'archived',
      is_active: false,
    },
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/banners');
}
