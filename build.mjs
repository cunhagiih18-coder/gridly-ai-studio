// Build: downloads images (Vercel build machines have internet), converts them to WebP,
// and generates every page: / , /projetos , /projetos/<slug>.
// Content lives in projects.mjs (cases) and content.mjs (home selection + captions).
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import sharp from "sharp";
import { PROJECTS, CATS } from "./projects.mjs";
import { ORDER, HERO, FEATURED, SUMMARY, ARCHITECTURE } from "./content.mjs";

const FIG = "https://www.figma.com/api/mcp/asset/";
const BH = "https://mir-s3-cdn-cf.behance.net/projects/808/";
const MOD = "https://mir-s3-cdn-cf.behance.net/project_modules/";
const LIVE = "https://gridly-ai-studio.vercel.app/assets/";

// ---------- assets: [output path, urls to try, max width] ----------
const assets = [
  ["hero", [FIG + "7b7049c6-ca37-44e4-a1ae-7eb9abbadec6.png"], 2400], // portrait (used small in "Sobre")
  ["p-cbef", [FIG + "0d709360-2df5-4dd2-89c5-040f292293f9.png"], 1200],
  ["p-biomecanica", [BH + "6d2b48233376235.Y3JvcCwxNDE2LDExMDcsMCww.png"], 900],
  ["p-podologia", [BH + "f64b96240602361.Y3JvcCwxNDE3LDExMDgsMCww.png"], 900],
  ["p-diogo", [BH + "60cc27240603275.Y3JvcCwxNDE3LDExMDksMCww.png"], 900],
  ["p-llubiana", [BH + "c552e1257158429.Y3JvcCwxMzkzLDEwOTAsMyww.png"], 900],
  ["p-cristianne", [BH + "6226a3257158057.Y3JvcCwxMjc4LDEwMDAsNjAsMA.png"], 900],
  ["p-scarpa", [BH + "50d3cf257159265.Y3JvcCw4MDgsNjMyLDAsMA.png"], 900],
  ["p-contima", [BH + "714063257106377.Y3JvcCwxNDE3LDExMDksMCww.png"], 900],
  ["p-agni", [BH + "d0aae7257161323.Y3JvcCwxMzczLDEwNzQsMTMsMA.png"], 900],
];
const mod = f => [MOD + "1400/" + f + ".png", MOD + "source/" + f + ".png", MOD + "max_3840_webp/" + f + ".png"];
for (const p of PROJECTS) {
  const dir = "p/" + p.slug + "/";
  if (p.cover) assets.push([dir + "cover", mod(p.cover), 1400]);
  if (p.full) assets.push([dir + "full", mod(p.full), 1100]);
  p.gallery.forEach((g, i) => assets.push([dir + "g" + (i + 1), mod(g), 1400]));
}

const dims = {};
async function fetchOne([name, urls, width]) {
  const path = `public/assets/${name}.webp`;
  await mkdir(path.slice(0, path.lastIndexOf("/")), { recursive: true });
  if (process.env.OFFLINE) { // local test: placeholder images
    const h = name.endsWith("full") ? 6000 : Math.round(width * 0.78);
    dims[name] = [width, h];
    await writeFile(path, await sharp({ create: { width: 40, height: 40, channels: 3, background: "#2a3140" } }).webp().toBuffer());
    return true;
  }
  for (const u of [...urls, LIVE + name + ".webp"]) {
    try {
      const res = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      const out = await sharp(buf, { limitInputPixels: false })
        .resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
      await writeFile(path, out.data);
      dims[name] = [out.info.width, out.info.height];
      return true;
    } catch (e) { /* try next url */ }
  }
  console.error("FAILED", name);
  return false;
}
await mkdir("public/assets", { recursive: true });
for (const f of ["styles.css", "main.js"]) await copyFile(f, "public/" + f);
let failed = 0, next = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (next < assets.length) { const a = assets[next++]; if (!(await fetchOne(a))) failed++; }
}));
console.log("assets:", assets.length - failed, "ok,", failed, "failed");
if (failed) process.exit(1);

