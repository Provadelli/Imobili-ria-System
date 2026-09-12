"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { heroWords } from "@/lib/content";

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = useMemo(() => heroWords, []);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(id);
  }, [words]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center brightness-75"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80')",
          }}
          role="img"
          aria-label="Fachada de arranha-céu de luxo iluminada ao entardecer, com varandas amplas e paisagismo sofisticado."
        />
        <div className="absolute inset-0 bg-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center lg:px-12">
        <span className="mb-space-sm text-label-md font-medium uppercase tracking-[0.25em] text-secondary-fixed">
          Atelier Residences Apresenta
        </span>

        <h1 className="mb-space-md max-w-4xl text-[42px] tracking-tight text-surface lg:text-headline-xl">
          Reserva Imperiale: o ápice da{" "}
          <span className="relative inline-flex h-[1.15em] w-[9.5ch] justify-center align-bottom overflow-hidden text-left align-baseline sm:w-[10.5ch]">
            {words.map((word, index) => (
              <motion.span
                key={word}
                className="absolute font-semibold text-secondary-fixed"
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
          </span>{" "}
          e exclusividade
        </h1>

        <p className="mb-space-lg max-w-2xl font-light text-body-lg text-surface-variant">
          Uma obra-prima arquitetônica concebida para poucos. Viver aqui é redefinir o
          conceito de lar através de uma experiência sensorial incomparável.
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

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-space-xs text-surface/60 motion-safe:animate-bounce">
        <span className="text-label-sm uppercase tracking-widest">Descubra</span>
        <ArrowDown className="size-4" aria-hidden="true" />
      </div>
    </section>
  );
}
