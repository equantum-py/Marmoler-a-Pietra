import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin';
import { HomeCategoryForm, type AdminHomeCategory } from '@/components/admin/home-category-form';
import { updateHomeCategory } from '@/app/admin/categorias/actions';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

async function getCategory(id: string) {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    return null;
  }

  const accessToken = await getAdminAccessToken();

  const categories = await supabaseFetch<AdminHomeCategory[]>(
    `/home_categories?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
    { accessToken },
  );

  return categories[0] ?? null;
}

export default async function EditHomeCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategory(id);

  if (!category) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Editar categoría"
        title={category.name || 'Categoría'}
        description="Actualizá nombre, imagen, orden, estado y mensaje de WhatsApp."
      />

      <HomeCategoryForm
        action={updateHomeCategory}
        category={category}
        submitLabel="Actualizar categoría"
      />
    </>
  );
}
