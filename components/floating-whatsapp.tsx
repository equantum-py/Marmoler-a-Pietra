import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { whatsappUrl } from '@/lib/whatsapp';

export function FloatingWhatsapp() {
  return (
    <a
      href={whatsappUrl('Hola, quiero cotizar un proyecto con Marmolería Pietra.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Cotizar por WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_rgba(37,211,102,.35)] transition hover:scale-105 md:bottom-7 md:right-7 md:h-14 md:w-14"
    >
      <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
    </a>
  );
}
