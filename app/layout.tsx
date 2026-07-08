import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import '@/styles/globals.css';
import { AnalyticsTracker } from '@/components/analytics-tracker';
import { getPublicSiteSettings } from '@/lib/site-settings';

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const title = settings.seo_title || 'Marmolería Pietra | Mármol, Granito y Cuarzo Premium en Paraguay';
  const description =
    settings.seo_description ||
    'Diseño, fabricación e instalación premium de mesadas de granito, mármol, cuarzo, revestimientos y piedra traslúcida en Paraguay.';
  const siteName = settings.company_name || 'Marmolería Pietra';

  return {
    metadataBase: new URL('https://marmoleriapietra.com'),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      'marmolería Paraguay',
      'granito premium',
      'mármol para cocina',
      'mesadas de granito',
      'revestimientos premium',
      'piedra sinterizada',
      'cuarzo Paraguay',
    ],
    icons: settings.favicon_url ? { icon: settings.favicon_url } : undefined,
    openGraph: {
      title,
      description,
      url: 'https://marmoleriapietra.com',
      siteName,
      locale: 'es_PY',
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <body suppressHydrationWarning>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
