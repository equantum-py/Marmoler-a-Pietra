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

const FALLBACK_LOGO = '/logo-pietra.svg';
const QUOTE_MESSAGE = 'Hola, quiero cotizar un proyecto con Marmolería Pietra.';

type SiteSettings = {
  logo_desktop?: string | null;
  logo_mobile?: string | null;
  whatsapp_number?: string | null;
};

async function getPublicSiteSettings() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  try {
    const response = await fetch(
      `${url}/rest/v1/site_settings?id=eq.pietra&select=logo_desktop,logo_mobile,whatsapp_number&limit=1`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!response.ok) return null;
    const rows = await response.json();
    return Array.isArray(rows) ? ((rows[0] as SiteSettings | undefined) ?? null) : null;
  } catch {
    return null;
  }
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [logoDesktop, setLogoDesktop] = useState(FALLBACK_LOGO);
  const [logoMobile, setLogoMobile] = useState(FALLBACK_LOGO);
  const [whatsappHref, setWhatsappHref] = useState(buildWhatsappUrl(QUOTE_MESSAGE));

  useEffect(() => {
    getPublicSiteSettings().then((settings) => {
      if (settings?.logo_desktop) setLogoDesktop(settings.logo_desktop);
      if (settings?.logo_mobile) setLogoMobile(settings.logo_mobile);
      if (settings?.whatsapp_number) {
        setWhatsappHref(buildWhatsappUrl(QUOTE_MESSAGE, settings.whatsapp_number));
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-pietra-border bg-pietra-background/95 backdrop-blur-xl">
      <div className="luxe-container relative flex h-[72px] items-center justify-between lg:h-[86px]">
        <Link
          href="/#inicio"
          className="relative block h-11 w-[150px] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pietra-green lg:h-14 lg:w-[210px]"
          aria-label="Ir al inicio de Marmolería Pietra"
        >
          <Image
            src={logoDesktop}
            alt="Marmolería Pietra"
            fill
            priority
            unoptimized
            className="hidden object-contain object-left md:block"
            sizes="210px"
          />
          <Image
            src={logoMobile}
            alt="Marmolería Pietra"
            fill
            priority
            unoptimized
            className="object-contain object-left md:hidden"
            sizes="150px"
          />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
        >
          {menuLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-sm px-1 py-3 text-sm font-semibold text-pietra-ink transition hover:text-pietra-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pietra-green"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="hidden min-h-11 items-center justify-center rounded-md bg-pietra-green px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-pietra-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pietra-green lg:inline-flex"
        >
          Cotizar por WhatsApp
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-pietra-border text-pietra-green transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pietra-green lg:hidden"
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
              {menuLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="min-h-12 border-b border-pietra-border px-2 py-3 text-base font-semibold text-pietra-ink last:border-0 hover:text-pietra-green"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex min-h-12 items-center justify-center rounded-md bg-pietra-green px-5 py-3 text-base font-bold text-white"
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
