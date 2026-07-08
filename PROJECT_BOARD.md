# PROJECT_BOARD.md - Master Implementation Plan

Proyecto: Panel Administrativo Marmolería Pietra  
Fase: Producción  
Fuente única de planificación: `ADMIN_STATUS.md`  
Objetivo: completar los módulos existentes y llevar el panel administrativo a operación real del negocio.

---

## 1. Reglas de ejecución

- No crear módulos nuevos antes de terminar los existentes.
- No crear CRM nuevo.
- No crear Analytics nuevo.
- No crear Pipeline.
- No crear pantallas nuevas fuera de las necesarias para completar módulos existentes ya declarados en el panel.
- Priorizar seguridad, persistencia, migraciones, CRUD real, configuración administrable y operabilidad.
- Todo trabajo debe cerrar una brecha documentada en `ADMIN_STATUS.md`.

---

## 2. Módulos reales del proyecto

### 2.1 Login

| Campo | Detalle |
|---|---|
| Estado | Pendiente de producción |
| Prioridad | CRÍTICA |
| Archivos | `middleware.ts`, `lib/supabase/auth.ts`, `lib/supabase/config.ts`, `app/admin/login/actions.ts`, `app/admin/login/page.tsx`, `components/admin/login-form.tsx`, `docs/supabase-materials.sql` |
| Problemas | Fallback abierto sin Supabase, sin roles admin, sin refresh token operativo, logout sin revocar sesión Supabase, RLS amplia para usuarios authenticated. |
| Tiempo estimado | 2 días |
| Resultado esperado | Acceso admin cerrado, roles validados, sesión renovable, logout real, policies restringidas. |

### 2.2 Dashboard

| Campo | Detalle |
|---|---|
| Estado | Parcial |
| Prioridad | ALTA |
| Archivos | `app/admin/page.tsx`, `lib/analytics/admin-analytics.ts`, `components/admin/analytics-live-refresh.tsx`, `app/api/analytics/route.ts` |
| APIs | `/analytics_events`, `/api/analytics` |
| Tablas | `analytics_events` |
| Problemas | Tabla sin SQL versionado, lectura de hasta 5000 eventos en memoria, endpoint público sin rate limit, errores de insert devueltos como HTTP 200. |
| Tiempo estimado | 2 días |
| Resultado esperado | Migración versionada, policies, índices, errores detectables, dashboard estable sin rediseñar Analytics. |

### 2.3 Materiales

| Campo | Detalle |
|---|---|
| Estado | Parcial |
| Prioridad | ALTA |
| CRUD Crear | Existe; requiere fortalecer validaciones y errores. |
| CRUD Editar | Existe; requiere validar slug único y formato. |
| CRUD Eliminar | No existe delete físico; existe archivado. Mantener soft delete y agregar confirmaciones. |
| Galería | Existe vía campos y uploader; requiere manejo operativo completo. |
| SEO | Campos existen; falta validación y consistencia. |
| Slugs | Campo existe; falta control robusto de duplicados y formato. |
| Categorías | Enum fijo; falta estrategia de administración o cierre técnico de catálogo permitido. |
| Storage | Usa `pietra-media`; requiere policies y validación admin centralizada. |
| Archivos | `app/admin/materiales/page.tsx`, `app/admin/materiales/actions.ts`, `app/admin/materiales/nuevo/page.tsx`, `app/admin/materiales/[id]/editar/page.tsx`, `components/admin/material-form.tsx`, `components/admin/admin-image-uploader.tsx`, `components/admin/admin-gallery-uploader.tsx`, `lib/supabase/materials.ts`, `lib/supabase/storage.ts`, `docs/supabase-materials.sql` |
| APIs | `/materials`, `/admin/api/media/upload` |
| Tablas | `materials` |
| Problemas encontrados | Sin búsqueda, sin paginación, fallback local oculta errores, sin confirmaciones, validaciones parciales. |
| Tiempo estimado | 3 días |
| Resultado esperado | Catálogo operable con búsqueda, paginación, validaciones, confirmaciones, errores claros y storage seguro. |

### 2.4 Proyectos

