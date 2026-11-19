import { Eyebrow, MaskText, Reveal } from "@/components/reveal";
import { services } from "@/lib/content";

export function Team() {
  return (
    <section id="atendimento" aria-labelledby="atendimento-title" className="defer-render bg-cream py-28 lg:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index="07">Atendimento</Eyebrow>
            <MaskText
              id="atendimento-title"
              lines={["Do primeiro contato", <em key="i" className="italic">à entrega das chaves.</em>]}
              className="mt-6 font-display text-title font-light"
            />
          </div>
          <p className="max-w-sm text-base leading-relaxed text-stone">
            Três frentes de atendimento, com um consultor responsável por todo o processo.
          </p>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line lg:mt-24 lg:grid-cols-3">
          {services.map((service, i) => (
            <li key={service.title} className="list-none bg-cream">
              <Reveal delay={i * 0.08} className="h-full p-8 lg:p-10">
                <span className="font-display text-5xl font-light text-bronze" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 font-display text-2xl font-light">{service.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-stone">{service.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
