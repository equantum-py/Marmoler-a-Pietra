export type MaterialCategory = 'Granito' | 'Cuarzo' | 'Mármol' | 'Sinterizado' | 'Especial';

export type Material = {
  slug: string;
  name: string;
  category: MaterialCategory;
  image: string;
  description: string;
  benefits: string[];
  tone: 'oscuro' | 'claro' | 'cálido' | 'natural' | 'especial';
};

export type Project = {
  title: string;
  category: string;
  image: string;
  location: string;
};
