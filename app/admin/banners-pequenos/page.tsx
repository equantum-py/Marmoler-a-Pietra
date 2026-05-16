import { AdminActionButton, AdminBadge, AdminPageHeader, AdminTable } from '@/components/admin';
import { archiveHomePromoCard } from '@/app/admin/banners-pequenos/actions';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { AdminHomePromoCard } from '@/components/admin/home-promo-card-form';

async function getAdminHomePromoCards() {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    return [];
  }

  const accessToken = await getAdminAccessToken();

  return supabaseFetch<AdminHomePromoCard[]>(
    '/home_promo_cards?select=*&order=sort_order.asc',
    { accessToken },
  );
}

export default async function AdminSmallBannersPage() {
  const cards = await getAdminHomePromoCards();

  return (
    <>
      <AdminPageHeader
        eyebrow="Banners pequeños"
        title="Banners pequeños Home"
        description="Administrá las tarjetas comerciales pequeñas de la Home: imagen, texto, botón, orden y estado."
        action={
          <AdminActionButton href="/admin/banners-pequenos/nuevo" variant="primary">
            Nuevo banner
          </AdminActionButton>
        }
      />

      <AdminTable
        headers={['Banner', 'Título', 'Estado', 'Imagen', 'Orden', 'Acciones']}
      >
        {cards.map((card) => (
          <tr key={card.id} className="transition hover:bg-pietra-cream">
            <td className="px-5 py-4">
              <p className="font-semibold text-pietra-ink">{card.eyebrow}</p>
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              {card.title}
            </td>

            <td className="px-5 py-4">
              <AdminBadge status={card.status ?? 'draft'} />
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              {card.image_url ? 'Cargada' : 'Sin imagen'}
            </td>

            <td className="px-5 py-4 text-pietra-muted">
              #{card.sort_order ?? 0}
            </td>

            <td className="px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <AdminActionButton href={`/admin/banners-pequenos/${card.id}/editar`} variant="ghost">
                  Editar
                </AdminActionButton>

                <form action={archiveHomePromoCard}>
                  <input type="hidden" name="id" value={card.id} />
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

        {!cards.length ? (
          <tr>
            <td colSpan={6} className="px-5 py-10 text-center text-pietra-muted">
              Todavía no hay banners pequeños cargados.
            </td>
          </tr>
        ) : null}
      </AdminTable>
    </>
  );
}
