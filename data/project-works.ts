export type ProjectWorkCategory = 'Cocinas' | 'Baños' | 'Quinchos';

export type ProjectWork = {
  id: string;
  title: string;
  category: ProjectWorkCategory;
  description: string;
  image: string;
  location: string;
  featured?: boolean;
};

export const projectWorks: ProjectWork[] = [
  {
    id: 'cocina-1',
    title: 'Cocina moderna con superficie premium',
    category: 'Cocinas',
    description: 'Proyecto de cocina a medida con terminación elegante y superficie resistente para uso diario.',
    image: '/images/trabajos/cocina/1-trabajo-cocina.jpg',
    location: 'Paraguay',
    featured: true,
  },
  {
    id: 'cocina-2',
    title: 'Mesada de cocina a medida',
    category: 'Cocinas',
    description: 'Superficie fabricada e instalada según medidas del espacio, pensada para funcionalidad y estética.',
    image: '/images/trabajos/cocina/2-trabajo-cocina.jpg',
    location: 'Paraguay',
    featured: true,
  },
  {
    id: 'cocina-3',
    title: 'Cocina residencial con terminación premium',
    category: 'Cocinas',
    description: 'Trabajo de cocina con superficie de alto impacto visual y acompañamiento técnico.',
    image: '/images/trabajos/cocina/3-trabajo-cocina.jpg',
    location: 'Paraguay',
    featured: true,
  },
  {
    id: 'cocina-4',
    title: 'Cocina funcional para uso diario',
    category: 'Cocinas',
    description: 'Proyecto orientado a combinar resistencia, diseño y practicidad en el ambiente principal.',
    image: '/images/trabajos/cocina/4-trabajo-cocina.jpg',
    location: 'Paraguay',
  },
  {
    id: 'bano-1',
    title: 'Baño con revestimiento elegante',
    category: 'Baños',
    description: 'Proyecto de baño con superficie clara, terminación cuidada y estética moderna.',
    image: '/images/trabajos/baños/1-trabajo-baño.jpg',
    location: 'Paraguay',
    featured: true,
  },
  {
    id: 'bano-2',
    title: 'Vanitory y superficie para baño',
    category: 'Baños',
    description: 'Trabajo a medida para baño, con foco en durabilidad, limpieza visual y buena terminación.',
    image: '/images/trabajos/baños/2-trabajo-baño.jpg',
    location: 'Paraguay',
    featured: true,
  },
  {
    id: 'bano-3',
    title: 'Baño residencial con superficie premium',
    category: 'Baños',
    description: 'Diseño y fabricación pensados para un baño elegante, funcional y fácil de mantener.',
    image: '/images/trabajos/baños/3-trabajo-baño.jpg',
    location: 'Paraguay',
  },
  {
    id: 'quincho-1',
    title: 'Quincho con barra a medida',
    category: 'Quinchos',
    description: 'Trabajo para quincho con superficie resistente, ideal para reuniones y uso frecuente.',
    image: '/images/trabajos/quinchos/IMG-20260224-WA0014.jpg',
    location: 'Paraguay',
    featured: true,
  },
  {
    id: 'quincho-2',
    title: 'Barra premium para quincho',
    category: 'Quinchos',
    description: 'Proyecto a medida con terminación sólida y estética cálida para espacios sociales.',
    image: '/images/trabajos/quinchos/IMG-20260224-WA0055.jpg',
    location: 'Paraguay',
    featured: true,
  },
  {
    id: 'quincho-3',
    title: 'Superficie para quincho familiar',
    category: 'Quinchos',
    description: 'Instalación pensada para combinar resistencia, diseño y comodidad en un ambiente social.',
    image: '/images/trabajos/quinchos/IMG-20260224-WA0056.jpg',
    location: 'Paraguay',
  },
];

export const featuredProjectWorks = projectWorks.filter((project) => project.featured);

export const projectCategories: ProjectWorkCategory[] = ['Cocinas', 'Baños', 'Quinchos'];
