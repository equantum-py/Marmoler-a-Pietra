'use client';

import { useActionState } from 'react';
import { AdminActionButton } from '@/components/admin/admin-action-button';
import type { AdminMaterialRecord } from '@/lib/supabase/materials';
import type { MaterialFormState } from '@/lib/supabase/types';
import type { MaterialCategory } from '@/types/content';
import { AdminImageUploader } from '@/components/admin/admin-image-uploader';
import { AdminGalleryUploader } from '@/components/admin/admin-gallery-uploader';

const categories: MaterialCategory[] = ['Granito', 'Cuarzo', 'Mármol', 'Sinterizado', 'Especial'];
const statuses = ['published', 'draft', 'archived'];
const initialState: MaterialFormState = { ok: true, message: '' };

type MaterialFormProps = {
  action: (state: MaterialFormState, formData: FormData) => Promise<MaterialFormState>;
  material?: AdminMaterialRecord;
  submitLabel: string;
  disabled?: boolean;
};

function listValue(items?: string[]) {
  return items?.join('\n') ?? '';
}

export function MaterialForm({
  action,
  material,
  submitLabel,
  disabled = false,
}: MaterialFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form
      action={formAction}
      className="grid gap-5 rounded-[1.5rem] border border-pietra-border bg-white p-6 shadow-card"
    >
      {material ? <input type="hidden" name="id" value={material.id} /> : null}
      {state.message ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
            state.ok
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        <label className="text-sm font-semibold text-pietra-ink">
          Nombre
          <input name="name" defaultValue={material?.name} required className="admin-input" />
        </label>
        <label className="text-sm font-semibold text-pietra-ink">
          Slug
          <input name="slug" defaultValue={material?.slug} required className="admin-input" />
        </label>
        <label className="text-sm font-semibold text-pietra-ink">
          Categoría
          <select
            name="category"
            defaultValue={material?.category ?? 'Granito'}
            className="admin-input"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="text-sm font-semibold text-pietra-ink">
        Descripción corta
        <textarea
          name="short_description"
          defaultValue={material?.short_description}
          required
          rows={2}
          className="admin-input"
        />
      </label>
      <label className="text-sm font-semibold text-pietra-ink">
        Descripción larga
        <textarea
          name="long_description"
          defaultValue={material?.long_description}
          required
          rows={5}
          className="admin-input"
        />
      </label>

      <div className="grid gap-4 lg:grid-cols-3">
        <label className="text-sm font-semibold text-pietra-ink">
          Color
          <input name="color" defaultValue={material?.color} className="admin-input" />
        </label>
        <label className="text-sm font-semibold text-pietra-ink">
          Acabado
          <input name="finish" defaultValue={material?.finish} className="admin-input" />
        </label>
        <label className="text-sm font-semibold text-pietra-ink">
          Uso recomendado
          <input
            name="recommended_use"
            defaultValue={material?.recommended_use}
            className="admin-input"
          />
        </label>
        <label className="text-sm font-semibold text-pietra-ink">
          Resistencia
          <input name="resistance" defaultValue={material?.resistance} className="admin-input" />
        </label>
        <label className="text-sm font-semibold text-pietra-ink">
          Mantenimiento
          <input name="maintenance" defaultValue={material?.maintenance} className="admin-input" />
        </label>
        <label className="text-sm font-semibold text-pietra-ink">
          Orden
          <input
            name="sort_order"
            type="number"
            defaultValue={material?.sort_order ?? 0}
            className="admin-input"
          />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="text-sm font-semibold text-pietra-ink">
          Aplicaciones (una por línea o separadas por coma)
          <textarea
            name="applications"
            defaultValue={listValue(material?.applications)}
            rows={4}
            className="admin-input"
          />
        </label>
        <label className="text-sm font-semibold text-pietra-ink">
          Beneficios
          <textarea
            name="benefits"
            defaultValue={listValue(material?.benefits)}
            rows={4}
            className="admin-input"
          />
        </label>
        <AdminImageUploader
          label="Imagen principal"
          name="main_image"
          folder="materiales"
          defaultValue={material?.main_image ?? ''}
        />
        <AdminGalleryUploader
          label="Galería de imágenes"
          name="gallery"
          folder="materiales"
          defaultValue={material?.gallery ?? []}
        />
        <label className="text-sm font-semibold text-pietra-ink">
          Mensaje personalizado de WhatsApp
          <textarea
            name="whatsapp_message"
            defaultValue={material?.whatsapp_message}
            rows={3}
            className="admin-input"
          />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <label className="text-sm font-semibold text-pietra-ink">
          Estado
          <select
            name="status"
            defaultValue={material?.status ?? 'draft'}
            className="admin-input"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-pietra-border bg-pietra-cream px-4 py-3 text-sm font-semibold text-pietra-ink lg:mt-6">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={material?.featured}
            className="h-4 w-4 accent-pietra-green"
          />
          Destacado en Home
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="text-sm font-semibold text-pietra-ink">
          SEO title
          <input
            name="seo_title"
            defaultValue={material?.seo_title ?? ''}
            className="admin-input"
          />
        </label>
        <label className="text-sm font-semibold text-pietra-ink">
          SEO description
          <textarea
            name="seo_description"
            defaultValue={material?.seo_description ?? ''}
            rows={3}
            className="admin-input"
          />
        </label>
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-pietra-border pt-5">
        <AdminActionButton href="/admin/materiales">Cancelar</AdminActionButton>
        <button
          type="submit"
          disabled={disabled || pending}
          className="inline-flex items-center justify-center rounded-full bg-pietra-green px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-pietra-sage disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
