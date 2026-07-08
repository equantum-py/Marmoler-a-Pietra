# ADMIN_STATUS.md - Auditoría técnica profunda del panel administrativo

Fecha de auditoría: 2026-07-08  
Repositorio auditado: `/workspace/Marmoler-a-Pietra`  
Panel indicado: `https://marmoleriapietra.com/admin`  
Regla aplicada: evidencia basada en archivos, rutas, imports, consultas, server actions, APIs y SQL presentes en el repositorio.

## 0. Respuesta final

**¿EL PANEL ADMINISTRATIVO ESTÁ LISTO PARA OPERAR EL NEGOCIO?**

**NO.**

Evidencia técnica:

- Existen módulos administrativos con CRUD real/parcial contra Supabase: `materiales`, `banners`, `categorias`, `banners-pequenos`, `promociones`, `configuracion` parcial y `dashboard` de analytics.
- Existen módulos administrativos que son **MOCK**: `proyectos`, `leads`, `seo`, `home`.
- La ruta solicitada `/admin/crm-test` **NO EXISTE** en `app/admin`.
- Existen tablas usadas por código sin SQL versionado en el repositorio: `analytics_events`, `home_banners`, `home_categories`, `home_promo_cards`, `home_promotions`, `site_settings`.
- No existe sistema de roles admin en código. La protección depende de Supabase Auth, cookies y middleware; las policies SQL de `materials` autorizan `to authenticated`.
- No existe CRUD real para leads, proyectos, SEO ni CRM.

Siguiente desarrollo bloqueante antes de agregar nuevas funcionalidades: **seguridad/roles/RLS + migraciones de todas las tablas usadas + CRUD real de Leads/CRM/Proyectos**.

---

## 1. Resumen ejecutivo técnico

Este documento no califica intención ni diseño. Clasifica lo que existe en código.

Estados usados:

- **FUNCIONAL**: ruta, UI, acción/API, persistencia y lectura conectadas en código.
- **PARCIAL**: ruta y parte del flujo existen, pero faltan operaciones, migraciones, controles o persistencia completa.
- **MOCK**: usa datos estáticos o botones sin acción real.
- **INCOMPLETO**: existe una pieza aislada sin flujo cerrado.
- **NO IMPLEMENTADO**: no existe ruta/archivo/servicio.

Resultado por área:

| Área | Estado | Evidencia |
|---|---|---|
| Login | PARCIAL | `app/admin/login/actions.ts`, `lib/supabase/auth.ts`, `middleware.ts`; sin roles y con fallback si Supabase no está configurado. |
| Dashboard | PARCIAL | `app/admin/page.tsx` consume `lib/analytics/admin-analytics.ts`; lee `analytics_events`. |
| Materiales | PARCIAL | CRUD create/update/archive/duplicate contra `materials`; no delete físico, no búsqueda, no paginación. |
| Banners Home | PARCIAL | CRUD create/update/archive contra `home_banners`; falta SQL versionado de tabla. |
| Categorías Home | PARCIAL | CRUD create/update/archive contra `home_categories`; falta SQL versionado de tabla. |
| Banners pequeños | PARCIAL | CRUD create/update/archive contra `home_promo_cards`; falta SQL versionado de tabla. |
| Promociones | PARCIAL | CRUD create/update/archive contra `home_promotions`; falta SQL versionado de tabla. |
| Configuración | PARCIAL | Solo persiste `logo_desktop` y `logo_mobile` en `site_settings`. |
| Leads | MOCK | `app/admin/leads/page.tsx` usa `adminLeads` de `data/admin.ts`. |
| Proyectos | MOCK | `app/admin/proyectos/page.tsx` usa `adminProjects` de `data/admin.ts`. |
| SEO | MOCK | `app/admin/seo/page.tsx` usa `seoPages` de `data/admin.ts`. |
| Home admin | MOCK | `app/admin/home/page.tsx` usa `homeSections` de `data/admin.ts`. |
| CRM `/admin/crm-test` | NO IMPLEMENTADO | No existe ruta bajo `app/admin`. |

---

## 2. Fase 1 - Mapa completo de rutas administrativas

Rutas derivadas de archivos bajo `app/admin`.

