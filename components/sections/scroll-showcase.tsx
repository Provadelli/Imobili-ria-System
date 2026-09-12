"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion, type MotionValue } from "motion/react";
import { conceptImages, differentials } from "@/lib/content";

interface PanelProps {
  scrollYProgress: MotionValue<number>;
}

function ConceptPanel({ scrollYProgress }: PanelProps) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -3]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 flex h-screen flex-col justify-center bg-surface-container-low px-6 lg:px-12"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-4">
        <span className="text-label-md uppercase tracking-[0.2em] text-secondary">
          Conceito Arquitetônico
        </span>
        <h2 className="max-w-2xl font-heading text-headline-lg text-primary">
          Onde a arte encontra a alta engenharia residencial.
        </h2>
        <p className="max-w-xl font-light leading-relaxed text-body-lg text-on-surface-variant">
          Cada linha do Reserva Imperiale foi meticulosamente desenhada para estabelecer
          um novo padrão de elegância. Materiais nobres como mármore italiano Calacatta,
          painéis em madeira maciça e brises pivotantes criam uma fachada viva e
          imponente.
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

function GalleryPanel({ scrollYProgress }: PanelProps) {
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [3, 0]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className="relative h-screen bg-primary px-6 py-16 text-surface lg:px-12"
    >
      <div className="mx-auto grid h-full max-w-7xl grid-cols-2 gap-4">
        {conceptImages.map((image) => (
          <div key={image.alt} className={`relative overflow-hidden rounded-xl ${image.className}`}>
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="empreendimento" ref={containerRef} className="relative h-[220vh] w-full">
      <ConceptPanel scrollYProgress={scrollYProgress} />
      <GalleryPanel scrollYProgress={scrollYProgress} />
    </section>
  );
}
