import Image from "next/image";
import { Check } from "lucide-react";
import { residences } from "@/lib/content";

export function Residences() {
  return (
    <section
      id="residencias"
      aria-labelledby="residencias-heading"
      className="bg-surface-container-low py-space-xl"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-space-lg flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-space-xs block text-label-md uppercase tracking-[0.2em] text-secondary">
              Portfólio de Residências
            </span>
            <h2 id="residencias-heading" className="font-heading text-headline-lg text-primary">
              Tipologias Exclusivas
            </h2>
          </div>
          <p className="max-w-md text-body-md text-on-surface-variant">
            Espaços amplos com plantas flexíveis que valorizam a iluminação natural e a
            ventilação cruzada.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {residences.map((unit) => (
            <article
              key={unit.name}
              className="group flex flex-col overflow-hidden rounded-xl bg-surface shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={unit.image}
                  alt={unit.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded bg-primary px-3 py-1 text-label-sm uppercase tracking-wider text-primary-foreground">
                  {unit.tag}
                </span>
              </div>
              <div className="flex flex-grow flex-col justify-between p-8">
                <div>
                  <h3 className="mb-2 font-heading text-headline-md text-primary">
                    {unit.name}
                  </h3>
                  <p className="mb-6 text-body-sm text-on-surface-variant">
                    {unit.description}
                  </p>
                  <ul className="mb-8 space-y-2 text-body-sm text-on-surface">
                    {unit.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="size-4 text-secondary" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contato"
                  className="w-full rounded py-3 text-center text-label-md font-medium uppercase tracking-wider text-on-surface transition-all hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring bg-surface-container"
                >
                  Consultar Planta
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
