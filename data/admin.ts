import { commercialBanners, projects } from '@/data/site';
import { featuredMaterials, materials } from '@/data/materials';

export type AdminStatus =
  | 'Publicado'
  | 'Borrador'
  | 'Destacado'
  | 'Sin imagen'
  | 'Falta SEO'
  | 'Activo'
  | 'Programado'
  | 'Vencido'
  | 'Nuevo'
  | 'Contactado'
  | 'Cotización enviada'
  | 'En seguimiento'
  | 'Cerrado'
  | 'Perdido'
  | 'Completo'
  | 'Mejorar'
  | 'Falta description'
  | 'Noindex'
  | 'Pendiente'
  | 'Inactivo'
  | 'Archivado';

export const dashboardStats = [
  {
    label: 'Materiales publicados',
    value: materials.length.toString(),
    detail: `${featuredMaterials.length} destacados en Home`,
    trend: '+4 este mes',
  },
  {
    label: 'Proyectos cargados',
    value: projects.length.toString(),
    detail: '4 listos para destacar',
    trend: '+2 borradores',
  },
  {
    label: 'Leads recibidos',
    value: '38',
    detail: '12 pendientes de respuesta',
    trend: '+18% semanal',
  },
  {
    label: 'Banners activos',
    value: '3',
    detail: '1 programado para Home',
    trend: 'Sin vencidos críticos',
  },
  { label: 'Páginas con SEO', value: '7', detail: '2 necesitan mejora', trend: '82% completo' },
  {
    label: 'Clicks estimados a WhatsApp',
    value: '214',
    detail: 'Principal conversión del sitio',
    trend: '+31% mensual',
  },
];

export const dashboardAlerts = [
  {
    title: 'Materiales sin imagen',
    description: 'Revisar nuevas altas antes de publicar.',
    status: 'Pendiente' as const,
  },
  {
    title: 'Banners vencidos',
    description: 'Hay campañas que deberían archivarse.',
    status: 'Vencido' as const,
  },
  {
    title: 'Proyectos en borrador',
    description: 'Publicar casos terminados mejora la prueba social.',
    status: 'Borrador' as const,
  },
  {
    title: 'Páginas sin SEO',
    description: 'Completar titles y descriptions pendientes.',
    status: 'Falta SEO' as const,
  },
  {
    title: 'Materiales sin descripción larga',
    description: 'Agregar contenido útil para asesoramiento.',
    status: 'Mejorar' as const,
  },
];

export const latestChanges = [
  'Se actualizó Verde Ubatuba',
  'Se publicó Neolith Calacatta',
  'Se editó el banner de cocinas',
  'Se actualizó el mensaje de WhatsApp',
  'Se revisaron metadatos de materiales destacados',
];

export const adminMaterials = materials.map((material, index) => ({
  ...material,
  status: index % 7 === 0 ? ('Falta SEO' as const) : ('Publicado' as const),
  highlighted: featuredMaterials.some((featured) => featured.slug === material.slug),
  updatedAt: `${String(12 - (index % 9)).padStart(2, '0')}/05/2026`,
}));

export const materialFormFields = [
  'Nombre',
  'Slug',
  'Categoría',
  'Descripción corta',
  'Descripción larga',
  'Color',
  'Acabado',
  'Uso recomendado',
  'Resistencia',
  'Mantenimiento',
  'Aplicaciones',
  'Beneficios',
  'Imagen principal',
  'Galería',
  'Materiales relacionados',
  'Destacado en Home',
  'Orden',
  'Estado',
  'SEO title',
  'SEO description',
  'Mensaje personalizado de WhatsApp',
];

export const adminProjects = [
  {
    title: 'Cocina premium con Verde Ubatuba',
    environment: 'Cocina',
    material: 'Verde Ubatuba',
    status: 'Publicado' as const,
    highlighted: true,
    date: '10/05/2026',
  },
  {
    title: 'Quincho con Negro San Gabriel',
    environment: 'Quincho',
    material: 'Negro San Gabriel',
    status: 'Publicado' as const,
    highlighted: true,
    date: '08/05/2026',
  },
  {
    title: 'Baño revestido con Neolith Calacatta',
    environment: 'Baño',
    material: 'Neolith Calacatta',
    status: 'Borrador' as const,
    highlighted: false,
    date: '06/05/2026',
  },
  {
    title: 'Barra social con Café Imperial',
    environment: 'Barra social',
    material: 'Café Imperial',
    status: 'Destacado' as const,
    highlighted: true,
    date: '01/05/2026',
  },
];

