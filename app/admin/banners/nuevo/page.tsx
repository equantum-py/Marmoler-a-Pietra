import { AdminPageHeader } from '@/components/admin';
import { HomeBannerForm } from '@/components/admin/home-banner-form';
import { createHomeBanner } from '@/app/admin/banners/actions';

export default function NewHomeBannerPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Nuevo banner"
        title="Cargar banner"
        description="Subí imagen desktop y mobile para reemplazar los diseños ilustrados por imágenes reales."
      />

      <HomeBannerForm action={createHomeBanner} submitLabel="Guardar banner" />
    </>
  );
}
