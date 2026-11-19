import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_[data-arrow]]:transition-transform [&_[data-arrow]]:duration-500 [&_[data-arrow]]:ease-(--ease-lux) hover:[&_[data-arrow]]:-rotate-45 focus-visible:[&_[data-arrow]]:-rotate-45",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
        /* Padrão Atelier: arredondado, sem fundo; um círculo preenche o botão no hover/foco */
        pill: "fill-hover rounded-full border-ink/30 bg-transparent text-ink [--fill:var(--ink)] hover:border-ink hover:text-cream focus-visible:border-ink focus-visible:text-cream aria-pressed:border-ink aria-pressed:text-cream",
        "pill-light":
          "fill-hover rounded-full border-cream/40 bg-transparent text-cream [--fill:var(--cream)] hover:border-cream hover:text-ink focus-visible:border-cream focus-visible:text-ink focus-visible:ring-champagne/50 aria-pressed:border-cream aria-pressed:text-ink",
      },
      size: {
        default: "h-9 gap-1.5 px-3",
        sm: "h-8 gap-1 px-2.5 text-[0.8rem]",
        lg: "h-10 gap-1.5 px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        pill: "h-12 gap-3 px-7 text-[0.75rem] tracking-[0.2em] uppercase",
        "pill-lg": "h-14 gap-3 px-9 text-[0.75rem] tracking-[0.22em] uppercase",
        "icon-pill": "size-12 rounded-full",
        "icon-xl": "size-20 rounded-full [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
