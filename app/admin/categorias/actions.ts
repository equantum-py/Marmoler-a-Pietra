'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

function clean(value: FormDataEntryValue | null) {
  return String(value ?? '').trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function nullable(value: FormDataEntryValue | null) {
  const cleaned = clean(value);
  return cleaned ? cleaned : null;
}

function categoryPayloadFromForm(formData: FormData) {
  const name = clean(formData.get('name'));
  const slug = clean(formData.get('slug')) || slugify(name);

  return {
    name,
    slug,
    image_url: clean(formData.get('image_url')),
    mobile_image_url: nullable(formData.get('mobile_image_url')),
    whatsapp_message: nullable(formData.get('whatsapp_message')),
    href: nullable(formData.get('href')),
    status: clean(formData.get('status')) || 'published',
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,
  };
}

export async function createHomeCategory(formData: FormData) {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    redirect('/admin/categorias');
  }

  const payload = categoryPayloadFromForm(formData);

  if (!payload.name) {
    throw new Error('El nombre de la categoría es obligatorio.');
  }

  if (!payload.image_url) {
    throw new Error('La imagen de la categoría es obligatoria.');
  }

  const accessToken = await getAdminAccessToken();

  await supabaseFetch('/home_categories', {
    method: 'POST',
    body: payload,
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/categorias');
  redirect('/admin/categorias');
}

export async function updateHomeCategory(formData: FormData) {
  await requireAdminUser();

  const id = clean(formData.get('id'));

  if (!id || !isSupabaseConfigured) {
    redirect('/admin/categorias');
  }

  const payload = categoryPayloadFromForm(formData);
  const accessToken = await getAdminAccessToken();

  await supabaseFetch(`/home_categories?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/categorias');
  redirect('/admin/categorias');
}

export async function archiveHomeCategory(formData: FormData) {
  await requireAdminUser();

  const id = clean(formData.get('id'));

  if (!id || !isSupabaseConfigured) {
    redirect('/admin/categorias');
  }

  const accessToken = await getAdminAccessToken();

  await supabaseFetch(`/home_categories?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: {
      status: 'archived',
    },
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/');
  revalidatePath('/admin/categorias');
}