| Campo | Detalle |
|---|---|
| Estado | MOCK |
| Prioridad | ALTA |
| CRUD Crear | No existe |
| CRUD Editar | No existe |
| CRUD Eliminar | No existe |
| Galería | No existe en admin |
| Destacados | Mock en datos locales |
| Categorías | Mock en datos locales |
| Storage | No conectado |
| Archivos | `app/admin/proyectos/page.tsx`, `data/admin.ts`, `data/project-works.ts`, `app/proyectos/page.tsx`, `components/project-work-gallery.tsx` |
| APIs | No existen |
| Tablas | No existen |
| Problemas encontrados | Botones sin acción, sin tabla, sin server actions, sin formularios, sin persistencia. |
| Tiempo estimado | 5 días |
| Resultado esperado | Módulo existente de Proyectos convertido a CRUD real con galería y publicación. |

### 2.5 Banners

| Campo | Detalle |
|---|---|
| Estado | Parcial |
| Prioridad | ALTA |
| Alcance | Banners Home, Banners pequeños, Promociones, Categorías Home. |
| Archivos | `app/admin/banners/*`, `app/admin/banners-pequenos/*`, `app/admin/promociones/*`, `app/admin/categorias/*`, `components/admin/home-banner-form.tsx`, `components/admin/home-promo-card-form.tsx`, `components/admin/home-promotion-form.tsx`, `components/admin/home-category-form.tsx`, `lib/banners/public-banners.ts`, `lib/promo-cards/public-promo-cards.ts`, `lib/promotions/public-promotions.ts`, `lib/categories/public-categories.ts` |
| APIs | `/home_banners`, `/home_promo_cards`, `/home_promotions`, `/home_categories`, `/admin/api/media/upload` |
| Tablas | `home_banners`, `home_promo_cards`, `home_promotions`, `home_categories` |
| Storage | `pietra-media` |
| Problemas | No hay SQL versionado, no hay policies versionadas, sin búsqueda/paginación, sin confirmaciones, validaciones parciales. |
| Tiempo estimado | 4 días |
| Resultado esperado | CMS visual reproducible con migraciones, RLS, validaciones, soft delete, orden y visibilidad pública confiable. |

### 2.6 Leads

| Campo | Detalle |
|---|---|
| Estado | MOCK |
| Prioridad | CRÍTICA |
| Archivos | `app/admin/leads/page.tsx`, `data/admin.ts` |
| APIs | No existen |
| Tablas | No existen |
| Problemas | Datos mock, filtros visuales, acciones sin funcionalidad, sin persistencia, sin estados reales, sin responsables reales. |
| Tiempo estimado | 4 días |
| Resultado esperado | Bandeja operativa de leads existente convertida a módulo real con filtros, estados, responsables y persistencia. |

### 2.7 SEO

| Campo | Detalle |
|---|---|
| Estado | MOCK |
| Prioridad | MEDIA |
| Archivos | `app/admin/seo/page.tsx`, `data/admin.ts`, `app/layout.tsx`, páginas públicas con metadata |
| APIs | No existen |
| Tablas | No existen |
| Problemas | Tabla visual sin edición real, SEO global hardcodeado, sin persistencia. |
| Tiempo estimado | 3 días |
| Resultado esperado | Administración real de metadatos existentes sin agregar nuevas funcionalidades de marketing. |

### 2.8 Configuración general

| Campo | Detalle |
|---|---|
| Estado | Parcial |
| Prioridad | CRÍTICA |
| Archivos | `app/admin/configuracion/page.tsx`, `app/admin/configuracion/actions.ts`, `components/navbar.tsx`, `lib/site/public-settings.ts`, `lib/whatsapp.ts`, `app/layout.tsx`, `data/materials.ts` |
| APIs | `/site_settings`, `/admin/api/media/upload` |
| Tablas | `site_settings` |
| Storage | `pietra-media` |
| Problemas | Solo edita logos; WhatsApp, email, Instagram fallback, Facebook, colores, SEO, dirección, horarios y textos siguen hardcodeados o no editables. Actions no usan `requireAdminUser()`. |
| Tiempo estimado | 5 días |
| Resultado esperado | Configuración base del negocio administrable desde el panel con settings persistentes y consumo público consistente. |

### 2.9 Home admin

