import { categories as fallbackCategories } from '@/data/site';
import { supabaseAnonKey, supabaseRestUrl } from '@/lib/supabase/config';

export type HomeCategory = {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  mobile_image_url?: string | null;
  whatsapp_message?: string | null;
  href?: string | null;
  status: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export function getFallbackHomeCategories(): HomeCategory[] {
  return fallbackCategories.map((category, index) => ({
    id: `fallback-${index}`,
    name: category.name,
    slug: category.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''),
    image_url: category.image,
    mobile_image_url: category.image,
    whatsapp_message: category.message,
    href: null,
    status: 'published',
    sort_order: index,
  }));
}

export async function getPublishedHomeCategories() {
  if (!supabaseRestUrl || !supabaseAnonKey) {
    return getFallbackHomeCategories();
  }

  try {
    const response = await fetch(
      `${supabaseRestUrl}/home_categories?select=*&status=eq.published&order=sort_order.asc`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return getFallbackHomeCategories();
    }

    const categories = (await response.json()) as HomeCategory[];

    return categories.length ? categories : getFallbackHomeCategories();
  } catch {
    return getFallbackHomeCategories();
  }
}
