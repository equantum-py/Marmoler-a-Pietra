import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { WhatsappLink } from '@/components/whatsapp-link';
import { getPublicFeaturedMaterials, getPublicMaterials } from '@/lib/materials/public-materials';
import { getPublishedHomePromotions, type HomePromotion } from '@/lib/promotions/public-promotions';

type HomeMaterial = {
  slug: string;
  name: string;
  category: string;
  images?: string[];
  image?: string;
  shortDescription?: string;
};

function HomeMaterialCard({ material }: { material: HomeMaterial }) {
  const image = material.images?.[0] || material.image || '';

  return (
    <article className="group overflow-hidden rounded-xl border border-pietra-border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/materiales/${material.slug}`}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-pietra-green"
        aria-label={`Ver material ${material.name}`}
      >
        <div className="relative h-32 overflow-hidden bg-pietra-warm sm:h-44 lg:h-52">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={material.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-pietra-border to-pietra-warm" />
          )}

          <span className="absolute left-2 top-2 rounded bg-pietra-black px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white sm:left-3 sm:top-3 sm:text-[10px]">
            {material.category}
          </span>
        </div>

        <div className="p-3 text-center sm:p-4">
          <h3 className="line-clamp-1 text-[13px] font-semibold leading-tight text-pietra-black sm:text-base">
            {material.name}
          </h3>

          {material.shortDescription ? (
            <p className="mt-1 line-clamp-2 min-h-[34px] text-[11px] leading-4 text-pietra-muted sm:mt-2 sm:text-sm sm:leading-6">
              {material.shortDescription}
            </p>
          ) : null}

          <span className="mt-3 flex h-8 items-center justify-center rounded bg-pietra-green text-[9px] font-bold uppercase tracking-[0.1em] text-white transition group-hover:bg-pietra-greenMuted sm:h-10 sm:text-xs">
            Ver material
          </span>
        </div>
      </Link>
    </article>
  );
}

function MaterialSidePromotion({ promotion }: { promotion?: HomePromotion }) {
  const mediaUrl = promotion?.desktop_media_url || '';
  const posterUrl = promotion?.poster_url || undefined;
  const isVideo = promotion?.media_type === 'video' && mediaUrl;

  return (
    <div className="hidden min-h-[420px] overflow-hidden rounded-[1.75rem] border border-pietra-border bg-pietra-warm shadow-sm lg:relative lg:block">
      {isVideo ? (
        <video
          src={mediaUrl}
          poster={posterUrl}
          autoPlay={promotion?.autoplay ?? true}
          muted={promotion?.muted ?? true}
          loop={promotion?.loop ?? true}
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : mediaUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={mediaUrl}
          alt={promotion?.alt_text || promotion?.name || 'Proyecto a medida Marmolería Pietra'}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#f7f2ea_0_24%,#2f302b_24%_27%,#ddd2c3_27%_60%,#4A6356_60%_64%,#c8b9a4_64%_100%)]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-pietra-black/75 via-pietra-black/25 to-transparent" />

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
  );
}

export async function MaterialsShowroom() {
  const highlightedMaterials = await getPublicFeaturedMaterials(8);
  const allMaterials = await getPublicMaterials();
  const materialPromotions = await getPublishedHomePromotions('materials-side-card');
  const sidePromotion = materialPromotions.find((promotion) => promotion.desktop_media_url);

  const primaryMaterials =
    highlightedMaterials.length > 0 ? highlightedMaterials : allMaterials.slice(0, 8);

  const secondaryMaterials = allMaterials
    .filter((material) => !primaryMaterials.some((item) => item.slug === material.slug))
    .slice(0, 6);

  return (
    <section id="materiales" className="bg-white py-10 text-pietra-black sm:py-14 md:py-24">
      <div className="luxe-container">
        <div className="mb-6 grid gap-5 md:mb-10 md:grid-cols-[1fr_auto] md:items-end">
          <SectionHeading
            eyebrow="Materiales más consultados"
            title="Catálogo Pietra para cotizar."
          >
            Texturas, tonos y superficies seleccionadas para cocinas, baños, quinchos y revestimientos.
          </SectionHeading>

          <WhatsappLink
            message="Hola Pietra, quiero asesoramiento para elegir un material para mi proyecto."
            className="w-full justify-center px-5 py-3 text-xs sm:w-fit sm:text-sm"
          >
            Asesoramiento por WhatsApp
          </WhatsappLink>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {primaryMaterials.map((material) => (
            <HomeMaterialCard key={material.slug} material={material} />
          ))}
        </div>

        {secondaryMaterials.length > 0 ? (
          <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
            <div>
              <div className="mb-6 md:mb-8">
                <div className="flex items-end justify-between gap-4">
                  <SectionHeading eyebrow="Más opciones" title="Colección de superficies.">
                    Alternativas para mesadas, barras, baños, quinchos y revestimientos.
                  </SectionHeading>

                  <Link
                    href="/#materiales"
                    className="hidden items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-pietra-green md:flex"
                  >
                    Ver catálogo <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {secondaryMaterials.map((material) => (
                  <HomeMaterialCard key={material.slug} material={material} />
                ))}
              </div>
            </div>

            <MaterialSidePromotion promotion={sidePromotion} />
          </div>
        ) : null}

        <div className="mt-8 rounded-2xl border border-pietra-border bg-pietra-background p-4 text-center md:hidden">
          <p className="font-display text-xl text-pietra-ink">
            ¿Querés saber qué material conviene para tu espacio?
          </p>

          <p className="mt-2 text-xs leading-5 text-pietra-muted">
            Te asesoramos por WhatsApp según medidas, color y uso.
          </p>

          <WhatsappLink
            message="Hola Pietra, quiero asesoramiento para elegir el material ideal para mi espacio."
            className="mt-4 w-full justify-center px-5 py-3 text-xs"
          >
            Cotizar por WhatsApp
          </WhatsappLink>
        </div>
      </div>
    </section>
  );
}
