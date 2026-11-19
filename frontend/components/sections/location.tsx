"use client";

import { useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { Eyebrow, MaskText } from "@/components/reveal";
import { locationPoints, site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Mapa ilustrado em SVG — sem iframe de terceiros, então nenhum dado do
 * visitante é enviado a serviços externos sem consentimento (LGPD).
 */
export function Location() {
  const [active, setActive] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.4;

  return (
    <section id="localizacao" aria-labelledby="localizacao-title" className="defer-render bg-cream py-28 lg:py-40">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <Eyebrow index="08">Localização</Eyebrow>
          <MaskText
            id="localizacao-title"
            lines={["Tudo perto.", <em key="i" className="italic">Nada por perto.</em>]}
            className="mt-6 font-display text-title font-light"
          />
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone">{site.address}</p>

          <ul className="mt-12 border-t border-line">
            {locationPoints.map((point) => (
              <li key={point.id} className="border-b border-line">
                <button
                  type="button"
                  onMouseEnter={() => setActive(point.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(point.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(point.id)}
                  aria-describedby="mapa-legenda"
                  className="flex w-full items-baseline justify-between gap-6 py-5 text-left"
                >
                  <span
                    className={cn(
                      "font-display text-2xl transition-transform duration-500 ease-(--ease-lux)",
                      active === point.id && "translate-x-3"
                    )}
                  >
                    {point.label}
                  </span>
                  <span className="shrink-0 text-sm text-stone tabular-nums">{point.minutes} min</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <figure className="lg:col-span-7">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-ink">
            <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <g stroke="#fcf9f3" strokeOpacity="0.08" strokeWidth="0.3">
                {Array.from({ length: 13 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 9 + 2} y1="0" x2={i * 9 - 6} y2="80" />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 9 + 3} x2="100" y2={i * 9 - 2} />
                ))}
              </g>
              <path d="M0 52 C 30 46, 55 58, 100 40" fill="none" stroke="#c9ad84" strokeOpacity="0.5" strokeWidth="0.8" />
              <path d="M38 0 C 42 30, 60 50, 58 80" fill="none" stroke="#c9ad84" strokeOpacity="0.35" strokeWidth="0.6" />
              <ellipse cx="22" cy="30" rx="12" ry="8" fill="#c9ad84" fillOpacity="0.08" />

              {locationPoints.map((p) => (
                <m.line
                  key={p.id}
                  x1="50"
                  y1="46"
                  x2={p.x}
                  y2={p.y}
                  stroke="#c9ad84"
                  strokeWidth="0.35"
                  strokeDasharray="1 1"
                  initial={false}
                  animate={{ opacity: active === p.id ? 1 : active ? 0.1 : 0.35 }}
                  transition={{ duration }}
                />
              ))}

              {locationPoints.map((p) => (
                <g key={p.id}>
                  <m.circle
                    cx={p.x}
                    cy={p.y}
                    fill="#c9ad84"
                    initial={false}
                    animate={{ r: active === p.id ? 2.2 : 1.1, opacity: active && active !== p.id ? 0.35 : 1 }}
                    transition={{ duration }}
                  />
                  <text
                    x={p.x}
                    y={p.y - 3.5}
                    textAnchor="middle"
                    fontSize="2.6"
                    fill="#fcf9f3"
                    className="font-sans transition-opacity duration-300"
                    style={{ opacity: active === p.id ? 1 : 0 }}
                  >
                    {p.minutes} min
                  </text>
                </g>
              ))}

              <circle cx="50" cy="46" r="5" fill="#c9ad84" fillOpacity="0.15" className="motion-safe:animate-pulse" />
              <circle cx="50" cy="46" r="1.8" fill="#fcf9f3" />
              <text x="50" y="53" textAnchor="middle" fontSize="2.4" fill="#fcf9f3" letterSpacing="0.4">
                RESERVA IMPERIALE
              </text>
            </svg>
          </div>
          <figcaption id="mapa-legenda" className="mt-4 text-sm text-stone">
            Mapa ilustrativo. Tempos estimados de carro a partir do Reserva Imperiale.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
