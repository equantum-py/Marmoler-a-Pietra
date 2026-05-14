import { AdminImageUploader } from '@/components/admin/admin-image-uploader';
import { getSiteSettings, updateSiteLogos } from './actions';

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
              Identidad visual de Pietra
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-pietra-muted">
              Administrá el logo oficial de Pietra para desktop y mobile. El logo debe adaptarse a
              todos los dispositivos sin recortarse, sin deformarse y manteniendo siempre su
              proporción original.
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

      <section className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
        <form
          action={updateSiteLogos}
          className="rounded-[2rem] border border-pietra-border bg-white p-6 shadow-sm"
        >
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
              Logos del sitio
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-pietra-black">
              Subir logo para desktop y mobile
            </h2>
            <p className="mt-3 text-sm leading-7 text-pietra-muted">
              Podés subir el mismo logo completo en ambos campos. El sitio debe reducirlo
              automáticamente según el dispositivo, sin recorte y sin cambiar la proporción.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <AdminImageUploader
              label="Logo desktop"
              name="logo_desktop"
              folder="logos"
              previewFit="contain"
              defaultValue={settings?.logo_desktop ?? ''}
              helperText="Logo completo horizontal. Recomendado: PNG o SVG transparente, proporcional al archivo original. Tamaño sugerido: 1200×412 px o superior proporcional. No recortar ni deformar."
            />

            <AdminImageUploader
              label="Logo mobile"
              name="logo_mobile"
              folder="logos"
              previewFit="contain"
              defaultValue={settings?.logo_mobile ?? ''}
              helperText="Usar el mismo logo completo o una versión más liviana, manteniendo la proporción original. Recomendado: PNG o SVG transparente. No usar recorte cuadrado ni object-cover."
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-pietra-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-pietra-muted">
              Regla visual: el logo siempre debe renderizarse con object-contain, ancho responsivo y
              altura automática.
            </p>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-full bg-pietra-green px-7 text-sm font-bold text-white transition hover:bg-pietra-greenMuted"
            >
              Guardar logos
            </button>
          </div>
        </form>

        <aside className="rounded-[2rem] border border-pietra-border bg-pietra-light p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            Guía de uso
          </p>

          <div className="mt-5 space-y-4 text-sm leading-7 text-pietra-muted">
            <div className="rounded-2xl border border-pietra-border bg-white p-4">
              <h3 className="font-semibold text-pietra-black">Logo desktop</h3>
              <p className="mt-1">
                Usar el logo completo horizontal de Pietra. Tamaño visual en web: ancho aproximado
                de 180–260 px, alto máximo 72 px. Siempre con object-contain.
              </p>
            </div>

            <div className="rounded-2xl border border-pietra-border bg-white p-4">
              <h3 className="font-semibold text-pietra-black">Logo mobile</h3>
              <p className="mt-1">
                Usar el mismo logo completo, reducido proporcionalmente. Tamaño visual en web:
                ancho aproximado de 120–150 px, alto máximo 50 px. No recortar.
              </p>
            </div>

            <div className="rounded-2xl border border-pietra-border bg-white p-4">
              <h3 className="font-semibold text-pietra-black">Regla obligatoria</h3>
              <p className="mt-1">
                No usar object-cover, no forzar cuadrado, no cortar el texto del logo y no alterar
                la proporción. Si el espacio es reducido, se reduce el ancho del logo.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-pietra-border bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
          Datos actuales
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-pietra-border bg-pietra-light p-4">
            <p className="text-sm font-semibold text-pietra-black">Logo desktop</p>
            <p className="mt-2 break-all text-xs text-pietra-muted">
              {settings?.logo_desktop || 'Sin logo desktop configurado'}
            </p>
          </div>

          <div className="rounded-2xl border border-pietra-border bg-pietra-light p-4">
            <p className="text-sm font-semibold text-pietra-black">Logo mobile</p>
            <p className="mt-2 break-all text-xs text-pietra-muted">
              {settings?.logo_mobile || 'Sin logo mobile configurado'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
