import Link from 'next/link';
import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { getPublicSiteSettings } from '@/lib/site/public-settings';

const serviceLinks = [
  { label: 'Cocinas a medida', href: '/#ambientes' },
  { label: 'Baños', href: '/#ambientes' },
  { label: 'Quinchos y barras', href: '/#ambientes' },
  { label: 'Revestimientos', href: '/#ambientes' },
  { label: 'Escaleras y piezas especiales', href: '/#ambientes' },
];

export async function Footer() {
  const settings = await getPublicSiteSettings();

  const logo = settings.logo_desktop || settings.logo_mobile || settings.logo_url || '/logo-pietra.svg';
  const companyName = settings.company_name || 'Marmolería Pietra';
  const email = settings.email || 'info@marmoleriapietra.com.py';
  const phone = settings.phone || settings.whatsapp_number || '+595 984 756 158';
  const address = settings.address || 'Asunción, Paraguay';
  const instagram = settings.instagram_url || 'https://www.instagram.com/marmoleria_pietra';
  const footerText =
    settings.footer_text ||
    'Especialistas en mármol, granito, cuarzo y piedras sinterizadas. Diseñamos, fabricamos e instalamos superficies premium en todo Paraguay.';
  const whatsappNumber = settings.whatsapp_number || phone.replace(/\D/g, '');
  const focusClass =
    'rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

  return (
    <footer id="contacto" className="bg-[#1F1F1C] text-white">
      <div className="luxe-container grid gap-9 py-12 md:grid-cols-[1.25fr_.9fr_.9fr_.7fr] md:gap-10 md:py-14">
        <div>
          <Link
            href="/#inicio"
            aria-label={companyName}
            className={`inline-flex max-w-[210px] items-center rounded-2xl bg-white px-4 py-3 shadow-sm ${focusClass}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt={companyName}
              className="h-auto max-h-[58px] w-full object-contain object-left"
            />
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-7 text-white/85 md:mt-7">
            {footerText}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white">
            Servicios
          </h3>

          <ul className="mt-5 space-y-2.5 text-sm text-white/85 md:mt-6 md:space-y-3">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`inline-flex min-h-8 items-center transition hover:text-white ${focusClass}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white">
            Contacto
          </h3>

          <ul className="mt-5 space-y-3.5 text-sm text-white/85 md:mt-6 md:space-y-4">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
              <span>{phone}</span>
            </li>

            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
              <span className="break-all">{email}</span>
            </li>

            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
              <span>{address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white">
            Seguinos
          </h3>

          <ul className="mt-5 space-y-3 text-sm text-white/85 md:mt-6 md:space-y-4">
            <li>
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex min-h-9 items-center gap-3 transition hover:text-white ${focusClass}`}
              >
                <Instagram className="h-4 w-4 text-white" aria-hidden="true" />
                Instagram
              </a>
            </li>

            <li>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex min-h-9 items-center gap-3 transition hover:text-white ${focusClass}`}
              >
                <MessageCircle className="h-4 w-4 text-white" aria-hidden="true" />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="luxe-container border-t border-white/15 py-6 text-center text-xs leading-5 text-white/65">
        © 2026 {companyName}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
