import { AdminImageUploader } from '@/components/admin/admin-image-uploader';

export type AdminHomeBanner = {
  id?: string;
  placement?: string;
  name?: string;
  is_active?: boolean;
  status?: string;
  sort_order?: number;

  desktop_image_url?: string;
  mobile_image_url?: string;
  tablet_image_url?: string | null;
  alt_text?: string | null;

  eyebrow?: string | null;
  title?: string;
  highlighted_text?: string | null;
  subtitle?: string | null;

  primary_cta_label?: string | null;
  primary_cta_href?: string | null;
  secondary_cta_label?: string | null;
  secondary_cta_href?: string | null;
  whatsapp_message?: string | null;

  text_position?: string | null;
  vertical_position?: string | null;
  object_position_desktop?: string | null;
  object_position_mobile?: string | null;

  starts_at?: string | null;
  ends_at?: string | null;
};

type HomeBannerFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  banner?: AdminHomeBanner;
  submitLabel: string;
};

const positionOptions = [
  { value: 'left', label: 'Izquierda' },
  { value: 'center', label: 'Centro' },
  { value: 'right', label: 'Derecha' },
];

const verticalOptions = [
  { value: 'top', label: 'Arriba' },
  { value: 'center', label: 'Centro' },
  { value: 'bottom', label: 'Abajo' },
];

const objectPositionOptions = [
  'center center',
  'left center',
  'right center',
  'center top',
  'center bottom',
];

function toDateTimeLocal(value?: string | null) {
  if (!value) return '';

  return value.slice(0, 16);
}

