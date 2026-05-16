import { AdminActionButton, AdminBadge, AdminPageHeader, AdminTable } from '@/components/admin';
import { archiveHomePromotion } from '@/app/admin/promociones/actions';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { AdminHomePromotion } from '@/components/admin/home-promotion-form';

async function getAdminHomePromotions() {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    return [];
  }

  const accessToken = await getAdminAccessToken();

  return supabaseFetch<AdminHomePromotion[]>(
    '/home_promotions?select=*&order=sort_order.asc',
    { accessToken },
  );
}

export default async function AdminPromotionsPage() {
  const promotions = await getAdminHomePromotions();

  return (
    <>
      <AdminPageHeader
        eyebrow="Publicidad"
        title="Promociones"
        description="Gestioná banners largos, imágenes o videos promocionales para la Home."
        action={
          <AdminActionButton href="/admin/promociones/nuevo" variant="primary">
            Nueva promoción
          </AdminActionButton>
        }
      />

      <AdminTable
        headers={['Promoción', 'Tipo', 'Estado', 'Desktop', 'Mobile', 'Orden', 'Acciones']}
      >
        {promotions.map((promotion) => (
          <tr key={promotion.id} className="transition hover:bg-pietra-cream">
            <td className="px-5 py-4">
              <p className="font-semibold text-pietra-ink">{promotion.name}</p>
              <p className="mt-1 text-xs text-pietra-muted">{promotion.placement}</p>
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              {promotion.media_type}
            </td>

            <td className="px-5 py-4">
              <AdminBadge status={promotion.status ?? 'draft'} />
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              {promotion.desktop_media_url ? 'Cargado' : 'Sin archivo'}
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              {promotion.mobile_media_url ? 'Cargado' : 'Usa desktop'}
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              #{promotion.sort_order ?? 0}
            </td>

            <td className="px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <AdminActionButton href={`/admin/promociones/${promotion.id}/editar`} variant="ghost">
                  Editar
                </AdminActionButton>

                <form action={archiveHomePromotion}>
                  <input type="hidden" name="id" value={promotion.id} />
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

        {!promotions.length ? (
          <tr>
            <td colSpan={7} className="px-5 py-10 text-center text-pietra-muted">
              Todavía no hay promociones cargadas.
            </td>
          </tr>
        ) : null}
      </AdminTable>
    </>
  );
}
