import { AdminImageUploader } from '@/components/admin/admin-image-uploader';

export type AdminHomeCategory = {
  id?: string;
  name?: string;
  slug?: string;
  image_url?: string;
  mobile_image_url?: string | null;
  whatsapp_message?: string | null;
  href?: string | null;
  status?: string;
  sort_order?: number;
};

type HomeCategoryFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  category?: AdminHomeCategory;
  submitLabel: string;
};

export function HomeCategoryForm({ action, category, submitLabel }: HomeCategoryFormProps) {
  return (
    <form action={action} className="space-y-6">
      {category?.id ? <input type="hidden" name="id" value={category.id} /> : null}

      <section className="admin-section-card space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            Categorías Home
          </p>

          <h2 className="mt-2 font-display text-3xl text-pietra-ink">
            Datos de la categoría
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-pietra-muted">
            Estas categorías alimentan la sección “Inspiración real para decidir mejor”.
            Podés crear, ordenar, ocultar y cambiar la imagen de cada categoría.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <label className="text-sm font-semibold text-pietra-ink">
            Nombre
            <input
              name="name"
              defaultValue={category?.name ?? ''}
              placeholder="Cocinas, Baños, Quinchos..."
              className="admin-input mt-2"
              required
            />
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Slug
            <input
              name="slug"
              defaultValue={category?.slug ?? ''}
              placeholder="cocinas"
              className="admin-input mt-2"
            />
          </label>

          <label className="text-sm font-semibold text-pietra-ink">
            Orden
            <input
              name="sort_order"
              type="number"
              defaultValue={category?.sort_order ?? 0}
              className="admin-input mt-2"
            />
          </label>
        </div>

        <label className="text-sm font-semibold text-pietra-ink">
          Estado
          <select
            name="status"
            defaultValue={category?.status ?? 'published'}
            className="admin-input mt-2"
          >
            <option value="published">Activo / publicado</option>
            <option value="draft">Borrador / oculto</option>
            <option value="archived">Archivado</option>
          </select>
        </label>

        <div className="grid gap-4 lg:grid-cols-2">
          <AdminImageUploader
            label="Imagen desktop — 800×500 px"
            name="image_url"
            folder="ambientes"
            defaultValue={category?.image_url ?? ''}
            previewFit="cover"
            helperText="Imagen principal de la categoría. Recomendado: 800×500 px."
          />

          <AdminImageUploader
            label="Imagen mobile — opcional 700×440 px"
            name="mobile_image_url"
            folder="ambientes"
            defaultValue={category?.mobile_image_url ?? ''}
            previewFit="cover"
            helperText="Opcional. Si no se carga, se usa la imagen desktop."
          />
        </div>

        <label className="block text-sm font-semibold text-pietra-ink">
          Mensaje de WhatsApp
          <textarea
            name="whatsapp_message"
            defaultValue={category?.whatsapp_message ?? ''}
            rows={3}
            placeholder="Hola, quiero cotizar una mesada de cocina premium."
            className="admin-input mt-2"
          />
        </label>

        <label className="block text-sm font-semibold text-pietra-ink">
          Enlace opcional
          <input
            name="href"
            defaultValue={category?.href ?? ''}
            placeholder="/materiales, /proyectos o https://..."
            className="admin-input mt-2"
          />
        </label>
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
