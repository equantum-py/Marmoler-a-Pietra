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
        eyebrow="Campañas visuales"
        title="Banners Home"
        description="Gestioná el hero responsive de la home con imágenes desktop/mobile, textos, CTA, estado, orden y fechas de publicación."
        action={
          <AdminActionButton href="/admin/banners/nuevo" variant="primary">
            Nuevo banner
          </AdminActionButton>
        }
      />

      <AdminTable
        headers={[
          'Banner',
          'Estado',
          'Desktop',
          'Mobile',
          'Título',
          'Orden',
          'Acciones',
        ]}
      >
        {banners.map((banner) => (
          <tr key={banner.id} className="transition hover:bg-pietra-cream">
            <td className="px-5 py-4">
              <p className="font-semibold text-pietra-ink">{banner.name || 'Banner sin nombre'}</p>
              <p className="mt-1 text-xs text-pietra-muted">{banner.placement || 'hero'}</p>
            </td>

            <td className="px-5 py-4">
              <AdminBadge status={banner.status ?? 'draft'} />
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              {banner.desktop_image_url ? 'Cargada' : 'Sin imagen'}
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              {banner.mobile_image_url ? 'Cargada' : 'Sin imagen'}
            </td>

            <td className="max-w-[280px] truncate px-5 py-4 text-pietra-muted">
              {banner.title || 'Sin título'}
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
              Todavía no hay banners cargados.
            </td>
          </tr>
        ) : null}
      </AdminTable>
    </>
  );
}
