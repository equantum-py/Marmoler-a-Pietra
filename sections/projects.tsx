import Image from 'next/image';
import { SectionHeading } from '@/components/section-heading';
import { WhatsappLink } from '@/components/whatsapp-link';
import { projects } from '@/data/site';

export function Projects() {
  return (
    <section id="proyectos" className="bg-pietra-black py-24 md:py-32">
      <div className="luxe-container">
        <SectionHeading eyebrow="Portfolio" title="Trabajos personalizados y a medida.">Cada proyecto se construye como una pieza única: asesoramiento, material correcto, fabricación precisa e instalación cuidada.</SectionHeading>
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {projects.map((project, index) => (
            <article key={project.title} className="group relative mb-5 break-inside-avoid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
              <div className={`relative ${index % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                <Image src={project.image} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-pietra-gold">{project.category} · {project.location}</p>
                <h3 className="mt-2 font-display text-3xl text-pietra-cream">{project.title}</h3>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center"><WhatsappLink message="Hola, quiero consultar por un proyecto personalizado y a medida.">Consultar por este Proyecto</WhatsappLink></div>
      </div>
    </section>
  );
}
