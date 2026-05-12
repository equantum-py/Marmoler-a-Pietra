import { WhatsappLink } from '@/components/whatsapp-link';

export function FinalCta() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-pietra-black py-24 text-center md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,167,106,.15),transparent_36rem)]" />
      <div className="luxe-container relative">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-pietra-gold">Convertí tu idea en una pieza Pietra</p>
        <h2 className="mx-auto max-w-4xl font-display text-5xl font-semibold leading-[0.9] text-pietra-cream md:text-8xl">Tu próximo espacio puede sentirse diseñado, no simplemente construido.</h2>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-pietra-stone/75">Contanos qué ambiente querés transformar y te guiamos por WhatsApp con opciones de materiales, terminaciones y próximos pasos.</p>
        <WhatsappLink message="Hola Pietra, quiero transformar un espacio y necesito asesoramiento." className="mt-9 px-8 py-4">Hablar con un asesor</WhatsappLink>
      </div>
    </section>
  );
}
