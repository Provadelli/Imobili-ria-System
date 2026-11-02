"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { site } from "@/lib/content";

/**
 * Consentimento de cookies conforme a LGPD (art. 7º, I e art. 8º):
 * - categorias não essenciais começam desligadas;
 * - a escolha fica registrada com data e versão da política;
 * - se a política mudar de versão, o consentimento é pedido de novo.
 */
export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: string;
  decidedAt: string;
};

export type ConsentChoice = Pick<ConsentState, "analytics" | "marketing">;

const STORAGE_KEY = "atelier-consent";
const listeners = new Set<() => void>();
let cached: ConsentState | null | undefined;

function readStorage(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    return parsed.version === site.policyVersion ? parsed : null;
  } catch {
    return null;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cached = readStorage();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  if (cached === undefined) cached = readStorage();
  return cached;
}

/* No servidor ainda não sabemos a escolha: `undefined` evita divergência de hidratação. */
function getServerSnapshot() {
  return undefined;
}

function persist(choice: ConsentChoice) {
  const next: ConsentState = {
    necessary: true,
    ...choice,
    version: site.policyVersion,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* Armazenamento indisponível: a escolha vale só nesta sessão. */
  }
  cached = next;
  listeners.forEach((l) => l());
}

type ConsentContextValue = {
  /** `undefined` = ainda carregando; `null` = sem decisão. */
  consent: ConsentState | null | undefined;
  save: (choice: ConsentChoice) => void;
  preferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const save = useCallback((choice: ConsentChoice) => {
    persist(choice);
    setPreferencesOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      consent,
      save,
      preferencesOpen,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
    }),
    [consent, save, preferencesOpen]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent deve ser usado dentro de <ConsentProvider>.");
  return ctx;
}
