import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import type { ComponentPropsWithoutRef } from 'react';
import { getWhatsappUrl } from '@/lib/whatsapp-server';

export async function WhatsappLink({
  message,
  children,
  className = '',
  ...props
}: ComponentPropsWithoutRef<'a'> & { message: string }) {
  const href = await getWhatsappUrl(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-pietra-green px-5 py-3 text-sm font-bold text-white shadow-soft transition-colors duration-300 hover:bg-[#3E5549] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pietra-green ${className}`}
      {...props}
    >
      <WhatsappIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
      {children}
    </a>
  );
}
