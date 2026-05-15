import { ArrowRight } from 'lucide-react';
import { sidebarCategories } from '@/data/site';
import { fallbackHomeBanner, getHomeBannerByPlacement } from '@/lib/banners/public-banners';
import { whatsappUrl } from '@/lib/whatsapp';

function getLinkTarget(url: string) {
  return url.startsWith('http') ? '_blank' : undefined;
}

export async function Hero() {
  const bannerRecord = await getHomeBannerByPlacement('hero');
  const banner = bannerRecord ?? fallbackHomeBanner;

  const desktopImage = banner.desktop_image_url || fallbackHomeBanner.desktop_image_url;
  const mobileImage = banner.mobile_image_url || desktopImage;
  const altText = banner.alt_text || banner.name || 'Banner principal Marmolería Pietra';
  const bannerHref = banner.primary_cta_href || '';

  const bannerImages = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mobileImage}
        alt={altText}
        loading="eager"
        className="hero-banner-image md:hidden"
        style={{ objectPosition: banner.object_position_mobile || 'center center' }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={desktopImage}
        alt={altText}
        loading="eager"
        className="hero-banner-image hidden md:block"
        style={{ objectPosition: banner.object_position_desktop || 'center center' }}
      />
    </>
  );

  return (
    <section id="inicio" className="w-full overflow-hidden bg-pietra-background">
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
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {sidebarCategories.slice(0, 8).map((category) => (
              <a
                key={category.name}
                href={whatsappUrl(category.message)}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-full border border-pietra-border bg-white px-3.5 py-1.5 text-[11px] font-bold text-pietra-green shadow-sm"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>

        <article className="hero-banner rounded-sm border border-pietra-border bg-white shadow-card">
          {bannerHref ? (
            <a
              href={bannerHref}
              target={getLinkTarget(bannerHref)}
              rel={bannerHref.startsWith('http') ? 'noreferrer' : undefined}
              className="block h-full w-full"
              aria-label={altText}
            >
              {bannerImages}
            </a>
          ) : (
            bannerImages
          )}
        </article>
      </div>
    </section>
  );
}
