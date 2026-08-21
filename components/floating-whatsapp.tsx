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
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(.75rem,env(safe-area-inset-right))] z-40 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_rgba(31,31,28,.2)] transition duration-200 hover:scale-105 hover:bg-[#1FAF55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1F5A3D] active:scale-95 min-[390px]:right-[max(1rem,env(safe-area-inset-right))] min-[390px]:h-12 min-[390px]:w-12 md:bottom-7 md:right-7 md:h-14 md:w-14"
    >
      <WhatsappIcon className="h-[22px] w-[22px] min-[390px]:h-6 min-[390px]:w-6 md:h-7 md:w-7" />
    </a>
  );
}
