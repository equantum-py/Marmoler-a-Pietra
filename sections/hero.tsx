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
    <picture className="block w-full">
      <source media="(max-width: 767px)" srcSet={mobileImage} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={desktopImage}
        alt="Banner principal Marmolería Pietra"
        className="block h-auto w-full"
      />
    </picture>
  );

  return (
    <section id="inicio" className="w-full bg-pietra-background">
      <div className="grid w-full gap-3 px-3 py-3 md:gap-4 md:px-6 md:py-5 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8 xl:px-10">
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
          <div className="flex gap-2 overflow-x-auto pb-1">
            {sidebarCategories.slice(0, 8).map((category) => (
              <a
                key={category.name}
                href={whatsappUrl(category.message)}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-full border border-pietra-border bg-white px-4 py-2 text-xs font-bold text-pietra-green shadow-sm"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>

        <article className="w-full overflow-hidden rounded-sm border border-pietra-border bg-white shadow-card">
          {bannerLink ? (
            <a
              href={bannerLink}
              target={getLinkTarget(bannerLink)}
              rel={bannerLink.startsWith('http') ? 'noreferrer' : undefined}
              className="block w-full"
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
