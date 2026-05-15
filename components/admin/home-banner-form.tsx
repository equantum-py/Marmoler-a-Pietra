import { AdminImageUploader } from '@/components/admin/admin-image-uploader';

export type AdminHomeBanner = {
  id?: string;
  placement?: string;
  cta_url?: string | null;
  desktop_image?: string;
  mobile_image?: string | null;
  status?: string;
  sort_order?: number;
};

type HomeBannerFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  banner?: AdminHomeBanner;
  submitLabel: string;
};

const placements = [
  {
    value: 'hero',
    label: 'Hero principal',
    helper: 'Desktop: 1920×800 px. Mobile: 600×406 px.',
  },
];

export function HomeBannerForm({ action, banner, submitLabel }: HomeBannerFormProps) {
  return (
    <form action={action} className="space-y-6">
      {banner?.id ? <input type="hidden" name="id" value={banner.id} /> : null}

      <section className="admin-section-card space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            Banner principal
          </p>

          <h2 className="mt-2 font-display text-3xl text-pietra-ink">
            Imágenes del Hero
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-pietra-muted">
            Cargá una imagen para desktop y otra para mobile. El sitio no agregará textos, botones ni capas encima del banner.
            La pieza gráfica debe venir diseñada lista para publicarse.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <label className="text-sm font-semibold text-pietra-ink">
            Ubicación
            <select
              name="placement"
              defaultValue={banner?.placement ?? 'hero'}
              className="admin-input mt-2"
            >
              {placements.map((placement) => (
                <option key={placement.value} value={placement.value}>
                  {placement.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Estado
            <select
              name="status"
              defaultValue={banner?.status ?? 'published'}
              className="admin-input mt-2"
            >
              <option value="published">Publicado</option>
              <option value="draft">Borrador</option>
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

        <label className="block text-sm font-semibold text-pietra-ink">
          Enlace opcional del banner
          <input
            name="cta_url"
            defaultValue={banner?.cta_url ?? ''}
            placeholder="/materiales, /proyectos o https://..."
            className="admin-input mt-2"
          />
        </label>

        <div className="grid gap-4 rounded-2xl border border-pietra-border bg-pietra-cream p-4 text-sm leading-6 text-pietra-muted md:grid-cols-2">
          <div>
            <strong className="block text-pietra-ink">Desktop</strong>
            Imagen recomendada: <strong>1920×800 px</strong>. Horizontal, comercial y amplia.
          </div>

          <div>
            <strong className="block text-pietra-ink">Mobile</strong>
            Imagen recomendada: <strong>600×406 px</strong>. Horizontal, con margen seguro y sin texto pegado a los bordes.
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          <strong>Regla obligatoria:</strong> no subir el banner desktop como mobile. El mobile debe ser una pieza diseñada
          específicamente para celular en 600×406 px.
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <AdminImageUploader
          label="Imagen desktop — 1920×800 px"
          name="desktop_image"
          folder="banners"
          defaultValue={banner?.desktop_image ?? ''}
          previewFit="contain"
          helperText="Obligatoria. Imagen horizontal para escritorio."
        />

        <AdminImageUploader
          label="Imagen mobile — 600×406 px"
          name="mobile_image"
          folder="banners"
          defaultValue={banner?.mobile_image ?? ''}
          previewFit="contain"
          helperText="Obligatoria para mobile. No usar versión vertical ni cuadrada."
        />
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
