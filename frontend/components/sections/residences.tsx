"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, MaskText } from "@/components/reveal";
import { residences } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Residences() {
  const [active, setActive] = useState(0);

  return (
    <section id="residencias" aria-labelledby="residencias-title" className="bg-cream py-28 lg:py-40">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow index="03">Residências</Eyebrow>
            <MaskText
              id="residencias-title"
              lines={["Três formas", <em key="i" className="italic">de morar acima.</em>]}
              className="mt-6 font-display text-title font-light"
            />
          </div>
          <p className="max-w-sm text-base leading-relaxed text-stone">
            Plantas exclusivas, entre 520 e 680 m², pensadas para quem não abre mão de
            espaço, luz natural e privacidade.
          </p>
        </div>

        {/* Desktop: painéis que se expandem */}
        <div className="mt-16 hidden h-[78vh] max-h-[760px] min-h-[540px] gap-3 lg:flex">
          {residences.map((unit, index) => {
            const isActive = index === active;
            const panelId = `residencia-${index}`;
            return (
              <article
                key={unit.name}
                aria-labelledby={`${panelId}-title`}
                onMouseEnter={() => setActive(index)}
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] bg-ink text-cream transition-[flex-grow] duration-[900ms] ease-(--ease-lux)",
                  isActive ? "grow-[4.2]" : "grow"
                )}
                style={{ flexBasis: 0 }}
              >
                <Image
                  src={unit.image}
                  alt={unit.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={cn(
                    "object-cover transition-[scale,opacity] duration-[1200ms] ease-(--ease-lux)",
                    isActive ? "scale-100 opacity-90" : "scale-110 opacity-55"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

                {/* Estado recolhido */}
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-expanded={isActive}
                  aria-controls={`${panelId}-details`}
                  className={cn(
                    "absolute inset-0 z-10 flex flex-col items-center justify-between py-10 transition-opacity duration-500",
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  )}
                  tabIndex={isActive ? -1 : 0}
                >
                  <span className="eyebrow text-champagne">0{index + 1}</span>
                  <span className="font-display text-3xl font-light whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                    {unit.name}
                  </span>
                  <span className="flex size-12 items-center justify-center rounded-full border border-cream/40">
                    <Plus className="size-4" aria-hidden="true" />
                    <span className="sr-only">Ver detalhes de {unit.name}</span>
                  </span>
                </button>

                {/* Estado expandido */}
                <div
                  id={`${panelId}-details`}
                  className="on-dark absolute inset-x-0 bottom-0 z-20 p-10 xl:p-12"
                  hidden={!isActive}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                        className="flex items-end justify-between gap-10"
                      >
                        <div className="max-w-xl">
                          <p className="eyebrow text-champagne">
                            {unit.tag} · {unit.area}
                          </p>
                          <h3 id={`${panelId}-title`} className="mt-4 font-display text-6xl font-light">
                            {unit.name}
                          </h3>
                          <p className="mt-4 text-base leading-relaxed text-cream/85">{unit.description}</p>
                          <ul className="mt-6 flex flex-wrap gap-2">
                            {unit.features.map((f) => (
                              <li key={f} className="rounded-full border border-cream/30 px-4 py-1.5 text-sm text-cream/90">
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button asChild variant="pill-light" size="icon-xl" className="shrink-0">
                          <Link href="#contato" aria-label={`Solicitar a planta da ${unit.name}`}>
                            <ArrowUpRight data-arrow aria-hidden="true" />
                          </Link>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {!isActive && (
                  <h3 id={`${panelId}-title`} className="sr-only">
                    {unit.name}
                  </h3>
                )}
              </article>
            );
          })}
        </div>

        {/* Mobile/tablet: trilho com snap (arraste nativo) */}
        <ul
          aria-label="Residências"
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:hidden"
        >
          {residences.map((unit, index) => (
            <li
              key={unit.name}
              aria-label={`${index + 1} de ${residences.length}`}
              className="on-dark relative flex h-[68svh] min-h-[460px] w-[84vw] max-w-md shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink p-7 text-cream"
            >
              <Image src={unit.image} alt={unit.alt} fill sizes="84vw" className="object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="relative">
                <p className="eyebrow text-champagne">
                  {unit.tag} · {unit.area}
                </p>
                <h3 className="mt-3 font-display text-4xl font-light">{unit.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/85">{unit.description}</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-2">
                    {unit.features.slice(0, 2).map((f) => (
                      <li key={f} className="rounded-full border border-cream/30 px-3 py-1 text-xs">
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="pill-light" size="icon-pill" className="shrink-0">
                    <Link href="#contato" aria-label={`Solicitar a planta da ${unit.name}`}>
                      <ArrowUpRight data-arrow aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
