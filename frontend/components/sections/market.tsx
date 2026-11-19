"use client";

import { SkylineChartInteractor } from "@/components/ui/skyline-chart-interactor";
import { marketSeries, marketSource, marketYears } from "@/lib/content";

const skylinePhoto =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=75";

export function Market() {
  return (
    <div id="mercado" className="scroll-mt-0">
      <SkylineChartInteractor
        series={marketSeries}
        years={marketYears}
        image={skylinePhoto}
        source={marketSource}
        eyebrow="O projeto em números"
        heading={["Medidas que viram", "arquitetura."]}
        axisHeading="Pavimento"
      />
    </div>
  );
}
