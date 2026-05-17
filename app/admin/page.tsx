import { AdminPageHeader } from '@/components/admin';
import { formatAnalyticsTime, getAnalyticsDashboard } from '@/lib/analytics/admin-analytics';

function MetricCard({
  label,
  value,
  description,
  badge,
}: {
  label: string;
  value: string | number;
  description: string;
  badge?: string;
}) {
  return (
    <article className="rounded-[1.5rem] border border-pietra-border bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-pietra-muted">{label}</p>
          <p className="mt-4 font-display text-4xl font-semibold text-pietra-ink">
            {value}
          </p>
        </div>

        {badge ? (
          <span className="rounded-full bg-pietra-cream px-3 py-1 text-xs font-bold text-pietra-green">
            {badge}
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm text-pietra-muted">{description}</p>
    </article>
  );
}

function RankingList({
  title,
  eyebrow,
  items,
  empty,
}: {
  title: string;
  eyebrow: string;
  items: { label: string; value: number }[];
  empty: string;
}) {
  return (
    <section className="rounded-[1.5rem] border border-pietra-border bg-white p-6 shadow-card">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-pietra-brown">
        {eyebrow}
      </p>

      <h2 className="mt-2 font-display text-3xl font-semibold text-pietra-ink">
        {title}
      </h2>

      <div className="mt-6 space-y-3">
        {items.length ? (
          items.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-pietra-border bg-pietra-cream px-4 py-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pietra-green text-xs font-bold text-white">
                  {index + 1}
                </span>

                <p className="truncate text-sm font-semibold text-pietra-ink">
                  {item.label}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold text-pietra-green">
                {item.value}
              </span>
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-pietra-border bg-pietra-cream p-4 text-sm text-pietra-muted">
            {empty}
          </p>
        )}
      </div>
    </section>
  );
}

function eventLabel(eventType: string) {
  if (eventType === 'page_view') return 'Visita';
  if (eventType === 'whatsapp_click') return 'Click WhatsApp';
  if (eventType === 'material_view') return 'Material';

  return eventType;
}

export default async function AdminDashboardPage() {
  const analytics = await getAnalyticsDashboard();

  return (
    <>
      <AdminPageHeader
        eyebrow="Comportamiento web"
        title="Dashboard comercial"
        description="Medición real de visitas, usuarios, clicks a WhatsApp, páginas más vistas, fuentes de tráfico y comportamiento de navegación."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          label="Visitas últimas 24h"
          value={analytics.pageViews24h}
          description="Cantidad de páginas vistas en las últimas 24 horas."
          badge="Real"
        />

        <MetricCard
          label="Visitantes únicos"
          value={analytics.uniqueVisitors24h}
          description="Estimación por navegador/dispositivo usando visitor_id anónimo."
          badge="24h"
        />

        <MetricCard
          label="Clicks a WhatsApp"
          value={analytics.whatsappClicks24h}
          description="Clicks reales en botones o enlaces que llevan a WhatsApp."
          badge="Conversión"
        />

        <MetricCard
          label="Conversión WhatsApp"
          value={`${analytics.conversionRate24h}%`}
          description="Clicks a WhatsApp dividido por visitantes únicos."
          badge="24h"
        />

        <MetricCard
          label="Visitas últimos 7 días"
          value={analytics.pageViews7d}
          description="Volumen general de navegación acumulado."
          badge="7 días"
        />

        <MetricCard
          label="Dispositivo principal"
          value={analytics.mainDevice}
          description={`Fuente principal detectada: ${analytics.mainReferrer}.`}
          badge="Tráfico"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <RankingList
          eyebrow="Interés del usuario"
          title="Páginas más vistas"
          items={analytics.topPages}
          empty="Todavía no hay visitas registradas."
        />

        <RankingList
          eyebrow="Conversión"
          title="Botones WhatsApp más usados"
          items={analytics.topWhatsappButtons}
          empty="Todavía no hay clicks a WhatsApp registrados."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[.8fr_.8fr_1.1fr]">
        <RankingList
          eyebrow="Dispositivos"
          title="Tráfico por dispositivo"
          items={analytics.devices}
          empty="Sin datos de dispositivos todavía."
        />

        <RankingList
          eyebrow="Fuentes"
          title="Origen del tráfico"
          items={analytics.referrers}
          empty="Sin datos de origen todavía."
        />

        <section className="rounded-[1.5rem] border border-pietra-border bg-pietra-green p-6 text-white shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
            Tiempo real
          </p>

          <h2 className="mt-2 font-display text-3xl font-semibold">
            Actividad reciente
          </h2>

          <ol className="mt-6 space-y-4">
            {analytics.recentEvents.length ? (
              analytics.recentEvents.map((event, index) => (
                <li key={`${event.created_at}-${index}`} className="flex gap-3 text-sm leading-6 text-white/85">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold">
                    {index + 1}
                  </span>

                  <div className="min-w-0">
                    <p className="font-semibold text-white">
                      {eventLabel(event.event_type)}
                      <span className="ml-2 text-xs font-normal text-white/60">
                        {formatAnalyticsTime(event.created_at)}
                      </span>
                    </p>

                    <p className="truncate text-white/75">
                      {event.element_label || event.page_path}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="rounded-2xl bg-white/10 p-4 text-sm text-white/75">
                Todavía no hay actividad registrada. Entrá a la web pública y probá hacer click en WhatsApp.
              </li>
            )}
          </ol>
        </section>
      </section>
    </>
  );
}
