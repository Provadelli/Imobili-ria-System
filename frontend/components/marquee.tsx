const items = [
  "Avenida Paulista",
  "Projeto autoral",
  "Rooftop privativo",
  "Mármore e madeira maciça",
  "Automação integrada",
  "Heliponto",
  "Adega e spa",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-outline-variant/30 bg-surface py-5"
    >
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {row.concat(row).map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-heading text-headline-sm text-on-surface-variant"
          >
            {item}
            <span className="size-1.5 rotate-45 bg-secondary-foreground" />
          </span>
        ))}
      </div>
    </div>
  );
}
