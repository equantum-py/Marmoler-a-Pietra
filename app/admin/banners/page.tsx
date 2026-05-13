import { AdminActionButton, AdminBadge, AdminPageHeader, AdminTable } from '@/components/admin';
import { adminBanners } from '@/data/admin';

export default function AdminBannersPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Campañas"
        title="Banners"
        description="Gestión de banners comerciales editoriales para Home y secciones del showroom. Mantiene el criterio de conversión por WhatsApp, sin precios ni checkout."
        action={<AdminActionButton variant="primary">Nuevo banner</AdminActionButton>}
      />
      <AdminTable
        headers={[
          'Banner',
          'Ubicación',
          'Estado',
          'Fecha inicio',
          'Fecha fin',
          'CTA',
          'Prioridad',
          'Acciones',
        ]}
      >
        {adminBanners.map((banner) => (
          <tr key={banner.name} className="transition hover:bg-pietra-cream">
            <td className="px-5 py-4 font-semibold text-pietra-ink">{banner.name}</td>
            <td className="px-5 py-4 text-pietra-muted">{banner.location}</td>
            <td className="px-5 py-4">
              <AdminBadge status={banner.status} />
            </td>
            <td className="px-5 py-4 text-pietra-muted">{banner.startDate}</td>
            <td className="px-5 py-4 text-pietra-muted">{banner.endDate}</td>
            <td className="px-5 py-4 text-pietra-muted">{banner.cta}</td>
            <td className="px-5 py-4">
              <span className="rounded-full bg-pietra-brown/10 px-3 py-1 text-xs font-bold text-pietra-brown">
                #{banner.priority}
              </span>
            </td>
            <td className="px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <AdminActionButton variant="ghost">Editar</AdminActionButton>
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
