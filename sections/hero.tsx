import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { WhatsappLink } from '@/components/whatsapp-link';
import { sidebarCategories } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';

export function Hero() {
  return (
    <section id="inicio" className="bg-pietra-background">
      <div className="luxe-container grid gap-5 py-5 lg:grid-cols-[250px_1fr]">
        <aside id="categorias" className="hidden overflow-hidden rounded-sm border border-pietra-border bg-white shadow-sm lg:block">
          <div className="bg-pietra-green px-5 py-4 text-xs font-extrabold uppercase tracking-wide text-white">Explorar categorías</div>
          <div className="divide-y divide-pietra-border">
            {sidebarCategories.map((category) => (
              <a key={category.name} href={whatsappUrl(category.message)} target="_blank" rel="noreferrer" className="flex items-center justify-between px-5 py-3 text-sm font-semibold text-pietra-ink transition hover:bg-pietra-background hover:text-pietra-green">
                <span className="flex items-center gap-3"><span className="text-pietra-green">{category.icon}</span>{category.name}</span>
                <ArrowRight className="h-3.5 w-3.5 text-pietra-muted" />
              </a>
            ))}
          </div>
        </aside>

        <div className="lg:hidden">
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
            {sidebarCategories.slice(0, 8).map((category) => (
              <a key={category.name} href={whatsappUrl(category.message)} target="_blank" rel="noreferrer" className="shrink-0 rounded-full border border-pietra-border bg-white px-4 py-2 text-sm font-bold text-pietra-green">
                {category.name}
              </a>
            ))}
          </div>
        </div>

        <article className="relative min-h-[470px] overflow-hidden rounded-sm border border-pietra-border bg-pietra-soft shadow-card">
          <Image src="/images/showroom/kitchen-hero.svg" alt="Cocina premium con mesada de mármol Pietra" fill priority className="object-cover object-center lg:object-right" sizes="(min-width: 1024px) 930px, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-pietra-background via-pietra-background/88 to-pietra-background/5" />
          <div className="relative z-10 flex min-h-[470px] max-w-xl flex-col justify-center px-6 py-12 md:px-10">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-pietra-green">Showroom premium en Paraguay</p>
            <h1 className="font-display text-4xl font-bold leading-[0.95] text-pietra-ink md:text-6xl">Superficies premium para cocinas, baños y quinchos.</h1>
            <p className="mt-5 max-w-md text-base leading-7 text-pietra-muted">Mármoles, granitos, cuarzos y piedras especiales fabricadas e instaladas a medida para elevar el valor de tu espacio.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <WhatsappLink message="Hola, quiero cotizar mi proyecto con Marmolería Pietra." className="rounded-md px-6">Cotizar mi proyecto</WhatsappLink>
              <a href="#materiales" className="inline-flex min-h-11 items-center justify-center rounded-md border border-pietra-green bg-white px-6 text-sm font-extrabold text-pietra-ink transition hover:bg-pietra-green hover:text-white">Ver materiales</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
