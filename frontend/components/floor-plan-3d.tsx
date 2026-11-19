"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { RotateCw, Layers, Pause, Play, Compass } from "lucide-react";
import {
  floorPlans,
  roomArea,
  type FloorPlan,
  type Room,
  type RoomType,
} from "@/lib/floor-plans";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Planta isométrica em SVG — projeção calculada no cliente, sem bibliotecas  */
/* -------------------------------------------------------------------------- */

const W = 920;
const H = 560;
const WALL_H = 1.3;
const SLAB = 0.28;

const palette: Record<RoomType, { top: string; label: string }> = {
  living: { top: "#3a4a6b", label: "Estar" },
  kitchen: { top: "#46567a", label: "Cozinha" },
  dining: { top: "#41507a", label: "Jantar" },
  bedroom: { top: "#33415f", label: "Dormitório" },
  terrace: { top: "#2f6b7a", label: "Terraço" },
  garden: { top: "#2f6a52", label: "Jardim" },
  hall: { top: "#4a4f6e", label: "Hall" },
};

/** Cada tipo sobe um degrau diferente quando a planta é "explodida". */
const tier: Record<RoomType, number> = {
  garden: 0,
  terrace: 0,
  living: 1,
  hall: 1,
  kitchen: 2,
  dining: 2,
  bedroom: 3,
};

type Prop = { fx: number; fy: number; fw: number; fd: number; h: number; color: string; kind?: "water" | "tree" };

const propsFor = (room: Room): Prop[] => {
  switch (room.type) {
    case "bedroom":
      return [
        { fx: 0.25, fy: 0.2, fw: 0.5, fd: 0.55, h: 0.35, color: "#e9dcc3" },
        { fx: 0.3, fy: 0.2, fw: 0.4, fd: 0.14, h: 0.55, color: "#c9ad84" },
      ];
    case "living":
      return [
        { fx: 0.15, fy: 0.55, fw: 0.45, fd: 0.2, h: 0.4, color: "#d8cdb8" },
        { fx: 0.25, fy: 0.3, fw: 0.25, fd: 0.15, h: 0.18, color: "#c9ad84" },
        { fx: 0.7, fy: 0.15, fw: 0.2, fd: 0.2, h: 0.3, color: "#8a7a5c" },
      ];
    case "kitchen":
      return [{ fx: 0.2, fy: 0.35, fw: 0.6, fd: 0.25, h: 0.45, color: "#e9dcc3" }];
    case "dining":
      return [{ fx: 0.2, fy: 0.25, fw: 0.6, fd: 0.5, h: 0.32, color: "#c9ad84" }];
    case "terrace":
      return [{ fx: 0.12, fy: 0.2, fw: 0.76, fd: 0.6, h: 0.04, color: "#5ad0f2", kind: "water" }];
    case "garden":
      return [
        { fx: 0.2, fy: 0.3, fw: 0.14, fd: 0.14, h: 0.9, color: "#52c58f", kind: "tree" },
        { fx: 0.62, fy: 0.55, fw: 0.14, fd: 0.14, h: 0.7, color: "#52c58f", kind: "tree" },
      ];
    case "hall":
      return [{ fx: 0.3, fy: 0.3, fw: 0.4, fd: 0.4, h: 0.1, color: "#c9ad84" }];
  }
};

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function shade(hex: string, f: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => clamp(Math.round(v * f), 0, 255);
  return `rgb(${c((n >> 16) & 255)} ${c((n >> 8) & 255)} ${c(n & 255)})`;
}

type Edge = { name: "N" | "S" | "W" | "E"; nx: number; ny: number };
const edges: Edge[] = [
  { name: "N", nx: 0, ny: -1 },
  { name: "S", nx: 0, ny: 1 },
  { name: "W", nx: -1, ny: 0 },
  { name: "E", nx: 1, ny: 0 },
];

type Props3D = { initialPlan?: FloorPlan["id"] };

