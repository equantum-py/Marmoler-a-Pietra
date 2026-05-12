import { SectionHeading } from '@/components/section-heading';
import { materials } from '@/data/materials';
import { MaterialCard } from '@/components/material-card';

const catalogSlugs = ['verde-ubatuba', 'negro-san-gabriel', 'cafe-imperial', 'gris-corumba', 'blanco-dallas', 'blanco-itaunas', 'blanco-di-capri', 'neolith-calacatta'];
const catalog = materials.filter((material) => catalogSlugs.includes(material.slug));

export function MaterialsShowroom() {
  return (
    <section id="materiales" className="bg-pietra-background py-8 md:py-12">
      <div className="luxe-container">
        <SectionHeading title="Catálogo Pietra para cotizar.">Texturas, tonos y superficies seleccionadas para proyectos residenciales y comerciales.</SectionHeading>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {catalog.map((material) => (
            <MaterialCard key={material.slug} material={material} />
          ))}
        </div>
      </div>
    </section>
  );
}
