import { AdminActionButton, AdminBadge, AdminPageHeader, AdminTable } from '@/components/admin';
import { archiveHomeCategory } from '@/app/admin/categorias/actions';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { AdminHomeCategory } from '@/components/admin/home-category-form';

async function getAdminHomeCategories() {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    return [];
  }

  const accessToken = await getAdminAccessToken();

  return supabaseFetch<AdminHomeCategory[]>(
    '/home_categories?select=*&order=sort_order.asc',
    { accessToken },
  );
}

export default async function AdminCategoriesPage() {
  const categories = await getAdminHomeCategories();

  return (
    <>
      <AdminPageHeader
        eyebrow="Ambientes y categorías"
        title="Categorías"
        description="Administrá las categorías visibles en la Home: nombre, imagen, orden, estado y enlace o mensaje de WhatsApp."
        action={
          <AdminActionButton href="/admin/categorias/nuevo" variant="primary">
            Nueva categoría
          </AdminActionButton>
        }
      />

      <AdminTable
        headers={[
          'Categoría',
          'Slug',
          'Estado',
          'Imagen',
          'Orden',
          'Acciones',
        ]}
      >
        {categories.map((category) => (
          <tr key={category.id} className="transition hover:bg-pietra-cream">
            <td className="px-5 py-4">
              <p className="font-semibold text-pietra-ink">{category.name}</p>
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              /{category.slug}
            </td>

            <td className="px-5 py-4">
              <AdminBadge status={category.status ?? 'draft'} />
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              {category.image_url ? 'Cargada' : 'Sin imagen'}
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              #{category.sort_order ?? 0}
            </td>

            <td className="px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <AdminActionButton href={`/admin/categorias/${category.id}/editar`} variant="ghost">
                  Editar
                </AdminActionButton>

                <form action={archiveHomeCategory}>
                  <input type="hidden" name="id" value={category.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-pietra-green transition hover:bg-pietra-green/10"
                  >
                    Quitar
                  </button>
                </form>
              </div>
            </td>
          </tr>
        ))}

        {!categories.length ? (
          <tr>
            <td colSpan={6} className="px-5 py-10 text-center text-pietra-muted">
              Todavía no hay categorías cargadas.
            </td>
          </tr>
        ) : null}
      </AdminTable>
    </>
  );
}
