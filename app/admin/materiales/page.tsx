import Link from 'next/link';
import { AdminActionButton, AdminBadge, AdminPageHeader, AdminTable } from '@/components/admin';
import { archiveMaterial, duplicateMaterial } from '@/app/admin/materiales/actions';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { getAdminMaterials } from '@/lib/supabase/materials';

export default async function AdminMaterialsPage() {
  const materials = await getAdminMaterials();
  const dataSource =
    isSupabaseConfigured && materials.some((material) => material.source === 'supabase')
      ? 'Supabase'
      : 'Fallback local';

  return (
    <>
      <AdminPageHeader
        eyebrow="Catálogo conectado"
        title="Materiales"
        description="Gestión real del primer módulo del CMS: lectura desde Supabase cuando está configurado y fallback local de solo lectura cuando faltan variables de entorno o falla la conexión."
        action={
          <AdminActionButton href="/admin/materiales/nuevo" variant="primary">
            Nuevo material
          </AdminActionButton>
        }
      />

      <section className="grid gap-3 rounded-[1.5rem] border border-pietra-border bg-white p-4 shadow-card md:grid-cols-[1fr_1fr_1fr_auto]">
        {['Buscar material', 'Filtrar por categoría', 'Filtrar por estado'].map((filter) => (
          <label
            key={filter}
            className="text-xs font-bold uppercase tracking-[0.14em] text-pietra-muted"
          >
            {filter}
            <div className="mt-2 rounded-full border border-pietra-border bg-pietra-cream px-4 py-3 text-sm font-medium normal-case tracking-normal text-pietra-muted">
              {filter === 'Buscar material' ? 'Verde Ubatuba, Neolith...' : 'Todos'}
            </div>
          </label>
        ))}
        <div className="rounded-2xl border border-pietra-border bg-pietra-green/10 px-4 py-3 text-sm font-semibold text-pietra-green">
          Origen: {dataSource}
        </div>
      </section>

      <AdminTable
        headers={[
          'Material',
          'Categoría',
          'Estado',
          'Destacado',
          'Aplicaciones',
          'Actualización',
          'Acciones',
        ]}
      >
        {materials.map((material) => (
          <tr key={material.id} className="align-top transition hover:bg-pietra-cream">
            <td className="px-5 py-4">
              <div className="font-semibold text-pietra-ink">{material.name}</div>
              <div className="mt-1 text-xs text-pietra-muted">/{material.slug}</div>
            </td>
            <td className="px-5 py-4 text-pietra-muted">{material.category}</td>
            <td className="px-5 py-4">
              <AdminBadge status={material.status} />
            </td>
            <td className="px-5 py-4">
              <AdminBadge status={material.featured ? 'Destacado' : 'Borrador'} />
            </td>
            <td className="max-w-xs px-5 py-4 text-pietra-muted">
              {material.applications.slice(0, 3).join(', ')}
            </td>
            <td className="px-5 py-4 text-pietra-muted">
              {new Date(material.updated_at).toLocaleDateString('es-PY')}
            </td>
            <td className="px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <AdminActionButton href={`/admin/materiales/${material.id}/editar`} variant="ghost">
                  Editar
                </AdminActionButton>
                <Link
                  href={`/materiales/${material.slug}`}
                  className="rounded-full bg-pietra-green/10 px-3 py-1.5 text-xs font-bold text-pietra-green"
                >
                  Ver PDP
                </Link>
                <form action={duplicateMaterial}>
                  <input type="hidden" name="id" value={material.id} />
                  <button
                    type="submit"
                    className="rounded-full px-3 py-1.5 text-xs font-bold text-pietra-green hover:bg-pietra-green/10"
                  >
                    Duplicar
                  </button>
                </form>
                <form action={archiveMaterial}>
                  <input type="hidden" name="id" value={material.id} />
                  <button
                    type="submit"
                    className="rounded-full px-3 py-1.5 text-xs font-bold text-pietra-green hover:bg-pietra-green/10"
                  >
                    Archivar
                  </button>
                </form>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      {!isSupabaseConfigured ? (
        <section className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-6 text-amber-800 shadow-card">
          <h2 className="font-display text-2xl font-semibold">Fallback local activo</h2>
          <p className="mt-2 text-sm leading-6">
            Configurá NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY para activar
            autenticación, lectura y escritura real de materiales en Supabase.
          </p>
        </section>
      ) : null}
    </>
  );
}
