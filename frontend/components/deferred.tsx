"use client";

import dynamic from "next/dynamic";

/** Elemento decorativo: só carrega no cliente, depois do conteúdo principal. */
export const ScrollProgress = dynamic(
  () => import("@/components/scroll-progress").then((mod) => mod.ScrollProgress),
  { ssr: false },
);