| Campo | Detalle |
|---|---|
| Estado | MOCK |
| Prioridad | MEDIA |
| Archivos | `app/admin/home/page.tsx`, `data/admin.ts` |
| APIs | No directas |
| Tablas | Derivadas de módulos existentes: `home_banners`, `home_categories`, `home_promo_cards`, `home_promotions` |
| Problemas | Solo muestra tarjetas de estado desde `homeSections`; no controla secciones. |
| Tiempo estimado | 2 días |
| Resultado esperado | Pantalla de home alineada a módulos reales existentes sin crear nuevo builder. |

---

## 3. Configuración general hardcodeada a migrar al panel

| Elemento | Estado actual | Archivos | Prioridad | Acción |
|---|---|---|---|---|
| WhatsApp | Hardcodeado | `lib/whatsapp.ts`, `components/floating-whatsapp.tsx`, páginas públicas | CRÍTICA | Migrar a `site_settings`. |
| Email | Type existe, UI no edita | `app/admin/configuracion/actions.ts`, páginas públicas | ALTA | Agregar campo editable y consumo público. |
| Instagram | Parcial con fallback hardcodeado | `components/navbar.tsx` | ALTA | Persistir y eliminar fallback rígido. |
| Facebook | No administrado | Configuración general | MEDIA | Agregar campo en settings si existe uso público. |
| Logo | Parcial | `app/admin/configuracion/*`, `components/navbar.tsx` | ALTA | Mantener y reforzar validación/storage. |
| Colores | Hardcodeado | estilos/Tailwind | BAJA | Documentar como tema técnico; no bloquear producción inicial. |
| SEO | Mock/hardcodeado | `app/layout.tsx`, `app/admin/seo/page.tsx` | MEDIA | Persistir metadata administrable. |
| Dirección | Type existe, UI no edita | `app/admin/configuracion/actions.ts` | ALTA | Agregar campo editable. |
| Horarios | No administrado | páginas públicas/datos | MEDIA | Agregar a settings si existe texto público. |
| Textos | Hardcodeados/parciales | páginas públicas, `data/admin.ts` | MEDIA | Migrar solo textos ya representados por módulos existentes. |

---

## 4. Backlog profesional

