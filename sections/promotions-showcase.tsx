import { getPublishedHomePromotions, type HomePromotion } from '@/lib/promotions/public-promotions';

function getLinkTarget(url: string) {
  return url.startsWith('http') ? '_blank' : undefined;
}

function PromotionMedia({ promotion }: { promotion: HomePromotion }) {
  const desktopMedia = promotion.desktop_media_url;
  const mobileMedia = promotion.mobile_media_url || desktopMedia;
  const altText = promotion.alt_text || promotion.name || 'Promoción Marmolería Pietra';

  if (promotion.media_type === 'video') {
    return (
      <>
        <video
          className="home-promotion-media md:hidden"
          src={mobileMedia}
          poster={promotion.poster_url || undefined}
          autoPlay={promotion.autoplay ?? true}
          muted={promotion.muted ?? true}
          loop={promotion.loop ?? true}
          playsInline
          controls={!(promotion.autoplay ?? true)}
        />

        <video
          className="home-promotion-media hidden md:block"
          src={desktopMedia}
          poster={promotion.poster_url || undefined}
          autoPlay={promotion.autoplay ?? true}
          muted={promotion.muted ?? true}
          loop={promotion.loop ?? true}
          playsInline
          controls={!(promotion.autoplay ?? true)}
        />
      </>
    );
  }

  return (
    <picture className="home-promotion-picture">
      <source media="(max-width: 767px)" srcSet={mobileMedia} />
      <source media="(min-width: 768px)" srcSet={desktopMedia} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={desktopMedia}
        alt={altText}
        loading="lazy"
        className="home-promotion-media"
      />
    </picture>
  );
}

export async function PromotionsShowcase() {
  const promotions = await getPublishedHomePromotions('home-wide');

  if (!promotions.length) {
    return null;
  }

  return (
    <section className="home-promotion-section">
      <div className="home-promotion-wrap">
        {promotions.map((promotion) => {
          const content = <PromotionMedia promotion={promotion} />;

          return (
            <article key={promotion.id} className="home-promotion-card">
              {promotion.href ? (
                <a
                  href={promotion.href}
                  target={getLinkTarget(promotion.href)}
                  rel={promotion.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="home-promotion-link"
                  aria-label={promotion.alt_text || promotion.name}
                >
                  {content}
                </a>
              ) : (
                <div className="home-promotion-link">
                  {content}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
