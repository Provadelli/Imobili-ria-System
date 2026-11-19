"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowRight, BedDouble, CarFront, Check, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { residences } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Properties() {
  const reduce = useReducedMotion();
  const [id, setId] = useState(residences[0].id);
  const unit = residences.find((r) => r.id === id) ?? residences[0];

  const openPlan = () => {
    window.dispatchEvent(new CustomEvent("plan:select", { detail: unit.id }));
    document.getElementById("planta")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="imoveis" aria-labelledby="imoveis-title" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="imoveis-title"
            eyebrow="Imóveis"
            title={<>Três tipologias, <em>um mesmo padrão.</em></>}
            lead="Compare área, suítes e vagas e abra a planta de cada residência em 3D."
          />

          <div role="tablist" aria-label="Tipologias" className="inline-flex self-start rounded-full border border-line bg-cream p-1">
            {residences.map((r) => (
              <button
                key={r.id}
                id={`tab-${r.id}`}
                role="tab"
                type="button"
                aria-selected={r.id === id}
                aria-controls="imoveis-panel"
                onClick={() => setId(r.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-bronze",
                  r.id === id ? "bg-ink text-cream" : "text-stone hover:text-ink",
                )}
              >
                {r.tag}
              </button>
            ))}
          </div>
        </div>

        <div
          id="imoveis-panel"
          role="tabpanel"
          aria-labelledby={`tab-${unit.id}`}
          className="mt-12 grid overflow-hidden rounded-3xl border border-line bg-cream lg:grid-cols-12"
        >
          <div className="relative min-h-72 lg:col-span-7 lg:min-h-[28rem]">
            <AnimatePresence initial={false} mode="popLayout">
              <m.div
                key={unit.id}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={unit.image}
                  alt={unit.alt}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
                />
              </m.div>
            </AnimatePresence>
            <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-ink">
              {unit.tag}
            </span>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <h3 className="font-display text-2xl font-semibold text-ink">{unit.name}</h3>
            <p className="mt-3 text-base leading-relaxed text-stone">{unit.description}</p>

            <dl className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: Ruler, label: "Área privativa", value: `${unit.area} m²` },
                { icon: BedDouble, label: "Suítes", value: String(unit.suites) },
                { icon: CarFront, label: "Vagas", value: String(unit.parking) },
              ].map((spec) => (
                <div key={spec.label} className="rounded-2xl border border-line bg-white p-4">
                  <spec.icon className="size-5 text-bronze" aria-hidden="true" />
                  <dd className="font-display mt-3 text-xl font-semibold text-ink">{spec.value}</dd>
                  <dt className="mt-0.5 text-xs text-stone">{spec.label}</dt>
                </div>
              ))}
            </dl>

            <ul className="mt-6 space-y-2 text-sm text-ink">
              {unit.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="size-4 text-bronze" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <Button type="button" variant="default" size="pill" onClick={openPlan}>
                Ver planta em 3D
                <ArrowRight aria-hidden="true" />
              </Button>
              <Button asChild variant="pill" size="pill">
                <a href="#contato">Agendar visita</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
