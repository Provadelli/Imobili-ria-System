import TeamMemberCard from "@/components/ui/team-member-card";
import { Eyebrow, MaskText } from "@/components/reveal";
import { team } from "@/lib/content";

export function Team() {
  return (
    <section id="consultores" aria-labelledby="consultores-title" className="defer-render bg-cream py-28 lg:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index="07">Consultores</Eyebrow>
            <MaskText
              id="consultores-title"
              lines={["Pessoas que", <em key="i" className="italic">conhecem cada metro.</em>]}
              className="mt-6 font-display text-title font-light"
            />
          </div>
          <p className="max-w-sm text-base leading-relaxed text-stone">
            Um único consultor acompanha você da primeira visita à entrega das chaves.
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-28 lg:mt-28 lg:gap-36">
          {team.map((member, i) => (
            <TeamMemberCard key={member.firstName} position={i % 2 ? "right" : "left"} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
