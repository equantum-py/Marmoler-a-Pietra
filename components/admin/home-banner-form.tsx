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

  title?: string | null;
  primary_cta_href?: string | null;
};

type HomeBannerFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  banner?: AdminHomeBanner;
  submitLabel: string;
};

export function HomeBannerForm({ action, banner, submitLabel }: HomeBannerFormProps) {
  return (
    <form action={action} className="space-y-6">
      {banner?.id ? <input type="hidden" name="id" value={banner.id} /> : null}
      <input type="hidden" name="placement" value={banner?.placement ?? 'hero'} />

      <section className="admin-section-card space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            Banner Home
          </p>

          <h2 className="mt-2 font-display text-3xl text-pietra-ink">
            Cargar imágenes del banner
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-pietra-muted">
            Subí una imagen para desktop y otra para mobile. El banner se mostrará como imagen, sin textos ni botones encima.
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
            helperText="Recomendado: 1600×600 px o 1920×650 px."
          />

          <AdminImageUploader
            label="Imagen mobile — 860×500 px"
            name="mobile_image_url"
            folder="banners"
            defaultValue={banner?.mobile_image_url ?? ''}
            previewFit="cover"
            helperText="Recomendado: 860×500 px. En mobile se mostrará compacto."
          />
        </div>

        <label className="block text-sm font-semibold text-pietra-ink">
          Enlace opcional al hacer clic en el banner
          <input
            name="primary_cta_href"
            defaultValue={banner?.primary_cta_href ?? ''}
            placeholder="/materiales, /proyectos o https://..."
            className="admin-input mt-2"
          />
        </label>

        <label className="block text-sm font-semibold text-pietra-ink">
          Texto alternativo SEO
          <input
            name="alt_text"
            defaultValue={banner?.alt_text ?? ''}
            placeholder="Ej.: Mesadas de granito premium en Paraguay"
            className="admin-input mt-2"
          />
        </label>

        <div className="rounded-2xl border border-pietra-border bg-pietra-cream p-4 text-sm leading-6 text-pietra-muted">
          <strong className="text-pietra-ink">Importante:</strong> el banner no tendrá texto encima desde la web.
          Todo texto visual debe venir dentro de la imagen cargada.
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
