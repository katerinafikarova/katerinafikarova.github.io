/* Vykreslování webu z dat v projects.js. Tady většinou nic měnit nemusíš. */
(function () {
  const projects = window.PROJECTS || [];
  const detailed = projects.filter((p) => p.detail !== false);
  const others = projects.filter((p) => p.detail === false);

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const link = (p) => `projekt.html?p=${encodeURIComponent(p.slug)}`;
  const tagList = (tags) => `<ul class="tags">${(tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

  const card = (p) => `
    <a class="card" href="${link(p)}">
      <img src="${esc(p.thumb || p.cover)}" alt="" loading="lazy">
      <div class="card-top">
        <span class="pill">${esc(p.type)}</span>
        ${p.status ? `<span class="pill">${esc(p.status)}</span>` : ""}
      </div>
      <div class="card-bottom">
        <span class="star" aria-hidden="true"></span>
        <h3>${esc(p.title)}</h3>
        <p class="card-sub">${esc(p.short)}</p>
      </div>
    </a>`;

  /* ---------- Úvod: vybrané projekty ---------- */
  const featuredEl = document.getElementById("featured");
  if (featuredEl) featuredEl.innerHTML = detailed.filter((p) => p.featured).map(card).join("");

  /* ---------- Další práce ---------- */
  document.querySelectorAll("[data-archive]").forEach((el) => {
    el.innerHTML = others
      .map(
        (p) => `
        <li>
          <span class="year">${esc(p.year)}</span>
          <span class="title">${esc(p.title)}</span>
          <span class="client">${esc(p.client)}, ${esc(p.role)}</span>
          ${tagList(p.tags)}
        </li>`
      )
      .join("");
  });

  /* ---------- Stránka Projekty: filtr + mřížka ---------- */
  const gridEl = document.getElementById("grid");
  const filtersEl = document.getElementById("filters");
  if (gridEl && filtersEl) {
    const used = (window.TAGS || []).filter((t) => projects.some((p) => (p.tags || []).includes(t)));
    let active = used.includes(new URLSearchParams(location.search).get("stitek"))
      ? new URLSearchParams(location.search).get("stitek")
      : null;

    const render = () => {
      filtersEl.innerHTML = [null, ...used]
        .map((t) => `<button type="button" data-tag="${esc(t ?? "")}" aria-pressed="${t === active}">${esc(t ?? "Vše")}</button>`)
        .join("");

      const list = detailed.filter((p) => !active || (p.tags || []).includes(active));
      gridEl.innerHTML = list.length
        ? list.map(card).join("")
        : `<p class="empty">S tímhle štítkem zatím nemám velký projekt. Podívej se níž do další práce.</p>`;

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

    if (!p) {
      detailEl.innerHTML = `
        <section class="page-head">
          <h1>Projekt nenalezen.<span class="faded"> Odkaz je možná starý.</span></h1>
          <p style="margin-top:2rem"><a class="btn" href="projekty.html">Zobrazit všechny projekty</a></p>
        </section>`;
    } else {
      document.title = `${p.title} | Kateřina Fikarová`;
      const next = detailed[(i + 1) % detailed.length];
      const step = (h, t) => (t ? `<div class="story-step"><h2>${h}</h2><p>${esc(t)}</p></div>` : "");
      const facts = [
        ["Pro", p.client],
        ["Rok", p.year],
        ["Moje role", p.role],
        ["Spolupráce", p.credits],
      ].filter(([, v]) => v);

      detailEl.innerHTML = `
        <section class="project-hero">
          <a class="back btn" href="projekty.html">Všechny projekty</a>
          <div class="meta-line">
            <span class="pill">${esc(p.type)}</span>
            ${p.status ? `<span class="pill">${esc(p.status)}</span>` : ""}
            ${p.award ? `<span class="pill accent">${esc(p.award)}</span>` : ""}
          </div>
          <h1>${esc(p.title)}</h1>
          <p class="subtitle">${esc(p.subtitle)}</p>
          <dl class="facts">
            ${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}
          </dl>
          <div class="project-cover"><img src="${esc(p.cover)}" alt="${esc(p.title)}"></div>
        </section>
        <section class="story">
          ${step("Problém", p.problem)}
          ${step("Potřeby", p.needs)}
          ${step("Řešení", p.solution)}
          ${step("Výsledek", p.result)}
        </section>
        ${p.video ? `<div class="video"><iframe src="${esc(p.video)}" title="Video k projektu ${esc(p.title)}" allowfullscreen loading="lazy"></iframe></div>` : ""}
        ${
          (p.gallery || []).length
            ? `<div class="gallery">${p.gallery
                .map((g) => `<figure class="${g.wide ? "wide" : ""}"><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy"></figure>`)
                .join("")}</div>`
            : ""
        }
        ${
          next && next !== p
            ? `<a class="next-project" href="${link(next)}"><span>Další projekt</span><strong>${esc(next.title)}</strong></a>`
            : ""
        }`;

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
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentElement.closest("script, style") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    const re = /(^|[\s\u00a0(„])([aikosuvzAIKOSUVZ]) /g;
    let n;
    while ((n = walker.nextNode())) {
      let v = n.nodeValue.replace(re, "$1$2\u00a0").replace(re, "$1$2\u00a0");
      v = v.replace(/(\d) (%|Kč|mm|×)/g, "$1\u00a0$2").replace(/× (\d)/g, "×\u00a0$1");
      if (v !== n.nodeValue) n.nodeValue = v;
    }
  }
  nbsp(document.body);
})();
