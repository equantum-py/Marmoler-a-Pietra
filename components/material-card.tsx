import Image from 'next/image';
import Link from 'next/link';
import type { Material } from '@/types/content';

export function MaterialCard({ material }: { material: Material }) {
  return (
    <article className="product-card overflow-hidden rounded-md">
      <Link href={`/materiales/${material.slug}`} className="group block">
        <div className="relative aspect-[1.8/1] bg-pietra-border">
          <Image src={material.image} alt={material.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, 50vw" />
          <span className="absolute left-3 top-3 rounded-sm bg-pietra-ink/70 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">{material.category}</span>
        </div>
      </Link>
      <div className="p-4 text-center">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-pietra-brown">Superficie Pietra</p>
        <h3 className="mb-3 min-h-10 text-sm font-extrabold text-pietra-ink md:text-base">{material.name}</h3>
        <Link href={`/materiales/${material.slug}`} className="inline-flex min-h-9 w-full items-center justify-center rounded border border-pietra-green bg-white px-4 text-xs font-extrabold uppercase text-pietra-green transition hover:bg-pietra-green hover:text-white">
          Ver material
        </Link>
      </div>
    </article>
  );
}
