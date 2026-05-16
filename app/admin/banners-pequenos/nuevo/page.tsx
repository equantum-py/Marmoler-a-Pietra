import { AdminPageHeader } from '@/components/admin';
import { createHomePromoCard } from '@/app/admin/banners-pequenos/actions';
import { HomePromoCardForm } from '@/components/admin/home-promo-card-form';

export default function NewSmallBannerPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Nuevo banner pequeño"
        title="Cargar banner pequeño"
        description="Agregá una tarjeta comercial pequeña para la Home."
      />

      <HomePromoCardForm action={createHomePromoCard} submitLabel="Guardar banner" />
    </>
  );
}