| Ruta | Archivo | Estado | Protección | Observaciones |
|---|---|---|---|---|
| `/admin` | `app/admin/page.tsx` | PARCIAL | `middleware.ts` + `requireAdminUser()` indirecto en `getAnalyticsDashboard()` | Dashboard real contra `analytics_events` si Supabase está configurado. |
| `/admin/login` | `app/admin/login/page.tsx` + `app/admin/login/actions.ts` | PARCIAL | Excluida del middleware | Login Supabase email/password; fallback local si no hay Supabase. |
| `/admin/home` | `app/admin/home/page.tsx` | MOCK | `middleware.ts`; no llama `requireAdminUser()` en la página | Usa `homeSections` local. |
| `/admin/materiales` | `app/admin/materiales/page.tsx` | PARCIAL | `middleware.ts`; lectura por `getAdminMaterials()` | Lista Supabase o fallback local. |
| `/admin/materiales/nuevo` | `app/admin/materiales/nuevo/page.tsx` | PARCIAL | `middleware.ts`; server action llama `requireAdminUser()` | Crea en `materials` si Supabase está configurado. |
| `/admin/materiales/[id]/editar` | `app/admin/materiales/[id]/editar/page.tsx` | PARCIAL | `middleware.ts`; lectura por token | Edita `materials`; fallback local solo lectura. |
| `/admin/categorias` | `app/admin/categorias/page.tsx` | PARCIAL | `middleware.ts`; `getAdminHomeCategories()` llama `requireAdminUser()` | Lista `home_categories`. |
| `/admin/categorias/nuevo` | `app/admin/categorias/nuevo/page.tsx` | PARCIAL | `middleware.ts`; action llama `requireAdminUser()` | Crea `home_categories`. |
| `/admin/categorias/[id]/editar` | `app/admin/categorias/[id]/editar/page.tsx` | PARCIAL | `middleware.ts`; llama `requireAdminUser()` | Edita `home_categories`. |
| `/admin/proyectos` | `app/admin/proyectos/page.tsx` | MOCK | `middleware.ts`; no llama `requireAdminUser()` en la página | Botones sin `href` ni `action`. |
| `/admin/banners` | `app/admin/banners/page.tsx` | PARCIAL | `middleware.ts`; `getAdminHomeBanners()` llama `requireAdminUser()` | Lista `home_banners`. |
| `/admin/banners/nuevo` | `app/admin/banners/nuevo/page.tsx` | PARCIAL | `middleware.ts`; action llama `requireAdminUser()` | Crea `home_banners`. |
| `/admin/banners/[id]/editar` | `app/admin/banners/[id]/editar/page.tsx` | PARCIAL | `middleware.ts`; llama `requireAdminUser()` | Edita `home_banners`. |
| `/admin/banners-pequenos` | `app/admin/banners-pequenos/page.tsx` | PARCIAL | `middleware.ts`; `getAdminHomePromoCards()` llama `requireAdminUser()` | Lista `home_promo_cards`. |
| `/admin/banners-pequenos/nuevo` | `app/admin/banners-pequenos/nuevo/page.tsx` | PARCIAL | `middleware.ts`; action llama `requireAdminUser()` | Crea `home_promo_cards`. |
| `/admin/banners-pequenos/[id]/editar` | `app/admin/banners-pequenos/[id]/editar/page.tsx` | PARCIAL | `middleware.ts`; llama `requireAdminUser()` | Edita `home_promo_cards`. |
| `/admin/promociones` | `app/admin/promociones/page.tsx` | PARCIAL | `middleware.ts`; `getAdminHomePromotions()` llama `requireAdminUser()` | Lista `home_promotions`. |
| `/admin/promociones/nuevo` | `app/admin/promociones/nuevo/page.tsx` | PARCIAL | `middleware.ts`; action llama `requireAdminUser()` | Crea `home_promotions`. |
| `/admin/promociones/[id]/editar` | `app/admin/promociones/[id]/editar/page.tsx` | PARCIAL | `middleware.ts`; llama `requireAdminUser()` | Edita `home_promotions`. |
| `/admin/leads` | `app/admin/leads/page.tsx` | MOCK | `middleware.ts`; no llama `requireAdminUser()` en la página | Usa `adminLeads` local; filtros son texto. |
| `/admin/seo` | `app/admin/seo/page.tsx` | MOCK | `middleware.ts`; no llama `requireAdminUser()` en la página | Usa `seoPages` local; botón sin acción. |
| `/admin/configuracion` | `app/admin/configuracion/page.tsx` + `actions.ts` | PARCIAL | `middleware.ts`; actions no llaman `requireAdminUser()` | Edita solo logos en `site_settings`; obtiene token buscando múltiples cookies. |
| `/admin/api/media/upload` | `app/admin/api/media/upload/route.ts` | PARCIAL | No pasa por matcher de UI como página; valida cookie token manual | Sube a Supabase Storage bucket `pietra-media`. |
| `/admin/crm-test` | NO EXISTE | NO IMPLEMENTADO | NO EXISTE | No hay archivo ni carpeta `app/admin/crm-test`. |

---

## 3. Fase 2 - Mapa de módulos

| Módulo | Ubicación | Componentes | Hooks | Servicios | APIs | Tablas | Storage | Estado |
|---|---|---|---|---|---|---|---|---|
| Layout admin | `app/admin/layout.tsx` | `AdminSidebar`, `AdminTopbar` | NO | NO | NO | NO | NO | FUNCIONAL UI |
| Login | `app/admin/login` | `LoginForm` | `useActionState` en form | `lib/supabase/auth.ts`, `client.ts`, `config.ts` | Supabase Auth `/token`, `/user` | Auth Supabase | NO | PARCIAL |
| Dashboard | `app/admin/page.tsx` | `AnalyticsLiveRefresh`, componentes internos de página | `useEffect` en refresh client | `lib/analytics/admin-analytics.ts` | Supabase REST `/analytics_events` | `analytics_events` | NO | PARCIAL |
| Materiales | `app/admin/materiales` | `MaterialForm`, `AdminImageUploader`, `AdminGalleryUploader` | `useActionState`, upload client | `lib/supabase/materials.ts`, `storage.ts` | Supabase REST `/materials`, `/admin/api/media/upload` | `materials` | `pietra-media` | PARCIAL |
| Categorías | `app/admin/categorias` | `HomeCategoryForm`, `AdminImageUploader` | NO propio | `supabaseFetch` | `/home_categories` | `home_categories` | `pietra-media` | PARCIAL |
| Proyectos | `app/admin/proyectos/page.tsx` | `AdminTable`, `AdminBadge`, `AdminActionButton` | NO | NO | NO | NO | NO | MOCK |
| Banners | `app/admin/banners` | `HomeBannerForm`, `AdminImageUploader` | NO propio | `supabaseFetch` | `/home_banners` | `home_banners` | `pietra-media` | PARCIAL |
| Banners pequeños | `app/admin/banners-pequenos` | `HomePromoCardForm`, `AdminImageUploader` | NO propio | `supabaseFetch` | `/home_promo_cards` | `home_promo_cards` | `pietra-media` | PARCIAL |
| Promociones | `app/admin/promociones` | `HomePromotionForm`, `AdminMediaUploader` | NO propio | `supabaseFetch` | `/home_promotions` | `home_promotions` | `pietra-media` | PARCIAL |
| Leads | `app/admin/leads/page.tsx` | `AdminTable`, `AdminBadge`, `AdminActionButton` | NO | `data/admin.ts` | NO | NO | NO | MOCK |
| SEO | `app/admin/seo/page.tsx` | `AdminTable`, `AdminBadge`, `AdminActionButton` | NO | `data/admin.ts` | NO | NO | NO | MOCK |
| Configuración | `app/admin/configuracion` | `AdminImageUploader` | upload client | `app/admin/configuracion/actions.ts` | `/site_settings`, `/admin/api/media/upload` | `site_settings` | `pietra-media` | PARCIAL |
| CRM test | NO EXISTE | NO | NO | NO | NO | SQL existe aislado | NO | NO IMPLEMENTADO |

