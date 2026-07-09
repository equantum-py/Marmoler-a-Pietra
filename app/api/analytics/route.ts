import { NextRequest, NextResponse } from 'next/server';
import type { CRMEvent } from '@/lib/supabase/crm/types';

export const dynamic = 'force-dynamic';

/**
 * CORRECCIÓN 1: Escritura segura vía Service Role
 * Browser → Next.js API Route → Supabase Service Role → Database
 * 
 * NO usamos NEXT_PUBLIC_SUPABASE_ANON_KEY para escritura.
 * Solo SUPABASE_SERVICE_ROLE_KEY en server (nunca expuesto al cliente).
 */

async function insertCRMEvent(event: CRMEvent) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase service role not configured');
  }

  // Step 1: Get or create customer
  const getOrCreateResponse = await fetch(
    `${supabaseUrl}/rest/v1/rpc/get_or_create_customer`,
    {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p_visitor_id: event.visitor_id,
        p_session_id: event.session_id || null,
        p_device_type: event.device_type || null,
        p_referrer: event.referrer || null,
      }),
    }
  );

  if (!getOrCreateResponse.ok) {
    const error = await getOrCreateResponse.text();
    throw new Error(`Failed to get/create customer: ${error}`);
  }

  const customerData = await getOrCreateResponse.json();
  const customerId = Array.isArray(customerData) ? customerData[0]?.id : customerData?.id;

  if (!customerId) {
    throw new Error('No customer ID returned');
  }

  // Step 2: Insert event based on type
  if (event.event_type === 'page_view') {
    const response = await fetch(`${supabaseUrl}/rest/v1/page_views`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        customer_id: customerId,
        page_path: event.page_path,
        page_title: event.page_title || null,
        device_type: event.device_type || null,
        referrer: event.referrer || null,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to insert page_view: ${error}`);
    }
  } else if (event.event_type === 'whatsapp_click') {
    // CORRECCIÓN 4: Incluir page + context
    const response = await fetch(`${supabaseUrl}/rest/v1/whatsapp_clicks`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        customer_id: customerId,
        page: event.page || event.page_path,
        context: event.context || 'unknown',
        element_label: event.element_label || null,
        element_href: event.element_href || null,
        device_type: event.device_type || null,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to insert whatsapp_click: ${error}`);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const event: CRMEvent = await request.json();

    // Validate required fields
    if (!event.event_type || !event.page_path || !event.visitor_id) {
      return NextResponse.json(
        { error: 'Missing required fields: event_type, page_path, visitor_id' },
        { status: 400 }
      );
    }

    await insertCRMEvent(event);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('CRM Analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
