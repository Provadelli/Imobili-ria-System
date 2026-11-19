import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { aboutStats } from "@/lib/content";

export function Numbers() {
  return (
    <section aria-label="O empreendimento em números" className="border-y border-line bg-cream">
      <dl className="mx-auto grid max-w-[80rem] grid-cols-2 gap-px bg-line md:grid-cols-4">
        {aboutStats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.06}
            className="flex flex-col-reverse gap-1 bg-cream px-5 py-8 sm:px-8 lg:px-12"
          >
            <dt className="text-sm text-stone">{stat.label}</dt>
            <dd className="font-display text-4xl font-semibold text-ink">
              <Counter value={stat.value} suffix={stat.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
