"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, Dumbbell, PlaneTakeoff, Sparkles, Wine, type LucideIcon } from "lucide-react";
import type { amenities } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  Wine,
  Sparkles,
  Dumbbell,
  PlaneTakeoff,
};

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const SWIPE_THRESHOLD = 8000;

export function AmenitiesCarousel({ items }: { items: typeof amenities }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % items.length);
    }, 5500);
    return () => clearInterval(id);
  }, [paused, reducedMotion, items.length]);

  function goTo(nextIndex: number) {
    setDirection(nextIndex > index || (index === items.length - 1 && nextIndex === 0) ? 1 : -1);
    setIndex(((nextIndex % items.length) + items.length) % items.length);
  }

  function handlePrev() {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }

  function handleNext() {
    setDirection(1);
    setIndex((prev) => (prev + 1) % items.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handlePrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    }
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    setPaused(false);
    const swipePower = Math.abs(info.offset.x) * info.velocity.x;
    if (swipePower < -SWIPE_THRESHOLD) {
      handleNext();
    } else if (swipePower > SWIPE_THRESHOLD) {
      handlePrev();
    }
  }

  const current = items[index];
  const Icon = icons[current.icon];

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Comodidades do condomínio"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <p className="sr-only" aria-live="polite">
        {`${index + 1} de ${items.length}: ${current.title}`}
      </p>

      <div className="relative h-80 overflow-hidden rounded-2xl md:h-[32rem]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current.title}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
            drag="x"
            dragElastic={0.12}
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setPaused(true)}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.alt}
              fill
              sizes="(min-width: 768px) 80vw, 100vw"
              className="object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/90 via-primary/30 to-transparent p-8 md:p-12">
              <Icon className="mb-3 size-9 text-secondary-fixed" aria-hidden="true" />
              <h3 className="mb-2 font-heading text-headline-md text-surface md:text-headline-lg">
                {current.title}
              </h3>
              <p className="max-w-md font-light text-body-md text-surface-variant">
                {current.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={handlePrev}
          aria-label="Comodidade anterior"
          className="absolute top-1/2 left-4 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/80 text-primary shadow-md backdrop-blur transition-all hover:scale-105 hover:bg-secondary-container hover:text-on-secondary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:size-11"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Próxima comodidade"
          className="absolute top-1/2 right-4 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/80 text-primary shadow-md backdrop-blur transition-all hover:scale-105 hover:bg-secondary-container hover:text-on-secondary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:size-11"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-space-sm hidden grid-cols-4 gap-3 md:grid">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ver ${item.title}`}
            aria-current={i === index ? "true" : undefined}
            className={`group relative h-20 overflow-hidden rounded-lg transition-all ${
              i === index ? "ring-2 ring-secondary-fixed" : "opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-x-0 bottom-0 bg-primary/70 px-2 py-1 text-label-sm uppercase tracking-wider text-surface">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-space-sm flex items-center justify-center gap-3 md:hidden">
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ver ${item.title}`}
            aria-current={i === index ? "true" : undefined}
            className={`size-3 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${
              i === index ? "bg-secondary-foreground" : "bg-outline-variant"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
