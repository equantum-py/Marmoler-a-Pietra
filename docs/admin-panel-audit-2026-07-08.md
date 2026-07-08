# Auditoría completa del panel administrativo - Marmolería Pietra

Fecha: 2026-07-08  
Alcance: exclusivamente `/admin`, código fuente, APIs, Supabase y arquitectura administrativa.

## 1. Resumen ejecutivo

El panel administrativo no está listo para producción operativa completa. El estado real es mixto: existe autenticación real con Supabase cuando las variables están configuradas, pero también existe un modo fallback local que deja `/admin` accesible sin Supabase; algunos módulos hacen CRUD real contra Supabase REST, otros son pantallas mock, y el Sprint 0 de CRM no quedó conectado al panel solicitado.

Estimación global de terminación real del panel administrativo: **45%**.

- **Funcional real/parcial:** login Supabase, dashboard basado en `analytics_events`, materiales, banners home, categorías home, banners pequeños, promociones, logos de configuración.
- **Mock/incompleto:** proyectos, leads, SEO, home builder general.
- **No implementado en la ruta solicitada:** `/admin/crm-test` no existe en el repositorio.
- **Riesgo crítico:** las políticas documentadas permiten a cualquier usuario Supabase autenticado administrar materiales si puede iniciar sesión; no hay modelo de roles ni claims admin.

## 2. Verificación del panel en producción

Se verificó `https://marmoleriapietra.com/admin`, que redirige a `/admin/login`. La página renderiza navegación de admin y formulario de acceso, con el mensaje de que Supabase Auth protege `/admin` cuando las variables están configuradas. Sin credenciales válidas no se puede confirmar persistencia real en producción desde la interfaz, por lo que la auditoría funcional profunda se basa en el contraste entre rutas visibles, código fuente y scripts SQL.

`/admin/leads` y `/admin/crm-test` no pudieron auditarse en sesión autenticada por falta de credenciales. En el repositorio, `/admin/leads` sí existe pero es mock; `/admin/crm-test` no existe.

## 3. Estado real por módulo

| Módulo | Estado real | Evidencia técnica | Conclusión |
|---|---:|---|---|
| Login | Parcial real | Usa Supabase password grant y cookies httpOnly; sin Supabase configurado devuelve usuario mock/fallback. | Login real solo si Supabase está configurado; sin Supabase, es simulado/fallback. |
| Dashboard | Parcial real | Consulta `analytics_events` con token admin y calcula métricas en memoria. | Los números provienen de Supabase si existe tabla/políticas; si no, quedan en cero. |
| Materiales | Parcial funcional | CRUD contra `materials`, fallback local de lectura, validaciones básicas. | Puede administrar catálogo real, pero con riesgos de permisos, fallback y falta de delete real. |
| Proyectos | Mock | Usa `adminProjects` de `data/admin.ts`; no hay acciones, DB ni formularios. | No está terminado; estimado 10%. |
| Banners | Parcial funcional | CRUD contra `home_banners`, público lee `home_banners` publicados/activos. | Controla contenido público si la tabla existe y RLS lo permite. |
| Banners pequeños | Parcial funcional | CRUD contra `home_promo_cards`; público lee `home_promo_cards`. | Controla parte de la home si DB existe. |
| Promociones | Parcial funcional | CRUD contra `home_promotions`; soporta media_type imagen/video. | Control real parcial. |
| Configuración | Muy parcial | Solo guarda `logo_desktop` y `logo_mobile` en `site_settings`. | WhatsApp, contacto, redes, branding amplio y SEO siguen hardcodeados/parciales. |
| Leads | Mock | Usa `adminLeads` local; filtros visuales no filtran. | No gestiona leads reales. |
| CRM `/admin/crm-test` | No implementado | No existe ruta en `app/admin`; SQL de Sprint 0 existe pero tracker usa otra tabla. | Sprint 0 no quedó conectado al panel solicitado. |
| SEO | Mock | Usa `seoPages` local; botón sin acción. | No edita SEO real. |
| Home builder | Mock/estado visual | Usa `homeSections` local. | Es tablero descriptivo, no builder operativo. |

## 4. Login, autenticación y autorización

### Hallazgos

