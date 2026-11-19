"use client";

import type { ElementType, ReactNode } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

/** Revela o conteúdo ao entrar na tela (uma única vez). */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = defaultVariants,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/**
 * Título editorial: cada linha sobe de dentro de uma máscara.
 * Passe as linhas como array para controlar a quebra.
 */
export function MaskText({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  id,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <m.span
          key={i}
          className="block overflow-hidden pb-[0.08em]"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <m.span
            className={cn("block", lineClassName)}
            variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
            transition={{ duration: 0.9, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </m.span>
        </m.span>
      ))}
    </Tag>
  );
}

/** Rótulo de seção no formato "01 — Título". */
export function Eyebrow({
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-4 text-bronze", className)}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      <span>{children}</span>
    </p>
  );
}
