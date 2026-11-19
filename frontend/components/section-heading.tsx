import type { ReactNode } from "react";
import { Eyebrow, Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  className,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <Eyebrow className={tone === "dark" ? "text-champagne" : "text-bronze"}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={`font-display mt-4 text-title font-semibold tracking-tight text-balance ${
          tone === "dark" ? "on-dark text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-5 text-base leading-relaxed", tone === "dark" ? "text-cream/75" : "text-stone")}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
