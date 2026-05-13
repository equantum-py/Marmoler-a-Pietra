import { AdminActionButton, AdminBadge, AdminPageHeader, AdminTable } from '@/components/admin';
import { seoPages } from '@/data/admin';

export default function AdminSeoPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Visibilidad"
        title="SEO"
        description="Control visual de titles, descriptions e indexación de páginas principales y PDPs clave. Preparado para auditorías antes de publicar cambios."
      />
      <AdminTable
        headers={['Página', 'Title', 'Description', 'Estado SEO', 'Indexación', 'Acciones']}
      >
        {seoPages.map((page) => (
          <tr key={page.page} className="transition hover:bg-pietra-cream">
            <td className="px-5 py-4 font-semibold text-pietra-ink">{page.page}</td>
            <td className="max-w-xs px-5 py-4 text-pietra-muted">{page.title}</td>
            <td className="max-w-sm px-5 py-4 text-pietra-muted">
              {page.description || 'Pendiente de completar'}
            </td>
            <td className="px-5 py-4">
              <AdminBadge status={page.status} />
            </td>
            <td className="px-5 py-4 text-pietra-muted">{page.indexation}</td>
            <td className="px-5 py-4">
              <AdminActionButton variant="ghost">Editar SEO</AdminActionButton>
            </td>
          </tr>
        ))}
      </AdminTable>
    </>
  );
}