---

## 4. Fase 3 - Auditoría CRUD por módulo

Leyenda: **SI**, **NO**, **PARCIAL**, **MOCK**, **NO EXISTE**.

| Módulo | Crear | Editar | Eliminar | Listar | Buscar | Filtros | Paginación | Upload | Validaciones | Errores | Persistencia | Soft delete | Estados | Historial | Confirmaciones |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Login | NO APLICA | NO APLICA | Logout SI | NO APLICA | NO | NO | NO | NO | SI email/password requeridos | PARCIAL mensaje genérico | Cookies httpOnly | NO | Sesión token | NO | NO |
| Dashboard | NO | NO | NO | SI | NO | SI rango `24h/yesterday/7d/30d` | NO | NO | SI normaliza rango | PARCIAL | SI lee `analytics_events` | NO | NO | NO | NO |
| Materiales | SI | SI | NO | SI | NO | NO | NO | SI imagen/galería | PARCIAL requeridos básicos | PARCIAL | SI `materials` | SI archivar | SI `Publicado/Borrador/Archivado` | NO | NO |
| Categorías | SI | SI | NO | SI | NO | NO | NO | SI imagen | PARCIAL | PARCIAL | SI `home_categories` | SI status `archived` | SI | NO | NO |
| Proyectos | MOCK | MOCK | MOCK | MOCK | NO | NO | NO | NO | NO | NO | NO | NO | MOCK | NO | NO |
| Banners | SI | SI | NO | SI | NO | NO | NO | SI imagen | PARCIAL | PARCIAL | SI `home_banners` | SI status `archived` | SI | NO | NO |
| Banners pequeños | SI | SI | NO | SI | NO | NO | NO | SI imagen | PARCIAL | PARCIAL | SI `home_promo_cards` | SI status `archived` | SI | NO | NO |
| Promociones | SI | SI | NO | SI | NO | NO | NO | SI media imagen/video | PARCIAL | PARCIAL | SI `home_promotions` | SI status `archived` | SI | NO | NO |
| Leads | MOCK | NO | NO | MOCK | NO | MOCK visual | NO | NO | NO | NO | NO | NO | MOCK | NO | NO |
| SEO | MOCK | NO | NO | MOCK | NO | NO | NO | NO | NO | NO | NO | NO | MOCK | NO | NO |
| Configuración | SI logos | SI logos | NO | SI settings | NO | NO | NO | SI logos | NO formato | PARCIAL | SI `site_settings` | NO | NO | NO | NO |
| CRM `/admin/crm-test` | NO EXISTE | NO EXISTE | NO EXISTE | NO EXISTE | NO EXISTE | NO EXISTE | NO EXISTE | NO EXISTE | NO EXISTE | NO EXISTE | NO EXISTE | NO EXISTE | NO EXISTE | NO EXISTE | NO EXISTE |

---

## 5. Fase 4 - APIs y endpoints

### 5.1 APIs internas Next.js

