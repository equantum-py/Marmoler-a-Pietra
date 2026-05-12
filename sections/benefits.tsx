import { Gem, Ruler, ShieldCheck, Sparkles } from 'lucide-react';

const benefits = [
  { icon: Gem, title: 'Materiales de primera', text: 'Granitos, mármoles, cuarzos y sinterizados seleccionados para alto valor percibido.' },
  { icon: Ruler, title: 'Diseño a medida', text: 'Asesoramiento, medición y fabricación pensados para cada ambiente.' },
  { icon: ShieldCheck, title: 'Instalación profesional', text: 'Terminaciones precisas, logística incluida y procesos cuidados.' },
  { icon: Sparkles, title: 'Experiencia premium', text: 'Una compra consultiva por WhatsApp, simple, rápida y personalizada.' },
];

export function Benefits() {
  return (
    <section id="beneficios" className="border-y border-white/10 bg-pietra-black py-10">
      <div className="luxe-container grid gap-4 md:grid-cols-4">
        {benefits.map((item) => (
          <div key={item.title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-pietra-gold/30">
            <item.icon className="mb-5 h-6 w-6 text-pietra-gold" />
            <h3 className="font-display text-2xl text-pietra-cream">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-pietra-stone/70">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
