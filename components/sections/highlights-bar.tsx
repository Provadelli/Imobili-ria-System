import { BedDouble, CarFront, Eye, Ruler, type LucideIcon } from "lucide-react";
import { highlights } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  BedDouble,
  Ruler,
  CarFront,
  Eye,
};

export function HighlightsBar() {
  return (
    <section aria-label="Destaques do empreendimento" className="relative z-20 mx-auto -mt-12 w-full max-w-7xl px-6 lg:px-12">
      <div className="grid grid-cols-2 gap-8 divide-y divide-outline-variant/20 rounded-xl bg-primary-container p-8 text-on-primary-container shadow-2xl md:grid-cols-4 md:divide-x md:divide-y-0 lg:p-12">
        {highlights.map((item) => {
          const Icon = icons[item.icon];
          return (
            <div key={item.label} className="flex flex-col items-center pt-4 text-center md:pt-0">
              <Icon className="mb-space-xs size-8 text-secondary-fixed" aria-hidden="true" />
              <span className="font-heading text-headline-md text-surface">{item.value}</span>
              <span className="text-body-sm uppercase tracking-wider text-surface-variant">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
