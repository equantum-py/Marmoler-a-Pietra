'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { buildWhatsappUrl } from '@/lib/whatsapp';

const menuLinks = [
  { label: 'Home', href: '/#inicio' },
  { label: 'Materiales', href: '/#materiales' },
  { label: 'Ambientes', href: '/#categorias' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Contacto', href: '/#contacto' },
];

const OFFICIAL_LOGO = '/images/logo/logo_correcto_v2 (1).png';

type SiteSettings = {
  instagram_url?: string | null;
  whatsapp_number?: string | null;
};

async function getPublicSiteSettings() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  try {
    const response = await fetch(
      `${url}/rest/v1/site_settings?id=eq.pietra&select=instagram_url,whatsapp_number&limit=1`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
      },
    );

    if (!response.ok) return null;

    const rows = await response.json();
    return Array.isArray(rows) ? (rows[0] as SiteSettings | undefined) ?? null : null;
  } catch {
    return null;
  }
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [instagramUrl, setInstagramUrl] = useState('https://www.instagram.com/marmoleria_pietra');
  const [whatsappHref, setWhatsappHref] = useState(
    buildWhatsappUrl('Hola, quiero cotizar con Marmolería Pietra.'),
  );

  useEffect(() => {
    getPublicSiteSettings().then((settings) => {
      if (settings?.instagram_url) setInstagramUrl(settings.instagram_url);
      if (settings?.whatsapp_number) {
        setWhatsappHref(
          buildWhatsappUrl('Hola, quiero cotizar con Marmolería Pietra.', settings.whatsapp_number),
        );
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-pietra-border bg-pietra-background/95 backdrop-blur-xl">
      <div className="bg-pietra-green text-xs text-white">
        <div className="luxe-container flex min-h-8 items-center justify-between gap-4 py-2">
          <p className="truncate">
            Paraguay&nbsp;&nbsp; | &nbsp;&nbsp;Cotización por WhatsApp&nbsp;&nbsp; | &nbsp;&nbsp;Fabricación e instalación a medida
          </p>

          <div className="hidden items-center gap-4 md:flex">
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="hover:opacity-80">
              Instagram
            </a>
            <span>|</span>
            <Link href="/#contacto" className="hover:opacity-80">
              Contacto
            </Link>
            <span>|</span>
            <Link href="/#beneficios" className="hover:opacity-80">
              FAQs
            </Link>
          </div>
        </div>
      </div>

      <div className="luxe-container grid gap-4 py-3 lg:grid-cols-[240px_1fr_auto] lg:items-center">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/#inicio"
            className="relative block h-[54px] w-[180px] md:h-[64px] md:w-[240px] lg:w-[250px]"
            aria-label="Marmolería Pietra"
          >
            <Image
              src={OFFICIAL_LOGO}
              alt="Marmolería Pietra"
              fill
              priority
              unoptimized
              className="object-contain object-left"
              sizes="(min-width: 1024px) 250px, (min-width: 768px) 240px, 180px"
            />
          </Link>

          <button
            type="button"
            className="rounded-md border border-pietra-border p-3 text-pietra-green lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="hidden overflow-hidden rounded-md border border-pietra-border bg-white shadow-sm lg:grid lg:grid-cols-[1fr_220px_58px]">
          <input
            className="h-12 min-w-0 px-4 text-sm outline-none placeholder:text-pietra-muted"
            placeholder="Buscar mármol, granito, cuarzo..."
          />

          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 border-l border-pietra-border px-4 text-sm text-pietra-muted transition hover:text-pietra-green"
          >
            Seleccionar categoría <ChevronDown className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="flex h-12 items-center justify-center bg-pietra-green text-white transition hover:bg-pietra-sage"
            aria-label="Buscar materiales"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/#materiales" className="text-sm font-bold text-pietra-ink hover:text-pietra-green">
            Materiales
          </Link>
          <Link href="/proyectos" className="text-sm font-bold text-pietra-ink hover:text-pietra-green">
            Proyectos
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-pietra-green px-5 py-3 text-sm font-bold text-white shadow-soft transition duration-300 hover:bg-pietra-sage"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-pietra-border bg-white/72">
        <nav className="luxe-container flex min-h-12 items-center gap-6 text-xs font-bold uppercase tracking-[0.08em] text-pietra-ink">
          <Link href="/#categorias" className="hidden items-center gap-2 text-pietra-green lg:flex">
            <Menu className="h-4 w-4" /> Explorar categorías
          </Link>

          <div
            className={`${
              open ? 'flex' : 'hidden'
            } absolute left-4 right-4 top-[128px] z-50 flex-col gap-3 rounded-xl border border-pietra-border bg-white p-5 shadow-card lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
          >
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="whitespace-nowrap px-2 py-2 hover:text-pietra-green"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/#contacto" className="ml-auto hidden shrink-0 items-center gap-2 text-pietra-ink hover:text-pietra-green md:flex">
            ☞ Cotización rápida
          </Link>
        </nav>
      </div>
    </header>
  );
}
