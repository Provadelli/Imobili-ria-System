"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroImage, residences } from "@/lib/content";

const slides = [
  {
    key: "fachada",
    title: "Reserva Imperiale",
    meta: "40 pavimentos · 48 residências",
    image: heroImage.src,
    alt: heroImage.alt,
  },
  ...residences.map((r) => ({
    key: r.id,
    title: r.name,
    meta: `${r.area} m² · ${r.suites} suítes · ${r.parking} vagas`,
    image: r.image,
    alt: r.alt,
  })),
];

const DURATION = 6000;

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => setIndex((next + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(id);
  }, [index, paused, reduce, go]);

  const slide = slides[index];

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-cream pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      <div className="mx-auto grid max-w-[80rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12">
        <div className="lg:col-span-5">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-bronze">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-bronze" />
            Entrega prevista em 2028
          </p>
          <h1
            id="hero-title"
            className="font-display mt-6 text-display font-semibold tracking-tight text-balance text-ink"
          >
            Residências de alto padrão <em>nos Jardins</em>, em São Paulo.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
            Três tipologias de 520 a 680&nbsp;m², com projeto arquitetônico autoral. Veja as
            plantas, explore cada ambiente em 3D e converse com um consultor.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="default" size="pill-lg">
              <Link href="#imoveis">
                Ver imóveis
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="pill" size="pill-lg">
              <Link href="#planta">Explorar planta 3D</Link>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              ["48", "residências"],
              ["40", "pavimentos"],
              ["4º tri", "entrega 2028"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-semibold text-ink">{value}</dd>
                <dd className="text-xs text-stone">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label="Imóveis em destaque"
          className="lg:col-span-7"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink shadow-[0_30px_80px_-30px_rgba(21,13,10,0.45)] sm:aspect-[16/11]">
            <AnimatePresence initial={false} mode="popLayout">
              <m.div
                key={slide.key}
                initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  preload={index === 0}
                  className="object-cover"
                />
              </m.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="on-dark absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-4 sm:inset-x-6 sm:bottom-6">
              <div aria-live={paused ? "polite" : "off"} className="text-cream">
                <p className="font-display text-xl font-semibold sm:text-2xl">{slide.title}</p>
                <p className="mt-1 text-sm text-cream/80">{slide.meta}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Imóvel anterior"
                  className="flex size-11 items-center justify-center rounded-full border border-white/40 bg-black/25 text-cream transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-champagne"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Próximo imóvel"
                  className="flex size-11 items-center justify-center rounded-full border border-white/40 bg-black/25 text-cream transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-champagne"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2" role="group" aria-label="Escolher imóvel">
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ver ${s.title}`}
                aria-current={i === index ? "true" : undefined}
                className="relative h-6 focus-visible:outline-2 focus-visible:outline-bronze"
              >
                <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-line">
                  <span
                    key={i === index ? `${index}-${paused}` : i}
                    className="block h-full origin-left bg-bronze"
                    style={{
                      transform:
                        i < index || (i === index && (paused || reduce)) ? "scaleX(1)" : "scaleX(0)",
                      animation:
                        i === index && !paused && !reduce
                          ? `plan-progress ${DURATION}ms linear forwards`
                          : undefined,
                    }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
