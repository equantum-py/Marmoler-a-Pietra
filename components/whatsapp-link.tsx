import { MessageCircle } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import { whatsappUrl } from '@/lib/whatsapp';

export function WhatsappLink({ message, children, className = '', ...props }: ComponentPropsWithoutRef<'a'> & { message: string }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-pietra-olive px-5 py-3 text-sm font-semibold text-pietra-warm transition duration-300 hover:bg-pietra-gold hover:text-pietra-black ${className}`}
      {...props}
    >
      <MessageCircle className="h-4 w-4" />
      {children}
    </a>
  );
}
