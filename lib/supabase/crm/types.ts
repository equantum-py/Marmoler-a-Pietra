// CRM Sprint 0 - Type definitions (minimal scope)

export type Customer = {
  id: string;
  visitor_id: string;
  session_id: string | null;
  device_type: string | null;
  referrer: string | null;
  created_at: string;
  updated_at: string;
};

export type PageView = {
  id: string;
  customer_id: string;
  page_path: string;
  page_title: string | null;
  device_type: string | null;
  referrer: string | null;
  created_at: string;
};

export type WhatsappClick = {
  id: string;
  customer_id: string;
  page: string;
  context: string;
  element_label: string | null;
  element_href: string | null;
  device_type: string | null;
  created_at: string;
};

// Event sent from tracker to API route
export type CRMEvent = {
  event_type: 'page_view' | 'whatsapp_click';
  page_path: string;
  page_title?: string;
  page?: string;
  context?: string;
  element_label?: string;
  element_href?: string;
  device_type?: string;
  referrer?: string;
  visitor_id?: string;
  session_id?: string;
};

// Dashboard metrics (minimal)
export type DashboardMetrics = {
  total_visitors: number;
  total_page_views: number;
  total_whatsapp_clicks: number;
  recent_events: Array<{
    id: string;
    type: 'page_view' | 'whatsapp_click';
    page_path: string;
    page?: string;
    context?: string;
    timestamp: string;
  }>;
};
