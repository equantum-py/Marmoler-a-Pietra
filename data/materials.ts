import type { Material, MaterialCategory } from '@/types/content';

type BaseMaterial = Omit<
  Material,
  | 'shortDescription'
  | 'longDescription'
  | 'images'
  | 'color'
  | 'finish'
  | 'recommendedUse'
  | 'resistance'
  | 'maintenance'
  | 'applications'
  | 'relatedSlugs'
  | 'whatsappMessage'
> & {
  color?: string;
  relatedSlugs?: string[];
};

const defaultApplications = ['Cocinas', 'Mesadas', 'Baños', 'Quinchos', 'Revestimientos', 'Piezas especiales'];

const categoryDetails: Record<MaterialCategory, { finish: string; recommendedUse: string; resistance: string; maintenance: string }> = {
  Granito: {
    finish: 'Pulido',
    recommendedUse: 'Interior y exterior cubierto',
    resistance: 'Alta',
    maintenance: 'Bajo',
  },
  Cuarzo: {
    finish: 'Pulido homogéneo',
    recommendedUse: 'Interior residencial y comercial',
    resistance: 'Alta',
    maintenance: 'Bajo',
  },
  Mármol: {
    finish: 'Pulido natural',
    recommendedUse: 'Interior y piezas decorativas',
    resistance: 'Media alta',
    maintenance: 'Medio',
  },
  Sinterizado: {
    finish: 'Pulido técnico',
    recommendedUse: 'Interior, mesadas y revestimientos',
    resistance: 'Muy alta',
    maintenance: 'Muy bajo',
  },
  Especial: {
    finish: 'A medida',
    recommendedUse: 'Piezas protagonistas y retroiluminadas',
    resistance: 'Alta',
    maintenance: 'Según aplicación',
  },
};

const colorBySlug: Record<string, string> = {
  'verde-ubatuba': 'Verde oscuro con vetas negras',
  'negro-san-gabriel': 'Negro profundo con textura mineral',
  'cafe-imperial': 'Marrón café con vetas cálidas',
  'gris-corumba': 'Gris granulado mineral',
  'blanco-dallas': 'Blanco grisáceo granulado',
  'blanco-itaunas': 'Blanco cálido con movimiento suave',
  'blanco-di-capri': 'Blanco claro con textura natural',
  'cuarzo-blanco-estelar': 'Blanco luminoso con destellos sutiles',
  'cuarzo-rojo': 'Rojo intenso de acento',
  'cuarzo-beige': 'Beige cálido uniforme',
  'cuarzo-gris': 'Gris contemporáneo uniforme',
  'cuarzo-negro': 'Negro homogéneo profundo',
  'cuarzo-verde-claro': 'Verde claro desaturado',
  'marmol-travertino': 'Beige travertino con líneas naturales',
  'marmol-blanco': 'Blanco con veta delicada',
  'marron-emperador': 'Marrón intenso con vetas claras',
  'neolith-calacatta': 'Blanco Calacatta con veta gris y dorada',
  'piedra-traslucida': 'Ámbar translúcido con profundidad luminosa',
};

