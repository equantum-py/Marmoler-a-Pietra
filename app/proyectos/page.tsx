import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { FloatingWhatsapp } from '@/components/floating-whatsapp';
import { Navbar } from '@/components/navbar';
import { ProjectWorkGallery } from '@/components/project-work-gallery';
import { Footer } from '@/sections/footer';
import { projectWorks } from '@/data/project-works';
import { whatsappUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Trabajos realizados | Marmolería Pietra',
  description:
    'Conocé trabajos realizados por Marmolería Pietra en cocinas, baños y quinchos con superficies a medida.',
};

export default function ProyectosPage() {
  const cocinaCount = projectWorks.filter((project) => project.category === 'Cocinas').length;
  const banoCount = projectWorks.filter((project) => project.category === 'Baños').length;
  const quinchoCount = projectWorks.filter((project) => project.category === 'Quinchos').length;

  return (
    <>
      <Navbar />

      <main className="bg-pietra-light text-pietra-black">
        <section className="border-b border-pietra-border bg-white">
          <div className="luxe-container flex flex-wrap items-center gap-2 py-5 text-sm text-pietra-muted">
            <Link href="/" className="hover:text-pietra-green">
              Inicio
            </Link>
            <span>/</span>
            <span className="font-semibold text-pietra-black">Proyectos</span>
          </div>
        </section>

        <section className="luxe-container py-12 md:py-16">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-pietra-green transition hover:text-pietra-brown"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          <div className="grid gap-8 md:grid-cols-[1fr_.75fr] md:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-pietra-brown">
                Portfolio Pietra
              </p>
              <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-none text-pietra-black md:text-6xl">
                Trabajos realizados en cocinas, baños y quinchos.
              </h1>
            </div>

            <p className="text-base leading-8 text-pietra-muted">
              Una selección de proyectos reales para visualizar terminaciones, aplicaciones y estilos posibles antes de cotizar tu superficie.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-pietra-border bg-white p-5 shadow-sm">
              <p className="font-display text-4xl font-semibold">{projectWorks.length}</p>
              <p className="mt-1 text-sm font-bold text-pietra-muted">Trabajos cargados</p>
            </div>

            <div className="rounded-2xl border border-pietra-border bg-white p-5 shadow-sm">
              <p className="font-display text-4xl font-semibold">{cocinaCount}</p>
              <p className="mt-1 text-sm font-bold text-pietra-muted">Cocinas</p>
            </div>

            <div className="rounded-2xl border border-pietra-border bg-white p-5 shadow-sm">
              <p className="font-display text-4xl font-semibold">{banoCount}</p>
              <p className="mt-1 text-sm font-bold text-pietra-muted">Baños</p>
            </div>

            <div className="rounded-2xl border border-pietra-border bg-white p-5 shadow-sm">
              <p className="font-display text-4xl font-semibold">{quinchoCount}</p>
              <p className="mt-1 text-sm font-bold text-pietra-muted">Quinchos</p>
            </div>
          </div>
        </section>

        <ProjectWorkGallery />

        <section className="luxe-container pb-16">
          <div className="rounded-[2rem] bg-[#1F1F1C] p-8 text-white md:p-10">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-pietra-warm">
                  Proyecto a medida
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold">
                  ¿Querés una superficie similar?
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-white/75">
                  Enviános fotos, medidas o una referencia del ambiente y te ayudamos a elegir la mejor opción.
                </p>
              </div>

              <a
                href={whatsappUrl('Hola Pietra, quiero cotizar un proyecto a medida.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#D9C7AA] px-7 text-sm font-bold text-[#1F1F1C] transition hover:bg-[#C4B5A0]"
              >
                <MessageCircle className="h-4 w-4" />
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
