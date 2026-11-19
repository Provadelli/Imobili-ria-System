import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Atelier Residences trata seus dados pessoais, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
};

const sections = [
  {
    id: "controlador",
    title: "1. Quem é o controlador",
    body: (
      <p>
        {site.legalName}, CNPJ {site.cnpj}, com sede em {site.address}, é a controladora dos
        dados pessoais tratados neste site, nos termos da Lei nº 13.709/2018 (LGPD).
      </p>
    ),
  },
  {
    id: "dados",
    title: "2. Quais dados coletamos",
    body: (
      <ul>
        <li>
          <strong>Formulário de contato:</strong> nome, e-mail, telefone, residência de interesse
          e mensagem opcional.
        </li>
        <li>
          <strong>Cookies necessários:</strong> registro da sua escolha de cookies (armazenado
          no seu navegador).
        </li>
        <li>
          <strong>Cookies de análise e marketing:</strong> somente se você autorizar.
        </li>
      </ul>
    ),
  },
  {
    id: "finalidade",
    title: "3. Para que usamos e com qual base legal",
    body: (
      <ul>
        <li>
          Responder à sua solicitação e agendar visitas — base legal: procedimentos
          preliminares a contrato, a pedido do titular (art. 7º, V) e consentimento (art. 7º, I).
        </li>
        <li>
          Enviar novidades sobre lançamentos — somente com consentimento específico, que pode
          ser revogado a qualquer momento (art. 8º, § 5º).
        </li>
        <li>Medir o uso do site de forma agregada — somente com consentimento.</li>
      </ul>
    ),
  },
  {
    id: "compartilhamento",
    title: "4. Compartilhamento",
    body: (
      <p>
        Não vendemos dados pessoais. Podemos compartilhá-los apenas com operadores que nos
        prestam serviços (hospedagem, e-mail, CRM), sob contrato e com as mesmas garantias
        desta política, ou quando exigido por lei ou autoridade competente.
      </p>
    ),
  },
  {
    id: "retencao",
    title: "5. Por quanto tempo guardamos",
    body: (
      <p>
        Os dados de contato são mantidos por até 24 meses após o último atendimento ou até
        que você peça a exclusão, exceto quando a lei exigir prazo maior (por exemplo,
        obrigações fiscais em caso de compra).
      </p>
    ),
  },
  {
    id: "direitos",
    title: "6. Seus direitos (art. 18 da LGPD)",
    body: (
      <>
        <p>Você pode, a qualquer momento e gratuitamente:</p>
        <ul>
          <li>confirmar se tratamos seus dados e acessá-los;</li>
          <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li>pedir anonimização, bloqueio ou eliminação de dados desnecessários;</li>
          <li>pedir a portabilidade dos dados;</li>
          <li>revogar o consentimento e saber as consequências da revogação;</li>
          <li>saber com quem compartilhamos seus dados;</li>
          <li>apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "7. Cookies",
    body: (
      <p>
        Usamos apenas armazenamento necessário por padrão. Cookies de análise e marketing só
        são ativados após o seu consentimento, e você pode alterar a escolha a qualquer
        momento pelo link “Preferências de cookies” no rodapé.
      </p>
    ),
  },
  {
    id: "seguranca",
    title: "8. Segurança",
    body: (
      <p>
        Adotamos medidas técnicas e administrativas para proteger seus dados, como conexão
        criptografada (HTTPS), controle de acesso e registro de operações.
      </p>
    ),
  },
  {
    id: "contato-dpo",
    title: "9. Encarregado de dados (DPO)",
    body: (
      <p>
        Para exercer seus direitos ou tirar dúvidas, escreva para{" "}
        <a href={`mailto:${site.dpo.email}`}>{site.dpo.email}</a>. Respondemos em até 15 dias.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader overHero={false} />
      <main id="main-content" tabIndex={-1} className="bg-cream pt-36 pb-28 outline-none lg:pt-48">
        <div className="mx-auto grid max-w-[90rem] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <header className="lg:col-span-4">
            <p className="eyebrow text-bronze">LGPD · Versão {site.policyVersion}</p>
            <h1 className="mt-6 font-display text-title font-light">
              Política de <em className="italic">Privacidade</em>
            </h1>
            <p className="mt-6 text-sm text-stone">Atualizada em {site.policyUpdatedAt}.</p>
            <nav aria-label="Índice da política" className="mt-10 hidden lg:block">
              <ol className="space-y-2 text-sm text-stone">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="link-underline pb-0.5 hover:text-ink">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </header>

          <div className="max-w-3xl space-y-14 text-base leading-relaxed text-stone lg:col-span-8 [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:space-y-2">
            {sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className="scroll-mt-28 space-y-4">
                <h2 id={`${s.id}-t`} className="font-display text-3xl text-ink">
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
            <p>
              <Link href="/">← Voltar para a página inicial</Link>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
