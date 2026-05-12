import { ClipboardCheck, Factory, MessagesSquare, Ruler } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';

const steps = [
  { icon: MessagesSquare, title: 'Asesoramiento', text: 'Conversamos por WhatsApp, entendemos tu ambiente y recomendamos materiales.' },
  { icon: Ruler, title: 'Medición', text: 'Relevamos medidas, detalles técnicos y terminaciones necesarias.' },
  { icon: Factory, title: 'Fabricación', text: 'Cortamos, pulimos y preparamos cada pieza con precisión artesanal.' },
  { icon: ClipboardCheck, title: 'Instalación', text: 'Coordinamos logística, montaje y revisión final para entregar impecable.' },
];

export function Process() {
  return (
    <section id="nosotros" className="bg-pietra-black py-24 md:py-32">
      <div className="luxe-container">
        <SectionHeading eyebrow="Cómo trabajamos" title="Un proceso simple, premium y acompañado.">Desde la primera consulta hasta la instalación final, todo está pensado para reducir dudas y elevar el resultado.</SectionHeading>
        <div className="relative grid gap-5 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-pietra-gold/40 to-transparent md:block" />
          {steps.map((step, index) => (
            <div key={step.title} className="relative rounded-[2rem] border border-white/10 bg-white/[0.035] p-7">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-pietra-gold/30 bg-pietra-black text-pietra-gold"><step.icon /></div>
              <p className="text-xs uppercase tracking-[0.28em] text-pietra-gold">0{index + 1}</p>
              <h3 className="mt-3 font-display text-3xl text-pietra-cream">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-pietra-stone/75">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
