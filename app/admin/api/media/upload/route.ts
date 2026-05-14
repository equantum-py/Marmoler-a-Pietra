import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BUCKET = 'pietra-media';
const ALLOWED_FOLDERS = ['materiales', 'proyectos', 'banners', 'ambientes', 'logos'] as const;

type Folder = (typeof ALLOWED_FOLDERS)[number];

function sanitizeFileName(fileName: string) {
  return fileName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

function getAccessTokenFromCookies(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const knownCookieNames = [
    'pietra_admin_access_token',
    'pietra-admin-access-token',
    'admin_access_token',
    'supabase_access_token',
    'sb-access-token',
    'access_token',
  ];

  for (const name of knownCookieNames) {
    const value = cookieStore.get(name)?.value;
    if (value) return value;
  }

  return cookieStore
    .getAll()
    .find((cookie) => cookie.name.toLowerCase().includes('access') && cookie.value.startsWith('eyJ'))
    ?.value;
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { message: 'Supabase no está configurado.' },
      { status: 500 },
    );
  }

  const cookieStore = await cookies();
  const accessToken = getAccessTokenFromCookies(cookieStore);

  if (!accessToken) {
    return NextResponse.json(
      { message: 'Sesión no válida. Volvé a iniciar sesión.' },
      { status: 401 },
    );
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const folderInput = String(formData.get('folder') || 'materiales');

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: 'No se recibió ningún archivo.' },
      { status: 400 },
    );
  }

  const folder: Folder = ALLOWED_FOLDERS.includes(folderInput as Folder)
    ? (folderInput as Folder)
    : 'materiales';

  const safeName = sanitizeFileName(file.name);
  const storagePath = `${folder}/${Date.now()}-${safeName}`;
  const uploadUrl = `${supabaseUrl}/storage/v1/object/${BUCKET}/${storagePath}`;

  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': file.type || 'application/octet-stream',
      'Cache-Control': '3600',
    },
    body: file,
  });

  if (!response.ok) {
    const message = await response.text();

    return NextResponse.json(
      { message: message || 'No se pudo subir la imagen.' },
      { status: response.status },
    );
  }

  return NextResponse.json({
    path: storagePath,
    publicUrl: `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${storagePath}`,
  });
}
