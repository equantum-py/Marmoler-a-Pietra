import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircle2, Grid2X2, Layers3, MessageCircle, Sparkles } from 'lucide-react';
import { FloatingWhatsapp } from '@/components/floating-whatsapp';
import { MaterialCard } from '@/components/material-card';
import { Navbar } from '@/components/navbar';
import { WhatsappLink } from '@/components/whatsapp-link';
import { Footer } from '@/sections/footer';
import {
  getPublicMaterialBySlug,
  getPublicMaterialSlugs,
  getRelatedPublicMaterials,
} from '@/lib/materials/public-materials';

export const revalidate = 60;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

async function resolveParams(params: PageProps['params']) {
  return await params;
}

function getImages(material: Record<string, any>) {
  const images = material.images || [];
  const gallery = material.gallery || [];

  return Array.from(
    new Set([
      material.main_image,
      material.mainImage,
      material.image,
      ...images,
      ...gallery,
    ].filter(Boolean)),
  );
}

function getWhatsappMessage(material: Record<string, any>) {
  return (
    material.whatsapp_message ||
    material.whatsappMessage ||
    `Hola Pietra, quiero cotizar el material ${material.name}. ¿Me pueden asesorar?`
  );
}

export async function generateStaticParams() {
  const slugs = await getPublicMaterialSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);
  const material = await getPublicMaterialBySlug(slug);

  if (!material) {
    return {
      title: 'Material no encontrado | Marmolería Pietra',
    };
  }

  return {
    title:
      material.seo_title ||
      material.seoTitle ||
      `${material.name} para mesadas y superficies | Marmolería Pietra`,
    description:
      material.seo_description ||
      material.seoDescription ||
      material.short_description ||
      material.shortDescription ||
      `Cotizá ${material.name} para cocinas, baños, quinchos y revestimientos con Marmolería Pietra.`,
  };
}

export default async function MaterialPage({ params }: PageProps) {
  const { slug } = await resolveParams(params);
  const material = await getPublicMaterialBySlug(slug);

  if (!material) {
    notFound();
  }

  const images = getImages(material);
  const mainImage = images[0];
  const relatedMaterials = await getRelatedPublicMaterials(material);

  const applications = material.applications?.length
    ? material.applications
    : ['Cocinas', 'Mesadas', 'Baños', 'Quinchos'];

  const benefits = material.benefits?.length
    ? material.benefits
    : ['Asesoramiento personalizado', 'Fabricación a medida', 'Terminación premium'];

  return (
    <>
      <Navbar />

      <main className="bg-pietra-light text-pietra-black">
        <section className="border-b border-pietra-border bg-white">
          <div className="luxe-container py-5 text-sm text-pietra-muted">
            <a href="/" className="hover:text-pietra-green">Inicio</a>
            <span className="mx-2">/</span>
            <a href="/#materiales" className="hover:text-pietra-green">Materiales</a>
            <span className="mx-2">/</span>
            <span className="font-semibold text-pietra-black">{material.name}</span>
          </div>
        </section>

        <section className="luxe-container grid gap-10 py-12 lg:grid-cols-[1.05fr_.95fr] lg:py-16">
          <div>
            <div className="overflow-hidden rounded-[2rem] border border-pietra-border bg-white shadow-sm">
              {mainImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mainImage}
                  alt={material.name}
                  className="h-[420px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[420px] items-center justify-center bg-pietra-warm text-pietra-muted">
                  Sin imagen principal
                </div>
              )}
            </div>

            {images.length > 1 ? (
              <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-4">
                {images.slice(1, 9).map((image) => (
                  <div
                    key={image}
                    className="overflow-hidden rounded-2xl border border-pietra-border bg-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={`Galería ${material.name}`}
                      className="h-28 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-pietra-border bg-white p-8 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-pietra-brown">
                {material.category}
              </p>

              <h1 className="font-display text-5xl font-semibold leading-none text-pietra-black md:text-6xl">
                {material.name}
              </h1>

              <p className="mt-6 text-lg leading-8 text-pietra-muted">
                {material.short_description || material.shortDescription}
              </p>

              <p className="mt-5 leading-8 text-pietra-muted">
                {material.long_description || material.longDescription}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsappLink message={getWhatsappMessage(material)} className="px-7 py-4">
                  Cotizar este material
                </WhatsappLink>

                <a
                  href="#relacionados"
                  className="inline-flex items-center justify-center rounded-full border border-pietra-border px-7 py-4 text-sm font-bold text-pietra-black transition hover:border-pietra-green hover:text-pietra-green"
                >
                  Ver similares
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-pietra-border bg-pietra-green p-7 text-white shadow-sm">
              <MessageCircle className="mb-4 h-8 w-8" />
              <h2 className="font-display text-3xl">¿Querés cotizar este material?</h2>
              <p className="mt-3 leading-7 text-white/80">
                Enviános medidas, fotos o referencias de tu espacio y te asesoramos por WhatsApp.
              </p>
              <WhatsappLink
                message={getWhatsappMessage(material)}
                className="mt-6 bg-white px-6 py-3 text-pietra-black hover:bg-pietra-warm"
              >
                Hablar con Pietra
              </WhatsappLink>
            </div>
          </div>
        </section>

        <section className="luxe-container py-10">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              ['Tipo', material.category],
              ['Color', material.color],
              ['Acabado', material.finish],
              ['Uso recomendado', material.recommended_use || material.recommendedUse],
              ['Resistencia', material.resistance],
              ['Mantenimiento', material.maintenance],
            ].map(([label, value]) => (
              <article
                key={label}
                className="rounded-[1.5rem] border border-pietra-border bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-pietra-brown">
                  {label}
                </p>
                <p className="mt-3 font-semibold text-pietra-black">{value || 'A definir'}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="luxe-container grid gap-8 py-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-pietra-brown">
              Aplicaciones
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold">
              Ideal para estos espacios.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {applications.map((item: string) => (
              <article
                key={item}
                className="rounded-[1.5rem] border border-pietra-border bg-white p-6 shadow-sm"
              >
                <Grid2X2 className="mb-4 h-6 w-6 text-pietra-green" />
                <h3 className="font-semibold text-pietra-black">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-pietra-muted">
                  Recomendado para proyectos a medida con asesoramiento técnico.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="luxe-container grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-pietra-brown">
                Beneficios
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold">
                Por qué elegir {material.name}.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit: string) => (
                <article
                  key={benefit}
                  className="rounded-[1.5rem] border border-pietra-border bg-pietra-light p-6"
                >
                  <CheckCircle2 className="mb-4 h-6 w-6 text-pietra-green" />
                  <p className="font-semibold">{benefit}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {relatedMaterials.length ? (
          <section id="relacionados" className="luxe-container py-16">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-pietra-brown">
                Materiales relacionados
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold">
                También te puede interesar.
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedMaterials.map((related: any) => (
                <MaterialCard key={related.slug} material={related} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="luxe-container pb-16">
          <div className="rounded-[2rem] border border-pietra-border bg-pietra-black p-10 text-white">
            <Sparkles className="mb-4 h-7 w-7 text-pietra-warm" />
            <h2 className="font-display text-4xl">¿Este material puede funcionar en tu proyecto?</h2>
            <p className="mt-4 max-w-2xl leading-8 text-white/75">
              Nuestro equipo te ayuda a elegir la mejor opción según tu espacio, estilo y necesidad.
            </p>
            <WhatsappLink message={getWhatsappMessage(material)} className="mt-7 bg-white px-7 py-4 text-pietra-black hover:bg-pietra-warm">
              Consultar por WhatsApp
            </WhatsappLink>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
