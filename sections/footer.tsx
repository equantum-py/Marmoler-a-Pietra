import Link from 'next/link';
import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { getPublicSiteSettings } from '@/lib/site/public-settings';

const serviceLinks = [
  { label: 'Cocinas a medida', href: '/#categorias' },
  { label: 'Baños', href: '/#categorias' },
  { label: 'Quinchos y barras', href: '/#categorias' },
  { label: 'Revestimientos', href: '/#categorias' },
  { label: 'Escaleras y piezas especiales', href: '/#categorias' },
];

export async function Footer() {
  const settings = await getPublicSiteSettings();

  const logo = settings?.logo_desktop || settings?.logo_mobile || '/logo-pietra.svg';
  const companyName = settings?.company_name || 'Marmolería Pietra';
  const email = settings?.email || 'info@marmoleriapietra.com.py';
  const whatsapp = settings?.whatsapp || '+595 981 123 456';
  const address = settings?.address || 'Asunción, Paraguay';
  const instagram = settings?.instagram || 'https://instagram.com';

  const whatsappNumber = whatsapp.replace(/\D/g, '');

  return (
    <footer id="contacto" className="bg-[#1F1F1C] text-white">
      <div className="luxe-container grid gap-10 py-14 md:grid-cols-[1.25fr_.9fr_.9fr_.7fr]">
        <div>
          <Link
            href="/#inicio"
            aria-label={companyName}
            className="inline-flex max-w-[210px] items-center rounded-2xl bg-white px-4 py-3 shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt={companyName}
              className="h-auto max-h-[58px] w-full object-contain object-left"
            />
          </Link>

          <p className="mt-7 max-w-sm text-sm leading-7 text-white/70">
            Especialistas en mármol, granito, cuarzo y piedras sinterizadas.
            Diseñamos, fabricamos e instalamos superficies premium en todo Paraguay.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-white">
            Servicios
          </h3>

          <ul className="mt-6 space-y-3 text-sm text-white/70">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-white">
            Contacto
          </h3>

          <ul className="mt-6 space-y-4 text-sm text-white/70">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-white" />
              <span>{whatsapp}</span>
            </li>

            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-white" />
              <span>{email}</span>
            </li>

            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-white" />
              <span>{address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-white">
            Seguinos
          </h3>

          <ul className="mt-6 space-y-4 text-sm text-white/70">
            <li>
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Instagram className="h-4 w-4 text-white" />
                Instagram
              </a>
            </li>

            <li>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <MessageCircle className="h-4 w-4 text-white" />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="luxe-container border-t border-white/10 py-6 text-center text-xs text-white/45">
        © 2026 {companyName}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
