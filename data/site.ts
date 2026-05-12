import type { Project } from '@/types/content';

export const categories = [
  { name: 'Cocinas', image: '/images/ambientes/cocinas.svg', message: 'Hola, quiero cotizar una mesada de cocina premium.' },
  { name: 'Quinchos', image: '/images/ambientes/quinchos.svg', message: 'Hola, quiero cotizar una mesada para quincho.' },
  { name: 'Baños', image: '/images/ambientes/banos.svg', message: 'Hola, quiero asesoramiento para un baño con mármol o granito.' },
  { name: 'Revestimientos', image: '/images/ambientes/revestimientos.svg', message: 'Hola, quiero cotizar revestimientos premium.' },
  { name: 'Piedra traslúcida', image: '/images/ambientes/piedra-traslucida.svg', message: 'Hola, quiero saber más sobre piedra traslúcida.' },
  { name: 'Escaleras', image: '/images/ambientes/escaleras.svg', message: 'Hola, quiero cotizar una escalera en piedra natural.' },
];

export const projects: Project[] = [
  { title: 'Cocina efecto cascada', category: 'Cocinas', image: '/images/proyectos/cocina-cascada.svg', location: 'Asunción' },
  { title: 'Baño hotel boutique', category: 'Baños', image: '/images/proyectos/bano-boutique.svg', location: 'San Bernardino' },
  { title: 'Quincho exterior premium', category: 'Quinchos', image: '/images/proyectos/quincho-premium.svg', location: 'Luque' },
  { title: 'Barra traslúcida', category: 'Especiales', image: '/images/proyectos/barra-traslucida.svg', location: 'Asunción' },
  { title: 'Revestimiento protagonista', category: 'Revestimientos', image: '/images/proyectos/revestimiento.svg', location: 'Fernando de la Mora' },
];

export const testimonials = [
  { name: 'María Fernanda', city: 'Asunción', comment: 'La mesada cambió por completo la cocina. El asesoramiento fue claro y la instalación impecable.', initials: 'MF' },
  { name: 'Rodrigo Benítez', city: 'Luque', comment: 'Buscábamos algo elegante para el quincho y Pietra logró un acabado realmente premium.', initials: 'RB' },
  { name: 'Ana Duarte', city: 'San Lorenzo', comment: 'Nos ayudaron a elegir el material correcto y cumplieron con cada detalle del proyecto.', initials: 'AD' },
];
