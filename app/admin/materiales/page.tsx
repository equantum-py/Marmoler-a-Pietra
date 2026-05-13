import Link from 'next/link';
import { AdminActionButton, AdminBadge, AdminPageHeader, AdminTable } from '@/components/admin';
import { adminMaterials, materialFormFields } from '@/data/admin';

export default function AdminMaterialsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Catálogo"
        title="Materiales"
        description="Gestión visual de mármoles, granitos, cuarzos, Neolith y superficies especiales. La tabla reutiliza la data actual del sitio y deja preparada la futura edición persistente."
        action={<AdminActionButton variant="primary">Nuevo material</AdminActionButton>}
      />

      <section className="grid gap-3 rounded-[1.5rem] border border-pietra-border bg-white p-4 shadow-card md:grid-cols-4">
        {[
          'Buscar material',
          'Filtrar por categoría',
          'Filtrar por estado',
          'Filtrar por destacado',
        ].map((filter) => (
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
      </section>

      <AdminTable
        headers={[
          'Material',
          'Categoría',
          'Estado',
          'Destacado',
          'Aplicaciones',
          'Última actualización',
          'Acciones',
        ]}
      >
        {adminMaterials.map((material) => (
          <tr key={material.slug} className="align-top transition hover:bg-pietra-cream">
            <td className="px-5 py-4">
              <div className="font-semibold text-pietra-ink">{material.name}</div>
              <div className="mt-1 text-xs text-pietra-muted">/{material.slug}</div>
            </td>
            <td className="px-5 py-4 text-pietra-muted">{material.category}</td>
            <td className="px-5 py-4">
              <AdminBadge status={material.status} />
            </td>
            <td className="px-5 py-4">
              <AdminBadge status={material.highlighted ? 'Destacado' : 'Borrador'} />
            </td>
            <td className="max-w-xs px-5 py-4 text-pietra-muted">
              {material.applications.slice(0, 3).join(', ')}
            </td>
            <td className="px-5 py-4 text-pietra-muted">{material.updatedAt}</td>
            <td className="px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <AdminActionButton variant="ghost">Editar</AdminActionButton>
                <Link
                  href={`/materiales/${material.slug}`}
                  className="rounded-full bg-pietra-green/10 px-3 py-1.5 text-xs font-bold text-pietra-green"
                >
                  Ver PDP
                </Link>
                <AdminActionButton variant="ghost">Duplicar</AdminActionButton>
                <AdminActionButton variant="ghost">Archivar</AdminActionButton>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      <section className="rounded-[1.5rem] border border-pietra-border bg-white p-6 shadow-card">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-pietra-brown">
          Formulario preparado
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-pietra-ink">
          Ficha visual de material
        </h2>
        <p className="mt-2 text-sm text-pietra-muted">
          Campos previstos para una futura ruta de edición con guardado real.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {materialFormFields.map((field) => (
            <div
              key={field}
              className="rounded-2xl border border-pietra-border bg-pietra-cream px-4 py-3 text-sm font-semibold text-pietra-ink"
            >
              {field}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
