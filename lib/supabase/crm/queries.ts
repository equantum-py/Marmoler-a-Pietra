import { createClient } from '@supabase/supabase-js';
import { AnalyticsEvent } from '@/types/crm';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

/**
 * STEP 5: CRM Query Functions
 * Objetivo: Lectura de métricas para dashboard temporal
 * NO construir: analytics avanzados, conversiones, top pages/contexts, scoring
 * Solo: total_visitors, total_pageviews, total_whatsapp_clicks, recent_events
 */

export interface CRMMetrics {
    total_visitors: number;
    total_pageviews: number;
    total_whatsapp_clicks: number;
    recent_events: AnalyticsEvent[];
}

/**
 * getTotalVisitors
 * Cuenta visitantes únicos por session_id
 */
export async function getTotalVisitors(): Promise<number> {
    try {
          const { data, error } = await supabase
            .from('analytics_events')
            .select('visitor_id', { count: 'exact', head: true })
            .eq('event_type', 'page_view')
            .returns<Array<{ visitor_id: string }>>();

      if (error) {
              console.error('Error getTotalVisitors:', error);
              return 0;
      }

      if (!data) return 0;

      const uniqueVisitors = new Set(data.map(row => row.visitor_id));
          return uniqueVisitors.size;
    } catch (err) {
          console.error('Exception getTotalVisitors:', err);
          return 0;
    }
}

/**
 * getTotalPageviews
 * Cuenta total de eventos page_view
 */
export async function getTotalPageviews(): Promise<number> {
    try {
          const { count, error } = await supabase
            .from('analytics_events')
            .select('*', { count: 'exact', head: true })
            .eq('event_type', 'page_view');

      if (error) {
              console.error('Error getTotalPageviews:', error);
              return 0;
      }

      return count || 0;
    } catch (err) {
          console.error('Exception getTotalPageviews:', err);
          return 0;
    }
}

/**
 * getTotalWhatsappClicks
 * Cuenta total de eventos whatsapp_click
 */
export async function getTotalWhatsappClicks(): Promise<number> {
    try {
          const { count, error } = await supabase
            .from('analytics_events')
            .select('*', { count: 'exact', head: true })
            .eq('event_type', 'whatsapp_click');

      if (error) {
              console.error('Error getTotalWhatsappClicks:', error);
              return 0;
      }

      return count || 0;
    } catch (err) {
          console.error('Exception getTotalWhatsappClicks:', err);
          return 0;
    }
}

/**
 * getRecentEvents
 * Últimos 50 eventos en orden descendente
 */
export async function getRecentEvents(limit: number = 50): Promise<AnalyticsEvent[]> {
    try {
          const { data, error } = await supabase
            .from('analytics_events')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit)
            .returns<AnalyticsEvent[]>();

      if (error) {
              console.error('Error getRecentEvents:', error);
              return [];
      }

      return data || [];
    } catch (err) {
          console.error('Exception getRecentEvents:', err);
          return [];
    }
}

/**
 * getCRMMetrics
 * Obtiene todas las métricas en una sola llamada
 */
export async function getCRMMetrics(): Promise<CRMMetrics> {
    const [total_visitors, total_pageviews, total_whatsapp_clicks, recent_events] = await Promise.all([
          getTotalVisitors(),
          getTotalPageviews(),
          getTotalWhatsappClicks(),
          getRecentEvents(50),
        ]);

  return {
        total_visitors,
        total_pageviews,
        total_whatsapp_clicks,
        recent_events,
  };
}
