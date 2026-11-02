"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { amenities } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const DRAG_THRESHOLD = 110;
const AUTOPLAY_MS = 6000;

/**
 * Carrossel em pilha: a carta do topo pode ser arrastada para os lados
 * e vai para o fundo do baralho. Teclado: setas ← →. Autoplay com pausa
 * explícita (WCAG 2.2.2) e pausa automática em hover/foco.
 */
export function AmenitiesCarousel({ items }: { items: typeof amenities }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const n = items.length;
  const autoplay = playing && !hovered && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay, n]);

  const next = () => setIndex((i) => (i + 1) % n);
  const prev = () => setIndex((i) => (i - 1 + n) % n);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) > DRAG_THRESHOLD || Math.abs(info.velocity.x) > 600) {
      if (info.offset.x < 0) next();
      else prev();
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  }

  const current = items[index];

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Experiências do Reserva Imperiale"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20"
    >
      {/* Texto + controles */}
      <div className="order-2 lg:order-1">
        <div aria-live={autoplay ? "off" : "polite"} aria-atomic="true" className="min-h-[11rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="eyebrow text-champagne">
                <span className="sr-only">Experiência </span>
                {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-display text-5xl font-light lg:text-6xl">{current.title}</h3>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-cream/80">{current.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <Button variant="pill-light" size="icon-pill" onClick={prev} aria-label="Experiência anterior">
            <ArrowLeft aria-hidden="true" />
          </Button>
          <Button variant="pill-light" size="icon-pill" onClick={next} aria-label="Próxima experiência">
            <ArrowRight aria-hidden="true" />
          </Button>
          {!reduceMotion && (
            <Button
              variant="pill-light"
              size="icon-pill"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pausar rotação automática" : "Retomar rotação automática"}
            >
              {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            </Button>
          )}
          {/* Barra de tempo do autoplay */}
          <div aria-hidden="true" className="ml-4 h-px flex-1 overflow-hidden bg-cream/20">
            {autoplay && (
              <motion.div
                key={index}
                className="h-full origin-left bg-champagne"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Pilha de cartas */}
      <div className="relative order-1 mx-auto aspect-[4/5] w-full max-w-[26rem] lg:order-2 lg:max-w-[30rem]">
        {items.map((item, i) => {
          const depth = (i - index + n) % n;
          const isTop = depth === 0;
          return (
            <motion.div
              key={item.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${n}: ${item.title}`}
              aria-hidden={!isTop}
              className="absolute inset-0 overflow-hidden rounded-[2rem] bg-ink-soft shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
              style={{ zIndex: n - depth, cursor: isTop ? "grab" : "default" }}
              initial={false}
              animate={{
                y: depth * -26,
                scale: 1 - depth * 0.07,
                rotate: depth === 0 ? 0 : depth % 2 ? 3 : -3,
                opacity: depth > 2 ? 0 : 1 - depth * 0.15,
              }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE }}
              drag={isTop && !reduceMotion ? "x" : false}
              dragSnapToOrigin
              dragElastic={0.6}
              whileDrag={{ cursor: "grabbing", rotate: 0 }}
              onDragEnd={isTop ? onDragEnd : undefined}
            >
              <Image
                src={item.image}
                alt={isTop ? item.alt : ""}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 30rem, 90vw"
                className="pointer-events-none object-cover select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <span className="eyebrow absolute bottom-6 left-6 text-cream">{item.title}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
