import { commercialBanners } from '@/data/site';
import { supabaseAnonKey, supabaseRestUrl } from '@/lib/supabase/config';

export type HomePromoCard = {
  id: string;
  eyebrow: string;
  title: string;
  cta_label: string;
  image_url: string;
  mobile_image_url?: string | null;
  whatsapp_message?: string | null;
  href?: string | null;
  status: string;
  sort_order: number;
};

export function getFallbackHomePromoCards(): HomePromoCard[] {
  return commercialBanners.map((banner, index) => ({
    id: `fallback-promo-${index}`,
    eyebrow: banner.eyebrow,
    title: banner.title,
    cta_label: banner.cta,
    image_url: banner.image,
    mobile_image_url: banner.image,
    whatsapp_message: banner.message,
    href: null,
    status: 'published',
    sort_order: index + 1,
  }));
}

export async function getPublishedHomePromoCards() {
  if (!supabaseRestUrl || !supabaseAnonKey) {
    return getFallbackHomePromoCards();
  }

  try {
    const response = await fetch(
      `${supabaseRestUrl}/home_promo_cards?select=*&status=eq.published&order=sort_order.asc`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return getFallbackHomePromoCards();
    }

    const cards = (await response.json()) as HomePromoCard[];

    return cards.length ? cards : getFallbackHomePromoCards();
  } catch {
    return getFallbackHomePromoCards();
  }
}
