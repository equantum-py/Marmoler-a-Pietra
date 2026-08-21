'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { buildWhatsappUrl } from '@/lib/whatsapp';

const menuLinks = [
  { label: 'Ambientes', href: '/#ambientes' },
  { label: 'Materiales', href: '/#materiales' },
  { label: 'Proyectos', href: '/proyectos' },
];

const OFFICIAL_LOGO = '/images/logo/logo_correcto_v2 (1).png';
const QUOTE_MESSAGE = 'Hola, quiero cotizar un proyecto con Marmolería Pietra.';

type SiteSettings = {
  whatsapp_number?: string | null;
};

async function getPublicSiteSettings() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  try {
    const response = await fetch(
      `${url}/rest/v1/site_settings?id=eq.pietra&select=whatsapp_number&limit=1`,
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
  const [whatsappHref, setWhatsappHref] = useState(buildWhatsappUrl(QUOTE_MESSAGE));

  useEffect(() => {
    getPublicSiteSettings().then((settings) => {
      if (settings?.whatsapp_number) {
        setWhatsappHref(buildWhatsappUrl(QUOTE_MESSAGE, settings.whatsapp_number));
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-pietra-border bg-white/95 backdrop-blur-xl">
      <div className="luxe-container relative flex h-[78px] items-center justify-between gap-5 lg:h-[92px]">
        <Link
          href="/#inicio"
          className="relative block h-[56px] w-[194px] shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pietra-green md:h-[62px] md:w-[236px] lg:h-[66px] lg:w-[266px]"
          aria-label="Ir al inicio de Marmolería Pietra"
        >
          <Image
            src={OFFICIAL_LOGO}
            alt="Marmolería Pietra"
            fill
            priority
            unoptimized
            className="object-contain object-left"
            sizes="(min-width: 1024px) 266px, (min-width: 768px) 236px, 194px"
          />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex"
        >
          {menuLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-sm px-2 py-3 text-[15px] font-semibold leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pietra-green xl:text-base ${
                index === 0
                  ? 'text-pietra-green hover:text-pietra-ink'
                  : 'text-pietra-ink hover:text-pietra-green'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="hidden min-h-12 items-center justify-center rounded-md bg-pietra-green px-6 py-3 text-[15px] font-bold text-white shadow-soft transition-colors hover:bg-[#3E5549] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pietra-green xl:text-base lg:inline-flex"
          aria-label="Cotizar un proyecto por WhatsApp"
        >
          Cotizar por WhatsApp
        </a>

        <button
          type="button"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-pietra-border bg-white text-pietra-green transition-colors hover:border-pietra-green hover:bg-pietra-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pietra-green lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        {open && (
          <nav
            id="mobile-navigation"
            aria-label="Navegación móvil"
            className="absolute left-0 right-0 top-full z-50 border-t border-pietra-border bg-white p-4 shadow-card lg:hidden"
          >
            <div className="flex flex-col">
              {menuLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center rounded-sm border-b border-pietra-border px-3 py-3 text-base font-semibold transition-colors last:border-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-pietra-green ${
                    index === 0
                      ? 'text-pietra-green hover:text-pietra-ink'
                      : 'text-pietra-ink hover:text-pietra-green'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex min-h-12 items-center justify-center rounded-md bg-pietra-green px-5 py-3 text-base font-bold text-white transition-colors hover:bg-[#3E5549] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pietra-green"
                aria-label="Cotizar un proyecto por WhatsApp"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
