// Build: downloads images (Vercel build machines have internet), converts them to WebP,
// and generates the projects pages (/projetos and /projetos/<slug>) from projects.mjs.
import { mkdir, writeFile, copyFile, readFile } from "node:fs/promises";
import sharp from "sharp";
import { PROJECTS, CATS } from "./projects.mjs";

const FIG = "https://www.figma.com/api/mcp/asset/";
const BH = "https://mir-s3-cdn-cf.behance.net/projects/808/";
const MOD = "https://mir-s3-cdn-cf.behance.net/project_modules/";
const LIVE = "https://gridly-ai-studio.vercel.app/assets/";

// [output path (no ext), urls to try, max width]
const assets = [
  ["hero", [FIG + "7b7049c6-ca37-44e4-a1ae-7eb9abbadec6.png"], 2400],
  ["diagnostico", [FIG + "f6a136a7-22f5-4e16-b610-e24afd970bbe.png"], 2400],
  ["lancamentos", [FIG + "cd614fbd-b369-4695-96cb-aebf9b10a1f0.png"], 2400],
  ["cubes", [FIG + "e05ae913-d426-4e53-a501-ac514129f521.png"], 900],
  ["paginas", [FIG + "c17688a9-1217-4327-b28e-de71e730761f.png"], 1200],
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

// ---------- download + convert ----------
const dims = {};
async function fetchOne([name, urls, width]) {
  if (process.env.OFFLINE) { // local test: placeholder images
    const h = name.endsWith("full") ? 6000 : 900; dims[name] = [width, h];
    const path = `public/assets/${name}.webp`; await mkdir(path.slice(0, path.lastIndexOf("/")), { recursive: true });
    await writeFile(path, await sharp({ create: { width: 40, height: 40, channels: 3, background: "#334" } }).webp().toBuffer());
    return true;
  }
  for (const u of [...urls, LIVE + name + ".webp"]) {
    try {
      const res = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      const out = await sharp(buf, { limitInputPixels: false })
        .resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
      const path = `public/assets/${name}.webp`;
      await mkdir(path.slice(0, path.lastIndexOf("/")), { recursive: true });
      await writeFile(path, out.data);
      dims[name] = [out.info.width, out.info.height];
      return true;
    } catch (e) { /* try next */ }
  }
  console.error("FAILED", name);
  return false;
}
await mkdir("public/assets", { recursive: true });
for (const f of ["index.html", "styles.css", "main.js"]) await copyFile(f, "public/" + f);
let failed = 0, i = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (i < assets.length) { const a = assets[i++]; if (!(await fetchOne(a))) failed++; }
}));
console.log("assets:", assets.length - failed, "ok,", failed, "failed");
if (failed) process.exit(1);

// ---------- pages ----------
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const img = (name, alt, cls = "", lazy = true) => {
  const [w, h] = dims[name] || [1400, 1000];
  return `<img src="/assets/${name}.webp" width="${w}" height="${h}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ""}${lazy ? ' loading="lazy" decoding="async"' : ""}>`;
};
const coverName = p => p.cover ? `p/${p.slug}/cover` : p.home;
const UPWORK = "https://www.upwork.com/freelancers/~017cef40f218c12bb2";

function head(titlePt, titleEn, desc, ogImg) {
  return `<!DOCTYPE html>
<html lang="pt-BR" data-title-pt="${esc(titlePt)}" data-title-en="${esc(titleEn)}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titlePt)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(titlePt)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="/assets/${ogImg}.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
</head>
<body class="subpage">
<header class="nav-wrap">
  <nav class="nav">
    <a href="/" class="nav-avatar" aria-label="Gisele Cunha"><span></span></a>
    <a href="${"BACK_HREF"}" class="nav-back">‹ <span data-i18n="BACK_KEY">BACK_LABEL</span></a>
    <a href="/#contato" class="nav-cta" data-i18n="nav.contact">Contato</a>
  </nav>
  <div class="lang" role="group" aria-label="Idioma">
    <button data-lang="en">EN</button><span>·</span><button data-lang="pt" class="active">PT</button>
  </div>
</header>
`;
}
const withBack = (html, href, key, label) =>
  html.replace("BACK_HREF", href).replace("BACK_KEY", key).replace("BACK_LABEL", label);

