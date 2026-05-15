import { ArrowRight } from 'lucide-react';
import { sidebarCategories } from '@/data/site';
import { fallbackHomeBanner, getHomeBannerByPlacement, type HomeBanner } from '@/lib/banners/public-banners';
import { whatsappUrl } from '@/lib/whatsapp';

function getLinkTarget(url: string) {
  return url.startsWith('http') ? '_blank' : undefined;
}

function getTextPositionClass(position?: string | null) {
  if (position === 'center') return 'items-center text-center';
  if (position === 'right') return 'items-end text-right';
  return 'items-start text-left';
}

function getVerticalPositionClass(position?: string | null) {
  if (position === 'top') return 'justify-start pt-6 md:pt-14';
  if (position === 'bottom') return 'justify-end pb-6 md:pb-14';
  return 'justify-center';
}

function getPrimaryHref(banner: HomeBanner) {
  if (banner.primary_cta_href) return banner.primary_cta_href;
  if (banner.whatsapp_message) return whatsappUrl(banner.whatsapp_message);

  return whatsappUrl('Hola Pietra, quiero cotizar un proyecto con superficies premium.');
}

export async function Hero() {
  const bannerRecord = await getHomeBannerByPlacement('hero');
  const banner = bannerRecord ?? fallbackHomeBanner;

  const desktopImage = banner.desktop_image_url || fallbackHomeBanner.desktop_image_url;
  const mobileImage = banner.mobile_image_url || desktopImage;
  const altText = banner.alt_text || banner.title || 'Banner principal Marmolería Pietra';

  const primaryHref = getPrimaryHref(banner);
  const secondaryHref = banner.secondary_cta_href || '';

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

        <article className="hero-banner rounded-sm border border-pietra-border bg-pietra-ink shadow-card">
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

          <div className="absolute inset-0 bg-gradient-to-r from-pietra-ink/72 via-pietra-ink/38 to-pietra-ink/12" />

          <div
            className={`absolute inset-0 z-10 flex px-5 py-5 text-white md:px-12 lg:px-16 ${getTextPositionClass(
              banner.text_position,
            )} ${getVerticalPositionClass(banner.vertical_position)}`}
          >
            <div className="max-w-[92%] md:max-w-3xl">
              {banner.eyebrow ? (
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/85 md:mb-4 md:text-sm">
                  {banner.eyebrow}
                </p>
              ) : null}

              <h1 className="hero-title font-display font-semibold text-white drop-shadow-sm">
                {banner.title}
                {banner.highlighted_text ? (
                  <>
                    <br />
                    <span className="text-pietra-warm">{banner.highlighted_text}</span>
                  </>
                ) : null}
              </h1>

              {banner.subtitle ? (
                <p className="hero-subtitle mt-3 max-w-[34rem] text-white/90 md:mt-5">
                  {banner.subtitle}
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2 md:mt-7 md:gap-3">
                {banner.primary_cta_label ? (
                  <a
                    href={primaryHref}
                    target={getLinkTarget(primaryHref)}
                    rel={primaryHref.startsWith('http') ? 'noreferrer' : undefined}
                    className="inline-flex items-center justify-center rounded bg-pietra-green px-4 py-2.5 text-[11px] font-extrabold text-white shadow-soft transition hover:bg-pietra-sage md:px-6 md:py-3 md:text-sm"
                  >
                    {banner.primary_cta_label}
                  </a>
                ) : null}

                {banner.secondary_cta_label && secondaryHref ? (
                  <a
                    href={secondaryHref}
                    target={getLinkTarget(secondaryHref)}
                    rel={secondaryHref.startsWith('http') ? 'noreferrer' : undefined}
                    className="inline-flex items-center justify-center rounded border border-white/70 bg-white/10 px-4 py-2.5 text-[11px] font-extrabold text-white backdrop-blur transition hover:bg-white hover:text-pietra-ink md:px-6 md:py-3 md:text-sm"
                  >
                    {banner.secondary_cta_label}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