// ---------- helpers ----------
const esc = s => String(s).replace(/ - /g, "\u00a0- ").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const BY = Object.fromEntries(PROJECTS.map(p => [p.slug, p]));
const LIST = ORDER.filter(s => BY[s]).map(s => BY[s]).concat(PROJECTS.filter(p => !ORDER.includes(p.slug)));
const coverName = p => p.cover ? `p/${p.slug}/cover` : p.home;
// Cards use the cover when it is close to 9:7, otherwise the Behance thumbnail (808×632).
const thumbName = p => { const c = coverName(p); const [w, h] = dims[c] || [9, 7]; return (w / h < 1.12 || w / h > 1.5) && p.home ? p.home : c; };
const img = (name, alt, { cls = "", eager = false, sizes = "" } = {}) => {
  const [w, h] = dims[name] || [1400, 1000];
  return `<img src="/assets/${name}.webp" width="${w}" height="${h}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ""}${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${sizes ? ` sizes="${sizes}"` : ""}>`;
};
const UPWORK = "https://www.upwork.com/freelancers/~017cef40f218c12bb2";
const BEHANCE = "https://www.behance.net/giseleecunha";
const EMAIL = "cunhagiih18@gmail.com";
const sum = p => SUMMARY[p.slug] || { pt: p.intro.pt, en: p.intro.en };

// English dictionary (PT is the text written in the HTML).
const EN = {
  "nav.projects": "Projects", "nav.services": "Services", "nav.about": "About", "nav.contact": "Contact", "nav.menu": "Menu",
  "hero.lead": "Strategy, design and development of pages for brands, courses and launches.",
  "hero.cta": "Explore projects",
  "sel.label": "Selected projects", "sel.title": "Pages and brands built to be understood and chosen.",
  "sel.all": "See all projects", "case.open": "View case",
  "sv.label": "Services", "sv.title": "What the studio delivers",
  "sv.1.t": "Pages that sell", "sv.1.p": "Landing pages, sales pages and websites. I plan the page structure, design it in Figma and build it in Elementor/WordPress, Framer or Wix. I also audit and improve pages that already exist.",
  "sv.2.t": "Launches & campaigns", "sv.2.p": "Opt-in, sales and thank-you pages organized as one funnel, plus feed and stories ad creatives for each phase.",
  "sv.3.t": "Visual identity", "sv.3.p": "Logo, brand guidelines and key visual, unfolded into event collateral, social media and the pages themselves.",
  "ab.label": "About", "ab.title": "Creativity and technology, from first sketch to a live page.",
  "ab.p1": "I'm Gisele Cunha, a digital designer and the founder of Gridly AI Studio. I create visual identities, campaigns and pages, and I also build what I design: from the first sketch in Figma to the published website.",
  "ab.p2": "I like exploring possibilities and looking after the details that make a difference, combining aesthetics and function so every project looks good and works simply, from idea to launch.",
  "ab.s1": "years of experience", "ab.s2": "projects delivered",
  "ct.label": "Contact", "ct.t1": "Have a project in mind?", "ct.t2": "Let's talk.",
  "ct.p": "Tell me what you are building, whether a page, a launch or a brand, and I will reply with next steps.",
  "cur.view": "View case", "mq.1": "Landing pages", "mq.2": "Sales pages", "mq.3": "Visual identity", "mq.4": "Websites", "mq.5": "Launches",
  "ct.cta": "Send an email", "ct.alt": "Also on",
  "ft.r": "All rights reserved",
  "pl.label": "Portfolio", "pl.title": "All projects",
  "pl.lead": "Sales pages, landing pages, websites and visual identity. Open a project to see the full case.",
  "pl.all": "All",
  "cs.back": "All projects", "cs.context": "Context", "cs.client": "Client", "cs.role": "Role", "cs.year": "Year", "cs.tools": "Tools",
  "cs.detail": "The work in detail", "cs.arch": "Page architecture", "cs.full": "Full page", "cs.fullhint": "Scroll inside the frame to browse the whole page.",
  "cs.fullopen": "Open full size", "cs.links": "Links", "cs.bh": "See on Behance", "cs.next": "Next project",
};
for (const [k, v] of Object.entries(CATS)) EN["cat." + k] = v.en;
for (const p of PROJECTS) {
  EN[`p.${p.slug}.sum`] = sum(p).en;
  EN[`p.${p.slug}.intro`] = p.intro.en;
  EN[`p.${p.slug}.role`] = p.service.en;
  if (p.direction) EN[`p.${p.slug}.dir`] = p.direction.en;
  (ARCHITECTURE[p.slug]?.en || []).forEach((s, i) => EN[`p.${p.slug}.arch.${i}`] = s);
}

