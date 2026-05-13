type AdminStatCardProps = {
  label: string;
  value: string;
  detail: string;
  trend: string;
};

export function AdminStatCard({ label, value, detail, trend }: AdminStatCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-pietra-border bg-white p-5 shadow-card">
      <p className="text-sm font-medium text-pietra-muted">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <strong className="font-display text-4xl text-pietra-ink">{value}</strong>
        <span className="rounded-full bg-pietra-green/10 px-3 py-1 text-xs font-bold text-pietra-green">
          {trend}
        </span>
      </div>
      <p className="mt-4 text-sm text-pietra-muted">{detail}</p>
    </article>
  );
}
