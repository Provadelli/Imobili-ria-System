import { Plane, UtensilsCrossed, MapPin } from "lucide-react";
import { site } from "@/lib/content";
import { Reveal } from "@/components/reveal";

const points = [
  { icon: MapPin, text: site.address },
  { icon: Plane, text: "Acesso rápido ao Aeroporto de Congonhas" },
  { icon: UtensilsCrossed, text: "Restaurantes e cafés a poucos minutos a pé" },
];

export function Location() {
  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-heading"
      className="bg-surface-container-high py-space-xl"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-12">
        <Reveal
          variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } }}
          className="flex flex-col lg:col-span-5"
        >
          <span className="mb-space-xs text-label-md uppercase tracking-[0.2em] text-secondary-foreground">
            Localização
          </span>
          <h2 id="localizacao-heading" className="mb-space-md font-heading text-headline-lg text-primary">
            Perto de tudo o que você usa no dia a dia.
          </h2>
          <p className="mb-space-md max-w-md font-light leading-relaxed text-body-lg text-on-surface-variant">
            Na Avenida Paulista, o Reserva Imperiale fica perto de restaurantes,
            museus e escritórios, com acesso ao metrô e às principais avenidas da
            cidade.
          </p>
          <ul className="space-y-4 text-body-md text-on-surface">
            {points.map((point) => (
              <li key={point.text} className="flex items-center gap-3">
                <point.icon className="size-5 text-secondary-foreground" aria-hidden="true" />
                {point.text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="overflow-hidden rounded-xl shadow-2xl lg:col-span-7">
          <iframe
            title="Mapa de localização do Reserva Imperiale em São Paulo"
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
            className="h-[350px] w-full border-0 lg:h-[450px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
