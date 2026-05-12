import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { WhatsappLink } from '@/components/whatsapp-link';
import { featuredMaterials, materials } from '@/data/materials';
import { whatsappUrl } from '@/lib/whatsapp';

export function MaterialsShowroom() {
  return (
    <section id="materiales" className="relative overflow-hidden bg-pietra-cream py-24 text-pietra-black md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(111,115,86,.18),transparent_34rem)]" />
      <div className="luxe-container relative">
        <SectionHeading dark eyebrow="Showroom premium" title="Catálogo Pietra curado para decidir mejor.">Granitos, cuarzos, mármoles y piezas especiales presentados como superficies de arquitectura, no como una grilla tradicional.</SectionHeading>
        <div className="grid gap-5 lg:grid-cols-4">
          {featuredMaterials.map((material, index) => (
            <article key={material.slug} className={`group overflow-hidden rounded-[2.2rem] bg-pietra-black text-pietra-cream shadow-glow ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={material.image} alt={material.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-pietra-cream/10 px-4 py-2 text-xs uppercase tracking-[0.24em] backdrop-blur">{material.category}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-4xl">{material.name}</h3>
                <p className="mt-3 text-sm leading-7 text-pietra-stone/80">{material.description}</p>
                <ul className="mt-5 grid gap-2 text-xs uppercase tracking-[0.18em] text-pietra-gold/80">
                  {material.benefits.map((benefit) => <li key={benefit}>· {benefit}</li>)}
                </ul>
                <WhatsappLink message={`Hola, quiero cotizar ${material.name} para mi proyecto.`} className="mt-6 w-full">Cotizar material</WhatsappLink>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((material) => (
            <a key={material.slug} href={whatsappUrl(`Hola, quiero cotizar ${material.name}.`)} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-pietra-black/10 bg-white/55 p-3 transition hover:border-pietra-olive/40 hover:bg-white">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl"><Image src={material.image} alt={material.name} fill className="object-cover" sizes="80px" /></div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-pietra-olive">{material.category}</p>
                <h4 className="truncate font-display text-2xl text-pietra-black">{material.name}</h4>
              </div>
              <ArrowUpRight className="h-5 w-5 text-pietra-olive transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
