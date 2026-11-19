"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Anima valores como "18", "1.200+" ou "98%" ao entrar na tela. */
export function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\D*)([\d.]+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const target = match ? Number(match[2].replace(/\./g, "")) : 0;
  const [display, setDisplay] = useState(reduce || !match ? target : 0);

  useEffect(() => {
    if (!inView || reduce || !match) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, target]);

  if (!match) return <span>{value}</span>;
  const formatted = display.toLocaleString("pt-BR");
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {match[1]}
        {formatted}
        {match[3]}
      </span>
    </span>
  );
}