- El login usa el endpoint de Supabase Auth `/token?grant_type=password`, guarda access token y refresh token en cookies httpOnly con `sameSite=lax` y `secure` en producción.
- El middleware protege `/admin/:path*` solo si existe configuración Supabase. Si no existe URL o anon key, deja pasar cualquier ruta de admin.
- `getAdminUser()` retorna un usuario mock cuando Supabase no está configurado.
- No existe autorización por rol, email, claim o tabla de administradores.
- No hay recuperación o renovación automática de sesión con refresh token. Si el access token expira, middleware redirige a login y borra cookies.
- Logout borra cookies locales, pero no revoca sesión/token en Supabase Auth.

### Respuesta directa

**¿Es un login real o simulado?**  
Es **real solo cuando Supabase está configurado**. En ausencia de configuración Supabase, el panel opera en modo fallback con usuario mock y sin protección efectiva de rutas.

## 5. Dashboard

### Hallazgos

- El dashboard llama `getAnalyticsDashboard()`, exige `requireAdminUser()` y lee hasta 5.000 eventos de `analytics_events` con filtros por fecha.
- Las métricas se calculan en memoria: page views, visitantes únicos, clicks WhatsApp, tasa de conversión, dispositivos, referrers, top pages y eventos recientes.
- El tracker público envía `page_view` y `whatsapp_click` a `/api/analytics`; excluye `/admin`, `/api` y `/_next`.
- La API `/api/analytics` inserta con anon key en `analytics_events`; si falla Supabase, responde 200 con `ok:false`, lo que puede ocultar fallos de medición.
- El SQL de CRM Sprint 0 crea `customers`, `page_views` y `whatsapp_clicks`, pero el dashboard actual no consulta esas tablas.

### Respuesta directa

**¿Los números provienen de Supabase o están simulados?**  
Provienen de Supabase **si** la tabla `analytics_events` existe, RLS permite lectura autenticada y el tracker puede insertar. No hay mocks numéricos en el dashboard; si no hay configuración/token, devuelve ceros.

## 6. Materiales

### Hallazgos funcionales

- Listado lee `materials` desde Supabase; si falla, cae a catálogo local.
- Crear/editar valida `name`, `slug`, `category`, `short_description` y `long_description`.
- Duplicar crea copia con slug `-copia` y estado `Borrador`.
- Archivar hace PATCH `status: Archivado`; no hay eliminación física.
- Imágenes se gestionan como URLs/campos; hay uploader hacia Storage mediante `/admin/api/media/upload`.
- Categorías son enum fijo de materiales, no relación con una tabla de categorías de catálogo.

### Respuesta directa

**¿Sirve para administrar un catálogo real?**  
Sí, **parcialmente**. Puede operar un catálogo real de materiales si Supabase está correctamente configurado, pero no tiene control de roles, no hay delete real, no hay integridad referencial para relacionados/categorías, y el fallback local puede ocultar problemas de conexión.

## 7. Proyectos

### Hallazgos

- `/admin/proyectos` importa `adminProjects` desde `data/admin.ts`.
- Los botones Nuevo, Editar, Ver proyecto, Duplicar y Archivar no tienen rutas ni server actions.
- No hay tabla SQL de proyectos ni API administrativa asociada.

### Respuesta directa

**¿Qué porcentaje está realmente terminado?**  
Aproximadamente **10%**: solo listado visual mock.

## 8. Banners, categorías, banners pequeños y promociones

### Banners Home

- Admin lista y hace CRUD sobre `home_banners`.
- Público lee `home_banners` con filtros `is_active=true`, `status=published` y orden.
- El formulario maneja imágenes desktop/mobile, CTA y orden; no se evidenció soporte de video en banners home.

### Banners pequeños

- Admin gestiona `home_promo_cards`.
- Público lee `home_promo_cards` publicados.

### Promociones

- Admin gestiona `home_promotions`.
- Formulario incluye `media_type` imagen/video, media desktop/mobile, estado, placement, orden y CTA.
- Público lee promociones por placement y estado published.

### Respuesta directa

**¿Controla realmente el contenido mostrado en la web?**  
Sí, **para las piezas conectadas** (`home_banners`, `home_promo_cards`, `home_promotions`, `home_categories`) siempre que existan tablas/RLS en Supabase. No hay SQL versionado en el repo para estas tablas, por lo que el despliegue es frágil y difícil de reproducir.

