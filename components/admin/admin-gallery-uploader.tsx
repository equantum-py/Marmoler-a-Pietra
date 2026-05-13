'use client';

import { useMemo, useState, type ChangeEvent } from 'react';
import { uploadPietraMedia, type PietraMediaFolder } from '@/lib/supabase/storage';

type AdminGalleryUploaderProps = {
  label: string;
  name: string;
  folder?: PietraMediaFolder;
  defaultValue?: string[] | string | null;
};

function normalizeInitialUrls(value: AdminGalleryUploaderProps['defaultValue']) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed.filter(Boolean);
    }
  } catch {
    // Sigue con split manual.
  }

  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminGalleryUploader({
  label,
  name,
  folder = 'materiales',
  defaultValue,
}: AdminGalleryUploaderProps) {
  const initialUrls = useMemo(() => normalizeInitialUrls(defaultValue), [defaultValue]);
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) return;

    setIsUploading(true);
    setErrorMessage('');

    try {
      const uploaded = [];

      for (const file of files) {
        const result = await uploadPietraMedia({ file, folder });
        uploaded.push(result.publicUrl);
      }

      setUrls((current) => [...current, ...uploaded]);
      event.target.value = '';
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudo subir la galería.');
    } finally {
      setIsUploading(false);
    }
  }

  function removeUrl(urlToRemove: string) {
    setUrls((current) => current.filter((url) => url !== urlToRemove));
  }

  return (
    <div className="rounded-[1.25rem] border border-pietra-border bg-white/70 p-4">
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-pietra-brown">
        {label}
      </label>

      <input type="hidden" name={`${name}_json`} value={JSON.stringify(urls)} />
      {urls.map((url) => (
        <input key={url} type="hidden" name={name} value={url} />
      ))}

      {urls.length ? (
        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {urls.map((url) => (
            <div key={url} className="overflow-hidden rounded-2xl border border-pietra-border bg-pietra-warm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="Imagen de galería" className="h-36 w-full object-cover" />
              <div className="flex items-center justify-between gap-2 p-3">
                <p className="truncate text-xs text-pietra-muted">Imagen cargada</p>
                <button
                  type="button"
                  onClick={() => removeUrl(url)}
                  className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-4 flex h-40 items-center justify-center rounded-2xl border border-dashed border-pietra-border bg-pietra-warm text-sm text-pietra-muted">
          Sin imágenes de galería
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="block w-full rounded-full border border-pietra-border bg-white px-4 py-3 text-sm"
      />

      {isUploading ? <p className="mt-2 text-sm text-pietra-green">Subiendo imágenes...</p> : null}
      {errorMessage ? <p className="mt-2 text-sm text-red-600">{errorMessage}</p> : null}

      {urls.length ? (
        <p className="mt-2 text-xs text-pietra-muted">
          {urls.length} imagen{urls.length === 1 ? '' : 'es'} cargada{urls.length === 1 ? '' : 's'}.
        </p>
      ) : null}
    </div>
  );
}
