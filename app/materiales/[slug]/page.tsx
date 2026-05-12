import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Bath, ChefHat, Gem, Grid2X2, Hammer, Home, Maximize2, ShieldCheck, Sparkles, Waves } from 'lucide-react';
import { FloatingWhatsapp } from '@/components/floating-whatsapp';
import { MaterialCard } from '@/components/material-card';
import { Navbar } from '@/components/navbar';
import { WhatsappLink } from '@/components/whatsapp-link';
import { getMaterialBySlug, getRelatedMaterials, materials } from '@/data/materials';
import { categories } from '@/data/site';
import { Benefits } from '@/sections/benefits';
import { Footer } from '@/sections/footer';
import { whatsappUrl } from '@/lib/whatsapp';

const applicationIcons = [ChefHat, Grid2X2, Bath, Home, Waves, Hammer];

const categoryPlural = {
  Granito: 'Granitos',
  Cuarzo: 'Cuarzos',
  Mármol: 'Mármoles',
  Sinterizado: 'Sinterizados',
  Especial: 'Especiales',
} as const;

export function generateStaticParams() {
  return materials.map((material) => ({ slug: material.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);

  if (!material) {
    return {
      title: 'Material no encontrado | Marmolería Pietra',
    };
  }

  return {
    title: `${material.name} para mesadas y superficies | Marmolería Pietra`,
    description: `Cotizá ${material.name} para cocinas, baños, quinchos y revestimientos. Fabricación e instalación a medida en Paraguay.`,
    openGraph: {
      title: `${material.name} | Marmolería Pietra`,
      description: material.shortDescription,
      images: [material.image],
    },
  };
}

export default async function MaterialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);

  if (!material) {
    notFound();
  }

  const relatedMaterials = getRelatedMaterials(material);
  const specs = [
    { label: 'Tipo', value: `${material.category} ${material.category === 'Granito' ? 'natural' : ''}`.trim() },
    { label: 'Color', value: material.color },
    { label: 'Acabado', value: material.finish },
    { label: 'Uso recomendado', value: material.recommendedUse },
    { label: 'Resistencia', value: material.resistance },
    { label: 'Mantenimiento', value: material.maintenance },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-pietra-background text-pietra-ink">
        <section className="border-b border-pietra-border bg-white/70">
          <div className="luxe-container py-4 text-sm text-pietra-muted">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
              <Link href="/" className="font-semibold hover:text-pietra-green">Inicio</Link>
              <span>/</span>
              <Link href="/#materiales" className="font-semibold hover:text-pietra-green">Materiales</Link>
              <span>/</span>
              <span className="font-semibold text-pietra-green">{categoryPlural[material.category]}</span>
              <span>/</span>
              <span className="font-extrabold text-pietra-ink">{material.name}</span>
            </nav>
          </div>
        </section>

        <section className="luxe-container grid gap-6 py-8 lg:grid-cols-[1.05fr_1fr_0.72fr] lg:py-12">
          <div>
            <div className="product-card overflow-hidden rounded-md bg-white">
              <div className="relative aspect-[1.08/1] bg-pietra-border md:aspect-[1.18/1]">
                <Image src={material.image} alt={`Textura ${material.name}`} fill priority className="object-cover" sizes="(min-width: 1024px) 36vw, 100vw" />
                <span className="absolute left-4 top-4 rounded-sm bg-pietra-green px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white">Textura principal</span>
              </div>
              <div className="grid grid-cols-4 gap-3 border-t border-pietra-border p-3">
                {material.images.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative aspect-square overflow-hidden rounded border border-pietra-border bg-pietra-background">
                    <Image src={image} alt={`${material.name} referencia ${index + 1}`} fill className="object-cover" sizes="120px" />
                  </div>
                ))}
              </div>
            </div>
            <a href={material.image} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded border border-pietra-border bg-white px-4 py-2 text-sm font-bold text-pietra-green transition hover:border-pietra-green">
              <Maximize2 className="h-4 w-4" /> Ver en detalle
            </a>
          </div>

          <article className="rounded-md border border-pietra-border bg-white p-6 shadow-card md:p-8">
            <p className="mb-3 inline-flex rounded-full bg-pietra-background px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-pietra-brown">{material.category}</p>
            <h1 className="font-display text-4xl font-bold leading-tight text-pietra-ink md:text-6xl">{material.name}</h1>
            <p className="mt-5 text-base leading-8 text-pietra-muted">{material.longDescription}</p>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {material.applications.map((application, index) => {
                const Icon = applicationIcons[index % applicationIcons.length];
                return (
                  <div key={application} className="rounded-md border border-pietra-border bg-pietra-background p-3">
                    <Icon className="mb-2 h-5 w-5 text-pietra-green" />
                    <p className="text-sm font-extrabold text-pietra-ink">{application}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsappLink message={material.whatsappMessage} className="rounded-md px-6">Cotizar este material</WhatsappLink>
              <a href="#relacionados" className="inline-flex min-h-11 items-center justify-center rounded-md border border-pietra-green bg-white px-6 text-sm font-extrabold text-pietra-green transition hover:bg-pietra-green hover:text-white">Ver materiales similares</a>
            </div>
          </article>

          <aside className="h-fit rounded-md border border-pietra-border bg-white p-6 shadow-card lg:sticky lg:top-40">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pietra-green/10 text-pietra-green">
              <Gem className="h-6 w-6" />
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight text-pietra-ink">¿Querés cotizar este material?</h2>
            <p className="mt-4 text-sm leading-7 text-pietra-muted">Enviános las medidas, fotos o referencias de tu espacio y te asesoramos por WhatsApp.</p>
            <WhatsappLink message={material.whatsappMessage} className="mt-6 w-full rounded-md">Cotizar por WhatsApp</WhatsappLink>
            <p className="mt-4 text-xs leading-5 text-pietra-muted">Respuesta comercial orientada a fabricación, instalación, medidas y recomendaciones de uso.</p>
          </aside>
        </section>

        <section className="luxe-container py-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-pietra-brown">Ficha técnica</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-pietra-ink md:text-4xl">Características del material</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map((spec) => (
              <div key={spec.label} className="rounded-md border border-pietra-border bg-white p-5 shadow-sm">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-pietra-brown">{spec.label}</p>
                <p className="mt-2 text-lg font-extrabold text-pietra-ink">{spec.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="luxe-container py-8">
          <div className="mb-7 grid gap-4 md:grid-cols-[1fr_.8fr] md:items-end">
            <h2 className="font-display text-3xl font-bold text-pietra-ink md:text-4xl">Ideal para estos espacios</h2>
            <p className="text-sm leading-6 text-pietra-muted">Visualizá cómo este material puede integrarse en ambientes residenciales y comerciales con estética Pietra.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <a key={category.name} href={whatsappUrl(`Hola Pietra, quiero cotizar ${material.name} para ${category.name}.`)} target="_blank" rel="noreferrer" className="group relative min-h-[175px] overflow-hidden rounded-md border border-pietra-border bg-white shadow-card">
                <Image src={category.image} alt={`${material.name} en ${category.name}`} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 20vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-pietra-ink/78 via-pietra-ink/22 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-extrabold uppercase leading-tight">{category.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold">Cotizar aplicación <ArrowRight className="h-3 w-3" /></span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="luxe-container py-8">
          <div className="grid overflow-hidden rounded-md border border-pietra-border bg-white shadow-card lg:grid-cols-[1fr_.9fr]">
            <div className="p-7 md:p-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-pietra-brown">Selección Pietra</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-pietra-ink md:text-5xl">Por qué elegir {material.name}</h2>
              <p className="mt-5 text-base leading-8 text-pietra-muted">{material.name} es una opción elegida por su tono, presencia y capacidad de elevar espacios de uso diario. Su resistencia lo convierte en una superficie ideal para proyectos que necesitan belleza, funcionalidad y acompañamiento profesional.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {material.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 rounded-md border border-pietra-border bg-pietra-background p-4">
                    <ShieldCheck className="h-5 w-5 text-pietra-green" />
                    <span className="font-extrabold text-pietra-ink">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[320px]">
              <Image src="/images/showroom/kitchen-large.svg" alt={`${material.name} en cocina premium`} fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </div>
        </section>

        <section className="luxe-container py-8">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-pietra-brown">Galería</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-pietra-ink md:text-4xl">Inspiración con {material.name}</h2>
            </div>
            <a href={whatsappUrl(`Hola Pietra, quiero ver más proyectos con ${material.name}.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-extrabold text-pietra-green">Ver más proyectos con este material <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {material.images.map((image, index) => (
              <div key={`${image}-inspiration-${index}`} className="relative min-h-[230px] overflow-hidden rounded-md border border-pietra-border bg-white shadow-card">
                <Image src={image} alt={`${material.name} inspiración ${index + 1}`} fill className="object-cover" sizes="(min-width: 768px) 25vw, 100vw" />
              </div>
            ))}
          </div>
        </section>

        <section id="relacionados" className="luxe-container py-8 md:py-12">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-pietra-brown">Materiales relacionados</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-pietra-ink md:text-4xl">También te puede interesar</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {relatedMaterials.map((related) => (
              <MaterialCard key={related.slug} material={related} />
            ))}
          </div>
        </section>

        <section className="luxe-container pb-10 md:pb-14">
          <div className="rounded-md border border-pietra-border bg-white p-7 shadow-card md:p-10">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-pietra-brown"><Sparkles className="h-4 w-4" /> Asesoramiento a medida</p>
                <h2 className="font-display text-3xl font-bold text-pietra-ink md:text-5xl">¿Este material puede funcionar en tu proyecto?</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-pietra-muted">Nuestro equipo te ayuda a elegir la mejor opción según tus necesidades, estilo y presupuesto.</p>
              </div>
              <WhatsappLink message={material.whatsappMessage} className="rounded-md px-7">Hablar con Pietra por WhatsApp</WhatsappLink>
            </div>
          </div>
        </section>

        <Benefits />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