export function HomeBannerForm({ action, banner, submitLabel }: HomeBannerFormProps) {
  return (
    <form action={action} className="space-y-6">
      {banner?.id ? <input type="hidden" name="id" value={banner.id} /> : null}
      <input type="hidden" name="placement" value={banner?.placement ?? 'hero'} />

      <section className="admin-section-card space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            Banners Home
          </p>

          <h2 className="mt-2 font-display text-3xl text-pietra-ink">
            Hero principal responsive
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-pietra-muted">
            Gestioná la campaña principal de la home. La imagen funciona como fondo visual y los textos se renderizan encima como HTML responsive.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <label className="text-sm font-semibold text-pietra-ink">
            Nombre interno
            <input
              name="name"
              defaultValue={banner?.name ?? 'Hero principal Marmolería Pietra'}
              className="admin-input mt-2"
              required
            />
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Estado
            <select
              name="status"
              defaultValue={banner?.status ?? 'published'}
              className="admin-input mt-2"
            >
              <option value="published">Activo / publicado</option>
              <option value="draft">Inactivo / borrador</option>
              <option value="archived">Archivado</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Orden
            <input
              name="sort_order"
              type="number"
              defaultValue={banner?.sort_order ?? 0}
              className="admin-input mt-2"
            />
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <AdminImageUploader
            label="Imagen desktop — 1600×600 px"
            name="desktop_image_url"
            folder="banners"
            defaultValue={banner?.desktop_image_url ?? ''}
            previewFit="cover"
            helperText="Recomendado: 1600×600 px o 1920×650 px. Peso ideal menor a 500 KB."
          />

          <AdminImageUploader
            label="Imagen mobile — 860×500 px"
            name="mobile_image_url"
            folder="banners"
            defaultValue={banner?.mobile_image_url ?? ''}
            previewFit="cover"
            helperText="Recomendado: 860×500 px. La web lo mostrará con altura máxima de 260 px."
          />
        </div>

        <label className="block text-sm font-semibold text-pietra-ink">
          Texto alternativo SEO
          <input
            name="alt_text"
            defaultValue={banner?.alt_text ?? ''}
            placeholder="Ej.: Mesadas de granito premium en Paraguay"
            className="admin-input mt-2"
          />
        </label>
      </section>

      <section className="admin-section-card space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            Textos del banner
          </p>

          <h2 className="mt-2 font-display text-3xl text-pietra-ink">
            Contenido comercial
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm font-semibold text-pietra-ink">
            Pretítulo
            <input
              name="eyebrow"
              defaultValue={banner?.eyebrow ?? 'Showroom premium en Paraguay'}
              className="admin-input mt-2"
            />
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Texto destacado
            <input
              name="highlighted_text"
              defaultValue={banner?.highlighted_text ?? 'Granitos'}
              className="admin-input mt-2"
            />
          </label>
        </div>

        <label className="block text-sm font-semibold text-pietra-ink">
          Título principal
          <input
            name="title"
            defaultValue={banner?.title ?? 'Lujo en cada detalle'}
            className="admin-input mt-2"
            required
          />
        </label>

        <label className="block text-sm font-semibold text-pietra-ink">
          Subtítulo
          <textarea
            name="subtitle"
            defaultValue={
              banner?.subtitle ??
              'Proveemos e instalamos todo tipo de mesadas. Consultá cuál opción se adecua mejor a tu proyecto.'
            }
            rows={4}
            className="admin-input mt-2"
          />
        </label>
      </section>

      <section className="admin-section-card space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            CTA y navegación
          </p>

          <h2 className="mt-2 font-display text-3xl text-pietra-ink">
            Botones del banner
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm font-semibold text-pietra-ink">
            Botón principal
            <input
              name="primary_cta_label"
              defaultValue={banner?.primary_cta_label ?? 'Solicitar cotización'}
              className="admin-input mt-2"
            />
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Link botón principal
            <input
              name="primary_cta_href"
              defaultValue={banner?.primary_cta_href ?? ''}
              placeholder="/materiales, /proyectos o https://..."
              className="admin-input mt-2"
            />
          </label>
        </div>

        <label className="block text-sm font-semibold text-pietra-ink">
          Mensaje WhatsApp personalizado
          <textarea
            name="whatsapp_message"
            defaultValue={banner?.whatsapp_message ?? 'Hola Pietra, quiero cotizar un proyecto con superficies premium.'}
            rows={3}
            className="admin-input mt-2"
          />
        </label>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm font-semibold text-pietra-ink">
            Botón secundario
            <input
              name="secondary_cta_label"
              defaultValue={banner?.secondary_cta_label ?? 'Ver materiales'}
              className="admin-input mt-2"
            />
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Link botón secundario
            <input
              name="secondary_cta_href"
              defaultValue={banner?.secondary_cta_href ?? '/#materiales'}
              className="admin-input mt-2"
            />
          </label>
        </div>
      </section>

      <section className="admin-section-card space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            Composición visual
          </p>

          <h2 className="mt-2 font-display text-3xl text-pietra-ink">
            Posición y fechas
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm font-semibold text-pietra-ink">
            Posición horizontal del texto
            <select name="text_position" defaultValue={banner?.text_position ?? 'left'} className="admin-input mt-2">
              {positionOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Posición vertical del texto
            <select name="vertical_position" defaultValue={banner?.vertical_position ?? 'center'} className="admin-input mt-2">
              {verticalOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm font-semibold text-pietra-ink">
            Object position desktop
            <select name="object_position_desktop" defaultValue={banner?.object_position_desktop ?? 'center center'} className="admin-input mt-2">
              {objectPositionOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Object position mobile
            <select name="object_position_mobile" defaultValue={banner?.object_position_mobile ?? 'center center'} className="admin-input mt-2">
              {objectPositionOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm font-semibold text-pietra-ink">
            Fecha inicio, opcional
            <input
              name="starts_at"
              type="datetime-local"
              defaultValue={toDateTimeLocal(banner?.starts_at)}
              className="admin-input mt-2"
            />
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Fecha fin, opcional
            <input
              name="ends_at"
              type="datetime-local"
              defaultValue={toDateTimeLocal(banner?.ends_at)}
              className="admin-input mt-2"
            />
          </label>
        </div>

        <div className="rounded-2xl border border-pietra-border bg-pietra-cream p-4 text-sm leading-6 text-pietra-muted">
          <strong className="text-pietra-ink">Medidas recomendadas:</strong> Desktop 1600×600 px. Mobile 860×500 px.
          En celulares la altura visible queda controlada entre 220 y 260 px para evitar un hero gigante.
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-full bg-pietra-green px-8 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-pietra-sage"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