## 9. Configuración

### Editable actualmente

- `logo_desktop`
- `logo_mobile`

### Parcialmente leído por la web

- `site_settings` puede incluir `instagram`, y el navbar lo consulta junto con logos.

### Hardcodeado o no editable desde admin

- WhatsApp principal y mensajes comerciales.
- Email, dirección y datos de contacto completos.
- Redes sociales completas.
- Branding global más allá de logos.
- SEO global.
- Colores/tema.

## 10. Leads `/admin/leads`

### Hallazgos

- Usa `adminLeads` local.
- Los filtros son chips estáticos, no controles funcionales.
- No hay persistencia, server action, tabla o API de leads.
- Acciones Abrir, WhatsApp y Cerrar no hacen nada.

### Respuesta directa

- **Datos reales:** no.
- **Datos mock:** sí.
- **Filtros:** visuales/no funcionales.
- **Persistencia:** inexistente.
- **Funcionamiento:** solo maqueta.

## 11. CRM `/admin/crm-test`

### Hallazgos

- No existe ningún archivo/ruta bajo `app/admin` que implemente `/admin/crm-test`.
- Existe SQL de Sprint 0 para `customers`, `page_views` y `whatsapp_clicks`.
- El tracker y dashboard actuales no usan esas tablas; usan `analytics_events`.

### Respuesta directa

**¿El Sprint 0 realmente quedó conectado?**  
No al panel solicitado. El SQL existe, pero la interfaz `/admin/crm-test` no existe y el sistema activo de analytics usa otra tabla (`analytics_events`).

## 12. Mapa de APIs utilizadas por el panel

| Ruta/origen | Método | Función | Tabla/recurso | Auth | Validaciones | Errores | Estado |
|---|---|---|---|---|---|---|---|
| Supabase Auth `/token?grant_type=password` | POST | Login admin | Supabase Auth | anon key + email/password | email/password requeridos | mensaje genérico | Real parcial |
| Supabase Auth `/user` | GET | Validar sesión | Supabase Auth | access token | token presente | redirect/login | Real parcial |
| `/materials` | GET | Listar materiales | materials | access token o anon fallback | ninguna en read | fallback local | Real parcial |
| `/materials` | POST | Crear material | materials | access token | requeridos básicos | throw sin UI granular | Real parcial |
| `/materials?id=eq.*` | PATCH | Editar/archivar material | materials | access token | requeridos básicos en edit | throw sin UI granular | Real parcial |
| `/home_banners` | GET/POST/PATCH | CRUD banners | home_banners | access token | básicas en payload | throw/redirect | Real parcial |
| `/home_categories` | GET/POST/PATCH | CRUD categorías home | home_categories | access token | básicas en payload | throw/redirect | Real parcial |
| `/home_promo_cards` | GET/POST/PATCH | CRUD banners pequeños | home_promo_cards | access token | básicas en payload | throw/redirect | Real parcial |
| `/home_promotions` | GET/POST/PATCH | CRUD promociones | home_promotions | access token | básicas en payload | throw/redirect | Real parcial |
| `/site_settings?id=eq.pietra` | GET | Leer configuración | site_settings | access token o anon | ninguna | null silencioso | Parcial |
| `/site_settings?on_conflict=id` | POST | Guardar logos | site_settings | access token o anon | ninguna de formato | throw | Parcial |
| `/admin/api/media/upload` | POST | Subir archivos a Supabase Storage | bucket `pietra-media` | cookie token + anon key | tipo imagen/video y tamaño | JSON error | Parcial |
| `/api/analytics` | POST | Capturar eventos públicos | analytics_events | anon key | event_type allowlist y strings recortados | responde 200 ante fallos Supabase | Real parcial |
| `/analytics_events` | GET | Dashboard | analytics_events | access token | rango normalizado | throw | Real parcial |

## 13. Base de datos determinada desde el repo

### Tablas con SQL versionado

- `materials`
- `customers`
- `page_views`
- `whatsapp_clicks`

### Tablas usadas por código pero sin SQL versionado completo en el repo auditado

- `analytics_events`
- `home_banners`
- `home_categories`
- `home_promo_cards`
- `home_promotions`
- `site_settings`

