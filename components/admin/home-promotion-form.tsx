import { AdminMediaUploader } from '@/components/admin/admin-media-uploader';

export type AdminHomePromotion = {
  id?: string;
  placement?: string;
  name?: string;
  media_type?: string;
  desktop_media_url?: string;
  mobile_media_url?: string | null;
  poster_url?: string | null;
  href?: string | null;
  alt_text?: string | null;
  status?: string;
  sort_order?: number;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

type HomePromotionFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  promotion?: AdminHomePromotion;
  submitLabel: string;
};

export function HomePromotionForm({ action, promotion, submitLabel }: HomePromotionFormProps) {
  return (
    <form action={action} className="space-y-6">
      {promotion?.id ? <input type="hidden" name="id" value={promotion.id} /> : null}

      <section className="admin-section-card space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            Publicidad / Promociones
          </p>

          <h2 className="mt-2 font-display text-3xl text-pietra-ink">
            Imagen o video promocional
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-pietra-muted">
            Esta sección permite cargar un banner largo para la Home, usando imagen o video.
            Podés usarla como banner largo o como video lateral dentro de la sección Materiales.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <label className="text-sm font-semibold text-pietra-ink">
            Ubicación
            <select name="placement" defaultValue={promotion?.placement ?? 'home-wide'} className="admin-input mt-2">
              <option value="home-wide">Banner largo Home</option>
              <option value="materials-side-card">Video lateral Materiales</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Tipo
            <select name="media_type" defaultValue={promotion?.media_type ?? 'image'} className="admin-input mt-2">
              <option value="image">Imagen</option>
              <option value="video">Video</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Estado
            <select name="status" defaultValue={promotion?.status ?? 'published'} className="admin-input mt-2">
              <option value="published">Activo / publicado</option>
              <option value="draft">Borrador / oculto</option>
              <option value="archived">Archivado</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Orden
            <input
              name="sort_order"
              type="number"
              defaultValue={promotion?.sort_order ?? 0}
              className="admin-input mt-2"
            />
          </label>
        </div>

        <label className="block text-sm font-semibold text-pietra-ink">
          Nombre interno
          <input
            name="name"
            defaultValue={promotion?.name ?? 'Banner largo Home'}
            className="admin-input mt-2"
            required
          />
        </label>

        <div className="grid gap-4 lg:grid-cols-2">
          <AdminMediaUploader
            label="Archivo desktop — imagen 1600×420 px o video horizontal"
            name="desktop_media_url"
            folder="promociones"
            defaultValue={promotion?.desktop_media_url ?? ''}
            helperText="Acepta imagen o video. Recomendado imagen: 1600×420 px. Video recomendado: MP4/WebM horizontal."
          />

          <AdminMediaUploader
            label="Archivo mobile — imagen/video opcional 860×420 px"
            name="mobile_media_url"
            folder="promociones"
            defaultValue={promotion?.mobile_media_url ?? ''}
            helperText="Opcional. Si no se carga, se usa el archivo desktop."
          />
        </div>

        <AdminMediaUploader
          label="Poster del video — opcional"
          name="poster_url"
          folder="promociones"
          defaultValue={promotion?.poster_url ?? ''}
          accept="image/*"
          helperText="Imagen de portada para video. Opcional."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block text-sm font-semibold text-pietra-ink">
            Enlace opcional
            <input
              name="href"
              defaultValue={promotion?.href ?? ''}
              placeholder="/materiales, /proyectos o https://..."
              className="admin-input mt-2"
            />
          </label>

          <label className="block text-sm font-semibold text-pietra-ink">
            Texto alternativo SEO
            <input
              name="alt_text"
              defaultValue={promotion?.alt_text ?? ''}
              placeholder="Ej.: Promoción de mesadas premium"
              className="admin-input mt-2"
            />
          </label>
        </div>

        <div className="grid gap-3 rounded-2xl border border-pietra-border bg-pietra-cream p-4 text-sm text-pietra-muted md:grid-cols-3">
          <label className="flex items-center gap-2 font-semibold text-pietra-ink">
            <input name="autoplay" type="checkbox" defaultChecked={promotion?.autoplay ?? true} />
            Autoplay
          </label>

          <label className="flex items-center gap-2 font-semibold text-pietra-ink">
            <input name="muted" type="checkbox" defaultChecked={promotion?.muted ?? true} />
            Muted
          </label>

          <label className="flex items-center gap-2 font-semibold text-pietra-ink">
            <input name="loop" type="checkbox" defaultChecked={promotion?.loop ?? true} />
            Loop
          </label>
        </div>

        <div className="rounded-2xl border border-pietra-border bg-white p-4 text-sm leading-6 text-pietra-muted">
          <strong className="text-pietra-ink">Medidas recomendadas:</strong> Desktop 1600×420 px.
          Mobile 860×420 px. Para video, usar formato horizontal y peso liviano.
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
