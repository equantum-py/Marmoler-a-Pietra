import { revalidatePath } from 'next/cache';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseAnonKey, supabaseRestUrl } from '@/lib/supabase/config';
import { supabaseFetch } from '@/lib/supabase/client';
import type { MaterialFormState } from '@/lib/supabase/types';
import { buildWhatsappUrl } from '@/lib/whatsapp';

export const SITE_SETTINGS_ID = 'pietra';

export type SiteSettings = {
  id: string;
  whatsapp_number: string | null;
  phone: string | null;
  email: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  address: string | null;
  business_hours: string | null;
  logo_url: string | null;
  logo_desktop: string | null;
  logo_mobile: string | null;
  favicon_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  main_cta_text: string | null;
  main_cta_url: string | null;
  footer_text: string | null;
  institutional_text: string | null;
  company_name: string | null;
  created_at?: string;
  updated_at?: string;
};

export type PublicSiteSettings = SiteSettings & {
  whatsapp_url: string;
};

const defaultSettings: SiteSettings = {
  id: SITE_SETTINGS_ID,
  whatsapp_number: '595984756158',
  phone: '+595 984 756 158',
  email: 'info@marmoleriapietra.com.py',
  instagram_url: 'https://www.instagram.com/marmoleria_pietra',
  facebook_url: '',
  address: 'Asunción, Paraguay',
  business_hours: 'Lunes a viernes de 08:00 a 18:00. Sábados con cita previa.',
  logo_url: '/logo-pietra.svg',
  logo_desktop: '/logo-pietra.svg',
  logo_mobile: '/logo-pietra.svg',
  favicon_url: '/favicon.ico',
  seo_title: 'Marmolería Pietra | Mármol, Granito y Cuarzo Premium en Paraguay',
  seo_description:
    'Diseño, fabricación e instalación premium de mesadas de granito, mármol, cuarzo, revestimientos y piedra traslúcida en Paraguay.',
  main_cta_text: 'Cotizar por WhatsApp',
  main_cta_url: '',
  footer_text:
    'Especialistas en mármol, granito, cuarzo y piedras sinterizadas. Diseñamos, fabricamos e instalamos superficies premium en todo Paraguay.',
  institutional_text:
    'Marmolería Pietra diseña, fabrica e instala superficies premium a medida para proyectos residenciales y comerciales.',
  company_name: 'Marmolería Pietra',
};

function clean(value: FormDataEntryValue | null) {
  return String(value ?? '').trim();
}

function nullable(value: string) {
  return value ? value : null;
}

function normalizeWhatsappNumber(value: string) {
  return value.replace(/\D/g, '');
}

function isValidOptionalUrl(value: string) {
  if (!value) return true;
  if (value.startsWith('/')) return true;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function normalizeSiteSettings(row: Partial<SiteSettings> | null | undefined): SiteSettings {
  const settings = { ...defaultSettings, ...(row ?? {}) };

  return {
    ...settings,
    id: settings.id || SITE_SETTINGS_ID,
    whatsapp_number: settings.whatsapp_number || defaultSettings.whatsapp_number,
    phone: settings.phone || defaultSettings.phone,
    email: settings.email || defaultSettings.email,
    instagram_url: settings.instagram_url || defaultSettings.instagram_url,
    facebook_url: settings.facebook_url || '',
    address: settings.address || defaultSettings.address,
    business_hours: settings.business_hours || defaultSettings.business_hours,
    logo_url: settings.logo_url || settings.logo_desktop || defaultSettings.logo_url,
    logo_desktop: settings.logo_desktop || settings.logo_url || defaultSettings.logo_desktop,
    logo_mobile: settings.logo_mobile || settings.logo_url || defaultSettings.logo_mobile,
    favicon_url: settings.favicon_url || defaultSettings.favicon_url,
    seo_title: settings.seo_title || defaultSettings.seo_title,
    seo_description: settings.seo_description || defaultSettings.seo_description,
    main_cta_text: settings.main_cta_text || defaultSettings.main_cta_text,
    main_cta_url: settings.main_cta_url || '',
    footer_text: settings.footer_text || defaultSettings.footer_text,
    institutional_text: settings.institutional_text || defaultSettings.institutional_text,
    company_name: settings.company_name || defaultSettings.company_name,
  };
}

export function getDefaultSiteSettings() {
  return normalizeSiteSettings(null);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  await requireAdminUser();

  if (!supabaseRestUrl || !supabaseAnonKey) {
    return getDefaultSiteSettings();
  }

  const accessToken = await getAdminAccessToken();

  const rows = await supabaseFetch<SiteSettings[]>(
    `/site_settings?id=eq.${SITE_SETTINGS_ID}&select=*&limit=1`,
    { accessToken },
  );

  return normalizeSiteSettings(rows[0]);
}

export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  if (!supabaseRestUrl || !supabaseAnonKey) {
    const fallback = getDefaultSiteSettings();
    return { ...fallback, whatsapp_url: buildWhatsappUrl('', fallback.whatsapp_number) };
  }

  try {
    const response = await fetch(
      `${supabaseRestUrl}/site_settings?id=eq.${SITE_SETTINGS_ID}&select=*&limit=1`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      const fallback = getDefaultSiteSettings();
      return { ...fallback, whatsapp_url: buildWhatsappUrl('', fallback.whatsapp_number) };
    }

    const rows = (await response.json()) as SiteSettings[];
    const settings = normalizeSiteSettings(rows[0]);
    return { ...settings, whatsapp_url: buildWhatsappUrl('', settings.whatsapp_number) };
  } catch {
    const fallback = getDefaultSiteSettings();
    return { ...fallback, whatsapp_url: buildWhatsappUrl('', fallback.whatsapp_number) };
  }
}

