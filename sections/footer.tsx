import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { whatsappUrl } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030302] py-12">
      <div className="luxe-container grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <div className="font-display text-4xl tracking-[0.18em] text-pietra-cream">PIETRA.</div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-pietra-stone/70">Especialistas en mármol, granito y cuarzo. Diseñando espacios únicos desde 2008.</p>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-pietra-gold">Navegación</h3>
          <div className="grid gap-3 text-sm text-pietra-stone/75">
            <a href="#proyectos">Proyectos</a><a href="#materiales">Materiales</a><a href="#nosotros">Nosotros</a><a href="#contacto">Contacto</a>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-pietra-gold">Contacto</h3>
          <div className="grid gap-3 text-sm text-pietra-stone/75">
            <a className="flex items-center gap-2" href="mailto:info@pietra.com"><Mail className="h-4 w-4" /> info@pietra.com</a>
            <a className="flex items-center gap-2" href={whatsappUrl('Hola, quiero contactar con Pietra.')} target="_blank" rel="noreferrer"><Phone className="h-4 w-4" /> +595 984 756 158</a>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Asunción, Paraguay</span>
            <a className="flex items-center gap-2" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram className="h-4 w-4" /> Instagram</a>
          </div>
        </div>
      </div>
      <div className="luxe-container mt-10 border-t border-white/10 pt-6 text-xs text-pietra-stone/50">© 2026 Marmolería Pietra. Todos los derechos reservados.</div>
    </footer>
  );
}
