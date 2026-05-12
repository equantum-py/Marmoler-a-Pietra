import Image from 'next/image';
import { SectionHeading } from '@/components/section-heading';
import { materials } from '@/data/materials';
import { whatsappUrl } from '@/lib/whatsapp';

const surfaceSlugs = ['cuarzo-rojo', 'cuarzo-beige', 'cuarzo-negro', 'marmol-travertino', 'marmol-blanco', 'marron-emperador'];
const surfaces = materials.filter((material) => surfaceSlugs.includes(material.slug));

export function Projects() {
  return (
    <section id="proyectos" className="bg-pietra-background py-8 md:py-12">
      <div className="luxe-container">
        <SectionHeading title="Colección de superficies." />
        <div className="grid gap-5 lg:grid-cols-[1fr_1.35fr]">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {surfaces.map((material) => (
              <article key={material.slug} className="product-card overflow-hidden rounded-md">
                <div className="relative aspect-[1.8/1]">
                  <Image src={material.image} alt={material.name} fill className="object-cover" sizes="(min-width: 1024px) 14vw, 50vw" />
                  <span className="absolute left-2 top-2 rounded-sm bg-pietra-ink/65 px-2 py-1 text-[10px] font-extrabold uppercase text-white">{material.category}</span>
                </div>
                <div className="p-3 text-center">
                  <h3 className="mb-2 min-h-9 text-sm font-extrabold text-pietra-ink">{material.name}</h3>
                  <a href={whatsappUrl(`Hola, quiero cotizar ${material.name}.`)} target="_blank" rel="noreferrer" className="inline-flex min-h-8 w-full items-center justify-center rounded bg-pietra-green px-3 text-[11px] font-extrabold uppercase text-white transition hover:bg-pietra-sage">Cotizar</a>
                </div>
              </article>
            ))}
          </div>
          <a href={whatsappUrl('Hola, quiero una cocina a medida con superficies premium.')} target="_blank" rel="noreferrer" className="group relative min-h-[360px] overflow-hidden rounded-md border border-pietra-border bg-pietra-ink shadow-card">
            <Image src="/images/showroom/kitchen-large.svg" alt="Cocinas a medida con superficies premium" fill className="object-cover opacity-86 transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 60vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-pietra-ink/75 via-pietra-ink/35 to-transparent" />
            <div className="relative z-10 flex min-h-[360px] max-w-md flex-col justify-center p-8 text-white">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em]">Cocinas a medida</p>
              <h3 className="mt-3 font-display text-4xl font-bold leading-tight">con superficies premium</h3>
              <span className="mt-6 inline-flex min-h-11 w-fit items-center justify-center rounded-md border border-white bg-pietra-green/88 px-6 text-sm font-extrabold transition group-hover:bg-white group-hover:text-pietra-green">Cotizar mi proyecto</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