| Ruta | Archivo | Método | Tabla/recurso | Autenticación | Validaciones | Errores | Consumidor | Existe | Conectada | Usada | Estado |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/api/analytics` | `app/api/analytics/route.ts` | POST | `analytics_events` | Anon key Supabase | allowlist `page_view`, `whatsapp_click`, `material_view`; strings recortados | Devuelve 200 con `ok:false` ante fallos Supabase | `components/analytics-tracker.tsx` | SI | SI | SI | PARCIAL |
| `/admin/api/media/upload` | `app/admin/api/media/upload/route.ts` | POST | Supabase Storage `pietra-media` | Busca token en cookies; usa anon key | archivo obligatorio, tamaño, tipo MIME image/video, folder allowlist | JSON con status 400/401/500 | `lib/supabase/storage.ts` vía uploaders admin | SI | SI | SI | PARCIAL |

### 5.2 Supabase Auth usado por el panel

| Ruta | Archivo consumidor | Método | Recurso | Autenticación | Validaciones | Errores | Estado |
|---|---|---|---|---|---|---|---|
| `${supabaseAuthUrl}/token?grant_type=password` | `lib/supabase/auth.ts` | POST | Supabase Auth | anon key + email/password | email/password requeridos en `loginAdmin` | catch genérico | PARCIAL |
| `${supabaseAuthUrl}/user` | `lib/supabase/auth.ts`, `middleware.ts` | GET | Supabase Auth user | access token cookie | token presente | redirect a login/borrado cookies en middleware | PARCIAL |

### 5.3 Supabase REST usado por admin

| Ruta REST | Archivos | Método | Tabla | Auth | Validaciones | Errores | Consumidor | Existe en código | SQL versionado | Estado |
|---|---|---|---|---|---|---|---|---|---|---|
| `/materials?select=*...` | `lib/supabase/materials.ts`, pages/actions materiales | GET/POST/PATCH | `materials` | access token; fallback anon si sin token en cliente genérico | requeridos básicos al crear/editar | throw; fallback local en listado | Admin materiales y público materiales | SI | SI `docs/supabase-materials.sql` | PARCIAL |
| `/home_banners` | `app/admin/banners/*`, `lib/banners/public-banners.ts` | GET/POST/PATCH | `home_banners` | admin access token; público anon | payload básico | throw | Admin banners + home pública | SI | NO | PARCIAL |
| `/home_categories` | `app/admin/categorias/*`, `lib/categories/public-categories.ts` | GET/POST/PATCH | `home_categories` | admin access token; público anon | payload básico | throw | Admin categorías + home pública | SI | NO | PARCIAL |
| `/home_promo_cards` | `app/admin/banners-pequenos/*`, `lib/promo-cards/public-promo-cards.ts` | GET/POST/PATCH | `home_promo_cards` | admin access token; público anon | payload básico | throw | Admin banners pequeños + home pública | SI | NO | PARCIAL |
| `/home_promotions` | `app/admin/promociones/*`, `lib/promotions/public-promotions.ts` | GET/POST/PATCH | `home_promotions` | admin access token; público anon | payload básico | throw | Admin promociones + home/materiales pública | SI | NO | PARCIAL |
| `/site_settings` | `app/admin/configuracion/actions.ts`, `lib/site/public-settings.ts`, `components/navbar.tsx` | GET/POST | `site_settings` | admin token o anon fallback; público anon | NO formato | catch null en lectura pública/admin; throw en update | Configuración + navbar + settings públicas | SI | NO | PARCIAL |
| `/analytics_events` | `lib/analytics/admin-analytics.ts`, `app/api/analytics/route.ts` | GET/POST | `analytics_events` | dashboard access token; insert anon | event_type allowlist en API | throw en dashboard; 200 ok:false en API | Dashboard + tracker público | SI | NO | PARCIAL |

### 5.4 APIs muertas o no existentes solicitadas

| API/Ruta | Estado | Evidencia |
|---|---|---|
| `/admin/crm-test` | NO IMPLEMENTADO | No existe archivo bajo `app/admin/crm-test`. |
| CRUD Leads | NO IMPLEMENTADO | `app/admin/leads/page.tsx` no importa actions ni servicios; solo `adminLeads`. |
| CRUD Proyectos | NO IMPLEMENTADO | `app/admin/proyectos/page.tsx` no importa actions ni servicios; solo `adminProjects`. |
| CRUD SEO | NO IMPLEMENTADO | `app/admin/seo/page.tsx` no importa actions ni servicios; solo `seoPages`. |

---

## 6. Fase 5 - Supabase: consultas, Auth, Storage y claves

| Archivo | Tabla/recurso | Operación | SELECT | INSERT | UPDATE | DELETE | RPC | Storage | Auth | Service Role | Anon Key | Riesgos |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `lib/supabase/client.ts` | REST/Auth genérico | fetch wrapper | SI | SI | SI | SI por wrapper | NO | NO | Por bearer | NO | SI | Si no se pasa accessToken usa anon key como bearer. |
| `lib/supabase/auth.ts` | Supabase Auth | login/user/cookies | user | token | NO | NO | NO | NO | SI | NO | SI | Sin roles; refresh token guardado pero no usado para renovar. |
| `middleware.ts` | Supabase Auth | validación sesión | user | NO | NO | NO | NO | NO | SI | NO | SI | Si no hay env Supabase, deja pasar admin. |
| `lib/supabase/materials.ts` | `materials` | lectura + fallback local | SI | NO | NO | NO | NO | NO | token cookie | NO | SI | Fallback local oculta falla de Supabase. |
| `app/admin/materiales/actions.ts` | `materials` | create/update/archive/duplicate | SI duplicate | SI | SI | NO | NO | NO | `requireAdminUser()` | NO | SI | No delete físico; validación parcial. |
| `app/admin/banners/actions.ts` | `home_banners` | create/update/archive | NO | SI | SI | NO | NO | NO | `requireAdminUser()` | NO | SI | Tabla sin SQL versionado. |
| `app/admin/categorias/actions.ts` | `home_categories` | create/update/archive | NO | SI | SI | NO | NO | NO | `requireAdminUser()` | NO | SI | Tabla sin SQL versionado. |
| `app/admin/banners-pequenos/actions.ts` | `home_promo_cards` | create/update/archive | NO | SI | SI | NO | NO | NO | `requireAdminUser()` | NO | SI | Tabla sin SQL versionado. |
| `app/admin/promociones/actions.ts` | `home_promotions` | create/update/archive | NO | SI | SI | NO | NO | NO | `requireAdminUser()` | NO | SI | Tabla sin SQL versionado. |
| `app/admin/configuracion/actions.ts` | `site_settings` | get/upsert logos | SI | SI upsert | SI upsert | NO | NO | NO | cookie token buscado manualmente | NO | SI | No llama `requireAdminUser()`; fallback a anon si no encuentra token. |
| `app/admin/api/media/upload/route.ts` | Storage `pietra-media` | upload | NO | SI object | NO | NO | NO | SI | cookie token buscado manualmente | NO | SI | Usa anon key; depende de policy de Storage y token cookie. |
| `lib/supabase/storage.ts` | `/admin/api/media/upload` | cliente upload | NO | SI | NO | NO | NO | SI | cookies del browser | NO | NO directo | Sin retry ni progreso. |
| `app/api/analytics/route.ts` | `analytics_events` | insert evento | NO | SI | NO | NO | NO | NO | NO usuario | NO | SI | Endpoint público escribe eventos; no rate limit. |
| `lib/analytics/admin-analytics.ts` | `analytics_events` | dashboard | SI | NO | NO | NO | NO | NO | `requireAdminUser()` | NO | SI | Trae hasta 5000 filas y agrega en memoria. |
| `lib/materials/public-materials.ts` | `materials` | público catálogo | SI | NO | NO | NO | NO | NO | NO | NO | SI | Fallback a datos locales si falla. |
| `lib/banners/public-banners.ts` | `home_banners` | público banners | SI | NO | NO | NO | NO | NO | NO | NO | SI | Fallback local si falla. |
| `lib/categories/public-categories.ts` | `home_categories` | público categorías | SI | NO | NO | NO | NO | NO | NO | NO | SI | Fallback local si falla. |
| `lib/promo-cards/public-promo-cards.ts` | `home_promo_cards` | público cards | SI | NO | NO | NO | NO | NO | NO | NO | SI | Fallback local si falla. |
| `lib/promotions/public-promotions.ts` | `home_promotions` | público promos | SI | NO | NO | NO | NO | NO | NO | NO | SI | Sin SQL versionado. |
| `lib/site/public-settings.ts` | `site_settings` | público settings | SI | NO | NO | NO | NO | NO | NO | NO | SI | Retorna null silencioso si falla. |
| `components/navbar.tsx` | `site_settings` | cliente navbar | SI | NO | NO | NO | NO | NO | NO | NO | SI | Fetch desde cliente a REST con anon key pública. |

Tablas con SQL versionado presente:

| Tabla | Archivo SQL | Estado |
|---|---|---|
| `materials` | `docs/supabase-materials.sql`, `docs/supabase/import-pietra-catalog.sql` | EXISTE |
| `customers` | `docs/supabase-crm-sprint-0.sql` | EXISTE |
| `page_views` | `docs/supabase-crm-sprint-0.sql` | EXISTE |
| `whatsapp_clicks` | `docs/supabase-crm-sprint-0.sql` | EXISTE |

Tablas usadas por código sin SQL versionado encontrado:

| Tabla | Usada en | Estado |
|---|---|---|
| `analytics_events` | `app/api/analytics/route.ts`, `lib/analytics/admin-analytics.ts` | SQL NO EXISTE |
| `home_banners` | Admin banners + público banners | SQL NO EXISTE |
| `home_categories` | Admin categorías + público categorías | SQL NO EXISTE |
| `home_promo_cards` | Admin banners pequeños + público promo cards | SQL NO EXISTE |
| `home_promotions` | Admin promociones + público promociones | SQL NO EXISTE |
| `site_settings` | Admin configuración + navbar + public settings | SQL NO EXISTE |

---

## 7. Fase 6 - Componentes del panel

| Componente | Archivo | Usado | Clasificación | Observaciones |
|---|---|---|---|---|
| `AdminActionButton` | `components/admin/admin-action-button.tsx` | SI | Usado | Usado en tablas/listados. |
| `AdminBadge` | `components/admin/admin-badge.tsx` | SI | Usado | Usado en estados. |
| `AdminGalleryUploader` | `components/admin/admin-gallery-uploader.tsx` | SI | Usado | Usado por `MaterialForm`. |
| `AdminImageUploader` | `components/admin/admin-image-uploader.tsx` | SI | Usado | Usado en materiales, banners, categorías, configuración. |
| `AdminMediaUploader` | `components/admin/admin-media-uploader.tsx` | SI | Usado | Usado en promociones. |
| `AdminPageHeader` | `components/admin/admin-page-header.tsx` | SI | Usado | Usado en páginas admin. |
| `AdminSectionCard` | `components/admin/admin-section-card.tsx` | SI | Usado | Usado en home admin y forms. |
| `AdminSidebar` | `components/admin/admin-sidebar.tsx` | SI | Usado | Usado por layout. |
| `AdminStatCard` | `components/admin/admin-stat-card.tsx` | NO | No usado | Exportado en `components/admin/index.ts`, no importado por rutas actuales. |
| `AdminTable` | `components/admin/admin-table.tsx` | SI | Usado | Usado en listados. |
| `AdminTopbar` | `components/admin/admin-topbar.tsx` | SI | Usado | Usado por layout. |
| `AnalyticsLiveRefresh` | `components/admin/analytics-live-refresh.tsx` | SI | Usado | Usado por dashboard. |
| `HomeBannerForm` | `components/admin/home-banner-form.tsx` | SI | Usado | Nuevo/editar banners. |
| `HomeCategoryForm` | `components/admin/home-category-form.tsx` | SI | Usado | Nuevo/editar categorías. |
| `HomePromoCardForm` | `components/admin/home-promo-card-form.tsx` | SI | Usado | Nuevo/editar banners pequeños. |
| `HomePromotionForm` | `components/admin/home-promotion-form.tsx` | SI | Usado | Nuevo/editar promociones. |
| `LoginForm` | `components/admin/login-form.tsx` | SI | Usado | Login. |
| `MaterialForm` | `components/admin/material-form.tsx` | SI | Usado | Nuevo/editar materiales. |
| `components/admin/index.ts` | barrel export | SI | Usado | Exporta `AdminStatCard` aunque no se usa. |

---

## 8. Fase 7 - Páginas, componentes y servicios huérfanos

| Tipo | Archivo/ruta | Estado | Evidencia |
|---|---|---|---|
| Componente | `components/admin/admin-stat-card.tsx` | No usado | No aparece importado por páginas/componentes admin; solo exportado en barrel. |
| Ruta solicitada | `/admin/crm-test` | NO EXISTE | No existe carpeta/archivo en `app/admin`. |
| SQL/CRM | `docs/supabase-crm-sprint-0.sql` | Aislado del panel | Define `customers`, `page_views`, `whatsapp_clicks`; no hay ruta admin que lo consuma. |
| Módulo leads | `app/admin/leads/page.tsx` | Mock, sin services | No importa actions, Supabase ni API. |
| Módulo proyectos | `app/admin/proyectos/page.tsx` | Mock, sin services | No importa actions, Supabase ni API. |
| Módulo SEO | `app/admin/seo/page.tsx` | Mock, sin services | No importa actions, Supabase ni API. |

---

## 9. Fase 8 - Deuda técnica

Búsquedas ejecutadas en código: `TODO`, `FIXME`, `HACK`, `console.`, comentarios, imports, mocks, hardcoded values.

| Categoría | Archivo | Hallazgo | Estado | Impacto técnico |
|---|---|---|---|---|
| MOCK | `app/admin/leads/page.tsx` | Página usa `adminLeads` local; filtros son texto. | MOCK | No hay leads reales. |
| MOCK | `app/admin/proyectos/page.tsx` | Página usa `adminProjects`; acciones son botones sin href/action. | MOCK | No administra proyectos. |
| MOCK | `app/admin/seo/page.tsx` | Página usa `seoPages`; botón sin acción. | MOCK | No administra SEO. |
| MOCK | `app/admin/home/page.tsx` | Página usa `homeSections` local. | MOCK | No construye home real. |
| Fallback | `lib/supabase/auth.ts` | Sin Supabase retorna usuario `mock@pietra.local`. | INCOMPLETO | Admin queda accesible en modo fallback. |
| Fallback | `middleware.ts` | Si falta `supabaseAuthUrl` o `supabaseAnonKey`, retorna `NextResponse.next()`. | INCOMPLETO | Rutas admin pasan sin auth Supabase. |
| Fallback | `lib/supabase/materials.ts` | Si falla Supabase, vuelve a materiales locales. | INCOMPLETO | Falla de DB queda oculta en listado. |
| Error oculto | `app/api/analytics/route.ts` | Ante falla de Supabase responde HTTP 200 con `ok:false`. | INCOMPLETO | Monitoreo HTTP no detecta falla. |
| Console | `lib/supabase/materials.ts` | `console.error` en fallback de materiales. | Deuda menor | Log no estructurado. |
| Comentario ESLint | `components/admin/admin-image-uploader.tsx` | Desactiva `@next/next/no-img-element` para preview. | Deuda menor | Imagen no optimizada en preview. |
| Comentario ESLint | `app/materiales/[slug]/page.tsx` | Desactiva `@next/next/no-img-element`. | Deuda pública | No es panel, pero aparece en búsqueda. |
| Sin pruebas | `package.json` | No existe script `test`. | INCOMPLETO | No hay suite automatizada del admin. |
| Magic number | `lib/analytics/admin-analytics.ts` | `limit = 5000` en fetch de eventos. | Deuda rendimiento | Agregación en memoria limitada. |
| Magic number | `app/admin/api/media/upload/route.ts` | Límite de upload hardcodeado. | Deuda menor | Cambio requiere editar código. |
| Hardcoded | `components/navbar.tsx` | Instagram default hardcodeado. | Config parcial | No todo sale de `site_settings`. |
| Hardcoded | `lib/whatsapp.ts` | Número WhatsApp hardcodeado. | Config parcial | WhatsApp no administrable desde panel. |
| Hardcoded | `app/layout.tsx` | URL base y metadata públicas hardcodeadas. | Config parcial | SEO global no administrable desde panel. |

Resultado de `TODO/FIXME/HACK`: no se encontraron marcadores funcionales relevantes en archivos del panel. La deuda principal está en mocks, fallback, ausencia de rutas y ausencia de migraciones.

---

## 10. Fase 9 - Configuración hardcodeada o parcial

| Elemento | Archivo | Estado | Evidencia técnica |
|---|---|---|---|
| WhatsApp principal | `lib/whatsapp.ts` | Hardcodeado | Función arma URL con número fijo. |
| Mensajes WhatsApp de materiales | `data/materials.ts`, `docs/supabase-materials.sql` | Parcial | Materiales Supabase tienen `whatsapp_message`; fallback/local genera texto. |
| Instagram | `components/navbar.tsx` | Parcial | Default hardcodeado; se reemplaza si `site_settings.instagram` existe. |
| Logos | `app/admin/configuracion/actions.ts`, `components/navbar.tsx` | PARCIAL administrable | Admin guarda `logo_desktop`, `logo_mobile`; navbar lee logos. |
| Email | `app/admin/configuracion/actions.ts` type incluye `email` | No editable en UI | Type existe, formulario solo edita logos. |
| Dirección | `app/admin/configuracion/actions.ts` type incluye `address` | No editable en UI | Type existe, formulario solo edita logos. |
| Branding colores | `tailwind.config`/styles | Hardcodeado | No hay tabla ni UI admin para tema. |
| SEO global | `app/layout.tsx`, `app/admin/seo/page.tsx` | MOCK/Hardcodeado | SEO admin usa `seoPages`; no persiste cambios. |
| Banners | `home_banners` + fallbacks públicos | Parcial | Admin conectado, tabla sin SQL versionado. |
| Textos home | varias secciones públicas + `data/admin.ts` | Parcial/Hardcodeado | Home admin no edita secciones; muestra `homeSections`. |
| URL sitio | `app/layout.tsx` | Hardcodeado | `metadataBase` usa `https://marmoleriapietra.com`. |

---

## 11. Fase 10 - Seguridad

| Área | Archivo | Estado | Vulnerabilidad técnica | Impacto | Siguiente desarrollo |
|---|---|---|---|---|---|
| Middleware | `middleware.ts` | INCOMPLETO | Si faltan env Supabase, `/admin/*` pasa sin validación. | Admin accesible en fallback. | Cambiar a fail-closed en producción. |
| Roles | No existe archivo de roles | NO IMPLEMENTADO | No hay claims, tabla `admin_users`, allowlist ni RBAC. | Cualquier usuario Auth permitido por RLS puede operar. | Implementar roles/RLS por claim o tabla. |
| RLS materiales | `docs/supabase-materials.sql` | INCOMPLETO | Policy `Authenticated admins can manage materials` usa `to authenticated using true`. | Permiso demasiado amplio. | Restringir con claims/admin table. |
| RLS tablas home | SQL no existe | NO IMPLEMENTADO EN REPO | No hay policies versionadas para `home_banners`, `home_categories`, etc. | Producción no reproducible desde repo. | Crear migraciones y policies. |
| Auth | `lib/supabase/auth.ts` | PARCIAL | Refresh token se guarda pero no se usa para renovar. | Sesión expira sin recuperación. | Implementar refresh. |
| Logout | `lib/supabase/auth.ts`, `app/admin/login/actions.ts` | PARCIAL | Borra cookies locales; no revoca sesión Supabase. | Token puede seguir válido hasta expiración. | Llamar signout/revoke. |
| Configuración | `app/admin/configuracion/actions.ts` | INCOMPLETO | Actions no llaman `requireAdminUser()` y usan token encontrado manualmente o anon. | Mutación depende de RLS; riesgo si policy permite anon. | Usar auth central y bloquear anon. |
| Upload | `app/admin/api/media/upload/route.ts` | PARCIAL | Busca token por varios nombres; usa anon key para Storage. | Confusión de sesión y dependencia de policies. | Validar usuario con Supabase `/user` y un cookie name. |
| Analytics pública | `app/api/analytics/route.ts` | PARCIAL | Endpoint público inserta eventos con anon key; no rate limit. | Métricas contaminables. | Rate limit + Origin + RLS específica. |
| CSRF | Server actions admin | INCOMPLETO | No hay validación Origin/CSRF explícita. | Acciones con cookies pueden recibir POST cross-site. | Validar Origin o token CSRF. |
| Variables | `.env.example`, `lib/supabase/config.ts` | PARCIAL | Solo URL/anon key; no service role. | No hay service role expuesto. | Mantener service role fuera del cliente; documentar env obligatorias. |

Service Role: **NO se encontró uso de Service Role en código**.  
Anon Key: **SI se usa** en REST, Auth, Storage y API analytics.

---

## 12. Fase 11 - Rendimiento

| Área | Archivo | Hallazgo | Estado | Impacto |
|---|---|---|---|---|
| Dashboard analytics | `lib/analytics/admin-analytics.ts` | Lee hasta 5000 eventos y agrega en memoria. | INCOMPLETO | Escala mal con tráfico alto. |
| Dashboard refresh | `components/admin/analytics-live-refresh.tsx` | Refresca cada 10s. | PARCIAL | Puede aumentar carga de lecturas. |
| Listados admin | páginas `page.tsx` de módulos reales | No hay paginación. | INCOMPLETO | Tablas grandes cargan todo. |
| Listados admin | páginas `page.tsx` de módulos reales | No hay búsqueda server-side. | INCOMPLETO | Operación lenta con muchos registros. |
| Fetch Supabase | `lib/supabase/client.ts` | `cache: 'no-store'` en REST admin. | FUNCIONAL para admin | Evita caché, aumenta latencia. |
| Materiales públicos | `lib/materials/public-materials.ts` | Funciones pueden traer todos los materiales para relacionados. | PARCIAL | Riesgo de carga con catálogo grande. |
| Upload media | `lib/supabase/storage.ts` | Sin compresión cliente ni progreso. | INCOMPLETO | UX y tamaño de assets sin optimización desde admin. |
| Bundle/admin | No hay medición bundle en repo | NO MEDIDO | No existe analyzer configurado. |
| Lazy loading | Panel admin | NO IMPLEMENTADO específico | Componentes admin cargan según rutas Next. |
| N+1 | Código auditado | No se encontró patrón N+1 admin | NO DETECTADO | Consultas principales son por tabla. |

---

## 13. Fase 12 - Estado real sin porcentajes inventados

El código no contiene una métrica objetiva de avance porcentual. Por regla de auditoría, no se inventan porcentajes. Se reporta estado verificable.

| Módulo | Porcentaje | Estado verificable | Evidencia |
|---|---:|---|---|
| Dashboard | NO MEDIBLE DESDE CÓDIGO | PARCIAL | UI + query `analytics_events`; sin SQL versionado; agregación en memoria. |
| Login | NO MEDIBLE DESDE CÓDIGO | PARCIAL | Auth real + fallback + sin roles + sin refresh. |
| Materiales | NO MEDIBLE DESDE CÓDIGO | PARCIAL | CRUD parcial + SQL `materials` + sin búsqueda/paginación/delete. |
| Proyectos | NO MEDIBLE DESDE CÓDIGO | MOCK | Datos `adminProjects`; sin API/tabla/actions. |
| Banners | NO MEDIBLE DESDE CÓDIGO | PARCIAL | CRUD contra `home_banners`; SQL no versionado. |
| Categorías | NO MEDIBLE DESDE CÓDIGO | PARCIAL | CRUD contra `home_categories`; SQL no versionado. |
| Banners pequeños | NO MEDIBLE DESDE CÓDIGO | PARCIAL | CRUD contra `home_promo_cards`; SQL no versionado. |
| Promociones | NO MEDIBLE DESDE CÓDIGO | PARCIAL | CRUD contra `home_promotions`; SQL no versionado. |
| Configuración | NO MEDIBLE DESDE CÓDIGO | PARCIAL | Solo logos en `site_settings`; contacto/WhatsApp/SEO no editables. |
| Leads | NO MEDIBLE DESDE CÓDIGO | MOCK | Datos `adminLeads`; sin persistencia. |
| CRM | NO MEDIBLE DESDE CÓDIGO | NO IMPLEMENTADO | `/admin/crm-test` no existe; SQL Sprint 0 no conectado. |
| Analytics | NO MEDIBLE DESDE CÓDIGO | PARCIAL | Tracker + API + dashboard usan `analytics_events`; SQL no versionado. |
| SEO | NO MEDIBLE DESDE CÓDIGO | MOCK | Datos `seoPages`; sin persistencia. |
| Home admin | NO MEDIBLE DESDE CÓDIGO | MOCK | Datos `homeSections`; sin acciones. |

---

## 14. Riesgos técnicos y operativos

| Severidad | Riesgo | Archivos | Impacto |
|---|---|---|---|
| CRÍTICO | Admin no falla cerrado sin Supabase env. | `middleware.ts`, `lib/supabase/auth.ts` | Panel accesible en fallback. |
| CRÍTICO | Sin roles/RBAC admin. | No existe módulo roles; `docs/supabase-materials.sql` | Permisos amplios para usuarios autenticados. |
| CRÍTICO | Tablas productivas sin migraciones. | `home_*`, `site_settings`, `analytics_events` usados sin SQL | Ambientes no reproducibles. |
| ALTO | Leads no existen como sistema real. | `app/admin/leads/page.tsx`, `data/admin.ts` | Negocio no puede gestionar consultas desde admin. |
| ALTO | CRM Sprint 0 no conectado. | `docs/supabase-crm-sprint-0.sql`, ausencia `/admin/crm-test` | No hay CRM operativo. |
| ALTO | Proyectos no tienen CRUD. | `app/admin/proyectos/page.tsx` | Portfolio no administrable. |
| ALTO | Analytics pública sin rate limit. | `app/api/analytics/route.ts` | Métricas contaminables. |
| MEDIO | Configuración solo edita logos. | `app/admin/configuracion/*` | WhatsApp/contacto/SEO siguen fuera del panel. |
| MEDIO | Sin paginación ni búsqueda. | Listados admin | Admin degrada con volumen. |
| MEDIO | Build depende de Google Fonts remotas. | `app/layout.tsx` | Build falla si entorno no accede a fonts. |

---

## 15. Fase 13 - Roadmap técnico priorizado

### Prioridad 1 - Seguridad y acceso admin

| Campo | Detalle |
|---|---|
| Problema | Admin pasa en fallback sin Supabase env; no hay roles/RBAC; RLS amplia. |
| Archivos afectados | `middleware.ts`, `lib/supabase/auth.ts`, `docs/supabase-materials.sql`, nuevas migraciones RLS. |
| Impacto | Bloquea operación segura. |
| Tiempo estimado | 1-2 días. |
| Riesgo | Alto: cambios de auth pueden bloquear acceso si se configuran mal. |

### Prioridad 2 - Migraciones Supabase faltantes

| Campo | Detalle |
|---|---|
| Problema | Tablas usadas por código no tienen SQL versionado. |
| Archivos afectados | Crear SQL para `analytics_events`, `home_banners`, `home_categories`, `home_promo_cards`, `home_promotions`, `site_settings`. |
| Impacto | Ambientes reproducibles; reduce fallos de deploy. |
| Tiempo estimado | 1-2 días. |
| Riesgo | Medio: requiere alinear schema con campos de forms/actions. |

### Prioridad 3 - Leads y CRM reales

| Campo | Detalle |
|---|---|
| Problema | `/admin/leads` es mock; `/admin/crm-test` no existe; Sprint 0 SQL no está conectado. |
| Archivos afectados | `app/admin/leads/page.tsx`, nueva ruta `app/admin/crm-test`, `docs/supabase-crm-sprint-0.sql`, servicios CRM. |
| Impacto | Permite operar consultas comerciales desde admin. |
| Tiempo estimado | 3-5 días. |
| Riesgo | Medio: definir modelo único entre `analytics_events` y `customers/page_views/whatsapp_clicks`. |

### Prioridad 4 - Proyectos y SEO reales

| Campo | Detalle |
|---|---|
| Problema | Proyectos y SEO son mocks. |
| Archivos afectados | `app/admin/proyectos/page.tsx`, nuevas actions/forms SQL; `app/admin/seo/page.tsx`, tabla SEO/config. |
| Impacto | Portfolio y metadatos quedan administrables. |
| Tiempo estimado | 4-7 días. |
| Riesgo | Medio: requiere relaciones con materiales, imágenes y páginas públicas. |

### Prioridad 5 - Operabilidad: búsqueda, paginación, errores y auditoría

| Campo | Detalle |
|---|---|
| Problema | Listados reales no tienen búsqueda/paginación; errores son genéricos; no hay historial. |
| Archivos afectados | Páginas `app/admin/*/page.tsx`, actions, componentes `AdminTable`, nuevos logs/audit tables. |
| Impacto | Admin usable con volumen real y soporte operativo. |
| Tiempo estimado | 3-5 días. |
| Riesgo | Bajo/Medio: cambios UI y queries. |

---

## 16. Recomendación final

**NO operar el negocio completo con este panel en su estado actual.**

Se puede usar de forma limitada para:

- Materiales, con Supabase configurado y RLS revisada.
- Banners/categorías/promociones, solo si las tablas existen en producción con policies correctas.
- Logos, solo `logo_desktop` y `logo_mobile`.
- Dashboard analytics, solo si `analytics_events` existe y acepta eventos.

No se puede usar como panel integral para operar el negocio porque falta:

| Falta | Dónde falta | Archivo | API | Tabla | Siguiente desarrollo |
|---|---|---|---|---|---|
| Roles admin | Seguridad | No existe | Supabase Auth/RLS | admin roles/claims no existen | Implementar RBAC y RLS granular. |
| Migración analytics | DB | No existe SQL | `/api/analytics`, `/analytics_events` | `analytics_events` | Crear SQL/policies/índices. |
| Migraciones home CMS | DB | No existe SQL | `home_*` REST | `home_banners`, `home_categories`, `home_promo_cards`, `home_promotions` | Crear migraciones y policies. |
| Settings completos | Configuración | `app/admin/configuracion/page.tsx` solo logos | `/site_settings` | `site_settings` | Agregar WhatsApp, contacto, redes, SEO global. |
| Leads reales | Leads | `app/admin/leads/page.tsx` | NO EXISTE | NO EXISTE | Crear tabla, actions, filtros reales, estados. |
| CRM admin | CRM | `/admin/crm-test` no existe | NO EXISTE | `customers/page_views/whatsapp_clicks` existen solo en SQL | Crear ruta y conectar consultas. |
| Proyectos CRUD | Proyectos | `app/admin/proyectos/page.tsx` | NO EXISTE | NO EXISTE | Crear tabla, forms, gallery, actions. |
| SEO CRUD | SEO | `app/admin/seo/page.tsx` | NO EXISTE | NO EXISTE | Crear tabla/config SEO y acciones. |
| Búsqueda/paginación | Listados | `app/admin/*/page.tsx` | REST actual sin paginación UI | Tablas admin | Agregar query params y rangos. |
| Historial/auditoría | Todos | NO EXISTE | NO EXISTE | NO EXISTE | Crear `audit_log` y registrar mutaciones. |

---

## 17. Comandos de auditoría ejecutados

```bash
find app/admin -type f | sort
find components/admin -type f | sort
rg -n "from '@/components/admin|components/admin|from '@/lib|supabaseFetch|fetch\(|/api/analytics|TODO|FIXME|HACK|console\.|NEXT_PUBLIC|wa.me|whatsapp|instagram|email|address|site_settings|materials|analytics_events|home_banners|home_categories|home_promo_cards|home_promotions|customers|page_views|whatsapp_clicks" app components lib data docs middleware.ts .env.example -S --glob '!node_modules'
npm run lint
npm run build
```

Resultados de checks:

- `npm run lint`: terminó con 0 errores y 3 warnings existentes.
- `npm run build`: falló por descarga de Google Fonts en `next/font` desde `app/layout.tsx`; el fallo no está relacionado con este documento.
