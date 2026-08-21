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
        className="block h-full rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-pietra-green"
        aria-label={`Ver material ${material.name}`}
      >
        <div className="relative h-36 overflow-hidden bg-pietra-warm sm:h-44 lg:h-52">
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

          <span className="absolute left-2.5 top-2.5 rounded bg-pietra-black px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white sm:left-3 sm:top-3 sm:text-[10px]">
            {material.category}
          </span>
        </div>

        <div className="p-3.5 text-center sm:p-4">
          <h3 className="line-clamp-2 min-h-[34px] text-sm font-semibold leading-[1.2] text-pietra-black sm:min-h-0 sm:text-base">
            {material.name}
          </h3>

          {material.shortDescription ? (
            <p className="mt-1.5 line-clamp-2 min-h-[36px] text-xs leading-[1.45] text-pietra-muted sm:mt-2 sm:text-sm sm:leading-6">
              {material.shortDescription}
            </p>
          ) : null}

          <span className="mt-3 flex min-h-10 items-center justify-center rounded bg-pietra-green px-2 text-[10px] font-bold uppercase tracking-[0.08em] text-white transition group-hover:bg-[#3E5549] sm:text-xs">
            Ver material
          </span>
        </div>
      </Link>
    </article>
  );
}

function MaterialSidePromotion({ promotion }: { promotion?: HomePromotion }) {
  const desktopMediaUrl = promotion?.desktop_media_url || '';
  const mobileMediaUrl = promotion?.mobile_media_url || desktopMediaUrl;
  const posterUrl = promotion?.poster_url || undefined;
  const isVideo = promotion?.media_type === 'video' && desktopMediaUrl;

  return (
    <>
      <div className="hidden min-h-[420px] overflow-hidden rounded-[1.75rem] border border-pietra-border bg-pietra-warm shadow-sm lg:relative lg:block">
        {isVideo ? (
          <video
            src={desktopMediaUrl}
            poster={posterUrl}
            autoPlay={promotion?.autoplay ?? true}
            muted={promotion?.muted ?? true}
            loop={promotion?.loop ?? true}
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : desktopMediaUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={desktopMediaUrl}
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
            className="mt-7 !bg-pietra-green px-6 py-3 !text-white hover:!bg-[#3E5549]"
          >
            Cotizar proyecto
          </WhatsappLink>
        </div>
      </div>

      {desktopMediaUrl ? (
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-pietra-border bg-pietra-warm shadow-sm lg:hidden">
          <div className="relative aspect-[860/560] w-full overflow-hidden">
            {isVideo ? (
              <video
                src={mobileMediaUrl}
                poster={posterUrl}
                autoPlay={promotion?.autoplay ?? true}
                muted={promotion?.muted ?? true}
                loop={promotion?.loop ?? true}
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mobileMediaUrl}
                alt={promotion?.alt_text || promotion?.name || 'Proyecto a medida Marmolería Pietra'}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-pietra-black/85 via-pietra-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-pietra-warm">
                Proyecto a medida
              </p>

              <h3 className="max-w-[290px] font-display text-[26px] leading-[1.05]">
                Cocinas a medida con superficies premium.
              </h3>

              <WhatsappLink
                message="Hola Pietra, quiero cotizar una cocina a medida con superficie premium."
                className="mt-4 w-full justify-center !bg-pietra-green px-5 py-3 text-sm !text-white hover:!bg-[#3E5549]"
              >
                Cotizar proyecto
              </WhatsappLink>
            </div>
          </div>
        </div>
      ) : null}
    </>
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
            className="w-full justify-center px-5 py-3 text-sm sm:w-fit"
          >
            Asesoramiento por WhatsApp
          </WhatsappLink>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">
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
                    className="hidden items-center gap-1 rounded-sm text-xs font-bold uppercase tracking-[0.12em] text-pietra-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-pietra-green md:flex"
                  >
                    Ver catálogo <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 sm:gap-5 xl:grid-cols-3">
                {secondaryMaterials.map((material) => (
                  <HomeMaterialCard key={material.slug} material={material} />
                ))}
              </div>
            </div>

            <MaterialSidePromotion promotion={sidePromotion} />
          </div>
        ) : null}

        <div className="mt-8 rounded-2xl border border-pietra-border bg-pietra-background p-5 text-center md:hidden">
          <p className="font-display text-[22px] leading-tight text-pietra-ink">
            ¿Querés saber qué material conviene para tu espacio?
          </p>

          <p className="mt-2 text-sm leading-6 text-pietra-muted">
            Te asesoramos por WhatsApp según medidas, color y uso.
          </p>

          <WhatsappLink
            message="Hola Pietra, quiero asesoramiento para elegir el material ideal para mi espacio."
            className="mt-4 w-full justify-center px-5 py-3 text-sm"
          >
            Cotizar por WhatsApp
          </WhatsappLink>
        </div>
      </div>
    </section>
  );
}
