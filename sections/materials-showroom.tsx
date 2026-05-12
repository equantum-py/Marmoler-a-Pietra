import Image from 'next/image';
import { SectionHeading } from '@/components/section-heading';
import { materials } from '@/data/materials';
import { whatsappUrl } from '@/lib/whatsapp';

const catalogSlugs = ['verde-ubatuba', 'negro-san-gabriel', 'cafe-imperial', 'gris-corumba', 'blanco-dallas', 'blanco-itaunas', 'blanco-di-capri', 'neolith-calacatta'];
const catalog = materials.filter((material) => catalogSlugs.includes(material.slug));

export function MaterialsShowroom() {
  return (
    <section id="materiales" className="bg-pietra-background py-8 md:py-12">
      <div className="luxe-container">
        <SectionHeading title="Catálogo Pietra para cotizar.">Texturas, tonos y superficies seleccionadas para proyectos residenciales y comerciales.</SectionHeading>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {catalog.map((material) => (
            <article key={material.slug} className="product-card overflow-hidden rounded-md">
              <div className="relative aspect-[1.8/1] bg-pietra-border">
                <Image src={material.image} alt={material.name} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
                <span className="absolute left-3 top-3 rounded-sm bg-pietra-ink/70 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">{material.category}</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="mb-3 min-h-10 text-sm font-extrabold text-pietra-ink md:text-base">{material.name}</h3>
                <a href={whatsappUrl(`Hola, quiero cotizar ${material.name}.`)} target="_blank" rel="noreferrer" className="inline-flex min-h-9 w-full items-center justify-center rounded bg-pietra-green px-4 text-xs font-extrabold uppercase text-white transition hover:bg-pietra-sage">Cotizar</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
