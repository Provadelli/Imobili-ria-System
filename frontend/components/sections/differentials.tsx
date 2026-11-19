import { Award, Gem, Home, UserCheck, type LucideIcon } from "lucide-react";
import { differentials } from "@/lib/content";
import { Reveal } from "@/components/reveal";

const icons: LucideIcon[] = [Gem, Home, Award, UserCheck];

export function Differentials() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-heading"
      className="bg-surface-container-low py-space-xl"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal className="mx-auto mb-space-lg max-w-2xl text-center">
          <span className="mb-space-xs block text-label-md uppercase tracking-[0.2em] text-secondary-foreground">
            Diferenciais
          </span>
          <h2 id="diferenciais-heading" className="font-heading text-headline-lg text-primary">
            O que está incluído em cada residência
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="group flex h-full flex-col gap-space-sm rounded-xl bg-surface p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <Icon
                    className="size-8 text-secondary-foreground transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <h3 className="font-heading text-headline-sm text-primary">{item.title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
