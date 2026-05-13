import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Menu, UserCircle } from 'lucide-react';

export function AdminTopbar() {
  return (
    <div className="sticky top-0 z-20 border-b border-pietra-border bg-pietra-background/90 px-4 py-3 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            aria-label="Abrir navegación"
            className="rounded-full border border-pietra-border bg-white p-2 text-pietra-green"
          >
            <Menu size={20} />
          </button>
          <Image src="/logo-pietra.svg" width={86} height={32} alt="Pietra" />
        </div>
        <div className="hidden lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-pietra-brown">
            Administración
          </p>
          <p className="text-sm text-pietra-muted">Control operativo del showroom digital</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-pietra-border bg-white px-4 py-2 text-sm font-semibold text-pietra-green transition hover:border-pietra-green"
          >
            Ver sitio <ExternalLink size={16} />
          </Link>
          <div className="hidden items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-pietra-ink shadow-card sm:flex">
            <UserCircle size={20} className="text-pietra-green" />
            Admin Pietra
          </div>
        </div>
      </div>
    </div>
  );
}
