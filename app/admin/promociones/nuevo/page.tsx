import { AdminPageHeader } from '@/components/admin';
import { createHomePromotion } from '@/app/admin/promociones/actions';
import { HomePromotionForm } from '@/components/admin/home-promotion-form';

export default function NewHomePromotionPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Nueva promoción"
        title="Cargar promoción"
        description="Agregá una imagen o video promocional para la Home."
      />

      <HomePromotionForm action={createHomePromotion} submitLabel="Guardar promoción" />
    </>
  );
}