// ---------- layout ----------
const page = ({ title, titleEn, desc, og, body, cls = "" }) => `<!DOCTYPE html>
<html lang="pt-BR" data-title-pt="${esc(title)}" data-title-en="${esc(titleEn)}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="/assets/${og}.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
<script>document.documentElement.classList.add("js")</script>
</head>
<body class="${cls}">
<a class="skip" href="#main">Pular para o conteúdo</a>
<header class="site-head">
  <div class="wrap head-row">
    <a class="brand" href="/" aria-label="Gridly AI Studio, início">Gridly <span>AI Studio</span></a>
    <nav class="site-nav" id="site-nav" aria-label="Principal">
      <a href="/#projetos" data-i18n="nav.projects">Projetos</a>
      <a href="/#servicos" data-i18n="nav.services">Serviços</a>
      <a href="/#sobre" data-i18n="nav.about">Sobre</a>
      <a href="/#contato" class="nav-contact" data-i18n="nav.contact">Contato</a>
    </nav>
    <div class="head-tools">
      <div class="lang" role="group" aria-label="Idioma / Language">
        <button type="button" data-lang="pt" class="active" aria-pressed="true">PT</button><button type="button" data-lang="en" aria-pressed="false">EN</button>
      </div>
      <button type="button" class="menu-btn" aria-expanded="false" aria-controls="site-nav" data-i18n="nav.menu">Menu</button>
    </div>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-foot">
  <div class="wrap foot-row">
    <span class="brand brand-sm">Gridly <span>AI Studio</span></span>
    <span class="caption">© 2026 Gisele Cunha · <span data-i18n="ft.r">Todos os direitos reservados</span></span>
    <span class="foot-links"><a href="mailto:${EMAIL}">E-mail</a><a href="${BEHANCE}" target="_blank" rel="noopener">Behance</a><a href="${UPWORK}" target="_blank" rel="noopener">Upwork</a></span>
  </div>
</footer>
<script>window.I18N_EN=${JSON.stringify(EN).replace(/</g, "\\u003c")};</script>
<script src="/main.js" defer></script>
</body>
</html>`;

// Caption block (Halcyon logic): category · year / name / short description
const caption = (p, { heading = "h3", link = false } = {}) => `
        <div class="cap">
          <p class="caption"><span data-i18n="cat.${p.cat}">${CATS[p.cat].pt}</span> · ${p.year}</p>
          <${heading} class="pname">${esc(p.title)}</${heading}>
          <p class="pdesc" data-i18n="p.${p.slug}.sum">${esc(sum(p).pt)}</p>${link ? `
          <span class="plink"><span data-i18n="case.open">Ver case</span> ↗</span>` : ""}
        </div>`;

const contactSection = `
<section class="contact" id="contato" aria-labelledby="ct-t">
  <div class="wrap grid">
    <p class="label col-label" data-i18n="ct.label">Contato</p>
    <div class="col-main">
      <h2 class="h-section ct-title" id="ct-t"><span class="ln" data-i18n="ct.t1">Tem um projeto em mente?</span> <span class="ln" data-i18n="ct.t2">Vamos conversar.</span></h2>
      <p class="body measure" data-i18n="ct.p">Me conta o que você está construindo, seja uma página, um lançamento ou uma marca, e eu respondo com os próximos passos.</p>
      <div class="ct-actions">
        <a class="btn" href="mailto:${EMAIL}?subject=Projeto%20com%20a%20Gridly"><span data-i18n="ct.cta">Enviar um e-mail</span> ↗</a>
        <span class="caption ct-alt"><span data-i18n="ct.alt">Também no</span> <a href="${BEHANCE}" target="_blank" rel="noopener">Behance</a> · <a href="${UPWORK}" target="_blank" rel="noopener">Upwork</a></span>
      </div>
      <p class="caption ct-mail">${EMAIL}</p>
    </div>
  </div>
</section>`;

