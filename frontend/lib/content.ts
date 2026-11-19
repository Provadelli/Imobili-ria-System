const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const site = {
  name: "Atelier Residences",
  shortName: "ATELIER",
  tagline: "Arquitetura autoral e atendimento sob medida para quem vive o extraordinário.",
  phone: "+55 (11) 4002-8922",
  whatsapp: "+55 11 99999-0000",
  whatsappLink: "https://wa.me/5511999990000",
  email: "concierge@atelierresidences.com.br",
  address: "Rua Imperiale, 1000 — Jardins, São Paulo — SP",
  street: "Rua Imperiale, 1000",
  neighborhood: "Jardins",
  creci: "CRECI 00000-J",
  cnpj: "00.000.000/0001-00",
  legalName: "Atelier Residences Negócios Imobiliários Ltda.",
  dpo: {
    name: "Encarregado de Dados — Atelier Residences",
    email: "privacidade@atelierresidences.com.br",
  },
  policyVersion: "2026-11",
  policyUpdatedAt: "2 de novembro de 2026",
};

export const navLinks = [
  { label: "Imóveis", href: "#imoveis" },
  { label: "Planta 3D", href: "#planta" },
  { label: "Comodidades", href: "#experiencias" },
  { label: "Localização", href: "#localizacao" },
  { label: "Atendimento", href: "#atendimento" },
  { label: "Contato", href: "#contato" },
];

export const heroImage = {
  src: unsplash("photo-1600585154340-be6161a56a0c", 2000),
  alt: "Fachada do Reserva Imperiale ao entardecer, com varandas amplas, iluminação quente e paisagismo.",
};

export const manifesto =
  "Acreditamos que um endereço deve ser tão singular quanto quem o habita. O Reserva Imperiale nasce da arquitetura autoral, de materiais escolhidos peça a peça e do silêncio de viver acima da cidade.";

export const highlights = [
  { value: 4, suffix: "", label: "Suítes master com closet" },
  { value: 520, suffix: "m²+", label: "De área privativa" },
  { value: 4, suffix: "", label: "Vagas com carregador EV" },
  { value: 360, suffix: "º", label: "De vista panorâmica" },
];

/* ---------- Mercado: gráfico que vira skyline ---------- */

export type MarketSeries = {
  id: string;
  num: string;
  title: [string, string];
  description: string;
  unit: string;
  format: (v: number) => string;
  values: number[];
};

export const marketYears = ["1º", "6º", "12º", "18º", "24º", "30º", "36º", "40º"];

export const marketSeries: MarketSeries[] = [
  {
    id: "valorizacao",
    num: "01",
    title: ["Altura", "da torre"],
    description:
      "Do térreo à cobertura, a torre chega a 144 m em 40 pavimentos, com pé-direito de 3,6 m nos andares tipo.",
    unit: "metros",
    format: (v) => `${v} m`,
    values: [4, 22, 43, 65, 86, 108, 130, 144],
  },
  {
    id: "vendas",
    num: "02",
    title: ["Residências", "acumuladas"],
    description:
      "São 48 residências no total, com no máximo duas por andar, o que mantém a privacidade de cada uma.",
    unit: "residências",
    format: (v) => `${v} resid.`,
    values: [2, 8, 14, 20, 26, 32, 40, 48],
  },
  {
    id: "altura",
    num: "03",
    title: ["Altitude", "da vista"],
    description:
      "O terreno fica a cerca de 800 m acima do nível do mar. Somada à altura da torre, a cobertura chega perto de 950 m.",
    unit: "metros acima do mar",
    format: (v) => `${v} m`,
    values: [804, 822, 843, 865, 886, 908, 930, 944],
  },
];

export const marketSource = "Medidas do projeto arquitetônico. Reserva Imperiale é um empreendimento fictício, criado para demonstração.";

/* ---------- Residências ---------- */

export const residences = [
  {
    id: "cobertura",
    tag: "Cobertura",
    name: "Penthouse Duplex",
    area: 680,
    suites: 5,
    parking: 5,
    summary: "Duplex no topo da torre, com terraço e piscina privativa.",
    description:
      "O topo do Reserva Imperiale: pé-direito duplo, terraço panorâmico e piscina privativa com borda infinita.",
    features: ["Piscina privativa", "Living em pé-direito duplo", "Cozinha gourmet com ilha"],
    image: unsplash("photo-1600607687920-4e2a09cf159d", 1600),
    alt: "Interior de cobertura duplex com escada escultural e vista panorâmica da cidade.",
  },
  {
    id: "garden",
    tag: "Garden",
    name: "Garden Suites",
    area: 580,
    suites: 4,
    parking: 4,
    summary: "Casa suspensa, com jardim privativo e living integrado.",
    description:
      "A sensação de uma casa suspensa, com terraço privativo arborizado e living integrado ao jardim.",
    features: ["Jardim privativo com deck", "Living aberto para o jardim", "Quatro suítes"],
    image: unsplash("photo-1600210492486-724fe5c67fb0", 1600),
    alt: "Apartamento garden com terraço ajardinado e área de estar externa.",
  },
  {
    id: "sky",
    tag: "Andar inteiro",
    name: "Sky Residences",
    area: 520,
    suites: 4,
    parking: 4,
    summary: "Um pavimento por residência, com elevador privativo.",
    description:
      "Um pavimento inteiro por residência, com elevador privativo e automação completa.",
    features: ["Elevador privativo", "Janelas do piso ao teto", "Automação completa"],
    image: unsplash("photo-1512917774080-9991f1c4c750", 1600),
    alt: "Sala de estar com janelas curvas do piso ao teto e vista panorâmica.",
  },
];