const baseMaterials: BaseMaterial[] = [
  {
    slug: 'verde-ubatuba',
    name: 'Verde Ubatuba',
    category: 'Granito',
    image: '/images/catalogo/granito-verde-ubatuba.svg',
    description: 'Granito de profundidad natural para mesadas sobrias con presencia arquitectónica.',
    benefits: ['Elegancia natural', 'Fácil de combinar', 'Fácil de cuidar', 'Alta resistencia'],
    tone: 'oscuro',
    relatedSlugs: ['negro-san-gabriel', 'cafe-imperial', 'gris-corumba', 'neolith-calacatta'],
  },
  {
    slug: 'negro-san-gabriel',
    name: 'Negro San Gabriel',
    category: 'Granito',
    image: '/images/catalogo/granito-negro-san-gabriel.svg',
    description: 'Granito oscuro de alta elegancia ideal para cocinas contemporáneas y espacios sofisticados.',
    benefits: ['Acabado premium', 'Contraste elegante', 'Uso interior y exterior', 'Alta resistencia'],
    tone: 'oscuro',
    relatedSlugs: ['verde-ubatuba', 'cafe-imperial', 'gris-corumba', 'neolith-calacatta'],
  },
  {
    slug: 'cafe-imperial',
    name: 'Café Imperial',
    category: 'Granito',
    image: '/images/catalogo/granito-cafe-imperial.svg',
    description: 'Tono café mineral para proyectos cálidos, robustos y naturalmente exclusivos.',
    benefits: ['Textura expresiva', 'Gran durabilidad', 'Perfecto para quinchos', 'Tono cálido'],
    tone: 'cálido',
    relatedSlugs: ['verde-ubatuba', 'negro-san-gabriel', 'gris-corumba', 'marron-emperador'],
  },
  {
    slug: 'gris-corumba',
    name: 'Gris Corumbá',
    category: 'Granito',
    image: '/images/catalogo/granito-gris-corumba.svg',
    description: 'Gris mineral versátil para ambientes modernos con estética limpia y atemporal.',
    benefits: ['Neutro arquitectónico', 'Combina con madera', 'Muy resistente', 'Fácil integración'],
    tone: 'natural',
    relatedSlugs: ['negro-san-gabriel', 'blanco-dallas', 'blanco-itaunas', 'neolith-calacatta'],
  },
  {
    slug: 'blanco-dallas',
    name: 'Blanco Dallas',
    category: 'Granito',
    image: '/images/catalogo/granito-blanco-dallas.svg',
    description: 'Base clara con movimiento sutil para cocinas luminosas de inspiración natural.',
    benefits: ['Amplifica la luz', 'Estética suave', 'Gran presencia visual', 'Versátil'],
    tone: 'claro',
  },
  {
    slug: 'blanco-itaunas',
    name: 'Blanco Itaúnas',
    category: 'Granito',
    image: '/images/catalogo/granito-blanco-itaunas.svg',
    description: 'Piedra clara y delicada para mesadas premium con sensación de amplitud.',
    benefits: ['Look luminoso', 'Versátil', 'Excelente para cocinas familiares', 'Natural premium'],
    tone: 'claro',
  },
  {
    slug: 'blanco-di-capri',
    name: 'Blanco Di Capri',
    category: 'Granito',
    image: '/images/catalogo/granito-blanco-di-capri.svg',
    description: 'Granito claro con carácter mineral para proyectos elegantes y duraderos.',
    benefits: ['Atemporal', 'Fácil integración', 'Premium natural', 'Textura clara'],
    tone: 'claro',
  },
  {
    slug: 'cuarzo-blanco-estelar',
    name: 'Cuarzo Blanco Estelar',
    category: 'Cuarzo',
    image: '/images/catalogo/cuarzo-blanco-estelar.svg',
    description: 'Superficie blanca con destellos sutiles para interiores refinados y pulidos.',
    benefits: ['Acabado homogéneo', 'Higiénico', 'Elegancia luminosa', 'Fácil limpieza'],
    tone: 'claro',
  },
  {
    slug: 'cuarzo-rojo',
    name: 'Cuarzo Rojo',
    category: 'Cuarzo',
    image: '/images/catalogo/cuarzo-rojo.svg',
    description: 'Una pieza de acento para proyectos audaces sin perder sofisticación.',
    benefits: ['Color protagonista', 'Superficie consistente', 'Diseño personalizado', 'Acento premium'],
    tone: 'especial',
  },
  {
    slug: 'cuarzo-beige',
    name: 'Cuarzo Beige',
    category: 'Cuarzo',
    image: '/images/catalogo/cuarzo-beige.svg',
    description: 'Beige cálido de lectura suave para cocinas serenas y baños de hotel.',
    benefits: ['Tono cálido', 'Minimalista', 'Excelente para baños', 'Fácil combinación'],
    tone: 'cálido',
  },
  {
    slug: 'cuarzo-gris',
    name: 'Cuarzo Gris',
    category: 'Cuarzo',
    image: '/images/catalogo/cuarzo-gris.svg',
    description: 'Gris contemporáneo para una estética urbana, limpia y perfectamente equilibrada.',
    benefits: ['Look moderno', 'Uniformidad', 'Fácil combinación', 'Bajo mantenimiento'],
    tone: 'natural',
  },
  {
    slug: 'cuarzo-negro',
    name: 'Cuarzo Negro',
    category: 'Cuarzo',
    image: '/images/catalogo/cuarzo-negro.svg',
    description: 'Negro profundo para mesadas monolíticas con efecto boutique residencial.',
    benefits: ['Máximo contraste', 'Sofisticado', 'Acabado de lujo', 'Fácil limpieza'],
    tone: 'oscuro',
  },
  {
    slug: 'cuarzo-verde-claro',
    name: 'Cuarzo Verde Claro',
    category: 'Cuarzo',
    image: '/images/catalogo/cuarzo-verde-claro.svg',
    description: 'Verde desaturado y natural para ambientes con identidad serena y orgánica.',
    benefits: ['Tono distintivo', 'Natural premium', 'Ideal para piezas especiales', 'Diseño sereno'],
    tone: 'natural',
  },
  {
    slug: 'marmol-travertino',
    name: 'Mármol Travertino',
    category: 'Mármol',
    image: '/images/catalogo/marmol-travertino.svg',
    description: 'Clásico travertino para revestimientos con textura cálida y elegancia mediterránea.',
    benefits: ['Textura noble', 'Muy decorativo', 'Perfecto para revestir', 'Elegancia cálida'],
    tone: 'cálido',
  },
  {
    slug: 'marmol-blanco',
    name: 'Mármol Blanco',
    category: 'Mármol',
    image: '/images/catalogo/marmol-blanco.svg',
    description: 'Mármol claro de expresión sofisticada para baños, vanitories y detalles protagonistas.',
    benefits: ['Lujo clásico', 'Veta delicada', 'Alto valor percibido', 'Ideal para baños'],
    tone: 'claro',
  },
  {
    slug: 'marron-emperador',
    name: 'Marrón Emperador',
    category: 'Mármol',
    image: '/images/catalogo/marron-emperador.svg',
    description: 'Mármol intenso y señorial para revestimientos con carácter y profundidad.',
    benefits: ['Vetas dramáticas', 'Sensación hotelera', 'Gran presencia', 'Calidez premium'],
    tone: 'oscuro',
  },
  {
    slug: 'neolith-calacatta',
    name: 'Neolith Calacatta',
    category: 'Sinterizado',
    image: '/images/catalogo/neolith-calacatta.svg',
    description: 'Piedra sinterizada de inspiración Calacatta para superficies técnicas de estética impecable.',
    benefits: ['Alta tecnología', 'Resiste calor', 'Veta elegante', 'Muy bajo mantenimiento'],
    tone: 'claro',
    relatedSlugs: ['blanco-dallas', 'blanco-itaunas', 'marmol-blanco', 'negro-san-gabriel'],
  },
  {
    slug: 'piedra-traslucida',
    name: 'Piedra Traslúcida',
    category: 'Especial',
    image: '/images/catalogo/piedra-traslucida.svg',
    description: 'Una pieza escenográfica retroiluminada para barras, recepciones y espacios memorables.',
    benefits: ['Efecto luminoso', 'Máximo impacto', 'Diseño a medida', 'Pieza protagonista'],
    tone: 'especial',
  },
];