| ID | Título | Descripción | Prioridad | Tiempo estimado | Archivos afectados | Dependencias | Responsable | Estado |
|---|---|---|---|---|---|---|---|---|
| ADM-001 | Cerrar acceso admin en producción | Eliminar fallback abierto del middleware y auth cuando faltan variables Supabase. | CRÍTICA | 4 h | `middleware.ts`, `lib/supabase/auth.ts`, `lib/supabase/config.ts` | Ninguna | Codex | Pendiente |
| ADM-002 | Implementar roles admin y RLS restringida | Restringir acceso y policies a usuarios admin reales. | CRÍTICA | 12 h | `docs/supabase-materials.sql`, nuevas migraciones RLS, `lib/supabase/auth.ts` | ADM-001 | Codex | Pendiente |
| ADM-003 | Implementar refresh y logout real | Usar refresh token para recuperar sesión y revocar logout en Supabase. | CRÍTICA | 8 h | `lib/supabase/auth.ts`, `app/admin/login/actions.ts`, `middleware.ts` | ADM-001 | Codex | Pendiente |
| ADM-004 | Crear migración de `site_settings` | Versionar tabla, índices y policies para configuración general. | CRÍTICA | 6 h | nueva migración SQL, `app/admin/configuracion/actions.ts` | ADM-002 | Codex | Pendiente |
| ADM-005 | Completar Configuración General | Agregar WhatsApp, email, redes, dirección, horarios y SEO base al panel existente. | CRÍTICA | 20 h | `app/admin/configuracion/page.tsx`, `actions.ts`, `lib/site/public-settings.ts`, `components/navbar.tsx`, `lib/whatsapp.ts`, `app/layout.tsx` | ADM-004 | Codex + Antigravity | Pendiente |
| ADM-006 | Centralizar auth en Configuración | Reemplazar lectura manual de múltiples cookies por `requireAdminUser()` y token oficial. | CRÍTICA | 4 h | `app/admin/configuracion/actions.ts` | ADM-001 | Codex | Pendiente |
| ADM-007 | Crear migración `analytics_events` | Versionar tabla usada por Dashboard y tracker actual. | ALTA | 6 h | nueva migración SQL, `app/api/analytics/route.ts`, `lib/analytics/admin-analytics.ts` | ADM-002 | Codex | Pendiente |
| ADM-008 | Endurecer API analytics actual | Mantener Analytics existente, agregar rate limit básico, errores HTTP correctos y validación de origen. | ALTA | 8 h | `app/api/analytics/route.ts` | ADM-007 | Codex | Pendiente |
| ADM-009 | Optimizar Dashboard existente | Evitar carga excesiva, mejorar estados de error y mantener filtros actuales. | ALTA | 8 h | `app/admin/page.tsx`, `lib/analytics/admin-analytics.ts`, `components/admin/analytics-live-refresh.tsx` | ADM-007 | Codex | Pendiente |
| ADM-010 | Crear migraciones Home CMS | Versionar `home_banners`, `home_categories`, `home_promo_cards`, `home_promotions`. | ALTA | 12 h | nuevas migraciones SQL, actions de banners/categorías/promociones | ADM-002 | Codex | Pendiente |
| ADM-011 | Completar Banners/Categorías/Promociones | Validaciones, confirmaciones, soft delete consistente, orden y errores claros. | ALTA | 20 h | `app/admin/banners/*`, `banners-pequenos/*`, `promociones/*`, `categorias/*`, forms admin | ADM-010 | Codex + Antigravity | Pendiente |
| ADM-012 | Endurecer Storage admin | Validar usuario admin centralmente y policies del bucket `pietra-media`. | ALTA | 8 h | `app/admin/api/media/upload/route.ts`, `lib/supabase/storage.ts`, migración/policies storage | ADM-002 | Codex | Pendiente |
| ADM-013 | Mejorar Materiales | Búsqueda, paginación, validaciones, slug único, confirmaciones y errores. | ALTA | 24 h | `app/admin/materiales/*`, `components/admin/material-form.tsx`, `lib/supabase/materials.ts` | ADM-002, ADM-012 | Codex + Antigravity | Pendiente |
| ADM-014 | Crear tabla y actions de Leads | Convertir `app/admin/leads` de mock a persistencia real. | CRÍTICA | 16 h | `app/admin/leads/page.tsx`, nueva migración SQL, nuevas actions/services | ADM-002 | Codex | Pendiente |
| ADM-015 | Completar UI Leads existente | Filtros reales, estados, responsables, acciones abrir/cerrar/WhatsApp. | CRÍTICA | 16 h | `app/admin/leads/page.tsx`, componentes admin existentes | ADM-014 | Codex + Antigravity | Pendiente |
| ADM-016 | Crear persistencia de Proyectos | Tabla, actions y conexión del listado existente. | ALTA | 16 h | `app/admin/proyectos/page.tsx`, nueva migración SQL, `data/project-works.ts` migración de datos | ADM-002, ADM-012 | Codex | Pendiente |
| ADM-017 | Completar CRUD Proyectos | Crear/editar/archivar, galería, destacados, categorías y storage. | ALTA | 24 h | `app/admin/proyectos/page.tsx`, nuevos forms/actions dentro módulo existente | ADM-016 | Codex + Antigravity | Pendiente |
| ADM-018 | Completar SEO existente | Convertir `app/admin/seo` de mock a edición persistente. | MEDIA | 16 h | `app/admin/seo/page.tsx`, `app/layout.tsx`, nueva migración/config SEO | ADM-004 | Codex | Pendiente |
| ADM-019 | Alinear Home admin con módulos reales | Reemplazar estado mock por resumen derivado de módulos existentes. | MEDIA | 8 h | `app/admin/home/page.tsx`, `data/admin.ts`, servicios existentes | ADM-010, ADM-011 | Codex | Pendiente |
| ADM-020 | Agregar paginación y búsqueda reusable | Extender tablas/listados reales sin crear módulo nuevo. | MEDIA | 16 h | `components/admin/admin-table.tsx`, páginas admin de listados | ADM-013, ADM-011 | Codex + Antigravity | Pendiente |
| ADM-021 | Estandarizar errores y estados de carga | Mensajes consistentes en server actions y formularios. | MEDIA | 12 h | forms admin, actions admin, `components/admin/*` | Módulos CRUD | Antigravity + Codex | Pendiente |
| ADM-022 | Crear auditoría de mutaciones | Registrar altas/ediciones/archivados de módulos existentes. | MEDIA | 16 h | nueva tabla `audit_log`, server actions admin | ADM-002 | Codex | Pendiente |
| ADM-023 | Corregir build por fuentes remotas | Evitar fallo por descarga de Google Fonts en build. | MEDIA | 6 h | `app/layout.tsx`, assets/fonts si aplica | Ninguna | Codex | Pendiente |
| ADM-024 | Agregar pruebas mínimas admin | Validar auth, actions críticas y API upload/analytics. | MEDIA | 16 h | `package.json`, tests nuevos, actions/api | Módulos estabilizados | Codex | Pendiente |

