export default async function fetchWeather(lat: number, lon: number, signal: AbortSignal) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,apparent_temperature,weathercode,uv_index,visibility,surface_pressure&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&forecast_days=7&timezone=auto`;

  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Weather data fetch failed with status: ${res.status}`);
  }
  return res.json();
}