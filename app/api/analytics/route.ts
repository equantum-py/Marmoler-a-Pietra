import { NextRequest, NextResponse } from 'next/server';
import { supabaseAnonKey, supabaseRestUrl } from '@/lib/supabase/config';

const allowedEvents = new Set([
  'page_view',
  'whatsapp_click',
  'material_view',
]);

function cleanText(value: unknown, fallback = '') {
  if (typeof value !== 'string') return fallback;
  return value.trim().slice(0, 500);
}

function cleanJson(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  if (!supabaseRestUrl || !supabaseAnonKey) {
    return NextResponse.json({ ok: false, error: 'Supabase not configured' }, { status: 200 });
  }

  try {
    const body = await request.json();

    const eventType = cleanText(body.event_type);

    if (!allowedEvents.has(eventType)) {
      return NextResponse.json({ ok: false, error: 'Invalid event type' }, { status: 400 });
    }

    const payload = {
      event_type: eventType,
      page_path: cleanText(body.page_path, '/'),
      page_title: cleanText(body.page_title),
      element_label: cleanText(body.element_label),
      element_href: cleanText(body.element_href),
      device_type: cleanText(body.device_type, 'unknown'),
      referrer: cleanText(body.referrer),
      visitor_id: cleanText(body.visitor_id),
      session_id: cleanText(body.session_id),
      metadata: cleanJson(body.metadata),
    };

    const response = await fetch(`${supabaseRestUrl}/analytics_events`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!response.ok) {
      const message = await response.text();

      return NextResponse.json(
        { ok: false, error: message || 'Supabase insert failed' },
        { status: 200 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
