import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FloatingWhatsapp } from '@/components/floating-whatsapp';
import { MaterialCard } from '@/components/material-card';
import { Navbar } from '@/components/navbar';
import { WhatsappLink } from '@/components/whatsapp-link';
import { getPublicMaterials } from '@/lib/materials/public-materials';
import { Footer } from '@/sections/footer';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Mármol, granito y cuarzo para mesadas | Marmolería Pietra',
  description:
    'Explorá mármol, granito, cuarzo y superficies seleccionadas para mesadas, cocinas, baños, quinchos y revestimientos en Paraguay.',
  alternates: {
    canonical: '/materiales',
  },
  openGraph: {
    title: 'Materiales para mesadas y superficies | Marmolería Pietra',
    description:
      'Catálogo de mármol, granito, cuarzo y superficies para proyectos a medida en Paraguay.',
    url: '/materiales',
    type: 'website',
  },
};

export default async function MaterialesPage() {
  const materials = await getPublicMaterials();
  const categories = Array.from(new Set(materials.map((material) => material.category).filter(Boolean)));

  return (
    <>
      <Navbar />

      <main className="bg-pietra-background text-pietra-ink">
        <section className="border-b border-pietra-border bg-white">
          <div className="luxe-container flex flex-wrap items-center gap-2 py-4 text-sm text-pietra-muted">
            <Link href="/" className="rounded-sm hover:text-pietra-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-pietra-green">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-pietra-ink">Materiales</span>
          </div>
        </section>

        <section className="luxe-container py-10 md:py-16">
          <Link
            href="/"
            className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-bold text-pietra-green transition hover:text-pietra-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-pietra-green"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver al inicio
          </Link>

          <div className="grid gap-6 md:grid-cols-[1fr_.8fr] md:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-pietra-brown">
                Catálogo Pietra
              </p>
              <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold leading-[1.05] md:text-6xl">
                Mármol, granito, cuarzo y superficies para tu proyecto.
              </h1>
            </div>

            <div>
              <p className="text-[15px] leading-7 text-pietra-muted md:text-base">
                Compará tonos, texturas y terminaciones para cocinas, baños, mesadas, barras, quinchos y revestimientos. Cada material puede cotizarse a medida.
              </p>

              <WhatsappLink
                message="Hola Pietra, quiero asesoramiento para elegir un material para mi proyecto."
                className="mt-5 w-full justify-center sm:w-fit"
              >
                Pedir asesoramiento
              </WhatsappLink>
            </div>
          </div>

          {categories.length ? (
            <div className="mt-8 flex flex-wrap gap-2" aria-label="Categorías disponibles">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-pietra-border bg-white px-3 py-2 text-sm font-semibold text-pietra-ink"
                >
                  {category}
                </span>
              ))}
            </div>
          ) : null}
        </section>

        <section className="luxe-container pb-14 md:pb-20" aria-labelledby="catalogo-materiales">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-pietra-brown">
                Materiales disponibles
              </p>
              <h2 id="catalogo-materiales" className="mt-2 font-display text-3xl font-semibold md:text-4xl">
                Elegí una superficie para conocer sus detalles.
              </h2>
            </div>
            <span className="hidden text-sm font-semibold text-pietra-muted md:block">
              {materials.length} opciones
            </span>
          </div>

          {materials.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {materials.map((material) => (
                <MaterialCard key={material.slug} material={material} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-pietra-border bg-white p-8 text-center">
              <p className="font-display text-2xl">Estamos actualizando nuestro catálogo.</p>
              <p className="mt-2 text-sm text-pietra-muted">
                Podés consultarnos por WhatsApp y te mostramos las opciones disponibles.
              </p>
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-pietra-border bg-white p-6 md:flex md:items-center md:justify-between md:gap-6 md:p-8">
            <div>
              <h2 className="font-display text-3xl font-semibold">¿No sabés cuál elegir?</h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-7 text-pietra-muted">
                Contanos dónde querés usarlo, el estilo que buscás y las medidas aproximadas. Te ayudamos a comparar alternativas antes de cotizar.
              </p>
            </div>
            <WhatsappLink
              message="Hola Pietra, necesito ayuda para elegir el material ideal para mi proyecto."
              className="mt-5 w-full justify-center md:mt-0 md:w-auto"
            >
              Consultar por WhatsApp <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </WhatsappLink>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
