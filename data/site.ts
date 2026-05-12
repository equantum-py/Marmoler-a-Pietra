import type { Project } from '@/types/content';

export const sidebarCategories = [
  { name: 'Granitos', icon: '◈', message: 'Hola, quiero cotizar granitos para mi proyecto.' },
  { name: 'Cuarzos', icon: '◇', message: 'Hola, quiero cotizar cuarzos para mi proyecto.' },
  { name: 'Mármoles', icon: '◉', message: 'Hola, quiero cotizar mármoles para mi proyecto.' },
  { name: 'Neolith', icon: '▧', message: 'Hola, quiero consultar por Neolith y piedras sinterizadas.' },
  { name: 'Cocinas', icon: '⌂', message: 'Hola, quiero cotizar una cocina con superficie premium.' },
  { name: 'Baños', icon: '♧', message: 'Hola, quiero cotizar mármol o granito para baño.' },
  { name: 'Quinchos', icon: '▤', message: 'Hola, quiero cotizar una barra o mesada para quincho.' },
  { name: 'Revestimientos', icon: '▩', message: 'Hola, quiero cotizar revestimientos premium.' },
  { name: 'Escaleras y piezas', icon: '⌁', message: 'Hola, quiero cotizar escaleras o piezas especiales.' },
];

export const categories = [
  { name: 'Cocinas', image: '/images/ambientes/cocinas.svg', message: 'Hola, quiero cotizar una mesada de cocina premium.' },
  { name: 'Baños', image: '/images/ambientes/banos.svg', message: 'Hola, quiero asesoramiento para un baño con mármol o granito.' },
  { name: 'Quinchos', image: '/images/ambientes/quinchos.svg', message: 'Hola, quiero cotizar una mesada para quincho.' },
  { name: 'Revestimientos', image: '/images/ambientes/revestimientos.svg', message: 'Hola, quiero cotizar revestimientos premium.' },
  { name: 'Escaleras y piezas especiales', image: '/images/ambientes/escaleras.svg', message: 'Hola, quiero cotizar una escalera o pieza especial en piedra.' },
];

export const projects: Project[] = [
  { title: 'Cocina efecto cascada', category: 'Cocinas', image: '/images/proyectos/cocina-cascada.svg', location: 'Asunción' },
  { title: 'Baño hotel boutique', category: 'Baños', image: '/images/proyectos/bano-boutique.svg', location: 'San Bernardino' },
  { title: 'Quincho exterior premium', category: 'Quinchos', image: '/images/proyectos/quincho-premium.svg', location: 'Luque' },
  { title: 'Barra traslúcida', category: 'Especiales', image: '/images/proyectos/barra-traslucida.svg', location: 'Asunción' },
  { title: 'Revestimiento protagonista', category: 'Revestimientos', image: '/images/proyectos/revestimiento.svg', location: 'Fernando de la Mora' },
];

export const commercialBanners = [
  { eyebrow: 'Cocinas modernas', title: 'con terminación premium', cta: 'Consultar ahora', image: '/images/proyectos/cocina-cascada.svg', message: 'Hola, quiero consultar por una cocina moderna con terminación premium.' },
  { eyebrow: 'Quinchos y barras', title: 'para compartir mejor', cta: 'Cotizar proyecto', image: '/images/proyectos/quincho-premium.svg', message: 'Hola, quiero cotizar un quincho o barra premium.' },
  { eyebrow: 'Baños con revestimientos', title: 'de alto impacto', cta: 'Ver opciones', image: '/images/proyectos/bano-boutique.svg', message: 'Hola, quiero ver opciones para baños con revestimientos premium.' },
];

export const benefits = [
  'Asesoramiento personalizado',
  'Medición a medida',
  'Fabricación profesional',
  'Cotización por WhatsApp',
];
