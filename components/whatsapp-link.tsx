import { MessageCircle } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import { whatsappUrl } from '@/lib/whatsapp';

export function WhatsappLink({ message, children, className = '', ...props }: ComponentPropsWithoutRef<'a'> & { message: string }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-pietra-green px-5 py-3 text-sm font-bold text-white shadow-soft transition duration-300 hover:bg-pietra-sage ${className}`}
      {...props}
    >
      <MessageCircle className="h-4 w-4" />
      {children}
    </a>
  );
}
