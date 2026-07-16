/* =====================================================================
   WG St. Pauli — app.js
   Navigation, Folgen-Rendering, Modal-Player, Fortschritt, Countdown.
   ===================================================================== */
(function () {
  "use strict";
  const WG = window.WG;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const PAGE = document.body.dataset.page || "";

  /* --------------------------------------------------- Icons (inline SVG) */
  const I = {
    play: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    check:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>',
    arrow:'<span class="arr">↗</span>',
    insta:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    fb:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.8c0-.5.3-.8.8-.8z"/></svg>',
    heart:'<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 21s-7-4.6-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.4 12 21 12 21z"/></svg>',
  };

  /* --------------------------------------------------- Watch progress */
  const STORE = "wg:watched";
  const watched = {
    get list() { try { return JSON.parse(localStorage.getItem(STORE)) || []; } catch { return []; } },
    has(id) { return this.list.includes(id); },
    add(id) { const l = this.list; if (!l.includes(id)) { l.push(id); localStorage.setItem(STORE, JSON.stringify(l)); } document.dispatchEvent(new Event("wg:progress")); },
    reset() { localStorage.removeItem(STORE); document.dispatchEvent(new Event("wg:progress")); },
  };

  /* --------------------------------------------------- NAV + FOOTER */
  const NAV_ITEMS = [
    ["index.html", "Start", "home"],
    ["kosmos.html", "Der Kosmos", "kosmos"],
    ["folgen.html", "Folgen", "folgen"],
    ["bewohner.html", "Bewohner", "bewohner"],
    ["mitmachen.html", "Mitmachen", "mitmachen"],
  ];

  function renderNav() {
    const mount = $("[data-nav]");
    if (!mount) return;
    mount.innerHTML = `
      <nav class="nav" id="nav">
        <div class="container nav__inner">
          <a class="brand" href="index.html" aria-label="WG St. Pauli – Start">
            <span class="brand__mark"><span>WG</span></span> St. Pauli
          </a>
          <ul class="nav__links">
            ${NAV_ITEMS.map(([href, label, key]) =>
              `<li><a href="${href}" ${key === PAGE ? 'aria-current="page"' : ""}>${label}</a></li>`).join("")}
          </ul>
          <div class="nav__cta">
            <button class="theme-toggle" data-theme-toggle aria-label="Farbschema wechseln" title="Farbschema wechseln (Kiez · Creme · Neon)">◐ ${THEME_LABEL[nextTheme()]}</button>
            <a class="btn btn--ghost btn--sm" href="${WG.links.steady}" target="_blank" rel="noopener">Unterstützen</a>
            <a class="btn btn--primary btn--sm" href="folgen.html">Folgen ${I.arrow}</a>
            <button class="nav__burger" aria-label="Menü" aria-expanded="false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            </button>
          </div>
        </div>
      </nav>`;
    const nav = $("#nav"), burger = $(".nav__burger", nav);
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    const tt = $("[data-theme-toggle]", nav);
    if (tt) tt.addEventListener("click", toggleTheme);
  }

  function renderFooter() {
    const mount = $("[data-footer]");
    if (!mount) return;
    mount.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div>
              <a class="brand" href="index.html"><span class="brand__mark"><span>WG</span></span> St. Pauli</a>
              <p class="muted" style="margin-top:16px;max-width:42ch">Eine fortlaufende KI-Mockumentary über fünf Menschen, die gemeinsam alt werden – statt zu vereinsamen. Unabhängig produziert. Jeden Samstag neu.</p>
              <div class="social" style="margin-top:22px">
                <a href="${WG.links.instagram}" target="_blank" rel="noopener">${I.insta} Instagram</a>
                <a href="${WG.links.facebook}" target="_blank" rel="noopener">${I.fb} Facebook</a>
              </div>
            </div>
            <div>
              <h4>Serie</h4>
              <div class="footer__links">
                <a href="kosmos.html">Der WG-Kosmos</a>
                <a href="folgen.html">Alle Folgen</a>
                <a href="bewohner.html">Die Bewohner</a>
                <a href="folgen.html#pilot">Pilotfilm</a>
              </div>
            </div>
            <div>
              <h4>Mitmachen</h4>
              <div class="footer__links">
                <a href="${WG.links.steady}" target="_blank" rel="noopener">WG unterstützen</a>
                <a href="mitmachen.html#newsletter">Gästeliste / Newsletter</a>
                <a href="${WG.links.instagram}" target="_blank" rel="noopener">Täglich auf Insta</a>
                <a href="impressum.html">Impressum</a>
              </div>
            </div>
          </div>
          <div class="footer__bottom">
            <span>© ${new Date().getFullYear()} WG St. Pauli — Alt, aber nicht artig.</span>
            <span>Konzept &amp; Produktion: Kim Perator · 100&nbsp;% unabhängig</span>
          </div>
        </div>
      </footer>`;
  }

  /* --------------------------------------------------- Episode posters */
  const PALETTES = {
    kiez: [
      ["#c5302a", "#e7d6b8"], ["#a9802f", "#ecdfbf"], ["#9c3f1d", "#e6d4b0"],
      ["#7e5e1f", "#e9ddbd"], ["#b04527", "#ecdcbb"], ["#8a6a24", "#e3d2ac"],
    ],
    astra: [
      ["#e2001a", "#e7d2a4"], ["#b08628", "#ecdcae"], ["#1c1610", "#e3cf9f"],
      ["#c4902f", "#e9d8a8"], ["#b80016", "#ecd6a2"], ["#6b4f1a", "#e0cb95"],
    ],
    neon: [
      ["#ff2e88", "#7a0b3d"], ["#c6ff3a", "#324d00"], ["#2fe3d2", "#04403a"],
      ["#ffb454", "#5e3500"], ["#9b6bff", "#2a1268"], ["#ff5a5a", "#4d0d0d"],
    ],
    creme: [
      ["#7c8a55", "#e4dac3"], ["#ab6038", "#ecdcc6"], ["#6f8060", "#e0d8c0"],
      ["#9c7a3e", "#ece0c6"], ["#5f6f4a", "#dcd2b9"], ["#9a6048", "#e8d6c3"],
    ],
  };
  let POSTER_THEMES = PALETTES.astra;

  /* --------------------------------------------------- Theme (Astra | Kiez | Creme | Neon) */
  // "astra" = Standard (Etiketten-Look). "neon" = Basis aus styles.css (kein Extra-CSS).
  const THEMES = ["astra", "kiez", "creme", "neon"];
  const THEME_LABEL = { astra: "Astra", kiez: "Kiez", creme: "Creme", neon: "Neon" };
  let THEME = "astra";
  function loadThemeCss(name) {
    if (name === "neon") return;               // Basis steckt schon in styles.css
    const id = "theme-" + name + "-css";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id; l.rel = "stylesheet"; l.href = "assets/css/theme-" + name + ".css";
      document.head.appendChild(l);
    }
  }
  function applyTheme() {
    let saved = null; try { saved = localStorage.getItem("wg:theme"); } catch {}
    const param = new URLSearchParams(location.search).get("theme");
    THEME = THEMES.includes(param) ? param : (THEMES.includes(saved) ? saved : "astra");
    if (param) { try { localStorage.setItem("wg:theme", THEME); } catch {} }
    POSTER_THEMES = PALETTES[THEME] || PALETTES.astra;
    THEMES.forEach((t) => { if (t !== "neon") document.body.classList.toggle("theme-" + t, t === THEME); });
    loadThemeCss(THEME);
  }
  function nextTheme() { return THEMES[(THEMES.indexOf(THEME) + 1) % THEMES.length]; }
  function toggleTheme() {
    const next = nextTheme();
    try { localStorage.setItem("wg:theme", next); } catch {}
    location.href = location.pathname + (next === "astra" ? "" : "?theme=" + next);
  }
  function posterFor(ep, idx, mode) {
    const [a, b] = POSTER_THEMES[idx % POSTER_THEMES.length];
    const label = mode === "talk"
      ? "KIEZ-TALK"
      : ep.type === "finale" ? "FINALE" : ep.id === "pilot" ? "PILOT" : "FOLGE " + ep.no;
    return `
      <div class="ep__poster" style="background:
        radial-gradient(130% 100% at 15% 0%, ${a}33, transparent 60%),
        linear-gradient(150deg, ${b}, var(--ink) 75%);">
        <div style="position:absolute;inset:0;padding:18px;display:flex;flex-direction:column;justify-content:flex-end;">
          <div style="font-family:var(--font-mono);font-size:.66rem;letter-spacing:.2em;color:${a};text-transform:uppercase;">${label}</div>
          <div style="font-family:var(--font-display);font-size:clamp(1.6rem,4vw,2.3rem);line-height:.95;text-transform:uppercase;">${ep.title}</div>
        </div>
        <div style="position:absolute;top:-10px;right:6px;font-family:var(--font-display);font-size:5.5rem;line-height:1;color:${a};opacity:.16;">${ep.id === "pilot" ? "0" : ep.no.replace(/\D/g, "") || "★"}</div>
      </div>`;
  }

  function epTag(ep) {
    if (ep.id === WG.latest.id) return '<span class="ep__tag ep__tag--new">Neu</span>';
    if (ep.id === "pilot") return '<span class="ep__tag ep__tag--pilot">Hier starten</span>';
    if (ep.type === "finale") return '<span class="ep__tag ep__tag--finale">Finale</span>';
    return "";
  }

  function fmtDate(iso) {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" });
  }

  function epCard(ep, idx, mode) {
    const talkMode = mode === "talk";
    return `
      <article class="ep reveal" data-ep="${ep.id}" data-watched="${watched.has(ep.id) ? 1 : 0}">
        ${posterFor(ep, idx, mode)}
        <div class="ep__no">${ep.seasonTitle || ""}</div>
        ${epTag(ep)}
        <button class="ep__play" data-${talkMode ? "talk" : "watch"}="${ep.id}" aria-label="${talkMode ? "Kiez-Talk abspielen" : "Folge abspielen"}"><span>${I.play}</span></button>
        <div class="ep__body">
          <div class="ep__meta"><span>${fmtDate(ep.date)}</span></div>
          <h3 class="ep__title">${ep.title}</h3>
          <p class="ep__log">${ep.logline}</p>
          <div class="ep__foot">
            <div class="ep__actions">
              ${talkMode
                ? `<button class="ep__watch" data-talk="${ep.id}">🎙 Kiez-Talk</button>
                   <button class="ep__talk" data-watch="${ep.id}">▶ Die Folge</button>`
                : `<button class="ep__watch" data-watch="${ep.id}">${I.play} Ansehen</button>
                   ${ep.talk ? `<button class="ep__talk" data-talk="${ep.id}">🎙 Kiez-Talk</button>` : ""}`}
            </div>
            <span class="ep__seen">${I.check} Gesehen</span>
          </div>
        </div>
      </article>`;
  }

  /* --------------------------------------------------- MODAL player */
  let modal;
  function buildModal() {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal__backdrop" data-close></div>
      <div class="modal__box" role="dialog" aria-modal="true" aria-label="Folge ansehen">
        <div class="modal__head">
          <div>
            <div class="modal__sub" data-m-sub></div>
            <div class="modal__title" data-m-title></div>
          </div>
          <button class="modal__close" data-close aria-label="Schließen">✕</button>
        </div>
        <div class="modal__frame"><div data-m-frame></div></div>
        <div class="modal__seg" data-m-seg></div>
        <div class="modal__nav">
          <button class="btn btn--ghost btn--sm" data-m-prev>← Vorherige Folge</button>
          <button class="btn btn--ghost btn--sm" data-m-next>Nächste Folge →</button>
        </div>
        <p class="modal__desc" data-m-desc></p>
        <p class="nl-note" style="margin-top:6px">Video lädt nicht? <a data-m-fallback target="_blank" rel="noopener" style="color:var(--pink)">Folge auf wg-st-pauli.de ansehen ↗</a></p>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener("click", (e) => { if (e.target.dataset.close !== undefined) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  }

  function vimeoFrame(v) {
    if (!v) return "";
    const h = v.h ? `h=${v.h}&` : "";
    return `<iframe src="https://player.vimeo.com/video/${v.id}?${h}dnt=1&autoplay=1&title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  }

  // Die Vimeo-Videos sind domaingebunden. Freigegebene Domains (Vimeo-Privatsphäre-Einstellungen
  // je Video pflegen!): wg-st-pauli.de und die GitHub-Pages-Domain zum Testen. Auf jeder anderen
  // Domain würde Vimeo „Sorry, privacy settings“ zeigen – dort lieber sauberen Hinweis + Link.
  const VIDEO_HOSTS = ["wg-st-pauli.de", "kim-wg-st-pauli.github.io"];
  const canEmbed = location.hostname === "" || VIDEO_HOSTS.some((host) => location.hostname.endsWith(host));
  function videoBlock(ep, v, seg) {
    if (!v) return "";
    if (canEmbed) return vimeoFrame(v);
    const [a, b] = POSTER_THEMES[0];
    return `
      <div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:24px;background:
        radial-gradient(130% 100% at 30% 0%, ${a}33, transparent 60%), linear-gradient(150deg, ${b}, var(--ink) 80%);">
        <div>
          <div class="kicker" style="justify-content:center;color:${a}">Vorschau-Modus</div>
          <p style="font-family:var(--font-body);color:var(--bone);max-width:42ch;margin:14px auto 22px">
            Die Videos sind aus Rechtegründen an die Domain <strong>wg-st-pauli.de</strong> gebunden.
            In dieser Design-Vorschau läuft der Player daher nicht direkt – die Folge gibt’s mit einem Klick im Original:</p>
          <a class="btn btn--primary btn--lg" href="${ep.url}" target="_blank" rel="noopener">${seg === "talk" ? "🎙 Kiez-Talk" : "▶ Diese Folge"} auf wg-st-pauli.de ansehen ↗</a>
        </div>
      </div>`;
  }

  function openModal(epId, seg = "video") {
    if (!modal) buildModal();
    const ep = WG.findEpisode(epId);
    if (!ep) return;
    if (seg === "talk" && !ep.talk) seg = "video";   // Folge hat keinen Kiez-Talk → normale Folge
    $("[data-m-sub]", modal).textContent = `${ep.seasonTitle} · ${ep.id === "pilot" ? "Pilotfilm" : ep.type === "finale" ? "Staffelfinale" : "Folge " + ep.no}`;
    $("[data-m-title]", modal).textContent = ep.title;
    $("[data-m-desc]", modal).textContent = ep.summary || ep.logline;
    const fb = $("[data-m-fallback]", modal); if (fb) fb.href = ep.url;
    const segMount = $("[data-m-seg]", modal);
    segMount.innerHTML = ep.talk
      ? `<button class="btn btn--sm ${seg === "video" ? "btn--primary" : "btn--ghost"}" data-seg="video">▶ Die Folge</button>
         <button class="btn btn--sm ${seg === "talk" ? "btn--primary" : "btn--ghost"}" data-seg="talk">🎙 Kiez-Talk</button>`
      : "";
    const v = seg === "talk" ? ep.talk : ep.video;
    $("[data-m-frame]", modal).innerHTML = videoBlock(ep, v, seg);
    $$("[data-seg]", segMount).forEach((b) =>
      b.addEventListener("click", () => openModal(epId, b.dataset.seg)));

    // Blättern: chronologisch (Pilot → aktuellste Folge). onclick, damit sich
    // bei wiederholtem Öffnen keine Handler stapeln.
    const chrono = WG.allEpisodes.slice().sort((a, b) => a.date.localeCompare(b.date));
    const idx = chrono.findIndex((e) => e.id === ep.id);
    const prevEp = idx > 0 ? chrono[idx - 1] : null;
    const nextEp = idx >= 0 && idx < chrono.length - 1 ? chrono[idx + 1] : null;
    const prevBtn = $("[data-m-prev]", modal), nextBtn = $("[data-m-next]", modal);
    if (prevBtn) {
      prevBtn.disabled = !prevEp;
      prevBtn.textContent = prevEp ? `← ${prevEp.title}` : "← Vorherige Folge";
      prevBtn.onclick = prevEp ? () => openModal(prevEp.id) : null;
    }
    if (nextBtn) {
      nextBtn.disabled = !nextEp;
      nextBtn.textContent = nextEp ? `${nextEp.title} →` : "Nächste Folge →";
      nextBtn.onclick = nextEp ? () => openModal(nextEp.id) : null;
    }

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    watched.add(ep.id);
    // reflect on card immediately
    const card = $(`.ep[data-ep="${ep.id}"]`);
    if (card) card.dataset.watched = "1";
    history.replaceState(null, "", "#" + ep.id);
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    $("[data-m-frame]", modal).innerHTML = "";
    document.body.style.overflow = "";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  }

  // delegate play clicks globally
  document.addEventListener("click", (e) => {
    const talk = e.target.closest("[data-talk]");
    if (talk) { e.preventDefault(); openModal(talk.dataset.talk, "talk"); return; }
    const t = e.target.closest("[data-watch]");
    if (t) { e.preventDefault(); openModal(t.dataset.watch); }
  });

  /* --------------------------------------------------- Countdown (nächster Samstag) */
  function nextSaturday() {
    const now = new Date();
    const d = new Date(now);
    const day = d.getDay();           // 0 So ... 6 Sa
    let add = (6 - day + 7) % 7;      // Tage bis Samstag
    d.setHours(11, 0, 0, 0);          // Release ~ 11:00
    if (add === 0 && now > d) add = 7;
    d.setDate(d.getDate() + add);
    return d;
  }
  function initCountdown() {
    const el = $("[data-countdown]");
    if (!el) return;
    const target = nextSaturday();
    const units = [["Tage", 864e5], ["Std", 36e5], ["Min", 6e4], ["Sek", 1e3]];
    el.innerHTML = units.map(([l]) =>
      `<div class="countdown__unit"><div class="countdown__num" data-u="${l}">00</div><div class="countdown__label">${l}</div></div>`).join("");
    const tick = () => {
      let diff = Math.max(0, target - new Date());
      units.forEach(([l, ms]) => {
        const v = Math.floor(diff / ms); diff -= v * ms;
        const n = $(`[data-u="${l}"]`, el); if (n) n.textContent = String(v).padStart(2, "0");
      });
    };
    tick(); setInterval(tick, 1000);
  }

  /* --------------------------------------------------- Renderers per page */
  function renderLatest() {
    const mount = $("[data-latest-player]");
    if (mount) {
      const ep = WG.latest;
      // Klick-zum-Abspielen-Poster statt Auto-Embed (vermeidet 403 beim Laden + schneller)
      const [a, b] = POSTER_THEMES[0];
      mount.innerHTML = `
        <button data-watch="${ep.id}" aria-label="Neueste Folge abspielen"
          style="position:absolute;inset:0;border:0;cursor:pointer;background:
          radial-gradient(130% 100% at 20% 0%, ${a}33, transparent 60%),
          linear-gradient(150deg, ${b}, var(--ink) 80%);">
          <span style="position:absolute;top:18px;left:18px;font-family:var(--font-mono);font-size:.66rem;letter-spacing:.2em;color:${a};text-transform:uppercase">${ep.seasonTitle} · ${ep.id === "pilot" ? "Pilot" : "Folge " + ep.no}</span>
          <span style="position:absolute;left:18px;bottom:18px;right:18px;text-align:left;font-family:var(--font-display);font-size:clamp(1.8rem,4vw,2.6rem);line-height:.95;text-transform:uppercase;color:var(--text)">${ep.title}</span>
          <span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:72px;height:72px;border-radius:50%;background:var(--pink);color:#15030c;display:grid;place-items:center;box-shadow:var(--glow-pink)">${I.play}</span>
        </button>`;
      const meta = $("[data-latest-meta]");
      if (meta) meta.innerHTML =
        `<div class="kicker">Neueste Folge · ${ep.seasonTitle}</div>
         <h2 class="h-md" style="margin:12px 0 8px">${ep.title}</h2>
         <p class="muted">${ep.summary}</p>`;
    }
  }

  function renderHomeEpisodes() {
    const mount = $("[data-home-eps]");
    if (!mount) return;
    const eps = WG.allEpisodes.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
    mount.innerHTML = eps.map((e, i) => epCard(e, i)).join("");
  }

  function renderCastStrip() {
    const mount = $("[data-cast-strip]");
    if (!mount) return;
    mount.innerHTML = WG.characters.map((c) => `
      <a class="char" href="bewohner.html#${c.id}">
        <img src="${c.img}" alt="${c.name}" loading="lazy">
        <div class="char__info">
          <div class="char__role">${c.role}</div>
          <div class="char__name">${c.name}</div>
        </div>
      </a>`).join("");
  }

  function renderFolgen() {
    const mount = $("[data-folgen]");
    if (!mount) return;
    const tabs = $("[data-season-tabs]");
    const seasons = WG.seasons.slice().reverse(); // neueste Staffel zuerst
    // Deep-Link: "#id" öffnet die Folge, "#id:talk" öffnet direkt den Kiez-Talk (Meta-Folge).
    // "#talks" öffnet die Übersicht aller Kiez-Talks.
    const rawHash = decodeURIComponent(location.hash.slice(1));
    const [hashId, hashSeg] = rawHash.split(":");
    const talksHash = hashId === "talks";
    const hashEp = hashId && !talksHash ? WG.findEpisode(hashId) : null;
    let active = talksHash ? "talks" : hashEp ? hashEp.season : seasons[0].id;

    tabs.innerHTML = [
      `<button class="tab" data-tab="all">Alle</button>`,
      `<button class="tab" data-tab="talks">🎙 Kiez-Talks</button>`,
    ].concat(seasons.map((s) => `<button class="tab" data-tab="${s.id}">${s.title}</button>`)).join("");

    function paint(sel) {
      $$(".tab", tabs).forEach((t) => t.setAttribute("aria-selected", String(t.dataset.tab === sel)));
      let eps, mode;
      if (sel === "talks") {
        mode = "talk";
        eps = WG.allEpisodes.filter((e) => e.talk).sort((a, b) => b.date.localeCompare(a.date));
      } else if (sel === "all") {
        eps = WG.allEpisodes.slice().sort((a, b) => b.date.localeCompare(a.date));
      } else {
        const s = WG.seasons.find((s) => s.id === sel);
        eps = s.episodes.map((e) => ({ ...e, season: sel, seasonTitle: s.title }));
      }
      mount.innerHTML = eps.length
        ? eps.map((e, i) => epCard(e, i, mode)).join("")
        : `<p class="muted" style="grid-column:1/-1">Für diese Ansicht gibt es aktuell noch keine Einträge.</p>`;
      observeReveal();
      updateProgress();
    }
    $$(".tab", tabs).forEach((t) => t.addEventListener("click", () => paint(t.dataset.tab)));
    paint(active);

    // deep link → open modal (mit optionalem Segment #id:talk)
    if (hashEp) {
      setTimeout(() => openModal(hashId, hashSeg === "talk" ? "talk" : "video"), 250);
    }
  }

  function updateProgress() {
    const wrap = $("[data-progress]");
    if (!wrap) return;
    const total = WG.allEpisodes.length;
    const seen = WG.allEpisodes.filter((e) => watched.has(e.id)).length;
    const pct = total ? Math.round((seen / total) * 100) : 0;
    $("[data-progress-fill]").style.width = pct + "%";
    $("[data-progress-count]").textContent = `${seen} / ${total} Folgen gesehen`;
    $("[data-progress-pct]").textContent = pct + "%";
    $$(".ep").forEach((c) => { c.dataset.watched = watched.has(c.dataset.ep) ? "1" : "0"; });
  }

  function initResume() {
    const btn = $("[data-resume]");
    if (!btn) return;
    const seenIds = watched.list;
    // erste ungesehene Folge in chronologischer Reihenfolge
    const chrono = WG.allEpisodes.slice().sort((a, b) => a.date.localeCompare(b.date));
    const next = chrono.find((e) => !seenIds.includes(e.id)) || chrono[0];
    const label = seenIds.length ? `Weiterschauen: „${next.title}“` : `Beim Pilotfilm starten`;
    btn.innerHTML = `${I.play} ${label}`;
    btn.addEventListener("click", () => openModal(seenIds.length ? next.id : "pilot"));
  }

  function initReset() {
    const btn = $("[data-reset-progress]");
    if (!btn) return;
    btn.addEventListener("click", () => { watched.reset(); updateProgress(); });
  }
  document.addEventListener("wg:progress", updateProgress);

  /* --------------------------------------------------- Bewohner (dossiers) */
  function renderDossiers() {
    const mount = $("[data-dossiers]");
    if (!mount) return;
    mount.innerHTML = WG.characters.map((c) => `
      <article class="dossier reveal" id="${c.id}">
        <div class="dossier__img"><img src="${c.img}" alt="${c.name}" loading="lazy"></div>
        <div class="dossier__body">
          <div class="dossier__role">${c.role}</div>
          <h3 class="dossier__name">${c.name}</h3>
          <div class="dossier__age">${c.age}</div>
          <p class="dossier__quote">„${c.quote}“</p>
          <p class="muted">${c.bio}</p>
          <div class="dossier__tags">${c.tags.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
        </div>
      </article>`).join("");
    observeReveal();
  }

  /* --------------------------------------------------- Unterstützer-Stufen (Steady) */
  const TIER_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>';
  function tierCard(tier, idx, all) {
    const prevName = idx > 0 ? all[idx - 1].name : null;
    const inheritedPerk = prevName ? [`Alles aus „${prevName}“`] : [];
    const perks = inheritedPerk.concat(tier.perks || []);
    const ctaLabel = tier.featured ? `${tier.name} werden ↗` : "Auf Steady wählen ↗";
    const ctaClass = tier.featured ? "btn btn--primary btn--block" : "btn btn--ghost btn--block";
    return `
      <article class="tier${tier.featured ? " tier--feature" : ""} reveal">
        ${tier.featured ? '<div class="tier__badge">Beliebt</div>' : ""}
        <div class="tier__name">${tier.name}</div>
        <p class="tier__tagline">${tier.tagline}</p>
        <ul class="tier__perks">${perks.map((p) => `<li>${TIER_CHECK}${p}</li>`).join("")}</ul>
        <a class="${ctaClass}" href="${WG.links.steady}" target="_blank" rel="noopener">${ctaLabel}</a>
      </article>`;
  }

  function renderTiers() {
    const mount = $("[data-tiers]");
    if (!mount) return;
    mount.innerHTML = WG.tiers.map((t, i) => tierCard(t, i, WG.tiers)).join("");
    observeReveal();
  }

  /* --------------------------------------------------- Newsletter */
  function initNewsletter() {
    const form = $("[data-newsletter]");
    if (!form) return;
    form.action = WG.links.newsletterAction;
    // versteckter Mailchimp-Bot-Schutz-Feldname
    const bot = $("[data-bot]", form);
    if (bot) bot.name = `b_${WG.links.newsletterU}_${WG.links.newsletterId}`;
    form.addEventListener("submit", () => {
      const ok = $("[data-nl-ok]", form);
      if (ok) ok.classList.remove("hidden");
    });
  }

  /* --------------------------------------------------- Reveal on scroll */
  let io;
  function observeReveal() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((e) => e.classList.add("in")); return; }
    if (!io) io = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$(".reveal:not(.in)").forEach((e) => io.observe(e));
  }

  /* --------------------------------------------------- Boot */
  function setFavicon() {
    // Kiez/Creme: Messing-Türschild „WG“ (kein Herz-Anker, keine Marke). Neon: das alte Pink-Plakettchen.
    const brass = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="%23e8dcc2"/><stop offset="1" stop-color="%23d3c099"/></linearGradient><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23c79a47"/><stop offset="0.5" stop-color="%23a9802f"/><stop offset="1" stop-color="%237e5e1f"/></linearGradient></defs><rect width="64" height="64" rx="10" fill="url(%23b)"/><rect x="7" y="7" width="50" height="50" rx="8" fill="url(%23g)" stroke="%237e5e1f" stroke-width="1.5"/><rect x="7" y="7" width="50" height="50" rx="8" fill="none" stroke="%23fff4d6" stroke-opacity="0.35" stroke-width="1"/><text x="32" y="42" font-family="Georgia,serif" font-size="24" font-weight="700" text-anchor="middle" fill="%232a1d07">WG</text><circle cx="32" cy="13.5" r="2.4" fill="%23c5302a"/></svg>`;
    const neon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="%23ff2e88"/><text x="16" y="22" font-family="Arial Black,Arial" font-size="15" font-weight="900" text-anchor="middle" fill="%2315030c">WG</text></svg>`;
    // Astra: roter Herz-Anker auf Sand-Kachel
    const astra = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="%23e5d5b0"/><g transform="translate(8 7) scale(0.78)"><path d="M32 57 C12 43 4 32 4 22 C4 13 11 7 19 7 C25 7 29 11 32 16 C35 11 39 7 45 7 C53 7 60 13 60 22 C60 32 52 43 32 57 Z" fill="%23e2001a"/><g fill="none" stroke="%23141414" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="17" r="3.6"/><line x1="32" y1="20" x2="32" y2="47"/><line x1="23" y1="26" x2="41" y2="26"/><path d="M19 39 C20 49 26 51 32 51 C38 51 44 49 45 39"/></g></g></svg>`;
    const svg = THEME === "neon" ? neon : THEME === "astra" ? astra : brass;
    const l = document.createElement("link");
    l.rel = "icon"; l.type = "image/svg+xml";
    l.href = "data:image/svg+xml," + svg;
    document.head.appendChild(l);
  }

  function init() {
    applyTheme();
    setFavicon();
    renderNav();
    renderFooter();
    renderLatest();
    renderHomeEpisodes();
    renderCastStrip();
    renderFolgen();
    renderDossiers();
    renderTiers();
    initCountdown();
    initResume();
    initReset();
    initNewsletter();
    updateProgress();
    observeReveal();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
