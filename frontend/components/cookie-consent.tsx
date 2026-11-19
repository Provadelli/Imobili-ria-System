"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsent, type ConsentChoice } from "@/hooks/use-consent";
import { cn } from "@/lib/utils";

const categories: {
  key: keyof ConsentChoice | "necessary";
  title: string;
  description: string;
}[] = [
  {
    key: "necessary",
    title: "Necessários",
    description:
      "Garantem o funcionamento do site e guardam esta escolha. Não podem ser desativados.",
  },
  {
    key: "analytics",
    title: "Análise",
    description:
      "Medem visitas de forma agregada para melhorarmos a experiência. Nenhum dado é coletado sem a sua permissão.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Permitem mostrar conteúdos dos nossos lançamentos em outras plataformas.",
  },
];

export function CookieConsent() {
  const { consent, save, preferencesOpen, openPreferences, closePreferences } = useConsent();
  const showBanner = consent === null && !preferencesOpen;

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <m.section
            key="banner"
            aria-labelledby="cookie-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 z-[90] max-w-md rounded-3xl border border-line bg-cream p-6 text-ink shadow-[0_24px_60px_-20px_rgba(21,13,10,0.35)] sm:inset-x-auto sm:left-6 sm:bottom-6"
          >
            <h2 id="cookie-title" className="font-display text-2xl">
              Sua privacidade importa
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              Usamos cookies necessários para o site funcionar. Com a sua permissão,
              também usamos cookies de análise e marketing. Saiba mais na{" "}
              <Link href="/privacidade" className="text-ink underline underline-offset-4">
                Política de Privacidade
              </Link>
              .
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                variant="pill"
                size="pill"
                className="h-11 flex-1 px-5"
                onClick={() => save({ analytics: false, marketing: false })}
              >
                Rejeitar
              </Button>
              <Button variant="pill" size="pill" className="h-11 flex-1 px-5" onClick={openPreferences}>
                Personalizar
              </Button>
              <Button
                variant="pill"
                size="pill"
                className="h-11 w-full px-5"
                onClick={() => save({ analytics: true, marketing: true })}
              >
                Aceitar todos
              </Button>
            </div>
          </m.section>
        )}
      </AnimatePresence>

      <Dialog.Root open={preferencesOpen} onOpenChange={(open) => !open && closePreferences()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[95] bg-ink/50 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-[96] max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-cream p-6 text-ink shadow-2xl sm:p-8 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95">
            {preferencesOpen && (
              <Preferences
                initial={{
                  analytics: consent?.analytics ?? false,
                  marketing: consent?.marketing ?? false,
                }}
                onSave={save}
              />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function Preferences({
  initial,
  onSave,
}: {
  initial: ConsentChoice;
  onSave: (choice: ConsentChoice) => void;
}) {
  const [choice, setChoice] = useState<ConsentChoice>(initial);
  const baseId = useId();

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <Dialog.Title className="font-display text-3xl">Preferências de cookies</Dialog.Title>
        <Dialog.Close asChild>
          <Button variant="pill" size="icon-pill" aria-label="Fechar preferências" className="size-11">
            <X />
          </Button>
        </Dialog.Close>
      </div>
      <Dialog.Description className="mt-2 text-sm leading-relaxed text-stone">
        Escolha quais categorias você autoriza. Você pode mudar de ideia a qualquer momento
        pelo link “Preferências de cookies” no rodapé.
      </Dialog.Description>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {categories.map((cat) => {
          const locked = cat.key === "necessary";
          const checked = locked ? true : choice[cat.key as keyof ConsentChoice];
          const labelId = `${baseId}-${cat.key}`;
          const descId = `${labelId}-desc`;
          return (
            <li key={cat.key} className="flex items-start justify-between gap-6 py-5">
              <div>
                <p id={labelId} className="font-medium">
                  {cat.title}
                </p>
                <p id={descId} className="mt-1 text-sm text-stone">
                  {cat.description}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-labelledby={labelId}
                aria-describedby={descId}
                aria-disabled={locked || undefined}
                onClick={() => {
                  if (locked) return;
                  const key = cat.key as keyof ConsentChoice;
                  setChoice((prev) => ({ ...prev, [key]: !prev[key] }));
                }}
                className={cn(
                  "relative mt-1 inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors duration-300",
                  checked ? "border-ink bg-ink" : "border-stone bg-transparent",
                  locked && "cursor-not-allowed opacity-60"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-block size-5 rounded-full transition-transform duration-300 ease-(--ease-lux)",
                    checked ? "translate-x-6 bg-cream" : "translate-x-1 bg-stone"
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button
          variant="pill"
          size="pill"
          className="h-11 flex-1 px-5"
          onClick={() => onSave({ analytics: false, marketing: false })}
        >
          Rejeitar todos
        </Button>
        <Button variant="pill" size="pill" className="h-11 flex-1 px-5" onClick={() => onSave(choice)}>
          Salvar escolhas
        </Button>
      </div>
    </>
  );
}
