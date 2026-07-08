import { getPublicSiteSettings } from '@/lib/site-settings';
import { buildWhatsappUrl } from '@/lib/whatsapp';

export async function getWhatsappUrl(message: string) {
  const settings = await getPublicSiteSettings();
  return buildWhatsappUrl(message, settings.whatsapp_number);
}
