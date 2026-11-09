// --- i18n (PT is in the HTML; EN comes from window.I18N_EN) ---------
const EN = window.I18N_EN || {};
const PT = { "cur.view": "Ver case" };
document.querySelectorAll("[data-i18n]").forEach(el => { PT[el.dataset.i18n] = el.textContent; });
let LANG = "pt";
const t = k => (LANG === "en" ? EN : PT)[k] || PT[k] || "";

function setLang(lang) {
  LANG = lang === "en" ? "en" : "pt";
  const dict = LANG === "en" ? EN : PT;
  const touched = new Set();
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = dict[el.dataset.i18n];
    if (v != null && el.textContent !== v) {
      el.textContent = v;
      const root = el.closest(".split");
      if (root) touched.add(root);
    }
  });
  touched.forEach(r => splitWords(r));
  const root = document.documentElement;
  root.lang = LANG === "en" ? "en" : "pt-BR";
  document.title = LANG === "en" ? root.dataset.titleEn : root.dataset.titlePt;
  document.querySelectorAll(".lang button").forEach(b => {
    const on = b.dataset.lang === LANG;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", on);
  });
  if (cursorLabel) cursorLabel.textContent = t("cur.view");
  try { localStorage.setItem("lang", LANG); } catch (e) {}
}

// --- motion setup ----------------------------------------------------
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const motion = !reduce && "IntersectionObserver" in window;
if (motion) document.documentElement.classList.add("motion");

// split a heading into words that slide up (keeps nested elements/i18n spans)
function splitWords(root) {
  let i = 0;
  const walk = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const parts = n.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach(p => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
          const w = document.createElement("span"); w.className = "w";
          const inner = document.createElement("span"); inner.textContent = p; inner.style.setProperty("--wi", i++);
          w.appendChild(inner); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && !n.classList.contains("w")) walk(n);
    });
  };
  walk(root);
}

// --- language init -----------------------------------------------------
let cursorLabel = null;
document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
let saved = null;
try { saved = localStorage.getItem("lang"); } catch (e) {}
const urlLang = new URLSearchParams(location.search).get("lang");
const initial = urlLang || saved || ((navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en");

// --- reveal on scroll ---------------------------------------------------
if (motion) {
  document.querySelectorAll(".h-section, .h-case, .h-page").forEach(el => { el.classList.add("split"); splitWords(el); });
  document.querySelectorAll(".sec-head .label, .lead:not(.hero-copy .lead), .body, .cap, .svc li, .facts, .ct-actions, .ct-mail, .filters, .case-cat, .back, .ctx-facts, .fp-note, .case-close .col-label, .next > .label, .about-photo figcaption")
    .forEach(el => el.classList.add("fu"));
  document.querySelectorAll(".work-img, .detail, .case-cover, .about-photo .photo, .fp-frame").forEach(el => el.classList.add("ir"));

  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("in");
    if (el.classList.contains("ir")) setTimeout(() => el.classList.add("done"), 1500);
    if (el.classList.contains("facts")) countUp(el);
    io.unobserve(el);
  }), { rootMargin: "0px 0px -10% 0px", threshold: 0.01 });
  document.querySelectorAll(".split, .fu, .ir").forEach(el => io.observe(el));
}
setLang(initial);

// count 0 → N for "4+", "20+"
function countUp(box) {
  box.querySelectorAll("dt").forEach(dt => {
    const m = dt.textContent.match(/^(\d+)(.*)$/);
    if (!m) return;
    const end = +m[1], suf = m[2], t0 = performance.now(), dur = 1400;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      dt.textContent = Math.round(end * e) + suf;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// --- scroll-driven: header, hero wall, image parallax -------------------
const stage = document.querySelector(".stage");
const cards = stage ? [...stage.querySelectorAll(".hc")].map(el => ({ el: el.querySelector(".hc-in"), d: +el.dataset.depth || 0.3 })) : [];
const pars = motion ? [...document.querySelectorAll(".ir")].filter(el => !el.classList.contains("fp-frame")) : [];
let mx = 0, my = 0, cx = 0, cy = 0, lastY = window.scrollY, ticking = false;
const desktopWall = () => window.innerWidth > 760;

function frame() {
  ticking = false;
  const y = window.scrollY, vh = window.innerHeight;
  // header hides on the way down, comes back on the way up
  const menuOpen = document.body.classList.contains("menu-open");
  document.body.classList.toggle("head-hidden", !menuOpen && y > 160 && y > lastY + 2);
  if (y < lastY - 2 || y < 160) document.body.classList.remove("head-hidden");
  lastY = y;
  if (!motion) return;
  // hero wall: mouse + scroll parallax, fade as it leaves
  if (stage && desktopWall()) {
    cx += (mx - cx) * 0.08; cy += (my - cy) * 0.08;
    const p = Math.min(1, y / vh);
    stage.style.setProperty("--fade", p.toFixed(3));
    cards.forEach(c => {
      const tx = cx * c.d * 34, ty = cy * c.d * 26 - y * c.d * 0.45;
      c.el.style.transform = `translate3d(${tx.toFixed(1)}px,${ty.toFixed(1)}px,0)`;
    });
    if (Math.abs(mx - cx) > 0.001 || Math.abs(my - cy) > 0.001) request();
  }
  // images drift inside their frames
  pars.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) return;
    const k = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1
    const img = el.querySelector("img");
    if (img) img.style.setProperty("--py", (k * -3.2).toFixed(2) + "%");
  });
}
function request() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
window.addEventListener("scroll", request, { passive: true });
window.addEventListener("resize", request);
if (motion && fine && stage) {
  window.addEventListener("mousemove", e => {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
    request();
  }, { passive: true });
}
request();

// --- cursor bubble on projects (mouse only) ---------------------------
if (motion && fine) {
  const cur = document.createElement("div");
  cur.className = "cursor"; cur.setAttribute("aria-hidden", "true");
  cursorLabel = document.createElement("span"); cursorLabel.textContent = t("cur.view");
  cur.appendChild(cursorLabel); document.body.appendChild(cur);
  let px = -200, py = -200, qx = -200, qy = -200, running = false;
  const loop = () => {
    qx += (px - qx) * 0.2; qy += (py - qy) * 0.2;
    cur.style.transform = `translate3d(${qx.toFixed(1)}px,${qy.toFixed(1)}px,0)`;
    if (Math.abs(px - qx) > 0.3 || Math.abs(py - qy) > 0.3) requestAnimationFrame(loop); else running = false;
  };
  window.addEventListener("mousemove", e => {
    px = e.clientX; py = e.clientY;
    if (!running) { running = true; requestAnimationFrame(loop); }
  }, { passive: true });
  document.querySelectorAll(".work, .hc").forEach(a => {
    a.addEventListener("mouseenter", () => cur.classList.add("on"));
    a.addEventListener("mouseleave", () => cur.classList.remove("on"));
  });
  // buttons lean toward the pointer
  document.querySelectorAll(".btn").forEach(b => {
    b.addEventListener("mousemove", e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 10}px,${((e.clientY - r.top) / r.height - 0.5) * 8}px)`;
    });
    b.addEventListener("mouseleave", () => { b.style.transform = ""; });
  });
}

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
  document.querySelectorAll(".pgrid .work-card").forEach(c => {
    const show = f === "all" || c.dataset.cat === f;
    c.hidden = !show;
    if (show && motion) { c.querySelectorAll(".fu, .ir").forEach(x => x.classList.add("in")); }
  });
}));
