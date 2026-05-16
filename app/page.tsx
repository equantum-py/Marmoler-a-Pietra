export const dynamic = 'force-dynamic';

import { FloatingWhatsapp } from '@/components/floating-whatsapp';
import { Navbar } from '@/components/navbar';
import { Benefits } from '@/sections/benefits';
import { Categories } from '@/sections/categories';
import { Footer } from '@/sections/footer';
import { Hero } from '@/sections/hero';
import { MaterialsShowroom } from '@/sections/materials-showroom';
import { Promotion } from '@/sections/promotion';
import { PromotionsShowcase } from '@/sections/promotions-showcase';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <PromotionsShowcase />
        <MaterialsShowroom />
        <Promotion />
        <Benefits />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
