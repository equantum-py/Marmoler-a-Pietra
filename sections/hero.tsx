import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fallbackHomeBanner, getHomeBannerByPlacement } from '@/lib/banners/public-banners';
import { buildWhatsappUrl } from '@/lib/whatsapp';
import { getPublicSiteSettings } from '@/lib/site-settings';

const QUOTE_MESSAGE = 'Hola, quiero cotizar un proyecto con Marmolería Pietra.';

function getLinkTarget(url: string) {
  return url.startsWith('http') ? '_blank' : undefined;
}

export async function Hero() {
  const [bannerRecord, settings] = await Promise.all([
    getHomeBannerByPlacement('hero'),
    getPublicSiteSettings(),
  ]);
  const banner = bannerRecord ?? fallbackHomeBanner;

  const desktopImage = banner.desktop_image_url || fallbackHomeBanner.desktop_image_url;
  const mobileImage = banner.mobile_image_url || desktopImage;
  const altText = banner.alt_text || banner.name || 'Marmolería Pietra';
  const bannerHref = banner.primary_cta_href || '';
  const whatsappHref = buildWhatsappUrl(QUOTE_MESSAGE, settings.whatsapp_number);

  const bannerPicture = (
    <picture className="home-banner-picture">
      <source media="(max-width: 767px)" srcSet={mobileImage} />
      <source media="(min-width: 768px)" srcSet={desktopImage} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={desktopImage}
        alt={altText}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="home-banner-image"
      />
    </picture>
  );

  return (
    <section id="inicio" className="home-banner-section" aria-label="Presentación de Marmolería Pietra">
      <article className="home-banner">
        {bannerHref ? (
          <a
            href={bannerHref}
            target={getLinkTarget(bannerHref)}
            rel={bannerHref.startsWith('http') ? 'noreferrer' : undefined}
            className="home-banner-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-pietra-green"
            aria-label={altText}
          >
            {bannerPicture}
          </a>
        ) : (
          bannerPicture
        )}
      </article>

      <div className="home-hero-actions">
        <div className="home-hero-actions-copy">
          <p className="home-hero-actions-eyebrow">Marmolería · Diseño · Fabricación · Instalación</p>
          <p className="home-hero-actions-text">
            Mesadas y superficies a medida en mármol, granito, cuarzo y Neolith.
          </p>
        </div>

        <div className="home-hero-actions-buttons">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="home-hero-primary-action"
            aria-label="Cotizar un proyecto con Marmolería Pietra por WhatsApp"
          >
            Cotizar proyecto <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link href="/proyectos" className="home-hero-secondary-action">
            Ver proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
