import { supabaseAnonKey, supabaseRestUrl } from '@/lib/supabase/config';

export type HomeBanner = {
  id: string;
  placement: string;
  name: string;
  is_active: boolean;
  status: 'published' | 'draft' | 'archived';
  sort_order: number;

  desktop_image_url: string;
  mobile_image_url: string;
  tablet_image_url?: string | null;
  alt_text?: string | null;

  eyebrow?: string | null;
  title: string;
  highlighted_text?: string | null;
  subtitle?: string | null;

  primary_cta_label?: string | null;
  primary_cta_href?: string | null;
  secondary_cta_label?: string | null;
  secondary_cta_href?: string | null;
  whatsapp_message?: string | null;

  text_position?: 'left' | 'center' | 'right' | string | null;
  vertical_position?: 'top' | 'center' | 'bottom' | string | null;
  object_position_desktop?: string | null;
  object_position_mobile?: string | null;

  starts_at?: string | null;
  ends_at?: string | null;
};

export const fallbackHomeBanner: HomeBanner = {
  id: 'fallback-hero',
  placement: 'hero',
  name: 'Banner principal por defecto',
  is_active: true,
  status: 'published',
  sort_order: 0,
  desktop_image_url: '/images/showroom/kitchen-hero.svg',
  mobile_image_url: '/images/showroom/kitchen-hero.svg',
  alt_text: 'Superficies premium de Marmolería Pietra',
  eyebrow: 'Showroom premium en Paraguay',
  title: 'Lujo en cada detalle',
  highlighted_text: 'Granitos',
  subtitle: 'Proveemos e instalamos mesadas, revestimientos y superficies a medida para elevar el valor de tu espacio.',
  primary_cta_label: 'Solicitar cotización',
  primary_cta_href: '',
  whatsapp_message: 'Hola Pietra, quiero cotizar un proyecto con superficies premium.',
  text_position: 'left',
  vertical_position: 'center',
  object_position_desktop: 'center center',
  object_position_mobile: 'center center',
};

function isBannerInsideDateRange(banner: HomeBanner) {
  const now = Date.now();

  if (banner.starts_at && new Date(banner.starts_at).getTime() > now) {
    return false;
  }

  if (banner.ends_at && new Date(banner.ends_at).getTime() < now) {
    return false;
  }

  return true;
}

export async function getPublishedHomeBanners() {
  if (!supabaseRestUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const response = await fetch(
      `${supabaseRestUrl}/home_banners?select=*&is_active=eq.true&status=eq.published&order=sort_order.asc`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) return [];

    const banners = (await response.json()) as HomeBanner[];

    return banners.filter(isBannerInsideDateRange);
  } catch {
    return [];
  }
}

export async function getHomeBannerByPlacement(placement: string) {
  const banners = await getPublishedHomeBanners();

  return banners.find((banner) => banner.placement === placement) ?? null;
}
