"use client";

/**
 * Editorial team member card — baseado no componente de @emerald-ui (MIT).
 * Adaptações: `motion/react` (já usado no projeto), animação ao entrar na
 * tela, layout responsivo, `next/image` e CTA como link acessível.
 */
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
  position?: "left" | "right";
  jobPosition: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  description: string;
  href?: string;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TeamMemberCard({
  position = "left",
  jobPosition,
  firstName,
  lastName,
  imageUrl,
  description,
  href = "#contato",
  className,
}: TeamMemberCardProps) {
  const fullName = `${firstName} ${lastName}`;
  const isRight = position === "right";
  const reduceMotion = useReducedMotion();

  const inView = (from: Record<string, number>, delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, ...from },
          whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <article aria-label={fullName} className={cn("relative flex flex-col justify-center", className)}>
      <motion.p
        {...inView({ x: isRight ? 20 : -20 }, 0.05)}
        className={cn("eyebrow mb-5 text-bronze", isRight && "md:text-right")}
      >
        {jobPosition}
      </motion.p>

      <div className={cn("flex flex-col md:flex-row md:items-center", isRight ? "md:justify-start" : "md:justify-end")}>
        {/* Retrato */}
        <motion.div
          {...inView({ scale: 0.95, y: 30 }, 0.1)}
          className={cn(
            "group relative aspect-[18/25] w-full shrink-0 overflow-hidden rounded-[2rem] md:w-[42%] lg:w-[22.5rem]",
            isRight && "md:order-1"
          )}
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
          <Image
            src={imageUrl}
            alt={`Retrato de ${fullName}, ${jobPosition}`}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 42vw, 100vw"
            className="object-cover transition-[scale] duration-700 ease-(--ease-lux) group-hover:scale-105"
          />
        </motion.div>

        {/* Bloco de informações — sobrepõe o retrato no desktop */}
        <motion.div
          {...inView({ x: isRight ? -40 : 40 }, 0.25)}
          className={cn(
            "relative z-[2] mt-8 flex flex-col gap-8 md:mt-0 md:flex-1 lg:gap-14",
            isRight ? "md:-right-10 md:items-end" : "md:-left-10"
          )}
        >
          <h3
            className={cn(
              "font-display text-5xl leading-[1.02] font-light tracking-tight text-ink lg:text-7xl",
              isRight && "md:text-right"
            )}
          >
            {firstName}
            <br />
            <em className="italic">{lastName}</em>
          </h3>

          <div className={cn("flex items-start gap-6 lg:gap-8", isRight && "md:flex-row-reverse")}>
            <a
              href={href}
              aria-label={`Falar com ${fullName}`}
              className="fill-hover group/cta flex size-20 shrink-0 items-center justify-center rounded-full border border-ink/30 text-ink [--fill:var(--ink)] hover:border-ink hover:text-cream focus-visible:text-cream"
            >
              <ArrowRight
                size={22}
                aria-hidden="true"
                className={cn(
                  "transition-transform duration-500 ease-(--ease-lux) group-hover/cta:-rotate-45 group-focus-visible/cta:-rotate-45",
                  isRight && "rotate-180 group-hover/cta:rotate-[225deg] group-focus-visible/cta:rotate-[225deg]"
                )}
              />
            </a>
            <p className={cn("max-w-xs text-sm leading-[1.8] text-stone", isRight && "md:text-right")}>
              {description}
            </p>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
