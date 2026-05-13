import { AdminActionButton, AdminBadge, AdminPageHeader, AdminTable } from '@/components/admin';
import { adminProjects } from '@/data/admin';

export default function AdminProjectsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Portfolio"
        title="Proyectos"
        description="Listado mock de casos de obra para inspirar por ambiente, material y terminación, sin flujo transaccional ni precios."
        action={<AdminActionButton variant="primary">Nuevo proyecto</AdminActionButton>}
      />
      <AdminTable
        headers={[
          'Proyecto',
          'Ambiente',
          'Material usado',
          'Estado',
          'Destacado',
          'Fecha',
          'Acciones',
        ]}
      >
        {adminProjects.map((project) => (
          <tr key={project.title} className="transition hover:bg-pietra-cream">
            <td className="px-5 py-4 font-semibold text-pietra-ink">{project.title}</td>
            <td className="px-5 py-4 text-pietra-muted">{project.environment}</td>
            <td className="px-5 py-4 text-pietra-muted">{project.material}</td>
            <td className="px-5 py-4">
              <AdminBadge status={project.status} />
            </td>
            <td className="px-5 py-4">
              <AdminBadge status={project.highlighted ? 'Destacado' : 'Borrador'} />
            </td>
            <td className="px-5 py-4 text-pietra-muted">{project.date}</td>
            <td className="px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <AdminActionButton variant="ghost">Editar</AdminActionButton>
                <AdminActionButton variant="ghost">Ver proyecto</AdminActionButton>
                <AdminActionButton variant="ghost">Duplicar</AdminActionButton>
                <AdminActionButton variant="ghost">Archivar</AdminActionButton>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </>
  );
}
