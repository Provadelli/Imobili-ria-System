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
  address: "Av. Principal, nº 1000 — Bairro Nobre, São Paulo — SP",
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
  { label: "Empreendimento", href: "#manifesto" },
  { label: "Mercado", href: "#mercado" },
  { label: "Residências", href: "#residencias" },
  { label: "Consultores", href: "#consultores" },
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
  { value: 580, suffix: "m²", label: "De área privativa" },
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

export const marketYears = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

export const marketSeries: MarketSeries[] = [
  {
    id: "valorizacao",
    num: "01",
    title: ["Valorização", "do m²"],
    description:
      "O preço médio do metro quadrado de alto padrão na região cresceu 74% desde 2019.",
    unit: "R$ mil / m²",
    format: (v) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 1 })} mil`,
    values: [13.8, 14.6, 15.9, 17.2, 18.8, 20.4, 22.1, 24.0],
  },
  {
    id: "vendas",
    num: "02",
    title: ["Unidades", "vendidas"],
    description:
      "Unidades comercializadas pela Atelier por ano — mais de três vezes o volume de 2019.",
    unit: "unidades / ano",
    format: (v) => `${v} unid.`,
    values: [38, 46, 61, 72, 84, 97, 118, 136],
  },
  {
    id: "altura",
    num: "03",
    title: ["Altura", "das torres"],
    description:
      "Altura dos empreendimentos entregues a cada ano, culminando nos 162 m do Reserva Imperiale.",
    unit: "metros",
    format: (v) => `${v} m`,
    values: [72, 80, 88, 96, 108, 120, 138, 162],
  },
];

export const marketSource = "Dados ilustrativos para demonstração. Fonte simulada: Atelier Research, 2026.";

/* ---------- Residências ---------- */

export const residences = [
  {
    tag: "Cobertura",
    name: "Penthouse Duplex",
    area: "680 m²",
    description:
      "O topo do Reserva Imperiale: pé-direito duplo, terraço panorâmico e piscina privativa com borda infinita.",
    features: ["5 suítes com closet", "5 vagas", "Piscina privativa"],
    image: unsplash("photo-1600607687920-4e2a09cf159d"),
    alt: "Interior de cobertura duplex com escada escultural e vista panorâmica da cidade.",
  },
  {
    tag: "Garden",
    name: "Garden Suites",
    area: "580 m²",
    description:
      "A sensação de uma casa suspensa, com terraço privativo arborizado e living integrado ao jardim.",
    features: ["4 suítes master", "4 vagas", "Jardim privativo"],
    image: unsplash("photo-1600210492486-724fe5c67fb0"),
    alt: "Apartamento garden com terraço ajardinado e área de estar externa.",
  },
  {
    tag: "Andar inteiro",
    name: "Sky Residences",
    area: "520 m²",
    description:
      "Um pavimento inteiro por residência, com elevador privativo e automação completa.",
    features: ["4 suítes", "4 vagas", "Elevador privativo"],
    image: unsplash("photo-1512917774080-9991f1c4c750"),
    alt: "Sala de estar com janelas curvas do piso ao teto e vista panorâmica.",
  },
];

/* ---------- Experiências ---------- */

export const amenities = [
  {
    title: "Wine Bar & Adega",
    description: "Adega climatizada para 2.000 rótulos e sommelier residente.",
    image: unsplash("photo-1414235077428-338989a2e8c0", 900),
    alt: "Adega climatizada com prateleiras de madeira escura e garrafas selecionadas.",
  },
  {
    title: "Private Spa",
    description: "Salas de massagem, sauna seca, vapor e hidromassagem.",
    image: unsplash("photo-1544161515-4ab6ce6db874", 900),
    alt: "Spa privativo com iluminação suave e paredes em pedra natural.",
  },
  {
    title: "Wellness Center",
    description: "Equipamentos de última geração e personal trainers residentes.",
    image: unsplash("photo-1540497077202-7c8a3999166f", 900),
    alt: "Academia moderna com piso de madeira e espelhos do piso ao teto.",
  },
  {
    title: "Heliponto",
    description: "Homologado para aeronaves de grande porte, com lounge de embarque.",
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
  { value: 18, suffix: "", label: "Anos de mercado" },
  { value: 42, suffix: "", label: "Empreendimentos entregues" },
  { value: 1200, suffix: "+", label: "Famílias atendidas" },
  { value: 3, suffix: "", label: "Tipologias exclusivas" },
];

/* ---------- Consultores ---------- */

export const team = [
  {
    jobPosition: "Diretora de Novos Negócios",
    firstName: "Helena",
    lastName: "Duarte",
    imageUrl: unsplash("photo-1573496359142-b8d87734a5a2", 800),
    description:
      "Há 15 anos conduz lançamentos de alto padrão em São Paulo. Cuida pessoalmente de cada visita privativa ao decorado.",
  },
  {
    jobPosition: "Consultor Sênior de Investimentos",
    firstName: "Ricardo",
    lastName: "Albuquerque",
    imageUrl: unsplash("photo-1472099645785-5658abf4ff4e", 800),
    description:
      "Especialista em estruturação financeira e permutas. Encontra a melhor condição junto aos principais bancos do país.",
  },
  {
    jobPosition: "Arquiteta de Personalização",
    firstName: "Beatriz",
    lastName: "Moraes",
    imageUrl: unsplash("photo-1438761681033-6461ffad8d80", 800),
    description:
      "Acompanha o memorial de personalização de cada unidade — revestimentos, marcenaria e automação sob medida.",
  },
];

/* ---------- Localização ---------- */

export const locationPoints = [
  { id: "parque", label: "Parque do Ibirapuera", minutes: 5, x: 22, y: 30 },
  { id: "gastronomia", label: "Polo gastronômico", minutes: 3, x: 64, y: 26 },
  { id: "escola", label: "Escola internacional", minutes: 8, x: 78, y: 62 },
  { id: "hospital", label: "Hospital de referência", minutes: 7, x: 30, y: 74 },
  { id: "aeroporto", label: "Aeroporto executivo", minutes: 15, x: 88, y: 18 },
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
