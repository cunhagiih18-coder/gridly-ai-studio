// ------------------------------------------------------------------
// Home configuration — edit here to change what appears on the home.
// Slugs come from projects.mjs. Order in FEATURED = order on the page.
// size: "wide" (big image + caption column) or "half" (two side by side;
// put "half" items in pairs). flip: caption on the left.
// ------------------------------------------------------------------
export const HERO = {
  main: "agni-jornada-do-despertar",     // large cover
  crop: "leandro-scarpa-fisioterapia",   // tall crop of the full page
};

export const FEATURED = [
  { slug: "cristianne-fabris-urologia", size: "wide" },
  { slug: "llubiana-arantes-neurociencia", size: "half" },
  { slug: "pos-podologia-clinica", size: "half" },
  { slug: "contima-identidade-visual", size: "wide", flip: true },
  { slug: "diogo-viana-dia-do-medico", size: "half" },
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

// Optional "Arquitetura de Conversão" block per case: the page sections in order.
// Leave empty until there is real material to show. Example:
// "agni-jornada-do-despertar": { pt: ["Promessa e prova", "..."], en: ["...", "..."] },
export const ARCHITECTURE = {};
