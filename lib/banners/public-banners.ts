import { supabaseAnonKey, supabaseRestUrl } from '@/lib/supabase/config';

export type HomeBannerPlacement =
  | 'hero'
  | 'ambiente-cocinas'
  | 'ambiente-banos'
  | 'ambiente-quinchos'
  | 'ambiente-revestimientos'
  | 'ambiente-escaleras'
  | 'promo-1'
  | 'promo-2'
  | 'promo-3'
  | 'side-promo';

export type HomeBanner = {
  id: string;
  placement: HomeBannerPlacement;
  title?: string | null;
  cta_url?: string | null;
  desktop_image: string;
  mobile_image?: string | null;
  status: 'published' | 'draft' | 'archived';
  sort_order: number;
};

export async function getPublishedHomeBanners() {
  if (!supabaseRestUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const response = await fetch(
      `${supabaseRestUrl}/home_banners?select=*&status=eq.published&order=sort_order.asc`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) return [];

    return (await response.json()) as HomeBanner[];
  } catch {
    return [];
  }
}

export async function getHomeBannerByPlacement(placement: HomeBannerPlacement) {
  const banners = await getPublishedHomeBanners();

  return banners.find((banner) => banner.placement === placement) ?? null;
}
