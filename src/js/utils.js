export function themeFromHour(h = new Date().getHours()) {
  if (h >= 5 && h < 11) return "morning";
  if (h >= 11 && h < 17) return "afternoon";
  if (h >= 17 && h < 19) return "evening";
  return "night";
}
