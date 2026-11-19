"use client";

/**
 * Skyline Chart Interactor
 * Inspirado no "connoisseur-stack-interactor" (clip-path + GSAP): aqui um
 * gráfico de barras se transforma em uma skyline conforme o scroll.
 *
 * Fases do scroll (P de 0 a 1):
 *   0.00–0.30  barras crescem a partir do eixo
 *   0.30–0.70  cada barra ganha recuo, coroamento e antena e vira um prédio
 *   0.70–1.00  céu de entardecer, janelas acendem e a foto real aparece
 *              recortada dentro da silhueta dos prédios (clipPath)
 *
 * Desempenho: um único objeto de estado é animado pelo GSAP e uma função
 * `render` escreve atributos direto no SVG (sem re-render do React por frame).
 * O GSAP é carregado sob demanda, fora do bundle inicial.
 */

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { getImageProps } from "next/image";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type SkylineSeries = {
  id: string;
  num: string;
  title: [string, string];
  description: string;
  unit: string;
  format: (v: number) => string;
  values: number[];
};

type Props = {
  series: SkylineSeries[];
  years: number[];
  image: string;
  source?: string;
  eyebrow?: string;
  heading?: [string, string];
  className?: string;
};

/* ---------- Geometria (viewBox 500 × 500) ---------- */
const BASE = 440;
const MAX_H = 300;
const X0 = 30;
const SLOT = 57;
const BAR_W = 30;
const TOWER_W = 46;
const STYLES = [
  { s: 14, inset: 5, spire: 0 },
  { s: 22, inset: 7, spire: 14 },
  { s: 10, inset: 4, spire: 0 },
  { s: 26, inset: 8, spire: 22 },
  { s: 18, inset: 6, spire: 8 },
  { s: 24, inset: 9, spire: 0 },
  { s: 20, inset: 6, spire: 30 },
  { s: 32, inset: 10, spire: 52 },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function mixHex(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(lerp(v, pb[i], t))).join(",")})`;
}

function slotX(i: number) {
  return X0 + i * SLOT;
}

/** Mesmo número de vértices para barra (m=0) e prédio (m=1) → morph suave. */
function towerPath(i: number, h: number, m: number) {
  const st = STYLES[i % STYLES.length];
  const x = lerp(slotX(i) + (SLOT - BAR_W) / 2, slotX(i) + (SLOT - TOWER_W) / 2, m);
  const w = lerp(BAR_W, TOWER_W, m);
  const top = BASE - h;
  const s = Math.min(st.s, h * 0.4) * m;
  const inset = st.inset * m;
  const sp = st.spire * m;
  const half = 1.6 * m;
  const cx = x + w / 2;
  const pts: [number, number][] = [
    [x, BASE],
    [x, top + s],
    [x + inset, top + s],
    [x + inset, top],
    [cx - half, top],
    [cx - half * 0.4, top - sp],
    [cx + half * 0.4, top - sp],
    [cx + half, top],
    [x + w - inset, top],
    [x + w - inset, top + s],
    [x + w, top + s],
    [x + w, BASE],
  ];
  return `M${pts.map(([px, py]) => `${px.toFixed(2)} ${py.toFixed(2)}`).join("L")}Z`;
}

/** Janelas de todos os prédios em dois paths (apagadas / acesas). */
function windowsPaths(heights: number[]) {
  let dark = "";
  let lit = "";
  heights.forEach((h, i) => {
    const st = STYLES[i % STYLES.length];
    const x = slotX(i) + (SLOT - TOWER_W) / 2;
    const limit = BASE - h + Math.min(st.s, h * 0.4) + 8;
    let row = 0;
    for (let y = BASE - 16; y > limit; y -= 12, row++) {
      for (let c = 0; c < 3; c++) {
        const rect = `M${(x + 8 + c * 11.5).toFixed(1)} ${y}h6v7h-6z`;
        if ((i * 7 + row * 5 + c * 3) % 4 === 0) lit += rect;
        else dark += rect;
      }
    }
  });
  return { dark, lit };
}

function heightsFor(values: number[]) {
  const max = Math.max(...values);
  return values.map((v) => (v / max) * MAX_H);
}

/* O GSAP trata arrays como lista de alvos; por isso as alturas ficam em um objeto { h0, h1, ... } */
const toHeightObj = (h: number[]) => Object.fromEntries(h.map((v, i) => [`h${i}`, v]));

export function SkylineChartInteractor({
  series,
  years,
  image,
  source,
  eyebrow = "Mercado",
  heading = ["Dados que viram", "arquitetura."],
  className,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [skylineView, setSkylineView] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const towersRef = useRef<(SVGPathElement | null)[]>([]);
  const clipsRef = useRef<(SVGPathElement | null)[]>([]);
  const labelsRef = useRef<(SVGTextElement | null)[]>([]);
  const gridRef = useRef<SVGGElement>(null);
  const skyRef = useRef<SVGRectElement>(null);
  const photoRef = useRef<SVGImageElement>(null);
  const winDarkRef = useRef<SVGPathElement>(null);
  const winLitRef = useRef<SVGPathElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Estado animado (fora do React para não re-renderizar a cada frame)
  const state = useRef({ P: 0.3 });
  const heights = useRef<Record<string, number>>(toHeightObj(heightsFor(series[0].values)));
  const gsapRef = useRef<typeof import("gsap").gsap | null>(null);

  // Valores iniciais estáveis para o SSR (estado "gráfico")
  const [initial] = useState(() => {
    const h = heightsFor(series[0].values);
    return { d: h.map((hh, i) => towerPath(i, hh, 0)), labelY: h.map((hh) => BASE - hh - 10) };
  });

  const photoSrc = getImageProps({ src: image, alt: "", width: 900, height: 900 }).props.src;

  const render = useCallback(() => {
    const { P } = state.current;
    const h = Object.values(heights.current);
    const g = easeOut(clamp01(P / 0.3));
    const m = easeInOut(clamp01((P - 0.3) / 0.4));
    const l = clamp01((P - 0.7) / 0.3);
    const fill = mixHex("#c9ad84", "#3a2f29", m);

    const grown = h.map((hh) => hh * g);
    grown.forEach((hh, i) => {
      const d = towerPath(i, hh, m);
      towersRef.current[i]?.setAttribute("d", d);
      towersRef.current[i]?.setAttribute("fill", fill);
      clipsRef.current[i]?.setAttribute("d", d);
      const label = labelsRef.current[i];
      if (label) {
        label.setAttribute("y", String(BASE - hh - 10));
        label.style.opacity = String((1 - m) * g);
      }
    });

    if (gridRef.current) gridRef.current.style.opacity = String(1 - m);
    if (skyRef.current) skyRef.current.style.opacity = String(l);
    if (photoRef.current) photoRef.current.style.opacity = String(l * 0.4);

    if (m > 0.4) {
      const { dark, lit } = windowsPaths(grown);
      winDarkRef.current?.setAttribute("d", dark);
      winLitRef.current?.setAttribute("d", lit);
    }
    if (winDarkRef.current) winDarkRef.current.style.opacity = String(clamp01((m - 0.5) * 2) * 0.55);
    if (winLitRef.current) winLitRef.current.style.opacity = String(l);
    if (hintRef.current) hintRef.current.style.opacity = String(1 - clamp01(P * 1.4));
  }, []);

  /* Scroll → P (scrub), apenas se o usuário não pediu menos movimento */
  useEffect(() => {
    if (reduceMotion !== false) {
      // Movimento reduzido: estado estático, controlado pelo botão de alternância
      return;
    }
    let cancelled = false;
    let revert: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      gsapRef.current = gsap;

      const ctx = gsap.context(() => {
        state.current.P = 0;
        render();
        gsap.to(state.current, {
          P: 1,
          ease: "none",
          onUpdate: render,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });
      }, sectionRef);
      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
      gsapRef.current = null;
    };
  }, [reduceMotion, render]);

  /* Movimento reduzido: alterna instantaneamente entre gráfico e skyline */
  useEffect(() => {
    if (reduceMotion) {
      state.current.P = skylineView ? 1 : 0.3;
      render();
    }
  }, [reduceMotion, skylineView, render]);

  const selectSeries = useCallback(
    (index: number) => {
      if (index === active) return;
      setActive(index);
      const target = heightsFor(series[index].values);
      const gsap = gsapRef.current;
      if (gsap && !reduceMotion) {
        gsap.to(heights.current, {
          ...toHeightObj(target),
          duration: 1.1,
          ease: "expo.out",
          overwrite: "auto",
          onUpdate: render,
        });
      } else {
        heights.current = toHeightObj(target);
        render();
      }
    },
    [active, series, reduceMotion, render]
  );

  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = series.length - 1;
    const map: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      selectSeries(map[e.key]);
      tabsRef.current[map[e.key]]?.focus();
    }
  }

  const current = series[active];

  return (
    <section
      ref={sectionRef}
      aria-labelledby={`${uid}-title`}
      className={cn(
        "on-dark relative bg-ink text-cream",
        reduceMotion ? "py-24 lg:py-32" : "h-[260vh]",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12",
          !reduceMotion &&
            "sticky top-0 flex h-[100svh] flex-col justify-center gap-6 pt-20 pb-6 lg:gap-0 lg:pt-0 lg:pb-0"
        )}
      >
        {/* Brilho ambiente */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-0 -z-0 h-[70%] w-[60%] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,173,132,0.12),transparent)]"
        />

        <div className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* ESQUERDA: título + séries (tablist) */}
          <div className="flex min-w-0 flex-col gap-5 lg:gap-12">
            <div>
              <p className="eyebrow flex items-center gap-4 text-champagne">
                <span>02</span>
                <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
                <span>{eyebrow}</span>
              </p>
              <h2
                id={`${uid}-title`}
                className="mt-4 font-display text-[clamp(2rem,1.4rem+2.6vw,4.25rem)] leading-[1.02] font-light lg:mt-6"
              >
                {heading[0]} <em className="block italic">{heading[1]}</em>
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Indicadores de mercado"
              aria-orientation="vertical"
              className="no-scrollbar -mx-5 flex gap-6 overflow-x-auto bg-ink px-5 lg:mx-0 lg:flex-col lg:gap-8 lg:overflow-visible lg:px-0"
            >
              {series.map((item, index) => {
                const selected = index === active;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabsRef.current[index] = el;
                    }}
                    id={`${uid}-tab-${item.id}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls={`${uid}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectSeries(index)}
                    onMouseEnter={() => selectSeries(index)}
                    onKeyDown={onTabKeyDown}
                    className="group flex shrink-0 items-start gap-3 text-left lg:gap-6"
                  >
                    <span
                      className={cn(
                        "mt-1 font-sans text-xs tracking-[0.2em] transition-colors duration-500 lg:mt-3 lg:text-sm",
                        selected ? "text-champagne" : "text-cream/70"
                      )}
                    >
                      {item.num}
                    </span>
                    <span
                      className={cn(
                        "font-display leading-[0.95] font-light whitespace-nowrap transition-all duration-700 ease-(--ease-lux)",
                        "text-2xl sm:text-3xl lg:text-[clamp(2.25rem,1.6rem+1.8vw,3.75rem)]",
                        selected
                          ? "text-cream lg:translate-x-4"
                          : "text-cream/70 group-hover:text-cream"
                      )}
                    >
                      {item.title[0]}
                      <span className="hidden lg:inline">
                        <br />
                      </span>{" "}
                      <em className="italic">{item.title[1]}</em>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DIREITA: SVG */}
          <div
            id={`${uid}-panel`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${current.id}`}
            className="relative"
          >
            <figure className="relative mx-auto w-full max-w-[min(100%,62svh)] lg:max-w-[560px]">
              <svg
                viewBox="0 0 500 500"
                className="h-auto w-full"
                role="img"
                aria-labelledby={`${uid}-caption`}
              >
                <defs>
                  <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1b1420" />
                    <stop offset="60%" stopColor="#4a3328" />
                    <stop offset="100%" stopColor="#b88a5c" />
                  </linearGradient>
                  <clipPath id={`${uid}-clip`}>
                    {initial.d.map((d, i) => (
                      <path
                        key={i}
                        ref={(el) => {
                          clipsRef.current[i] = el;
                        }}
                        d={d}
                      />
                    ))}
                  </clipPath>
                </defs>

                {/* Céu */}
                <rect
                  ref={skyRef}
                  x="0"
                  y="0"
                  width="500"
                  height={BASE}
                  rx="20"
                  fill={`url(#${uid}-sky)`}
                  style={{ opacity: 0 }}
                />

                {/* Grade do gráfico */}
                <g ref={gridRef} aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => (
                    <line
                      key={i}
                      x1={X0}
                      x2={500 - X0 + 10}
                      y1={BASE - (MAX_H / 3) * i}
                      y2={BASE - (MAX_H / 3) * i}
                      stroke="#fcf9f3"
                      strokeOpacity={i === 0 ? 0 : 0.12}
                      strokeDasharray="2 6"
                    />
                  ))}
                </g>

                {/* Prédios / barras */}
                {initial.d.map((d, i) => (
                  <path
                    key={i}
                    ref={(el) => {
                      towersRef.current[i] = el;
                    }}
                    d={d}
                    fill="#c9ad84"
                  />
                ))}

                {/* Foto real recortada na silhueta dos prédios */}
                <g clipPath={`url(#${uid}-clip)`}>
                  <image
                    ref={photoRef}
                    href={photoSrc}
                    x="0"
                    y="60"
                    width="500"
                    height="400"
                    preserveAspectRatio="xMidYMid slice"
                    style={{ opacity: 0, mixBlendMode: "soft-light" }}
                  />
                </g>

                {/* Janelas */}
                <path ref={winDarkRef} fill="#fcf9f3" style={{ opacity: 0 }} />
                <path ref={winLitRef} fill="#f2d39b" style={{ opacity: 0 }} />

                {/* Rótulos de valor */}
                {initial.labelY.map((y, i) => (
                  <text
                    key={i}
                    ref={(el) => {
                      labelsRef.current[i] = el;
                    }}
                    x={slotX(i) + SLOT / 2}
                    y={y}
                    textAnchor="middle"
                    fill="#fcf9f3"
                    fontSize="11"
                    aria-hidden="true"
                    className="font-sans"
                  >
                    {current.format(current.values[i]).replace(/^R\$ /, "").replace(" mil", "k")}
                  </text>
                ))}

                {/* Solo + anos */}
                <line x1="10" x2="490" y1={BASE} y2={BASE} stroke="#c9ad84" strokeOpacity="0.6" />
                {years.map((year, i) => (
                  <text
                    key={year}
                    x={slotX(i) + SLOT / 2}
                    y={BASE + 24}
                    textAnchor="middle"
                    fill="#fcf9f3"
                    fillOpacity="0.7"
                    fontSize="12"
                    aria-hidden="true"
                    className="font-sans"
                  >
                    {String(year).slice(2)}&apos;
                  </text>
                ))}
              </svg>

              <figcaption id={`${uid}-caption`} className="sr-only">
                {current.title.join(" ")}: {current.description}
              </figcaption>
            </figure>

            {/* Tabela equivalente para tecnologias assistivas (WCAG 1.1.1) */}
            <table className="sr-only">
              <caption>
                {current.title.join(" ")} ({current.unit}), {years[0]}–{years[years.length - 1]}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Ano</th>
                  <th scope="col">Valor</th>
                </tr>
              </thead>
              <tbody>
                {years.map((year, i) => (
                  <tr key={year}>
                    <th scope="row">{year}</th>
                    <td>{current.format(current.values[i])}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex flex-col gap-3 lg:mt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
              <p aria-live="polite" className="max-w-md text-sm leading-relaxed text-cream/80 lg:text-base">
                {current.description}
              </p>
              {reduceMotion ? (
                <button
                  type="button"
                  aria-pressed={skylineView}
                  onClick={() => setSkylineView((v) => !v)}
                  className="fill-hover h-11 shrink-0 rounded-full border border-cream/40 px-6 text-xs tracking-[0.2em] uppercase [--fill:var(--cream)] hover:text-ink focus-visible:text-ink aria-pressed:text-ink"
                >
                  {skylineView ? "Ver como gráfico" : "Ver como skyline"}
                </button>
              ) : (
                <p ref={hintRef} aria-hidden="true" className="eyebrow shrink-0 text-cream/60">
                  Role para construir ↓
                </p>
              )}
            </div>
            {source && <p className="mt-3 hidden text-xs text-cream/55 lg:block">{source}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