/* ---------- Experiências ---------- */

export const amenities = [
  {
    title: "Adega e wine bar",
    description: "Adega climatizada com nichos para 400 garrafas e sala de degustação.",
    image: unsplash("photo-1414235077428-338989a2e8c0", 900),
    alt: "Adega climatizada com prateleiras de madeira escura e garrafas selecionadas.",
  },
  {
    title: "Spa privativo",
    description: "Salas de massagem, sauna seca, vapor e hidromassagem.",
    image: unsplash("photo-1544161515-4ab6ce6db874", 900),
    alt: "Spa privativo com iluminação suave e paredes em pedra natural.",
  },
  {
    title: "Espaço wellness",
    description: "Musculação, estúdio de funcional e sala de alongamento.",
    image: unsplash("photo-1540497077202-7c8a3999166f", 900),
    alt: "Academia moderna com piso de madeira e espelhos do piso ao teto.",
  },
  {
    title: "Heliponto",
    description: "Pouso e decolagem conforme a regulamentação da aviação civil, com lounge de embarque.",
    image: unsplash("photo-1486406146926-c627a92ad1ab", 900),
    alt: "Heliponto no topo de um edifício ao entardecer, com a metrópole ao fundo.",
  },
];

/* ---------- Galeria de conceito (scroll horizontal) ---------- */

export const gallery = [
  {
    src: unsplash("photo-1600585154340-be6161a56a0c", 1400),
    alt: "Fachada iluminada com varandas amplas ao entardecer.",
    caption: "Fachada em brises pivotantes de madeira",
  },
  {
    src: unsplash("photo-1600607687939-ce8a6c25118c", 1400),
    alt: "Sala de estar com pé-direito duplo e janelas do piso ao teto.",
    caption: "Living com pé-direito duplo",
  },
  {
    src: unsplash("photo-1584622650111-993a426fbf0a", 1400),
    alt: "Banheiro em mármore claro com iluminação indireta.",
    caption: "Mármore Calacatta selecionado em Carrara",
  },
  {
    src: unsplash("photo-1600566753086-00f18fb6b3ea", 1400),
    alt: "Hall de entrada com painéis de madeira e piso em pedra polida.",
    caption: "Hall social assinado",
  },
];

export const differentials = [
  { title: "Mármore Italiano", description: "Acabamentos importados de Carrara, selecionados peça a peça." },
  { title: "Rooftop Privativo", description: "Piscinas aquecidas e deck panorâmico exclusivos." },
  { title: "Automação Completa", description: "Clima, luz e segurança integrados em um único app." },
  { title: "Consultoria Dedicada", description: "Um consultor acompanha da visita à entrega das chaves." },
];

/* ---------- Sobre ---------- */

export const aboutStats = [
  { value: 1, suffix: "", label: "Torre" },
  { value: 40, suffix: "", label: "Pavimentos" },
  { value: 48, suffix: "", label: "Residências" },
  { value: 3, suffix: "", label: "Tipologias" },
];

/* ---------- Atendimento ---------- */

export const services = [
  {
    title: "Consultoria de vendas",
    description:
      "Um consultor acompanha você da primeira visita à assinatura do contrato, com plantas, memorial descritivo e condições por escrito.",
  },
  {
    title: "Crédito e financiamento",
    description:
      "Simulamos as condições com os principais bancos e explicamos cada etapa do financiamento antes de você decidir.",
  },
  {
    title: "Personalização da unidade",
    description:
      "Revestimentos, marcenaria e automação são definidos em conjunto com a equipe de arquitetura, dentro do memorial de personalização.",
  },
];

/* ---------- Localização ---------- */

export const locationPoints = [
  { id: "parque", label: "Parque do Ibirapuera", minutes: 5, x: 22, y: 30 },
  { id: "gastronomia", label: "Polo gastronômico", minutes: 3, x: 64, y: 26 },
  { id: "escola", label: "Escola internacional", minutes: 8, x: 78, y: 62 },
  { id: "hospital", label: "Hospital de referência", minutes: 7, x: 30, y: 74 },
  { id: "aeroporto", label: "Aeroporto de Congonhas", minutes: 15, x: 88, y: 18 },
];

/* ---------- FAQ ---------- */

export const faqs = [
  {
    question: "Quais documentos são necessários para reservar uma unidade?",
    answer:
      "Para a reserva inicial pedimos apenas um documento de identificação e comprovante de residência. A documentação completa é solicitada na etapa de contrato, com acompanhamento do nosso time jurídico.",
  },
  {
    question: "Qual a previsão de entrega do Reserva Imperiale?",
    answer:
      "A entrega está prevista para o quarto trimestre de 2028, com relatórios de obra trimestrais enviados a todos os proprietários.",
  },
  {
    question: "É possível personalizar o acabamento da unidade?",
    answer:
      "Sim. Há um memorial de personalização com opções de revestimentos, marcenaria e automação, definido com nossa arquiteta de personalização.",
  },
  {
    question: "A Atelier oferece consultoria de financiamento?",
    answer:
      "Sim. Nossa mesa de crédito negocia condições exclusivas com os principais bancos e fintechs imobiliárias do país.",
  },
  {
    question: "Como meus dados pessoais são tratados?",
    answer:
      "Usamos seus dados apenas para responder à sua solicitação, conforme a LGPD (Lei nº 13.709/2018). Você pode pedir acesso, correção ou exclusão a qualquer momento pelo e-mail do nosso Encarregado de Dados.",
  },
];

export const contactTopics = [
  "Penthouse Duplex (680 m²)",
  "Garden Suites (580 m²)",
  "Sky Residences (520 m²)",
  "Outra dúvida",
];