### Relaciones e índices

- `materials`: índices por `status`, `featured`, `sort_order`; no tiene FKs.
- `customers`: índice por `visitor_id` y `created_at`.
- `page_views`: FK `customer_id` a `customers` con cascade; índices por customer y fecha.
- `whatsapp_clicks`: FK `customer_id` a `customers` con cascade; índices por customer y fecha.

### Riesgos de DB

- Falta SQL reproducible para varias tablas críticas del admin.
- `materials.related_slugs` es array de textos sin FK.
- Categoría de materiales es texto con check, no tabla normalizada.
- Duplicación conceptual entre `analytics_events` y Sprint 0 (`page_views`/`whatsapp_clicks`).
- Políticas demasiado amplias para `authenticated`.

## 14. Auditoría de código y deuda técnica

Hallazgos principales:

- Páginas mock: proyectos, leads, SEO, home builder.
- Ruta solicitada `/admin/crm-test` ausente.
- Código de fallback local puede ocultar errores operativos.
- `TODO/FIXME`: no se encontraron coincidencias significativas con `rg` en el alcance auditado; la deuda está en mocks declarados y funcionalidades no conectadas.
- Botones sin acción real en módulos mock.
- No hay paginación en listados reales del admin.
- No hay manejo granular de errores por campo en varios CRUD.
- No hay pruebas automatizadas en `package.json`.

## 15. Seguridad

### Vulnerabilidades y riesgos

| Severidad | Hallazgo | Impacto | Solución |
|---|---|---|---|
| CRÍTICO | Sin roles admin; policies para `authenticated` en materiales | Cualquier usuario autenticado podría administrar datos si obtiene cuenta | Implementar tabla `admin_users` o custom claims y políticas RLS por rol |
| CRÍTICO | Middleware deja pasar `/admin` si Supabase no está configurado | Exposición completa del panel fallback en entornos mal configurados | En producción, fallar cerrado; bloquear admin sin env obligatoria |
| ALTO | No hay refresh de sesión | Expiraciones bruscas y mala UX; refresh token sin uso | Implementar refresh flow o usar Supabase SSR client |
| ALTO | Logout no revoca sesión Supabase | Token podría seguir válido hasta expirar | Llamar endpoint signout/revocar sesión |
| ALTO | `/api/analytics` permite escritura pública con anon key | Spam/contaminación de métricas | Rate limit, captcha invisible opcional, RLS/policies específicas, validación de origen |
| ALTO | SQL no versionado para tablas críticas | Ambientes inconsistentes y errores de producción | Crear migraciones para todas las tablas usadas |
| MEDIO | Upload valida tamaño/tipo, pero depende de token encontrado por nombres múltiples | Riesgo de bypass/confusión de auth | Usar un único cookie name oficial y validar usuario admin |
| MEDIO | Mensajes de error Supabase podrían exponerse en API upload | Filtración de detalles internos | Normalizar errores externos |
| MEDIO | Sin CSRF explícito en server actions | Riesgo en acciones mutativas con cookies sameSite lax | Añadir CSRF token o validar Origin/Referer en acciones sensibles |

## 16. UX

- Navegación clara en sidebar, pero muestra módulos mock como si fueran operativos.
- Las tablas tienen estados vacíos en módulos reales, pero módulos mock no aclaran suficientemente que los botones no funcionan.
- Filtros de Leads aparentan ser funcionales pero son texto estático.
- Faltan loaders/skeletons en mutaciones y estados de guardado consistentes.
- Errores de Supabase no se traducen a mensajes accionables para usuario admin.
- En mobile, tablas anchas probablemente requieran scroll horizontal; no hay experiencia específica de cards móviles.
- Dashboard tiene auto-refresh cada 10s, pero no muestra último estado de sincronización/error.

## 17. Rendimiento

- Dashboard trae hasta 5.000 eventos y calcula agregaciones en Node; esto escalará mal.
- Listados reales no tienen paginación ni búsqueda server-side.
- `cache: no-store` en todas las lecturas evita caché; correcto para admin, pero aumenta latencia.
- Analytics podría beneficiarse de vistas/materialized views o RPC agregadas por rango.
- Revalidaciones son amplias y no siempre cubren rutas públicas afectadas.

