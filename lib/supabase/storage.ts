import { createClient } from '@supabase/supabase-js';

export const PIETRA_MEDIA_BUCKET = 'pietra-media';

export type PietraMediaFolder = 'materiales' | 'proyectos' | 'banners' | 'ambientes';

function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  }

  if (!supabaseKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export function sanitizeFileName(fileName: string) {
  return fileName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

export function createStoragePath(folder: PietraMediaFolder, fileName: string) {
  const safeName = sanitizeFileName(fileName);
  const timestamp = Date.now();

  return `${folder}/${timestamp}-${safeName}`;
}

export async function uploadPietraMedia({
  file,
  folder = 'materiales',
}: {
  file: File;
  folder?: PietraMediaFolder;
}) {
  const supabase = getSupabaseBrowserClient();
  const path = createStoragePath(folder, file.name);

  const { error } = await supabase.storage
    .from(PIETRA_MEDIA_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(PIETRA_MEDIA_BUCKET).getPublicUrl(path);

  return {
    path,
    publicUrl: data.publicUrl,
  };
}
