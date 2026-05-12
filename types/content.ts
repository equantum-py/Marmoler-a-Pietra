export type MaterialCategory = 'Granito' | 'Cuarzo' | 'Mármol' | 'Sinterizado' | 'Especial';

export type Material = {
  slug: string;
  name: string;
  category: MaterialCategory;
  image: string;
  description: string;
  shortDescription: string;
  longDescription: string;
  images: string[];
  color: string;
  finish: string;
  recommendedUse: string;
  resistance: string;
  maintenance: string;
  applications: string[];
  benefits: string[];
  relatedSlugs: string[];
  whatsappMessage: string;
  tone: 'oscuro' | 'claro' | 'cálido' | 'natural' | 'especial';
};

export type Project = {
  title: string;
  category: string;
  image: string;
  location: string;
};
