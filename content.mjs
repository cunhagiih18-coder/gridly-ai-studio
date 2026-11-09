// ------------------------------------------------------------------
// Home configuration: edit here to change what appears on the site.
// Slugs come from projects.mjs.
// ------------------------------------------------------------------

// Order of the "Todos os projetos" page (and of "Próximo projeto" in the cases).
export const ORDER = [
  "contima-identidade-visual",
  "leandro-scarpa-fisioterapia",
  "llubiana-arantes-neurociencia",
  "cristianne-fabris-urologia",
  "agni-jornada-do-despertar",
  "diogo-viana-dia-do-medico",
  "cbef-congresso",
  "pos-podologia-clinica",
  "protocolo-360-brows",
  "forza-club-carol-cantelli",
  "saude-funcional-raciocinio-clinico",
  "pos-biomecanica-clinica",
];

// Opening (Voy-style wall of work). center = main project.
// Cards: x / y = position in % of the screen, w = width in vw,
// d = depth for the parallax (0 = still, 1 = moves the most),
// img: "thumb" (cover) or "full" (top of the full page, portrait crop),
// m: true = also shown on mobile.
export const HERO = {
  center: "contima-identidade-visual",
  cards: [
    { slug: "agni-jornada-do-despertar", img: "thumb", x: -2, y: -7, w: 16, d: 0.6, m: true },
    { slug: "leandro-scarpa-fisioterapia", img: "full", x: 23, y: -12, w: 10, d: 0.35 },
    { slug: "cristianne-fabris-urologia", img: "thumb", x: 66, y: -5, w: 13, d: 0.5, m: true },
    { slug: "diogo-viana-dia-do-medico", img: "thumb", x: 88, y: 8, w: 15, d: 0.8 },
    { slug: "llubiana-arantes-neurociencia", img: "full", x: -5, y: 42, w: 9, d: 0.9 },
    { slug: "pos-podologia-clinica", img: "full", x: 93, y: 46, w: 9, d: 0.4 },
    { slug: "protocolo-360-brows", img: "thumb", x: 6, y: 80, w: 14, d: 0.7 },
    { slug: "cbef-congresso", img: "thumb", x: 30, y: 84, w: 13, d: 0.45, m: true },
    { slug: "saude-funcional-raciocinio-clinico", img: "thumb", x: 56, y: 82, w: 15, d: 0.65 },
    { slug: "forza-club-carol-cantelli", img: "thumb", x: 80, y: 78, w: 12, d: 0.55, m: true },
  ],
};

// "Projetos selecionados" on the home, in this order.
// size: "wide" (big image + caption column) or "half" (two side by side; use in pairs).
// flip: caption on the left.
export const FEATURED = [
  { slug: "contima-identidade-visual", size: "wide" },
  { slug: "leandro-scarpa-fisioterapia", size: "half" },
  { slug: "llubiana-arantes-neurociencia", size: "half" },
  { slug: "cristianne-fabris-urologia", size: "wide", flip: true },
  { slug: "agni-jornada-do-despertar", size: "half" },
  { slug: "diogo-viana-dia-do-medico", size: "half" },
  { slug: "pos-podologia-clinica", size: "half" },
  { slug: "protocolo-360-brows", size: "half" },
];

// Short context line used in captions (vitrine, all projects, next project).
export const SUMMARY = {
  "agni-jornada-do-despertar": { pt: "Página de vendas e área de membros para um programa de 21 dias.", en: "Sales page and members area for a 21-day program." },
  "leandro-scarpa-fisioterapia": { pt: "Site institucional para um fisioterapeuta em Florianópolis, pensado para levar ao agendamento.", en: "Website for a physiotherapist in Florianópolis, designed to lead to booking." },
  "llubiana-arantes-neurociencia": { pt: "Landing page de uma imersão sobre neurociência e a relação das famílias com as telas.", en: "Landing page for an immersion on neuroscience and families' relationship with screens." },
  "cristianne-fabris-urologia": { pt: "Landing page para tratamentos íntimos: um tema delicado, tratado com discrição e acolhimento.", en: "Landing page for intimate health treatments: a delicate topic handled with discretion and warmth." },
  "contima-identidade-visual": { pt: "Identidade visual de uma assessoria contábil, sob o conceito “Além dos números”.", en: "Brand identity for an accounting firm, under the concept “Beyond the numbers”." },
  "diogo-viana-dia-do-medico": { pt: "Identidade, criativos e landing page de um evento de Dia do Médico.", en: "Identity, creatives and landing page for a Doctor's Day event." },
  "pos-podologia-clinica": { pt: "Página de vendas de uma pós-graduação em Podologia Clínica.", en: "Sales page for a postgraduate program in Clinical Podiatry." },
  "protocolo-360-brows": { pt: "Landing page de um curso online ao vivo de reconstrução de sobrancelhas.", en: "Landing page for a live online eyebrow reconstruction course." },
  "forza-club-carol-cantelli": { pt: "Landing page de workshop criada em um desafio da Forza Club.", en: "Workshop landing page created in a Forza Club challenge." },
  "saude-funcional-raciocinio-clinico": { pt: "Página de vendas e criativos de divulgação de um programa clínico.", en: "Sales page and promotional creatives for a clinical program." },
  "pos-biomecanica-clinica": { pt: "Página de vendas de uma pós-graduação em Biomecânica.", en: "Sales page for a postgraduate program in Biomechanics." },
  "cbef-congresso": { pt: "Identidade visual de um congresso médico: símbolo, credenciais e peças do evento.", en: "Visual identity for a medical congress: symbol, badges and event collateral." },
};

// Optional "Arquitetura da página" block per case: the page sections in order.
// Leave empty until there is real material to show. Example:
// "agni-jornada-do-despertar": { pt: ["Promessa e prova", "..."], en: ["...", "..."] },
export const ARCHITECTURE = {};
