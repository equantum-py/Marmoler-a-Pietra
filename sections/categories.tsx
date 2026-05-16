import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { getPublishedHomeCategories } from '@/lib/categories/public-categories';
import { whatsappUrl } from '@/lib/whatsapp';

export async function Categories() {
  const categories = await getPublishedHomeCategories();

  if (!categories.length) {
    return null;
  }

  return (
    <section id="ambientes" className="bg-pietra-background py-8 md:py-12">
      <div className="luxe-container">
        <div className="mb-5 md:mb-7">
          <SectionHeading title="Inspiración real para decidir mejor.">
            Elegí por ambiente y cotizá más rápido tu cocina, baño, quincho o revestimiento.
          </SectionHeading>
        </div>

        <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 sm:overflow-visible sm:px-0 lg:gap-5">
          {categories.map((category) => {
            const href =
              category.href ||
              whatsappUrl(
                category.whatsapp_message ||
                  `Hola, quiero cotizar ${category.name} con Marmolería Pietra.`,
              );

            const image = category.mobile_image_url || category.image_url;

            return (
              <a
                key={category.id}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="group relative h-[128px] w-[68vw] shrink-0 snap-start overflow-hidden rounded-xl border border-pietra-border bg-white shadow-card sm:h-[170px] sm:w-[calc(50%-0.5rem)] sm:shrink md:w-[260px] lg:h-[180px] lg:w-[250px] xl:w-[270px]"
              >
                <Image
                  src={image}
                  alt={category.name}
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 270px, (min-width: 1024px) 250px, (min-width: 768px) 260px, 68vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-pietra-ink/85 via-pietra-ink/25 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:p-5">
                  <p className="mb-1 text-[8px] font-extrabold uppercase tracking-[0.18em] text-white/75 md:text-[10px]">
                    Ambiente
                  </p>

                  <h3 className="text-base font-extrabold uppercase leading-tight md:text-lg">
                    {category.name}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold md:text-xs">
                    Ver opciones <ArrowRight className="h-3 w-3" />
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
