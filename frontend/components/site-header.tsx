"use client";

import { useState } from "react";
import Link from "next/link";
import { m, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Dialog } from "radix-ui";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * - Sobre o hero: transparente, texto claro.
 * - Após o hero: fundo creme translúcido, texto escuro.
 * - Esconde ao rolar para baixo e reaparece ao rolar para cima.
 */
export function SiteHeader({ overHero = true }: { overHero?: boolean }) {
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const [solid, setSolid] = useState(!overHero);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(!overHero || y > window.innerHeight * 0.85);
    setHidden(!menuOpen && y > 400 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  const light = !solid;

  return (
    <m.header
      initial={false}
      animate={{ y: hidden && !reduceMotion ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid ? "border-b border-line/60 bg-cream/95" : "bg-transparent",
        light && "on-dark"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/#hero"
          className={cn(
            "font-display text-2xl tracking-[0.35em] transition-colors duration-500",
            light ? "text-cream" : "text-ink"
          )}
        >
          {site.shortName}
          <span className="sr-only"> — {site.name}, página inicial</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${link.href}`}
                  className={cn(
                    "link-underline pb-1 text-[0.8125rem] tracking-[0.12em] uppercase transition-colors duration-500",
                    light ? "text-cream/85 hover:text-cream" : "text-stone hover:text-ink"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant={light ? "pill-light" : "pill"}
            size="pill"
            className="hidden h-11 sm:inline-flex"
          >
            <Link href="/#contato">
              Agendar visita
              <ArrowUpRight data-arrow aria-hidden="true" />
            </Link>
          </Button>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>
              <Button
                variant={light ? "pill-light" : "pill"}
                size="icon-pill"
                className="size-11 lg:hidden"
                aria-label="Abrir menu"
              >
                <span aria-hidden="true" className="flex w-4 flex-col gap-1.5">
                  <span className="h-px w-full bg-current" />
                  <span className="h-px w-2/3 bg-current" />
                </span>
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content className="on-dark fixed inset-0 z-[80] flex flex-col bg-ink px-6 pt-6 pb-10 text-cream data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-display text-2xl tracking-[0.35em]">
                    {site.shortName}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <Button variant="pill-light" size="icon-pill" className="size-11" aria-label="Fechar menu">
                      <span aria-hidden="true" className="relative block size-4">
                        <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                        <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
                      </span>
                    </Button>
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">Navegação pelas seções do site</Dialog.Description>
                <nav aria-label="Navegação mobile" className="mt-16 flex-1">
                  <ul className="flex flex-col gap-2">
                    {navLinks.map((link, i) => (
                      <li key={link.href} className="overflow-hidden">
                        <m.div
                          initial={reduceMotion ? false : { y: "100%" }}
                          animate={{ y: "0%" }}
                          transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Dialog.Close asChild>
                            <Link
                              href={`/${link.href}`}
                              className="flex items-baseline gap-4 py-2 font-display text-5xl font-light"
                            >
                              <span className="font-sans text-xs tracking-[0.3em] text-champagne">
                                0{i + 1}
                              </span>
                              {link.label}
                            </Link>
                          </Dialog.Close>
                        </m.div>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="space-y-4 border-t border-cream/15 pt-6 text-sm text-cream/75">
                  <p>{site.phone}</p>
                  <p>{site.email}</p>
                  <Button asChild variant="pill-light" size="pill" className="w-full">
                    <Link href="/#contato" onClick={() => setMenuOpen(false)}>
                      Agendar visita
                      <ArrowUpRight data-arrow aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </m.header>
  );
}
