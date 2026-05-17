import { getAdminAccessToken, requireAdminUser } from '@/lib/supabase/auth';
import { supabaseFetch } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

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

function sinceHours(hours: number) {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function sinceDays(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

async function fetchEvents(accessToken: string, since: string, limit = 3000) {
  const sinceParam = encodeURIComponent(since);

  return supabaseFetch<AnalyticsEvent[]>(
    `/analytics_events?select=event_type,page_path,page_title,element_label,element_href,device_type,referrer,visitor_id,session_id,created_at&created_at=gte.${sinceParam}&order=created_at.desc&limit=${limit}`,
    { accessToken },
  );
}

export async function getAnalyticsDashboard() {
  await requireAdminUser();

  if (!isSupabaseConfigured) {
    return {
      pageViews24h: 0,
      uniqueVisitors24h: 0,
      whatsappClicks24h: 0,
      conversionRate24h: 0,
      pageViews7d: 0,
      whatsappClicks7d: 0,
      mainDevice: 'Sin datos',
      mainReferrer: 'Sin datos',
      topPages: [] as TopItem[],
      topWhatsappButtons: [] as TopItem[],
      devices: [] as TopItem[],
      referrers: [] as TopItem[],
      recentEvents: [] as AnalyticsEvent[],
    };
  }

  const accessToken = await getAdminAccessToken();

  if (!accessToken) {
    return {
      pageViews24h: 0,
      uniqueVisitors24h: 0,
      whatsappClicks24h: 0,
      conversionRate24h: 0,
      pageViews7d: 0,
      whatsappClicks7d: 0,
      mainDevice: 'Sin sesión',
      mainReferrer: 'Sin sesión',
      topPages: [] as TopItem[],
      topWhatsappButtons: [] as TopItem[],
      devices: [] as TopItem[],
      referrers: [] as TopItem[],
      recentEvents: [] as AnalyticsEvent[],
    };
  }

  const [events24h, events7d] = await Promise.all([
    fetchEvents(accessToken, sinceHours(24), 2000),
    fetchEvents(accessToken, sinceDays(7), 5000),
  ]);

  const pageViews24h = events24h.filter((event) => event.event_type === 'page_view');
  const whatsappClicks24h = events24h.filter((event) => event.event_type === 'whatsapp_click');

  const pageViews7d = events7d.filter((event) => event.event_type === 'page_view');
  const whatsappClicks7d = events7d.filter((event) => event.event_type === 'whatsapp_click');

  const uniqueVisitors24h = new Set(
    events24h.map((event) => event.visitor_id).filter(Boolean),
  ).size;

  const devices = countBy(events24h, (event) => event.device_type);
  const referrers = countBy(events24h, (event) => event.referrer);
  const topPages = countBy(pageViews24h, (event) => event.page_path).slice(0, 7);
  const topWhatsappButtons = countBy(
    whatsappClicks24h,
    (event) => event.element_label || event.page_path,
  ).slice(0, 7);

  return {
    pageViews24h: pageViews24h.length,
    uniqueVisitors24h,
    whatsappClicks24h: whatsappClicks24h.length,
    conversionRate24h: percentage(whatsappClicks24h.length, uniqueVisitors24h),
    pageViews7d: pageViews7d.length,
    whatsappClicks7d: whatsappClicks7d.length,
    mainDevice: devices[0]?.label ?? 'Sin datos',
    mainReferrer: referrers[0]?.label ?? 'Sin datos',
    topPages,
    topWhatsappButtons,
    devices,
    referrers,
    recentEvents: events24h.slice(0, 12),
  };
}

export function formatAnalyticsTime(value: string) {
  return new Date(value).toLocaleTimeString('es-PY', {
    timeZone: 'America/Asuncion',
    hour: '2-digit',
    minute: '2-digit',
  });
}
