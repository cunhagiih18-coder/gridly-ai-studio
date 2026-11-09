// --- i18n -----------------------------------------------------------
const EN = {
  "nav.home":"Home","nav.projects":"Projects","nav.services":"Services","nav.about":"About","nav.contact":"Contact",
  "hero.hello":"Hi, I'm","hero.t1":"Conversion","hero.t2":"Architecture",
  "hero.sub":"Landing pages, sales pages and visual identity for health professionals, educators and course creators who want to sell with strategy.",
  "hero.cta1":"See projects","hero.cta2":"Get a quote",
  "st.pre":"Every project here combines","st.a":"strategy","st.b":"design","st.c":"conversion",
  "st.post":"to solve a real problem: turning an audience into sales.",
  "tag.identity":"Visual Identity","tag.event":"Event","tag.sales":"Sales Page","tag.launch":"Launch","tag.inst":"Website",
  "p.cbef":"CBEF — Medical Congress Identity","p.bio":"Post-Grad in Clinical Biomechanics","p.pod":"Post-Grad in Clinical Podiatry",
  "p.llu":"Dr. Llubiana Arantes — Neuroscience","p.cri":"Dr. Cristianne Fabris — Urology","p.sca":"Leandro Scarpa — Physiotherapy",
  "p.con":"Contima — Accounting Firm","p.agn":"Agni — Self-Discovery Journey",
  "proj.all":"See all projects",
  "diag.t":"Conversion Audit","diag.p":"I review your pages and pinpoint what may be <b>holding back your sales.</b>","diag.cta":"Request an audit",
  "sv.t1":"What I can","sv.t2":"solve for you","sv.p":"I combine conversion strategy and design to build pages and brands that sell — not just look good.",
  "sv.a.t":"Landing pages & sales pages","sv.a.1":"Page strategy and architecture, section by section","sv.a.2":"Design in Figma, truly responsive","sv.a.3":"Build in Elementor/WordPress, Framer or Wix","sv.a.4":"Audit and optimization of existing pages",
  "sv.b.t":"Launch strategy","sv.b.1":"Opt-in, sales and thank-you pages","sv.b.2":"Organized funnels for events and campaigns","sv.b.3":"Feed and stories ad creatives",
  "sv.c.t":"Visual identity & social","sv.c.1":"Logo, brand guidelines and key visual","sv.c.2":"Event collateral: badges, kits, signage","sv.c.3":"Carousels and social media templates",
  "la.t":"Launch Strategy","la.p":"Pages and funnels strategically organized for experts who want to launch with more predictability.","la.cta":"Apply for a project",
  "ab.t1":"Hi, I'm",
  "ab.p1":"Designer and digital strategist based in Brazil. I started out designing landing pages and today I help health and education professionals who already have an audience but don't yet have a digital structure that sells.",
  "ab.p2":"I don't just do web design: I plan the architecture of every page — what visitors need to see, and in what order, before they decide.",
  "ab.s1":"years of experience","ab.s2":"published projects","ab.s3b":"Health","ab.s3":"& education niche",
  "ct.t":"Let's work together","ct.p":"Whether you're building your online course, preparing a launch or need a page that converts, tell me about your idea.",
  "ct.cta1":"Request a quote","ct.cta2":"Hire me on Upwork",
  "fq.t1":"Frequently asked","fq.t2":"questions",
  "fq.q1":"What services do you offer?","fq.a1":"Landing pages, sales pages, websites, visual identity, event collateral and social media creatives — from strategy to a live page.",
  "fq.q2":"How does the process work?","fq.a2":"It starts with a brief to understand your goal and audience. Then comes the page architecture, design in Figma, revisions and the build. You follow every step.",
  "fq.q3":"How long does a project take?","fq.a3":"It depends on the scope. A landing page usually takes 1–2 weeks; brand + page, 3–5 weeks.",
  "fq.q4":"Which platforms do you build on?","fq.a4":"Elementor/WordPress, Framer and Wix. The design is always done in Figma first.",
  "fq.q5":"Do you work with clients outside Brazil?","fq.a5":"Yes! I work remotely and serve international clients through Upwork or directly, communicating by message.",
  "ft.r":"All rights reserved"
};
Object.assign(EN, window.EN_EXTRA || {});
const PT = {};
document.querySelectorAll("[data-i18n]").forEach(el => PT[el.dataset.i18n] = el.textContent);
document.querySelectorAll("[data-i18n-html]").forEach(el => PT[el.dataset.i18nHtml] = el.innerHTML);

function setLang(lang){
  const dict = lang === "en" ? EN : PT;
  document.querySelectorAll("[data-i18n]").forEach(el => { const v = dict[el.dataset.i18n]; if (v) el.textContent = v; });
  document.querySelectorAll("[data-i18n-html]").forEach(el => { const v = dict[el.dataset.i18nHtml]; if (v) el.innerHTML = v; });
  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  const ds = document.documentElement.dataset;
  document.title = lang === "en" ? (ds.titleEn || "Gisele Cunha · Gridly AI Studio — Conversion Architecture") : (ds.titlePt || "Gisele Cunha · Gridly AI Studio — Arquitetura de Conversão");
  document.querySelectorAll(".lang button").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  try { localStorage.setItem("lang", lang); } catch (e) {}
}
document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
let saved = null;
try { saved = localStorage.getItem("lang"); } catch (e) {}
const urlLang = new URLSearchParams(location.search).get("lang");
const initial = urlLang || saved || ((navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en");
if (initial === "en") setLang("en");

// --- carousel -------------------------------------------------------
const car = document.getElementById("carousel");
if (car) {
  const step = () => (car.querySelector(".card")?.offsetWidth || 360) + 18;
  document.querySelector(".car-btn.prev").addEventListener("click", () => car.scrollBy({ left: -step(), behavior: "smooth" }));
  document.querySelector(".car-btn.next").addEventListener("click", () => car.scrollBy({ left: step(), behavior: "smooth" }));
}

// --- project filters ------------------------------------------------
document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".filters button").forEach(x => x.classList.toggle("active", x === b));
  const f = b.dataset.filter;
  document.querySelectorAll(".plist .pcard").forEach(c => { c.hidden = f !== "all" && c.dataset.cat !== f; });
}));

// --- full-page preview: hover to scroll ------------------------------
const canHover = window.matchMedia("(hover: hover)").matches;
document.querySelectorAll(".preview").forEach(pv => {
  const im = pv.querySelector("img");
  if (!canHover) return;
  const go = down => {
    const dist = Math.max(0, im.offsetHeight - pv.clientHeight);
    im.style.transitionDuration = (down ? Math.max(2, dist / 450) : Math.max(1, dist / 2500)) + "s";
    im.style.transform = down ? `translateY(-${dist}px)` : "translateY(0)";
  };
  pv.addEventListener("mouseenter", () => go(true));
  pv.addEventListener("mouseleave", () => go(false));
  pv.addEventListener("focus", () => go(true));
  pv.addEventListener("blur", () => go(false));
});

// --- reveal on scroll ------------------------------------------------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
