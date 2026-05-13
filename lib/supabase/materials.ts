import { adminMaterials } from '@/data/admin';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { supabaseFetch } from '@/lib/supabase/client';
import { getAdminAccessToken } from '@/lib/supabase/auth';
import type { SupabaseMaterialRow } from '@/lib/supabase/types';
import type { MaterialCategory } from '@/types/content';

export type AdminMaterialRecord = SupabaseMaterialRow & {
  source: 'supabase' | 'local';
};

function localDate() {
  return new Date().toISOString();
}

function toLocalMaterialRows(): AdminMaterialRecord[] {
  return adminMaterials.map((material, index) => ({
    id: material.slug,
    slug: material.slug,
    name: material.name,
    category: material.category,
    short_description: material.shortDescription,
    long_description: material.longDescription,
    color: material.color,
    finish: material.finish,
    recommended_use: material.recommendedUse,
    resistance: material.resistance,
    maintenance: material.maintenance,
    applications: material.applications,
    benefits: material.benefits,
    main_image: material.image,
    gallery: material.images,
    related_slugs: material.relatedSlugs,
    whatsapp_message: material.whatsappMessage,
    featured: material.highlighted,
    status: material.status === 'Falta SEO' ? 'Borrador' : 'Publicado',
    seo_title: `${material.name} | Marmolería Pietra`,
    seo_description: material.description,
    sort_order: index + 1,
    created_at: localDate(),
    updated_at: localDate(),
    source: 'local',
  }));
}

export async function getAdminMaterials(): Promise<AdminMaterialRecord[]> {
  if (!isSupabaseConfigured) {
    return toLocalMaterialRows();
  }

  try {
    const accessToken = await getAdminAccessToken();
    const rows = await supabaseFetch<SupabaseMaterialRow[]>(
      '/materials?select=*&order=sort_order.asc,updated_at.desc',
      { accessToken },
    );
    return rows.map((row) => ({ ...row, source: 'supabase' }));
  } catch (error) {
    console.error('Falling back to local materials after Supabase read failed:', error);
    return toLocalMaterialRows();
  }
}

export async function getAdminMaterialById(id: string): Promise<AdminMaterialRecord | null> {
  if (!isSupabaseConfigured) {
    return (
      toLocalMaterialRows().find((material) => material.id === id || material.slug === id) ?? null
    );
  }

  const encodedId = encodeURIComponent(id);
  const accessToken = await getAdminAccessToken();
  const rows = await supabaseFetch<SupabaseMaterialRow[]>(
    `/materials?select=*&id=eq.${encodedId}&limit=1`,
    { accessToken },
  );
  return rows[0] ? { ...rows[0], source: 'supabase' } : null;
}

export function parseListField(value: FormDataEntryValue | null): string[] {
  return String(value ?? '')
    .split('\n')
    .flatMap((line) => line.split(','))
    .map((item) => item.trim())
    .filter(Boolean);
}

export function materialPayloadFromForm(formData: FormData) {
  return {
    slug: String(formData.get('slug') ?? '').trim(),
    name: String(formData.get('name') ?? '').trim(),
    category: String(formData.get('category') ?? 'Granito') as MaterialCategory,
    short_description: String(formData.get('short_description') ?? '').trim(),
    long_description: String(formData.get('long_description') ?? '').trim(),
    color: String(formData.get('color') ?? '').trim(),
    finish: String(formData.get('finish') ?? '').trim(),
    recommended_use: String(formData.get('recommended_use') ?? '').trim(),
    resistance: String(formData.get('resistance') ?? '').trim(),
    maintenance: String(formData.get('maintenance') ?? '').trim(),
    applications: parseListField(formData.get('applications')),
    benefits: parseListField(formData.get('benefits')),
    main_image: String(formData.get('main_image') ?? '').trim(),
    gallery: parseListField(formData.get('gallery')),
    related_slugs: parseListField(formData.get('related_slugs')),
    whatsapp_message: String(formData.get('whatsapp_message') ?? '').trim(),
    featured: formData.get('featured') === 'on',
    status: String(formData.get('status') ?? 'Borrador'),
    seo_title: String(formData.get('seo_title') ?? '').trim() || null,
    seo_description: String(formData.get('seo_description') ?? '').trim() || null,
    sort_order: Number(formData.get('sort_order') ?? 0),
  };
}
