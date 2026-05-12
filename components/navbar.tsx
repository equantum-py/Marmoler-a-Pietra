'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { WhatsappLink } from '@/components/whatsapp-link';

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#materiales', label: 'Materiales' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'border-b border-white/10 bg-pietra-black/72 py-3 shadow-2xl backdrop-blur-2xl' : 'py-5'
      }`}
    >
      <nav className="luxe-container flex items-center justify-between">
        <a href="#inicio" className="group flex items-center gap-3" aria-label="Marmolería Pietra">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-pietra-gold/40 font-display text-xl text-pietra-gold">P</span>
          <span className="font-display text-2xl font-semibold tracking-[0.18em] text-pietra-cream">PIETRA</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-xs font-semibold uppercase tracking-[0.22em] text-pietra-stone/80 transition hover:text-pietra-gold">
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <WhatsappLink message="Hola, quiero solicitar una cotización premium con Pietra.">WhatsApp</WhatsappLink>
        </div>
        <button className="rounded-full border border-white/15 p-3 text-pietra-cream md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Abrir menú">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open ? (
        <div className="mx-4 mt-4 rounded-[2rem] border border-white/10 bg-pietra-graphite/95 p-6 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm uppercase tracking-[0.24em] text-pietra-stone">
                {link.label}
              </a>
            ))}
            <WhatsappLink message="Hola, quiero cotizar con Marmolería Pietra." className="mt-2 w-full">Cotizar por WhatsApp</WhatsappLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
