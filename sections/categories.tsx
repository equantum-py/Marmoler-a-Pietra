import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { whatsappUrl } from '@/lib/whatsapp';
import { categories } from '@/data/site';

export function Categories() {
  return (
    <section className="bg-pietra-black py-24 md:py-32">
      <div className="luxe-container">
        <SectionHeading eyebrow="Ambientes" title="Varios ambientes, una sola sensación: lujo natural.">Cocinas, baños, quinchos y revestimientos diseñados para convertir la piedra en protagonista.</SectionHeading>
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((category, index) => (
            <a key={category.name} href={whatsappUrl(category.message)} target="_blank" rel="noreferrer" className={`group relative min-h-[320px] overflow-hidden rounded-[2rem] border border-white/10 ${index === 0 ? 'md:col-span-2' : ''}`}>
              <Image src={category.image} alt={category.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 768px) 33vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-xs uppercase tracking-[0.35em] text-pietra-gold">Cotizar ambiente</p>
                <div className="mt-3 flex items-end justify-between gap-5">
                  <h3 className="font-display text-4xl text-pietra-cream">{category.name}</h3>
                  <span className="rounded-full border border-white/20 p-3 text-pietra-cream transition group-hover:border-pietra-gold group-hover:bg-pietra-gold group-hover:text-pietra-black"><ArrowUpRight /></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
