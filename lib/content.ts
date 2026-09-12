export const site = {
  name: "Atelier Residences",
  shortName: "ATELIER",
  tagline: "Exclusividade e sofisticação em cada detalhe.",
  phone: "+55 (11) 4002-8922",
  whatsapp: "+55 11 99999-0000",
  email: "concierge@atelierresidences.com.br",
  address: "Av. Principal, nº 1000 — Bairro Nobre, São Paulo — SP",
};

export const navLinks = [
  { label: "O Empreendimento", href: "#empreendimento" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Residências", href: "#residencias" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export const footerNavLinks = [
  ...navLinks,
  { label: "Sobre a Atelier", href: "#sobre" },
  { label: "Localização", href: "#localizacao" },
  { label: "Perguntas Frequentes", href: "#faq" },
];

export const heroWords = [
  "sofisticação",
  "elegância",
  "excelência",
  "distinção",
  "singularidade",
];

export const highlights = [
  { icon: "BedDouble", value: "4 Suítes", label: "Master com Closet" },
  { icon: "Ruler", value: "580m²", label: "Área Privativa" },
  { icon: "CarFront", value: "4 Vagas", label: "Com Carregador EV" },
  { icon: "Eye", value: "360º", label: "Vista Panorâmica" },
];

export const conceptImages = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    alt: "Fachada iluminada de arranha-céu de luxo ao entardecer, com varandas amplas e paisagismo sofisticado.",
    className: "h-72",
  },
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
    alt: "Piscina de borda infinita privativa no rooftop, com vista para o horizonte da cidade ao entardecer.",
    className: "h-48",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    alt: "Sala de estar ampla com pé-direito duplo, janelas do piso ao teto e mobiliário contemporâneo.",
    className: "h-48",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
    alt: "Hall de entrada sofisticado com painéis de madeira, iluminação indireta e piso em pedra polida.",
    className: "h-72",
  },
];

export const differentials = [
  {
    title: "Mármore Italiano",
    description: "Acabamentos importados diretamente de Carrara, selecionados peça a peça.",
  },
  {
    title: "Rooftop Privativo",
    description: "Piscinas aquecidas e deck panorâmico exclusivo para cada torre.",
  },
  {
    title: "Automação Completa",
    description: "Climatização, iluminação e segurança integradas por um único aplicativo.",
  },
  {
    title: "Consultoria Personalizada",
    description: "Um consultor dedicado acompanha cada etapa, da visita à entrega das chaves.",
  },
];

export const residences = [
  {
    tag: "Penthouse",
    name: "Penthouse Duplex",
    description:
      "O topo da sofisticação com pé-direito duplo, terraço panorâmico e piscina privativa com borda infinita.",
    features: ["680m² de área privativa", "5 suítes com closet", "5 vagas na garagem"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    alt: "Interior de cobertura duplex de luxo com escada escultural e vista panorâmica da cidade.",
  },
  {
    tag: "Garden",
    name: "Garden Suites",
    description:
      "A sensação de morar em uma casa suspensa, com um exuberante terraço privativo arborizado.",
    features: ["580m² de área total", "4 suítes Master", "4 vagas na garagem"],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
    alt: "Apartamento garden com terraço privativo ajardinado e área de estar externa.",
  },
  {
    tag: "Sky Residence",
    name: "Sky Residences",
    description:
      "Pavimentos inteiros dedicados ao conforto absoluto, com elevador privativo e automação completa.",
    features: ["520m² de área privativa", "4 suítes", "4 vagas na garagem"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    alt: "Sala de estar com janelas curvas do piso ao teto capturando vista panorâmica da cidade.",
  },
];

export const amenities = [
  {
    icon: "Wine",
    title: "Wine Bar & Adega",
    description: "Climatização dedicada e sommelier residente.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    alt: "Adega privativa climatizada com prateleiras de madeira escura e garrafas de vinho selecionadas.",
  },
  {
    icon: "Sparkles",
    title: "Private Spa",
    description: "Salas de massagem, sauna seca e hidromassagem.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    alt: "Ambiente de spa privativo com iluminação suave e paredes em pedra natural.",
  },
  {
    icon: "Dumbbell",
    title: "Wellness Center",
    description: "Equipamentos de última geração e consultoria esportiva.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
    alt: "Academia moderna com equipamentos pretos, piso de madeira e espelhos do piso ao teto.",
  },
  {
    icon: "PlaneTakeoff",
    title: "Heliponto Exclusivo",
    description: "Homologado para aeronaves de grande porte.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    alt: "Heliponto no topo de um edifício ao entardecer com vista para a metrópole iluminada.",
  },
];

export const aboutStats = [
  { value: "18", label: "Anos de mercado" },
  { value: "42", label: "Empreendimentos entregues" },
  { value: "1.200+", label: "Famílias atendidas" },
  { value: "98%", label: "Satisfação dos clientes" },
];

export const testimonials = [
  {
    quote:
      "A equipe da Atelier acompanhou cada etapa da compra com uma atenção que eu nunca tinha visto no mercado imobiliário. Hoje moro em um lugar que realmente parece feito sob medida.",
    name: "Marina Salgado",
    role: "Moradora — Penthouse Duplex",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Comprei um imóvel na planta pela primeira vez e o processo foi surpreendentemente transparente. Recebi relatórios de obra mensais e nunca fiquei sem resposta.",
    name: "Eduardo Prado",
    role: "Investidor",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "O nível de acabamento entregue superou o que foi prometido no memorial descritivo. É raro ver isso no mercado de alto padrão.",
    name: "Camila Herrera",
    role: "Moradora — Garden Suites",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "A consultoria de financiamento da Atelier encontrou uma condição que nenhum outro banco tinha oferecido. Fizeram questão de simplificar tudo.",
    name: "Rafael Times",
    role: "Comprador — Sky Residences",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  },
];

export const faqs = [
  {
    question: "Quais documentos são necessários para reservar uma unidade?",
    answer:
      "Para a reserva inicial pedimos apenas um documento de identificação e comprovante de residência. A documentação completa é solicitada somente na etapa de contrato, com o acompanhamento do nosso time jurídico.",
  },
  {
    question: "O Reserva Imperiale já possui data de entrega prevista?",
    answer:
      "Sim. A previsão de entrega é para o quarto trimestre de 2028, com relatórios de obra trimestrais enviados a todos os proprietários.",
  },
  {
    question: "É possível personalizar o acabamento da unidade?",
    answer:
      "Sim, oferecemos um memorial de personalização com opções de revestimentos, marcenaria e automação, definido junto ao nosso escritório de arquitetura parceiro.",
  },
  {
    question: "A Atelier Residences oferece consultoria de financiamento?",
    answer:
      "Sim, contamos com uma mesa de crédito dedicada que negocia condições exclusivas junto aos principais bancos e fintechs imobiliárias do país.",
  },
  {
    question: "Posso agendar uma visita ao apartamento decorado?",
    answer:
      "Sim. Basta preencher o formulário de contato ou falar com um de nossos consultores pelo WhatsApp para agendar uma visita privativa, sem compromisso.",
  },
];

export const contactTopics = [
  "Penthouse Duplex (680m²)",
  "Garden Suites (580m²)",
  "Sky Residences (520m²)",
  "Outra dúvida",
];
