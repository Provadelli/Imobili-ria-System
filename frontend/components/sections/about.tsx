import Image from "next/image";
import { aboutStats } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-heading" className="bg-surface py-space-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <Reveal
          variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } }}
          className="relative h-80 overflow-hidden rounded-xl shadow-xl lg:col-span-5 lg:h-[420px]"
        >
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80"
            alt="Escritório de arquitetura com mesas de trabalho, maquetes e plantas."
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-7">
          <span className="mb-space-xs block text-label-md uppercase tracking-[0.2em] text-secondary-foreground">
            Sobre a Atelier Residences
          </span>
          <h2 id="sobre-heading" className="mb-space-md font-heading text-headline-lg text-primary">
            18 anos ajudando famílias a escolher onde morar.
          </h2>
          <p className="mb-space-md max-w-xl font-light leading-relaxed text-body-lg text-on-surface-variant">
            A Atelier é uma imobiliária focada em empreendimentos de alto padrão.
            Acompanhamos o cliente da primeira visita à entrega das chaves, com um
            único consultor responsável pelo processo.
          </p>
          <p className="mb-space-lg max-w-xl leading-relaxed text-body-md text-on-surface-variant">
            Escolhemos os materiais de cada projeto em conjunto com escritórios de
            arquitetura parceiros e explicamos, por escrito, o que está incluído em
            cada unidade.
          </p>

          <dl className="grid grid-cols-2 gap-6 border-t border-outline-variant/30 pt-6 sm:grid-cols-4">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-body-sm uppercase tracking-wider text-on-surface-variant">
                  {stat.label}
                </dt>
                <dd className="font-heading text-headline-md text-primary">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
