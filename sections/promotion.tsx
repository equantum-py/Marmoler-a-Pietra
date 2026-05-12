import { Clock, MessageCircle } from 'lucide-react';
import { WhatsappLink } from '@/components/whatsapp-link';

export function Promotion() {
  return (
    <section className="bg-pietra-black px-4 py-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-pietra-gold/20 bg-radial-luxe p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.32em] text-pietra-gold"><Clock className="h-4 w-4" /> Cotización rápida vía WhatsApp</p>
            <h2 className="font-display text-4xl leading-none text-pietra-cream md:text-6xl">Enviá una foto o medida y recibí orientación inicial.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-pietra-stone/75">Ideal si estás definiendo una cocina, quincho, baño o revestimiento y querés saber qué material conviene.</p>
          </div>
          <WhatsappLink message="Hola, quiero una cotización rápida. Puedo enviar fotos y medidas." className="px-7 py-4"><MessageCircle className="h-4 w-4" /> Cotizar ahora</WhatsappLink>
        </div>
      </div>
    </section>
  );
}
