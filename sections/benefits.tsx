import { MessageCircle, Ruler, Settings, UsersRound } from 'lucide-react';
import { benefits } from '@/data/site';

const icons = [UsersRound, Ruler, Settings, MessageCircle];

export function Benefits() {
  return (
    <section id="beneficios" className="bg-pietra-green py-4 text-white md:py-5">
      <div className="luxe-container">
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = icons[index];

            return (
              <div
                key={benefit}
                className="flex min-w-[210px] shrink-0 items-center gap-3 rounded-xl bg-white/6 px-4 py-3 sm:min-w-0 sm:shrink sm:bg-transparent sm:px-0"
              >
                <Icon className="h-7 w-7 shrink-0 text-white/92 md:h-8 md:w-8" />
                <p className="max-w-[11rem] text-xs font-extrabold leading-tight md:text-sm">
                  {benefit}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
