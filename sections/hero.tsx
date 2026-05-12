import Image from 'next/image';
import { ArrowDown, Play } from 'lucide-react';
import { motion } from '@/components/motion';
import { WhatsappLink } from '@/components/whatsapp-link';

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen items-end overflow-hidden pb-12 pt-32 md:items-center md:pb-0">
      <Image src="/images/proyectos/hero.svg" alt="Interior premium con mesada de piedra Pietra" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-pietra-black/60 via-pietra-black/35 to-pietra-black" />
      <div className="grain-overlay" />
      <div className="luxe-container relative z-10 grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-end">
        <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.45em] text-pietra-gold">Mármol · Granito · Cuarzo · Paraguay</p>
          <h1 className="max-w-5xl font-display text-5xl font-semibold leading-[0.88] text-pietra-warm md:text-8xl">Diseños en mármol y granito que transforman espacios</h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-pietra-cream/78 md:text-xl">Fabricación e instalación premium en Paraguay</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsappLink message="Hola, quiero cotizar una mesada similar." className="px-7 py-4">Cotizar por WhatsApp</WhatsappLink>
            <a href="#proyectos" className="inline-flex items-center justify-center gap-2 rounded-full border border-pietra-cream/20 px-7 py-4 text-sm font-semibold text-pietra-cream backdrop-blur transition hover:border-pietra-gold hover:text-pietra-gold">
              <Play className="h-4 w-4" /> Ver proyectos
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl md:ml-auto md:max-w-sm">
          <p className="font-display text-3xl text-pietra-cream">Desde 2008</p>
          <p className="mt-3 text-sm leading-7 text-pietra-stone/80">Especialistas en mesadas, revestimientos y piezas a medida con acabados profesionales garantizados.</p>
        </motion.div>
      </div>
      <a href="#beneficios" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-white/15 p-3 text-pietra-stone md:block" aria-label="Bajar">
        <ArrowDown className="h-5 w-5" />
      </a>
    </section>
  );
}
