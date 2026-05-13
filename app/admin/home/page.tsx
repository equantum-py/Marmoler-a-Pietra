import { AdminPageHeader, AdminSectionCard } from '@/components/admin';
import { homeSections } from '@/data/admin';

export default function AdminHomeBuilderPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Constructor"
        title="Home administrable"
        description="Vista operativa de secciones que componen la Home aprobada. No rediseña la web pública: prepara puntos de control para activar, ordenar y editar contenido desde el CMS."
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {homeSections.map((section) => (
          <AdminSectionCard
            key={section.title}
            title={section.title}
            description={section.description}
            status={section.status}
            updatedAt={section.updatedAt}
          />
        ))}
      </section>
    </>
  );
}
