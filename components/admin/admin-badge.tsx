import type { AdminStatus } from '@/data/admin';

const badgeStyles: Partial<Record<AdminStatus, string>> = {
  Publicado: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Borrador: 'border-stone-200 bg-stone-100 text-stone-600',
  Destacado: 'border-amber-200 bg-amber-50 text-amber-700',
  'Sin imagen': 'border-red-200 bg-red-50 text-red-700',
  'Falta SEO': 'border-orange-200 bg-orange-50 text-orange-700',
  Activo: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Programado: 'border-blue-200 bg-blue-50 text-blue-700',
  Vencido: 'border-red-200 bg-red-50 text-red-700',
  Nuevo: 'border-pietra-sage/30 bg-pietra-sage/10 text-pietra-green',
  Contactado: 'border-blue-200 bg-blue-50 text-blue-700',
  'Cotización enviada': 'border-purple-200 bg-purple-50 text-purple-700',
  'En seguimiento': 'border-amber-200 bg-amber-50 text-amber-700',
  Cerrado: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Perdido: 'border-red-200 bg-red-50 text-red-700',
  Completo: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Mejorar: 'border-amber-200 bg-amber-50 text-amber-700',
  'Falta description': 'border-orange-200 bg-orange-50 text-orange-700',
  Noindex: 'border-red-200 bg-red-50 text-red-700',
  Pendiente: 'border-amber-200 bg-amber-50 text-amber-700',
  Inactivo: 'border-stone-200 bg-stone-100 text-stone-600',
};

export function AdminBadge({ status }: { status: AdminStatus | string }) {
  const style =
    badgeStyles[status as AdminStatus] ?? 'border-pietra-border bg-white text-pietra-muted';

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}
