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
            lines={["Dezoito anos", "assinando endereços", <em key="i" className="italic">que viram referência.</em>]}
            className="mt-6 font-display text-title font-light"
          />
          <Reveal delay={0.1} className="mt-10 grid max-w-2xl gap-6 text-base leading-relaxed text-stone sm:grid-cols-2">
            <p>
              Somos uma imobiliária dedicada ao alto padrão, unindo arquitetura autoral,
              engenharia de precisão e atendimento consultivo de ponta a ponta.
            </p>
            <p>
              Cada projeto passa por curadoria própria de materiais e parcerias com
              escritórios de arquitetura renomados.
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
            alt="Equipe de arquitetos e consultores da Atelier Residences em um escritório sofisticado."
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover transition-[scale] duration-[1400ms] ease-(--ease-lux) group-hover:scale-105"
          />
        </Reveal>
      </div>
    </section>
  );
}
