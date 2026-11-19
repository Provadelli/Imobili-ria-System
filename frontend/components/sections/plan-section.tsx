import { SectionHeading } from "@/components/section-heading";
import { FloorPlan3D } from "@/components/deferred";

export function PlanSection() {
  return (
    <section
      id="planta"
      aria-labelledby="planta-title"
      className="on-dark bg-ink py-20 text-cream lg:py-28"
    >
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          id="planta-title"
          tone="dark"
          eyebrow="Planta em 3D"
          title={<>Entre na planta <em>antes da obra.</em></>}
          lead="Gire a vista, separe os ambientes em camadas e veja a área de cada cômodo. A planta é esquemática: serve para entender a distribuição, não para medir o projeto."
          className="mb-12"
        />
        <FloorPlan3D />
      </div>
    </section>
  );
}
