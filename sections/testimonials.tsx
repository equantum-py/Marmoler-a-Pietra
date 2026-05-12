import { Quote } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { testimonials } from '@/data/site';

export function Testimonials() {
  return (
    <section className="bg-pietra-cream py-24 text-pietra-black md:py-32">
      <div className="luxe-container">
        <SectionHeading eyebrow="Confianza" title="Clientes que buscaban algo más que una mesada.">La experiencia Pietra combina estética, técnica y acompañamiento cercano.</SectionHeading>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="rounded-[2rem] border border-pietra-black/10 bg-white/65 p-7 shadow-sm">
              <Quote className="h-7 w-7 text-pietra-olive" />
              <p className="mt-7 text-lg leading-8 text-pietra-charcoal">“{testimonial.comment}”</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pietra-black font-semibold text-pietra-gold">{testimonial.initials}</div>
                <div><h3 className="font-semibold">{testimonial.name}</h3><p className="text-sm text-pietra-olive">{testimonial.city}</p></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
