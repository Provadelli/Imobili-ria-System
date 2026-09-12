"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { contactTopics, site } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contato" aria-labelledby="contato-heading" className="mx-auto max-w-5xl px-6 py-space-xl lg:px-12">
      <Reveal className="relative overflow-hidden rounded-2xl bg-primary-container p-8 text-on-primary-container shadow-2xl lg:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-20 size-96 rounded-full bg-secondary/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto mb-space-lg max-w-2xl text-center">
          <span className="mb-space-xs block text-label-md uppercase tracking-[0.2em] text-secondary-fixed">
            Atendimento com Concierge
          </span>
          <h2 id="contato-heading" className="mb-4 font-heading text-headline-lg text-surface">
            Agende sua Visita Privativa
          </h2>
          <p className="text-body-md text-surface-variant">
            Preencha o formulário abaixo para ser contatado por um de nossos
            consultores imobiliários especializados.
          </p>
        </div>

        {submitted ? (
          <p
            role="status"
            aria-live="polite"
            className="relative z-10 mx-auto max-w-lg text-center text-body-lg text-surface"
          >
            Obrigado! Recebemos sua solicitação e um consultor da Atelier Residences
            entrará em contato em breve.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative z-10 mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div className="flex flex-col">
              <label htmlFor="nome" className="mb-2 text-label-sm uppercase tracking-wider text-surface-variant">
                Nome Completo
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                placeholder="Seu nome"
                className="border-b border-outline-variant bg-surface/10 px-4 py-3 text-surface placeholder:text-surface/30 focus:border-secondary-fixed focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-label-sm uppercase tracking-wider text-surface-variant">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="seu@email.com"
                className="border-b border-outline-variant bg-surface/10 px-4 py-3 text-surface placeholder:text-surface/30 focus:border-secondary-fixed focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="telefone" className="mb-2 text-label-sm uppercase tracking-wider text-surface-variant">
                Telefone / WhatsApp
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                required
                placeholder="(00) 00000-0000"
                className="border-b border-outline-variant bg-surface/10 px-4 py-3 text-surface placeholder:text-surface/30 focus:border-secondary-fixed focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="tipologia" className="mb-2 text-label-sm uppercase tracking-wider text-surface-variant">
                Tipologia de Interesse
              </label>
              <select
                id="tipologia"
                name="tipologia"
                className="border-b border-outline-variant bg-primary-container px-4 py-3 text-surface focus:border-secondary-fixed focus:outline-none"
              >
                {contactTopics.map((topic) => (
                  <option key={topic} value={topic} className="bg-primary text-surface">
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label htmlFor="mensagem" className="mb-2 text-label-sm uppercase tracking-wider text-surface-variant">
                Mensagem ou Preferência de Horário
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={3}
                placeholder="Informe se prefere atendimento presencial ou online..."
                className="resize-none border-b border-outline-variant bg-surface/10 px-4 py-3 text-surface placeholder:text-surface/30 focus:border-secondary-fixed focus:outline-none"
              />
            </div>

            <div className="flex justify-center md:col-span-2">
              <Button
                type="submit"
                className="w-full bg-secondary-container text-on-secondary-container uppercase tracking-wider hover:bg-surface hover:text-primary md:w-auto"
                size="lg"
              >
                Solicitar Atendimento Exclusivo
              </Button>
            </div>
          </form>
        )}

        <p className="relative z-10 mt-space-md text-center text-body-sm text-surface-variant">
          Prefere falar agora? Ligue para {site.phone} ou fale pelo WhatsApp{" "}
          {site.whatsapp}.
        </p>
      </Reveal>
    </section>
  );
}
