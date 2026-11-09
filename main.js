// --- i18n (PT is in the HTML; EN comes from window.I18N_EN) ---------
const EN = window.I18N_EN || {};
const PT = {};
document.querySelectorAll("[data-i18n]").forEach(el => { PT[el.dataset.i18n] = el.textContent; });

function setLang(lang) {
  const dict = lang === "en" ? EN : PT;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = dict[el.dataset.i18n];
    if (v != null) el.textContent = v;
  });
  const root = document.documentElement;
  root.lang = lang === "en" ? "en" : "pt-BR";
  document.title = lang === "en" ? root.dataset.titleEn : root.dataset.titlePt;
  document.querySelectorAll(".lang button").forEach(b => {
    const on = b.dataset.lang === lang;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", on);
  });
  try { localStorage.setItem("lang", lang); } catch (e) {}
}
document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
let saved = null;
try { saved = localStorage.getItem("lang"); } catch (e) {}
const urlLang = new URLSearchParams(location.search).get("lang");
const initial = urlLang || saved || ((navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en");
if (initial === "en") setLang("en");

// --- mobile menu ----------------------------------------------------
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("site-nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") !== "true";
    menuBtn.setAttribute("aria-expanded", open);
    document.body.classList.toggle("menu-open", open);
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }));
}

// --- project filters ------------------------------------------------
const chips = document.querySelectorAll(".filters .chip");
chips.forEach(b => b.addEventListener("click", () => {
  chips.forEach(x => { const on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-pressed", on); });
  const f = b.dataset.filter;
  document.querySelectorAll(".pgrid .work-card").forEach(c => { c.hidden = f !== "all" && c.dataset.cat !== f; });
}));

// --- subtle reveal (content is visible without JS / with reduced motion)
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce && "IntersectionObserver" in window) {
  const items = document.querySelectorAll(".work, .detail, .svc li, .fp-frame");
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  items.forEach(el => { el.classList.add("rv"); io.observe(el); });
}
