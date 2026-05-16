import { AdminImageUploader } from '@/components/admin/admin-image-uploader';

export type AdminHomePromoCard = {
  id?: string;
  eyebrow?: string;
  title?: string;
  cta_label?: string;
  image_url?: string;
  mobile_image_url?: string | null;
  whatsapp_message?: string | null;
  href?: string | null;
  status?: string;
  sort_order?: number;
};

type HomePromoCardFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  card?: AdminHomePromoCard;
  submitLabel: string;
};

export function HomePromoCardForm({ action, card, submitLabel }: HomePromoCardFormProps) {
  return (
    <form action={action} className="space-y-6">
      {card?.id ? <input type="hidden" name="id" value={card.id} /> : null}

      <section className="admin-section-card space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            Banners pequeños
          </p>

          <h2 className="mt-2 font-display text-3xl text-pietra-ink">
            Banner pequeño comercial
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-pietra-muted">
            Estas tarjetas se muestran en la Home antes de la franja de beneficios.
            Podés editar imagen, texto, botón, orden, estado y enlace.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <label className="text-sm font-semibold text-pietra-ink">
            Texto superior
            <input
              name="eyebrow"
              defaultValue={card?.eyebrow ?? ''}
              placeholder="Cocinas modernas"
              className="admin-input mt-2"
              required
            />
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Texto principal
            <input
              name="title"
              defaultValue={card?.title ?? ''}
              placeholder="con terminación premium"
              className="admin-input mt-2"
              required
            />
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Texto del botón
            <input
              name="cta_label"
              defaultValue={card?.cta_label ?? 'Ver opciones'}
              placeholder="Consultar ahora"
              className="admin-input mt-2"
            />
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm font-semibold text-pietra-ink">
            Estado
            <select
              name="status"
              defaultValue={card?.status ?? 'published'}
              className="admin-input mt-2"
            >
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
              defaultValue={card?.sort_order ?? 0}
              className="admin-input mt-2"
            />
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <AdminImageUploader
            label="Imagen desktop — 900×360 px"
            name="image_url"
            folder="promociones"
            defaultValue={card?.image_url ?? ''}
            previewFit="cover"
            helperText="Imagen para la tarjeta promocional. Recomendado: 900×360 px."
          />

          <AdminImageUploader
            label="Imagen mobile — opcional 760×360 px"
            name="mobile_image_url"
            folder="promociones"
            defaultValue={card?.mobile_image_url ?? ''}
            previewFit="cover"
            helperText="Opcional. Si no se carga, se usa la imagen desktop."
          />
        </div>

        <label className="block text-sm font-semibold text-pietra-ink">
          Mensaje de WhatsApp
          <textarea
            name="whatsapp_message"
            defaultValue={card?.whatsapp_message ?? ''}
            rows={3}
            placeholder="Hola, quiero consultar por una cocina moderna con terminación premium."
            className="admin-input mt-2"
          />
        </label>

        <label className="block text-sm font-semibold text-pietra-ink">
          Enlace opcional
          <input
            name="href"
            defaultValue={card?.href ?? ''}
            placeholder="/materiales, /proyectos o https://..."
            className="admin-input mt-2"
          />
        </label>

        <div className="rounded-2xl border border-pietra-border bg-white p-4 text-sm leading-6 text-pietra-muted">
          <strong className="text-pietra-ink">Medidas sugeridas:</strong> Desktop 900×360 px.
          Mobile opcional 760×360 px. El texto se coloca desde el panel, no dentro de la imagen.
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
