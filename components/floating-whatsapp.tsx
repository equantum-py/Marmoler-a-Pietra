import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { getWhatsappUrl } from '@/lib/whatsapp-server';

export async function FloatingWhatsapp() {
  const href = await getWhatsappUrl('Hola, quiero cotizar un proyecto con Marmolería Pietra.');

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Cotizar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_rgba(37,211,102,.35)] transition hover:scale-105 md:bottom-7 md:right-7"
    >
      <WhatsappIcon className="h-7 w-7" />
    </a>
  );
}