const footer = (extra = {}) => `
<footer class="footer">
  <div><small>E-MAIL</small><a href="mailto:cunhagiih18@gmail.com">cunhagiih18@gmail.com</a></div>
  <div><small>PORTFÓLIO</small><a href="https://www.behance.net/giseleecunha" target="_blank" rel="noopener">behance.net/giseleecunha</a></div>
  <div><small>UPWORK</small><a href="${UPWORK}" target="_blank" rel="noopener">Gisele C.</a></div>
  <p class="copy">© 2026 Gisele Cunha · Gridly AI Studio · <span data-i18n="ft.r">Todos os direitos reservados</span></p>
</footer>
<script>window.EN_EXTRA=${JSON.stringify(extra).replace(/</g, "\\u003c")};</script>
<script src="/main.js"></script>
</body>
</html>`;

const card = p => `
      <a class="pcard reveal" href="/projetos/${p.slug}" data-cat="${p.cat}">
        <div class="pcard-img">${img(coverName(p), p.title)}</div>
        <span class="pill pcard-tag" data-i18n="cat.${p.cat}">${CATS[p.cat].pt}</span>
        <div class="pcard-info"><b>${esc(p.title)}</b><span>${p.year}</span></div>
      </a>`;

const catDict = Object.fromEntries(Object.entries(CATS).map(([k, v]) => ["cat." + k, v.en]));
const ctaBlock = `
<section class="contact reveal">
  <div class="contact-card contact-slim">
    <h2 class="h2"><span data-i18n="pj.cta1">Bora tirar seu projeto</span> <em class="serif grad-text" data-i18n="pj.cta2">do papel?</em></h2>
    <p class="muted" data-i18n="pj.ctap">Da estratégia à página no ar — eu cuido de cada etapa com você.</p>
    <div class="hero-ctas">
      <a class="btn btn-steel" href="mailto:cunhagiih18@gmail.com?subject=Or%C3%A7amento%20de%20projeto"><span data-i18n="ct.cta1">Solicitar orçamento</span> <i>↗</i></a>
      <a class="btn btn-ghost" href="${UPWORK}" target="_blank" rel="noopener" data-i18n="ct.cta2">Me contratar pelo Upwork</a>
    </div>
  </div>
</section>`;
const ctaDict = {
  "pj.cta1": "Ready to get your project", "pj.cta2": "off the ground?",
  "pj.ctap": "From strategy to a live page — I take care of every step with you.",
  "ct.cta1": "Request a quote", "ct.cta2": "Hire me on Upwork", "ft.r": "All rights reserved", "nav.contact": "Contact",
};

// /projetos
const cats = Object.keys(CATS).filter(k => PROJECTS.some(p => p.cat === k));
let listHtml = withBack(head("Todos os projetos — Gisele Cunha · Gridly AI Studio", "All projects — Gisele Cunha · Gridly AI Studio",
  "Landing pages, páginas de vendas, sites e identidade visual para saúde e educação.", "p-agni"), "/", "nav.home", "Início");
listHtml += `
<main class="plist">
  <p class="eyebrow">Gridly AI Studio · Gisele Cunha</p>
  <h1 class="plist-title"><span data-i18n="pl.t1">Todos os</span> <em class="serif grad-text" data-i18n="pl.t2">projetos</em></h1>
  <p class="muted plist-sub" data-i18n="pl.sub">Da estratégia à página no ar: páginas de vendas, landing pages, sites e identidade visual. Clique num projeto pra ver o case completo.</p>
  <div class="filters" role="tablist">
    <button class="pill active" data-filter="all" data-i18n="pl.all">Todos</button>
    ${cats.map(k => `<button class="pill" data-filter="${k}" data-i18n="cat.${k}">${CATS[k].pt}</button>`).join("\n    ")}
  </div>
  <div class="pgrid">${PROJECTS.map(card).join("")}
  </div>
</main>
${ctaBlock}
${footer({ ...catDict, ...ctaDict, "nav.home": "Home", "pl.t1": "All", "pl.t2": "projects", "pl.all": "All",
  "pl.sub": "From strategy to a live page: sales pages, landing pages, websites and visual identity. Click a project to see the full case." })}`;
