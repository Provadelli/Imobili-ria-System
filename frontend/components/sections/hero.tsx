"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroImage } from "@/lib/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex h-[100svh] min-h-[620px] w-full items-end overflow-hidden bg-ink text-cream"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
        <div className="relative h-full w-full motion-safe:animate-ken-burns">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Gradientes garantem contraste do texto (WCAG 1.4.3) */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-[90rem] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20"
      >
        <p className="eyebrow mb-8 flex motion-safe:animate-fade-rise [animation-delay:200ms] items-center gap-4 text-champagne">
          <span>Reserva Imperiale</span>
          <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
          <span>Lançamento 2028</span>
        </p>

        <h1 id="hero-title" className="font-display text-display font-light">
          {["A arte de", "morar acima."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              {/* Animações de entrada em CSS: rodam antes da hidratação e não atrasam o LCP */}
              <span
                className={`block motion-safe:animate-mask-up ${i === 1 ? "italic" : ""}`}
                style={{ animationDelay: `${350 + i * 120}ms` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-sm text-base leading-relaxed text-cream/80 motion-safe:animate-rise [animation-delay:700ms]">
            Coberturas, gardens e andares inteiros com arquitetura autoral, no endereço mais
            desejado de São Paulo.
          </p>

          <div className="flex items-center gap-6 motion-safe:animate-fade-rise [animation-delay:900ms]">
            <Button asChild variant="pill-light" size="pill-lg">
              <Link href="#manifesto">Descobrir o projeto</Link>
            </Button>
            <Link
              href="#manifesto"
              aria-label="Rolar para a próxima seção"
              className="hidden flex-col items-center gap-3 text-cream/70 transition-colors hover:text-cream md:flex"
            >
              <span aria-hidden="true" className="relative block h-14 w-px overflow-hidden bg-cream/20">
                <span className="absolute inset-0 bg-cream motion-safe:animate-scroll-line" />
              </span>
              <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
