import { createClient } from '@supabase/supabase-js';
import { Customer, PageView, WhatsappClick } from '@/types/crm';

const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

/**
 * STEP 5: CRM Query Functions
 * Objetivo: Lectura de métricas para dashboard temporal
 * Lee directamente de: customers, page_views, whatsapp_clicks
 * NO construir: analytics avanzados, conversiones, top pages/contexts, scoring
 * Solo: total_visitors, total_pageviews, total_whatsapp_clicks, recent_events
 */

export interface CRMMetrics {
      total_visitors: number;
      total_pageviews: number;
      total_whatsapp_clicks: number;
      recent_events: Array<{
        id: string;
        type: 'page_view' | 'whatsapp_click';
        page_path?: string;
        page?: string;
        context?: string;
        timestamp: string;
      }>;
}

/**
 * getTotalVisitors
 * Cuenta visitantes únicos (distinct customer_id) en customers table
 */
export async function getTotalVisitors(): Promise<number> {
      try {
              const { data, error } = await supabase
                .from('customers')
                .select('id', { count: 'exact', head: true });

        if (error) {
                  console.error('Error getTotalVisitors:', error);
                  return 0;
        }

        return (data?.length || 0);
      } catch (err) {
              console.error('Exception getTotalVisitors:', err);
              return 0;
      }
}

/**
 * getTotalPageviews
 * Cuenta total de registros en page_views
 */
export async function getTotalPageviews(): Promise<number> {
      try {
              const { count, error } = await supabase
                .from('page_views')
                .select('*', { count: 'exact', head: true });

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
 * Cuenta total de registros en whatsapp_clicks
 */
export async function getTotalWhatsappClicks(): Promise<number> {
      try {
              const { count, error } = await supabase
                .from('whatsapp_clicks')
                .select('*', { count: 'exact', head: true });

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
 * Combina últimos eventos de page_views y whatsapp_clicks
 */
export async function getRecentEvents(limit: number = 50): Promise<Array<{
      id: string;
      type: 'page_view' | 'whatsapp_click';
      page_path?: string;
      page?: string;
      context?: string;
      timestamp: string;
}>> {
      try {
              // Get recent page views
        const { data: pageViewData, error: pvError } = await supabase
                .from('page_views')
                .select('id, page_path, created_at')
                .order('created_at', { ascending: false })
                .limit(Math.ceil(limit / 2))
                .returns<Array<{ id: string; page_path: string; created_at: string }>>();

        // Get recent whatsapp clicks
        const { data: whatsappData, error: wcError } = await supabase
                .from('whatsapp_clicks')
                .select('id, page, context, created_at')
                .order('created_at', { ascending: false })
                .limit(Math.ceil(limit / 2))
                .returns<Array<{ id: string; page: string; context: string; created_at: string }>>();

        if (pvError) console.error('Error fetching page_views:', pvError);
              if (wcError) console.error('Error fetching whatsapp_clicks:', wcError);

        const events = [
                  ...(pageViewData || []).map(pv => ({
                              id: pv.id,
                              type: 'page_view' as const,
                              page_path: pv.page_path,
                              timestamp: pv.created_at,
                  })),
                  ...(whatsappData || []).map(wc => ({
                              id: wc.id,
                              type: 'whatsapp_click' as const,
                              page: wc.page,
                              context: wc.context,
                              timestamp: wc.created_at,
                  })),
                ];

        // Sort by timestamp descending and limit
        return events
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, limit);
      } catch (err) {
              console.error('Exception getRecentEvents:', err);
              return [];
      }
}

/**
 * getCRMMetrics
 * Retorna métricas completas del CRM
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
