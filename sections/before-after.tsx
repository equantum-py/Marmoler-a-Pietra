'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SectionHeading } from '@/components/section-heading';

export function BeforeAfter() {
  const [value, setValue] = useState(58);
  return (
    <section className="bg-pietra-graphite py-24 md:py-32">
      <div className="luxe-container">
        <SectionHeading eyebrow="Antes y después" title="La diferencia se siente en el primer vistazo.">Deslizá para ver cómo una pieza de piedra bien elegida transforma proporción, luz y valor percibido.</SectionHeading>
        <div className="relative mx-auto aspect-[4/3] max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 shadow-glow md:aspect-[16/9]">
          <Image src="/images/proyectos/despues.svg" alt="Después con mesada premium Pietra" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
            <Image src="/images/proyectos/antes.svg" alt="Antes del proyecto" fill className="object-cover grayscale" sizes="100vw" />
          </div>
          <div className="absolute inset-y-0 w-0.5 bg-pietra-gold" style={{ left: `${value}%` }} />
          <input aria-label="Comparar antes y después" type="range" min="8" max="92" value={value} onChange={(event) => setValue(Number(event.target.value))} className="absolute inset-x-8 bottom-8 accent-pietra-gold" />
        </div>
      </div>
    </section>
  );
}
