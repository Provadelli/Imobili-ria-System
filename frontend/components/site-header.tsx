"use client";

import { useEffect, useState } from "react";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, site } from "@/lib/content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-shadow ${
        scrolled ? "bg-surface/90 shadow-[0_1px_8px_rgba(0,0,0,0.06)]" : "bg-surface/60"
      } backdrop-blur-xl`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        <a
          href="#hero"
          className="flex items-center gap-2 rounded font-heading text-headline-sm tracking-widest text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {site.shortName}
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-space-md md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-body-sm tracking-wide text-on-surface-variant transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:text-on-surface hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm">
          <Button
            asChild
            variant="accent"
            size="lg"
            className="hidden h-10 px-6 text-label-md tracking-wider uppercase sm:inline-flex"
          >
            <a href="#contato">Agendar Visita</a>
          </Button>
          <div
            aria-hidden="true"
            className="hidden size-8 items-center justify-center rounded-full bg-primary text-primary-foreground sm:flex"
          >
            <User className="size-4" />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{site.name}</SheetTitle>
              </SheetHeader>
              <nav aria-label="Navegação mobile" className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="rounded-lg px-3 py-3 text-body-md text-on-surface-variant transition-colors hover:bg-muted hover:text-on-surface"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Button asChild variant="accent" size="lg" className="h-11 w-full uppercase tracking-wider">
                  <a href="#contato">Agendar Visita</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