// ---------- HOME ----------
const hcen = BY[HERO.center];
const heroCard = (c, i) => {
  const p = BY[c.slug];
  if (!p) throw new Error("HERO: unknown slug " + c.slug);
  const tall = c.img === "full" && p.full;
  const name = tall ? `p/${p.slug}/full` : thumbName(p);
  return `
    <a class="hc${tall ? " hc-tall" : ""}${c.m ? " hc-m" : ""}" href="/projetos/${p.slug}" style="--x:${c.x}%;--y:${c.y}%;--w:${c.w}vw;--i:${i}" data-depth="${c.d}">
      <span class="hc-in">${img(name, p.title, { eager: i < 5 })}</span>
      <span class="hc-tag caption"><span data-i18n="cat.${p.cat}">${CATS[p.cat].pt}</span> · <b>${esc(p.title)}</b></span>
    </a>`;
};
const MQ = ["mq.1", "mq.2", "mq.3", "mq.4", "mq.5"];
const MQ_PT = { "mq.1": "Landing pages", "mq.2": "Páginas de vendas", "mq.3": "Identidade visual", "mq.4": "Sites institucionais", "mq.5": "Lançamentos" };
const mqSet = MQ.map(k => `<span data-i18n="${k}">${MQ_PT[k]}</span><i>✦</i>`).join("");
const heroHtml = `
<section class="hero" aria-labelledby="hero-t">
  <div class="stage">
    <div class="hero-brand"><h1 class="h-display" id="hero-t">Gridly <span>AI Studio</span></h1></div>
    <a class="hc hc-center" href="/projetos/${hcen.slug}" style="--i:0" data-depth="0.15">
      <span class="hc-in">${img(thumbName(hcen), hcen.title, { eager: true })}</span>
      <span class="hc-tag caption"><span data-i18n="cat.${hcen.cat}">${CATS[hcen.cat].pt}</span> · <b>${esc(hcen.title)}</b></span>
    </a>
    <div class="hero-copy">
      <p class="lead" data-i18n="hero.lead">Estratégia, design e desenvolvimento de páginas para marcas, cursos e lançamentos.</p>
      <a class="btn" href="#projetos"><span data-i18n="hero.cta">Explorar projetos</span> ↗</a>
    </div>${HERO.cards.map((c, i) => heroCard(c, i + 1)).join("")}
  </div>
</section>
<div class="marquee" aria-hidden="true"><div class="mq-track"><span class="mq-set">${mqSet}</span><span class="mq-set">${mqSet}</span></div></div>`;

const featuredHtml = FEATURED.map(({ slug, size, flip }) => {
  const p = BY[slug];
  if (!p) throw new Error("FEATURED: unknown slug " + slug);
  return `
      <a class="work work-${size}${flip ? " work-flip" : ""}" href="/projetos/${p.slug}">
        <figure class="work-img">${img(thumbName(p), p.title)}</figure>${caption(p, { link: true })}
      </a>`;
}).join("");

const homeBody = `${heroHtml}
<section class="selected" id="projetos" aria-labelledby="sel-t">
  <div class="wrap">
    <div class="grid sec-head">
      <p class="label col-label" data-i18n="sel.label">Projetos selecionados</p>
      <h2 class="h-section col-main" id="sel-t" data-i18n="sel.title">Páginas e marcas feitas para serem entendidas e escolhidas.</h2>
    </div>
    <div class="works">${featuredHtml}
    </div>
    <div class="sec-foot"><a class="btn btn-ghost" href="/projetos"><span data-i18n="sel.all">Ver todos os projetos</span> (${PROJECTS.length}) ↗</a></div>
  </div>
</section>

<section class="services" id="servicos" aria-labelledby="sv-t">
  <div class="wrap grid">
    <p class="label col-label" data-i18n="sv.label">Serviços</p>
    <div class="col-main">
      <h2 class="h-section" id="sv-t" data-i18n="sv.title">O que o estúdio entrega</h2>
      <ol class="svc">
        <li><span class="svc-n">01</span><h3 class="h-item" data-i18n="sv.1.t">Páginas que vendem</h3><p class="body" data-i18n="sv.1.p">Landing pages, páginas de vendas e sites institucionais. Planejo a estrutura da página, desenho no Figma e monto em Elementor/WordPress, Framer ou Wix. Também reviso e otimizo páginas que já existem.</p></li>
        <li><span class="svc-n">02</span><h3 class="h-item" data-i18n="sv.2.t">Lançamentos e campanhas</h3><p class="body" data-i18n="sv.2.p">Páginas de captura, vendas e obrigado organizadas como um funil só, com criativos para anúncios no feed e nos stories em cada fase.</p></li>
        <li><span class="svc-n">03</span><h3 class="h-item" data-i18n="sv.3.t">Identidade visual</h3><p class="body" data-i18n="sv.3.p">Logo, manual de marca e key visual, desdobrados em peças de evento, redes sociais e nas próprias páginas.</p></li>
      </ol>
    </div>
  </div>
</section>

<section class="about" id="sobre" aria-labelledby="ab-t">
  <div class="wrap grid">
    <p class="label col-label" data-i18n="ab.label">Sobre</p>
    <div class="about-text">
      <h2 class="h-section" id="ab-t" data-i18n="ab.title">Criatividade e tecnologia, do rascunho à página no ar.</h2>
      <p class="body" data-i18n="ab.p1">Sou Gisele Cunha, designer digital e fundadora da Gridly AI Studio. Crio identidades visuais, campanhas e páginas, e também desenvolvo o que desenho: do primeiro rascunho no Figma ao site publicado.</p>
      <p class="body" data-i18n="ab.p2">Gosto de explorar possibilidades e de cuidar dos detalhes que fazem diferença, unindo estética e funcionalidade para que cada projeto seja bonito de ver e simples de usar, da ideia à execução.</p>
      <dl class="facts">
        <div><dt>4+</dt><dd class="caption" data-i18n="ab.s1">anos de experiência</dd></div>
        <div><dt>200+</dt><dd class="caption" data-i18n="ab.s2">projetos realizados</dd></div>
      </dl>
    </div>
    <figure class="about-photo"><div class="photo" role="img" aria-label="Gisele Cunha"></div><figcaption class="caption">Gisele Cunha</figcaption></figure>
  </div>
</section>
${contactSection}`;

