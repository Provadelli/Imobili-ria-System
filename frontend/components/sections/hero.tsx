"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { heroWords } from "@/lib/content";

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const words = heroWords;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduceMotion ? 1 : 0]);

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
      ref={sectionRef}
      className="relative flex min-h-[92svh] w-full items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-x-0 -top-[20%] bottom-0 z-0" style={{ y: imageY }}>
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=75"
          alt="Fachada de arranha-céu de luxo iluminada ao entardecer, com varandas amplas e paisagismo."
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-75"
        />
        </motion.div>
        <div className="absolute inset-0 bg-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center lg:px-12"
      >
        <motion.span variants={rise} className="mb-space-sm text-label-md font-medium uppercase tracking-[0.25em] text-secondary-fixed">
          Lançamento Atelier Residences
        </motion.span>

        <motion.span
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-space-sm block h-px w-24 origin-center bg-secondary-fixed"
        />

        <motion.h1 variants={rise} className="mb-space-md max-w-4xl text-4xl tracking-tight text-surface sm:text-5xl lg:text-headline-xl">
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
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          e exclusividade
          </span>
        </motion.h1>

        <motion.p variants={rise} className="mb-space-lg max-w-2xl font-light text-body-lg text-surface-variant">
          Residências de 520 a 680m² na Avenida Paulista, com projeto arquitetônico
          autoral, rooftop privativo e acabamentos selecionados.
        </motion.p>

        <motion.div variants={rise} className="flex flex-col items-center gap-space-sm sm:flex-row">
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
        </motion.div>
      </motion.div>

      <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-space-xs text-surface/60 motion-safe:animate-bounce">
        <span className="text-label-sm uppercase tracking-widest">Descubra</span>
        <ArrowDown className="size-4" aria-hidden="true" />
      </div>
    </section>
  );
}