export async function saveSiteSettings(
  _state: MaterialFormState,
  formData: FormData,
): Promise<MaterialFormState> {
  await requireAdminUser();

  if (!supabaseRestUrl || !supabaseAnonKey) {
    return { ok: false, message: 'Supabase no está configurado.' };
  }

  const whatsappNumber = normalizeWhatsappNumber(clean(formData.get('whatsapp_number')));
  const email = clean(formData.get('email'));
  const instagramUrl = clean(formData.get('instagram_url'));
  const facebookUrl = clean(formData.get('facebook_url'));
  const logoUrl = clean(formData.get('logo_url'));
  const logoDesktop = clean(formData.get('logo_desktop')) || logoUrl;
  const logoMobile = clean(formData.get('logo_mobile')) || logoUrl;
  const faviconUrl = clean(formData.get('favicon_url'));
  const mainCtaUrl = clean(formData.get('main_cta_url'));
  const seoTitle = clean(formData.get('seo_title'));
  const seoDescription = clean(formData.get('seo_description'));

  if (!whatsappNumber) {
    return { ok: false, message: 'El número de WhatsApp es obligatorio.' };
  }

  if (!email || !email.includes('@')) {
    return { ok: false, message: 'Ingresá un email válido.' };
  }

  if (!seoTitle || seoTitle.length < 10) {
    return { ok: false, message: 'El SEO title debe tener al menos 10 caracteres.' };
  }

  if (!seoDescription || seoDescription.length < 30) {
    return { ok: false, message: 'La SEO description debe tener al menos 30 caracteres.' };
  }

  const urls = [instagramUrl, facebookUrl, logoUrl, logoDesktop, logoMobile, faviconUrl, mainCtaUrl];
  if (urls.some((url) => !isValidOptionalUrl(url))) {
    return { ok: false, message: 'Las URLs deben empezar con https://, http:// o /.' };
  }

  const payload = {
    id: SITE_SETTINGS_ID,
    whatsapp_number: whatsappNumber,
    phone: nullable(clean(formData.get('phone'))),
    email,
    instagram_url: nullable(instagramUrl),
    facebook_url: nullable(facebookUrl),
    address: nullable(clean(formData.get('address'))),
    business_hours: nullable(clean(formData.get('business_hours'))),
    logo_url: nullable(logoUrl || logoDesktop),
    logo_desktop: nullable(logoDesktop),
    logo_mobile: nullable(logoMobile),
    favicon_url: nullable(faviconUrl),
    seo_title: seoTitle,
    seo_description: seoDescription,
    main_cta_text: nullable(clean(formData.get('main_cta_text'))),
    main_cta_url: nullable(mainCtaUrl),
    footer_text: nullable(clean(formData.get('footer_text'))),
    institutional_text: nullable(clean(formData.get('institutional_text'))),
    company_name: nullable(clean(formData.get('company_name'))),
  };

  const accessToken = await getAdminAccessToken();

  await supabaseFetch<SiteSettings[]>('/site_settings?on_conflict=id', {
    method: 'POST',
    accessToken,
    prefer: 'resolution=merge-duplicates,return=representation',
    body: payload,
  });

  revalidatePath('/admin/configuracion');
  revalidatePath('/');
  revalidatePath('/proyectos');
  revalidatePath('/materiales/[slug]', 'page');

  return { ok: true, message: 'Configuración general actualizada correctamente.' };
}
