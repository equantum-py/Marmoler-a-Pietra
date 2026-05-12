import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { commercialBanners } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';

export function Promotion() {
  return (
    <section className="bg-pietra-background py-4 md:py-8">
      <div className="luxe-container grid gap-4 lg:grid-cols-3">
        {commercialBanners.map((banner) => (
          <a key={banner.eyebrow} href={whatsappUrl(banner.message)} target="_blank" rel="noreferrer" className="group relative min-h-[145px] overflow-hidden rounded-md border border-pietra-border bg-pietra-ink shadow-card">
            <Image src={banner.image} alt={banner.eyebrow} fill className="object-cover opacity-72 transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-pietra-ink/88 via-pietra-ink/50 to-pietra-ink/15" />
            <div className="relative z-10 flex min-h-[145px] flex-col justify-center p-6 text-white">
              <p className="text-xs font-extrabold uppercase tracking-wide">{banner.eyebrow}</p>
              <h3 className="mt-1 max-w-[14rem] font-display text-2xl font-bold leading-tight">{banner.title}</h3>
              <span className="mt-4 inline-flex w-fit items-center gap-2 rounded border border-white/70 px-4 py-2 text-xs font-extrabold uppercase transition group-hover:bg-white group-hover:text-pietra-green">{banner.cta} <ArrowRight className="h-3.5 w-3.5" /></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
