import { AdminActionButton, AdminBadge, AdminPageHeader, AdminTable } from '@/components/admin';
import { archiveHomeBanner } from '@/app/admin/banners/actions';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { AdminHomeBanner } from '@/components/admin/home-banner-form';

async function getAdminHomeBanners() {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    return [];
  }

  const accessToken = await getAdminAccessToken();

  return supabaseFetch<AdminHomeBanner[]>(
    '/home_banners?select=*&order=sort_order.asc',
    { accessToken },
  );
}

export default async function AdminBannersPage() {
  const banners = await getAdminHomeBanners();

  return (
    <>
      <AdminPageHeader
        eyebrow="Imágenes del sitio"
        title="Banners visuales"
        description="Administrá las imágenes reales del sitio: versión desktop, versión mobile y enlace opcional al hacer clic."
        action={
          <AdminActionButton href="/admin/banners/nuevo" variant="primary">
            Nuevo banner
          </AdminActionButton>
        }
      />

      <AdminTable
        headers={[
          'Ubicación',
          'Estado',
          'Imagen desktop',
          'Imagen mobile',
          'Enlace',
          'Orden',
          'Acciones',
        ]}
      >
        {banners.map((banner) => (
          <tr key={banner.id} className="transition hover:bg-pietra-cream">
            <td className="px-5 py-4 font-semibold text-pietra-ink">
              {banner.placement}
            </td>

            <td className="px-5 py-4">
              <AdminBadge status={banner.status ?? 'draft'} />
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              {banner.desktop_image ? 'Cargada' : 'Sin imagen'}
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              {banner.mobile_image ? 'Cargada' : 'Sin imagen'}
            </td>

            <td className="max-w-[240px] truncate px-5 py-4 text-pietra-muted">
              {banner.cta_url || 'Sin enlace'}
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              #{banner.sort_order ?? 0}
            </td>

            <td className="px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <AdminActionButton href={`/admin/banners/${banner.id}/editar`} variant="ghost">
                  Editar
                </AdminActionButton>

                <form action={archiveHomeBanner}>
                  <input type="hidden" name="id" value={banner.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-pietra-green transition hover:bg-pietra-green/10"
                  >
                    Archivar
                  </button>
                </form>
              </div>
            </td>
          </tr>
        ))}

        {!banners.length ? (
          <tr>
            <td colSpan={7} className="px-5 py-10 text-center text-pietra-muted">
              Todavía no hay imágenes cargadas.
            </td>
          </tr>
        ) : null}
      </AdminTable>
    </>
  );
}