await writeFile("public/index.html", page({
  title: "Gridly AI Studio | Estratégia, design e desenvolvimento de páginas",
  titleEn: "Gridly AI Studio | Strategy, design and development of pages",
  desc: "Estúdio de Gisele Cunha: landing pages, páginas de vendas, sites e identidade visual para marcas, cursos e lançamentos.",
  og: thumbName(hcen), body: homeBody, cls: "home",
}));

// ---------- /projetos ----------
const cats = Object.keys(CATS).filter(k => PROJECTS.some(p => p.cat === k));
const listBody = `
<section class="plist">
  <div class="wrap">
    <div class="grid sec-head sec-head-top">
      <p class="label col-label" data-i18n="pl.label">Portfólio</p>
      <div class="col-main">
        <h1 class="h-section h-page" data-i18n="pl.title">Todos os projetos</h1>
        <p class="body measure" data-i18n="pl.lead">Páginas de vendas, landing pages, sites e identidade visual. Abra um projeto para ver o case completo.</p>
      </div>
    </div>
    <div class="filters" role="group" aria-label="Filtrar por categoria">
      <button type="button" class="chip active" aria-pressed="true" data-filter="all" data-i18n="pl.all">Todos</button>
      ${cats.map(k => `<button type="button" class="chip" aria-pressed="false" data-filter="${k}" data-i18n="cat.${k}">${CATS[k].pt}</button>`).join("\n      ")}
    </div>
    <div class="pgrid">${LIST.map(p => `
      <a class="work work-card" href="/projetos/${p.slug}" data-cat="${p.cat}">
        <figure class="work-img">${img(thumbName(p), p.title)}</figure>${caption(p, { heading: "h2" })}
      </a>`).join("")}
    </div>
  </div>
</section>
${contactSection}`;
await mkdir("public/projetos", { recursive: true });
await writeFile("public/projetos/index.html", page({
  title: "Todos os projetos | Gridly AI Studio", titleEn: "All projects | Gridly AI Studio",
  desc: "Páginas de vendas, landing pages, sites e identidade visual da Gridly AI Studio.", og: "p-agni", body: listBody, cls: "list",
}));

