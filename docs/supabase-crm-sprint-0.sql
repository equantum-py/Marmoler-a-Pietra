-- Marmolería Pietra CRM - Sprint 0
-- Minimal schema: customers, page_views, whatsapp_clicks
-- Run this SQL in the Supabase SQL editor.

create extension if not exists "pgcrypto";

-- ============================================================================
-- TABLE: customers
-- ============================================================================
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null unique,
  session_id text,
  device_type text,
  referrer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customers_visitor_id_idx on public.customers(visitor_id);
create index if not exists customers_created_at_idx on public.customers(created_at desc);

-- ============================================================================
-- TABLE: page_views
-- ============================================================================
create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  page_path text not null,
  page_title text,
  device_type text,
  referrer text,
  created_at timestamptz not null default now()
);

create index if not exists page_views_customer_id_idx on public.page_views(customer_id);
create index if not exists page_views_created_at_idx on public.page_views(created_at desc);

-- ============================================================================
-- TABLE: whatsapp_clicks
-- ============================================================================
create table if not exists public.whatsapp_clicks (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  page text not null,
  context text not null,
  element_label text,
  element_href text,
  device_type text,
  created_at timestamptz not null default now()
);

create index if not exists whatsapp_clicks_customer_id_idx on public.whatsapp_clicks(customer_id);
create index if not exists whatsapp_clicks_created_at_idx on public.whatsapp_clicks(created_at desc);

-- ============================================================================
-- RLS: Enable and configure
-- ============================================================================
alter table public.customers enable row level security;
alter table public.page_views enable row level security;
alter table public.whatsapp_clicks enable row level security;

-- Admin read access
drop policy if exists "Admins read customers" on public.customers;
create policy "Admins read customers"
on public.customers
for select
to authenticated
using (true);

drop policy if exists "Admins read page_views" on public.page_views;
create policy "Admins read page_views"
on public.page_views
for select
to authenticated
using (true);

drop policy if exists "Admins read whatsapp_clicks" on public.whatsapp_clicks;
create policy "Admins read whatsapp_clicks"
on public.whatsapp_clicks
for select
to authenticated
using (true);

-- Service role write access (via API route only)
drop policy if exists "Service role writes customers" on public.customers;
create policy "Service role writes customers"
on public.customers
for insert
to service_role
using (true);

drop policy if exists "Service role writes page_views" on public.page_views;
create policy "Service role writes page_views"
on public.page_views
for insert
to service_role
using (true);

drop policy if exists "Service role writes whatsapp_clicks" on public.whatsapp_clicks;
create policy "Service role writes whatsapp_clicks"
on public.whatsapp_clicks
for insert
to service_role
using (true);

-- ============================================================================
-- TRIGGER: Update customers.updated_at
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists customers_set_updated_at on public.customers;
create trigger customers_set_updated_at
before update on public.customers
for each row
execute function public.set_updated_at();

-- ============================================================================
-- FUNCTION: Get or create customer (called by API route)
-- ============================================================================
create or replace function public.get_or_create_customer(
  p_visitor_id text,
  p_session_id text default null,
  p_device_type text default null,
  p_referrer text default null
)
returns table(id uuid)
language plpgsql
as $$
declare
  v_customer_id uuid;
begin
  -- Try to update existing customer
  update public.customers
  set
    session_id = coalesce(p_session_id, session_id),
    device_type = coalesce(p_device_type, device_type),
    referrer = coalesce(p_referrer, referrer),
    updated_at = now()
  where visitor_id = p_visitor_id
  returning customers.id into v_customer_id;

  -- If not found, insert new customer
  if v_customer_id is null then
    insert into public.customers (visitor_id, session_id, device_type, referrer)
    values (p_visitor_id, p_session_id, p_device_type, p_referrer)
    returning customers.id into v_customer_id;
  end if;

  return query select v_customer_id;
end;
$$;

-- ============================================================================
-- FUNCTION: Get recent events (for dashboard)
-- ============================================================================
create or replace function public.get_recent_events(p_limit int default 50)
returns table(
  id uuid,
  type text,
  page_path text,
  page text,
  context text,
  timestamp timestamptz
)
language plpgsql
as $$
begin
  return query
  with page_events as (
    select
      pv.id,
      'page_view'::text as type,
      pv.page_path,
      null::text as page,
      null::text as context,
      pv.created_at as timestamp
    from public.page_views pv
  ),
  whatsapp_events as (
    select
      wc.id,
      'whatsapp_click'::text as type,
      wc.page as page_path,
      wc.page,
      wc.context,
      wc.created_at as timestamp
    from public.whatsapp_clicks wc
  )
  select * from page_events
  union all
  select * from whatsapp_events
  order by timestamp desc
  limit p_limit;
end;
$$;