const fallbackRelated = ['negro-san-gabriel', 'cafe-imperial', 'gris-corumba', 'neolith-calacatta'];

function enrichMaterial(material: BaseMaterial): Material {
  const details = categoryDetails[material.category];
  const relatedSlugs = (material.relatedSlugs ?? fallbackRelated).filter((slug) => slug !== material.slug).slice(0, 4);

  return {
    ...material,
    shortDescription: `${material.name} para mesadas, revestimientos y proyectos a medida.`,
    longDescription: `${material.description} Es una superficie pensada para quienes buscan una terminación premium, buena lectura visual y asesoramiento profesional desde la elección del material hasta la instalación final.`,
    images: [material.image, '/images/showroom/kitchen-hero.svg', '/images/ambientes/banos.svg', '/images/ambientes/quinchos.svg'],
    color: material.color ?? colorBySlug[material.slug] ?? 'Tono mineral natural',
    finish: details.finish,
    recommendedUse: details.recommendedUse,
    resistance: details.resistance,
    maintenance: details.maintenance,
    applications: defaultApplications,
    relatedSlugs,
    whatsappMessage: `Hola Pietra, quiero cotizar el material ${material.name}. ¿Me pueden asesorar?`,
  };
}

export const materials: Material[] = baseMaterials.map(enrichMaterial);

export const featuredMaterials = materials.filter((material) =>
  ['negro-san-gabriel', 'neolith-calacatta', 'marmol-travertino', 'piedra-traslucida'].includes(material.slug),
);

export function getMaterialBySlug(slug: string) {
  return materials.find((material) => material.slug === slug);
}

export function getRelatedMaterials(material: Material) {
  return material.relatedSlugs
    .map((slug) => getMaterialBySlug(slug))
    .filter((related): related is Material => Boolean(related));
}
