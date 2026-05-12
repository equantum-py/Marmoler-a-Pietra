import { MessageCircle, Ruler, Settings, UsersRound } from 'lucide-react';
import { benefits } from '@/data/site';

const icons = [UsersRound, Ruler, Settings, MessageCircle];

export function Benefits() {
  return (
    <section id="beneficios" className="bg-pietra-green py-5 text-white">
      <div className="luxe-container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = icons[index];
          return (
            <div key={benefit} className="flex items-center justify-center gap-3 text-center sm:justify-start">
              <Icon className="h-8 w-8 shrink-0 text-white/92" />
              <p className="max-w-[11rem] text-sm font-extrabold leading-tight">{benefit}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
