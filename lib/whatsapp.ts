const DEFAULT_WHATSAPP_NUMBER = '595984756158';

export function whatsappUrl(message: string, customNumber?: string | null) {
  const number = (customNumber || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
