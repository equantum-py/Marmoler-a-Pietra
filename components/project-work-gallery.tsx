'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Images, MessageCircle } from 'lucide-react';
import {
  projectCategories,
  projectWorks,
  type ProjectWorkCategory,
} from '@/data/project-works';
import { whatsappUrl } from '@/lib/whatsapp';

type FilterValue = 'Todos' | ProjectWorkCategory;

const filters: FilterValue[] = ['Todos', ...projectCategories];

export function ProjectWorkGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('Todos');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') {
      return projectWorks;
    }

    return projectWorks.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="luxe-container pb-16">
      <div className="mb-8 rounded-[2rem] border border-pietra-border bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-pietra-brown">
              Galería de trabajos
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-pietra-black">
              {filteredProjects.length} trabajos disponibles
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? 'bg-pietra-green text-white'
                      : 'bg-pietra-light text-pietra-ink hover:bg-pietra-warm'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <article
            key={project.id}
            className={`group overflow-hidden rounded-2xl border border-pietra-border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card ${
              index === 0 && activeFilter === 'Todos' ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-pietra-warm">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes={
                  index === 0 && activeFilter === 'Todos'
                    ? '(min-width: 1024px) 66vw, 100vw'
                    : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                }
              />

              <div className="absolute inset-0 bg-gradient-to-t from-pietra-black/70 via-transparent to-transparent opacity-80" />

              <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-pietra-green">
                  {project.category}
                </span>

                <span className="rounded-full bg-pietra-green/95 p-2 text-white">
                  <Images className="h-4 w-4" />
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-display text-2xl font-semibold text-pietra-black">
                {project.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-pietra-muted">
                {project.description}
              </p>

              <a
                href={whatsappUrl(`Hola Pietra, quiero cotizar un proyecto similar a: ${project.title}.`)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-pietra-green px-5 text-sm font-bold text-white transition hover:bg-pietra-sage"
              >
                <MessageCircle className="h-4 w-4" />
                Cotizar similar
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
