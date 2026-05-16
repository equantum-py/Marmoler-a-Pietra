import { supabaseAnonKey, supabaseRestUrl } from '@/lib/supabase/config';

export type HomePromotion = {
  id: string;
  placement: string;
  name: string;
  media_type: 'image' | 'video' | string;
  desktop_media_url: string;
  mobile_media_url?: string | null;
  poster_url?: string | null;
  href?: string | null;
  alt_text?: string | null;
  status: string;
  sort_order: number;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

export async function getPublishedHomePromotions(placement = 'home-wide') {
  if (!supabaseRestUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const response = await fetch(
      `${supabaseRestUrl}/home_promotions?select=*&placement=eq.${placement}&status=eq.published&order=sort_order.asc`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) return [];

    return (await response.json()) as HomePromotion[];
  } catch {
    return [];
  }
}
