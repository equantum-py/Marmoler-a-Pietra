import { ArrowRight } from 'lucide-react';
import { sidebarCategories } from '@/data/site';
import { getHomeBannerByPlacement } from '@/lib/banners/public-banners';
import { whatsappUrl } from '@/lib/whatsapp';

function getLinkTarget(url: string) {
  return url.startsWith('http') ? '_blank' : undefined;
}

export async function Hero() {
  const banner = await getHomeBannerByPlacement('hero');

  const desktopImage = banner?.desktop_image || '/images/showroom/kitchen-hero.svg';
  const mobileImage = banner?.mobile_image || desktopImage;
  const bannerLink = banner?.cta_url || '';

  const bannerImage = (
    <picture className="absolute inset-0">
      <source media="(max-width: 767px)" srcSet={mobileImage} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={desktopImage}
        alt="Banner principal Marmolería Pietra"
        className="h-full w-full object-cover object-center"
      />
    </picture>
  );

  return (
    <section id="inicio" className="w-full bg-pietra-background">
      <div className="grid w-full gap-5 px-4 py-5 md:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8 xl:px-10">
        <aside
          id="categorias"
          className="hidden overflow-hidden rounded-sm border border-pietra-border bg-white shadow-sm lg:block"
        >
          <div className="bg-pietra-green px-5 py-4 text-xs font-extrabold uppercase tracking-wide text-white">
            Explorar categorías
          </div>

          <div className="divide-y divide-pietra-border">
            {sidebarCategories.map((category) => (
              <a
                key={category.name}
                href={whatsappUrl(category.message)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-5 py-3 text-sm font-semibold text-pietra-ink transition hover:bg-pietra-background hover:text-pietra-green"
              >
                <span className="flex items-center gap-3">
                  <span className="text-pietra-green">{category.icon}</span>
                  {category.name}
                </span>

                <ArrowRight className="h-3.5 w-3.5 text-pietra-muted" />
              </a>
            ))}
          </div>
        </aside>

        <div className="lg:hidden">
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
            {sidebarCategories.slice(0, 8).map((category) => (
              <a
                key={category.name}
                href={whatsappUrl(category.message)}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-full border border-pietra-border bg-white px-4 py-2 text-sm font-bold text-pietra-green"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>

        <article className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-pietra-border bg-white shadow-card sm:aspect-[16/8] lg:aspect-[1920/800]">
          {bannerLink ? (
            <a
              href={bannerLink}
              target={getLinkTarget(bannerLink)}
              rel={bannerLink.startsWith('http') ? 'noreferrer' : undefined}
              className="absolute inset-0"
              aria-label="Ver banner principal"
            >
              {bannerImage}
            </a>
          ) : (
            bannerImage
          )}
        </article>
      </div>
    </section>
  );
}
