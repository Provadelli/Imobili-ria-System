import Image from "next/image";
import { Counter } from "@/components/counter";
import { Eyebrow, MaskText, Reveal } from "@/components/reveal";
import { aboutStats } from "@/lib/content";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="defer-render bg-sand py-28 lg:py-40">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <div className="lg:col-span-7">
          <Eyebrow index="06">Sobre a Atelier</Eyebrow>
          <MaskText
            id="sobre-title"
            lines={["Uma imobiliária", "focada em um endereço,", <em key="i" className="italic">e em quem vai morar nele.</em>]}
            className="mt-6 font-display text-title font-light"
          />
          <Reveal delay={0.1} className="mt-10 grid max-w-2xl gap-6 text-base leading-relaxed text-stone sm:grid-cols-2">
            <p>
              A Atelier Residences vende o Reserva Imperiale: uma torre com 48 residências,
              projeto arquitetônico autoral e entrega prevista para o quarto trimestre de 2028.
            </p>
            <p>
              Memorial descritivo, plantas e condições de pagamento ficam à disposição
              por escrito antes de qualquer reserva.
            </p>
          </Reveal>

          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 sm:grid-cols-4">
            {aboutStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="flex flex-col-reverse gap-2">
                <dt className="text-sm text-stone">{stat.label}</dt>
                <dd className="font-display text-5xl leading-none font-light">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={0.15} className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:col-span-5">
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=75"
            alt="Escritório de arquitetura com mesas de trabalho amplas e janelas do piso ao teto."
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover transition-[scale] duration-[1400ms] ease-(--ease-lux) group-hover:scale-105"
          />
        </Reveal>
      </div>
    </section>
  );
}
