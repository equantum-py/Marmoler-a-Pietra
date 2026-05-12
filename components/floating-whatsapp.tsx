import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/whatsapp';

export function FloatingWhatsapp() {
  return (
    <a
      href={whatsappUrl('Hola, quiero cotizar un proyecto con Marmolería Pietra.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Cotizar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_rgba(37,211,102,.35)] transition hover:scale-105 md:bottom-7 md:right-7"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
