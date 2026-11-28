export const themes = {
  morning: { label: "Morning", bg: "./src/assets/img/bg-morning-ground.png", tone: "theme-switcher-black" },
  afternoon: { label: "Afternoon", bg: "./src/assets/img/bg-afternoon-ground.png", tone: "theme-switcher-black" },
  evening: { label: "Evening", bg: "./src/assets/img/bg-evening-ground.png", tone: "theme-switcher-white" },
  night: { label: "Night", bg: "./src/assets/img/bg-night-ground.png", tone: "theme-switcher-white" },
};

const STORAGE_KEY = "thermo-theme";

export function getSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return themes[saved] ? saved : null;
  } catch {
    return null;
  }
}

export function saveTheme() {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
}
