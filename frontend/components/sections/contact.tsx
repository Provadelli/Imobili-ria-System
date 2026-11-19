"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, MaskText } from "@/components/reveal";
import { contactTopics, site } from "@/lib/content";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"nome" | "email" | "telefone" | "consentimento", string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const nome = String(data.get("nome") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const telefone = String(data.get("telefone") ?? "").replace(/\D/g, "");
  if (nome.length < 3) errors.nome = "Informe seu nome completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Informe um e-mail válido, como nome@exemplo.com.";
  if (telefone.length < 10) errors.telefone = "Informe um telefone com DDD.";
  if (!data.get("consentimento"))
    errors.consentimento = "Para continuar, confirme que leu a Política de Privacidade.";
  return errors;
}

function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function Field({
  id,
  label,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("group relative flex flex-col", className)}>
      <label htmlFor={id} className="eyebrow mb-3 text-cream/75">
        {label}
      </label>
      {children}
      {/* Linha inferior animada no foco */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-(--ease-lux) group-focus-within:scale-x-100",
          error && "scale-x-100 bg-[#ffb4ab]"
        )}
        style={{ bottom: error || hint ? "1.5rem" : 0 }}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-cream/65">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-[#ffb4ab]">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full border-0 border-b border-cream/30 bg-transparent px-0 pb-3 text-lg text-cream placeholder:text-cream/45 focus:outline-none focus-visible:outline-none aria-invalid:border-[#ffb4ab]";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    /* Demonstração: nenhum dado é enviado ou armazenado. Em produção, enviar
       por HTTPS a um endpoint próprio e registrar a data/versão do consentimento. */
    setSubmitted(true);
  }

  const describedBy = (key: keyof Errors, hint = false) =>
    errors[key] ? `${key}-error` : hint ? `${key}-hint` : undefined;

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="on-dark bg-ink py-28 text-cream lg:py-40"
    >
      <div className="mx-auto grid max-w-[90rem] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <Eyebrow index="10" className="text-champagne">
            Visita privativa
          </Eyebrow>
          <MaskText
            id="contato-title"
            lines={["Vamos conversar", <em key="i" className="italic">sobre o seu endereço.</em>]}
            className="mt-6 font-display text-title font-light"
          />
          <p className="mt-8 max-w-sm text-base leading-relaxed text-cream/80">
            Um consultor retorna em até um dia útil para agendar sua visita ao decorado,
            presencial ou por vídeo.
          </p>
          <ul className="mt-12 space-y-3 text-sm">
            <li>
              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="link-underline pb-1 text-cream">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.whatsappLink} target="_blank" rel="noopener noreferrer" className="link-underline pb-1 text-cream">
                WhatsApp {site.whatsapp}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-underline pb-1 text-cream">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {submitted ? (
              <m.div
                key="ok"
                role="status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full flex-col justify-center gap-6"
              >
                <span className="flex size-16 items-center justify-center rounded-full border border-champagne text-champagne">
                  <Check aria-hidden="true" />
                </span>
                <p className="font-display text-4xl font-light">Obrigado. Recebemos sua solicitação.</p>
                <p className="max-w-md text-cream/80">
                  Um consultor da {site.name} entrará em contato em breve. Seus dados serão
                  usados apenas para este atendimento.
                </p>
              </m.div>
            ) : (
              <m.form
                key="form"
                ref={formRef}
                noValidate
                onSubmit={handleSubmit}
                exit={{ opacity: 0, y: -20 }}
                aria-describedby="form-finalidade"
                className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2"
              >
                <Field id="nome" label="Nome completo" error={errors.nome}>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.nome)}
                    aria-describedby={describedBy("nome")}
                    className={inputClass}
                  />
                </Field>

                <Field id="email" label="E-mail" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy("email")}
                    className={inputClass}
                  />
                </Field>

                <Field id="telefone" label="Telefone / WhatsApp" error={errors.telefone}>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    autoComplete="tel-national"
                    inputMode="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(maskPhone(e.target.value))}
                    placeholder="(11) 90000-0000"
                    aria-invalid={Boolean(errors.telefone)}
                    aria-describedby={describedBy("telefone")}
                    className={inputClass}
                  />
                </Field>

                <Field id="tipologia" label="Residência de interesse">
                  <select id="tipologia" name="tipologia" className={cn(inputClass, "cursor-pointer appearance-none")}>
                    {contactTopics.map((topic) => (
                      <option key={topic} value={topic} className="bg-ink text-cream">
                        {topic}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id="mensagem" label="Mensagem (opcional)" className="md:col-span-2">
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={2}
                    placeholder="Prefere visita presencial ou por vídeo? Algum horário?"
                    className={cn(inputClass, "resize-none")}
                  />
                </Field>

                {/* LGPD: consentimento livre, informado e inequívoco (art. 8º) */}
                <fieldset className="space-y-4 md:col-span-2">
                  <legend className="sr-only">Privacidade</legend>
                  <p id="form-finalidade" className="text-sm leading-relaxed text-cream/75">
                    Usaremos nome, e-mail e telefone somente para responder a esta
                    solicitação e agendar sua visita. Você pode pedir a exclusão a qualquer
                    momento em {site.dpo.email}.
                  </p>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-cream/90">
                      <input
                        type="checkbox"
                        name="consentimento"
                        required
                        aria-invalid={Boolean(errors.consentimento)}
                        aria-describedby={describedBy("consentimento")}
                        className="mt-0.5 size-5 shrink-0 cursor-pointer accent-champagne"
                      />
                      <span>
                        Li e concordo com a{" "}
                        <Link href="/privacidade" className="underline underline-offset-4 hover:text-champagne">
                          Política de Privacidade
                        </Link>{" "}
                        e autorizo o contato para este atendimento.{" "}
                        <span aria-hidden="true">*</span>
                      </span>
                    </label>
                    {errors.consentimento && (
                      <p id="consentimento-error" className="mt-2 pl-8 text-xs text-[#ffb4ab]">
                        {errors.consentimento}
                      </p>
                    )}
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-cream/90">
                    <input
                      type="checkbox"
                      name="marketing"
                      className="mt-0.5 size-5 shrink-0 cursor-pointer accent-champagne"
                    />
                    <span>Quero receber novidades sobre lançamentos da Atelier (opcional).</span>
                  </label>
                </fieldset>

                <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
                  <p className="text-xs text-cream/65">* Campo obrigatório. Todos os campos, exceto mensagem e novidades, são obrigatórios.</p>
                  <Button type="submit" variant="pill-light" size="pill-lg">
                    Solicitar visita
                    <ArrowUpRight data-arrow aria-hidden="true" />
                  </Button>
                </div>
              </m.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
