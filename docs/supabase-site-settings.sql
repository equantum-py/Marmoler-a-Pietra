-- Marmolería Pietra - Site Settings
-- Run this SQL in the Supabase SQL editor before enabling /admin/configuracion in production.

create extension if not exists "pgcrypto";

create table if not exists public.site_settings (
  id text primary key default 'pietra',
  whatsapp_number text not null default '595984756158',
  phone text,
  email text not null default 'info@marmoleriapietra.com.py',
  instagram_url text,
  facebook_url text,
  address text,
  business_hours text,
  logo_url text,
  logo_desktop text,
  logo_mobile text,
  favicon_url text,
  seo_title text not null default 'Marmolería Pietra | Mármol, Granito y Cuarzo Premium en Paraguay',
  seo_description text not null default 'Diseño, fabricación e instalación premium de mesadas de granito, mármol, cuarzo, revestimientos y piedra traslúcida en Paraguay.',
  main_cta_text text,
  main_cta_url text,
  footer_text text,
  institutional_text text,
  company_name text not null default 'Marmolería Pietra',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

alter table public.site_settings enable row level security;

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
using (id = 'pietra');

drop policy if exists "Authenticated admins can manage site settings" on public.site_settings;
create policy "Authenticated admins can manage site settings"
on public.site_settings
for all
to authenticated
using (id = 'pietra')
with check (id = 'pietra');

insert into public.site_settings (
  id,
  whatsapp_number,
  phone,
  email,
  instagram_url,
  facebook_url,
  address,
  business_hours,
  logo_url,
  logo_desktop,
  logo_mobile,
  favicon_url,
  seo_title,
  seo_description,
  main_cta_text,
  main_cta_url,
  footer_text,
  institutional_text,
  company_name
)
values (
  'pietra',
  '595984756158',
  '+595 984 756 158',
  'info@marmoleriapietra.com.py',
  'https://www.instagram.com/marmoleria_pietra',
  null,
  'Asunción, Paraguay',
  'Lunes a viernes de 08:00 a 18:00. Sábados con cita previa.',
  '/logo-pietra.svg',
  '/logo-pietra.svg',
  '/logo-pietra.svg',
  '/favicon.ico',
  'Marmolería Pietra | Mármol, Granito y Cuarzo Premium en Paraguay',
  'Diseño, fabricación e instalación premium de mesadas de granito, mármol, cuarzo, revestimientos y piedra traslúcida en Paraguay.',
  'Cotizar por WhatsApp',
  '/#contacto',
  'Especialistas en mármol, granito, cuarzo y piedras sinterizadas. Diseñamos, fabricamos e instalamos superficies premium en todo Paraguay.',
  'Marmolería Pietra diseña, fabrica e instala superficies premium a medida para proyectos residenciales y comerciales.',
  'Marmolería Pietra'
)
on conflict (id) do nothing;
