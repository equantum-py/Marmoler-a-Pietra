import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { commercialBanners } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';

export function Promotion() {
  return (
    <section className="bg-pietra-background py-4 md:py-8">
      <div className="luxe-container">
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {commercialBanners.map((banner) => (
            <a
              key={banner.eyebrow}
              href={whatsappUrl(banner.message)}
              target="_blank"
              rel="noreferrer"
              className="group relative min-h-[132px] w-[82vw] shrink-0 snap-start overflow-hidden rounded-md border border-pietra-border bg-pietra-ink shadow-card lg:w-auto lg:shrink"
            >
              <Image
                src={banner.image}
                alt={banner.eyebrow}
                fill
                className="object-cover opacity-72 transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, 82vw"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-pietra-ink/88 via-pietra-ink/50 to-pietra-ink/15" />

              <div className="relative z-10 flex min-h-[132px] flex-col justify-center p-5 text-white md:p-6">
                <p className="text-[10px] font-extrabold uppercase tracking-wide md:text-xs">
                  {banner.eyebrow}
                </p>

                <h3 className="mt-1 max-w-[14rem] font-display text-xl font-bold leading-tight md:text-2xl">
                  {banner.title}
                </h3>

                <span className="mt-3 inline-flex w-fit items-center gap-2 rounded border border-white/70 px-4 py-2 text-[10px] font-extrabold uppercase transition group-hover:bg-white group-hover:text-pietra-green md:mt-4 md:text-xs">
                  {banner.cta} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
