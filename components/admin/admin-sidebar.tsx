import Image from 'next/image';
import Link from 'next/link';
import {
  BarChart3,
  FileText,
  Home,
  ImageIcon,
  LayoutDashboard,
  MessageCircle,
  Search,
  Settings,
  SlidersHorizontal,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/home', label: 'Home', icon: Home },
  { href: '/admin/materiales', label: 'Materiales', icon: SlidersHorizontal },
  { href: '/admin/proyectos', label: 'Proyectos', icon: ImageIcon },
  { href: '/admin/banners', label: 'Banners', icon: BarChart3 },
  { href: '/admin/leads', label: 'Leads', icon: MessageCircle },
  { href: '/admin/seo', label: 'SEO', icon: Search },
  { href: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-pietra-border bg-white px-5 py-6 lg:flex lg:flex-col">
      <Link
        href="/admin"
        className="flex items-center gap-3 rounded-2xl border border-pietra-border bg-pietra-cream p-3"
      >
        <Image src="/logo-pietra.svg" width={92} height={34} alt="Pietra" className="h-auto w-24" />
        <div className="border-l border-pietra-border pl-3">
          <p className="text-sm font-bold text-pietra-ink">Panel Pietra</p>
          <p className="text-xs text-pietra-muted">CMS interno</p>
        </div>
      </Link>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-pietra-muted transition hover:bg-pietra-green hover:text-white"
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[1.25rem] bg-pietra-green p-4 text-white">
        <FileText size={20} />
        <p className="mt-3 text-sm font-bold">Fase 1 del CMS</p>
        <p className="mt-1 text-xs leading-5 text-white/75">
          Datos mock/locales preparados para autenticación y base de datos en una siguiente etapa.
        </p>
      </div>
    </aside>
  );
}
