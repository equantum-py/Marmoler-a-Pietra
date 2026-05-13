import Image from 'next/image';
import { AdminActionButton } from '@/components/admin';

export default function AdminLoginPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-md items-center">
      <div className="w-full rounded-[2rem] border border-pietra-border bg-white p-8 shadow-card">
        <div className="flex justify-center">
          <Image src="/logo-pietra.svg" width={132} height={48} alt="Pietra" />
        </div>
        <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.22em] text-pietra-brown">
          Acceso privado al panel Pietra
        </p>
        <h1 className="mt-2 text-center font-display text-3xl font-semibold text-pietra-ink">
          Ingresar al CMS
        </h1>
        {/* La autenticación real se conectará luego con Auth.js, Clerk o Supabase Auth. */}
        <form className="mt-8 space-y-4">
          <label className="block text-sm font-semibold text-pietra-ink">
            Email
            <input
              type="email"
              placeholder="admin@pietra.com"
              className="mt-2 w-full rounded-2xl border border-pietra-border bg-pietra-cream px-4 py-3 text-sm outline-none focus:border-pietra-green"
            />
          </label>
          <label className="block text-sm font-semibold text-pietra-ink">
            Contraseña
            <input
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-2xl border border-pietra-border bg-pietra-cream px-4 py-3 text-sm outline-none focus:border-pietra-green"
            />
          </label>
          <div className="pt-2">
            <AdminActionButton variant="primary">Ingresar</AdminActionButton>
          </div>
        </form>
      </div>
    </section>
  );
}
