# Supabase Admin Phase 2 - Marmolería Pietra

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Si estas variables no existen, `/admin` sigue funcionando en modo fallback local de solo lectura para no romper el sitio ni el flujo aprobado.

## Base de datos

Ejecutar `docs/supabase-materials.sql` en el SQL editor de Supabase. El script crea:

- `public.materials`
- índices básicos
- trigger de `updated_at`
- Row Level Security
- política de lectura pública para materiales publicados
- política de administración para usuarios autenticados
- seeds iniciales para Verde Ubatuba, Negro San Gabriel y Neolith Calacatta

## Auth

Crear usuarios desde Supabase Auth. Cuando Supabase está configurado, `middleware.ts` protege `/admin/*` y redirige a `/admin/login` si no existe una sesión válida.

El login usa Supabase Auth por email/password y guarda tokens en cookies httpOnly propias del panel.

## Alcance de esta fase

- Real: módulo Materiales con listado, alta, edición, duplicado y archivado.
- Preparado: proyectos, banners, leads, SEO y configuración permanecen con mocks hasta futuras fases.
