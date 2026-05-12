import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import '@/styles/globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://marmoleriapietra.com'),
  title: {
    default: 'Marmolería Pietra | Mármol, Granito y Cuarzo Premium en Paraguay',
    template: '%s | Marmolería Pietra',
  },
  description:
    'Diseño, fabricación e instalación premium de mesadas de granito, mármol, cuarzo, revestimientos y piedra traslúcida en Paraguay.',
  keywords: [
    'marmolería Paraguay',
    'granito premium',
    'mármol para cocina',
    'mesadas de granito',
    'revestimientos premium',
    'piedra sinterizada',
    'cuarzo Paraguay',
  ],
  openGraph: {
    title: 'Marmolería Pietra | Diseño en piedra premium',
    description: 'Espacios a medida en mármol, granito, cuarzo y piedra traslúcida en Paraguay.',
    url: 'https://marmoleriapietra.com',
    siteName: 'Marmolería Pietra',
    locale: 'es_PY',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
