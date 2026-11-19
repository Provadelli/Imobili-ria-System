"use client";

import type { ReactNode } from "react";
import { LazyMotion } from "motion/react";

/** Carrega os recursos de animação depois da hidratação, fora do caminho crítico. */
const loadFeatures = () => import("@/components/motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
