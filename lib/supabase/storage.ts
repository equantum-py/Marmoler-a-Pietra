export type PietraMediaFolder = 'materiales' | 'proyectos' | 'banners' | 'ambientes' | 'logos' | 'promociones';

export async function uploadPietraMedia({
  file,
  folder = 'materiales',
}: {
  file: File;
  folder?: PietraMediaFolder;
}) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await fetch('/admin/api/media/upload', {
    method: 'POST',
    body: formData,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || 'No se pudo subir el archivo.');
  }

  return payload as {
    path: string;
    publicUrl: string;
  };
}
