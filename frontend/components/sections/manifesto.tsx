"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Counter } from "@/components/counter";
import { Eyebrow, Reveal } from "@/components/reveal";
import { highlights, manifesto } from "@/lib/content";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Começa em um cinza que já cumpre 3:1 (texto grande, WCAG 1.4.3) e "acende" até o tom final.
  const color = useTransform(progress, range, ["#968980", "#150d0a"]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ color }}>{children}</motion.span>
    </span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = manifesto.split(" ");

  return (
    <section id="manifesto" aria-labelledby="manifesto-title" className="bg-cream py-28 lg:py-44">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <Eyebrow index="01">O Empreendimento</Eyebrow>
        <h2 id="manifesto-title" className="sr-only">
          Manifesto do Reserva Imperiale
        </h2>

        {/* Texto completo para leitores de tela; a versão animada é decorativa. */}
        <p className="sr-only">{manifesto}</p>
        <p
          ref={ref}
          aria-hidden="true"
          className="mt-12 max-w-6xl font-display text-[clamp(1.875rem,1.2rem+2.6vw,4rem)] leading-[1.12] font-light text-ink"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                {word}
              </Word>
            );
          })}
        </p>

        <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-12 lg:mt-32 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="flex flex-col-reverse gap-3">
              <dt className="text-sm leading-snug text-stone">{item.label}</dt>
              <dd className="font-display text-[clamp(2.75rem,2rem+2.5vw,4.5rem)] leading-none font-light">
                <Counter value={item.value} suffix={item.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
