'use client';

import { useActionState } from 'react';
import { updateSiteSettings } from '@/app/admin/configuracion/actions';
import { AdminImageUploader } from '@/components/admin/admin-image-uploader';
import type { SiteSettings } from '@/lib/site-settings';
import type { MaterialFormState } from '@/lib/supabase/types';

const initialState: MaterialFormState = { ok: false, message: '' };

function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  required = false,
  placeholder,
}: {
  label: string;
  name: keyof SiteSettings;
  defaultValue?: string | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-pietra-brown">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder}
        className="admin-input mt-2"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  required = false,
  rows = 4,
  placeholder,
}: {
  label: string;
  name: keyof SiteSettings;
  defaultValue?: string | null;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-pietra-brown">
        {label}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder}
        className="admin-input mt-2 resize-y"
      />
    </label>
  );
}

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, isPending] = useActionState(updateSiteSettings, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <section className="rounded-[2rem] border border-pietra-border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            Contacto comercial
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-pietra-black">
            Datos globales de contacto
          </h2>
          <p className="mt-3 text-sm leading-7 text-pietra-muted">
            Estos datos alimentan los botones de WhatsApp, header, footer y enlaces públicos.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="WhatsApp"
            name="whatsapp_number"
            defaultValue={settings.whatsapp_number}
            required
            placeholder="595984756158"
          />
          <Field label="Teléfono visible" name="phone" defaultValue={settings.phone} />
          <Field label="Email" name="email" type="email" defaultValue={settings.email} required />
          <Field label="Instagram" name="instagram_url" type="url" defaultValue={settings.instagram_url} />
          <Field label="Facebook" name="facebook_url" type="url" defaultValue={settings.facebook_url} />
          <Field label="Dirección" name="address" defaultValue={settings.address} />
          <div className="md:col-span-2">
            <TextArea
              label="Horarios"
              name="business_hours"
              defaultValue={settings.business_hours}
              rows={3}
            />
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-pietra-border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            Identidad visual
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-pietra-black">
            Logo y favicon
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <AdminImageUploader
            label="Logo principal"
            name="logo_url"
            folder="logos"
            previewFit="contain"
            defaultValue={settings.logo_url ?? ''}
            helperText="Logo base usado por defecto en header y footer."
          />
          <AdminImageUploader
            label="Logo desktop"
            name="logo_desktop"
            folder="logos"
            previewFit="contain"
            defaultValue={settings.logo_desktop ?? ''}
            helperText="Logo horizontal para desktop."
          />
          <AdminImageUploader
            label="Logo mobile"
            name="logo_mobile"
            folder="logos"
            previewFit="contain"
            defaultValue={settings.logo_mobile ?? ''}
            helperText="Logo para navegación mobile."
          />
        </div>

        <div className="mt-5">
          <AdminImageUploader
            label="Favicon"
            name="favicon_url"
            folder="logos"
            previewFit="contain"
            defaultValue={settings.favicon_url ?? ''}
            helperText="Icono del sitio. Recomendado: PNG o ICO cuadrado."
          />
        </div>
      </section>

      <section className="rounded-[2rem] border border-pietra-border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
            SEO y mensajes globales
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-pietra-black">
            Contenido institucional
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nombre de empresa" name="company_name" defaultValue={settings.company_name} />
          <Field label="CTA principal" name="main_cta_text" defaultValue={settings.main_cta_text} />
          <Field label="URL CTA principal" name="main_cta_url" defaultValue={settings.main_cta_url} />
          <Field label="SEO title" name="seo_title" defaultValue={settings.seo_title} required />
          <div className="md:col-span-2">
            <TextArea
              label="SEO description"
              name="seo_description"
              defaultValue={settings.seo_description}
              required
            />
          </div>
          <div className="md:col-span-2">
            <TextArea label="Texto footer" name="footer_text" defaultValue={settings.footer_text} />
          </div>
          <div className="md:col-span-2">
            <TextArea
              label="Texto institucional básico"
              name="institutional_text"
              defaultValue={settings.institutional_text}
            />
          </div>
        </div>
      </section>

      {state.message ? (
        <div
          className={[
            'rounded-2xl border px-5 py-4 text-sm font-semibold',
            state.ok
              ? 'border-green-200 bg-green-50 text-green-700'
              : 'border-red-200 bg-red-50 text-red-700',
          ].join(' ')}
        >
          {state.message}
        </div>
      ) : null}

      <div className="sticky bottom-4 z-10 flex justify-end rounded-[1.5rem] border border-pietra-border bg-white/90 p-4 shadow-card backdrop-blur">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-12 items-center justify-center rounded-full bg-pietra-green px-7 text-sm font-bold text-white transition hover:bg-pietra-greenMuted disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Guardando...' : 'Guardar configuración'}
        </button>
      </div>
    </form>
  );
}
