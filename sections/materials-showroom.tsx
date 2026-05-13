import { MaterialCard } from '@/components/material-card';
import { SectionHeading } from '@/components/section-heading';
import { WhatsappLink } from '@/components/whatsapp-link';
import { getPublicFeaturedMaterials, getPublicMaterials } from '@/lib/materials/public-materials';

export async function MaterialsShowroom() {
  const highlightedMaterials = await getPublicFeaturedMaterials(8);
  const allMaterials = await getPublicMaterials();

  const secondaryMaterials = allMaterials
    .filter((material) => !highlightedMaterials.some((item) => item.slug === material.slug))
    .slice(0, 6);

  return (
    <section id="materiales" className="bg-white py-16 text-pietra-black md:py-24">
      <div className="luxe-container">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Materiales más consultados"
            title="Catálogo Pietra para cotizar."
          >
            Texturas, tonos y superficies seleccionadas para proyectos residenciales y comerciales.
          </SectionHeading>

          <WhatsappLink
            message="Hola Pietra, quiero asesoramiento para elegir un material para mi proyecto."
            className="w-fit px-6 py-3"
          >
            Asesoramiento por WhatsApp
          </WhatsappLink>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlightedMaterials.map((material) => (
            <MaterialCard key={material.slug} material={material} />
          ))}
        </div>

        {secondaryMaterials.length > 0 ? (
          <div className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
            <div>
              <div className="mb-8">
                <SectionHeading eyebrow="Más opciones" title="Colección de superficies.">
                  Más alternativas para cocinas, baños, quinchos, barras y revestimientos.
                </SectionHeading>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {secondaryMaterials.map((material) => (
                  <MaterialCard key={material.slug} material={material} />
                ))}
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-pietra-border bg-pietra-warm shadow-sm">
              <div className="absolute inset-0 bg-[linear-gradient(110deg,#f7f2ea_0_24%,#2f302b_24%_27%,#ddd2c3_27%_60%,#4A6356_60%_64%,#c8b9a4_64%_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pietra-black/70 via-pietra-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-pietra-warm">
                  Proyecto a medida
                </p>
                <h3 className="max-w-md text-4xl font-semibold leading-none md:text-5xl">
                  Cocinas a medida con superficies premium.
                </h3>
                <WhatsappLink
                  message="Hola Pietra, quiero cotizar una cocina a medida con superficie premium."
                  className="mt-7 bg-white px-6 py-3 text-pietra-black hover:bg-pietra-warm"
                >
                  Cotizar proyecto
                </WhatsappLink>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
