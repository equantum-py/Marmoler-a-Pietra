import { AdminActionButton, AdminBadge, AdminPageHeader, AdminTable } from '@/components/admin';
import { adminLeads } from '@/data/admin';

export default function AdminLeadsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Comercial"
        title="Leads y consultas"
        description="Bandeja mock para ordenar las consultas que llegan por WhatsApp, PDP, Home y ambientes. La futura fase podrá conectarse con formularios, CRM o WhatsApp Business."
      />
      <section className="grid gap-3 rounded-[1.5rem] border border-pietra-border bg-white p-4 shadow-card md:grid-cols-4">
        {['Estado', 'Material', 'Origen', 'Responsable'].map((filter) => (
          <div
            key={filter}
            className="rounded-full border border-pietra-border bg-pietra-cream px-4 py-3 text-sm font-semibold text-pietra-muted"
          >
            Filtro: {filter}
          </div>
        ))}
      </section>
      <AdminTable
        headers={[
          'Nombre',
          'Teléfono',
          'Material consultado',
          'Origen',
          'Estado',
          'Responsable',
          'Fecha',
          'Acciones',
        ]}
      >
        {adminLeads.map((lead) => (
          <tr key={lead.phone} className="transition hover:bg-pietra-cream">
            <td className="px-5 py-4 font-semibold text-pietra-ink">{lead.name}</td>
            <td className="px-5 py-4 text-pietra-muted">{lead.phone}</td>
            <td className="px-5 py-4 text-pietra-muted">{lead.material}</td>
            <td className="px-5 py-4 text-pietra-muted">{lead.origin}</td>
            <td className="px-5 py-4">
              <AdminBadge status={lead.status} />
            </td>
            <td className="px-5 py-4 text-pietra-muted">{lead.owner}</td>
            <td className="px-5 py-4 text-pietra-muted">{lead.date}</td>
            <td className="px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <AdminActionButton variant="ghost">Abrir</AdminActionButton>
                <AdminActionButton variant="ghost">WhatsApp</AdminActionButton>
                <AdminActionButton variant="ghost">Cerrar</AdminActionButton>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </>
  );
}
