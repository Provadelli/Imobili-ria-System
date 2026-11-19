"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/social-icons";
import { useConsent } from "@/hooks/use-consent";
import { navLinks, site } from "@/lib/content";

const socialLinks = [
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
  { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com" },
];

export function SiteFooter() {
  const { openPreferences } = useConsent();

  return (
    <footer className="on-dark bg-ink text-cream">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="border-t border-cream/15 py-20 lg:py-28">
          <p className="font-display text-[clamp(3.5rem,2rem+9vw,12rem)] leading-[0.9] font-light tracking-[0.04em]">
            {site.shortName}
          </p>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h2 className="eyebrow text-champagne">Atelier</h2>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/75">{site.tagline}</p>
              <ul className="mt-6 flex gap-3">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <Button asChild variant="pill-light" size="icon-pill" className="size-11">
                      <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (abre em nova aba)`}>
                        <s.icon className="size-4" />
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Rodapé">
              <h2 className="eyebrow text-champagne">Navegação</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={`/${link.href}`} className="link-underline pb-0.5 text-cream/85 hover:text-cream">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="eyebrow text-champagne">Contato</h2>
              <address className="mt-5 space-y-3 text-sm not-italic text-cream/85">
                <p>{site.address}</p>
                <p>
                  <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="link-underline pb-0.5">
                    {site.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${site.email}`} className="link-underline pb-0.5">
                    {site.email}
                  </a>
                </p>
              </address>
            </div>

            <div>
              <h2 className="eyebrow text-champagne">Privacidade</h2>
              <ul className="mt-5 space-y-3 text-sm text-cream/85">
                <li>
                  <Link href="/privacidade" className="link-underline pb-0.5">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={openPreferences} className="link-underline pb-0.5 text-left">
                    Preferências de cookies
                  </button>
                </li>
                <li>
                  Encarregado (DPO):{" "}
                  <a href={`mailto:${site.dpo.email}`} className="link-underline pb-0.5">
                    {site.dpo.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="border-t border-cream/15 pt-8 text-xs leading-relaxed text-cream/65">
          Reserva Imperiale é um empreendimento fictício, criado para demonstração. Imagens
          meramente ilustrativas; CNPJ, CRECI, telefones e endereço são dados de exemplo.
        </p>

        <div className="flex flex-col gap-4 py-6 text-xs text-cream/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} · CNPJ {site.cnpj} · {site.creci}
          </p>
          <Button asChild variant="pill-light" size="pill" className="h-10 self-start px-5 sm:self-auto">
            <a href="#main-content">
              Voltar ao topo <ArrowUp aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