## 18. Riesgos para producción

### Críticos

1. Admin no falla cerrado si faltan variables Supabase.
2. Ausencia de roles admin/RLS granular.
3. Tablas críticas usadas por código no tienen migraciones documentadas/versionadas.

### Altos

1. Leads y proyectos no administran datos reales.
2. CRM Sprint 0 no conectado a `/admin/crm-test`.
3. Dashboard depende de `analytics_events`, mientras el SQL CRM documenta otro modelo.
4. Acciones de analytics públicas pueden contaminar métricas.

### Medios

1. Sin paginación/búsqueda real.
2. Fallback local oculta errores.
3. Errores UX poco accionables.
4. Configuración limitada solo a logos.

### Bajos

1. Botones mock generan expectativas falsas.
2. Falta etiquetado visual consistente entre “mock”, “beta” y “real”.

## 19. Roadmap priorizado

### Quick wins (< 2 horas)

1. Ocultar o marcar claramente módulos mock: Proyectos, Leads, SEO, Home Builder y CRM.
2. Hacer que producción falle cerrado si faltan `NEXT_PUBLIC_SUPABASE_URL` o `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Agregar página 404 o placeholder explícito para `/admin/crm-test` con estado real.
4. Cambiar `/api/analytics` para devolver errores 5xx ante fallos de Supabase en staging/admin debug.
5. Documentar tabla `analytics_events` en SQL.

### Corto plazo

1. Implementar roles admin con RLS por claim/email/tabla.
2. Crear migraciones para `home_banners`, `home_categories`, `home_promo_cards`, `home_promotions`, `site_settings` y `analytics_events`.
3. Añadir paginación y búsqueda a Materiales.
4. Convertir Leads en módulo real con tabla `leads` o conectar a `whatsapp_clicks`/CRM.
5. Implementar refresh token y revocación de logout.

### Mediano plazo

1. Unificar analytics: elegir `analytics_events` o el modelo normalizado `customers/page_views/whatsapp_clicks`.
2. Implementar `/admin/crm-test` real con customers, page_views y whatsapp_clicks.
3. Crear CRUD real de Proyectos con galerías.
4. Ampliar Configuración a WhatsApp, contacto, redes, branding y SEO global.
5. Agregar tests de server actions, API routes y componentes críticos.

### Largo plazo

1. Auditoría completa de RLS y migraciones automáticas CI/CD.
2. Observabilidad: logs estructurados, alertas de error de Supabase y métricas de uso del admin.
3. Workflow editorial: borrador, revisión, publicación, auditoría de cambios.
4. Gestión de usuarios/roles desde admin.
5. Optimización de dashboard con agregaciones materializadas.

## 20. Recomendación final

- **¿El panel está listo para producción?** No para operación administrativa completa. Solo algunos módulos están parcialmente listos.
- **¿Puede operar el negocio hoy?** Puede operar parcialmente el catálogo y ciertas piezas de home si Supabase está bien configurado; no puede operar leads, CRM, proyectos o SEO real.
- **Porcentaje terminado estimado:** 45% global.
- **Módulos a desarrollar antes de nuevas funcionalidades:** Seguridad/roles/RLS, migraciones DB faltantes, Leads real, CRM real, Proyectos real, Configuración completa.

## 21. Comandos y verificaciones ejecutadas

- `find .. -name AGENTS.md -print`
- `git status --short`
- `find app lib components data docs -maxdepth 4 -type f | sort`
- `rg -n "TODO|FIXME|mock|hardcoded|supabase|admin|crm|leads|Service Role|service_role|RLS|page_views|whatsapp_clicks|customers" -S . --glob '!node_modules' --glob '!dist' --glob '!build'`
- `rg -n "analytics_events|home_banners|home_promo_cards|home_promotions|home_categories|site_settings|materials|storage/v1|api/analytics|admin/api" app lib components docs .env.example -S`
- Lectura directa con `sed` de archivos críticos bajo `app/admin`, `lib/supabase`, `lib/analytics`, `docs` y `middleware.ts`.
- `npm run lint`
- `npm run build`
- Verificación web de `https://marmoleriapietra.com/admin`, `/admin/leads` y `/admin/crm-test` sin credenciales.
