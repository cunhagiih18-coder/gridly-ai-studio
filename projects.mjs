// Portfolio data. Images come from the Behance project modules (downloaded at build time).
// img lists: file stems (hash6 + projectId + "." + hash); ".png" is appended.
// full = the long full-page capture used in the "hover to scroll" preview.

export const CATS = {
  vendas: { pt: "Página de Vendas", en: "Sales Page" },
  lp: { pt: "Landing Page", en: "Landing Page" },
  lancamento: { pt: "Lançamento", en: "Launch" },
  inst: { pt: "Institucional", en: "Website" },
  id: { pt: "Identidade Visual", en: "Visual Identity" },
};

const s = (id, list) => list.split(" ").map(x => { const [a, b] = x.split("."); return a + id + "." + b; });

export const PROJECTS = [
  {
    slug: "agni-jornada-do-despertar", id: "257161323", cat: "vendas", year: 2026,
    title: "Agni - Jornada do Despertar", client: "Cláudio Soares", tools: "Figma, Elementor",
    service: { pt: "Estratégia, copy e design", en: "Strategy, copywriting & design" },
    home: "p-agni",
    intro: {
      pt: "Página de vendas e área de membros da Agni: Jornada do Despertar, um programa de 21 dias de limpeza, proteção e abertura energética conduzido por Cláudio Soares. O desafio era traduzir um tema sensível e subjetivo em uma experiência elegante e confiável, que acolhe quem “já tentou de tudo” e conduz até a inscrição com segurança.",
      en: "Sales page and members area for Agni: Jornada do Despertar, a 21-day energy-healing program by Cláudio Soares. The challenge was to turn a sensitive, subjective topic into an elegant and trustworthy experience that welcomes people who have “tried everything” and guides them safely to sign-up.",
    },
    direction: {
      pt: "A direção visual combina azul-noite, dourado e tons de areia, a serifa Lora em itálico e fotografia de luz natural, e se estende para dentro da área de membros, nas capas de boas-vindas, ciclos e aulas diárias.",
      en: "Night blue, gold and sand tones, italic serif typography and natural-light imagery create a serene, trustworthy experience that carries from the sales page into every cover of the members area.",
    },
    cover: "c23862257161323.6ad1026523ba5",
    full: "a094cf257161323.6ad1026526e68",
    gallery: s("257161323", "a1b4ac.6ad1026522b4a f9eb31.6ad1026523490 27a6fe.6ad1026524275 561888.6ad103783e2da f6fe7f.6ad1026525fb1 4d6882.6ad1026526766 985bd5.6ad102652496a"),
    behance: "https://www.behance.net/gallery/257161323/Pagina-de-Vendas-Agni-Jornada-do-Despertar",
  },
  {
    slug: "leandro-scarpa-fisioterapia", id: "257159265", cat: "inst", year: 2026,
    title: "Leandro Scarpa - Fisioterapia", client: "Leandro Scarpa", tools: "Figma, Elementor",
    service: { pt: "Site institucional", en: "Website" },
    home: "p-scarpa",
    intro: {
      pt: "Site institucional para Leandro Scarpa, fisioterapeuta em Florianópolis com mais de 13 anos de experiência em fisioterapia, quiropraxia e acupuntura. O objetivo era transformar a reputação construída no consultório em presença digital: um site claro, acolhedor e confiável, que apresenta os tratamentos e leva o paciente direto para o agendamento.",
      en: "Website for Leandro Scarpa, a physiotherapist in Florianópolis, Brazil, with 13+ years of experience in physiotherapy, chiropractic and acupuncture. A clear, warm and trustworthy experience that turns in-clinic reputation into digital presence and drives patients straight to booking.",
    },
    direction: {
      pt: "A direção visual combina o verde profundo da marca com tons de areia e pêssego, uma serifa contemporânea e fotografia real dos atendimentos.",
      en: "The visual direction pairs the brand's deep green with sand and peach tones, a contemporary serif and real photography from the sessions.",
    },
    cover: "384c4f257159265.6ad0f8254fd74",
    full: "f707a9257159265.6ad0f779a4a9e",
    gallery: s("257159265", "696531.6ad0f779a39aa da3e46.6ad0f779a3f6c 670248.6ad0f779a6014 4762b4.6ad0f779a5a8e ce8008.6ad0f779a4fc7"),
    behance: "https://www.behance.net/gallery/257159265/Site-Institucional-Leandro-Scarpa-Fisioterapia",
  },
  {
    slug: "llubiana-arantes-neurociencia", id: "257158429", cat: "lp", year: 2026,
    title: "Dra. Llubiana Arantes - Neurociência", client: "Dra. Llubiana Arantes", tools: "Figma, Elementor",
    service: { pt: "Landing page", en: "Landing page" },
    home: "p-llubiana",
    intro: {
      pt: "A Imersão Práticas Profissionais em Quociente Digital reúne profissionais de saúde e educação para aprender, com a Dra. Llubiana Arantes, a conduzir crianças, adolescentes e famílias na relação com as telas, a partir da neurociência.",
      en: "Práticas Profissionais em Quociente Digital is an online immersion for health and education professionals, led by Dr. Llubiana Arantes, on guiding children, teenagers and families in their relationship with screens, through neuroscience.",
    },
    direction: {
      pt: "O desafio da página era traduzir um tema científico em uma experiência clara e confiável, sem perder o calor de quem cuida de famílias. A direção visual combina o azul da tecnologia com tons de areia e creme, fotografia humana e elementos que remetem ao cérebro e à conexão digital.",
      en: "The landing page translates a scientific topic into a clear, trustworthy experience without losing the warmth of someone who cares for families, pairing a tech-driven blue palette with warm neutrals, human photography and elements that evoke the brain and digital connection.",
    },
    cover: "13ed85257158429.6ad0f3781d0e6",
    full: "dea5f1257158429.6ad0f3781df46",
    gallery: s("257158429", "9a8cc6.6ad0f3781c00a 8cc8b0.6ad0f3781c5f1 ad4932.6ad0f3781db1d 6b658e.6ad0f3781cb8a"),
    behance: "https://www.behance.net/gallery/257158429/Landing-Page-Dra-Llubiana-Arantes-Neurociencia",
  },
  {
    slug: "cristianne-fabris-urologia", id: "257158057", cat: "lp", year: 2026,
    title: "Dra. Cristianne Fabris - Urologia", client: "Dra. Cristianne Fabris", tools: "Figma, Photoshop, Elementor",
    service: { pt: "Estratégia, copy e design", en: "Strategy, copywriting & design" },
    home: "p-cristianne",
    intro: {
      pt: "Landing page para os tratamentos íntimos da Dra. Cristianne Fabris, urologista. O desafio era falar de um tema delicado com elegância e acolhimento: uma página que transmite segurança médica, discrição e cuidado, e convida a paciente a dar o primeiro passo sem constrangimento.",
      en: "Landing page for Dr. Cristianne Fabris' intimate health treatments. The goal was to approach a delicate subject with elegance and warmth: a page that conveys medical trust, discretion and care, and invites patients to take the first step without embarrassment.",
    },
    direction: {
      pt: "A direção visual parte da identidade da doutora: nude, bronze e chocolate, serifa em itálico e fotografia suave, para criar uma experiência feminina, sofisticada e próxima.",
      en: "The visual direction builds on the doctor's identity: a soft nude-and-bronze palette, italic serif typography and gentle photography, for a feminine, sophisticated and approachable experience.",
    },
    cover: "e92f8d257158057.6ad0f1a545337",
    full: "531a48257158057.6ad0f1a544a34",
    gallery: s("257158057", "b6c6c4.6ad0f1a54168c 92d0e9.6ad0f1a540c19 fd2044.6ad0f1a542006 d6f04e.6ad0f1a542df6 d6f286.6ad0f1a54422f"),
    behance: "https://www.behance.net/gallery/257158057/Landing-Page-Dra-Cristianne-Fabris-Urologia",
  },
  {
    slug: "contima-identidade-visual", id: "257106377", cat: "id", year: 2026,
    title: "Contima", client: "Contima", tools: "Figma, Illustrator, Photoshop",
    service: { pt: "Identidade visual", en: "Brand identity" },
    home: "p-contima",
    intro: {
      pt: "Identidade visual para a Contima, marca de assessoria contábil que conecta organização, clareza e proximidade ao dia a dia de quem empreende. Sob o conceito “Além dos números”, o projeto apresenta um sistema visual contemporâneo com logotipo, paleta de cores, tipografia, grafismos e direção fotográfica.",
      en: "Brand identity for Contima, an accounting firm that brings organization, clarity and closeness to the everyday life of business owners. Under the concept “Beyond the numbers”, the project presents a contemporary visual system with logo, color palette, typography, graphic elements and photo direction.",
    },
    direction: {
      pt: "A combinação de verde profundo, oliva e marfim transmite uma presença profissional, acolhedora e confiante. A identidade se desdobra em papelaria, comunicação digital, redes sociais, website e aplicações de marca, construindo consistência em cada ponto de contato.",
      en: "Deep green, olive and ivory convey a professional, warm and confident presence. The identity unfolds into stationery, digital communication, social media, website and brand applications, building consistency at every touchpoint.",
    },
    cover: "3fbc3a257106377.6acf9f5d79be5",
    full: null,
    gallery: s("257106377", "4688f1.6acf9f5d7944b f0a351.6acf9f5d7ca7d 8f15c2.6acf9f5d7a3e3 709d18.6acf9f5d7db9d e7cffb.6acf9f5d8038a 5a90da.6acf9f5d784f4 058c18.6acf9f5d7fcc0 82a327.6acf9f5d77d24 66261f.6acf9f5d76d16 ad7aee.6acf9f5d80af2 79cbe0.6acf9f5d7ac3f 85dccc.6acf9f5d7649c cc0638.6acf9f5d78c9d 155b2a.6acf9f5d7b481 492987.6acf9f5d77549 b216e6.6acf9f5d7f61e 945734.6acf9f5d7d2d3 e400ac.6acf9f5d7eea5 5109e3.6acf9f5d7e5ac 487a08.6acf9f5d7bc34 58b76f.6acf9f5d811ad 6a0b73.6acf9f5d818ba 3c7ff1.6acf9f5d7c35a"),
    behance: "https://www.behance.net/gallery/257106377/Contima-Identidade-Visual-Brand-Identity",
  },
  {
    slug: "diogo-viana-dia-do-medico", id: "240603275", cat: "lancamento", year: 2025,
    title: "Dr. Diogo Viana - Dia do Médico", client: "Dr. Diogo Viana", tools: "Figma, Elementor",
    service: { pt: "Identidade, criativos e landing page", en: "Identity, creatives & landing page" },
    home: "p-diogo",
    intro: {
      pt: "Projeto de comunicação desenvolvido para o Dr. Diogo Viana, criado para um evento especial em comemoração ao Dia do Médico, com foco em clínica hormonal e interpretação prática da TRH.",
      en: "Communication project for Dr. Diogo Viana, created for a special Doctor's Day event focused on hormonal clinical practice and HRT interpretation.",
    },
    direction: {
      pt: "O trabalho envolveu a construção da identidade visual, desenvolvimento de criativos e desdobramentos visuais, garantindo consistência estética, clareza na mensagem e posicionamento técnico em todos os pontos de contato do evento.",
      en: "The project included visual identity, creative assets and visual rollouts, ensuring aesthetic consistency, clear messaging and strong technical positioning across all materials.",
    },
    cover: "af7ed2240603275.6ad0fa58c65f6",
    full: "d8e4b7240603275.69421dedd7370",
    gallery: s("240603275", "30bc54.6ad0fa58c5ebd ca5ade.69421dedd5cde ef9ecc.69421dedd54a4"),
    behance: "https://www.behance.net/gallery/240603275/Landing-Page-Dr-Diogo-Viana-Dia-do-Mdico",
  },
  {
    slug: "pos-podologia-clinica", id: "240602361", cat: "vendas", year: 2025,
    title: "Pós em Podologia Clínica", client: "Talita Santos", tools: "Figma, Photoshop, Elementor",
    service: { pt: "Página de vendas", en: "Sales page" },
    home: "p-podologia",
    intro: {
      pt: "Landing page desenvolvida para a expert Talita Santos, voltada à divulgação da Pós-Graduação em Podologia Clínica com Ênfase em Doenças Crônicas e Grupos de Risco.",
      en: "Landing page for expert Talita Santos, created to promote the Postgraduate Program in Clinical Podiatry with emphasis on Chronic Diseases and Risk Groups.",
    },
    direction: {
      pt: "O projeto teve como foco apresentar a proposta acadêmica de forma clara e estratégica, reforçando a autoridade da especialista, a credibilidade institucional e os diferenciais da formação para profissionais que buscam evolução clínica e segurança na prática.",
      en: "The project focused on clearly presenting the academic proposition, strengthening the expert's authority, institutional credibility and the key benefits of the program for professionals seeking clinical advancement and confidence in practice.",
    },
    cover: "2e5b5f240602361.6ad0fcb8ce990",
    full: "2d9b7b240602361.6942167a89176",
    gallery: s("240602361", "64861e.6942167a873aa"),
    behance: "https://www.behance.net/gallery/240602361/Pagina-de-Vendas-Pos-Graduacao-em-Podologia-Clinica",
  },
  {
    slug: "protocolo-360-brows", id: "240588159", cat: "lp", year: 2025,
    title: "Protocolo 360º Brows", client: "Tulio Cotta", tools: "Figma, GreatPages",
    service: { pt: "Landing page", en: "Landing page" },
    intro: {
      pt: "Landing page criada para o expert Tulio Cotta, voltada ao Curso Online AO VIVO Protocolo 360º Brows, focado em Reconstrução Natural de Sobrancelhas.",
      en: "Landing page for expert Tulio Cotta, developed for the live online course 360º Brows Protocol, focused on Natural Eyebrow Reconstruction.",
    },
    direction: {
      pt: "O objetivo foi desenvolver uma página clara, comercial e visualmente consistente, destacando a proposta do curso, a autoridade do especialista e a oferta de forma direta.",
      en: "The goal was to design a clear, sales-oriented and visually consistent page, highlighting the course proposition, the expert's authority and the offer in a straightforward way.",
    },
    cover: "77648d240588159.6ad0fbe4bf8d4",
    full: "28d471240588159.6941b5394f59a",
    gallery: s("240588159", "0a5648.6941b539500ca"),
    behance: "https://www.behance.net/gallery/240588159/Design-de-Sobrancelhas-Landing-Page-Web-Design",
  },
  {
    slug: "forza-club-carol-cantelli", id: "239403999", cat: "lp", year: 2025,
    title: "Desafio Forza Club - Carol Cantelli", client: "Carol Cantelli · Forza Club", tools: "Figma",
    service: { pt: "Landing page", en: "Landing page" },
    intro: {
      pt: "Projeto criado como parte de um desafio promovido pela Forza Club para a expert Carol Cantelli.",
      en: "This project was created as part of a challenge by Forza Club for expert Carol Cantelli.",
    },
    direction: {
      pt: "O objetivo foi desenvolver uma landing page de alto impacto visual e foco comercial para divulgar o workshop “Domine o CapCut em apenas um dia”. A proposta foi unir linguagem acessível, estética moderna e elementos gráficos que reforçassem a autoridade da criadora e o valor da oferta.",
      en: "The goal was to design a high-impact landing page with a strong commercial focus to promote the workshop “Master CapCut in Just One Day”, combining a modern aesthetic, clear messaging and visual elements that reinforce Carol's authority and the value of the offer.",
    },
    cover: "89dbd6239403999.6928518f013a6",
    full: null,
    gallery: s("239403999", "fdd944.692852e3bd582 f5d54e.692852e3bde92"),
    behance: "https://www.behance.net/gallery/239403999/Pagina-de-Vendas-Desafio-Forza-Club-Carol-Cantelli",
  },
  {
    slug: "saude-funcional-raciocinio-clinico", id: "233377259", cat: "vendas", year: 2025,
    title: "Saúde Funcional & Raciocínio Clínico", client: "Saúde Funcional", tools: "Figma, Photoshop, Elementor",
    service: { pt: "Página de vendas e criativos", en: "Sales page & ad creatives" },
    intro: {
      pt: "Página de vendas e criativos de divulgação para o programa Saúde Funcional & Raciocínio Clínico.",
      en: "Sales page and promotional creatives for the Saúde Funcional & Raciocínio Clínico program.",
    },
    direction: null,
    cover: "1d47e8233377259.68ae71bea64de",
    full: "da6cce233377259.68ae71bea5ffc",
    gallery: s("233377259", "40d3d6.68ae71bea5464"),
    behance: "https://www.behance.net/gallery/233377259/Pagina-de-Vendas-Saude-Funcional-Raciocinio-Clinico",
  },
  {
    slug: "pos-biomecanica-clinica", id: "233376235", cat: "vendas", year: 2025,
    title: "Pós em Biomecânica Clínica", client: "Pós-Graduação em Biomecânica", tools: "Figma, Photoshop, Elementor",
    service: { pt: "Página de vendas", en: "Sales page" },
    home: "p-biomecanica",
    intro: {
      pt: "Página de vendas da Pós-Graduação em Biomecânica.",
      en: "Sales page for a postgraduate program in Biomechanics.",
    },
    direction: null,
    cover: "68cb9c233376235.68ae68e60c6e3",
    full: "9c2bd5233376235.68ae68e60cba6",
    gallery: [],
    behance: "https://www.behance.net/gallery/233376235/Pagina-de-Vendas-Pos-Graduacao-Biomecanica",
  },
  {
    slug: "cbef-congresso", id: null, cat: "id", year: 2026,
    title: "CBEF - Congresso de Endocrinologia Feminina", client: "CBEF", tools: "Figma, Illustrator",
    service: { pt: "Identidade visual do evento", en: "Event visual identity" },
    home: "p-cbef",
    intro: {
      pt: "Identidade visual do 1º Congresso Brasileiro de Endocrinologia Feminina: símbolo, credenciais, cordão do crachá e peças do evento.",
      en: "Visual identity for the 1st Brazilian Congress of Female Endocrinology: symbol, badges, lanyard and event collateral.",
    },
    direction: null,
    cover: null, // uses the home card image (p-cbef)
    full: null,
    gallery: [],
    behance: null,
  },
];
