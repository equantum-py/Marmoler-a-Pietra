import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin';
import { AnalyticsLiveRefresh } from '@/components/admin/analytics-live-refresh';
import {
  analyticsRangeOptions,
  formatAnalyticsTime,
  getAnalyticsDashboard,
  type AnalyticsRange,
} from '@/lib/analytics/admin-analytics';

function normalizeRange(value?: string): AnalyticsRange {
  if (value === 'yesterday' || value === '7d' || value === '30d') {
    return value;
  }

  return '24h';
}

function MetricCard({
  label,
  value,
  description,
  badge,
  tone = 'light',
}: {
  label: string;
  value: string | number;
  description: string;
  badge?: string;
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';

  return (
    <article
      className={[
        'relative overflow-hidden rounded-[1.75rem] border p-6 shadow-card',
        isDark
          ? 'border-pietra-green bg-pietra-green text-white'
          : 'border-pietra-border bg-white text-pietra-ink',
      ].join(' ')}
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className={isDark ? 'text-sm text-white/75' : 'text-sm text-pietra-muted'}>
            {label}
          </p>

          <p className="mt-4 font-display text-5xl font-semibold">
            {value}
          </p>
        </div>

        {badge ? (
          <span
            className={[
              'rounded-full px-3 py-1 text-xs font-bold',
              isDark ? 'bg-white/15 text-white' : 'bg-pietra-cream text-pietra-green',
            ].join(' ')}
          >
            {badge}
          </span>
        ) : null}
      </div>

      <p className={isDark ? 'relative mt-4 text-sm leading-6 text-white/75' : 'relative mt-4 text-sm leading-6 text-pietra-muted'}>
        {description}
      </p>
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
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <section className="rounded-[1.75rem] border border-pietra-border bg-white p-6 shadow-card">
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
              className="rounded-2xl border border-pietra-border bg-pietra-cream p-4"
            >
              <div className="flex items-center justify-between gap-4">
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

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-pietra-green"
                  style={{ width: `${Math.max((item.value / max) * 100, 8)}%` }}
                />
              </div>
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

function HourlyActivity({
  items,
}: {
  items: { label: string; pageViews: number; whatsappClicks: number; total: number }[];
}) {
  const max = Math.max(...items.map((item) => item.total), 1);

  return (
    <section className="rounded-[1.75rem] border border-pietra-border bg-white p-6 shadow-card">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-pietra-brown">
        Ritmo del día
      </p>

      <h2 className="mt-2 font-display text-3xl font-semibold text-pietra-ink">
        Actividad por hora
      </h2>

      <div className="mt-6 flex h-56 items-end gap-2">
        {items.length ? (
          items.map((item) => (
            <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-40 w-full items-end rounded-full bg-pietra-cream p-1">
                <div
                  className="w-full rounded-full bg-pietra-green"
                  style={{ height: `${Math.max((item.total / max) * 100, 8)}%` }}
                  title={`${item.total} eventos`}
                />
              </div>

              <span className="text-[10px] font-bold text-pietra-muted">
                {item.label}
              </span>
            </div>
          ))
        ) : (
          <p className="w-full rounded-2xl border border-pietra-border bg-pietra-cream p-4 text-sm text-pietra-muted">
            Todavía no hay datos por hora.
          </p>
        )}
      </div>
    </section>
  );
}

function eventLabel(eventType: string) {
  if (eventType === 'page_view') return 'Usuario ingresó';
  if (eventType === 'whatsapp_click') return 'Click a WhatsApp';
  if (eventType === 'material_view') return 'Material visto';

  return eventType;
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ range?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const selectedRange = normalizeRange(resolvedSearchParams.range);
  const analytics = await getAnalyticsDashboard(selectedRange);

  return (
    <>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <AdminPageHeader
          eyebrow="Comportamiento web"
          title="Dashboard comercial"
          description="Medición real de visitas, usuarios, clicks a WhatsApp, páginas más vistas, fuentes de tráfico y comportamiento de navegación."
        />

        <div className="xl:pt-6">
          <AnalyticsLiveRefresh seconds={10} />
        </div>
      </div>

      <section className="rounded-[1.75rem] border border-pietra-border bg-white p-4 shadow-card">
        <div className="flex flex-wrap gap-3">
          {analyticsRangeOptions.map((option) => {
            const active = option.value === selectedRange;

            return (
              <Link
                key={option.value}
                href={`/admin?range=${option.value}`}
                className={[
                  'rounded-2xl border px-5 py-3 transition',
                  active
                    ? 'border-pietra-green bg-pietra-green text-white'
                    : 'border-pietra-border bg-pietra-cream text-pietra-muted hover:border-pietra-green hover:text-pietra-green',
                ].join(' ')}
              >
                <span className="block text-sm font-bold">{option.label}</span>
                <span className={active ? 'block text-xs text-white/75' : 'block text-xs text-pietra-muted'}>
                  {option.description}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label={`Visitas · ${analytics.rangeLabel}`}
          value={analytics.pageViews}
          description="Páginas vistas registradas por el tracker."
          badge="Real"
          tone="dark"
        />

        <MetricCard
          label="Visitantes únicos"
          value={analytics.uniqueVisitors}
          description="Estimación por navegador/dispositivo usando visitor_id anónimo."
          badge="Usuarios"
        />

        <MetricCard
          label="Clicks a WhatsApp"
          value={analytics.whatsappClicks}
          description="Total de clicks reales en botones o enlaces que llevan a WhatsApp."
          badge="Clicks"
        />

        <MetricCard
          label="Conversión WhatsApp"
          value={`${analytics.conversionRate}%`}
          description="Visitantes únicos que hicieron al menos un click a WhatsApp."
          badge={analytics.rangeLabel}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Dispositivo principal"
          value={analytics.mainDevice}
          description="Tipo de pantalla más frecuente en el período."
          badge="Device"
        />

        <MetricCard
          label="Fuente principal"
          value={analytics.mainReferrer}
          description="Origen más frecuente del tráfico registrado."
          badge="Origen"
        />

        <MetricCard
          label="Páginas top"
          value={analytics.topPages.length}
          description="URLs con mayor interés del usuario."
          badge="Interés"
        />

        <MetricCard
          label="Botones top"
          value={analytics.topWhatsappButtons.length}
          description="CTAs que más empujan conversación comercial."
          badge="CTA"
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

      <section className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <HourlyActivity items={analytics.hourlyActivity} />

        <section className="rounded-[1.75rem] border border-pietra-border bg-pietra-green p-6 text-white shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
            En vivo
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

      <section className="grid gap-6 xl:grid-cols-2">
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
      </section>
    </>
  );
}
