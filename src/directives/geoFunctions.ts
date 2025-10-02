// ---- function to get lang and long using city ----

import { GeoCodingResult, ReverseGeocodeResult } from "@/types/type";

async function fetchGeoData(cityName: string, signal: AbortSignal) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    cityName
  )}&count=1&language=en&format=json`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Geocoding data fetch failed with status: ${res.status}`);
  }
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("City not found.");
  }
  return data.results[0] as GeoCodingResult;
}

// ---- function to get city name using lang and long ----

async function fetchReverseGeocode(
  lat: number,
  lon: number,
  signal: AbortSignal
) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(
      `Reverse geocoding fetch failed with status: ${res.status}`
    );
  }
  return res.json() as Promise<ReverseGeocodeResult>;
}

export {fetchGeoData, fetchReverseGeocode};