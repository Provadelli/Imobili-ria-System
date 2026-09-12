import { Plane, UtensilsCrossed, MapPin } from "lucide-react";
import { site } from "@/lib/content";

const points = [
  { icon: MapPin, text: site.address },
  { icon: Plane, text: "A 15 minutos do Aeroporto Executivo" },
  { icon: UtensilsCrossed, text: "Rodeado por alta gastronomia internacional" },
];

export function Location() {
  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-heading"
      className="bg-surface-container-high py-space-xl"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-12">
        <div className="flex flex-col lg:col-span-5">
          <span className="mb-space-xs text-label-md uppercase tracking-[0.2em] text-secondary">
            Localização Privilegiada
          </span>
          <h2 id="localizacao-heading" className="mb-space-md font-heading text-headline-lg text-primary">
            O endereço mais desejado da cidade.
          </h2>
          <p className="mb-space-md max-w-md font-light leading-relaxed text-body-lg text-on-surface-variant">
            Situado no coração do bairro mais nobre, o Reserva Imperiale oferece
            proximidade imediata aos melhores restaurantes estrelados, galerias de arte
            e centros financeiros, garantindo conveniência absoluta em um refúgio de
            calmaria.
          </p>
          <ul className="space-y-4 text-body-md text-on-surface">
            {points.map((point) => (
              <li key={point.text} className="flex items-center gap-3">
                <point.icon className="size-5 text-secondary" aria-hidden="true" />
                {point.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-xl shadow-2xl lg:col-span-7">
          <iframe
            title="Mapa de localização do Reserva Imperiale em São Paulo"
            src="https://www.google.com/maps?q=Avenida+Paulista,Sao+Paulo&output=embed"
            className="h-[350px] w-full border-0 lg:h-[450px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
