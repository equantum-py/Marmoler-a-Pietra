import type { Metadata } from 'next';
import { AdminSidebar, AdminTopbar } from '@/components/admin';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Panel Pietra | Administración',
  description:
    'CMS interno de Marmolería Pietra para administrar showroom, materiales, proyectos, leads y SEO.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-pietra-background text-pietra-ink">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="min-w-0 flex-1">
          <AdminTopbar />
          <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
