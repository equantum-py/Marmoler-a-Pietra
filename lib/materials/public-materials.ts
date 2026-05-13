import { featuredMaterials as localFeaturedMaterials, materials as localMaterials } from '@/data/materials';

type MaterialLike = {
  slug: string;
  name: string;
  category: string;
  shortDescription?: string;
  short_description?: string;
  longDescription?: string;
  long_description?: string;
  recommendedUse?: string;
  recommended_use?: string;
  whatsappMessage?: string;
  whatsapp_message?: string;
  seoTitle?: string;
  seo_title?: string;
  seoDescription?: string;
  seo_description?: string;
  relatedSlugs?: string[];
  related_slugs?: string[];
  mainImage?: string;
  main_image?: string;
  image?: string;
  images?: string[];
  gallery?: string[];
  applications?: string[];
  benefits?: string[];
  color?: string;
  finish?: string;
  resistance?: string;
  maintenance?: string;
  featured?: boolean;
  status?: string;
  sort_order?: number;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function isSupabaseReady() {
  return Boolean(supabaseUrl && supabaseKey);
}

function normalizeRow(row: MaterialLike): MaterialLike {
  const mainImage = row.main_image || row.mainImage || row.image || row.images?.[0] || '';
  const gallery = Array.isArray(row.gallery) ? row.gallery : [];
  const images = Array.from(new Set([mainImage, ...(row.images || []), ...gallery].filter(Boolean)));

  return {
    ...row,
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

function normalizeRows(rows: MaterialLike[]) {
  return rows.map(normalizeRow);
}

function getLocalPublishedMaterials() {
  return normalizeRows(localMaterials as MaterialLike[]);
}

function getLocalFeaturedMaterials(limit = 8) {
  const featured = localFeaturedMaterials?.length
    ? (localFeaturedMaterials as MaterialLike[])
    : (localMaterials as MaterialLike[]).slice(0, limit);

  return normalizeRows(featured).slice(0, limit);
}

async function fetchSupabaseMaterials(query: string) {
  if (!isSupabaseReady()) {
    return null;
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/${query}`, {
      headers: {
        apikey: supabaseKey!,
        Authorization: `Bearer ${supabaseKey}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const rows = await response.json();

    return Array.isArray(rows) ? normalizeRows(rows) : [];
  } catch {
    return null;
  }
}

export async function getPublicMaterials() {
  const rows = await fetchSupabaseMaterials(
    'materials?status=eq.published&select=*&order=sort_order.asc',
  );

  return rows?.length ? rows : getLocalPublishedMaterials();
}

export async function getPublicFeaturedMaterials(limit = 8) {
  const rows = await fetchSupabaseMaterials(
    `materials?status=eq.published&featured=eq.true&select=*&order=sort_order.asc&limit=${limit}`,
  );

  if (rows?.length) {
    return rows;
  }

  return getLocalFeaturedMaterials(limit);
}

export async function getPublicMaterialBySlug(slug: string) {
  const rows = await fetchSupabaseMaterials(
    `materials?slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=*&limit=1`,
  );

  if (rows?.[0]) {
    return rows[0];
  }

  const local = (localMaterials as MaterialLike[]).find((material) => material.slug === slug);

  return local ? normalizeRow(local) : null;
}

export async function getPublicMaterialSlugs() {
  const localSlugs = (localMaterials as MaterialLike[]).map((material) => material.slug);

  const rows = await fetchSupabaseMaterials('materials?status=eq.published&select=slug');

  if (!rows?.length) {
    return localSlugs;
  }

  const supabaseSlugs = rows.map((row) => row.slug).filter(Boolean);

  return Array.from(new Set([...localSlugs, ...supabaseSlugs]));
}

export async function getRelatedPublicMaterials(material: MaterialLike) {
  const relatedSlugs = material.related_slugs || material.relatedSlugs || [];

  const related = await Promise.all(
    relatedSlugs.slice(0, 4).map((slug) => getPublicMaterialBySlug(slug)),
  );

  return related.filter(Boolean) as MaterialLike[];
}
