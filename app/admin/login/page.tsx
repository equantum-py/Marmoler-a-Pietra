import Image from 'next/image';
import { LoginForm } from '@/components/admin/login-form';
import { isSupabaseConfigured } from '@/lib/supabase/config';

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
        <p className="mt-3 text-center text-sm leading-6 text-pietra-muted">
          Supabase Auth protege /admin cuando las variables de entorno están configuradas.
        </p>
        <LoginForm fallbackMode={!isSupabaseConfigured} />
      </div>
    </section>
  );
}
