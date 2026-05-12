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
        className="block h-full focus:outline-none focus:ring-2 focus:ring-pietra-green"
        aria-label={`Ver material ${material.name}`}
      >
        <div className="relative h-52 overflow-hidden bg-pietra-warm">
          {image ? (
            // Usamos img para no depender de dominios/config extra en Next Image.
            <img
              src={image}
              alt={material.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-pietra-border to-pietra-warm" />
          )}

          <span className="absolute left-3 top-3 rounded bg-pietra-black px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            {material.category}
          </span>
        </div>

        <div className="p-4 text-center">
          <h3 className="text-base font-semibold text-pietra-black">
            {material.name}
          </h3>

          {material.shortDescription ? (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-pietra-muted">
              {material.shortDescription}
            </p>
          ) : null}

          <span className="mt-4 flex h-10 items-center justify-center rounded bg-pietra-green text-xs font-bold uppercase tracking-[0.12em] text-white transition group-hover:bg-pietra-greenMuted">
            Ver material
          </span>
        </div>
      </Link>
    </article>
  );
}

export default MaterialCard;