await mkdir("public/projetos", { recursive: true });
await writeFile("public/projetos/index.html", listHtml);

// /projetos/<slug>
for (const [idx, p] of PROJECTS.entries()) {
  const more = [1, 2, 3].map(k => PROJECTS[(idx + k) % PROJECTS.length]);
  const dir = `p/${p.slug}/`;
  const en = { ...catDict, ...ctaDict,
    "nav.projects": "Portfolio", "cs.service": "Service", "cs.client": "Client", "cs.year": "Year", "cs.tools": "Tools",
    "cs.about": "About the project", "cs.dir": "Visual direction", "cs.hover": "Hover to scroll the page",
    "cs.tap": "Scroll inside to browse the page", "cs.full": "View full size ↗", "cs.gal": "Details", "cs.more": "More work",
    "cs.bh": "See on Behance ↗", "x.intro": p.intro.en, "x.service": p.service.en };
  if (p.direction) en["x.dir"] = p.direction.en;
  let h = withBack(head(`${p.title} — Gisele Cunha · Gridly AI Studio`, `${p.title} — Gisele Cunha · Gridly AI Studio`,
    p.intro.pt.slice(0, 155), coverName(p)), "/projetos", "nav.projects", "Portfólio");
  h += `
<main class="case">
  <section class="case-head">
    <span class="pill" data-i18n="cat.${p.cat}">${CATS[p.cat].pt}</span>
    <h1>${esc(p.title)}</h1>
    <p class="case-intro" data-i18n="x.intro">${esc(p.intro.pt)}</p>
    <dl class="case-meta">
      <div><dt data-i18n="cs.service">Serviço</dt><dd data-i18n="x.service">${esc(p.service.pt)}</dd></div>
      <div><dt data-i18n="cs.client">Cliente</dt><dd>${esc(p.client)}</dd></div>
      <div><dt data-i18n="cs.year">Ano</dt><dd>${p.year}</dd></div>
      <div><dt data-i18n="cs.tools">Ferramentas</dt><dd>${esc(p.tools)}</dd></div>
    </dl>
  </section>
  <div class="case-cover reveal">${img(coverName(p), p.title, "", false)}</div>
  ${p.direction ? `
  <section class="case-text reveal">
    <span class="pill pill-blue" data-i18n="cs.dir">Direção visual</span>
    <p data-i18n="x.dir">${esc(p.direction.pt)}</p>
  </section>` : ""}
  ${p.full ? `
  <section class="preview-wrap reveal">
    <div class="preview" tabindex="0">
      <span class="preview-hint"><span class="hint-hover" data-i18n="cs.hover">Passe o mouse para percorrer</span><span class="hint-touch" data-i18n="cs.tap">Role aqui dentro pra ver a página</span></span>
      ${img(dir + "full", "Página completa — " + p.title)}
    </div>
    <a class="preview-full" href="/assets/${dir}full.webp" target="_blank" rel="noopener" data-i18n="cs.full">Ver em tamanho real ↗</a>
  </section>` : ""}
  ${p.gallery.length ? `
  <section class="case-gallery">
    ${p.gallery.map((_, i) => `<figure class="reveal">${img(dir + "g" + (i + 1), p.title)}</figure>`).join("\n    ")}
  </section>` : ""}
  ${p.behance ? `<div class="center case-bh"><a class="btn btn-dark" href="${p.behance}" target="_blank" rel="noopener" data-i18n="cs.bh">Ver no Behance ↗</a></div>` : ""}
  <section class="more">
    <h2 class="h2"><span data-i18n="cs.more">Mais trabalhos</span></h2>
    <div class="pgrid pgrid-3">${more.map(card).join("")}
    </div>
  </section>
</main>
${ctaBlock}
${footer(en)}`;
  await mkdir(`public/projetos/${p.slug}`, { recursive: true });
  await writeFile(`public/projetos/${p.slug}/index.html`, h);
}
console.log("pages:", PROJECTS.length + 1);
