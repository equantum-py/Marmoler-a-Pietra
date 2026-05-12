import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { categories } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';

export function Categories() {
  return (
    <section id="ambientes" className="bg-pietra-background py-8 md:py-12">
      <div className="luxe-container">
        <SectionHeading title="Inspiración real para decidir mejor.">Organizamos la experiencia según el espacio que querés transformar: cocina, baño, quincho o revestimiento.</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <a key={category.name} href={whatsappUrl(category.message)} target="_blank" rel="noreferrer" className="group relative min-h-[180px] overflow-hidden rounded-md border border-pietra-border bg-white shadow-card">
              <Image src={category.image} alt={category.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 20vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-pietra-ink/82 via-pietra-ink/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/75">Ambiente</p>
                <h3 className="text-lg font-extrabold uppercase leading-tight">{category.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold">Ver opciones <ArrowRight className="h-3 w-3" /></p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
