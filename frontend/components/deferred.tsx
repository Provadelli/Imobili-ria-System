"use client";

import dynamic from "next/dynamic";

/** Carrega só no cliente, depois do conteúdo principal. */
export const FloorPlan3D = dynamic(
  () => import("@/components/floor-plan-3d").then((mod) => mod.FloorPlan3D),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="min-h-[640px] animate-pulse rounded-3xl border border-white/10 bg-[#0c1020]"
      />
    ),
  },
);
