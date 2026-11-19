<div align="center">

# Atelier Residences

**Landing page de lançamento imobiliário de alto padrão: o empreendimento Reserva Imperiale, na Avenida Paulista, em São Paulo.** Apresenta as residências, as comodidades e leva o visitante direto ao WhatsApp de um consultor.

![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Deploy](https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

[Estrutura](#estrutura) · [Como executar](#como-executar) · [Conteúdo](#editando-o-conteúdo) · [SEO e performance](#seo-e-performance) · [Roadmap](#roadmap-e-limitações)

</div>

---

> Telefone, WhatsApp, e-mail, endereço e CRECI do site são **dados de exemplo**. Depoimentos e números institucionais também são ilustrativos. Troque tudo em `frontend/lib/content.ts` antes de publicar.

## Sobre o projeto

Página única em **Next.js (App Router)** com renderização estática, escrita em TypeScript e estilizada com Tailwind 4 e componentes shadcn/ui. A identidade visual (paleta, tipografia Playfair Display + Inter) segue o design system em `docs/assets/Design/`.

## Destaques

| Recurso | O que faz |
|---|---|
| Hero otimizado | Imagem com `next/image` e `priority`, palavra rotativa que respeita `prefers-reduced-motion` e não confunde leitores de tela. |
| Formulário via WhatsApp | Valida os campos e abre `wa.me` com a mensagem pronta. Não há backend nem coleta de dados no servidor. |
| Animações acessíveis | `motion` com versão reduzida para quem desativa animações; carrosséis com teclado e pausa ao focar. |
| SEO técnico | Metadata completa, Open Graph, `robots.txt`, `sitemap.xml`, JSON-LD (`RealEstateAgent` e `FAQPage`). |
| Cabeçalhos de segurança | `nosniff`, `Referrer-Policy`, `X-Frame-Options` e `Permissions-Policy` em `next.config.ts`. |

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.3 (Turbopack), React 19 |
| Linguagem | TypeScript 5 |
| Estilo | Tailwind CSS 4, shadcn/ui (Radix) |
| Animação | `motion` |
| Ícones | `lucide-react` |
| Imagens | `next/image` (AVIF/WebP), fotos do Unsplash |
| Hospedagem | Vercel |

## Estrutura

```text
.
├── frontend/
│   ├── app/              # layout, página, robots, sitemap, ícone
│   ├── components/
│   │   ├── sections/     # hero, residências, comodidades, contato...
│   │   └── ui/           # componentes shadcn
│   └── lib/
│       ├── content.ts    # todo o texto e dados do site
│       └── site-url.ts   # URL base para SEO
└── docs/                 # briefing e assets de design de referência
```

## Como executar

Requer **Node.js 20 ou superior**.

```bash
git clone https://github.com/Provadelli/Imobili-ria-System.git
cd Imobili-ria-System/frontend
npm install
npm run dev          # http://localhost:3000
```

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build |
| `npm run lint` | ESLint |

| Variável | Onde vai | Observação |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `.env.local` / Vercel | Opcional. URL pública usada em canonical, Open Graph e sitemap. Na Vercel, usa `VERCEL_PROJECT_PRODUCTION_URL` se ausente. |

Arquivos `.env*` não vão para o git.

## Editando o conteúdo

Textos, contatos, residências, comodidades, FAQ e depoimentos ficam em `frontend/lib/content.ts`. O número do WhatsApp (`whatsappDigits`, só dígitos com DDI) alimenta o formulário e os links.

## SEO e performance

O build estático gera `/`, `/robots.txt`, `/sitemap.xml` e `/icon.svg`. O `npm run lint` e o `npm run build` passam sem erros (execução de 18/11/2026). Medições de Lighthouse no deploy: **pendente**.

## Roadmap e limitações

- ✅ Hero com `next/image`, formulário via WhatsApp, SEO técnico, correções de contraste e acessibilidade.
- Limitação: as fotos são de banco de imagens e não representam o empreendimento real.
- Limitação: não há imagem Open Graph dedicada.

Próximos passos:

1. Substituir dados de exemplo por contatos, CRECI e perfis sociais reais.
2. Trocar as fotos por renders e fotografias do empreendimento.
3. Medir Lighthouse no deploy e registrar aqui.
4. Adicionar workflow de CI (lint e build).

## Autor

| | |
|---|---|
| <img src="https://github.com/Provadelli.png" width="48" alt="Avatar de Provadelli" /> | [Provadelli](https://github.com/Provadelli) |

## Licença

Sem licença definida.
