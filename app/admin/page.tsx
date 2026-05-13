import { AdminBadge, AdminPageHeader, AdminStatCard } from '@/components/admin';
import { dashboardAlerts, dashboardStats, latestChanges } from '@/data/admin';

export default function AdminDashboardPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Panel Pietra"
        title="Dashboard operativo"
        description="Resumen central de contenidos, oportunidades comerciales, alertas y cambios recientes del showroom digital de Pietra. Esta fase trabaja con datos locales listos para migrar a un CMS con autenticación."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardStats.map((stat) => (
          <AdminStatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-[1.5rem] border border-pietra-border bg-white p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-pietra-brown">
                Alertas
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold">Pendientes de calidad</h2>
            </div>
            <AdminBadge status="Pendiente" />
          </div>
          <div className="mt-6 grid gap-3">
            {dashboardAlerts.map((alert) => (
              <article
                key={alert.title}
                className="flex flex-col gap-3 rounded-2xl border border-pietra-border bg-pietra-cream p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-pietra-ink">{alert.title}</h3>
                  <p className="mt-1 text-sm text-pietra-muted">{alert.description}</p>
                </div>
                <AdminBadge status={alert.status} />
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-pietra-border bg-pietra-green p-6 text-white shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
            Últimos cambios
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Actividad reciente</h2>
          <ol className="mt-6 space-y-4">
            {latestChanges.map((change, index) => (
              <li key={change} className="flex gap-3 text-sm leading-6 text-white/85">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold">
                  {index + 1}
                </span>
                {change}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
