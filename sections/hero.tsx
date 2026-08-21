import { fallbackHomeBanner, getHomeBannerByPlacement } from '@/lib/banners/public-banners';

function getLinkTarget(url: string) {
  return url.startsWith('http') ? '_blank' : undefined;
}

export async function Hero() {
  const bannerRecord = await getHomeBannerByPlacement('hero');
  const banner = bannerRecord ?? fallbackHomeBanner;

  const desktopImage = banner.desktop_image_url || fallbackHomeBanner.desktop_image_url;
  const mobileImage = banner.mobile_image_url || desktopImage;
  const altText = banner.alt_text || banner.name || 'Marmolería Pietra';
  const bannerHref = banner.primary_cta_href || '';

  const bannerPicture = (
    <picture className="home-banner-picture">
      <source media="(max-width: 767px)" srcSet={mobileImage} />
      <source media="(min-width: 768px)" srcSet={desktopImage} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={desktopImage}
        alt={altText}
        loading="eager"
        className="home-banner-image"
      />
    </picture>
  );

  return (
    <section id="inicio" className="home-banner-section">
      <article className="home-banner">
        {bannerHref ? (
          <a
            href={bannerHref}
            target={getLinkTarget(bannerHref)}
            rel={bannerHref.startsWith('http') ? 'noreferrer' : undefined}
            className="home-banner-link"
            aria-label={altText}
          >
            {bannerPicture}
          </a>
        ) : (
          bannerPicture
        )}
      </article>
    </section>
  );
}
