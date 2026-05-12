import { FloatingWhatsapp } from '@/components/floating-whatsapp';
import { Navbar } from '@/components/navbar';
import { Benefits } from '@/sections/benefits';
import { BeforeAfter } from '@/sections/before-after';
import { Categories } from '@/sections/categories';
import { FinalCta } from '@/sections/final-cta';
import { Footer } from '@/sections/footer';
import { Hero } from '@/sections/hero';
import { MaterialsShowroom } from '@/sections/materials-showroom';
import { Process } from '@/sections/process';
import { Projects } from '@/sections/projects';
import { Promotion } from '@/sections/promotion';
import { Testimonials } from '@/sections/testimonials';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Categories />
        <MaterialsShowroom />
        <Projects />
        <BeforeAfter />
        <Process />
        <Testimonials />
        <Promotion />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
