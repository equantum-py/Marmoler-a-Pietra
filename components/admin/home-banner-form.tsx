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
    helper: 'Desktop recomendado: 1920x800 px. Mobile recomendado: 900x1200 px.',
  },
  {
    value: 'ambiente-cocinas',
    label: 'Ambiente - Cocinas',
    helper: 'Desktop recomendado: 900x650 px. Mobile recomendado: 700x700 px.',
  },
  {
    value: 'ambiente-banos',
    label: 'Ambiente - Baños',
    helper: 'Desktop recomendado: 900x650 px. Mobile recomendado: 700x700 px.',
  },
  {
    value: 'ambiente-quinchos',
    label: 'Ambiente - Quinchos',
    helper: 'Desktop recomendado: 900x650 px. Mobile recomendado: 700x700 px.',
  },
  {
    value: 'ambiente-revestimientos',
    label: 'Ambiente - Revestimientos',
    helper: 'Desktop recomendado: 900x650 px. Mobile recomendado: 700x700 px.',
  },
  {
    value: 'ambiente-escaleras',
    label: 'Ambiente - Escaleras y piezas especiales',
    helper: 'Desktop recomendado: 900x650 px. Mobile recomendado: 700x700 px.',
  },
  {
    value: 'promo-1',
    label: 'Banner comercial 1',
    helper: 'Desktop recomendado: 1200x450 px. Mobile recomendado: 900x1100 px.',
  },
  {
    value: 'promo-2',
    label: 'Banner comercial 2',
    helper: 'Desktop recomendado: 1200x450 px. Mobile recomendado: 900x1100 px.',
  },
  {
    value: 'promo-3',
    label: 'Banner comercial 3',
    helper: 'Desktop recomendado: 1200x450 px. Mobile recomendado: 900x1100 px.',
  },
  {
    value: 'side-promo',
    label: 'Banner lateral destacado',
    helper: 'Desktop recomendado: 900x1200 px. Mobile recomendado: 900x1100 px.',
  },
];

export function HomeBannerForm({ action, banner, submitLabel }: HomeBannerFormProps) {
  const selectedPlacement = placements.find((item) => item.value === banner?.placement);

  return (
    <form action={action} className="space-y-6">
      {banner?.id ? <input type="hidden" name="id" value={banner.id} /> : null}

      <section className="admin-section-card space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            Configuración del banner
          </p>

          <h2 className="mt-2 font-display text-3xl text-pietra-ink">
            Imagen desktop y mobile
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-pietra-muted">
            Subí una imagen para desktop y otra para mobile. El banner no lleva texto encima.
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
              defaultValue={banner?.status ?? 'draft'}
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
          Enlace opcional al hacer clic en el banner
          <input
            name="cta_url"
            defaultValue={banner?.cta_url ?? ''}
            placeholder="/materiales, /proyectos o https://..."
            className="admin-input mt-2"
          />
        </label>

        <div className="rounded-2xl border border-pietra-border bg-pietra-cream p-4 text-sm leading-6 text-pietra-muted">
          <strong className="text-pietra-ink">Tamaño sugerido:</strong>{' '}
          {selectedPlacement?.helper ||
            'Hero: 1920x800 desktop / 900x1200 mobile. Ambientes: 900x650 desktop / 700x700 mobile. Promos: 1200x450 desktop / 900x1100 mobile.'}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <AdminImageUploader
          label="Imagen desktop"
          name="desktop_image"
          folder="banners"
          defaultValue={banner?.desktop_image ?? ''}
          previewFit="cover"
          helperText="Obligatoria. Usar imagen horizontal para desktop."
        />

        <AdminImageUploader
          label="Imagen mobile"
          name="mobile_image"
          folder="banners"
          defaultValue={banner?.mobile_image ?? ''}
          previewFit="cover"
          helperText="Opcional pero recomendada. Usar versión vertical o cuadrada para celulares."
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
