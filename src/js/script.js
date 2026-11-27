const bgContainer = document.getElementById("bg-container");
const switcher = document.getElementById("theme-switcher");
const trigger = document.getElementById("theme-trigger");
const triggerIcon = document.getElementById("theme-trigger-icon");
const triggerLabel = document.getElementById("time-label");
const menu = document.getElementById("theme-menu");
const options = menu.querySelectorAll("[data-theme]");
toneTargets = [trigger, menu];
const TONE_CLASSES = ["theme-switcher-black", "theme-switcher-white"];

const themes = {
  morning: { label: "Morning", bg: "./src/assets/img/bg-morning-ground.png", tone: "theme-switcher-black" },
  afternoon: { label: "Afternoon", bg: "./src/assets/img/bg-afternoon-ground.png", tone: "theme-switcher-black" },
  evening: { label: "Evening", bg: "./src/assets/img/bg-evening-ground.png", tone: "theme-switcher-white" },
  night: { label: "Night", bg: "./src/assets/img/bg-night-ground.png", tone: "theme-switcher-white" },
};

const STORAGE_KEY = "thermo-theme";

Object.values(themes).forEach(({ bg }) => {
  new Image().src = bg;
});

function themeFromHour(h = new Date().getHours()) {
  if (h >= 5 && h < 11) return "morning";
  if (h >= 11 && h < 17) return "afternoon";
  if (h >= 17 && h < 19) return "evening";
  return "night";
}

function setMenuOpen(open) {
  menu.classList.toggle("hidden", !open);
  menu.classList.toggle("flex", open);
  trigger.setAttribute("aria-expanded", String(open));
}

function applyTheme(theme) {
  const t = themes[theme];
  if (!t) return;

  toneTargets.forEach((el) => {
    el.classList.remove(...TONE_CLASSES);
    el.classList.add(t.tone);
  });

  bgContainer.style.backgroundImage = `url("${t.bg}")`;
  document.documentElement.dataset.theme = theme;
  triggerIcon.src = t.bg;
  triggerLabel.textContent = t.label;
  trigger.setAttribute("aria-label", `Theme: ${theme}`);

  options.forEach((opt) => {
    opt.setAttribute("aria-checked", String(opt.dataset.theme === theme));
  });

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
}

trigger.addEventListener("click", () => {
  setMenuOpen(trigger.getAttribute("aria-expanded") !== "true");
});

menu.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-theme]");
  if (!btn) return;
  applyTheme(btn.dataset.theme);
  setMenuOpen(false);
  trigger.focus();
});

document.addEventListener("click", (e) => {
  if (!switcher.contains(e.target)) setMenuOpen(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    trigger.focus();
  }
});

let saved = null;
try {
  saved = localStorage.getItem(STORAGE_KEY);
} catch {}
applyTheme(themes[saved] ? saved : themeFromHour());
