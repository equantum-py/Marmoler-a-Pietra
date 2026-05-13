import Link from 'next/link';
import type { ReactNode } from 'react';

type AdminActionButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

const variants = {
  primary: 'bg-pietra-green text-white shadow-soft hover:bg-pietra-sage',
  secondary: 'border border-pietra-border bg-white text-pietra-ink hover:border-pietra-green',
  ghost: 'text-pietra-green hover:bg-pietra-green/10',
};

export function AdminActionButton({
  children,
  href,
  variant = 'secondary',
}: AdminActionButtonProps) {
  const className = `inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${variants[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
}
