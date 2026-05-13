import { AdminPageHeader } from '@/components/admin';
import { MaterialForm } from '@/components/admin/material-form';
import { createMaterial } from '@/app/admin/materiales/actions';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export default function NewMaterialPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Materiales"
        title="Nuevo material"
        description="Alta real de material en Supabase. Si Supabase no está configurado, el formulario se muestra deshabilitado y el listado usa fallback local."
      />
      <MaterialForm
        action={createMaterial}
        submitLabel="Crear material"
        disabled={!isSupabaseConfigured}
      />
    </>
  );
}
