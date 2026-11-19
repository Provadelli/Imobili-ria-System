<div align="center">

# Atelier Residences

**Site institucional de uma imobiliária de alto padrão, com o empreendimento fictício Reserva Imperiale como vitrine.** Reúne imóveis, planta isométrica em 3D, comodidades, localização e contato direto por WhatsApp.

![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Deploy](https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

[Destaques](#destaques) · [Estrutura](#estrutura) · [Como executar](#como-executar) · [Editar o conteúdo](#editar-o-conteúdo) · [Roadmap](#roadmap-e-limitações)

</div>

---

> O Reserva Imperiale é um projeto fictício, criado para demonstração. CNPJ, CRECI, telefones, e-mail e endereço são dados de exemplo e as imagens são de banco de imagens. Troque tudo em `frontend/lib/content.ts` antes de usar em produção.

## Destaques

| Recurso | O que faz |
|---|---|
| Carrossel de imóveis | Hero com fachada e as três tipologias, autoplay que pausa ao passar o mouse ou focar e respeita `prefers-reduced-motion`. |
| Catálogo por abas | Cobertura, Garden e Sky com área, suítes, vagas e diferenciais. |
| Planta em 3D | Isométrica em SVG puro, calculada no cliente: gire arrastando, separe os ambientes em camadas e veja a área de cada cômodo. Sem biblioteca 3D. |
| Comodidades | Carrossel com teclado, gesto de arrastar e pausa ao focar. |
| Contato por WhatsApp | O formulário valida os campos e abre `wa.me` com a mensagem pronta. Não há backend nem coleta no servidor. |
| Privacidade | Banner de cookies com preferências e política de privacidade. O mapa é um SVG próprio, sem iframe de terceiros. |
| SEO | Metadata, Open Graph, `robots.txt`, `sitemap.xml` e JSON-LD (`RealEstateAgent` e `FAQPage`). |

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.3 (Turbopack), React 19 |
| Linguagem | TypeScript 5 |
| Estilo | Tailwind CSS 4, componentes Radix |
| Animação | `motion` com `LazyMotion` |
| Tipografia | Manrope e Inter (`next/font`) |
| Imagens | `next/image` (AVIF/WebP), fotos do Unsplash |
| Hospedagem | Vercel |

## Estrutura

```text
.
├── frontend/
│   ├── app/                 # layout, página, privacidade, robots, sitemap
│   ├── components/
│   │   ├── sections/        # hero, imóveis, planta 3D, comodidades, contato...
│   │   ├── floor-plan-3d.tsx  # planta isométrica em SVG
│   │   └── ui/              # componentes base
│   └── lib/
│       ├── content.ts       # textos e dados do site
│       ├── floor-plans.ts   # ambientes de cada planta
│       └── site-url.ts      # URL base para SEO
└── docs/                    # briefing e referências de design
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
| `NEXT_PUBLIC_SITE_URL` | `.env.local` / Vercel | Opcional. URL pública usada em canonical, Open Graph e sitemap. Na Vercel usa `VERCEL_PROJECT_PRODUCTION_URL` se ausente. |

Arquivos `.env*` não vão para o git.

## Editar o conteúdo

- Textos, contatos, imóveis, comodidades e FAQ: `frontend/lib/content.ts`.
- Ambientes da planta 3D (posição, tamanho e descrição): `frontend/lib/floor-plans.ts`. A unidade é a célula; as áreas por cômodo são proporcionais ao total de cada tipologia.
- Número do WhatsApp: `whatsappDigits` / `whatsappLink` em `content.ts`.

## Roadmap e limitações

- ✅ Redesign institucional, carrossel, planta 3D, SEO técnico e CI (lint e build).
- Limitação: a planta 3D é esquemática, serve para entender a distribuição e não para medir o projeto.
- Limitação: as fotos não representam um empreendimento real.
- Lighthouse no deploy de produção (19/11/2026, uma rodada por formato):

| Formato | Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Mobile | 99 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

  No mobile: LCP de 1,1 s, TBT de 150 ms e CLS 0. A nota de Performance oscila entre rodadas.

Próximos passos:

1. Trocar dados e imagens de exemplo por reais.
2. Adicionar imagem Open Graph dedicada.

## Autor

| | |
|---|---|
| <img src="https://github.com/Provadelli.png" width="48" alt="Avatar de Provadelli" /> | [Provadelli](https://github.com/Provadelli) |

## Licença

Sem licença definida.
