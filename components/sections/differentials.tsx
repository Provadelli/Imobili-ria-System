import { Award, Gem, Home, UserCheck, type LucideIcon } from "lucide-react";
import { differentials } from "@/lib/content";

const icons: LucideIcon[] = [Gem, Home, Award, UserCheck];

export function Differentials() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-heading"
      className="bg-surface-container-low py-space-xl"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto mb-space-lg max-w-2xl text-center">
          <span className="mb-space-xs block text-label-md uppercase tracking-[0.2em] text-secondary">
            Diferenciais
          </span>
          <h2 id="diferenciais-heading" className="font-heading text-headline-lg text-primary">
            Padrões que definem o alto padrão
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={item.title}
                className="flex flex-col gap-space-sm rounded-xl bg-surface p-8 shadow-md"
              >
                <Icon className="size-8 text-secondary" aria-hidden="true" />
                <h3 className="font-heading text-headline-sm text-primary">{item.title}</h3>
                <p className="text-body-sm text-on-surface-variant">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
