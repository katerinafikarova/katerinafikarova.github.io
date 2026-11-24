/* Vykreslování webu z dat v projects.js a en.js. Tady většinou nic měnit nemusíš. */
(function () {
  /* ---------- Jazyk: čeština / angličtina ---------- */
  const store = {
    get: () => { try { return localStorage.getItem("lang"); } catch (e) { return null; } },
    set: (v) => { try { localStorage.setItem("lang", v); } catch (e) {} },
  };
  const qLang = new URLSearchParams(location.search).get("lang");
  if (qLang === "en" || qLang === "cs") store.set(qLang);
  const lang = (qLang || store.get()) === "en" ? "en" : "cs";
  const EN = lang === "en" ? window.EN || {} : null;
  document.documentElement.lang = lang;

  const UI = {
    cs: {
      open: { linkedin: "Otevřít na LinkedInu", instagram: "Otevřít na Instagramu", web: "Otevřít stránku", ar: "Vyzkoušet" },
      newWin: " (otevře se v novém okně)",
      by: (n) => `Příspěvek od ${n}`,
      all: "Vše",
      empty: "S tímhle štítkem zatím nemám velký projekt. Podívej se níž do další práce.",
      notFound: `Projekt nenalezen.<span class="faded"> Odkaz je možná starý.</span>`,
      allProjects: "Všechny projekty",
      showAll: "Zobrazit všechny projekty",
      facts: ["Pro", "Rok", "Moje role", "Spolupráce"],
      story: ["Problém", "Potřeby", "Řešení", "Výsledek"],
      mentions: "Odkazy a příspěvky",
      next: "Další projekt",
      video: "Video k projektu",
      switchTo: "EN",
      switchLabel: "Switch to English",
    },
    en: {
      open: { linkedin: "Open on LinkedIn", instagram: "Open on Instagram", web: "Open page", ar: "Try it" },
      newWin: " (opens in a new window)",
      by: (n) => `Posted by ${n}`,
      all: "All",
      empty: "No major project with this tag yet. Have a look at other work below.",
      notFound: `Project not found.<span class="faded"> The link may be out of date.</span>`,
      allProjects: "All projects",
      showAll: "Show all projects",
      facts: ["For", "Year", "My role", "Together with"],
      story: ["Problem", "Needs", "Solution", "Result"],
      mentions: "Links and posts",
      next: "Next project",
      video: "Video for project",
      switchTo: "CZ",
      switchLabel: "Přepnout do češtiny",
    },
  }[lang];

  // přeložené pole projektu / příspěvku (když překlad chybí, zůstane čeština)
  const tr = (p, field) => {
    if (!EN) return p[field];
    const t = (p.url ? EN.posts?.[p.url] : EN.projects?.[p.slug]) || {};
    return t[field] ?? p[field];
  };
  const trTag = (t) => (EN && EN.tags?.[t]) || t;
  const trLink = (l) => (EN && (l.labelEn || EN.links?.[l.label])) || l.label;

  // statické texty v HTML: <h1 data-en="…">, aria-label přes data-en-aria-label, meta přes data-en-content
  if (EN) {
    document.querySelectorAll("[data-en]").forEach((el) => (el.innerHTML = el.dataset.en));
    document.querySelectorAll("[data-en-aria-label]").forEach((el) => el.setAttribute("aria-label", el.dataset.enAriaLabel));
    document.querySelectorAll("[data-en-content]").forEach((el) => el.setAttribute("content", el.dataset.enContent));
    document.querySelectorAll("[data-en-alt]").forEach((el) => el.setAttribute("alt", el.dataset.enAlt));
  }

  document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
    btn.textContent = UI.switchTo;
    btn.setAttribute("aria-label", UI.switchLabel);
    btn.setAttribute("lang", lang === "en" ? "cs" : "en");
    btn.addEventListener("click", () => {
      const nextLang = lang === "en" ? "cs" : "en";
      store.set(nextLang);
      const url = new URL(location.href);
      url.searchParams.set("lang", nextLang);
      location.href = url;
    });
  });

  // odkazy mezi stránkami nesou jazyk dál (i kdyby nešlo uložit do prohlížeče)
  if (lang === "en") {
    document.querySelectorAll('a[href$=".html"], a[href*=".html?"], a[href*=".html#"]').forEach((a) => {
      const u = new URL(a.getAttribute("href"), location.href);
      if (u.origin !== location.origin) return;
      u.searchParams.set("lang", "en");
      a.setAttribute("href", u.pathname.split("/").pop() + u.search + u.hash);
    });
  }

  /* ---------- Data ---------- */
  const projects = window.PROJECTS || [];
  const detailed = projects.filter((p) => p.detail !== false);
  const others = projects.filter((p) => p.detail === false);

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const link = (p) => `projekt.html?p=${encodeURIComponent(p.slug)}${lang === "en" ? "&lang=en" : ""}`;
  const tagList = (tags) => `<ul class="tags">${(tags || []).map((t) => `<li>${esc(trTag(t))}</li>`).join("")}</ul>`;
  const ext = `target="_blank" rel="noopener"`;
  const extLabel = `<span class="visually-hidden">${UI.newWin}</span>`;

  const card = (p) => `
    <a class="card" href="${link(p)}">
      <img src="${esc(p.thumb || p.cover)}" alt="" loading="lazy">
      <div class="card-top">
        <span class="pill">${esc(tr(p, "type"))}</span>
        ${p.status ? `<span class="pill">${esc(tr(p, "status"))}</span>` : ""}
      </div>
      <div class="card-bottom">
        <span class="star" aria-hidden="true"></span>
        <h3>${esc(tr(p, "title"))}</h3>
        <p class="card-sub">${esc(tr(p, "short"))}</p>
      </div>
    </a>`;

  /* ---------- Příspěvky na sítích ---------- */
  const posts = (window.POSTS || []).slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const KIND_NAME = { linkedin: "LinkedIn", instagram: "Instagram", web: "Web", ar: "AR" };
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmtDate = (d) => {
    const [y, m, day] = String(d || "").split("-").map(Number);
    if (!y) return "";
    return lang === "en" ? `${MONTHS[m - 1]} ${day}, ${y}` : `${day}. ${m}. ${y}`;
  };

  const postCard = (p) => `
    <a class="post post-${esc(p.kind)}${p.img ? " has-img" : ""}" href="${esc(p.url)}" ${ext}>
      ${p.img ? `<div class="post-img"><img src="${esc(p.img)}" alt="" loading="lazy"></div>` : ""}
      <div class="post-body">
        <span class="post-meta">
          <span class="pill">${esc(KIND_NAME[p.kind] || "Web")}</span>
          <time datetime="${esc(p.date)}">${fmtDate(p.date)}</time>
        </span>
        <h3>${esc(tr(p, "title"))}</h3>
        ${tr(p, "by") ? `<span class="post-by">${esc(UI.by(tr(p, "by")))}</span>` : ""}
        ${tr(p, "text") ? `<span class="post-text">${esc(tr(p, "text"))}</span>` : ""}
        <span class="post-open">${esc(UI.open[p.kind] || UI.open.web)}${extLabel}</span>
      </div>
    </a>`;


  // příspěvky do sloupců po řádcích (nejnovější vlevo nahoře), obrázky se neořezávají
  const masonry = (el) => {
    const cards = [...el.querySelectorAll(".post")];
    let current = 0;
    const layout = () => {
      const n = innerWidth <= 560 ? 1 : innerWidth <= 980 ? 2 : 3;
      if (n === current) return;
      current = n;
      const cols = Array.from({ length: n }, () => {
        const c = document.createElement("div");
        c.className = "posts-col";
        return c;
      });
      cards.filter((c) => !c.hidden).forEach((c, i) => cols[i % n].appendChild(c));
      cards.filter((c) => c.hidden).forEach((c) => cols[0].appendChild(c));
      el.replaceChildren(...cols);
    };
    layout();
    addEventListener("resize", layout);
    return () => { current = 0; layout(); };
  };

  const postsEl = document.getElementById("posts");
  if (postsEl) {
    const FIRST = 6;
    postsEl.innerHTML = posts.map((p, i) => postCard(p).replace("<a ", i >= FIRST ? "<a hidden " : "<a ")).join("");
    const relayout = masonry(postsEl);
    const more = document.getElementById("posts-more");
    if (more) {
      if (posts.length <= FIRST) more.remove();
      else
        more.addEventListener("click", () => {
          const firstNew = postsEl.querySelectorAll(".post[hidden]")[0];
          postsEl.querySelectorAll("[hidden]").forEach((el) => (el.hidden = false));
          relayout();
          firstNew?.focus();
          more.remove();
        });
    }
  }

  /* ---------- Úvod: vybrané projekty ---------- */
  const featuredEl = document.getElementById("featured");
  if (featuredEl) featuredEl.innerHTML = detailed.filter((p) => p.featured).map(card).join("");

  /* ---------- Další práce ---------- */
  document.querySelectorAll("[data-archive]").forEach((el) => {
    el.innerHTML = others
      .map((p) => {
        const title = esc(tr(p, "title"));
        return `
        <li>
          <span class="year">${esc(tr(p, "year"))}</span>
          <span class="title">${p.link ? `<a href="${esc(p.link)}" ${ext}>${title}${extLabel}</a>` : title}</span>
          <span class="client">${esc(tr(p, "client"))}, ${esc(tr(p, "role"))}</span>
          ${tagList(p.tags)}
        </li>`;
      })
      .join("");
  });

  /* ---------- Stránka Projekty: filtr + mřížka ---------- */
  const gridEl = document.getElementById("grid");
  const filtersEl = document.getElementById("filters");
  if (gridEl && filtersEl) {
    const used = (window.TAGS || []).filter((t) => projects.some((p) => (p.tags || []).includes(t)));
    const fromUrl = new URLSearchParams(location.search).get("stitek");
    let active = used.includes(fromUrl) ? fromUrl : null;

    const render = () => {
      filtersEl.innerHTML = [null, ...used]
        .map((t) => `<button type="button" data-tag="${esc(t ?? "")}" aria-pressed="${t === active}">${esc(t ? trTag(t) : UI.all)}</button>`)
        .join("");

      const list = detailed.filter((p) => !active || (p.tags || []).includes(active));
      gridEl.innerHTML = list.length ? list.map(card).join("") : `<p class="empty">${UI.empty}</p>`;

      document.querySelectorAll("[data-archive]").forEach((el) => {
        el.querySelectorAll(":scope > li").forEach((li, i) => {
          li.hidden = !!active && !(others[i].tags || []).includes(active);
        });
      });
      nbsp(gridEl);
    };

    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      active = btn.dataset.tag || null;
      const url = new URL(location.href);
      active ? url.searchParams.set("stitek", active) : url.searchParams.delete("stitek");
      history.replaceState(null, "", url);
      render();
      filtersEl.querySelector(`[aria-pressed="true"]`)?.focus();
    });

    render();
  }

  /* ---------- Detail projektu ---------- */
  const detailEl = document.getElementById("project");
  if (detailEl) {
    const slug = new URLSearchParams(location.search).get("p");
    const i = detailed.findIndex((p) => p.slug === slug);
    const p = detailed[i];
    const allHref = `projekty.html${lang === "en" ? "?lang=en" : ""}`;

    if (!p) {
      detailEl.innerHTML = `
        <section class="page-head">
          <h1>${UI.notFound}</h1>
          <p style="margin-top:2rem"><a class="btn" href="${allHref}">${UI.showAll}</a></p>
        </section>`;
    } else {
      document.title = `${tr(p, "title")} | Kateřina Fikarová`;
      const next = detailed[(i + 1) % detailed.length];
      const projectPosts = posts.filter((x) => x.project === p.slug);
      const step = (h, t) => (t ? `<div class="story-step"><h2>${h}</h2><p>${esc(t)}</p></div>` : "");
      const facts = [tr(p, "client"), tr(p, "year"), tr(p, "role"), tr(p, "credits")]
        .map((v, k) => [UI.facts[k], v])
        .filter(([, v]) => v);

      detailEl.innerHTML = `
        <section class="project-hero">
          <a class="back btn" href="${allHref}">${UI.allProjects}</a>
          <div class="meta-line">
            <span class="pill">${esc(tr(p, "type"))}</span>
            ${p.status ? `<span class="pill">${esc(tr(p, "status"))}</span>` : ""}
            ${p.award ? `<span class="pill accent">${esc(tr(p, "award"))}</span>` : ""}
          </div>
          <h1>${esc(tr(p, "title"))}</h1>
          <p class="subtitle">${esc(tr(p, "subtitle"))}</p>
          <dl class="facts">
            ${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}
          </dl>
          <div class="project-cover"><img src="${esc(p.cover)}" alt="${esc(tr(p, "title"))}"></div>
        </section>
        <section class="story">
          ${step(UI.story[0], tr(p, "problem"))}
          ${step(UI.story[1], tr(p, "needs"))}
          ${step(UI.story[2], tr(p, "solution"))}
          ${step(UI.story[3], tr(p, "result"))}
        </section>
        ${
          (p.links || []).length || projectPosts.length
            ? `<section class="mentions" aria-labelledby="ohlasy">
                <h2 id="ohlasy">${UI.mentions}</h2>
                ${
                  (p.links || []).length
                    ? `<ul class="link-list">${p.links
                        .map((l) => `<li><a class="btn${l.kind === "ar" ? " primary" : ""}" href="${esc(l.url)}" ${ext}>${esc(trLink(l))}${extLabel}</a></li>`)
                        .join("")}</ul>`
                    : ""
                }
                ${projectPosts.length ? `<div class="posts">${projectPosts.map(postCard).join("")}</div>` : ""}
              </section>`
            : ""
        }
        ${p.video ? `<div class="video"><iframe src="${esc(p.video)}" title="${UI.video} ${esc(tr(p, "title"))}" allowfullscreen loading="lazy"></iframe></div>` : ""}
        ${
          (p.gallery || []).length
            ? `<div class="gallery">${p.gallery
                .map((g) => `<figure class="${g.wide ? "wide" : ""}"><img src="${esc(g.src)}" alt="${esc((EN && g.altEn) || g.alt)}" loading="lazy"></figure>`)
                .join("")}</div>`
            : ""
        }
        ${
          next && next !== p
            ? `<a class="next-project" href="${link(next)}"><span>${UI.next}</span><strong>${esc(tr(next, "title"))}</strong></a>`
            : ""
        }`;

      detailEl.querySelectorAll(".posts").forEach(masonry);

      // obálka na výšku se nemá ořezávat
      const coverImg = detailEl.querySelector(".project-cover img");
      const markPortrait = () => {
        if (coverImg.naturalHeight > coverImg.naturalWidth) coverImg.parentElement.classList.add("portrait");
      };
      coverImg.complete ? markPortrait() : coverImg.addEventListener("load", markPortrait);
    }
  }

  /* ---------- Rok v patičce ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Česká typografie: žádné jednopísmenné slovo na konci řádku ---------- */
  function nbsp(root) {
    if (lang !== "cs") return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentElement.closest("script, style") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    const re = /(^|[\s („])([aikosuvzAIKOSUVZ]) /g;
    let n;
    while ((n = walker.nextNode())) {
      let v = n.nodeValue.replace(re, "$1$2 ").replace(re, "$1$2 ");
      v = v.replace(/(\d) (%|Kč|mm|×)/g, "$1 $2").replace(/× (\d)/g, "× $1");
      if (v !== n.nodeValue) n.nodeValue = v;
    }
  }
  nbsp(document.body);
})();
