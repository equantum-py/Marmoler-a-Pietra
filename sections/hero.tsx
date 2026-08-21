import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fallbackHomeBanner, getHomeBannerByPlacement } from '@/lib/banners/public-banners';
import { buildWhatsappUrl } from '@/lib/whatsapp';
import { getPublicSiteSettings } from '@/lib/site-settings';

const QUOTE_MESSAGE = 'Hola, quiero cotizar un proyecto con Marmolería Pietra.';

export async function Hero() {
  const [bannerRecord, settings] = await Promise.all([
    getHomeBannerByPlacement('hero'),
    getPublicSiteSettings(),
  ]);
  const banner = bannerRecord ?? fallbackHomeBanner;
  const desktopImage = banner.desktop_image_url || fallbackHomeBanner.desktop_image_url;
  const mobileImage = banner.mobile_image_url || desktopImage;
  const altText = banner.alt_text || banner.name || 'Superficies premium de Marmolería Pietra';
  const whatsappHref = buildWhatsappUrl(QUOTE_MESSAGE, settings.whatsapp_number);

  return (
    <section id="inicio" className="home-banner-section" aria-labelledby="hero-title">
      <div className="home-banner">
        <picture className="home-banner-picture">
          <source media="(max-width: 767px)" srcSet={mobileImage} />
          <source media="(min-width: 768px)" srcSet={desktopImage} />
          <img src={desktopImage} alt={altText} loading="eager" className="home-banner-image" />
        </picture>
        <div className="home-banner-overlay" aria-hidden="true" />

        <div className="home-hero-content">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/80 md:text-sm">
            Diseño · Fabricación · Instalación
          </p>
          <h1
            id="hero-title"
            className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl"
          >
            Superficies hechas para durar.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl">
            Diseñamos, fabricamos e instalamos mesadas de mármol, granito, cuarzo y Neolith en todo
            Paraguay.
          </p>
          <div className="mt-6 flex flex-col items-stretch gap-3 min-[390px]:flex-row min-[390px]:items-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-pietra-green px-5 py-3 text-sm font-bold text-white transition hover:bg-pietra-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base"
            >
              Cotizar mi proyecto <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/proyectos"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/70 bg-black/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-pietra-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base"
            >
              Ver proyectos realizados
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
