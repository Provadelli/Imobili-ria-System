import { Mail, MapPin, Phone } from "lucide-react";
import { footerNavLinks, navLinks, residences, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-low pt-space-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-space-lg sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div>
          <span className="mb-space-xs block font-heading text-headline-sm tracking-widest text-primary">
            {site.shortName}
          </span>
          <p className="mb-space-sm max-w-xs text-body-sm text-on-surface-variant">
            {site.tagline}
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="mb-space-sm text-label-md uppercase tracking-wider text-on-surface-variant">
            Navegação
          </h2>
          <ul className="space-y-3 text-body-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-on-surface transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Sobre o empreendimento">
          <h2 className="mb-space-sm text-label-md uppercase tracking-wider text-on-surface-variant">
            Reserva Imperiale
          </h2>
          <ul className="space-y-3 text-body-sm">
            {residences.map((unit) => (
              <li key={unit.name}>
                <a href="#residencias" className="text-on-surface transition-colors hover:text-primary">
                  {unit.name}
                </a>
              </li>
            ))}
            {footerNavLinks
              .filter((link) => !navLinks.includes(link))
              .map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-on-surface transition-colors hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-space-sm text-label-md uppercase tracking-wider text-on-surface-variant">
            Contato
          </h2>
          <ul className="space-y-3 text-body-sm text-on-surface">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-secondary-foreground" aria-hidden="true" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-secondary-foreground" aria-hidden="true" />
              <a href={site.phoneHref} className="hover:text-primary">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-secondary-foreground" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="hover:text-primary">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-outline-variant/30 py-space-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 text-body-sm text-on-surface-variant sm:flex-row lg:px-12">
          <span>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</span>
          <span>{site.creci}</span>
        </div>
      </div>
    </footer>
  );
}