export const homeSections = [
  {
    title: 'Topbar',
    description: 'Mensaje comercial superior y acceso rápido a WhatsApp.',
    status: 'Activo' as const,
    updatedAt: '12/05/2026',
  },
  {
    title: 'Hero',
    description: 'Bloque comercial principal con propuesta de valor.',
    status: 'Activo' as const,
    updatedAt: '11/05/2026',
  },
  {
    title: 'Categorías laterales',
    description: 'Accesos por material, ambiente y tipo de proyecto.',
    status: 'Activo' as const,
    updatedAt: '10/05/2026',
  },
  {
    title: 'Inspiración por ambientes',
    description: 'Cards para cocinas, baños, quinchos y revestimientos.',
    status: 'Activo' as const,
    updatedAt: '09/05/2026',
  },
  {
    title: 'Materiales destacados',
    description: 'Selección de superficies visibles en la Home.',
    status: 'Activo' as const,
    updatedAt: '09/05/2026',
  },
  {
    title: 'Banners comerciales',
    description: 'Promociones editoriales sin precios ni carrito.',
    status: 'Activo' as const,
    updatedAt: '08/05/2026',
  },
  {
    title: 'Colección de superficies',
    description: 'Listado showroom de materiales con acceso a PDP.',
    status: 'Activo' as const,
    updatedAt: '07/05/2026',
  },
  {
    title: 'Beneficios',
    description: 'Razones de confianza y proceso de asesoramiento.',
    status: 'Activo' as const,
    updatedAt: '06/05/2026',
  },
  {
    title: 'CTA final',
    description: 'Cierre de conversión hacia WhatsApp.',
    status: 'Inactivo' as const,
    updatedAt: '05/05/2026',
  },
  {
    title: 'Footer',
    description: 'Datos de contacto, servicios y links rápidos.',
    status: 'Activo' as const,
    updatedAt: '04/05/2026',
  },
];

export const adminBanners = commercialBanners.map((banner, index) => ({
  name: `${banner.eyebrow} ${banner.title}`,
  location: index === 0 ? 'Home hero secundario' : 'Home banners comerciales',
  status:
    index === 0
      ? ('Activo' as const)
      : index === 1
        ? ('Programado' as const)
        : ('Borrador' as const),
  startDate: `0${index + 4}/05/2026`,
  endDate: `${18 + index}/05/2026`,
  cta: banner.cta,
  priority: index + 1,
}));

export const adminLeads = [
  {
    name: 'Cliente interesado en Verde Ubatuba',
    phone: '+595 981 000 101',
    material: 'Verde Ubatuba',
    origin: 'PDP material',
    status: 'Nuevo' as const,
    owner: 'Admin Pietra',
    date: '13/05/2026',
  },
  {
    name: 'Consulta por mesada de cocina',
    phone: '+595 982 000 202',
    material: 'Granito a definir',
    origin: 'Home hero',
    status: 'Contactado' as const,
    owner: 'Ventas',
    date: '12/05/2026',
  },
  {
    name: 'Consulta por Neolith Calacatta',
    phone: '+595 983 000 303',
    material: 'Neolith Calacatta',
    origin: 'Catálogo',
    status: 'Cotización enviada' as const,
    owner: 'Admin Pietra',
    date: '11/05/2026',
  },
  {
    name: 'Consulta por quincho',
    phone: '+595 984 000 404',
    material: 'Negro San Gabriel',
    origin: 'Ambientes',
    status: 'En seguimiento' as const,
    owner: 'Obras',
    date: '10/05/2026',
  },
];

export const seoPages = [
  {
    page: 'Home',
    title: 'Marmolería Pietra | Mármol, Granito y Cuarzo Premium',
    description: 'Showroom premium de superficies a medida.',
    status: 'Completo' as const,
    indexation: 'Index',
  },
  {
    page: 'Materiales',
    title: 'Materiales premium para proyectos a medida',
    description: 'Catálogo de mármol, granito, cuarzo y Neolith.',
    status: 'Mejorar' as const,
    indexation: 'Index',
  },
  {
    page: 'Verde Ubatuba',
    title: 'Verde Ubatuba para mesadas premium',
    description: 'Granito verde oscuro para cocinas y quinchos.',
    status: 'Completo' as const,
    indexation: 'Index',
  },
  {
    page: 'Negro San Gabriel',
    title: 'Negro San Gabriel | Marmolería Pietra',
    description: 'Granito negro de alta elegancia.',
    status: 'Completo' as const,
    indexation: 'Index',
  },
  {
    page: 'Neolith Calacatta',
    title: 'Neolith Calacatta para superficies técnicas',
    description: 'Piedra sinterizada de estética Calacatta.',
    status: 'Completo' as const,
    indexation: 'Index',
  },
  {
    page: 'Contacto',
    title: 'Contacto Marmolería Pietra',
    description: '',
    status: 'Falta description' as const,
    indexation: 'Index',
  },
  {
    page: 'Proyectos',
    title: 'Proyectos en mármol, granito y cuarzo',
    description: 'Casos de inspiración para ambientes premium.',
    status: 'Noindex' as const,
    indexation: 'Noindex',
  },
];
