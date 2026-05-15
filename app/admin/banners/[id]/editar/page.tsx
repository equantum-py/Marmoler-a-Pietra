import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin';
import { HomeBannerForm, type AdminHomeBanner } from '@/components/admin/home-banner-form';
import { updateHomeBanner } from '@/app/admin/banners/actions';
import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getBanner(id: string) {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    return null;
  }

  const accessToken = await getAdminAccessToken();

  const rows = await supabaseFetch<AdminHomeBanner[]>(
    `/home_banners?id=eq.${encodeURIComponent(id)}&select=*&limit=1`,
    { accessToken },
  );

  return rows[0] ?? null;
}

export default async function EditHomeBannerPage({ params }: PageProps) {
  const { id } = await params;
  const banner = await getBanner(id);

  if (!banner) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Editar banner"
        title={banner.title || 'Banner'}
        description="Actualizá textos, ubicación e imágenes responsive del banner."
      />

      <HomeBannerForm action={updateHomeBanner} banner={banner} submitLabel="Actualizar banner" />
    </>
  );
}
