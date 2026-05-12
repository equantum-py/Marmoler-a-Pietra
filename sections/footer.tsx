import Image from 'next/image';
import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { whatsappUrl } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer id="contacto" className="bg-pietra-dark py-10 text-white">
      <div className="luxe-container grid gap-9 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
        <div>
          <div className="relative h-16 w-48 brightness-0 invert">
            <Image src="/logo-pietra.svg" alt="Marmolería Pietra" fill className="object-contain object-left" sizes="192px" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">Especialistas en mármol, granito, cuarzo y piedras sinterizadas. Diseñamos, fabricamos e instalamos superficies premium en todo Paraguay.</p>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-white">Servicios</h3>
          <div className="grid gap-2 text-sm text-white/70"><span>Cocinas a medida</span><span>Baños</span><span>Quinchos y barras</span><span>Revestimientos</span><span>Escaleras y piezas especiales</span></div>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-white">Contacto</h3>
          <div className="grid gap-2 text-sm text-white/70">
            <a className="flex items-center gap-2" href={whatsappUrl('Hola, quiero contactar con Pietra.')} target="_blank" rel="noreferrer"><Phone className="h-4 w-4" /> +595 981 123 456</a>
            <a className="flex items-center gap-2" href="mailto:info@marmoleriapietra.com.py"><Mail className="h-4 w-4" /> info@marmoleriapietra.com.py</a>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Asunción, Paraguay</span>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-white">Seguinos</h3>
          <div className="grid gap-2 text-sm text-white/70">
            <a className="flex items-center gap-2" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram className="h-4 w-4" /> Instagram</a>
            <a className="flex items-center gap-2" href={whatsappUrl('Hola, vengo desde la web de Pietra.')} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="luxe-container mt-8 border-t border-white/10 pt-5 text-center text-xs text-white/55">© 2026 Marmolería Pietra. Todos los derechos reservados.</div>
    </footer>
  );
}
