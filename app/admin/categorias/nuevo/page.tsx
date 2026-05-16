import { AdminPageHeader } from '@/components/admin';
import { HomeCategoryForm } from '@/components/admin/home-category-form';
import { createHomeCategory } from '@/app/admin/categorias/actions';

export default function NewHomeCategoryPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Nueva categoría"
        title="Cargar categoría"
        description="Agregá una categoría para la sección de ambientes de la Home."
      />

      <HomeCategoryForm action={createHomeCategory} submitLabel="Guardar categoría" />
    </>
  );
}
