import type { ReactNode } from 'react';

type AdminTableProps = {
  headers: string[];
  children: ReactNode;
};

export function AdminTable({ headers, children }: AdminTableProps) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-pietra-border bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-pietra-green text-white">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-[0.16em]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-pietra-border">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
