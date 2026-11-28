import { API_KEY } from "./config.js";

const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export async function fetchWeather(location, { unit = "metric", signal } = {}) {
  const url = new URL(`${BASE_URL}/${encodeURIComponent(location)}`);
  url.search = new URLSearchParams({
    unitGroup: unit,
    include: "current,days,hours,fcst",
    elements: "datetime,temp,tempmin,tempmax,feelslike,humidity,windspeed,uvindex,pressure,snow,precip,precipprob,icon,conditions",
    contentType: "json",
    key: API_KEY,
  });

  let res;
  try {
    res = await fetch(url, { signal });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new Error("No internet connection");
  }

  if (!res.ok) {
    if (res.status === 400) throw new Error("No city found!");
    if (res.status === 401) throw new Error("Invalid API Key!");
    if (res.status === 429) throw new Error("Out of API quota for today!");
    throw new Error(`Server error (${res.status})`);
  }

  return normalize(await res.json());
}

function normalize(raw) {
  const c = raw.currentConditions;
  return {
    city: raw.resolvedAddress,
    timezone: raw.timezone,
    current: {
      temp: c.temp,
      feelslike: c.feelslike,
      humidity: c.humidity,
      windspeed: c.windspeed,
      uvindex: c.uvindex,
      pressure: c.pressure,
      snow: c.snow,
      precip: c.precip,
      precipprob: c.precipprob,
      icon: c.icon,
      conditions: c.conditions,
    },
    days: raw.days.slice(0, 7).map((d) => ({
      date: d.datetime,
      tempMax: d.tempmax,
      tempMin: d.tempmin,
      rainChance: d.precipprob,
      conditions: d.conditions,
      icon: d.icon,
      hours: d.hours.map((h) => ({
        time: h.datetime,
        temp: h.temp,
        icon: h.icon,
      })),
    })),
  };
}
