"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (paused || prefersReducedMotion) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [paused]);

  const current = testimonials[index];

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-heading"
      className="bg-primary py-space-xl text-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
        <span className="mb-space-xs block text-label-md uppercase tracking-[0.2em] text-secondary-fixed">
          Depoimentos
        </span>
        <h2 id="depoimentos-heading" className="mb-space-lg font-heading text-headline-lg">
          Quem já vive a experiência Atelier
        </h2>

        <Quote className="mx-auto mb-space-sm size-10 text-secondary-fixed" aria-hidden="true" />

        <div
          className="relative min-h-[220px]"
          role="group"
          aria-roledescription="carrossel"
          aria-label="Depoimentos de clientes"
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              aria-live="polite"
            >
              <blockquote className="mb-space-md font-light text-body-lg text-surface-variant">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <figcaption className="flex flex-col items-center gap-2">
                <div className="relative size-14 overflow-hidden rounded-full ring-2 ring-secondary-fixed/60">
                  <Image
                    src={current.avatar}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <span className="font-heading text-headline-sm">{current.name}</span>
                <span className="text-body-sm text-surface-variant">{current.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-space-md flex items-center justify-center gap-3">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver depoimento de ${testimonial.name}`}
              aria-current={i === index}
              className={`size-2.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-fixed ${
                i === index ? "bg-secondary-fixed" : "bg-surface/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
