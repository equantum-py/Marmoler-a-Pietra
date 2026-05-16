import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getPublishedHomePromoCards } from '@/lib/promo-cards/public-promo-cards';
import { whatsappUrl } from '@/lib/whatsapp';

function getLinkTarget(url: string) {
  return url.startsWith('http') ? '_blank' : undefined;
}

export async function Promotion() {
  const promoCards = await getPublishedHomePromoCards();

  if (!promoCards.length) {
    return null;
  }

  return (
    <section className="bg-pietra-background py-4 md:py-8">
      <div className="luxe-container">
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0">
          {promoCards.map((banner) => {
            const href =
              banner.href ||
              whatsappUrl(
                banner.whatsapp_message ||
                  `Hola, quiero consultar por ${banner.title} en Marmolería Pietra.`,
              );

            const image = banner.mobile_image_url || banner.image_url;

            return (
              <a
                key={banner.id}
                href={href}
                target={getLinkTarget(href)}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="group relative min-h-[132px] w-[82vw] shrink-0 snap-start overflow-hidden rounded-md border border-pietra-border bg-pietra-ink shadow-card lg:h-[150px] lg:w-[31.5%] lg:min-w-[300px] lg:max-w-[390px] lg:shrink"
              >
                <Image
                  src={image}
                  alt={`${banner.eyebrow} ${banner.title}`}
                  fill
                  unoptimized
                  className="object-cover opacity-72 transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 390px, 82vw"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-pietra-ink/88 via-pietra-ink/50 to-pietra-ink/15" />

                <div className="relative z-10 flex min-h-[132px] flex-col justify-center p-5 text-white md:p-6 lg:min-h-[150px]">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide md:text-xs">
                    {banner.eyebrow}
                  </p>

                  <h3 className="mt-1 max-w-[14rem] font-display text-xl font-bold leading-tight md:text-2xl">
                    {banner.title}
                  </h3>

                  <span className="mt-3 inline-flex w-fit items-center gap-2 rounded border border-white/70 px-4 py-2 text-[10px] font-extrabold uppercase transition group-hover:bg-white group-hover:text-pietra-green md:mt-4 md:text-xs">
                    {banner.cta_label} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
