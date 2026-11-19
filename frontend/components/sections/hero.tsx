"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { heroWords } from "@/lib/content";

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const words = heroWords;

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduceMotion, words]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[92svh] w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=75"
          alt="Fachada de arranha-céu de luxo iluminada ao entardecer, com varandas amplas e paisagismo."
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center lg:px-12">
        <span className="mb-space-sm text-label-md font-medium uppercase tracking-[0.25em] text-secondary-fixed">
          Lançamento Atelier Residences
        </span>

        <h1 className="mb-space-md max-w-4xl text-4xl tracking-tight text-surface sm:text-5xl lg:text-headline-xl">
          <span className="sr-only">
            Reserva Imperiale: residências de alto padrão na Avenida Paulista
          </span>
          <span aria-hidden="true">
          Reserva Imperiale: o ápice da
          <span className="relative mx-auto flex h-[1.25em] w-full justify-center overflow-hidden">
            {words.map((word, index) => (
              <motion.span
                key={word}
                className="absolute whitespace-nowrap font-semibold text-secondary-fixed"
                initial={{ opacity: 0, y: 40 }}
                animate={
                  wordIndex === index
                    ? { y: 0, opacity: 1 }
                    : { y: wordIndex > index ? -40 : 40, opacity: 0 }
                }
                transition={{ type: "spring", stiffness: 60, damping: 14 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          e exclusividade
          </span>
        </h1>

        <p className="mb-space-lg max-w-2xl font-light text-body-lg text-surface-variant">
          Residências de 520 a 680m² na Avenida Paulista, com projeto arquitetônico
          autoral, rooftop privativo e acabamentos selecionados.
        </p>

        <div className="flex flex-col items-center gap-space-sm sm:flex-row">
          <a
            href="#contato"
            className="rounded bg-secondary-container px-space-lg py-4 text-label-md font-medium uppercase tracking-wider text-on-secondary-container shadow-xl transition-all hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-fixed"
          >
            Agendar Visita Exclusiva
          </a>
          <a
            href="#empreendimento"
            className="rounded border border-surface/30 px-space-lg py-4 text-label-md uppercase tracking-wider text-surface transition-all hover:bg-surface/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
          >
            Explorar Projeto
          </a>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-space-xs text-surface/60 motion-safe:animate-bounce">
        <span className="text-label-sm uppercase tracking-widest">Descubra</span>
        <ArrowDown className="size-4" aria-hidden="true" />
      </div>
    </section>
  );
}
