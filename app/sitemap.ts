import type { MetadataRoute } from 'next';
import { getPublicMaterialSlugs } from '@/lib/materials/public-materials';

const BASE_URL = 'https://marmoleriapietra.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const materialSlugs = await getPublicMaterialSlugs();
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/materiales`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/proyectos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...materialSlugs.map((slug) => ({
      url: `${BASE_URL}/materiales/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
