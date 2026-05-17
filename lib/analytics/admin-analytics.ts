import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export type AnalyticsRange = '24h' | 'yesterday' | '7d' | '30d';

type AnalyticsEvent = {
  event_type: string;
  page_path: string;
  page_title?: string | null;
  element_label?: string | null;
  element_href?: string | null;
  device_type?: string | null;
  referrer?: string | null;
  visitor_id?: string | null;
  session_id?: string | null;
  created_at: string;
};

type TopItem = {
  label: string;
  value: number;
};

type HourItem = {
  label: string;
  pageViews: number;
  whatsappClicks: number;
  total: number;
};

export const analyticsRangeOptions: { value: AnalyticsRange; label: string; description: string }[] = [
  { value: '24h', label: 'Últimas 24h', description: 'Actividad reciente' },
  { value: 'yesterday', label: 'Ayer', description: 'Comparación diaria' },
  { value: '7d', label: '7 días', description: 'Tendencia semanal' },
  { value: '30d', label: '30 días', description: 'Visión mensual' },
];

function emptyDashboard(range: AnalyticsRange) {
  const rangeOption = analyticsRangeOptions.find((item) => item.value === range) ?? analyticsRangeOptions[0];

  return {
    selectedRange: range,
    rangeLabel: rangeOption.label,
    pageViews: 0,
    uniqueVisitors: 0,
    whatsappClicks: 0,
    whatsappVisitors: 0,
    conversionRate: 0,
    mainDevice: 'Sin datos',
    mainReferrer: 'Sin datos',
    topPages: [] as TopItem[],
    topWhatsappButtons: [] as TopItem[],
    devices: [] as TopItem[],
    referrers: [] as TopItem[],
    hourlyActivity: [] as HourItem[],
    recentEvents: [] as AnalyticsEvent[],
  };
}

function countBy<T extends string | null | undefined>(
  events: AnalyticsEvent[],
  getKey: (event: AnalyticsEvent) => T,
) {
  const map = new Map<string, number>();

  for (const event of events) {
    const key = getKey(event) || 'Sin dato';
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  return [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function percentage(value: number, total: number) {
  if (!total) return 0;

  return Math.round((value / total) * 1000) / 10;
}

function getRangeBounds(range: AnalyticsRange) {
  const now = Date.now();
  const hour = 60 * 60 * 1000;
  const day = 24 * hour;

  if (range === 'yesterday') {
    return {
      since: new Date(now - 48 * hour).toISOString(),
      until: new Date(now - 24 * hour).toISOString(),
    };
  }

  if (range === '7d') {
    return {
      since: new Date(now - 7 * day).toISOString(),
      until: new Date(now).toISOString(),
    };
  }

  if (range === '30d') {
    return {
      since: new Date(now - 30 * day).toISOString(),
      until: new Date(now).toISOString(),
    };
  }

  return {
    since: new Date(now - 24 * hour).toISOString(),
    until: new Date(now).toISOString(),
  };
}

async function fetchEvents(accessToken: string, range: AnalyticsRange, limit = 5000) {
  const { since, until } = getRangeBounds(range);

  const filters = [
    `created_at=gte.${encodeURIComponent(since)}`,
    `created_at=lte.${encodeURIComponent(until)}`,
  ];

  return supabaseFetch<AnalyticsEvent[]>(
    `/analytics_events?select=event_type,page_path,page_title,element_label,element_href,device_type,referrer,visitor_id,session_id,created_at&${filters.join('&')}&order=created_at.desc&limit=${limit}`,
    { accessToken },
  );
}

function getHourlyActivity(events: AnalyticsEvent[]) {
  const map = new Map<string, HourItem>();

  for (const event of events) {
    const label = new Date(event.created_at).toLocaleTimeString('es-PY', {
      timeZone: 'America/Asuncion',
      hour: '2-digit',
      minute: '2-digit',
    });

    const hourLabel = label.slice(0, 2) + ':00';

    const current = map.get(hourLabel) ?? {
      label: hourLabel,
      pageViews: 0,
      whatsappClicks: 0,
      total: 0,
    };

    if (event.event_type === 'page_view') {
      current.pageViews += 1;
    }

    if (event.event_type === 'whatsapp_click') {
      current.whatsappClicks += 1;
    }

    current.total += 1;

    map.set(hourLabel, current);
  }

  return [...map.values()]
    .sort((a, b) => a.label.localeCompare(b.label))
    .slice(-12);
}

export async function getAnalyticsDashboard(range: AnalyticsRange = '24h') {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    return emptyDashboard(range);
  }

  const accessToken = await getAdminAccessToken();

  if (!accessToken) {
    return emptyDashboard(range);
  }

  const events = await fetchEvents(accessToken, range);

  const pageViews = events.filter((event) => event.event_type === 'page_view');
  const whatsappClicks = events.filter((event) => event.event_type === 'whatsapp_click');

  const uniqueVisitors = new Set(
    events.map((event) => event.visitor_id).filter(Boolean),
  ).size;

  const whatsappVisitors = new Set(
    whatsappClicks.map((event) => event.visitor_id).filter(Boolean),
  ).size;

  const devices = countBy(events, (event) => event.device_type);
  const referrers = countBy(events, (event) => event.referrer);
  const topPages = countBy(pageViews, (event) => event.page_path).slice(0, 7);
  const topWhatsappButtons = countBy(
    whatsappClicks,
    (event) => event.element_label || event.page_path,
  ).slice(0, 7);

  const rangeOption = analyticsRangeOptions.find((item) => item.value === range) ?? analyticsRangeOptions[0];

  return {
    selectedRange: range,
    rangeLabel: rangeOption.label,
    pageViews: pageViews.length,
    uniqueVisitors,
    whatsappClicks: whatsappClicks.length,
    whatsappVisitors,
    conversionRate: percentage(whatsappVisitors, uniqueVisitors),
    mainDevice: devices[0]?.label ?? 'Sin datos',
    mainReferrer: referrers[0]?.label ?? 'Sin datos',
    topPages,
    topWhatsappButtons,
    devices,
    referrers,
    hourlyActivity: getHourlyActivity(events),
    recentEvents: events.slice(0, 14),
  };
}

export function formatAnalyticsTime(value: string) {
  return new Date(value).toLocaleTimeString('es-PY', {
    timeZone: 'America/Asuncion',
    hour: '2-digit',
    minute: '2-digit',
  });
}
