import type { MaterialCategory } from '@/types/content';

export type MaterialStatus = 'Publicado' | 'Borrador' | 'Archivado';

export type SupabaseMaterialRow = {
  id: string;
  slug: string;
  name: string;
  category: MaterialCategory;
  short_description: string;
  long_description: string;
  color: string;
  finish: string;
  recommended_use: string;
  resistance: string;
  maintenance: string;
  applications: string[];
  benefits: string[];
  main_image: string;
  gallery: string[];
  related_slugs: string[];
  whatsapp_message: string;
  featured: boolean;
  status: MaterialStatus;
  seo_title: string | null;
  seo_description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type MaterialFormState = {
  ok: boolean;
  message: string;
};
