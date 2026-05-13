-- Marmolería Pietra Admin CMS - Phase 2 Materials module
-- Run this SQL in the Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null check (category in ('Granito', 'Cuarzo', 'Mármol', 'Sinterizado', 'Especial')),
  short_description text not null default '',
  long_description text not null default '',
  color text not null default '',
  finish text not null default '',
  recommended_use text not null default '',
  resistance text not null default '',
  maintenance text not null default '',
  applications text[] not null default '{}',
  benefits text[] not null default '{}',
  main_image text not null default '',
  gallery text[] not null default '{}',
  related_slugs text[] not null default '{}',
  whatsapp_message text not null default '',
  featured boolean not null default false,
  status text not null default 'Borrador' check (status in ('Publicado', 'Borrador', 'Archivado')),
  seo_title text,
  seo_description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists materials_status_idx on public.materials (status);
create index if not exists materials_featured_idx on public.materials (featured);
create index if not exists materials_sort_order_idx on public.materials (sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists materials_set_updated_at on public.materials;
create trigger materials_set_updated_at
before update on public.materials
for each row
execute function public.set_updated_at();

alter table public.materials enable row level security;

-- Public read policy: allows published materials to be read by future public pages.
drop policy if exists "Published materials are readable" on public.materials;
create policy "Published materials are readable"
on public.materials
for select
using (status = 'Publicado');

-- Admin policy: authenticated Supabase users can manage every material.
-- Restrict this further by user email/domain or custom claims if needed.
drop policy if exists "Authenticated admins can manage materials" on public.materials;
create policy "Authenticated admins can manage materials"
on public.materials
for all
to authenticated
using (true)
with check (true);

-- Optional seed adapted from current local catalog. Add more rows as needed.
insert into public.materials (
  slug,
  name,
  category,
  short_description,
  long_description,
  color,
  finish,
  recommended_use,
  resistance,
  maintenance,
  applications,
  benefits,
  main_image,
  gallery,
  related_slugs,
  whatsapp_message,
  featured,
  status,
  seo_title,
  seo_description,
  sort_order
)
values
  (
    'verde-ubatuba',
    'Verde Ubatuba',
    'Granito',
    'Verde Ubatuba para mesadas, revestimientos y proyectos a medida.',
    'Granito de profundidad natural para mesadas sobrias con presencia arquitectónica. Es una superficie pensada para quienes buscan una terminación premium, buena lectura visual y asesoramiento profesional desde la elección del material hasta la instalación final.',
    'Verde oscuro con vetas negras',
    'Pulido',
    'Interior y exterior cubierto',
    'Alta',
    'Bajo',
    array['Cocinas', 'Mesadas', 'Baños', 'Quinchos', 'Revestimientos', 'Piezas especiales'],
    array['Elegancia natural', 'Fácil de combinar', 'Fácil de cuidar', 'Alta resistencia'],
    '/images/catalogo/granito-verde-ubatuba.svg',
    array['/images/catalogo/granito-verde-ubatuba.svg', '/images/showroom/kitchen-hero.svg'],
    array['negro-san-gabriel', 'cafe-imperial', 'gris-corumba', 'neolith-calacatta'],
    'Hola Pietra, quiero cotizar el material Verde Ubatuba. ¿Me pueden asesorar?',
    false,
    'Publicado',
    'Verde Ubatuba | Marmolería Pietra',
    'Granito Verde Ubatuba para mesadas, cocinas, baños y proyectos a medida.',
    10
  ),
  (
    'negro-san-gabriel',
    'Negro San Gabriel',
    'Granito',
    'Negro San Gabriel para mesadas, revestimientos y proyectos a medida.',
    'Granito oscuro de alta elegancia ideal para cocinas contemporáneas y espacios sofisticados. Es una superficie pensada para quienes buscan una terminación premium, buena lectura visual y asesoramiento profesional desde la elección del material hasta la instalación final.',
    'Negro profundo con textura mineral',
    'Pulido',
    'Interior y exterior cubierto',
    'Alta',
    'Bajo',
    array['Cocinas', 'Mesadas', 'Baños', 'Quinchos', 'Revestimientos', 'Piezas especiales'],
    array['Acabado premium', 'Contraste elegante', 'Uso interior y exterior', 'Alta resistencia'],
    '/images/catalogo/granito-negro-san-gabriel.svg',
    array['/images/catalogo/granito-negro-san-gabriel.svg', '/images/showroom/kitchen-hero.svg'],
    array['verde-ubatuba', 'cafe-imperial', 'gris-corumba', 'neolith-calacatta'],
    'Hola Pietra, quiero cotizar el material Negro San Gabriel. ¿Me pueden asesorar?',
    true,
    'Publicado',
    'Negro San Gabriel | Marmolería Pietra',
    'Granito Negro San Gabriel para mesadas premium y proyectos sofisticados.',
    20
  ),
  (
    'neolith-calacatta',
    'Neolith Calacatta',
    'Sinterizado',
    'Neolith Calacatta para mesadas, revestimientos y proyectos a medida.',
    'Piedra sinterizada de inspiración Calacatta para superficies técnicas de estética impecable. Es una superficie pensada para quienes buscan una terminación premium, buena lectura visual y asesoramiento profesional desde la elección del material hasta la instalación final.',
    'Blanco Calacatta con veta gris y dorada',
    'Pulido técnico',
    'Interior, mesadas y revestimientos',
    'Muy alta',
    'Muy bajo',
    array['Cocinas', 'Mesadas', 'Baños', 'Quinchos', 'Revestimientos', 'Piezas especiales'],
    array['Alta tecnología', 'Resiste calor', 'Veta elegante', 'Muy bajo mantenimiento'],
    '/images/catalogo/neolith-calacatta.svg',
    array['/images/catalogo/neolith-calacatta.svg', '/images/showroom/kitchen-hero.svg'],
    array['blanco-dallas', 'blanco-itaunas', 'marmol-blanco', 'negro-san-gabriel'],
    'Hola Pietra, quiero cotizar el material Neolith Calacatta. ¿Me pueden asesorar?',
    true,
    'Publicado',
    'Neolith Calacatta | Marmolería Pietra',
    'Neolith Calacatta para superficies técnicas, mesadas y revestimientos premium.',
    30
  )
on conflict (slug) do nothing;
