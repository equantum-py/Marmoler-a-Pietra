import { AdminBadge } from '@/components/admin/admin-badge';
import { AdminActionButton } from '@/components/admin/admin-action-button';
import type { AdminStatus } from '@/data/admin';

type AdminSectionCardProps = {
  title: string;
  description: string;
  status: AdminStatus;
  updatedAt: string;
};

export function AdminSectionCard({ title, description, status, updatedAt }: AdminSectionCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[1.5rem] border border-pietra-border bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold text-pietra-ink">{title}</h3>
        <AdminBadge status={status} />
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-pietra-muted">{description}</p>
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-pietra-border pt-4">
        <span className="text-xs font-semibold text-pietra-muted">
          Última modificación: {updatedAt}
        </span>
        <AdminActionButton variant="ghost">Editar sección</AdminActionButton>
      </div>
    </article>
  );
}
