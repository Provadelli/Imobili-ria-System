import Image from "next/image";
import { Dumbbell, PlaneTakeoff, Sparkles, Wine, type LucideIcon } from "lucide-react";
import { amenities } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  Wine,
  Sparkles,
  Dumbbell,
  PlaneTakeoff,
};

export function Amenities() {
  return (
    <section aria-labelledby="amenidades-heading" className="mx-auto max-w-7xl px-6 py-space-xl lg:px-12">
      <div className="mx-auto mb-space-lg max-w-2xl text-center">
        <span className="mb-space-xs block text-label-md uppercase tracking-[0.2em] text-secondary">
          Comodidades Exclusivas
        </span>
        <h2 id="amenidades-heading" className="mb-4 font-heading text-headline-lg text-primary">
          Um clube privativo à sua disposição
        </h2>
        <p className="text-body-md text-on-surface-variant">
          Amenidades de nível internacional integradas ao seu dia a dia para
          proporcionar bem-estar sem sair de casa.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {amenities.map((amenity) => {
          const Icon = icons[amenity.icon];
          return (
            <div key={amenity.title} className="group relative h-96 overflow-hidden rounded-xl">
              <Image
                src={amenity.image}
                alt={amenity.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/90 via-primary/30 to-transparent p-6">
                <Icon className="mb-2 size-8 text-secondary-fixed" aria-hidden="true" />
                <h3 className="mb-1 font-heading text-headline-sm text-surface">
                  {amenity.title}
                </h3>
                <p className="font-light text-body-sm text-surface-variant">
                  {amenity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
