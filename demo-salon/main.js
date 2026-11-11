/* Renders the page from window.SITE_CONFIG. You normally never edit this file. */
(function () {
  "use strict";
  var C = window.SITE_CONFIG;
  if (!C) { console.error("config.js missing"); return; }

  var lang = "fr";
  try { lang = localStorage.getItem("salon-lang") || "fr"; } catch (e) {}
  if (lang !== "fr" && lang !== "en") lang = "fr";
  var picks = [];               // chosen treatments, as "category:item" keys
  try { picks = JSON.parse(sessionStorage.getItem("salon-picks") || "[]"); } catch (e) { picks = []; }
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  function get(path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, C); }
  function t(v) {
    if (v == null) return "";
    if (typeof v === "object" && ("fr" in v || "en" in v)) return v[lang] || v.fr || "";
    return String(v);
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  // French typography: narrow no-break space before ! ? ; :
  function fr(s) { return lang === "fr" ? s.replace(/ ([!?;:»])/g, " $1") : s; }
  function colon() { return lang === "fr" ? " : " : ": "; }
  function plain(s) { return s.replace(/\*/g, ""); }
  function price(n) {
    var s = Number(n).toLocaleString(lang === "fr" ? "fr-BE" : "en-GB", { minimumFractionDigits: n % 1 ? 2 : 0 });
    return lang === "fr" ? s + " " + C.currency : C.currency + s;
  }
  function duration(m) {
    if (m < 60) return m + " " + t(C.ui.minutes);
    var h = Math.floor(m / 60), r = m % 60;
    if (!r) return h + " h";
    return lang === "fr" ? h + " h " + String(r).padStart(2, "0") : h + " h " + r + " " + t(C.ui.minutes);
  }
  function bg(node, src, position) {
    if (src) node.style.backgroundImage = "url('" + src + "')";
    if (position) node.style.backgroundPosition = position;
  }
  function item(key) {
    var p = key.split(":"), cat = C.services.categories[+p[0]];
    return cat && cat.items[+p[1]];
  }
  var todayIdx = (new Date().getDay() + 6) % 7; // Monday = 0

  /* ---------- theme (runs once) ---------- */
  (function applyTheme() {
    var th = C.theme, r = document.documentElement.style;
    var map = { background: "--bg", surface: "--surface", accent: "--accent", text: "--ink", muted: "--muted", font: "--font" };
    Object.keys(map).forEach(function (k) { if (th[k]) r.setProperty(map[k], th[k]); });
    if (th.fontUrl && !document.querySelector('link[href="' + th.fontUrl + '"]')) {
      var l = document.createElement("link"); l.rel = "stylesheet"; l.href = th.fontUrl; document.head.appendChild(l);
    }
  })();

  /* ---------- hero photo(s): slow crossfade when there are several ---------- */
  (function hero() {
    var box = document.getElementById("heroMedia");
    var slides = (C.hero.slides && C.hero.slides.length ? C.hero.slides : [C.hero.image]).filter(Boolean);
    slides.forEach(function (src, i) {
      var s = el("div", "hero__slide" + (i === 0 ? " is-on" : ""));
      bg(s, src);
      box.appendChild(s);
    });
    box.setAttribute("role", "img");
    box.removeAttribute("aria-hidden");
    if (slides.length < 2 || reduce) return;
    var i = 0, nodes = box.children;
    setInterval(function () {
      if (document.hidden) return;
      nodes[i].classList.remove("is-on");
      i = (i + 1) % nodes.length;
      nodes[i].classList.add("is-on");
    }, 6500);
  })();

  /* ---------- services: one card per category ---------- */
  function renderCards() {
    var ul = document.getElementById("cards"); ul.innerHTML = "";
    C.services.categories.forEach(function (cat, ci) {
      var li = el("li", "card rise");
      li.style.setProperty("--d", (ci * 0.08) + "s");
      var h = el("h3", "card__title", t(cat.name));
      li.appendChild(h);
      li.appendChild(el("p", "card__count", cat.items.length + (lang === "fr" ? " soins" : " treatments")));
      var list = el("ul", "card__list");
      cat.items.forEach(function (it, ii) {
        var key = ci + ":" + ii, on = picks.indexOf(key) > -1;
        var row = el("li");
        var b = el("button", "svc" + (on ? " is-on" : ""));
        b.type = "button";
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.dataset.key = key;
        var main = el("span", "svc__main");
        main.appendChild(el("span", "svc__name", t(it.name)));
        var meta = [it.duration ? duration(it.duration) : "", t(it.desc)].filter(Boolean).join(" · ");
        if (meta) main.appendChild(el("span", "svc__meta", meta));
        b.appendChild(main);
        var pr = el("span", "svc__price", (it.from ? t(C.ui.from) + " " : "") + price(it.price));
        b.appendChild(pr);
        var mark = el("span", "svc__mark");
        mark.setAttribute("aria-hidden", "true");
        b.appendChild(mark);
        b.appendChild(el("span", "sr", on ? t(C.ui.added) : t(C.ui.add)));
        b.addEventListener("click", function () { toggle(key); });
        row.appendChild(b);
        list.appendChild(row);
      });
      li.appendChild(list);
      ul.appendChild(li);
    });
  }

  function toggle(key) {
    var i = picks.indexOf(key);
    if (i > -1) picks.splice(i, 1); else picks.push(key);
    try { sessionStorage.setItem("salon-picks", JSON.stringify(picks)); } catch (e) {}
    document.querySelectorAll(".svc[data-key]").forEach(function (b) {
      var on = picks.indexOf(b.dataset.key) > -1;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.querySelector(".sr").textContent = on ? t(C.ui.added) : t(C.ui.add);
    });
    renderPicks();
  }

  function totals() {
    var mins = 0, sum = 0, from = false;
    picks.forEach(function (k) { var it = item(k); if (!it) return; mins += it.duration || 0; sum += it.price; from = from || !!it.from; });
    return { mins: mins, sum: sum, from: from };
  }

  function renderPicks() {
    var tot = totals(), n = picks.length;
    var summary = n
      ? n + (lang === "fr" ? (n > 1 ? " soins" : " soin") : (n > 1 ? " treatments" : " treatment")) + " · " + duration(tot.mins) + " · " + (tot.from ? t(C.ui.from) + " " : "") + price(tot.sum)
      : t(C.ui.pickedNone);
    document.getElementById("pickbarText").textContent = n ? t(C.ui.picked) + colon() + summary : summary;
    document.getElementById("pickbar").classList.toggle("has-picks", n > 0);

    var ul = document.getElementById("pickedList"); ul.innerHTML = "";
    picks.forEach(function (k) {
      var it = item(k); if (!it) return;
      var li = el("li");
      li.appendChild(el("span", null, t(it.name)));
      li.appendChild(el("span", null, (it.from ? t(C.ui.from) + " " : "") + price(it.price)));
      ul.appendChild(li);
    });
    if (!n) ul.appendChild(el("li", "picked__none", t(C.ui.pickedNone)));
    document.getElementById("pickedTotal").textContent = n ? t(C.ui.total) + colon() + duration(tot.mins) + " · " + (tot.from ? t(C.ui.from) + " " : "") + price(tot.sum) : "";
    document.getElementById("clearPicks").hidden = !n;
    document.querySelectorAll("[data-count]").forEach(function (c) { c.hidden = !n; c.textContent = n; });

    var url = bookingUrl();
    document.querySelectorAll(".js-book").forEach(function (a) { a.href = url; });
  }

  function bookingUrl() {
    var msg;
    if (picks.length && C.contact.whatsappMessageWith) {
      var names = picks.map(function (k) { var it = item(k); return it ? t(it.name) : ""; }).filter(Boolean).join(", ");
      msg = t(C.contact.whatsappMessageWith).replace("{list}", names);
    } else {
      msg = t(C.contact.whatsappMessage);
    }
    return "https://wa.me/" + C.contact.whatsapp + "?text=" + encodeURIComponent(msg);
  }

  /* ---------- gallery mosaic ---------- */
  function renderMosaic() {
    var box = document.getElementById("mosaic");
    pics = [];
    box.querySelectorAll(".mosaic__pic").forEach(function (n) { n.remove(); });
    (C.gallery.items || []).slice(0, 6).forEach(function (g, i) {
      var f = el("figure", "mosaic__pic mosaic__pic--" + (i + 1));
      f.dataset.rate = [0.06, -0.08, 0.1, -0.05, 0.07, -0.09][i];
      var img = el("img");
      img.src = g.src; img.alt = t(g.alt) || t(g.caption); img.loading = "lazy"; img.decoding = "async";
      img.width = 400; img.height = 500;
      if (g.position) img.style.objectPosition = g.position;
      f.appendChild(img);
      box.appendChild(f);
    });
  }

  /* ---------- team ---------- */
  function renderTeam() {
    var ul = document.getElementById("people"); ul.innerHTML = "";
    C.team.members.forEach(function (m, i) {
      var li = el("li", "person rise");
      li.style.setProperty("--d", (i * 0.08) + "s");
      var img = el("img", "person__photo");
      img.src = m.photo; img.alt = m.name + " — " + t(m.role); img.loading = "lazy"; img.width = 480; img.height = 480;
      if (m.position) img.style.objectPosition = m.position;
      li.appendChild(img);
      li.appendChild(el("h3", "person__name", m.name));
      li.appendChild(el("p", "person__role", t(m.role)));
      if (m.bio) li.appendChild(el("p", "person__bio", t(m.bio)));
      ul.appendChild(li);
    });
  }

  /* ---------- hours ---------- */
  function renderHours() {
    var ul = document.getElementById("hoursList"); ul.innerHTML = "";
    C.hours.days.forEach(function (d, i) {
      var li = el("li", (i === todayIdx ? "is-today" : "") + (d.hours ? "" : " is-closed"));
      li.appendChild(el("span", null, t(d.day) + (i === todayIdx ? " (" + t(C.ui.today).toLowerCase() + ")" : "")));
      li.appendChild(el("span", null, d.hours || t(C.hours.closedLabel)));
      ul.appendChild(li);
    });
    var today = C.hours.days[todayIdx];
    document.getElementById("heroToday").textContent = t(C.ui.today) + " " + (today && today.hours ? today.hours : t(C.hours.closedLabel).toLowerCase());
  }

  function renderSteps() {
    var ol = document.getElementById("steps"); ol.innerHTML = "";
    C.booking.steps.forEach(function (s) { ol.appendChild(el("li", null, fr(t(s)))); });
  }

  /* ---------- full render ---------- */
  function render() {
    document.documentElement.lang = lang;
    document.title = C.business.name + " — " + C.business.city;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = t(C.business.tagline);

    document.querySelectorAll("[data-t]").forEach(function (n) { n.textContent = plain(fr(t(get(n.getAttribute("data-t"))))); });
    document.querySelectorAll("[data-bind]").forEach(function (n) { n.textContent = t(get(n.getAttribute("data-bind"))); });

    document.getElementById("heroMedia").setAttribute("aria-label", t(C.hero.imageAlt));
    var vp = document.getElementById("visitPhoto");
    bg(vp, C.contactSection.image || C.hero.image);
    vp.setAttribute("role", "img");
    vp.setAttribute("aria-label", t(C.contactSection.imageAlt) || C.business.name);

    document.getElementById("mapLink").href = C.contact.mapLink;
    var phone = document.getElementById("phoneLink");
    phone.textContent = C.contact.phoneDisplay;
    phone.href = "tel:" + C.contact.phoneDisplay.replace(/[^\d+]/g, "");
    var mail = document.getElementById("emailLink");
    mail.textContent = C.contact.email;
    mail.href = "mailto:" + C.contact.email;

    var toggleBtn = document.getElementById("langToggle");
    toggleBtn.textContent = lang === "fr" ? "EN" : "FR";
    toggleBtn.setAttribute("aria-label", lang === "fr" ? "Switch to English" : "Passer en français");
    document.querySelector(".skip").textContent = lang === "fr" ? "Aller au contenu" : "Skip to content";
    document.getElementById("prevCard").setAttribute("aria-label", t(C.ui.prev));
    document.getElementById("nextCard").setAttribute("aria-label", t(C.ui.next));
    document.getElementById("cards").setAttribute("aria-label", plain(t(C.services.title)));

    renderCards(); renderMosaic(); renderTeam(); renderHours(); renderSteps(); renderPicks();
    observe();
  }

  /* ---------- entrances (content stays visible if this never runs) ---------- */
  var io = "IntersectionObserver" in window && !reduce ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }) : null;
  function observe() {
    document.querySelectorAll(".rise:not(.is-in)").forEach(function (n) { if (io) io.observe(n); else n.classList.add("is-in"); });
  }
  if (io) document.documentElement.classList.add("motion");

  render();
  document.getElementById("year").textContent = new Date().getFullYear();

  document.getElementById("langToggle").addEventListener("click", function () {
    lang = lang === "fr" ? "en" : "fr";
    try { localStorage.setItem("salon-lang", lang); } catch (e) {}
    render();
    document.querySelectorAll(".rise").forEach(function (n) { n.classList.add("is-in"); });
  });
  document.getElementById("clearPicks").addEventListener("click", function () {
    picks = [];
    try { sessionStorage.removeItem("salon-picks"); } catch (e) {}
    document.querySelectorAll(".svc.is-on").forEach(function (b) { b.classList.remove("is-on"); b.setAttribute("aria-pressed", "false"); b.querySelector(".sr").textContent = t(C.ui.add); });
    renderPicks();
  });

  /* ---------- card row: previous / next ---------- */
  var row = document.getElementById("cards");
  function step(dir) {
    var card = row.querySelector(".card");
    var w = card ? card.getBoundingClientRect().width + 16 : 320;
    row.scrollBy({ left: dir * w, behavior: reduce ? "auto" : "smooth" });
  }
  document.getElementById("prevCard").addEventListener("click", function () { step(-1); });
  document.getElementById("nextCard").addEventListener("click", function () { step(1); });
  function edges() {
    document.getElementById("prevCard").disabled = row.scrollLeft < 4;
    document.getElementById("nextCard").disabled = row.scrollLeft + row.clientWidth > row.scrollWidth - 4;
  }
  row.addEventListener("scroll", edges, { passive: true });
  window.addEventListener("resize", edges);
  edges();

  /* ---------- top bar: on the photo, then solid ---------- */
  var bar = document.getElementById("bar"), heroEl = document.querySelector(".hero");
  var fab = document.querySelector(".fab");
  function onScroll() {
    bar.classList.toggle("is-solid", window.scrollY > 24);
    fab.classList.toggle("is-hidden", window.scrollY < heroEl.offsetHeight * 0.6);
    drift();
  }

  /* ---------- gallery drift (scroll-linked) ---------- */
  var pics = [], mosaic = document.getElementById("mosaic");
  function drift() {
    if (reduce) return;
    if (!pics.length) pics = Array.prototype.slice.call(mosaic.querySelectorAll(".mosaic__pic"));
    var r = mosaic.getBoundingClientRect(), vh = window.innerHeight;
    if (r.bottom < 0 || r.top > vh) return;
    var p = (vh - r.top) / (vh + r.height) - 0.5;   // -0.5 … 0.5 while in view
    pics.forEach(function (f) { f.style.transform = "translate3d(0," + (p * parseFloat(f.dataset.rate) * 600).toFixed(1) + "px,0)"; });
  }
  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById("menuBtn"), nav = document.getElementById("barNav");
  function setMenu(open) {
    bar.classList.toggle("is-open", open);
    document.documentElement.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuLabel();
    if (open) { var first = nav.querySelector("a"); if (first) first.focus(); }
  }
  function menuLabel() {
    var open = bar.classList.contains("is-open");
    document.getElementById("menuLabel").textContent = open ? (lang === "fr" ? "Fermer le menu" : "Close menu") : (lang === "fr" ? "Ouvrir le menu" : "Open menu");
  }
  menuBtn.addEventListener("click", function () { setMenu(!bar.classList.contains("is-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && bar.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); }
  });
  window.matchMedia("(min-width: 760px)").addEventListener("change", function (m) { if (m.matches) setMenu(false); });
  document.getElementById("langToggle").addEventListener("click", menuLabel);
  menuLabel();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { pics = []; onScroll(); });
  onScroll();
})();
