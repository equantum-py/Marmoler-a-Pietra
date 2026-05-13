import type { ReactNode } from 'react';

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function AdminPageHeader({ eyebrow, title, description, action }: AdminPageHeaderProps) {
  return (
    <header className="flex flex-col gap-5 rounded-[2rem] border border-pietra-border bg-white p-6 shadow-card lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-pietra-brown">{eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-pietra-ink">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-pietra-muted">{description}</p>
      </div>
      {action ? <div className="flex shrink-0 flex-wrap gap-3">{action}</div> : null}
    </header>
  );
}
