import Link from 'next/link';

type MaterialCardProps = {
  material: {
    slug: string;
    name: string;
    category: string;
    images?: string[];
    image?: string;
    shortDescription?: string;
  };
  className?: string;
};

export function MaterialCard({ material, className = '' }: MaterialCardProps) {
  const image = material.images?.[0] || material.image || '';

  return (
    <article
      className={`group overflow-hidden rounded-xl border border-pietra-border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      <Link
        href={`/materiales/${material.slug}`}
        className="block h-full rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-pietra-green"
        aria-label={`Ver material ${material.name}`}
      >
        <div className="relative h-36 overflow-hidden bg-pietra-warm md:h-52">
          {image ? (
            // Usamos img para evitar configuración extra de dominios remotos en Next Image.
            <img
              src={image}
              alt={material.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-pietra-border to-pietra-warm" />
          )}

          <span className="absolute left-3 top-3 rounded bg-pietra-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white md:text-[11px]">
            {material.category}
          </span>
        </div>

        <div className="p-3 text-center md:p-4">
          <h3 className="line-clamp-1 text-sm font-semibold text-pietra-ink md:text-base">
            {material.name}
          </h3>

          {material.shortDescription ? (
            <p className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-pietra-muted md:mt-2 md:text-sm md:leading-6">
              {material.shortDescription}
            </p>
          ) : null}

          <span className="mt-3 flex min-h-10 items-center justify-center rounded bg-pietra-green px-3 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors group-hover:bg-[#3E5549] md:mt-4 md:min-h-11 md:text-xs">
            Ver material
          </span>
        </div>
      </Link>
    </article>
  );
}

export default MaterialCard;