---

## 5. Sprints oficiales

### Sprint 1 - Dejar operativo el panel

| Campo | Detalle |
|---|---|
| Objetivo | Cerrar riesgos críticos de acceso, configuración y base de datos mínima. |
| Entregables | ADM-001, ADM-002, ADM-003, ADM-004, ADM-006, ADM-010, ADM-012. |
| Riesgos | Bloqueo de acceso admin por RLS mal configurada; desalineación de schemas existentes en producción. |
| Tiempo | 2 semanas |
| Dependencias | Acceso Supabase y credenciales admin de entorno. |
| Resultado esperado | Panel protegido, Storage protegido, settings versionado y tablas Home CMS versionadas. |

### Sprint 2 - Completar módulos existentes

| Campo | Detalle |
|---|---|
| Objetivo | Convertir módulos mock/parciales principales en operación real. |
| Entregables | ADM-005, ADM-011, ADM-013, ADM-014, ADM-015, ADM-016, ADM-017. |
| Riesgos | Migración de datos locales a Supabase; definición de campos finales para leads/proyectos. |
| Tiempo | 3 semanas |
| Dependencias | Sprint 1 completo. |
| Resultado esperado | Configuración, materiales, banners, leads y proyectos operativos. |

### Sprint 3 - Optimización

| Campo | Detalle |
|---|---|
| Objetivo | Mejorar operabilidad, rendimiento, errores, tablas y build. |
| Entregables | ADM-018, ADM-019, ADM-020, ADM-021, ADM-022, ADM-023, ADM-024. |
| Riesgos | Aumentar alcance de SEO/textos; mantener foco en módulos existentes. |
| Tiempo | 3 semanas |
| Dependencias | Sprint 2 completo. |
| Resultado esperado | Admin usable con volumen real, errores claros, auditoría de cambios, build estable y pruebas base. |

### Sprint 4 - CRM

| Campo | Detalle |
|---|---|
| Objetivo | Conectar lo existente de CRM sin crear pipeline nuevo. |
| Entregables | Conectar `customers`, `page_views`, `whatsapp_clicks` existentes a Leads/Dashboard según el alcance ya documentado. |
| Riesgos | Duplicación con `analytics_events`; no crear CRM nuevo. |
| Tiempo | 2 semanas |
| Dependencias | Leads real de Sprint 2 y Analytics estabilizado. |
| Resultado esperado | Información CRM existente visible/conectada sin módulo nuevo ni pipeline. |

### Sprint 5 - Analytics

| Campo | Detalle |
|---|---|
| Objetivo | Estabilizar Analytics existente después de módulos operativos. |
| Entregables | ADM-007, ADM-008, ADM-009 refinados con datos reales y agregaciones seguras. |
| Riesgos | Alto volumen de eventos; endpoints públicos contaminables. |
| Tiempo | 2 semanas |
| Dependencias | Dashboard actual, migración `analytics_events`, CRM conectado. |
| Resultado esperado | Dashboard confiable, medible y mantenible sin crear Analytics nuevo. |

---

## 6. Matriz de prioridad

