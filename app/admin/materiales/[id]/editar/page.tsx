import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin';
import { MaterialForm } from '@/components/admin/material-form';
import { updateMaterial } from '@/app/admin/materiales/actions';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { getAdminMaterialById } from '@/lib/supabase/materials';

type EditMaterialPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditMaterialPage({ params }: EditMaterialPageProps) {
  const { id } = await params;
  const material = await getAdminMaterialById(id);

  if (!material) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Materiales"
        title={`Editar ${material.name}`}
        description="Edición real de material para el CMS conectado a Supabase. En modo fallback local, la ficha puede visualizarse pero no guardarse."
      />
      <MaterialForm
        action={updateMaterial}
        material={material}
        submitLabel="Guardar cambios"
        disabled={!isSupabaseConfigured || material.source === 'local'}
      />
    </>
  );
}
