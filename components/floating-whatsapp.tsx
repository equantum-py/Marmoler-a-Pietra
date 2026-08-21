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
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(31,31,28,.22)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pietra-green md:bottom-7 md:right-7 md:h-14 md:w-14"
    >
      <WhatsappIcon className="h-6 w-6 md:h-7 md:w-7" />
    </a>
  );
}
