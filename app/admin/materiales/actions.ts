'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { supabaseFetch } from '@/lib/supabase/client';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { materialPayloadFromForm } from '@/lib/supabase/materials';
import type { MaterialFormState, SupabaseMaterialRow } from '@/lib/supabase/types';



function validateMaterialPayload(payload: ReturnType<typeof materialPayloadFromForm>) {
  if (!payload.name || !payload.slug || !payload.category) {
    return 'Nombre, slug y categoría son obligatorios.';
  }

  if (!payload.short_description || !payload.long_description) {
    return 'Las descripciones corta y larga son obligatorias.';
  }

  return null;
}

export async function createMaterial(
  _state: MaterialFormState,
  formData: FormData,
): Promise<MaterialFormState> {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message: 'Supabase no está configurado. El fallback local es de solo lectura.',
    };
  }

  const payload = materialPayloadFromForm(formData);
  const validationError = validateMaterialPayload(payload);

  if (validationError) {
    return { ok: false, message: validationError };
  }

  const accessToken = await getAdminAccessToken();
  await supabaseFetch<SupabaseMaterialRow[]>('/materials', {
    method: 'POST',
    body: payload,
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/admin/materiales');
  redirect('/admin/materiales');
}

export async function updateMaterial(
  _state: MaterialFormState,
  formData: FormData,
): Promise<MaterialFormState> {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message: 'Supabase no está configurado. El fallback local es de solo lectura.',
    };
  }

  const id = String(formData.get('id') ?? '');
  const payload = materialPayloadFromForm(formData);
  const validationError = validateMaterialPayload(payload);

  if (!id) {
    return { ok: false, message: 'Falta el ID del material.' };
  }

  if (validationError) {
    return { ok: false, message: validationError };
  }

  const accessToken = await getAdminAccessToken();
  await supabaseFetch<SupabaseMaterialRow[]>(`/materials?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
    accessToken,
    prefer: 'return=representation',
  });

  revalidatePath('/admin/materiales');
  redirect('/admin/materiales');
}

export async function archiveMaterial(formData: FormData) {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    revalidatePath('/admin/materiales');
    return;
  }

  const id = String(formData.get('id') ?? '');
  if (!id) {
    return;
  }

  const accessToken = await getAdminAccessToken();
  await supabaseFetch(`/materials?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: { status: 'Archivado' },
    accessToken,
    prefer: 'return=minimal',
  });

  revalidatePath('/admin/materiales');
}

export async function duplicateMaterial(formData: FormData) {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    revalidatePath('/admin/materiales');
    return;
  }

  const id = String(formData.get('id') ?? '');
  if (!id) {
    return;
  }

  const accessToken = await getAdminAccessToken();
  const rows = await supabaseFetch<SupabaseMaterialRow[]>(
    `/materials?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
    {
      accessToken,
    },
  );
  const original = rows[0];
  if (!original) {
    return;
  }

  const payload: Partial<SupabaseMaterialRow> = { ...original };
  delete payload.id;
  delete payload.created_at;
  delete payload.updated_at;

  await supabaseFetch('/materials', {
    method: 'POST',
    body: {
      ...payload,
      slug: `${original.slug}-copia`,
      name: `${original.name} copia`,
      status: 'Borrador',
      featured: false,
    },
    accessToken,
    prefer: 'return=minimal',
  });

  revalidatePath('/admin/materiales');
}
