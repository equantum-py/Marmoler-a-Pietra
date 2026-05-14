import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Grid2X2,
  Hammer,
  MessageCircle,
  Ruler,
  Sparkles,
} from 'lucide-react';
import { FloatingWhatsapp } from '@/components/floating-whatsapp';
import { MaterialCard } from '@/components/material-card';
import { Navbar } from '@/components/navbar';
import { WhatsappLink } from '@/components/whatsapp-link';
import { whatsappUrl } from '@/lib/whatsapp';
import { Footer } from '@/sections/footer';
import {
  getPublicMaterialBySlug,
  getPublicMaterialSlugs,
  getRelatedPublicMaterials,
} from '@/lib/materials/public-materials';

export const revalidate = 60;
export const dynamicParams = true;

type PublicMaterialView = {
  slug: string;
  name: string;
  category: string;
  shortDescription?: string;
  short_description?: string;
  longDescription?: string;
  long_description?: string;
  recommendedUse?: string;
  recommended_use?: string;
  whatsappMessage?: string;
  whatsapp_message?: string;
  seoTitle?: string;
  seo_title?: string;
  seoDescription?: string;
  seo_description?: string;
  relatedSlugs?: string[];
  related_slugs?: string[];
  mainImage?: string;
  main_image?: string;
  image?: string;
  images?: string[];
  gallery?: string[];
  applications?: string[];
  benefits?: string[];
  color?: string;
  finish?: string;
  resistance?: string;
  maintenance?: string;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

type DetailItem = {
  label: string;
  value?: string | null;
  helper: string;
};

async function resolveParams(params: PageProps['params']) {
  return params;
}

function getImages(material: PublicMaterialView) {
  const images = material.images || [];
  const gallery = material.gallery || [];

  return Array.from(
    new Set(
      [
        material.main_image,
        material.mainImage,
        material.image,
        ...images,
        ...gallery,
      ].filter((image): image is string => Boolean(image)),
    ),
  );
}

function capitalizeText(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getTextList(value?: string) {
  if (!value) return [];

  return value
    .split(',')
    .map((item) => capitalizeText(item.trim()))
    .filter(Boolean);
}

function getWhatsappMessage(material: PublicMaterialView) {
  return (
    material.whatsapp_message ||
    material.whatsappMessage ||
    `Hola Pietra, quiero cotizar el material ${material.name}. ¿Me pueden asesorar?`
  );
}

function getShortDescription(material: PublicMaterialView) {
  return (
    material.short_description ||
    material.shortDescription ||
    `${material.name} para cocinas, baños, mesadas, barras y superficies a medida.`
  );
}

function getLongDescription(material: PublicMaterialView) {
  return (
    material.long_description ||
    material.longDescription ||
    `${material.name} es una opción seleccionada por Marmolería Pietra para proyectos residenciales y comerciales que buscan terminación profesional, buena presencia visual y fabricación a medida.`
  );
}

function getApplications(material: PublicMaterialView) {
  const directApplications = material.applications?.length ? material.applications : [];
  const recommendedUse = getTextList(material.recommended_use || material.recommendedUse);

  const applications = directApplications.length ? directApplications : recommendedUse;

  return applications.length
    ? applications
    : ['Cocinas', 'Baños', 'Mesadas', 'Barras', 'Quinchos', 'Revestimientos'];
}

function getBenefits(material: PublicMaterialView) {
  if (material.benefits?.length) {
    return material.benefits;
  }

  if (material.category === 'Mármol') {
    return [
      'Estética natural de alto valor decorativo',
      'Ideal para interiores elegantes',
      'Terminación premium con asesoramiento técnico',
      'Fabricación a medida según cada proyecto',
    ];
  }

  if (material.category === 'Sinterizado') {
    return [
      'Superficie técnica de alta resistencia',
      'Excelente presencia para proyectos premium',
      'Fácil mantenimiento diario',
      'Versátil para cocinas, baños y revestimientos',
    ];
  }

  return [
    'Alta resistencia para uso diario',
    'Buena presencia visual en proyectos modernos',
    'Fácil combinación con distintos estilos',
    'Fabricación e instalación a medida',
  ];
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
      getShortDescription(material),
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
  const relatedMaterials = (await getRelatedPublicMaterials(material, 4)) as PublicMaterialView[];
  const applications = getApplications(material);
  const benefits = getBenefits(material);
  const whatsappMessage = getWhatsappMessage(material);

  const details: DetailItem[] = [
    {
      label: 'Categoría',
      value: material.category,
      helper: 'Tipo de superficie',
    },
    {
      label: 'Color',
      value: material.color,
      helper: 'Tono predominante',
    },
    {
      label: 'Acabado',
      value: material.finish,
      helper: 'Terminación visual',
    },
    {
      label: 'Uso recomendado',
      value: material.recommended_use || material.recommendedUse,
      helper: 'Aplicaciones sugeridas',
    },
    {
      label: 'Resistencia',
      value: material.resistance,
      helper: 'Comportamiento esperado',
    },
    {
      label: 'Mantenimiento',
      value: material.maintenance,
      helper: 'Cuidado diario',
    },
  ];

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
            <Link href="/#materiales" className="hover:text-pietra-green">
              Materiales
            </Link>
            <span>/</span>
            <span className="font-semibold text-pietra-black">{material.name}</span>
          </div>
        </section>

        <section className="luxe-container py-10 lg:py-16">
          <Link
            href="/#materiales"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-pietra-green transition hover:text-pietra-brown"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:items-start">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-[2rem] border border-pietra-border bg-white shadow-sm">
                {mainImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={mainImage}
                    alt={material.name}
                    className="h-[360px] w-full object-cover md:h-[500px]"
                  />
                ) : (
                  <div className="flex h-[420px] items-center justify-center bg-pietra-warm text-pietra-muted">
                    Sin imagen principal
                  </div>
                )}
              </div>

              {images.length > 1 ? (
                <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                  {images.slice(1, 11).map((image) => (
                    <div
                      key={image}
                      className="overflow-hidden rounded-2xl border border-pietra-border bg-white shadow-sm"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={`Vista adicional de ${material.name}`}
                        className="h-24 w-full object-cover md:h-28"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <aside className="space-y-5 lg:sticky lg:top-36">
              <div className="rounded-[2rem] border border-pietra-border bg-white p-7 shadow-sm md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-pietra-brown">
                  {material.category}
                </p>

                <h1 className="mt-4 font-display text-5xl font-semibold leading-none text-pietra-black md:text-6xl">
                  {material.name}
                </h1>

                <p className="mt-6 text-lg leading-8 text-pietra-muted">
                  {getShortDescription(material)}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-pietra-light p-4">
                    <BadgeCheck className="mb-3 h-5 w-5 text-pietra-green" />
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-pietra-brown">
                      Calidad
                    </p>
                    <p className="mt-1 text-sm font-semibold">Selección Pietra</p>
                  </div>

                  <div className="rounded-2xl bg-pietra-light p-4">
                    <Ruler className="mb-3 h-5 w-5 text-pietra-green" />
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-pietra-brown">
                      Proyecto
                    </p>
                    <p className="mt-1 text-sm font-semibold">A medida</p>
                  </div>

                  <div className="rounded-2xl bg-pietra-light p-4">
                    <Hammer className="mb-3 h-5 w-5 text-pietra-green" />
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-pietra-brown">
                      Servicio
                    </p>
                    <p className="mt-1 text-sm font-semibold">Instalación</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <WhatsappLink message={whatsappMessage} className="px-7 py-4">
                    Cotizar este material
                  </WhatsappLink>

                  <a
                    href="#ficha-tecnica"
                    className="inline-flex items-center justify-center rounded-full border border-pietra-border px-7 py-4 text-sm font-bold text-pietra-black transition hover:border-pietra-green hover:text-pietra-green"
                  >
                    Ver ficha técnica
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-pietra-green/20 bg-pietra-green p-7 text-white shadow-sm">
                <MessageCircle className="mb-4 h-8 w-8" />
                <h2 className="font-display text-3xl">Asesoramiento por WhatsApp</h2>
                <p className="mt-3 leading-7 text-white/80">
                  Enviános medidas, fotos o referencias de tu espacio y te orientamos con la
                  mejor opción para tu proyecto.
                </p>

                <a
                  href={whatsappUrl(whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#D9C7AA] px-6 py-3 text-sm font-bold text-[#1F1F1C] shadow-soft transition duration-300 hover:bg-[#C4B5A0]"
                >
                  <MessageCircle className="h-4 w-4 text-pietra-black" />
                  Hablar con Pietra
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="luxe-container pb-12">
          <div className="rounded-[2rem] border border-pietra-border bg-white p-7 shadow-sm md:p-10">
            <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-pietra-brown">
                  Descripción
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold">
                  Una superficie pensada para proyectos a medida.
                </h2>
              </div>

              <div className="space-y-5 text-base leading-8 text-pietra-muted">
                <p>{getLongDescription(material)}</p>
                <p>
                  En Marmolería Pietra acompañamos la elección del material considerando el uso,
                  el estilo del ambiente, las medidas del proyecto y el tipo de terminación que
                  necesita cada espacio.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="ficha-tecnica" className="luxe-container py-12">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-pietra-brown">
                Ficha técnica
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold">
                Datos clave del material.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-pietra-muted">
              La información técnica puede variar según disponibilidad, lote, terminación y
              tipo de instalación.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {details.map((item) => (
              <article
                key={item.label}
                className="rounded-[1.5rem] border border-pietra-border bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-pietra-brown">
                  {item.label}
                </p>
                <p className="mt-3 text-lg font-semibold text-pietra-black">
                  {item.value || 'A definir'}
                </p>
                <p className="mt-2 text-sm leading-6 text-pietra-muted">{item.helper}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="luxe-container grid gap-8 py-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-pietra-brown">
              Aplicaciones
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold">
              Ideal para estos espacios.
            </h2>
            <p className="mt-4 max-w-md leading-7 text-pietra-muted">
              La elección final depende del uso, medidas, exposición y estilo del proyecto.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {applications.slice(0, 8).map((item) => (
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
              {benefits.map((benefit) => (
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
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-pietra-brown">
                  Materiales relacionados
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold">
                  También te puede interesar.
                </h2>
              </div>

              <Link
                href="/#materiales"
                className="text-sm font-bold text-pietra-green hover:text-pietra-brown"
              >
                Ver catálogo completo
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedMaterials.map((related) => (
                <MaterialCard key={related.slug} material={related} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="luxe-container pb-16">
          <div className="overflow-hidden rounded-[2rem] bg-[#1F1F1C] text-white shadow-sm">
            <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Sparkles className="mb-4 h-7 w-7 text-white" />
                <h2 className="font-display text-4xl">
                  ¿Este material puede funcionar en tu proyecto?
                </h2>
                <p className="mt-4 max-w-2xl leading-8 text-white/75">
                  Nuestro equipo te ayuda a elegir la mejor opción según tu espacio, estilo,
                  medidas y necesidad de uso.
                </p>
              </div>

              <a
                href={whatsappUrl(whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#D9C7AA] px-7 py-4 text-sm font-bold text-[#1F1F1C] shadow-soft transition duration-300 hover:bg-[#C4B5A0]"
              >
                <MessageCircle className="h-4 w-4 text-pietra-black" />
                Consultar por WhatsApp
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
