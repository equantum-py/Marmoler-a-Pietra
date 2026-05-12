import type { ReactNode } from 'react';

export function SectionHeading({ eyebrow, title, children, dark = false }: { eyebrow: string; title: string; children?: ReactNode; dark?: boolean }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-16">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.38em] text-pietra-gold">{eyebrow}</p>
      <h2 className={`font-display text-4xl font-semibold leading-[0.95] md:text-6xl ${dark ? 'text-pietra-black' : 'text-pietra-cream'}`}>{title}</h2>
      {children ? <p className={`mx-auto mt-6 max-w-2xl text-sm leading-7 md:text-base ${dark ? 'text-pietra-charcoal/75' : 'text-pietra-stone/75'}`}>{children}</p> : null}
    </div>
  );
}
