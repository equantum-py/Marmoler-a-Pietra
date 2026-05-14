export type ProjectWorkCategory = 'Cocinas' | 'Baños' | 'Quinchos';
export type ProjectWorkStatus = 'published' | 'draft' | 'archived';

export type ProjectWork = {
  id: string;
  title: string;
  slug: string;
  category: ProjectWorkCategory;
  description: string;
  image: string;
  location: string;
  featured: boolean;
  status: ProjectWorkStatus;
  sortOrder: number;
};

const cocinaDescriptions = [
  'Proyecto de cocina a medida con superficie premium y terminación elegante para uso diario.',
  'Mesada fabricada según medidas del espacio, pensada para funcionalidad, estética y resistencia.',
  'Cocina residencial con superficie de alto impacto visual y acompañamiento técnico.',
  'Proyecto orientado a combinar resistencia, diseño y practicidad en el ambiente principal.',
  'Superficie de cocina con terminación limpia, ideal para espacios modernos y funcionales.',
  'Trabajo de cocina con fabricación e instalación a medida para mejorar el uso del espacio.',
  'Cocina con superficie premium, pensada para durabilidad y buena presencia visual.',
  'Proyecto de cocina con terminación cuidada y asesoramiento en elección de material.',
  'Superficie instalada para cocina residencial con foco en uso diario y estética.',
  'Trabajo a medida para cocina, combinando diseño, resistencia y terminación profesional.',
  'Cocina con superficie premium para un ambiente funcional, elegante y fácil de mantener.',
];

const banoDescriptions = [
  'Proyecto de baño con superficie clara, terminación cuidada y estética moderna.',
  'Trabajo a medida para baño, con foco en durabilidad, limpieza visual y buena terminación.',
  'Diseño y fabricación pensados para un baño elegante, funcional y fácil de mantener.',
  'Superficie para baño con terminación prolija y adaptación a medidas reales del espacio.',
  'Proyecto de baño con revestimiento y superficie a medida para una estética premium.',
  'Trabajo de baño residencial con superficie resistente y diseño limpio.',
  'Superficie instalada en baño con acabado elegante y asesoramiento técnico.',
  'Baño con terminación moderna, pensado para combinar uso diario y diseño.',
  'Proyecto de baño con material seleccionado para mejorar presencia visual y funcionalidad.',
  'Trabajo a medida para baño con detalles de fabricación e instalación profesional.',
  'Baño con superficie premium y terminación orientada a durabilidad.',
  'Proyecto de baño con estética sobria, limpia y preparada para uso cotidiano.',
];

const quinchoDescriptions = [
  'Trabajo para quincho con superficie resistente, ideal para reuniones y uso frecuente.',
  'Barra premium para quincho con terminación sólida y estética cálida para espacios sociales.',
  'Instalación pensada para combinar resistencia, diseño y comodidad en un ambiente social.',
  'Quincho con superficie a medida para mejorar funcionalidad, estética y durabilidad.',
  'Proyecto de quincho con barra y superficie preparada para uso intensivo.',
  'Trabajo de quincho familiar con terminación profesional y presencia visual.',
];

function createProjects(
  category: ProjectWorkCategory,
  folder: string,
  files: string[],
  titlePrefix: string,
  descriptions: string[],
  startOrder: number,
): ProjectWork[] {
  return files.map((file, index) => {
    const number = index + 1;

    return {
      id: `${folder}-${number}`,
      slug: `${folder}-${number}`,
      title: `${titlePrefix} ${number}`,
      category,
      description: descriptions[index] ?? descriptions[0],
      image: `/images/trabajos/${folder}/${file}`,
      location: 'Paraguay',
      featured: index < 3,
      status: 'published',
      sortOrder: startOrder + index,
    };
  });
}

const cocinaProjects = createProjects(
  'Cocinas',
  'cocina',
  [
    '1-trabajo-cocina.jpg',
    '2-trabajo-cocina.jpg',
    '3-trabajo-cocina.jpg',
    '4-trabajo-cocina.jpg',
    '5-trabajo-cocina.jpg',
    '6-trabajo-cocina.jpg',
    '7-trabajo-cocina.jpg',
    '8-trabajo-cocina.jpg',
    '9-trabajo-cocina.jpg',
    '10-trabajo-cocina.jpg',
    '11-trabajo-cocina.jpg',
  ],
  'Cocina a medida',
  cocinaDescriptions,
  1,
);

const banoProjects = createProjects(
  'Baños',
  'banos',
  [
    '1-trabajo-bano.jpg',
    '2-trabajo-bano.jpg',
    '3-trabajo-bano.jpg',
    '4-trabajo-bano.jpg',
    '5-trabajo-bano.jpg',
    '6-trabajo-bano.jpg',
    '7-trabajo-bano.jpg',
    '8-trabajo-bano.jpg',
    '9-trabajo-bano.jpg',
    '10-trabajo-bano.jpg',
    '11-trabajo-bano.jpg',
    '12-trabajo-bano.jpg',
  ],
  'Baño con superficie premium',
  banoDescriptions,
  100,
);

const quinchoProjects = createProjects(
  'Quinchos',
  'quinchos',
  [
    'IMG-20260224-WA0014.jpg',
    'IMG-20260224-WA0055.jpg',
    'IMG-20260224-WA0056.jpg',
    'IMG-20260224-WA0088-copia.jpg',
    'IMG-20260224-WA0089.jpg',
    'IMG-20260224-WA0090.jpg',
  ],
  'Quincho con barra a medida',
  quinchoDescriptions,
  200,
);

export const projectWorks: ProjectWork[] = [
  ...cocinaProjects,
  ...banoProjects,
  ...quinchoProjects,
]
  .filter((project) => project.status === 'published')
  .sort((a, b) => a.sortOrder - b.sortOrder);

export const featuredProjectWorks = projectWorks.filter((project) => project.featured);

export const projectCategories: ProjectWorkCategory[] = ['Cocinas', 'Baños', 'Quinchos'];
