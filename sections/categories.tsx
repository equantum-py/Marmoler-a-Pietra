import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { getPublishedHomeCategories } from '@/lib/categories/public-categories';
import { buildWhatsappUrl } from '@/lib/whatsapp';
import { getPublicSiteSettings } from '@/lib/site-settings';

export async function Categories() {
  const [categories, settings] = await Promise.all([
    getPublishedHomeCategories(),
    getPublicSiteSettings(),
  ]);

  if (!categories.length) {
    return null;
  }

  const environmentPriority = ['cocinas', 'baños', 'quinchos', 'revestimientos'];
  const orderedCategories = [...categories].sort((a, b) => {
    const aIndex = environmentPriority.indexOf(a.name.toLocaleLowerCase('es'));
    const bIndex = environmentPriority.indexOf(b.name.toLocaleLowerCase('es'));
    return (
      (aIndex === -1 ? environmentPriority.length : aIndex) -
      (bIndex === -1 ? environmentPriority.length : bIndex)
    );
  });

  return (
    <section
      id="ambientes"
      className="bg-pietra-background py-6 sm:py-8 md:py-12"
      aria-label="Ambientes"
    >
      <div className="luxe-container">
        <div className="mb-4 sm:mb-5 md:mb-7">
          <SectionHeading title="Inspiración real para decidir mejor.">
            Elegí por ambiente y cotizá más rápido tu cocina, baño, quincho o revestimiento.
          </SectionHeading>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 lg:gap-5">
          {orderedCategories.map((category) => {
            const href =
              category.href ||
              buildWhatsappUrl(
                category.whatsapp_message ||
                  `Hola, quiero cotizar ${category.name} con Marmolería Pietra.`,
                settings.whatsapp_number,
              );

            const image = category.mobile_image_url || category.image_url;

            return (
              <a
                key={category.id}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={`Ver opciones de ${category.name}`}
                className="group relative h-[146px] min-w-0 overflow-hidden rounded-xl border border-pietra-border bg-white shadow-card transition duration-300 active:scale-[0.99] hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pietra-green min-[390px]:h-[154px] sm:h-[174px] sm:w-[calc(50%-0.5rem)] md:w-[260px] lg:h-[180px] lg:w-[250px] xl:w-[270px]"
              >
                <Image
                  src={image}
                  alt={category.name}
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 270px, (min-width: 1024px) 250px, (min-width: 768px) 260px, 50vw"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-pietra-ink/95 via-pietra-ink/45 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute bottom-0 left-0 right-0 p-3.5 text-white sm:p-4 md:p-5">
                  <p className="mb-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white sm:mb-1 sm:text-xs">
                    Ambiente
                  </p>

                  <h3 className="text-[15px] font-extrabold uppercase leading-tight min-[390px]:text-base md:text-lg">
                    {category.name}
                  </h3>

                  <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-white min-[390px]:text-[13px] md:mt-1.5 md:text-sm">
                    Ver opciones <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
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