// ---------- /projetos/<slug> (case template) ----------
for (const [idx, p] of LIST.entries()) {
  const nx = LIST[(idx + 1) % LIST.length];
  const dir = `p/${p.slug}/`;
  const arch = ARCHITECTURE[p.slug];
  const gal = p.gallery.map((_, i) => dir + "g" + (i + 1));
  // Rhythm: first two gallery images large, full page, then the rest (pairs when small)
  const galHtml = (list) => list.map(n => {
    const [w, h] = dims[n] || [1400, 1000];
    const small = h / w < 0.3; // thin strips (palette, typography) go in pairs
    return `<figure class="detail${small ? " detail-strip" : ""}">${img(n, p.title)}</figure>`;
  }).join("\n      ");
  const caseBody = `
<article class="case">
  <header class="wrap grid case-open">
    <a class="caption back" href="/projetos">← <span data-i18n="cs.back">Todos os projetos</span></a>
    <p class="caption case-cat"><span data-i18n="cat.${p.cat}">${CATS[p.cat].pt}</span> · ${p.year}</p>
    <h1 class="h-section h-case">${esc(p.title)}</h1>
    <p class="lead measure" data-i18n="p.${p.slug}.sum">${esc(sum(p).pt)}</p>
  </header>
  <figure class="wrap case-cover">${img(coverName(p), p.title, { eager: true })}</figure>

  <section class="wrap grid case-context" aria-labelledby="ctx-t">
    <h2 class="label col-label" id="ctx-t" data-i18n="cs.context">Contexto</h2>
    <div class="ctx-text">
      <p class="body" data-i18n="p.${p.slug}.intro">${esc(p.intro.pt)}</p>
    </div>
    <dl class="ctx-facts">
      <div><dt class="caption" data-i18n="cs.client">Cliente</dt><dd>${esc(p.client)}</dd></div>
      <div><dt class="caption" data-i18n="cs.role">Papel</dt><dd data-i18n="p.${p.slug}.role">${esc(p.service.pt)}</dd></div>
      <div><dt class="caption" data-i18n="cs.year">Ano</dt><dd>${p.year}</dd></div>
      <div><dt class="caption" data-i18n="cs.tools">Ferramentas</dt><dd>${esc(p.tools)}</dd></div>
    </dl>
  </section>
  ${arch ? `
  <section class="wrap grid case-arch" aria-labelledby="arch-t">
    <h2 class="label col-label" id="arch-t" data-i18n="cs.arch">Arquitetura da página</h2>
    <ol class="col-main arch-list">${arch.pt.map((s, i) => `<li data-i18n="p.${p.slug}.arch.${i}">${esc(s)}</li>`).join("")}</ol>
  </section>` : ""}
  ${(p.direction || gal.length || p.full) ? `
  <section class="case-detail" aria-labelledby="det-t">
    <div class="wrap grid">
      <h2 class="label col-label" id="det-t" data-i18n="cs.detail">Trabalho em detalhe</h2>
      ${p.direction ? `<p class="body ctx-text" data-i18n="p.${p.slug}.dir">${esc(p.direction.pt)}</p>` : ""}
    </div>
    <div class="wrap details">
      ${galHtml(gal.slice(0, 2))}
    </div>
    ${p.full ? `
    <div class="wrap grid fullpage">
      <div class="col-label fp-note">
        <p class="label" data-i18n="cs.full">Página inteira</p>
        <p class="caption" data-i18n="cs.fullhint">Role dentro do quadro para percorrer a página completa.</p>
        <a class="caption fp-open" href="/assets/${dir}full.webp" target="_blank" rel="noopener"><span data-i18n="cs.fullopen">Abrir em tamanho real</span> ↗</a>
      </div>
      <div class="fp-frame" tabindex="0" role="region" aria-label="Página completa: ${esc(p.title)}">${img(dir + "full", "Página completa: " + p.title)}</div>
    </div>` : ""}
    ${gal.length > 2 ? `<div class="wrap details">
      ${galHtml(gal.slice(2))}
    </div>` : ""}
  </section>` : ""}

  <section class="wrap grid case-close">
    <div class="col-label">
      <p class="label" data-i18n="cs.links">Links</p>
      ${p.behance ? `<p><a class="caption ext" href="${p.behance}" target="_blank" rel="noopener"><span data-i18n="cs.bh">Ver no Behance</span> ↗</a></p>` : ""}
    </div>
    <a class="next work" href="/projetos/${nx.slug}">
      <p class="label" data-i18n="cs.next">Próximo projeto</p>
      <figure class="work-img">${img(thumbName(nx), nx.title)}</figure>${caption(nx, { heading: "h2" })}
    </a>
  </section>
</article>
${contactSection}`;
  await mkdir(`public/projetos/${p.slug}`, { recursive: true });
  await writeFile(`public/projetos/${p.slug}/index.html`, page({
    title: `${p.title} | Gridly AI Studio`, titleEn: `${p.title} | Gridly AI Studio`,
    desc: sum(p).pt, og: coverName(p), body: caseBody, cls: "case-page",
  }));
}
console.log("pages:", PROJECTS.length + 2);
