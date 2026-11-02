"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Eyebrow } from "@/components/reveal";
import { differentials, gallery } from "@/lib/content";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

function Intro() {
  return (
    <div className="flex w-full shrink-0 flex-col justify-between gap-10 lg:w-[34rem] lg:py-4">
      <div>
        <Eyebrow index="04">Conceito</Eyebrow>
        <h2 id="conceito-title" className="mt-6 font-display text-title font-light">
          Onde a arte encontra <em className="italic">a engenharia.</em>
        </h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
          Materiais nobres, fachada viva em brises de madeira e uma curadoria que começa
          na pedreira e termina no último puxador.
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8">
        {differentials.map((item) => (
          <div key={item.title}>
            <dt className="font-display text-xl">{item.title}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-stone">{item.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Frame({ item, index, className }: { item: (typeof gallery)[number]; index: number; className?: string }) {
  return (
    <figure className={cn("group shrink-0", className)}>
      <div className="relative h-full overflow-hidden rounded-[2rem]">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 85vw"
          className="object-cover transition-[scale] duration-[1400ms] ease-(--ease-lux) group-hover:scale-105"
        />
      </div>
      <figcaption className="mt-4 flex items-baseline gap-4 text-sm text-stone">
        <span className="eyebrow text-bronze">0{index + 1}</span>
        {item.caption}
      </figcaption>
    </figure>
  );
}

/** Desktop: o scroll vertical move o trilho na horizontal. */
function PinnedTrack() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section
      id="conceito"
      ref={sectionRef}
      aria-labelledby="conceito-title"
      className="relative bg-sand"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex h-[72vh] items-stretch gap-10 px-12 will-change-transform">
          <Intro />
          {gallery.map((item, i) => (
            <Frame
              key={item.src}
              item={item}
              index={i}
              className={cn("h-[calc(100%-2.5rem)]", i % 2 === 0 ? "w-[52vw]" : "w-[34vw] self-end")}
            />
          ))}
          <div aria-hidden="true" className="w-12 shrink-0" />
        </motion.div>
        <div aria-hidden="true" className="mx-12 mt-10 h-px bg-line">
          <motion.div className="h-full origin-left bg-ink" style={{ scaleX: bar }} />
        </div>
      </div>
    </section>
  );
}

/** Mobile ou movimento reduzido: trilho com scroll nativo. */
function NativeTrack() {
  return (
    <section id="conceito" aria-labelledby="conceito-title" className="bg-sand py-24">
      <div className="px-5 sm:px-8">
        <Intro />
      </div>
      <ul
        aria-label="Galeria do empreendimento"
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 sm:scroll-px-8 sm:px-8"
      >
        {gallery.map((item, i) => (
          <li key={item.src} className="snap-start">
            <Frame item={item} index={i} className="h-[52svh] w-[82vw] max-w-lg [&>div]:h-[calc(100%-2.5rem)]" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ScrollShowcase() {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();
  return desktop && !reduceMotion ? <PinnedTrack /> : <NativeTrack />;
}
