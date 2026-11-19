"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, useReducedMotion, motion, type MotionValue } from "motion/react";
import { conceptImages, differentials } from "@/lib/content";

interface PanelProps {
  scrollYProgress: MotionValue<number>;
  reduce: boolean;
}

function ConceptPanel({ scrollYProgress, reduce }: PanelProps) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <motion.div
      style={reduce ? undefined : { scale }}
      className="sticky top-0 flex h-dvh flex-col justify-center bg-surface-container-low px-6 lg:px-12"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-4">
        <span className="text-label-md uppercase tracking-[0.2em] text-secondary-foreground">
          Conceito Arquitetônico
        </span>
        <h2 className="max-w-2xl font-heading text-headline-lg text-primary">
          Projeto autoral, materiais que envelhecem bem.
        </h2>
        <p className="max-w-xl font-light leading-relaxed text-body-lg text-on-surface-variant">
          A fachada combina mármore, painéis de madeira maciça e brises pivotantes que
          controlam a luz do sol ao longo do dia. Cada pavimento tem poucas unidades,
          com plantas amplas e vista aberta.
        </p>
        <div className="grid max-w-xl grid-cols-2 gap-6 border-t border-outline-variant/30 pt-6">
          {differentials.slice(0, 2).map((item) => (
            <div key={item.title}>
              <h3 className="mb-1 font-heading text-headline-sm text-primary">
                {item.title}
              </h3>
              <p className="text-body-sm text-on-surface-variant">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function GalleryPanel({ scrollYProgress, reduce }: PanelProps) {
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <motion.div
      style={reduce ? undefined : { scale }}
      className="relative h-dvh bg-primary px-6 py-16 text-surface lg:px-12"
    >
      <div className="mx-auto grid h-full max-w-7xl grid-cols-2 grid-rows-2 gap-4">
        {conceptImages.map((image) => (
          <div key={image.alt} className="relative overflow-hidden rounded-xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="empreendimento" ref={containerRef} className="relative h-[200dvh] w-full scroll-mt-20">
      <ConceptPanel scrollYProgress={scrollYProgress} reduce={reduce} />
      <GalleryPanel scrollYProgress={scrollYProgress} reduce={reduce} />
    </section>
  );
}
