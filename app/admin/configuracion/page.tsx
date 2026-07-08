import { SiteSettingsForm } from '@/components/admin/site-settings-form';
import { getSiteSettings } from './actions';

export default async function AdminConfiguracionPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] border border-pietra-border bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
          Configuración general
        </p>

        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold text-pietra-black">
              Centro de control del sitio
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-pietra-muted">
              Administrá los datos globales que usa la web pública: contacto, WhatsApp, redes,
              identidad visual, SEO, CTA principal y textos institucionales básicos.
            </p>
          </div>

          <a
            href="/"
            target="_blank"
            className="inline-flex h-11 items-center justify-center rounded-full bg-pietra-green px-5 text-sm font-bold text-white transition hover:bg-pietra-greenMuted"
          >
            Ver sitio
          </a>
        </div>
      </header>

      <SiteSettingsForm settings={settings} />
    </div>
  );
}