export function FloorPlan3D({ initialPlan = "cobertura" }: Props3D) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { margin: "-80px" });

  const [planId, setPlanId] = useState<FloorPlan["id"]>(initialPlan);
  const [selected, setSelected] = useState<string | null>(null);
  const [angle, setAngle] = useState(-0.62);
  const [explode, setExplode] = useState(0);
  const [auto, setAuto] = useState(!reduce);
  const drag = useRef<{ x: number; angle: number } | null>(null);

  const plan = useMemo(() => floorPlans.find((p) => p.id === planId) ?? floorPlans[0], [planId]);
  const room = plan.rooms.find((r) => r.id === selected) ?? null;

  // Permite que o catálogo de imóveis escolha a tipologia.
  useEffect(() => {
    const onSelect = (event: Event) => {
      const id = (event as CustomEvent<FloorPlan["id"]>).detail;
      if (floorPlans.some((p) => p.id === id)) {
        setPlanId(id);
        setSelected(null);
      }
    };
    window.addEventListener("plan:select", onSelect);
    return () => window.removeEventListener("plan:select", onSelect);
  }, []);

  // Rotação lenta quando visível e sem interação.
  useEffect(() => {
    if (!auto || !inView || reduce) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const tick = (now: number) => {
      acc += now - last;
      last = now;
      if (acc > 33) {
        setAngle((a) => a + acc * 0.00012);
        acc = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [auto, inView, reduce]);

  const toggleExplode = useCallback(() => {
    const target = explode > 0.5 ? 0 : 1;
    if (reduce) return setExplode(target);
    animate(explode, target, { duration: 1.1, ease: [0.22, 1, 0.36, 1], onUpdate: setExplode });
  }, [explode, reduce]);

  /* ----------------------------- projeção --------------------------------- */
  const scale = 1240 / (plan.cols + plan.rows);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const cx0 = plan.cols / 2;
  const cy0 = plan.rows / 2;

  const project = (x: number, y: number, z: number): [number, number] => {
    const px = x - cx0;
    const py = y - cy0;
    const rx = px * cos - py * sin;
    const ry = px * sin + py * cos;
    return [W / 2 + rx * scale, H * (0.6 + explode * 0.2) + ry * scale * 0.6 - z * scale * 0.8];
  };

  const pts = (list: [number, number][]) => list.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  const depth = (x: number, y: number) => {
    const px = x - cx0;
    const py = y - cy0;
    return px * sin + py * cos;
  };

  /** Desenha um prisma (topo + faces voltadas ao observador). */
  const box = (
    key: string,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    z0: number,
    z1: number,
    color: string,
    extra?: { opacity?: number; stroke?: string; strokeWidth?: number },
  ) => {
    const nodes: ReactNode[] = [];
    edges.forEach((e) => {
      const facing = e.nx * sin + e.ny * cos > 0.001;
      if (!facing) return;
      const a: [number, number] = e.name === "N" ? [x0, y0] : e.name === "S" ? [x0, y1] : e.name === "W" ? [x0, y0] : [x1, y0];
      const b: [number, number] = e.name === "N" ? [x1, y0] : e.name === "S" ? [x1, y1] : e.name === "W" ? [x0, y1] : [x1, y1];
      const light = e.nx * sin + e.ny * cos;
      nodes.push(
        <polygon
          key={`${key}-${e.name}`}
          points={pts([project(a[0], a[1], z0), project(b[0], b[1], z0), project(b[0], b[1], z1), project(a[0], a[1], z1)])}
          fill={shade(color, 0.55 + light * 0.3)}
          fillOpacity={extra?.opacity ?? 1}
        />,
      );
    });
    nodes.push(
      <polygon
        key={`${key}-top`}
        points={pts([project(x0, y0, z1), project(x1, y0, z1), project(x1, y1, z1), project(x0, y1, z1)])}
        fill={color}
        fillOpacity={extra?.opacity ?? 1}
        stroke={extra?.stroke}
        strokeWidth={extra?.strokeWidth}
        strokeLinejoin="round"
      />,
    );
    return nodes;
  };

  /* --------------------------- fundo e sombras ----------------------------- */
  const grid: ReactNode[] = [];
  const pad = 3;
  for (let i = -pad; i <= plan.cols + pad; i++) {
    grid.push(
      <line
        key={`gx${i}`}
        x1={project(i, -pad, -0.4)[0]}
        y1={project(i, -pad, -0.4)[1]}
        x2={project(i, plan.rows + pad, -0.4)[0]}
        y2={project(i, plan.rows + pad, -0.4)[1]}
      />,
    );
  }
  for (let j = -pad; j <= plan.rows + pad; j++) {
    grid.push(
      <line
        key={`gy${j}`}
        x1={project(-pad, j, -0.4)[0]}
        y1={project(-pad, j, -0.4)[1]}
        x2={project(plan.cols + pad, j, -0.4)[0]}
        y2={project(plan.cols + pad, j, -0.4)[1]}
      />,
    );
  }

  const ordered = [...plan.rooms].sort(
    (a, b) => depth(a.x + a.w / 2, a.y + a.d / 2) - depth(b.x + b.w / 2, b.y + b.d / 2),
  );

  const renderRoom = (r: Room) => {
    const isSel = r.id === selected;
    const lift = tier[r.type] * explode * 1.5 + (isSel ? 0.55 : 0);
    const zb = lift;
    const zt = lift + SLAB;
    const base = palette[r.type].top;
    const x1 = r.x + r.w;
    const y1 = r.y + r.d;
    const nodes: ReactNode[] = [];

    // laje + piso
    nodes.push(
      ...box(`${r.id}-slab`, r.x, r.y, x1, y1, zb, zt, isSel ? shade(base, 1.35) : base, {
        stroke: isSel ? "#fff1cf" : "rgba(233,207,160,0.55)",
        strokeWidth: isSel ? 2 : 1,
      }),
    );

    // paredes dos fundos (face interna, translúcida)
    edges.forEach((e) => {
      const facing = e.nx * sin + e.ny * cos > 0.001;
      if (facing) return;
      const a: [number, number] = e.name === "N" ? [r.x, r.y] : e.name === "S" ? [r.x, y1] : e.name === "W" ? [r.x, r.y] : [x1, r.y];
      const b: [number, number] = e.name === "N" ? [x1, r.y] : e.name === "S" ? [x1, y1] : e.name === "W" ? [r.x, y1] : [x1, y1];
      const wallTop = zt + WALL_H;
      nodes.push(
        <polygon
          key={`${r.id}-w-${e.name}`}
          points={pts([project(a[0], a[1], zt), project(b[0], b[1], zt), project(b[0], b[1], wallTop), project(a[0], a[1], wallTop)])}
          fill={isSel ? "rgba(255,241,207,0.22)" : "rgba(180,200,235,0.13)"}
          stroke={isSel ? "#fff1cf" : "rgba(233,207,160,0.45)"}
          strokeWidth={isSel ? 1.6 : 1}
          strokeLinejoin="round"
        />,
      );
    });

    // mobiliário
    propsFor(r)
      .map((p, i) => ({ p, i }))
      .sort((a, b) => depth(r.x + (a.p.fx + a.p.fw / 2) * r.w, r.y + (a.p.fy + a.p.fd / 2) * r.d) - depth(r.x + (b.p.fx + b.p.fw / 2) * r.w, r.y + (b.p.fy + b.p.fd / 2) * r.d))
      .forEach(({ p, i }) => {
        const px0 = r.x + p.fx * r.w;
        const py0 = r.y + p.fy * r.d;
        const px1 = px0 + p.fw * r.w;
        const py1 = py0 + p.fd * r.d;
        if (p.kind === "tree") {
          const [tx, ty] = project((px0 + px1) / 2, (py0 + py1) / 2, zt);
          const [, topY] = project((px0 + px1) / 2, (py0 + py1) / 2, zt + p.h + 0.9);
          nodes.push(
            <g key={`${r.id}-p${i}`}>
              <line x1={tx} y1={ty} x2={tx} y2={topY + 8} stroke="#8a6a44" strokeWidth={3} />
              <circle cx={tx} cy={topY} r={scale * 0.5} fill="#52c58f" fillOpacity={0.9} />
              <circle cx={tx - scale * 0.15} cy={topY - scale * 0.1} r={scale * 0.28} fill="#7ee0ae" fillOpacity={0.7} />
            </g>,
          );
          return;
        }
        nodes.push(
          ...box(`${r.id}-p${i}`, px0, py0, px1, py1, zt, zt + p.h, p.color, {
            opacity: p.kind === "water" ? 0.85 : 1,
            stroke: p.kind === "water" ? "#b9f0ff" : undefined,
            strokeWidth: p.kind === "water" ? 1.5 : undefined,
          }),
        );
      });

    const [lx, ly] = project(r.x + r.w / 2, r.y + r.d / 2, zt + WALL_H + 0.7);
    const idx = plan.rooms.indexOf(r) + 1;

    return (
      <g
        key={r.id}
        className={cn("cursor-pointer", !reduce && "plan-float")}
        style={{ animationDelay: `${(idx % 5) * -0.9}s` }}
        onPointerEnter={() => setSelected(r.id)}
        onClick={() => setSelected(r.id)}
      >
        {nodes}
        <g aria-hidden="true">
          <circle cx={lx} cy={ly} r={isSel ? 15 : 11} fill={isSel ? "#fff1cf" : "#0f1320"} stroke="#e9cfa0" strokeWidth={1.5} />
          <text x={lx} y={ly + 4} textAnchor="middle" fontSize={isSel ? 13 : 11} fontWeight={700} fill={isSel ? "#171a26" : "#e9cfa0"}>
            {idx}
          </text>
        </g>
      </g>
    );
  };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    drag.current = { x: e.clientX, angle };
    setAuto(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag.current) return;
    setAngle(drag.current.angle + (e.clientX - drag.current.x) * 0.008);
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const degrees = ((((angle * 180) / Math.PI) % 360) + 360) % 360;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Palco 3D */}
      <div
        ref={stageRef}
        className="plan-stage relative flex items-center overflow-hidden rounded-3xl border border-white/10 bg-[#0c1020] lg:col-span-8"
      >
        <div className="pointer-events-none absolute top-5 left-5 z-10 flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.18em] text-champagne/90 uppercase">
          <Compass className="size-4" aria-hidden="true" />
          Planta isométrica · {plan.label}
        </div>
        <div className="pointer-events-none absolute top-5 right-5 z-10 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.7rem] text-cream/80 tabular-nums">
          {Math.round(degrees)}°
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Planta em 3D da ${plan.label}, com ${plan.rooms.length} ambientes. Use a lista ao lado para ler cada ambiente.`}
          className="block h-auto w-full touch-pan-y cursor-grab select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <defs>
            <radialGradient id="plan-glow" cx="50%" cy="58%" r="55%">
              <stop offset="0%" stopColor="#2a3a68" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0c1020" stopOpacity="0" />
            </radialGradient>
            <filter id="plan-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <rect width={W} height={H} fill="url(#plan-glow)" />
          <g stroke="rgba(233,207,160,0.12)" strokeWidth={1}>{grid}</g>

          {/* sombras projetadas no chão */}
          <g filter="url(#plan-blur)" fillOpacity={0.35 - explode * 0.15} fill="#000">
            {plan.rooms.map((r) => (
              <polygon
                key={`sh-${r.id}`}
                points={pts([
                  project(r.x, r.y, -0.38),
                  project(r.x + r.w, r.y, -0.38),
                  project(r.x + r.w, r.y + r.d, -0.38),
                  project(r.x, r.y + r.d, -0.38),
                ])}
              />
            ))}
          </g>

          {ordered.map(renderRoom)}
        </svg>

        <p className="pointer-events-none absolute bottom-4 left-5 z-10 text-[0.7rem] text-cream/60">
          Arraste para girar · passe o mouse sobre um ambiente
        </p>
      </div>

      {/* Painel de controle */}
      <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-[#11162a] p-6 text-cream lg:col-span-4">
        <div role="tablist" aria-label="Tipologia" className="grid grid-cols-3 gap-1 rounded-full bg-white/5 p-1">
          {floorPlans.map((p) => (
            <button
              key={p.id}
              role="tab"
              type="button"
              aria-selected={p.id === planId}
              onClick={() => {
                setPlanId(p.id);
                setSelected(null);
              }}
              className={cn(
                "rounded-full px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-champagne",
                p.id === planId ? "bg-champagne text-ink" : "text-cream/75 hover:text-cream",
              )}
            >
              {p.label.split(" ")[0]}
            </button>
          ))}
        </div>

        <div>
          <p className="text-3xl font-semibold tracking-tight tabular-nums">{plan.area} m²</p>
          <p className="mt-1 text-sm text-cream/70">
            Área privativa · {plan.rooms.length} ambientes
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={toggleExplode}
            aria-pressed={explode > 0.5}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-3 text-xs font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-champagne aria-pressed:border-champagne aria-pressed:text-champagne"
          >
            <Layers className="size-4" aria-hidden="true" />
            {explode > 0.5 ? "Juntar" : "Explodir"}
          </button>
          <button
            type="button"
            onClick={() => setAuto((v) => !v)}
            aria-pressed={auto}
            disabled={reduce === true}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-3 text-xs font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-champagne disabled:opacity-40 aria-pressed:border-champagne aria-pressed:text-champagne"
          >
            {auto ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
            Girar
          </button>
        </div>

        <label className="block text-xs text-cream/75">
          <span className="mb-2 flex items-center gap-2">
            <RotateCw className="size-3.5" aria-hidden="true" /> Ângulo
          </span>
          <input
            type="range"
            min={0}
            max={360}
            value={Math.round(degrees)}
            onChange={(e) => {
              setAuto(false);
              setAngle((Number(e.target.value) * Math.PI) / 180);
            }}
            className="w-full accent-[#e9cfa0]"
          />
        </label>

        <div aria-live="polite" className="min-h-[5.5rem] rounded-2xl border border-white/10 bg-white/5 p-4">
          {room ? (
            <>
              <p className="text-sm font-semibold">{room.name}</p>
              <p className="mt-0.5 text-xs text-champagne tabular-nums">
                ≈ {roomArea(plan, room)} m² · {palette[room.type].label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-cream/75">{room.note}</p>
            </>
          ) : (
            <p className="text-xs leading-relaxed text-cream/70">
              Escolha um ambiente na lista ou direto na planta para ver área e detalhes.
            </p>
          )}
        </div>

        <ol className="grid gap-1 text-sm">
          {plan.rooms.map((r, i) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => setSelected(r.id)}
                aria-pressed={r.id === selected}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-champagne",
                  r.id === selected && "bg-white/10",
                )}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-champagne/60 text-[0.7rem] font-semibold text-champagne">
                  {i + 1}
                </span>
                <span className="flex-1 truncate">{r.name}</span>
                <span className="text-xs text-cream/60 tabular-nums">{roomArea(plan, r)} m²</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
