"use client";

import React from "react";
import {
  cityInfoType,
  GeoCodingResult,
  ReverseGeocodeResult,
  weatherDataType,
} from "@/type";

// ---- fetching data from api ----

async function fetchWeather(lat: number, lon: number, signal: AbortSignal) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,apparent_temperature,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=7`;

  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Weather data fetch failed with status: ${res.status}`);
  }
  return res.json();
}

// ---- function to get lang and long using city ----

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

// ---- main use hook ----

export default function useWeatherData(cityName?: string) {
  const [weatherData, setWeatherData] = React.useState<weatherDataType | null>(
    null
  );
  const [cityInfo, setCityInfo] = React.useState<cityInfoType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    // ---- main fetch function ----

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Fetch by city name
        if (cityName) {
          const geoData = await fetchGeoData(cityName, signal);
          setCityInfo({ name: geoData.name, country: geoData.country });
          const weather = await fetchWeather(
            geoData.latitude,
            geoData.longitude,
            signal
          );
          setWeatherData(weather);
        } else if (navigator.geolocation) {
          // Fetch by user's location
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
              });
            }
          );

          const locationData = await fetchReverseGeocode(
            position.coords.latitude,
            position.coords.longitude,
            signal
          );
          setCityInfo({
            name: locationData.city || locationData.locality || "Unknown",
            country: locationData.countryName,
          });
          const weather = await fetchWeather(
            position.coords.latitude,
            position.coords.longitude,
            signal
          );
          setWeatherData(weather);
        } else {
          throw new Error("Geolocation not supported. Please search by city.");
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          // Ignore abort errors
        } else if (err instanceof GeolocationPositionError && err.code === 1) {
          setError("Location access denied. Please search by city.");
        } else {
          setError(
            err instanceof Error ? err.message : "An unexpected error occurred."
          );
          console.log('Error: ',err)
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [cityName]);

  return { weatherData, cityInfo, loading, error };
}
