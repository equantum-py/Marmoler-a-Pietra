import type { ReactNode } from 'react';

export function SectionHeading({ eyebrow, title, children, align = 'left' }: { eyebrow?: string; title: string; children?: ReactNode; align?: 'left' | 'center' }) {
  return (
    <div className={`mb-7 md:mb-9 ${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'grid gap-4 md:grid-cols-[1fr_.85fr] md:items-end'}`}>
      <div>
        {eyebrow ? <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-pietra-brown">{eyebrow}</p> : null}
        <h2 className="font-display text-3xl font-bold leading-tight text-pietra-ink md:text-4xl">{title}</h2>
      </div>
      {children ? <p className="max-w-xl text-sm leading-6 text-pietra-muted md:ml-auto">{children}</p> : null}
    </div>
  );
}
