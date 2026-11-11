/* Renders the page from window.SITE_CONFIG. You normally never edit this file. */
(function () {
  "use strict";
  var C = window.SITE_CONFIG;
  if (!C) { console.error("config.js missing"); return; }

  var STORE_KEY = "site-lang";
  var lang = "fr";
  try { lang = localStorage.getItem(STORE_KEY) || "fr"; } catch (e) {}
  if (lang !== "fr" && lang !== "en") lang = "fr";

  /* ---------- helpers ---------- */
  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, C);
  }
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
  // Fills a node with text, turning *words* into <em>words</em> (no raw HTML).
  function rich(node, text) {
    node.textContent = "";
    text.split("*").forEach(function (part, i) {
      if (!part) return;
      node.appendChild(i % 2 ? el("em", null, part) : document.createTextNode(part));
    });
  }
  // French typography: non-breaking space before ! ? ; :
  function fr(s) { return lang === "fr" ? s.replace(/ ([!?;:»])/g, " $1").replace(/« /g, "« ") : s; }
  function price(n) {
    var s = Number(n).toLocaleString(lang === "fr" ? "fr-FR" : "en-GB", { minimumFractionDigits: n % 1 ? 2 : 0 });
    return lang === "fr" ? s + " " + C.currency : C.currency + s;
  }
  var todayIdx = (new Date().getDay() + 6) % 7; // Monday = 0

  /* ---------- theme (runs once) ---------- */
  function applyTheme() {
    var th = C.theme, r = document.documentElement.style;
    var map = { primary: "--primary", accent: "--accent", background: "--bg", surface: "--surface", dark: "--dark", text: "--text", muted: "--muted", fontHeading: "--font-heading", fontBody: "--font-body" };
    Object.keys(map).forEach(function (k) { if (th[k]) r.setProperty(map[k], th[k]); });
    if (th.fontUrl) {
      var l = document.createElement("link");
      l.rel = "stylesheet"; l.href = th.fontUrl;
      document.head.appendChild(l);
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = th.background || th.primary;
    document.querySelectorAll(".branch__stem").forEach(function (p) { p.setAttribute("pathLength", "1"); });
  }

  function setImage(node, src, alt) {
    node.setAttribute("role", "img");
    node.setAttribute("aria-label", alt);
    if (src) {
      node.style.backgroundImage = "url('" + src + "')";
      node.classList.add("has-image");
    }
  }

  /* ---------- sections ---------- */
  function renderStats() {
    var dl = document.getElementById("stats"); dl.innerHTML = "";
    (C.story.highlights || []).forEach(function (h) {
      var d = el("div");
      d.appendChild(el("dt", null, t(h.label)));
      d.appendChild(el("dd", null, h.value));
      dl.appendChild(d);
    });
  }

  var activeTab = 0;
  function renderMenu(animate) {
    var tabs = document.getElementById("menuTabs");
    var panels = document.getElementById("menuPanels");
    tabs.innerHTML = ""; panels.innerHTML = "";
    C.menu.categories.forEach(function (cat, i) {
      var b = el("button", "tab", t(cat.name));
      b.type = "button";
      b.setAttribute("role", "tab");
      b.id = "tab-" + i;
      b.setAttribute("aria-controls", "panel-" + i);
      b.setAttribute("aria-selected", i === activeTab ? "true" : "false");
      b.tabIndex = i === activeTab ? 0 : -1;
      b.addEventListener("click", function () { activeTab = i; renderMenu(true); document.getElementById("tab-" + i).focus(); });
      b.addEventListener("keydown", function (e) {
        var n = C.menu.categories.length;
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          activeTab = (i + (e.key === "ArrowRight" ? 1 : n - 1)) % n;
          renderMenu(true); document.getElementById("tab-" + activeTab).focus();
        }
      });
      tabs.appendChild(b);

      var p = el("ul", "dishes");
      p.id = "panel-" + i;
      p.setAttribute("role", "tabpanel");
      p.setAttribute("aria-labelledby", "tab-" + i);
      p.hidden = i !== activeTab;
      cat.items.forEach(function (it, j) {
        var li = el("li", "dish");
        li.style.setProperty("--i", animate ? j : 0);
        if (!animate) li.style.animation = "none";
        var head = el("div", "dish__head");
        var name = el("h3", "dish__name", t(it.name));
        if (it.tag) name.appendChild(el("span", "tag", t(it.tag)));
        head.appendChild(name);
        head.appendChild(el("span", "dish__dots"));
        head.appendChild(el("span", "dish__price", price(it.price)));
        li.appendChild(head);
        if (it.desc) li.appendChild(el("p", "dish__desc", t(it.desc)));
        p.appendChild(li);
      });
      panels.appendChild(p);
    });
  }

  function renderHours() {
    var ul = document.getElementById("hoursList"); ul.innerHTML = "";
    C.hours.days.forEach(function (d, i) {
      var li = el("li", i === todayIdx ? "is-today" : "");
      var day = el("span", "hours__day", t(d.day));
      if (i === todayIdx) day.appendChild(el("em", "today", t(C.ui.today)));
      li.appendChild(day);
      var right = el("span", d.hours ? "" : "closed", d.hours ? null : t(C.hours.closedLabel));
      if (d.hours) d.hours.split("·").forEach(function (s) { right.appendChild(el("span", "slot", s.trim())); });
      li.appendChild(right);
      ul.appendChild(li);
    });
    var today = C.hours.days[todayIdx];
    var p = document.getElementById("heroToday");
    p.textContent = "";
    p.appendChild(el("strong", null, t(C.ui.openToday) + " · "));
    p.appendChild(document.createTextNode(today && today.hours ? today.hours : t(C.hours.closedLabel)));
  }

  function renderReviews() {
    var box = document.getElementById("reviewList"); box.innerHTML = "";
    C.reviews.items.forEach(function (r) {
      var f = el("figure", "review reveal is-in");
      var s = el("span", "stars", "★★★★★".slice(0, r.rating) + "☆☆☆☆☆".slice(0, 5 - r.rating));
      s.setAttribute("role", "img");
      s.setAttribute("aria-label", r.rating + "/5");
      f.appendChild(s);
      var q = lang === "fr" ? ["« ", " »"] : ["“", "”"];
      f.appendChild(el("blockquote", null, fr(q[0] + t(r.text) + q[1])));
      f.appendChild(el("figcaption", null, "— " + r.author));
      box.appendChild(f);
    });
  }

  function renderGallery() {
    var sec = document.getElementById("gallery"), box = document.getElementById("galleryGrid");
    var items = (C.gallery && C.gallery.items) || [];
    sec.hidden = !items.length;
    box.innerHTML = "";
    items.forEach(function (g, i) {
      var f = el("figure", "frame gallery__item gallery__item--" + (i + 1));
      setImage(f, g.src, t(g.alt) || t(g.caption) || C.business.name);
      if (t(g.caption)) f.appendChild(el("figcaption", "gallery__cap", t(g.caption)));
      box.appendChild(f);
    });
  }

  function bookingUrl() {
    return "https://wa.me/" + C.contact.whatsapp + "?text=" + encodeURIComponent(t(C.contact.whatsappMessage));
  }

  /* ---------- full render ---------- */
  function render(isToggle) {
    document.documentElement.lang = lang;
    document.title = C.business.name + " — " + C.business.city;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = t(C.business.tagline);

    document.querySelectorAll("[data-t]").forEach(function (n) {
      var v = fr(t(get(n.getAttribute("data-t"))));
      if (n.hasAttribute("data-rich")) rich(n, v); else n.textContent = v;
    });
    document.querySelectorAll("[data-bind]").forEach(function (n) { n.textContent = t(get(n.getAttribute("data-bind"))); });

    setImage(document.getElementById("heroMedia"), C.images.hero, (C.images.hero && t(C.images.heroAlt)) || t(C.hero.photoCaption) || C.business.name);
    setImage(document.getElementById("storyMedia"), C.images.story, (C.images.story && t(C.images.storyAlt)) || C.business.name);

    var url = bookingUrl();
    document.querySelectorAll(".js-book").forEach(function (a) { a.href = url; });
    document.getElementById("mapLink").href = C.contact.mapLink;
    document.getElementById("mapLink").setAttribute("aria-label", t(C.location.mapButton) + " — " + C.contact.address);
    document.getElementById("mapButton").href = C.contact.mapLink;
    var phone = document.getElementById("phoneLink");
    phone.textContent = C.contact.phoneDisplay;
    phone.href = "tel:" + C.contact.phoneDisplay.replace(/[^\d+]/g, "");
    var mail = document.getElementById("emailLink");
    mail.textContent = C.contact.email;
    mail.href = "mailto:" + C.contact.email;

    var toggle = document.getElementById("langToggle");
    toggle.textContent = lang === "fr" ? "EN" : "FR";
    toggle.setAttribute("aria-label", lang === "fr" ? "Switch to English" : "Passer en français");
    document.querySelector(".skip").textContent = lang === "fr" ? "Aller au contenu" : "Skip to content";
    document.querySelector(".fab").setAttribute("aria-label", t(C.ui.book) + " — WhatsApp");

    renderStats(); renderMenu(false); renderGallery(); renderHours(); renderReviews();
  }

  applyTheme();
  render();
  document.getElementById("year").textContent = new Date().getFullYear();

  document.getElementById("langToggle").addEventListener("click", function () {
    lang = lang === "fr" ? "en" : "fr";
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    render(true);
  });

  /* Scroll reveals (content stays visible if this never runs) */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (n) { io.observe(n); });
  } else {
    reveals.forEach(function (n) { n.classList.add("is-in"); });
  }

  /* Top bar hairline after scrolling */
  var bar = document.querySelector(".topbar");
  function onScroll() { bar.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Hide the floating button while the hero's own button is visible */
  var fab = document.querySelector(".fab");
  var heroBtn = document.querySelector(".hero .js-book");
  if ("IntersectionObserver" in window && fab && heroBtn) {
    new IntersectionObserver(function (entries) {
      fab.classList.toggle("is-hidden", entries[0].isIntersecting);
    }).observe(heroBtn);
  }
})();
