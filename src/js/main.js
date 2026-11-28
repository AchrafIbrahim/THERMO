import { getSavedTheme, saveTheme } from "./state.js";
import { themeFromHour } from "./utils.js";
import { dom, applyTheme, setMenuOpen, isMenuOpen, preloadBackgrounds, initForecastScroll } from "./ui.js";
import { fetchWeather } from "./api.js";

function selectTheme(theme) {
  applyTheme(theme);
  saveTheme(theme);
}

dom.trigger.addEventListener("click", () => setMenuOpen(!isMenuOpen()));

dom.menu.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-theme]");
  if (!btn) return;
  selectTheme(btn.dataset.theme);
  setMenuOpen(false);
  dom.trigger.focus();
});

document.addEventListener("click", (e) => {
  if (!dom.switcher.contains(e.target)) setMenuOpen(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMenuOpen()) {
    setMenuOpen(false);
    dom.trigger.focus();
  }
});

/* API Testing with Loc
fetchWeather("Jakarta")
  .then(console.log)
  .catch((err) => console.error(err.message));
*/

preloadBackgrounds();
applyTheme(getSavedTheme() ?? themeFromHour());
initForecastScroll();
