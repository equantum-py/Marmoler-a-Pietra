import { materials as localMaterials } from '@/data/materials';

type AnyMaterial = Record<string, any>;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function isSupabaseReady() {
  return Boolean(supabaseUrl && supabaseKey);
}

function normalizeRow(row: AnyMaterial): AnyMaterial {
  const mainImage = row.main_image || row.mainImage || row.image || row.images?.[0] || '';
  const gallery = Array.isArray(row.gallery) ? row.gallery : [];
  const images = [mainImage, ...gallery].filter(Boolean);

  return {
    ...row,
    slug: row.slug,
    name: row.name,
    category: row.category,

    shortDescription: row.short_description || row.shortDescription || '',
    short_description: row.short_description || row.shortDescription || '',

    longDescription: row.long_description || row.longDescription || '',
    long_description: row.long_description || row.longDescription || '',

    recommendedUse: row.recommended_use || row.recommendedUse || '',
    recommended_use: row.recommended_use || row.recommendedUse || '',

    whatsappMessage: row.whatsapp_message || row.whatsappMessage || '',
    whatsapp_message: row.whatsapp_message || row.whatsappMessage || '',

    seoTitle: row.seo_title || row.seoTitle || '',
    seo_title: row.seo_title || row.seoTitle || '',

    seoDescription: row.seo_description || row.seoDescription || '',
    seo_description: row.seo_description || row.seoDescription || '',

    relatedSlugs: row.related_slugs || row.relatedSlugs || [],
    related_slugs: row.related_slugs || row.relatedSlugs || [],

    main_image: mainImage,
    mainImage,
    image: mainImage,
    images,
    gallery,

    applications: Array.isArray(row.applications) ? row.applications : [],
    benefits: Array.isArray(row.benefits) ? row.benefits : [],
  };
}

function localBySlug(slug: string) {
  return localMaterials.find((material: AnyMaterial) => material.slug === slug);
}

export async function getPublicMaterialBySlug(slug: string) {
  if (!isSupabaseReady()) {
    const local = localBySlug(slug);
    return local ? normalizeRow(local) : null;
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/materials?slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=*`,
      {
        headers: {
          apikey: supabaseKey!,
          Authorization: `Bearer ${supabaseKey}`,
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const rows = await response.json();

    if (Array.isArray(rows) && rows[0]) {
      return normalizeRow(rows[0]);
    }
  } catch {
    const local = localBySlug(slug);
    return local ? normalizeRow(local) : null;
  }

  const local = localBySlug(slug);
  return local ? normalizeRow(local) : null;
}

export async function getPublicMaterialSlugs() {
  const localSlugs = localMaterials.map((material: AnyMaterial) => material.slug);

  if (!isSupabaseReady()) {
    return localSlugs;
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/materials?status=eq.published&select=slug`,
      {
        headers: {
          apikey: supabaseKey!,
          Authorization: `Bearer ${supabaseKey}`,
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const rows = await response.json();
    const supabaseSlugs = Array.isArray(rows)
      ? rows.map((row) => row.slug).filter(Boolean)
      : [];

    return Array.from(new Set([...localSlugs, ...supabaseSlugs]));
  } catch {
    return localSlugs;
  }
}

export async function getRelatedPublicMaterials(material: AnyMaterial) {
  const relatedSlugs = material.related_slugs || material.relatedSlugs || [];

  const related = await Promise.all(
    relatedSlugs.slice(0, 4).map((slug: string) => getPublicMaterialBySlug(slug)),
  );

  return related.filter(Boolean);
}
