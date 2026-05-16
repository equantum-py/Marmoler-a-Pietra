'use client';

import { useState, type ChangeEvent } from 'react';
import { uploadPietraMedia, type PietraMediaFolder } from '@/lib/supabase/storage';

type AdminMediaUploaderProps = {
  label: string;
  name: string;
  folder?: PietraMediaFolder;
  defaultValue?: string;
  accept?: string;
  helperText?: string;
};

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov|m4v)$/i.test(url.split('?')[0] ?? '');
}

export function AdminMediaUploader({
  label,
  name,
  folder = 'promociones',
  defaultValue = '',
  accept = 'image/*,video/mp4,video/webm,video/quicktime',
  helperText,
}: AdminMediaUploaderProps) {
  const [url, setUrl] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsUploading(true);
    setErrorMessage('');

    try {
      const result = await uploadPietraMedia({ file, folder });
      setUrl(result.publicUrl);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'No se pudo subir el archivo.');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="rounded-[1.25rem] border border-pietra-border bg-white/70 p-4">
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-pietra-brown">
        {label}
      </label>

      {helperText ? <p className="mb-4 text-sm leading-6 text-pietra-muted">{helperText}</p> : null}

      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-pietra-border bg-pietra-warm">
          {isVideoUrl(url) ? (
            <video src={url} controls muted playsInline className="h-full w-full object-contain" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt={label} className="h-full w-full object-contain p-4" />
          )}
        </div>
      ) : (
        <div className="mb-4 flex h-48 items-center justify-center rounded-2xl border border-dashed border-pietra-border bg-pietra-warm text-sm text-pietra-muted">
          Sin archivo cargado
        </div>
      )}

      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="block w-full rounded-full border border-pietra-border bg-white px-4 py-3 text-sm"
      />

      {isUploading ? <p className="mt-2 text-sm text-pietra-green">Subiendo archivo...</p> : null}

      {errorMessage ? <p className="mt-2 text-sm text-red-600">{errorMessage}</p> : null}

      {url ? <p className="mt-2 break-all text-xs text-pietra-muted">{url}</p> : null}
    </div>
  );
}
