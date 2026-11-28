import { themes } from "./state.js";

const bgContainer = document.getElementById("bg-container");
const triggerIcon = document.getElementById("theme-trigger-icon");
const triggerLabel = document.getElementById("time-label");
const menu = document.getElementById("theme-menu");
const options = menu.querySelectorAll("[data-theme]");
const TONE_CLASSES = ["theme-switcher-black", "theme-switcher-white"];
const TONE_SELECTOR = TONE_CLASSES.map((c) => "." + c).join(",");

export const dom = {
  switcher: document.getElementById("theme-switcher"),
  trigger: document.getElementById("theme-trigger"),
  menu: document.getElementById("theme-menu"),
};

export function preloadBackgrounds() {
  Object.values(themes).forEach(({ bg }) => {
    new Image().src = bg;
  });
}

export function isMenuOpen() {
  return dom.trigger.getAttribute("aria-expanded") === "true";
}

export function setMenuOpen(open) {
  dom.menu.classList.toggle("hidden", !open);
  dom.menu.classList.toggle("flex", open);
  dom.trigger.setAttribute("aria-expanded", String(open));
}

export function applyTheme(theme) {
  const t = themes[theme];
  if (!t) return;

  document.querySelectorAll(TONE_SELECTOR).forEach((el) => {
    el.classList.remove(...TONE_CLASSES);
    el.classList.add(t.tone);
  });

  bgContainer.style.backgroundImage = `url("${t.bg}")`;
  document.documentElement.dataset.theme = theme;
  triggerIcon.src = t.bg;
  triggerLabel.textContent = t.label;
  dom.trigger.setAttribute("aria-label", `Theme: ${theme}`);

  options.forEach((opt) => {
    opt.setAttribute("aria-checked", String(opt.dataset.theme === theme));
  });
}

export function initForecastScroll() {
  const scroller = document.getElementById("forecast-scroller");
  if (!scroller) return;

  let isDown = false;
  let moved = false;
  let startX = 0;
  let startScroll = 0;

  scroller.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    isDown = true;
    moved = false;
    startX = e.clientX;
    startScroll = scroller.scrollLeft;
  });

  scroller.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;

    if (!moved && Math.abs(dx) > 5) {
      moved = true;
      scroller.style.scrollSnapType = "none";
      scroller.style.scrollBehavior = "auto";
      scroller.style.cursor = "grabbing";
      scroller.setPointerCapture(e.pointerId);
    }
    if (moved) scroller.scrollLeft = startScroll - dx;
  });

  function endDrag(e) {
    if (!isDown) return;
    isDown = false;
    if (!moved) return;
    scroller.style.scrollSnapType = "";
    scroller.style.scrollBehavior = "";
    scroller.style.cursor = "";
    scroller.releasePointerCapture(e.pointerId);
  }
  scroller.addEventListener("pointerup", endDrag);
  scroller.addEventListener("pointercancel", endDrag);
}
