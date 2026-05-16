import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin';
import { updateHomePromotion } from '@/app/admin/promociones/actions';
import { HomePromotionForm, type AdminHomePromotion } from '@/components/admin/home-promotion-form';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

async function getPromotion(id: string) {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    return null;
  }

  const accessToken = await getAdminAccessToken();

  const promotions = await supabaseFetch<AdminHomePromotion[]>(
    `/home_promotions?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
    { accessToken },
  );

  return promotions[0] ?? null;
}

export default async function EditHomePromotionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const promotion = await getPromotion(id);

  if (!promotion) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Editar promoción"
        title={promotion.name || 'Promoción'}
        description="Actualizá imagen, video, orden, estado y enlace."
      />

      <HomePromotionForm
        action={updateHomePromotion}
        promotion={promotion}
        submitLabel="Actualizar promoción"
      />
    </>
  );
}
