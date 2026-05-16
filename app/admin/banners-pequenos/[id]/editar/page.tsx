import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin';
import { updateHomePromoCard } from '@/app/admin/banners-pequenos/actions';
import { HomePromoCardForm, type AdminHomePromoCard } from '@/components/admin/home-promo-card-form';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

async function getPromoCard(id: string) {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    return null;
  }

  const accessToken = await getAdminAccessToken();

  const cards = await supabaseFetch<AdminHomePromoCard[]>(
    `/home_promo_cards?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
    { accessToken },
  );

  return cards[0] ?? null;
}

export default async function EditSmallBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = await getPromoCard(id);

  if (!card) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Editar banner pequeño"
        title={card.eyebrow || 'Banner pequeño'}
        description="Actualizá imagen, texto, botón, orden y estado."
      />

      <HomePromoCardForm
        action={updateHomePromoCard}
        card={card}
        submitLabel="Actualizar banner"
      />
    </>
  );
}