| Prioridad | Tareas | Motivo |
|---|---|---|
| CRÍTICA | ADM-001, ADM-002, ADM-003, ADM-004, ADM-005, ADM-006, ADM-014, ADM-015 | Sin estas tareas el panel no es seguro o no permite operar configuración/leads del negocio. |
| ALTA | ADM-007, ADM-008, ADM-009, ADM-010, ADM-011, ADM-012, ADM-013, ADM-016, ADM-017 | Convierten módulos existentes en funciones reales y reproducibles. |
| MEDIA | ADM-018, ADM-019, ADM-020, ADM-021, ADM-022, ADM-023, ADM-024 | Mejoran operación, mantenibilidad, build, UX y control. |
| BAJA | Tema visual/colores administrables | No bloquea operación inicial del negocio. |

---

## 7. División del trabajo entre IA

| Responsable | Áreas | Tareas asignadas |
|---|---|---|
| Claude | Arquitectura, documentación, planificación, análisis | Refinar decisiones de schema, validar coherencia de roadmap, documentar criterios de aceptación por sprint. |
| Codex | Implementación, refactor, correcciones, testing, Git | ADM-001 a ADM-024 según dependencias; migraciones, server actions, APIs, tests y commits. |
| Antigravity | UX, UI, responsive, componentes, animaciones | Formularios, estados vacíos, confirmaciones, tablas responsivas, mensajes de error, loaders y mejoras visuales de módulos existentes. |

---

## 8. Roadmap aproximado de 12 semanas

| Semana | Objetivos | Módulos | Responsable | Entregables |
|---|---|---|---|---|
| 1 | Cerrar acceso y modelo admin | Login, Seguridad | Codex | ADM-001, avance ADM-002 |
| 2 | Terminar auth, RLS base, settings schema y storage | Login, Configuración, Storage | Codex | ADM-002, ADM-003, ADM-004, ADM-006, ADM-012 |
| 3 | Migraciones Home CMS y configuración general | Banners, Configuración | Codex + Antigravity | ADM-010, inicio ADM-005 |
| 4 | Completar Configuración y Banners | Configuración, Banners | Codex + Antigravity | ADM-005, ADM-011 parcial |
| 5 | Completar Materiales | Materiales | Codex + Antigravity | ADM-013 |
| 6 | Implementar Leads real | Leads | Codex + Antigravity | ADM-014, ADM-015 parcial |
| 7 | Cerrar Leads e iniciar Proyectos | Leads, Proyectos | Codex + Antigravity | ADM-015, ADM-016 |
| 8 | Completar Proyectos | Proyectos | Codex + Antigravity | ADM-017 |
| 9 | SEO existente, Home admin y tablas reutilizables | SEO, Home, UI tables | Codex + Antigravity | ADM-018, ADM-019, ADM-020 |
| 10 | Errores, auditoría de mutaciones, build | Core admin | Codex + Antigravity | ADM-021, ADM-022, ADM-023 |
| 11 | CRM existente conectado | Leads/Dashboard/CRM data | Codex + Claude | Conexión de `customers`, `page_views`, `whatsapp_clicks` sin pipeline nuevo |
| 12 | Analytics existente estabilizado y pruebas | Dashboard, Analytics, QA | Codex | ADM-007, ADM-008, ADM-009, ADM-024 |

---

## 9. Siguiente desarrollo inmediato

### Desarrollo inmediato: ADM-001 - Cerrar acceso admin en producción

| Campo | Detalle |
|---|---|
| Por qué | Es el bloqueo de producción más crítico: `ADMIN_STATUS.md` identifica que el middleware deja pasar `/admin/*` cuando faltan variables Supabase y que `getAdminUser()` devuelve usuario mock sin Supabase. Ningún módulo operativo debe avanzar sobre un panel con acceso fallback. |
| Archivos | `middleware.ts`, `lib/supabase/auth.ts`, `lib/supabase/config.ts`, `app/admin/login/actions.ts` |
| APIs | Supabase Auth `${supabaseAuthUrl}/user`, `${supabaseAuthUrl}/token?grant_type=password` |
| Tablas | Ninguna para ADM-001; ADM-002 incorporará roles/RLS. |
| Componentes | `components/admin/login-form.tsx`, `components/admin/admin-topbar.tsx` para validar impacto UX de login/logout. |
| Dependencias | Variables `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, usuario admin Supabase válido. |
| Tiempo estimado | 4 horas |
| Resultado esperado | En producción, `/admin` queda bloqueado si Supabase no está configurado o si no hay sesión válida; se elimina el acceso mock como comportamiento productivo. |

