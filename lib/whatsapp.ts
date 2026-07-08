const FALLBACK_WHATSAPP_NUMBER = '595984756158';

function normalizeWhatsappNumber(value: string) {
  return value.replace(/\D/g, '');
}

export function buildWhatsappUrl(message: string, whatsappNumber?: string | null) {
  const number = normalizeWhatsappNumber(whatsappNumber || FALLBACK_WHATSAPP_NUMBER);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function whatsappUrl(message: string) {
  return buildWhatsappUrl(message, FALLBACK_WHATSAPP_NUMBER);
}
