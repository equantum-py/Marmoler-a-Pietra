'use client';

import Image from 'next/image';
import { ChevronDown, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { WhatsappLink } from '@/components/whatsapp-link';

const menuLinks = ['Home', 'Materiales', 'Ambientes', 'Proyectos', 'Contacto'];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-pietra-border bg-pietra-background/95 backdrop-blur-xl">
      <div className="bg-pietra-green text-white">
        <div className="luxe-container flex min-h-8 items-center justify-between gap-4 text-[11px] font-semibold">
          <p>Paraguay&nbsp;&nbsp; | &nbsp;&nbsp;Cotización por WhatsApp&nbsp;&nbsp; | &nbsp;&nbsp;Fabricación e instalación a medida</p>
          <div className="hidden items-center gap-4 md:flex">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <span>|</span>
            <a href="/#contacto">Contacto</a>
            <span>|</span>
            <a href="/#beneficios">FAQs</a>
          </div>
        </div>
      </div>

      <div className="luxe-container grid gap-4 py-5 lg:grid-cols-[280px_1fr_auto] lg:items-center">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="relative block h-20 w-60 sm:w-64 lg:h-24 lg:w-72" aria-label="Marmolería Pietra">
            <Image src="/logo-pietra.svg" alt="Marmolería Pietra" fill priority className="object-contain object-left" sizes="(min-width: 1024px) 288px, 256px" />
          </a>
          <button type="button" className="rounded-md border border-pietra-border p-3 text-pietra-green lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Abrir menú">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="hidden overflow-hidden rounded-md border border-pietra-border bg-white shadow-sm lg:grid lg:grid-cols-[1fr_220px_58px]">
          <input className="min-h-12 bg-white px-5 text-sm text-pietra-ink outline-none placeholder:text-pietra-muted/70" placeholder="Buscar mármol, granito, cuarzo..." />
          <button type="button" className="flex min-h-12 items-center justify-between border-l border-pietra-border px-5 text-sm text-pietra-muted">
            Seleccionar categoría <ChevronDown className="h-4 w-4" />
          </button>
          <button type="button" className="flex items-center justify-center bg-pietra-green text-white transition hover:bg-pietra-sage" aria-label="Buscar materiales">
            <Search className="h-5 w-5" />
          </button>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <a href="/#materiales" className="text-sm font-bold text-pietra-ink hover:text-pietra-green">Materiales</a>
          <a href="/#proyectos" className="text-sm font-bold text-pietra-ink hover:text-pietra-green">Proyectos</a>
          <WhatsappLink message="Hola, quiero cotizar con Marmolería Pietra." className="min-h-10 rounded-lg px-5 py-2">WhatsApp</WhatsappLink>
        </div>
      </div>

      <div className="border-t border-pietra-border bg-white/72">
        <nav className="luxe-container flex min-h-11 items-center justify-between gap-5 overflow-x-auto text-xs font-extrabold uppercase tracking-[0.02em] text-pietra-ink no-scrollbar">
          <a href="/#categorias" className="flex min-h-11 shrink-0 items-center gap-2 bg-pietra-green px-5 text-white"><Menu className="h-4 w-4" /> Explorar categorías</a>
          <div className={`${open ? 'flex' : 'hidden'} absolute left-4 right-4 top-[161px] z-50 flex-col gap-3 rounded-xl border border-pietra-border bg-white p-5 shadow-card lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
            {menuLinks.map((link) => (
              <a key={link} href={link === 'Home' ? '/' : `/#${link.toLowerCase()}`} onClick={() => setOpen(false)} className="whitespace-nowrap px-2 py-2 hover:text-pietra-green">
                {link}
              </a>
            ))}
          </div>
          <a href="/#contacto" className="ml-auto hidden shrink-0 items-center gap-2 text-pietra-ink hover:text-pietra-green md:flex">☞ Cotización rápida</a>
        </nav>
      </div>
    </header>
  );
}
