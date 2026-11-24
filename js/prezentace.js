/* Ovládání prezentace: šipky / mezerník / PageUp-Down, T = časomíra 5 minut, F = celá obrazovka */
(function () {
  const slides = [...document.querySelectorAll(".slide")];
  const currentEl = document.querySelector("[data-deck-current]");
  let current = 0;

  const go = (i) => {
    current = Math.max(0, Math.min(slides.length - 1, i));
    slides[current].scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  // který slide je právě vidět
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          current = slides.indexOf(e.target);
          currentEl.textContent = current + 1;
        }
      });
    },
    { threshold: 0.55 }
  );
  slides.forEach((s) => io.observe(s));

  /* časomíra */
  const timerBtn = document.querySelector('[data-deck="timer"]');
  let left = 300, tick = null;
  const show = () => {
    const m = Math.floor(Math.abs(left) / 60), s = String(Math.abs(left) % 60).padStart(2, "0");
    timerBtn.textContent = `${left < 0 ? "−" : ""}${m}:${s}`;
    timerBtn.classList.toggle("over", left < 0);
  };
  const toggleTimer = () => {
    if (tick) {
      clearInterval(tick);
      tick = null;
      timerBtn.setAttribute("aria-pressed", "false");
    } else {
      tick = setInterval(() => { left--; show(); }, 1000);
      timerBtn.setAttribute("aria-pressed", "true");
    }
  };
  timerBtn.setAttribute("aria-pressed", "false");
  timerBtn.addEventListener("click", toggleTimer);
  // dvojklik vrátí časomíru na 5:00
  timerBtn.addEventListener("dblclick", () => { left = 300; show(); });

  document.querySelector('[data-deck="prev"]').addEventListener("click", () => go(current - 1));
  document.querySelector('[data-deck="next"]').addEventListener("click", () => go(current + 1));

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (["ArrowRight", "ArrowDown", "PageDown"].includes(e.key) || (e.key === " " && e.target === document.body)) {
      e.preventDefault(); go(current + 1);
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault(); go(current - 1);
    } else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(slides.length - 1); }
    else if (e.key.toLowerCase() === "t") toggleTimer();
    else if (e.key.toLowerCase() === "f") {
      document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.();
    }
  });
})();
